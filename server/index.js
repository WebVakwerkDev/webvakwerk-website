import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const uploadsDir = path.join(dataDir, "uploads");
const dbPath = path.join(dataDir, "app-data.json");

const app = express();
const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || "127.0.0.1";
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:8080";
const sessionSecret = process.env.SESSION_SECRET || "change-me-in-production";
const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || "";
const authCookieName = process.env.AUTH_COOKIE_NAME || "webvakwerk_session";
const authCookieDomain = process.env.AUTH_COOKIE_DOMAIN || "";
const authCookieSecure = (process.env.AUTH_COOKIE_SECURE || "false") === "true";
const authSessionHours = Number(process.env.AUTH_SESSION_HOURS || 24);

function ensureStorage() {
  fs.mkdirSync(uploadsDir, { recursive: true });

  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(
      dbPath,
      JSON.stringify({ requests: [], tickets: [] }, null, 2),
      "utf8",
    );
  }
}

function readDb() {
  ensureStorage();
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
}

let mutationQueue = Promise.resolve();

function mutateDb(mutator) {
  const run = mutationQueue.then(() => {
    const data = readDb();
    const result = mutator(data);
    writeDb(data);
    return result;
  });

  mutationQueue = run.then(() => undefined, () => undefined);
  return run;
}

function parseJsonField(value, fallback = []) {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function createTodoItems(request) {
  const websiteTypeLabel =
    request.websiteType === "single-page"
      ? "single page website"
      : request.websiteType === "multi-page"
        ? "multi page website"
        : "website";

  return [
    { id: crypto.randomUUID(), title: `Intake controleren voor ${request.companyName}`, done: false },
    { id: crypto.randomUUID(), title: `Eerste opzet maken voor ${websiteTypeLabel}`, done: false },
    { id: crypto.randomUUID(), title: "Content en structuur uitwerken", done: false },
    { id: crypto.randomUUID(), title: "Klantfeedback verwerken", done: false },
    { id: crypto.randomUUID(), title: "Livegang voorbereiden", done: false },
  ];
}

function mapUploadedFiles(files) {
  return (files || []).map((file) => ({
    id: crypto.randomUUID(),
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    url: `/uploads/${file.filename}`,
  }));
}

function parseCookies(cookieHeader = "") {
  return cookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((result, part) => {
      const separatorIndex = part.indexOf("=");
      if (separatorIndex === -1) {
        return result;
      }

      const key = decodeURIComponent(part.slice(0, separatorIndex));
      const value = decodeURIComponent(part.slice(separatorIndex + 1));
      result[key] = value;
      return result;
    }, {});
}

function signValue(value) {
  return crypto.createHmac("sha256", sessionSecret).update(value).digest("base64url");
}

function encodeSession(payload) {
  const serialized = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${serialized}.${signValue(serialized)}`;
}

function decodeSession(token) {
  if (!token || !token.includes(".")) {
    return null;
  }

  const [payloadPart, signature] = token.split(".");
  const expectedSignature = signValue(payloadPart);

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8"));

    if (typeof payload.exp !== "number" || payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

function verifyPassword(password, storedHash) {
  const [algorithm, salt, hash] = String(storedHash || "").split(":");

  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  const derivedHash = crypto.scryptSync(password, salt, 64).toString("hex");
  const incomingBuffer = Buffer.from(derivedHash, "hex");
  const storedBuffer = Buffer.from(hash, "hex");

  if (incomingBuffer.length !== storedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(incomingBuffer, storedBuffer);
}

function setSessionCookie(res, payload) {
  const token = encodeSession(payload);
  const attributes = [
    `${authCookieName}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${authSessionHours * 60 * 60}`,
  ];

  if (authCookieDomain) {
    attributes.push(`Domain=${authCookieDomain}`);
  }

  if (authCookieSecure) {
    attributes.push("Secure");
  }

  res.setHeader("Set-Cookie", attributes.join("; "));
}

function clearSessionCookie(res) {
  const attributes = [
    `${authCookieName}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ];

  if (authCookieDomain) {
    attributes.push(`Domain=${authCookieDomain}`);
  }

  if (authCookieSecure) {
    attributes.push("Secure");
  }

  res.setHeader("Set-Cookie", attributes.join("; "));
}

function getSessionFromRequest(req) {
  const cookies = parseCookies(req.headers.cookie || "");
  return decodeSession(cookies[authCookieName]);
}

function requireAuth(req, res, next) {
  const session = getSessionFromRequest(req);

  if (!session) {
    res.status(401).json({ message: "Niet ingelogd." });
    return;
  }

  req.auth = session;
  next();
}

ensureStorage();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${Date.now()}-${crypto.randomUUID()}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    files: 12,
    fileSize: 10 * 1024 * 1024,
  },
});

app.use(cors({
  origin: frontendOrigin,
  credentials: true,
}));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, port, host });
});

app.post("/api/auth/login", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  if (!adminPasswordHash || sessionSecret === "change-me-in-production") {
    res.status(500).json({ message: "Auth is nog niet correct geconfigureerd op de server." });
    return;
  }

  if (email !== adminEmail.toLowerCase() || !verifyPassword(password, adminPasswordHash)) {
    res.status(401).json({ message: "Ongeldige inloggegevens." });
    return;
  }

  const payload = {
    email: adminEmail,
    exp: Date.now() + (authSessionHours * 60 * 60 * 1000),
  };

  setSessionCookie(res, payload);
  res.json({ email: adminEmail });
});

app.post("/api/auth/logout", (_req, res) => {
  clearSessionCookie(res);
  res.status(204).end();
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ email: req.auth.email });
});

