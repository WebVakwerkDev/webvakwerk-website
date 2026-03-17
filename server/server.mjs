import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const isProduction = process.env.NODE_ENV === "production";

async function loadEnvFile() {
  const envPath = path.join(projectRoot, ".env");

  if (!existsSync(envPath)) {
    return;
  }

  const envContent = await readFile(envPath, "utf-8");

  for (const rawLine of envContent.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^"(.*)"$/, "$1");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

await loadEnvFile();

const port = Number(process.env.PORT || (isProduction ? 8080 : 3001));

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

function getPeppermintConfig() {
  const baseUrl = process.env.PEPPERMINT_BASE_URL?.trim().replace(/\/+$/, "");
  const email = process.env.PEPPERMINT_EMAIL?.trim();
  const password = process.env.PEPPERMINT_PASSWORD?.trim();

  if (!baseUrl || !email || !password) {
    throw new Error("Peppermint omgevingsvariabelen ontbreken.");
  }

  return { baseUrl, email, password };
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

async function readJsonBody(req) {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;

    if (size > 1024 * 1024) {
      throw new Error("Request body is te groot.");
    }

    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf-8");
  return rawBody ? JSON.parse(rawBody) : {};
}

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "-";
  }

  if (typeof value === "boolean") {
    return value ? "Ja" : "Nee";
  }

  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return String(value);
}

function buildTicketTitle(payload) {
  const requestType = payload.reasonForRequest || payload.websiteType || "Website-aanvraag";
  const companyName = payload.companyName || "Onbekend bedrijf";
  return `${requestType} - ${companyName}`;
}

function buildTicketDetail(payload, fileNames) {
  const sections = [
    {
      title: "Bedrijfsgegevens",
      fields: [
        ["Bedrijfsnaam", payload.companyName],
        ["Contactpersoon", payload.contactName],
        ["E-mailadres", payload.email],
        ["Telefoonnummer", payload.phone],
        ["Website URL", payload.websiteUrl],
        ["Branche", payload.industry],
        ["Regio", payload.region],
      ],
    },
    {
      title: "Bedrijfscontext",
      fields: [
        ["Bedrijfsbeschrijving", payload.companyDescription],
        ["Activiteiten", payload.companyActivities],
        ["Doelgroep", payload.targetAudience],
        ["Unieke punten", payload.uniqueSellingPoints],
        ["Belangrijkste diensten", payload.primaryServices],
        ["Gewenste uitstraling", payload.visualStyle],
        ["Inspiratievoorbeelden", payload.inspirationExamples],
      ],
    },
    {
      title: "Websitewensen",
      fields: [
        ["Type website", payload.websiteType],
        ["Gewenste pagina's", payload.desiredPages],
        ["Contactformulier", payload.contactForm],
        ["Reviews", payload.reviews],
        ["Galerij", payload.gallery],
        ["Prijsoverzicht", payload.pricing],
        ["Blog", payload.blog],
        ["Boekingsfunctie", payload.bookingFeature],
        ["Social media links", payload.socialLinks],
      ],
    },
    {
      title: "Content en assets",
      fields: [
        ["Logo aanwezig", payload.hasLogo],
        ["Huisstijlkleuren aanwezig", payload.hasBrandColors],
        ["Teksten aanwezig", payload.hasTexts],
        ["Afbeeldingen aanwezig", payload.hasImages],
        ["Iconen aanwezig", payload.hasIcons],
        ["Geuploade bestandsnamen", fileNames],
      ],
    },
    {
      title: "Projectinformatie",
      fields: [
        ["Reden voor aanvraag", payload.reasonForRequest],
        ["Gewenst resultaat", payload.desiredOutcome],
        ["Deadline", payload.deadline],
        ["Seriousness", payload.seriousness],
        ["Budgetindicatie", payload.budgetIndication],
        ["Begrijpt demo-scope", payload.understandsScope],
        ["Privacy akkoord", payload.privacyConsent],
        ["Toestemming gegevensverwerking", payload.dataProcessingConsent],
      ],
    },
  ];

  const lines = [
    "Nieuwe aanvraag via webformulier",
    `Ingediend op: ${new Date().toISOString()}`,
    "",
  ];

  for (const section of sections) {
    lines.push(section.title);
    lines.push("-".repeat(section.title.length));

    for (const [label, value] of section.fields) {
      lines.push(`${label}: ${formatValue(value)}`);
    }

    lines.push("");
  }

  return lines.join("\n");
}

async function peppermintLogin() {
  const { baseUrl, email, password } = getPeppermintConfig();
  const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Peppermint login mislukt (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  if (!data.token) {
    throw new Error("Peppermint login gaf geen token terug.");
  }

  return { token: data.token, baseUrl };
}

async function createPeppermintTicket(token, baseUrl, title, detail) {
  const response = await fetch(`${baseUrl}/api/v1/ticket/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, detail }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Peppermint ticket aanmaken mislukt (${response.status}): ${errorText}`);
  }

  return response.json().catch(() => null);
}

async function handleDemoRequest(req, res) {
  try {
    const body = await readJsonBody(req);
    const payload = body.payload ?? {};
    const fileNames = Array.isArray(body.fileNames) ? body.fileNames : [];

    if (payload.honeypot) {
      return sendJson(res, 200, { success: true });
    }

    if (!payload.companyName || !payload.contactName || !payload.email) {
      return sendJson(res, 400, {
        success: false,
        message: "Bedrijfsnaam, contactpersoon en e-mailadres zijn verplicht.",
      });
    }

    const { token, baseUrl } = await peppermintLogin();
    const title = buildTicketTitle(payload);
    const detail = buildTicketDetail(payload, fileNames);

    await createPeppermintTicket(token, baseUrl, title, detail);

    return sendJson(res, 200, { success: true });
  } catch (error) {
    console.error("[demo-request]", error);
    return sendJson(res, 500, {
      success: false,
      message: error instanceof Error ? error.message : "De aanvraag kon niet worden verwerkt.",
    });
  }
}

async function serveStaticFile(req, res, pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const requestedPath = decodedPath === "/" ? "/index.html" : decodedPath;
  const normalizedPath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(distDir, normalizedPath);

  if (!filePath.startsWith(distDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    let finalPath = filePath;
    let fileStats = await stat(finalPath);

    if (fileStats.isDirectory()) {
      finalPath = path.join(finalPath, "index.html");
      fileStats = await stat(finalPath);
    }

    res.writeHead(200, {
      "Content-Type": contentTypes[path.extname(finalPath)] || "application/octet-stream",
      "Content-Length": fileStats.size,
    });

    createReadStream(finalPath).pipe(res);
  } catch {
    const hasExtension = path.extname(normalizedPath) !== "";
    const fallbackPath = path.join(distDir, "index.html");

    if (!hasExtension && existsSync(fallbackPath)) {
      const html = await readFile(fallbackPath);
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": html.length,
      });
      res.end(html);
      return;
    }

    res.writeHead(404);
    res.end("Not found");
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (req.method === "POST" && url.pathname === "/api/demo-request") {
    return handleDemoRequest(req, res);
  }

  if (req.method === "GET" || req.method === "HEAD") {
    if (existsSync(distDir)) {
      return serveStaticFile(req, res, url.pathname);
    }

    res.writeHead(404);
    res.end("Frontend build not found.");
    return;
  }

  res.writeHead(405);
  res.end("Method not allowed");
});

server.listen(port, () => {
  console.log(`Server draait op poort ${port}`);
});
