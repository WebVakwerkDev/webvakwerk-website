import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { Pool } from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const storageDir = path.join(rootDir, "storage");
const uploadDir = path.join(storageDir, "ticket-attachments");

const PORT = Number(process.env.API_PORT || process.env.PORT || 3001);
const HOST = process.env.API_HOST || process.env.HOST || "127.0.0.1";
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:5432/webvakwerk";
const PUBLIC_ORIGIN = process.env.PUBLIC_ORIGIN || "http://localhost:8080";
const PORTAL_ORIGIN = process.env.PORTAL_ORIGIN || "http://localhost:8081";
const COOKIE_NAME = process.env.PORTAL_COOKIE_NAME || "webvakwerk_portal_session";
const COOKIE_DOMAIN = process.env.PORTAL_COOKIE_DOMAIN || "";
const COOKIE_SECURE = (process.env.PORTAL_COOKIE_SECURE || "false") === "true";
const SESSION_TTL_HOURS = Number(process.env.PORTAL_SESSION_TTL_HOURS || 12);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_NAME = process.env.ADMIN_NAME || "Webvakwerk Admin";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";

fs.mkdirSync(uploadDir, { recursive: true });

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "2mb" }));

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 120);
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

function setSessionCookie(res, token) {
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_TTL_HOURS * 60 * 60}`,
  ];

  if (COOKIE_DOMAIN) {
    parts.push(`Domain=${COOKIE_DOMAIN}`);
  }

  if (COOKIE_SECURE) {
    parts.push("Secure");
  }

  res.setHeader("Set-Cookie", parts.join("; "));
}

function clearSessionCookie(res) {
  const parts = [
    `${COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ];

  if (COOKIE_DOMAIN) {
    parts.push(`Domain=${COOKIE_DOMAIN}`);
  }

  if (COOKIE_SECURE) {
    parts.push("Secure");
  }

  res.setHeader("Set-Cookie", parts.join("; "));
}

