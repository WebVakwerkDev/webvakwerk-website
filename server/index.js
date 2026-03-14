import express from "express";
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
const distDir = path.join(rootDir, "dist");

const app = express();
const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || "127.0.0.1";

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

app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(uploadsDir));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/dashboard", (_req, res) => {
  const data = readDb();
  res.json(data);
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

app.post("/api/requests/:requestId/convert-to-ticket", async (req, res) => {
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

app.patch("/api/tickets/:ticketId", async (req, res) => {
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

app.post("/api/tickets/:ticketId/notes", async (req, res) => {
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

app.post("/api/tickets/:ticketId/emails", async (req, res) => {
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

app.use(express.static(distDir));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    res.status(404).json({ message: "API route niet gevonden." });
    return;
  }

  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