app.post(
  "/api/requests",
  upload.fields([
    { name: "logoFiles", maxCount: 6 },
    { name: "inspirationFiles", maxCount: 6 },
  ]),
  async (req, res) => {
    const files = req.files || {};
    const logoFiles = Array.isArray(files.logoFiles) ? files.logoFiles : [];
    const inspirationFiles = Array.isArray(files.inspirationFiles) ? files.inspirationFiles : [];

    const request = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new",
      companyName: req.body.companyName || "",
      contactName: req.body.contactName || "",
      email: req.body.email || "",
      phone: req.body.phone || "",
      businessType: req.body.businessType || "",
      currentWebsite: req.body.currentWebsite || "",
      websiteType: req.body.websiteType || "",
      pageCount: req.body.pageCount || "",
      pagesWanted: parseJsonField(req.body.pagesWanted),
      goals: req.body.goals || "",
      targetAudience: req.body.targetAudience || "",
      services: req.body.services || "",
      requiredSections: parseJsonField(req.body.requiredSections),
      functionalityNeeds: parseJsonField(req.body.functionalityNeeds),
      styleDirection: req.body.styleDirection || "",
      colorPreferences: req.body.colorPreferences || "",
      brandNotes: req.body.brandNotes || "",
      domainStatus: req.body.domainStatus || "",
      hostingPreference: req.body.hostingPreference || "",
      contentStatus: req.body.contentStatus || "",
      extraNotes: req.body.extraNotes || "",
      timeline: req.body.timeline || "",
      budgetRange: req.body.budgetRange || "",
      logoFiles: mapUploadedFiles(logoFiles),
      inspirationFiles: mapUploadedFiles(inspirationFiles),
    };

    await mutateDb((data) => {
      data.requests.unshift(request);
      return request;
    });

    res.status(201).json(request);
  },
);

app.get("/api/dashboard", requireAuth, (_req, res) => {
  const data = readDb();
  res.json(data);
});

app.post("/api/requests/:requestId/convert-to-ticket", requireAuth, async (req, res) => {
  const result = await mutateDb((data) => {
    const request = data.requests.find((item) => item.id === req.params.requestId);

    if (!request) {
      return { error: "Aanvraag niet gevonden.", status: 404 };
    }

    const existingTicket = data.tickets.find((ticket) => ticket.requestId === request.id);
    if (existingTicket) {
      return { ticket: existingTicket, status: 200 };
    }

    request.status = "converted";
    request.convertedAt = new Date().toISOString();

    const ticket = {
      id: crypto.randomUUID(),
      requestId: request.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: `${request.companyName} website aanvraag`,
      customerLabel: request.companyName,
      status: "nieuw",
      customerStatus: "wachten op interne opvolging",
      summary: request.goals || request.services || "Nieuwe website aanvraag",
      notes: [],
      emails: [],
      todos: createTodoItems(request),
    };

    data.tickets.unshift(ticket);
    return { ticket, status: 201 };
  });

  if (result.error) {
    res.status(result.status).json({ message: result.error });
    return;
  }

  res.status(result.status).json(result.ticket);
});

app.patch("/api/tickets/:ticketId", requireAuth, async (req, res) => {
  const result = await mutateDb((data) => {
    const ticket = data.tickets.find((item) => item.id === req.params.ticketId);

    if (!ticket) {
      return { error: "Ticket niet gevonden.", status: 404 };
    }

    const allowedFields = ["status", "customerStatus", "summary", "title"];
    for (const field of allowedFields) {
      if (typeof req.body[field] === "string") {
        ticket[field] = req.body[field];
      }
    }

    if (Array.isArray(req.body.todos)) {
      ticket.todos = req.body.todos;
    }

    ticket.updatedAt = new Date().toISOString();
    return { ticket, status: 200 };
  });

  if (result.error) {
    res.status(result.status).json({ message: result.error });
    return;
  }

  res.json(result.ticket);
});

app.post("/api/tickets/:ticketId/notes", requireAuth, async (req, res) => {
  const text = String(req.body.text || "").trim();
  if (!text) {
    res.status(400).json({ message: "Notitie is verplicht." });
    return;
  }

  const result = await mutateDb((data) => {
    const ticket = data.tickets.find((item) => item.id === req.params.ticketId);

    if (!ticket) {
      return { error: "Ticket niet gevonden.", status: 404 };
    }

    const note = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
    };

    ticket.notes.unshift(note);
    ticket.updatedAt = new Date().toISOString();
    return { ticket, status: 201 };
  });

  if (result.error) {
    res.status(result.status).json({ message: result.error });
    return;
  }

  res.status(201).json(result.ticket);
});

app.post("/api/tickets/:ticketId/emails", requireAuth, async (req, res) => {
  const subject = String(req.body.subject || "").trim();
  const body = String(req.body.body || "").trim();

  if (!subject || !body) {
    res.status(400).json({ message: "Onderwerp en inhoud zijn verplicht." });
    return;
  }

  const result = await mutateDb((data) => {
    const ticket = data.tickets.find((item) => item.id === req.params.ticketId);

    if (!ticket) {
      return { error: "Ticket niet gevonden.", status: 404 };
    }

    const email = {
      id: crypto.randomUUID(),
      subject,
      body,
      createdAt: new Date().toISOString(),
    };

    ticket.emails.unshift(email);
    ticket.updatedAt = new Date().toISOString();
    return { ticket, status: 201 };
  });

  if (result.error) {
    res.status(result.status).json({ message: result.error });
    return;
  }

  res.status(201).json(result.ticket);
});

app.get("/uploads/:filename", requireAuth, (req, res) => {
  const filePath = path.join(uploadsDir, req.params.filename);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ message: "Bestand niet gevonden." });
    return;
  }

  res.sendFile(filePath);
});

app.listen(port, host, () => {
  console.log(`API server running on http://${host}:${port}`);
});
