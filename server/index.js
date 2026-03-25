import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { buildInternalApiPayload, demoRequestSchema, formatValidationErrors } from "./demo-request.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const indexFile = path.join(distDir, "index.html");
const port = Number(process.env.PORT || 8080);
const internalApiUrl = process.env.INTERNAL_TICKET_API_URL;
const internalApiKey = process.env.INTERNAL_TICKET_API_KEY;
const appPublicUrl = process.env.APP_PUBLIC_URL;
const trustProxy = process.env.TRUST_PROXY || "loopback";
const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMaxRequests = 5;
const requestTracker = new Map();
const duplicateWindowMs = 10 * 60 * 1000;
const duplicateTracker = new Map();

function validateEnvironment() {
  const errors = [];

  if (!Number.isInteger(port) || port <= 0) {
    errors.push("PORT must be a positive integer");
  }

  if (!internalApiUrl) {
    errors.push("INTERNAL_TICKET_API_URL is required");
  } else {
    try {
      const url = new URL(internalApiUrl);

      if (!["http:", "https:"].includes(url.protocol)) {
        errors.push("INTERNAL_TICKET_API_URL must use http or https");
      }
    } catch {
      errors.push("INTERNAL_TICKET_API_URL must be a valid URL");
    }
  }

  if (!internalApiKey) {
    errors.push("INTERNAL_TICKET_API_KEY is required");
  } else if (internalApiKey.length < 32) {
    errors.push("INTERNAL_TICKET_API_KEY must be at least 32 characters");
  }

  if (!appPublicUrl) {
    errors.push("APP_PUBLIC_URL is required");
  } else {
    try {
      new URL(appPublicUrl);
    } catch {
      errors.push("APP_PUBLIC_URL must be a valid URL");
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid server configuration: ${errors.join("; ")}`);
  }
}

validateEnvironment();

const app = express();
const allowedOrigins = new Set([new URL(appPublicUrl).origin]);

app.disable("x-powered-by");
app.set("trust proxy", trustProxy);

app.use((_req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "0");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'",
  );
  next();
});

app.use(express.json({ limit: "32kb" }));
app.use((error, _req, res, next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({
      success: false,
      message: "Ongeldige JSON ontvangen.",
    });
  }

  return next(error);
});

function cleanupRateLimitEntries(now) {
  for (const [ip, timestamps] of requestTracker.entries()) {
    const activeTimestamps = timestamps.filter((timestamp) => now - timestamp < rateLimitWindowMs);

    if (activeTimestamps.length === 0) {
      requestTracker.delete(ip);
      continue;
    }

    requestTracker.set(ip, activeTimestamps);
  }
}

function isRateLimited(ip) {
  const now = Date.now();
  cleanupRateLimitEntries(now);

  const timestamps = requestTracker.get(ip) || [];
  const activeTimestamps = timestamps.filter((timestamp) => now - timestamp < rateLimitWindowMs);

  if (activeTimestamps.length >= rateLimitMaxRequests) {
    requestTracker.set(ip, activeTimestamps);
    return true;
  }

  requestTracker.set(ip, [...activeTimestamps, now]);
  return false;
}

function cleanupDuplicateEntries(now) {
  for (const [key, entry] of duplicateTracker.entries()) {
    if (now - entry.timestamp >= duplicateWindowMs) {
      duplicateTracker.delete(key);
    }
  }
}

function createRequestFingerprint(payload) {
  const normalized = [
    payload.companyName,
    payload.contactName,
    payload.email,
    payload.subject,
    payload.reasonForRequest,
  ]
    .map((value) => value.trim().toLowerCase())
    .join("|");

  return crypto.createHash("sha256").update(normalized).digest("hex");
}

function getDuplicateState(fingerprint) {
  const now = Date.now();
  cleanupDuplicateEntries(now);

  const entry = duplicateTracker.get(fingerprint);

  if (!entry) {
    return null;
  }

  return entry.state;
}

function markDuplicateFingerprint(fingerprint, state) {
  duplicateTracker.set(fingerprint, {
    state,
    timestamp: Date.now(),
  });
}

function validateOrigin(req) {
  const origin = req.get("origin");

  if (!origin) {
    return false;
  }

  return allowedOrigins.has(origin);
}

app.post("/api/demo-request", async (req, res) => {
  const ip = req.ip || "unknown";

  if (!validateOrigin(req)) {
    return res.status(403).json({
      success: false,
      message: "Deze aanvraag mag alleen vanaf de website worden verzonden.",
    });
  }

  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      message: "Je hebt te vaak geprobeerd te verzenden. Probeer het over een paar minuten opnieuw.",
    });
  }

  const payloadResult = demoRequestSchema.safeParse(req.body?.payload);

  if (!payloadResult.success) {
    return res.status(400).json({
      success: false,
      message: "Controleer de ingevulde velden en probeer het opnieuw.",
      errors: formatValidationErrors(payloadResult.error),
    });
  }

  const payload = payloadResult.data;
  const fingerprint = createRequestFingerprint(payload);

  if (payload.honeypot) {
    return res.status(200).json({
      success: true,
      message: "Je aanvraag is ontvangen.",
    });
  }

  const duplicateState = getDuplicateState(fingerprint);

  if (duplicateState === "pending" || duplicateState === "completed") {
    return res.status(409).json({
      success: false,
      message: "Deze aanvraag is al recent verzonden. Controleer je inbox of probeer het later opnieuw.",
    });
  }

  markDuplicateFingerprint(fingerprint, "pending");

  try {
    const internalPayload = buildInternalApiPayload(payload);

    let response;
    for (let attempt = 1; attempt <= 2; attempt++) {
      response = await fetch(internalApiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${internalApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(internalPayload),
        signal: AbortSignal.timeout(10000),
      });

      // Only retry on transient server errors; don't retry client errors (4xx)
      if (response.ok || response.status < 500) break;

      if (attempt < 2) {
        console.warn("[demo-request] internal API returned 5xx, retrying", { status: response.status, attempt });
      }
    }

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");

      console.error("[demo-request] internal API error", {
        status: response.status,
        body: errorBody.slice(0, 300),
      });

      duplicateTracker.delete(fingerprint);

      return res.status(502).json({
        success: false,
        message: "De aanvraag kon niet worden doorgestuurd. Probeer het later opnieuw.",
      });
    }

    markDuplicateFingerprint(fingerprint, "completed");

    console.info("[demo-request] project created successfully");

    return res.status(200).json({
      success: true,
      message: "Je aanvraag is ontvangen.",
    });
  } catch (error) {
    console.error("[demo-request] unexpected server error", {
      message: error instanceof Error ? error.message : "Unknown error",
    });

    duplicateTracker.delete(fingerprint);

    return res.status(502).json({
      success: false,
      message: "De aanvraag kon niet worden doorgestuurd. Probeer het later opnieuw.",
    });
  }
});

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir, { index: false }));

  app.get("*", (_req, res) => {
    res.sendFile(indexFile);
  });
}

app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`);
});
