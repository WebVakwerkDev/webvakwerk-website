import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { buildInternalApiPayload, demoRequestSchema, formatValidationErrors } from "./demo-request.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const indexFile = path.join(distDir, "index.html");

const app = express();
const port = Number(process.env.PORT || 8080);
const internalApiUrl = process.env.INTERNAL_TICKET_API_URL || process.env.INTERNAL_API_URL;
const internalApiKey = process.env.INTERNAL_TICKET_API_KEY || process.env.INTERNAL_API_KEY;
const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMaxRequests = 5;
const requestTracker = new Map();

app.disable("x-powered-by");
app.set("trust proxy", true);
app.use(express.json({ limit: "32kb" }));

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

app.post("/api/demo-request", async (req, res) => {
  if (!internalApiUrl || !internalApiKey) {
    console.error("[demo-request] missing INTERNAL_TICKET_API_URL or INTERNAL_TICKET_API_KEY");
    return res.status(500).json({
      success: false,
      message: "De server is nog niet volledig geconfigureerd.",
    });
  }

  const ip = req.ip || "unknown";

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

  if (payload.honeypot) {
    return res.status(200).json({
      success: true,
      message: "Je aanvraag is ontvangen.",
    });
  }

  try {
    const internalPayload = buildInternalApiPayload(payload);
    const response = await fetch(internalApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${internalApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(internalPayload),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");

      console.error("[demo-request] internal API error", {
        status: response.status,
        body: errorBody.slice(0, 300),
      });

      return res.status(502).json({
        success: false,
        message: "De aanvraag kon niet worden doorgestuurd. Probeer het later opnieuw.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Je aanvraag is ontvangen.",
    });
  } catch (error) {
    console.error("[demo-request] unexpected server error", {
      message: error instanceof Error ? error.message : "Unknown error",
    });

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