function verifyPassword(password, storedHash) {
  const [algorithm, salt, hash] = String(storedHash || "").split(":");

  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  const candidate = crypto.scryptSync(password, salt, 64).toString("hex");
  const candidateBuffer = Buffer.from(candidate, "hex");
  const hashBuffer = Buffer.from(hash, "hex");

  if (candidateBuffer.length !== hashBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(candidateBuffer, hashBuffer);
}

async function query(text, params = []) {
  return pool.query(text, params);
}

async function auditLog(action, entityType, entityId, actorUserId = null, metadata = null) {
  await query(
    `insert into audit_logs (id, actor_user_id, action, entity_type, entity_id, metadata)
     values ($1, $2, $3, $4, $5, $6)`,
    [crypto.randomUUID(), actorUserId, action, entityType, entityId, metadata ? JSON.stringify(metadata) : null],
  );
}

async function ensureSchema() {
  await query(`
    create table if not exists roles (
      id uuid primary key,
      code text not null unique,
      name text not null
    );

    create table if not exists users (
      id uuid primary key,
      email text not null unique,
      name text not null,
      password_hash text not null,
      is_active boolean not null default true,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );

    create table if not exists user_roles (
      user_id uuid not null references users(id) on delete cascade,
      role_id uuid not null references roles(id) on delete cascade,
      primary key (user_id, role_id)
    );

    create table if not exists portal_sessions (
      id uuid primary key,
      user_id uuid not null references users(id) on delete cascade,
      token text not null unique,
      expires_at timestamptz not null,
      ip_address text,
      user_agent text,
      created_at timestamptz not null default now(),
      last_seen_at timestamptz not null default now()
    );

    create table if not exists tickets (
      id bigserial primary key,
      public_id uuid not null unique,
      ticket_number text unique,
      company_name text not null,
      contact_name text not null,
      email text not null,
      phone text,
      website_url text,
      industry text,
      region text,
      website_type text,
      status text not null,
      priority text not null default 'normaal',
      seriousness text,
      budget_indication text,
      assigned_user_id uuid references users(id) on delete set null,
      visual_style text,
      desired_outcome text,
      reason_for_request text,
      target_audience text,
      request_payload jsonb not null,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      submitted_at timestamptz not null default now()
    );

    create table if not exists ticket_status_history (
      id uuid primary key,
      ticket_id bigint not null references tickets(id) on delete cascade,
      from_status text,
      to_status text not null,
      changed_by_user_id uuid references users(id) on delete set null,
      changed_at timestamptz not null default now()
    );

    create table if not exists ticket_logs (
      id uuid primary key,
      ticket_id bigint not null references tickets(id) on delete cascade,
      type text not null,
      message text not null,
      is_internal boolean not null default true,
      created_by_user_id uuid references users(id) on delete set null,
      created_at timestamptz not null default now()
    );

    create table if not exists ticket_notes (
      id uuid primary key,
      ticket_id bigint not null references tickets(id) on delete cascade,
      body text not null,
      is_internal boolean not null default true,
      created_by_user_id uuid references users(id) on delete set null,
      created_at timestamptz not null default now()
    );

    create table if not exists ticket_attachments (
      id uuid primary key,
      ticket_id bigint not null references tickets(id) on delete cascade,
      storage_name text not null unique,
      original_name text not null,
      mime_type text not null,
      size_bytes bigint not null,
      created_at timestamptz not null default now()
    );

    create table if not exists ticket_tags (
      id uuid primary key,
      name text not null unique
    );

    create table if not exists ticket_tag_links (
      ticket_id bigint not null references tickets(id) on delete cascade,
      tag_id uuid not null references ticket_tags(id) on delete cascade,
      primary key (ticket_id, tag_id)
    );

    create table if not exists audit_logs (
      id uuid primary key,
      actor_user_id uuid references users(id) on delete set null,
      action text not null,
      entity_type text not null,
      entity_id text,
      metadata jsonb,
      created_at timestamptz not null default now()
    );

    create index if not exists idx_tickets_status on tickets(status);
    create index if not exists idx_tickets_assigned_user on tickets(assigned_user_id);
    create index if not exists idx_tickets_created_at on tickets(created_at desc);
    create index if not exists idx_ticket_logs_ticket on ticket_logs(ticket_id, created_at desc);
    create index if not exists idx_ticket_notes_ticket on ticket_notes(ticket_id, created_at desc);
    create index if not exists idx_ticket_attachments_ticket on ticket_attachments(ticket_id);
  `);

  const roles = [
    { code: "admin", name: "Admin" },
    { code: "agent", name: "Medewerker" },
    { code: "viewer", name: "Viewer" },
  ];

  for (const role of roles) {
    await query(
      "insert into roles (id, code, name) values ($1, $2, $3) on conflict (code) do nothing",
      [crypto.randomUUID(), role.code, role.name],
    );
  }

  if (!ADMIN_PASSWORD_HASH) {
    return;
  }

  const existingAdmin = await query("select id from users where email = $1 limit 1", [ADMIN_EMAIL.toLowerCase()]);
  let adminId;

  if (!existingAdmin.rowCount) {
    adminId = crypto.randomUUID();
    await query(
      `insert into users (id, email, name, password_hash)
       values ($1, $2, $3, $4)`,
      [adminId, ADMIN_EMAIL.toLowerCase(), ADMIN_NAME, ADMIN_PASSWORD_HASH],
    );
  } else {
    adminId = existingAdmin.rows[0].id;
  }

  const roleRecord = await query("select id from roles where code = 'admin' limit 1");
  if (roleRecord.rowCount) {
    await query(
      "insert into user_roles (user_id, role_id) values ($1, $2) on conflict do nothing",
      [adminId, roleRecord.rows[0].id],
    );
  }
}

const publicRateLimit = new Map();
const loginRateLimit = new Map();

function hitRateLimit(store, key, limit, windowMs) {
  const now = Date.now();
  const current = store.get(key) || [];
  const recent = current.filter((timestamp) => now - timestamp < windowMs);
  recent.push(now);
  store.set(key, recent);
  return recent.length > limit;
}

function allowedPublicOrigin(req) {
  const origin = req.headers.origin;
  return !origin || origin === PUBLIC_ORIGIN;
}

function allowedPortalOrigin(req) {
  const origin = req.headers.origin;
  return !origin || origin === PORTAL_ORIGIN;
}

async function requireSession(req, res, next) {
  const cookies = parseCookies(req.headers.cookie || "");
  const token = cookies[COOKIE_NAME];

  if (!token) {
    res.status(401).send("Niet ingelogd.");
    return;
  }

  const sessionResult = await query(
    `select s.id, s.user_id, s.expires_at, u.email, u.name,
            coalesce(array_agg(r.code) filter (where r.code is not null), '{}') as roles
     from portal_sessions s
     join users u on u.id = s.user_id and u.is_active = true
     left join user_roles ur on ur.user_id = u.id
     left join roles r on r.id = ur.role_id
     where s.token = $1 and s.expires_at > now()
     group by s.id, s.user_id, s.expires_at, u.email, u.name
     limit 1`,
    [token],
  );

  if (!sessionResult.rowCount) {
    clearSessionCookie(res);
    res.status(401).send("Niet ingelogd.");
    return;
  }

  const session = sessionResult.rows[0];
  await query("update portal_sessions set last_seen_at = now() where id = $1", [session.id]);
  req.user = {
    id: session.user_id,
    email: session.email,
    name: session.name,
    roles: session.roles,
  };
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.some((role) => req.user.roles.includes(role))) {
      res.status(403).send("Onvoldoende rechten.");
      return;
    }

    next();
  };
}

function ensurePortalMutation(req, res, next) {
  if (!allowedPortalOrigin(req)) {
    res.status(403).send("Ongeldige origin.");
    return;
  }

  next();
}

const allowedMimeTypes = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = sanitizeFilename(path.basename(file.originalname, ext));
    cb(null, `${Date.now()}-${crypto.randomUUID()}-${baseName}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    files: 8,
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      cb(new Error("Bestandstype niet toegestaan."));
      return;
    }

    cb(null, true);
  },
});

app.get("/api/health", async (_req, res) => {
  await query("select 1");
  res.json({ ok: true });
});

app.post("/api/public/demo-requests", upload.array("attachments", 8), async (req, res) => {
  if (!allowedPublicOrigin(req)) {
    res.status(403).send("Ongeldige origin.");
    return;
  }

  const ip = req.ip || req.socket.remoteAddress || "unknown";
  if (hitRateLimit(publicRateLimit, ip, 8, 15 * 60 * 1000)) {
    res.status(429).send("Te veel aanvragen vanaf dit adres. Probeer het later opnieuw.");
    return;
  }

  const body = req.body || {};
  if (String(body.honeypot || "").trim()) {
    res.status(400).send("Spam gedetecteerd.");
    return;
  }

  const requiredFields = ["companyName", "contactName", "email", "phone", "industry", "region", "companyDescription", "companyActivities", "targetAudience", "reasonForRequest", "desiredOutcome"];
  for (const field of requiredFields) {
    if (!String(body[field] || "").trim()) {
      res.status(400).send(`Veld ontbreekt: ${field}`);
      return;
    }
  }

  if (String(body.privacyConsent) !== "true" || String(body.dataProcessingConsent) !== "true" || String(body.understandsScope) !== "true") {
    res.status(400).send("Alle verplichte akkoordvelden moeten zijn aangevinkt.");
    return;
  }

  const payload = {
    companyName: String(body.companyName).trim(),
    contactName: String(body.contactName).trim(),
    email: String(body.email).trim().toLowerCase(),
    phone: String(body.phone).trim(),
    websiteUrl: String(body.websiteUrl || "").trim(),
    industry: String(body.industry).trim(),
    region: String(body.region).trim(),
    companyDescription: String(body.companyDescription).trim(),
    companyActivities: String(body.companyActivities).trim(),
    targetAudience: String(body.targetAudience).trim(),
    uniqueSellingPoints: String(body.uniqueSellingPoints || "").trim(),
    primaryServices: String(body.primaryServices || "").trim(),
    visualStyle: String(body.visualStyle || "").trim(),
    inspirationExamples: String(body.inspirationExamples || "").trim(),
    websiteType: String(body.websiteType || "").trim(),
    desiredPages: JSON.parse(body.desiredPages || "[]"),
    contactForm: String(body.contactForm) === "true",
    reviews: String(body.reviews) === "true",
    gallery: String(body.gallery) === "true",
    pricing: String(body.pricing) === "true",
    blog: String(body.blog) === "true",
    bookingFeature: String(body.bookingFeature) === "true",
    socialLinks: String(body.socialLinks) === "true",
    hasLogo: String(body.hasLogo) === "true",
    hasBrandColors: String(body.hasBrandColors) === "true",
    hasTexts: String(body.hasTexts) === "true",
    hasImages: String(body.hasImages) === "true",
    hasIcons: String(body.hasIcons) === "true",
    reasonForRequest: String(body.reasonForRequest).trim(),
    desiredOutcome: String(body.desiredOutcome).trim(),
    deadline: String(body.deadline || "").trim(),
    seriousness: String(body.seriousness || "serieus").trim(),
    budgetIndication: String(body.budgetIndication || "").trim(),
  };

  const insertResult = await query(
    `insert into tickets (
       public_id, company_name, contact_name, email, phone, website_url, industry, region,
       website_type, status, seriousness, budget_indication, visual_style, desired_outcome,
       reason_for_request, target_audience, request_payload
     ) values (
       $1, $2, $3, $4, $5, $6, $7, $8,
       $9, 'Nieuw', $10, $11, $12, $13,
       $14, $15, $16
     )
     returning id, public_id`,
    [
      crypto.randomUUID(),
      payload.companyName,
      payload.contactName,
      payload.email,
      payload.phone,
      payload.websiteUrl,
      payload.industry,
      payload.region,
      payload.websiteType,
      payload.seriousness,
      payload.budgetIndication,
      payload.visualStyle,
      payload.desiredOutcome,
      payload.reasonForRequest,
      payload.targetAudience,
      JSON.stringify(payload),
    ],
  );

  const ticketId = insertResult.rows[0].id;
  const ticketNumber = `WV-${String(ticketId).padStart(5, "0")}`;

  await query("update tickets set ticket_number = $1 where id = $2", [ticketNumber, ticketId]);
  await query(
    "insert into ticket_status_history (id, ticket_id, from_status, to_status) values ($1, $2, $3, $4)",
    [crypto.randomUUID(), ticketId, null, "Nieuw"],
  );
  await query(
    "insert into ticket_logs (id, ticket_id, type, message, is_internal) values ($1, $2, $3, $4, $5)",
    [crypto.randomUUID(), ticketId, "submission", "Nieuwe demo-aanvraag ontvangen via webvakwerk.nl", true],
  );

  for (const file of req.files || []) {
    await query(
      `insert into ticket_attachments (id, ticket_id, storage_name, original_name, mime_type, size_bytes)
       values ($1, $2, $3, $4, $5, $6)`,
      [crypto.randomUUID(), ticketId, path.basename(file.path), file.originalname, file.mimetype, file.size],
    );
  }

  await auditLog("ticket.created", "ticket", String(ticketId), null, { ticketNumber, source: "public-demo-form" });

  res.status(201).json({ ticketNumber });
});

app.post("/api/portal/auth/login", async (req, res) => {
  if (!allowedPortalOrigin(req)) {
    res.status(403).send("Ongeldige origin.");
    return;
  }

  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  if (hitRateLimit(loginRateLimit, `${ip}:${email}`, 10, 15 * 60 * 1000)) {
    res.status(429).send("Te veel loginpogingen. Probeer het later opnieuw.");
    return;
  }

  const result = await query(
    `select u.id, u.email, u.name, u.password_hash,
            coalesce(array_agg(r.code) filter (where r.code is not null), '{}') as roles
     from users u
     left join user_roles ur on ur.user_id = u.id
     left join roles r on r.id = ur.role_id
     where u.email = $1 and u.is_active = true
     group by u.id, u.email, u.name, u.password_hash
     limit 1`,
    [email],
  );

  if (!result.rowCount || !verifyPassword(password, result.rows[0].password_hash)) {
    res.status(401).send("Ongeldige inloggegevens.");
    return;
  }

  const user = result.rows[0];
  const token = crypto.randomUUID();
  await query(
    `insert into portal_sessions (id, user_id, token, expires_at, ip_address, user_agent)
     values ($1, $2, $3, now() + ($4 || ' hours')::interval, $5, $6)`,
    [crypto.randomUUID(), user.id, token, String(SESSION_TTL_HOURS), ip, req.headers["user-agent"] || ""],
  );

  setSessionCookie(res, token);
  await auditLog("auth.login", "user", user.id, user.id, { email: user.email });

  res.json({ user: { id: user.id, email: user.email, name: user.name, roles: user.roles } });
});

app.post("/api/portal/auth/logout", requireSession, ensurePortalMutation, async (req, res) => {
  const cookies = parseCookies(req.headers.cookie || "");
  const token = cookies[COOKIE_NAME];
  await query("delete from portal_sessions where token = $1", [token]);
  clearSessionCookie(res);
  await auditLog("auth.logout", "user", req.user.id, req.user.id, null);
  res.status(204).end();
});

app.get("/api/portal/auth/me", requireSession, async (req, res) => {
  res.json({ user: req.user });
});

app.get("/api/portal/users", requireSession, async (_req, res) => {
  const result = await query(
    `select u.id, u.email, u.name, u.is_active, u.created_at,
            coalesce(array_agg(r.code) filter (where r.code is not null), '{}') as roles
     from users u
     left join user_roles ur on ur.user_id = u.id
     left join roles r on r.id = ur.role_id
     group by u.id
     order by u.name asc`,
  );
  res.json({ users: result.rows });
});

app.post("/api/portal/users", requireSession, requireRole("admin"), ensurePortalMutation, async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const name = String(req.body.name || "").trim();
  const passwordHash = String(req.body.passwordHash || "").trim();
  const roles = Array.isArray(req.body.roles) ? req.body.roles : ["agent"];

  if (!email || !name || !passwordHash) {
    res.status(400).send("Naam, e-mail en passwordHash zijn verplicht.");
    return;
  }

  const userId = crypto.randomUUID();
  await query(
    "insert into users (id, email, name, password_hash) values ($1, $2, $3, $4)",
    [userId, email, name, passwordHash],
  );

  const roleResult = await query("select id, code from roles where code = any($1::text[])", [roles]);
  for (const role of roleResult.rows) {
    await query("insert into user_roles (user_id, role_id) values ($1, $2)", [userId, role.id]);
  }

  await auditLog("user.created", "user", userId, req.user.id, { email, roles });
  res.status(201).json({ userId });
});

app.get("/api/portal/dashboard/summary", requireSession, async (_req, res) => {
  const counts = await query(
    `select status, count(*)::int as total from tickets group by status`,
  );
  const activity = await query(
    `select tl.message, tl.created_at, t.ticket_number, t.company_name
     from ticket_logs tl
     join tickets t on t.id = tl.ticket_id
     order by tl.created_at desc
     limit 10`,
  );

  res.json({ counts: counts.rows, latestActivity: activity.rows });
});

app.get("/api/portal/tickets", requireSession, async (req, res) => {
  const search = String(req.query.search || "").trim();
  const status = String(req.query.status || "").trim();
  const priority = String(req.query.priority || "").trim();
  const assignedUserId = String(req.query.assignedUserId || "").trim();
  const filters = [];
  const values = [];

  if (search) {
    values.push(`%${search}%`);
    filters.push(`(t.company_name ilike $${values.length} or t.ticket_number ilike $${values.length} or t.contact_name ilike $${values.length})`);
  }

  if (status) {
    values.push(status);
    filters.push(`t.status = $${values.length}`);
  }

  if (priority) {
    values.push(priority);
    filters.push(`t.priority = $${values.length}`);
  }

  if (assignedUserId) {
    values.push(assignedUserId);
    filters.push(`t.assigned_user_id = $${values.length}`);
  }

  const whereClause = filters.length ? `where ${filters.join(" and ")}` : "";

  const result = await query(
    `select t.id, t.public_id, t.ticket_number, t.company_name, t.contact_name, t.email, t.status, t.priority,
            t.created_at, t.updated_at, t.website_type, t.seriousness, t.assigned_user_id,
            u.name as assigned_user_name
     from tickets t
     left join users u on u.id = t.assigned_user_id
     ${whereClause}
     order by t.created_at desc
     limit 200`,
    values,
  );

  res.json({ tickets: result.rows });
});

app.get("/api/portal/tickets/:ticketId", requireSession, async (req, res) => {
  const ticketResult = await query(
    `select t.*, u.name as assigned_user_name
     from tickets t
     left join users u on u.id = t.assigned_user_id
     where t.id = $1 or t.public_id::text = $1 or t.ticket_number = $1
     limit 1`,
    [req.params.ticketId],
  );

  if (!ticketResult.rowCount) {
    res.status(404).send("Ticket niet gevonden.");
    return;
  }

  const ticket = ticketResult.rows[0];
  const [attachments, logs, notes, history] = await Promise.all([
    query("select * from ticket_attachments where ticket_id = $1 order by created_at asc", [ticket.id]),
    query(
      `select tl.*, u.name as created_by_name from ticket_logs tl
       left join users u on u.id = tl.created_by_user_id
       where tl.ticket_id = $1 order by tl.created_at desc`,
      [ticket.id],
    ),
    query(
      `select tn.*, u.name as created_by_name from ticket_notes tn
       left join users u on u.id = tn.created_by_user_id
       where tn.ticket_id = $1 order by tn.created_at desc`,
      [ticket.id],
    ),
    query(
      `select tsh.*, u.name as changed_by_name from ticket_status_history tsh
       left join users u on u.id = tsh.changed_by_user_id
       where tsh.ticket_id = $1 order by tsh.changed_at desc`,
      [ticket.id],
    ),
  ]);

  res.json({
    ticket,
    attachments: attachments.rows,
    logs: logs.rows,
    notes: notes.rows,
    statusHistory: history.rows,
  });
});

app.patch("/api/portal/tickets/:ticketId", requireSession, ensurePortalMutation, async (req, res) => {
  const ticketResult = await query("select * from tickets where id = $1 or public_id::text = $1 or ticket_number = $1 limit 1", [req.params.ticketId]);
  if (!ticketResult.rowCount) {
    res.status(404).send("Ticket niet gevonden.");
    return;
  }

  const ticket = ticketResult.rows[0];
  const nextStatus = req.body.status ? String(req.body.status) : ticket.status;
  const nextPriority = req.body.priority ? String(req.body.priority) : ticket.priority;
  const nextAssignee = req.body.assignedUserId || null;

  await query(
    `update tickets
     set status = $1, priority = $2, assigned_user_id = $3, updated_at = now()
     where id = $4`,
    [nextStatus, nextPriority, nextAssignee, ticket.id],
  );

  if (nextStatus !== ticket.status) {
    await query(
      "insert into ticket_status_history (id, ticket_id, from_status, to_status, changed_by_user_id) values ($1, $2, $3, $4, $5)",
      [crypto.randomUUID(), ticket.id, ticket.status, nextStatus, req.user.id],
    );
  }

  await query(
    "insert into ticket_logs (id, ticket_id, type, message, is_internal, created_by_user_id) values ($1, $2, $3, $4, $5, $6)",
    [
      crypto.randomUUID(),
      ticket.id,
      "update",
      `Ticket bijgewerkt. Status: ${ticket.status} -> ${nextStatus}. Prioriteit: ${ticket.priority} -> ${nextPriority}.`,
      true,
      req.user.id,
    ],
  );

  await auditLog("ticket.updated", "ticket", String(ticket.id), req.user.id, { nextStatus, nextPriority, nextAssignee });
  res.json({ ok: true });
});

app.post("/api/portal/tickets/:ticketId/notes", requireSession, ensurePortalMutation, async (req, res) => {
  const body = String(req.body.body || "").trim();
  const isInternal = req.body.isInternal !== false;
  if (!body) {
    res.status(400).send("Notitie is verplicht.");
    return;
  }

  const ticketResult = await query("select id from tickets where id = $1 or public_id::text = $1 or ticket_number = $1 limit 1", [req.params.ticketId]);
  if (!ticketResult.rowCount) {
    res.status(404).send("Ticket niet gevonden.");
    return;
  }

  await query(
    "insert into ticket_notes (id, ticket_id, body, is_internal, created_by_user_id) values ($1, $2, $3, $4, $5)",
    [crypto.randomUUID(), ticketResult.rows[0].id, body, isInternal, req.user.id],
  );
  await auditLog("ticket.note.created", "ticket", String(ticketResult.rows[0].id), req.user.id, null);
  res.status(201).json({ ok: true });
});

app.post("/api/portal/tickets/:ticketId/logs", requireSession, ensurePortalMutation, async (req, res) => {
  const type = String(req.body.type || "manual");
  const message = String(req.body.message || "").trim();
  if (!message) {
    res.status(400).send("Logbericht is verplicht.");
    return;
  }

  const ticketResult = await query("select id from tickets where id = $1 or public_id::text = $1 or ticket_number = $1 limit 1", [req.params.ticketId]);
  if (!ticketResult.rowCount) {
    res.status(404).send("Ticket niet gevonden.");
    return;
  }

  await query(
    "insert into ticket_logs (id, ticket_id, type, message, is_internal, created_by_user_id) values ($1, $2, $3, $4, true, $5)",
    [crypto.randomUUID(), ticketResult.rows[0].id, type, message, req.user.id],
  );
  await auditLog("ticket.log.created", "ticket", String(ticketResult.rows[0].id), req.user.id, { type });
  res.status(201).json({ ok: true });
});

app.get("/api/portal/attachments/:attachmentId/download", requireSession, async (req, res) => {
  const attachmentResult = await query("select * from ticket_attachments where id = $1 limit 1", [req.params.attachmentId]);
  if (!attachmentResult.rowCount) {
    res.status(404).send("Bijlage niet gevonden.");
    return;
  }

  const attachment = attachmentResult.rows[0];
  const filePath = path.join(uploadDir, attachment.storage_name);
  if (!fs.existsSync(filePath)) {
    res.status(404).send("Bestand ontbreekt op schijf.");
    return;
  }

  await auditLog("attachment.downloaded", "attachment", attachment.id, req.user.id, { ticketId: attachment.ticket_id });
  res.download(filePath, attachment.original_name);
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).send("Er ging iets mis op de server.");
});

await ensureSchema();

app.listen(PORT, HOST, () => {
  console.log(`Portal API listening on http://${HOST}:${PORT}`);
});
