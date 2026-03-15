import { Routes, Route, Navigate, Outlet, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { portalApi, type ManualPortalTicketPayload, type PortalTicket, type PortalTicketDetail, type PortalUser } from "@portal/lib/api";

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function Shell({ user, onLogout, children }: { user: PortalUser; onLogout: () => Promise<void>; children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid var(--portal-border)", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <Link to="/dashboard" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28 }}>Webvakwerk Portal</span>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--portal-primary)" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700 }}>{user.name}</div>
              <div style={{ color: "var(--portal-muted)", fontSize: 14 }}>{user.roles.join(", ")}</div>
            </div>
            <button onClick={onLogout} style={buttonStyle("secondary")}>Uitloggen</button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

function buttonStyle(variant: "primary" | "secondary" = "primary"): React.CSSProperties {
  return {
    border: variant === "secondary" ? "1px solid var(--portal-border)" : "none",
    background: variant === "secondary" ? "white" : "var(--portal-primary)",
    color: variant === "secondary" ? "var(--portal-ink)" : "white",
    borderRadius: 999,
    padding: "12px 18px",
    fontWeight: 700,
    cursor: "pointer",
  };
}

function inputStyle(): React.CSSProperties {
  return {
    width: "100%",
    borderRadius: 14,
    border: "1px solid var(--portal-border)",
    padding: "12px 14px",
    background: "white",
    color: "var(--portal-ink)",
  };
}

function cardStyle(): React.CSSProperties {
  return {
    borderRadius: 26,
    border: "1px solid var(--portal-border)",
    background: "var(--portal-card)",
    boxShadow: "0 24px 60px -36px rgba(28,32,49,0.18)",
  };
}

function LoginPage({ onLogin }: { onLogin: (user: PortalUser) => void }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@webvakwerk.nl");
  const [password, setPassword] = useState("Rookworst31!");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await portalApi.login(email, password);
      onLogin(result.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Inloggen mislukt.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ ...cardStyle(), width: "100%", maxWidth: 560, padding: 40 }}>
        <p style={{ color: "var(--portal-primary)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 12 }}>Interne portal</p>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 44, lineHeight: 1.02, margin: "14px 0 16px" }}>Inloggen op portal</h1>
        <p style={{ color: "var(--portal-muted)", marginBottom: 28 }}>
          Alleen geautoriseerde collega&apos;s hebben toegang tot tickets, uploads en interne opvolging.
        </p>
        <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
          <label>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>E-mail</div>
            <input style={inputStyle()} value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
          </label>
          <label>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Wachtwoord</div>
            <input style={inputStyle()} value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
          </label>
          {error ? <div style={{ color: "var(--portal-danger)", fontWeight: 700 }}>{error}</div> : null}
          <button type="submit" disabled={isSubmitting} style={buttonStyle()}>
            {isSubmitting ? "Bezig..." : "Inloggen"}
          </button>
        </form>
      </div>
    </main>
  );
}

function DashboardLayout({ user, onLogout }: { user: PortalUser; onLogout: () => Promise<void> }) {
  return (
    <Shell user={user} onLogout={onLogout}>
      <Outlet />
    </Shell>
  );
}

function DashboardHome({ users }: { users: PortalUser[] }) {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<{ counts: Array<{ status: string; total: number }>; latestActivity: Array<{ message: string; created_at: string; ticket_number: string; company_name: string }> } | null>(null);
  const [tickets, setTickets] = useState<PortalTicket[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [showManualCreate, setShowManualCreate] = useState(false);
  const [manualError, setManualError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [manualTicket, setManualTicket] = useState<ManualPortalTicketPayload>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    websiteUrl: "",
    industry: "",
    region: "",
    websiteType: "bedrijfswebsite",
    status: "Nieuw",
    priority: "normaal",
    seriousness: "intern",
    visualStyle: "",
    desiredOutcome: "",
    reasonForRequest: "",
    targetAudience: "",
    companyDescription: "",
  });

  async function loadDashboardData() {
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (status) query.set("status", status);
    if (priority) query.set("priority", priority);
    if (assignedUserId) query.set("assignedUserId", assignedUserId);

    const [summaryResult, ticketsResult] = await Promise.all([
      portalApi.summary(),
      portalApi.tickets(query.toString() ? `?${query.toString()}` : ""),
    ]);

    setSummary(summaryResult);
    setTickets(ticketsResult.tickets);
  }

  useEffect(() => {
    void loadDashboardData();
  }, [search, status, priority, assignedUserId]);

  return (
    <main style={{ maxWidth: 1360, margin: "0 auto", padding: 24, display: "grid", gap: 24 }}>
      <section style={{ display: "grid", gap: 18 }}>
        <div style={{ ...cardStyle(), padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 20 }}>
            <div>
              <p style={{ color: "var(--portal-primary)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 12 }}>Dashboard</p>
              <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 42, margin: "12px 0 8px" }}>Demo-aanvragen en tickets</h1>
              <p style={{ color: "var(--portal-muted)", maxWidth: 780 }}>
                Nieuwe demo-aanvragen komen hier automatisch binnen als ticket. Vanuit hier kun je status, eigenaar, notities en opvolging beheren.
              </p>
            </div>
            <button type="button" onClick={() => setShowManualCreate((current) => !current)} style={buttonStyle(showManualCreate ? "secondary" : "primary")}>
              {showManualCreate ? "Formulier sluiten" : "Handmatig ticket"}
            </button>
          </div>
        </div>

        {showManualCreate ? (
          <div style={{ ...cardStyle(), padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center" }}>
              <div>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, margin: 0 }}>Handmatig ticket aanmaken</h2>
                <p style={{ color: "var(--portal-muted)", margin: "8px 0 0" }}>
                  Gebruik dit voor telefonische aanvragen, losse leads of interne intake die niet via het publieke formulier zijn binnengekomen.
                </p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14, marginTop: 20 }}>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Bedrijfsnaam</div>
                <input style={inputStyle()} value={manualTicket.companyName} onChange={(event) => setManualTicket((current) => ({ ...current, companyName: event.target.value }))} />
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Contactpersoon</div>
                <input style={inputStyle()} value={manualTicket.contactName} onChange={(event) => setManualTicket((current) => ({ ...current, contactName: event.target.value }))} />
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>E-mail</div>
                <input style={inputStyle()} type="email" value={manualTicket.email} onChange={(event) => setManualTicket((current) => ({ ...current, email: event.target.value }))} />
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Telefoon</div>
                <input style={inputStyle()} value={manualTicket.phone || ""} onChange={(event) => setManualTicket((current) => ({ ...current, phone: event.target.value }))} />
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Website URL</div>
                <input style={inputStyle()} value={manualTicket.websiteUrl || ""} onChange={(event) => setManualTicket((current) => ({ ...current, websiteUrl: event.target.value }))} />
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Branche</div>
                <input style={inputStyle()} value={manualTicket.industry || ""} onChange={(event) => setManualTicket((current) => ({ ...current, industry: event.target.value }))} />
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Regio</div>
                <input style={inputStyle()} value={manualTicket.region || ""} onChange={(event) => setManualTicket((current) => ({ ...current, region: event.target.value }))} />
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Gewenste stijl</div>
                <input style={inputStyle()} value={manualTicket.visualStyle || ""} onChange={(event) => setManualTicket((current) => ({ ...current, visualStyle: event.target.value }))} />
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Type website</div>
                <select style={inputStyle()} value={manualTicket.websiteType} onChange={(event) => setManualTicket((current) => ({ ...current, websiteType: event.target.value }))}>
                  {["onepager", "bedrijfswebsite", "portfolio", "landingspagina", "offertewebsite", "anders"].map((entry) => (
                    <option key={entry} value={entry}>{entry}</option>
                  ))}
                </select>
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Status</div>
                <select style={inputStyle()} value={manualTicket.status} onChange={(event) => setManualTicket((current) => ({ ...current, status: event.target.value }))}>
                  {["Nieuw", "In review", "In behandeling", "Wacht op assets", "Wacht op klantreactie", "Demo in opbouw", "Demo verzonden", "Wacht op goedkeuring", "Afgerond", "Gesloten", "Afgewezen"].map((entry) => (
                    <option key={entry} value={entry}>{entry}</option>
                  ))}
                </select>
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Prioriteit</div>
                <select style={inputStyle()} value={manualTicket.priority} onChange={(event) => setManualTicket((current) => ({ ...current, priority: event.target.value }))}>
                  <option value="laag">Laag</option>
                  <option value="normaal">Normaal</option>
                  <option value="hoog">Hoog</option>
                </select>
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Seriousness</div>
                <select style={inputStyle()} value={manualTicket.seriousness} onChange={(event) => setManualTicket((current) => ({ ...current, seriousness: event.target.value }))}>
                  <option value="intern">Intern</option>
                  <option value="laag">Laag</option>
                  <option value="gemiddeld">Gemiddeld</option>
                  <option value="hoog">Hoog</option>
                </select>
              </label>
            </div>

            <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Bedrijfsomschrijving</div>
                <textarea style={{ ...inputStyle(), minHeight: 110 }} value={manualTicket.companyDescription || ""} onChange={(event) => setManualTicket((current) => ({ ...current, companyDescription: event.target.value }))} />
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Doelgroep</div>
                <textarea style={{ ...inputStyle(), minHeight: 90 }} value={manualTicket.targetAudience || ""} onChange={(event) => setManualTicket((current) => ({ ...current, targetAudience: event.target.value }))} />
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Waarom deze aanvraag?</div>
                <textarea style={{ ...inputStyle(), minHeight: 90 }} value={manualTicket.reasonForRequest || ""} onChange={(event) => setManualTicket((current) => ({ ...current, reasonForRequest: event.target.value }))} />
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Gewenste uitkomst</div>
                <textarea style={{ ...inputStyle(), minHeight: 90 }} value={manualTicket.desiredOutcome || ""} onChange={(event) => setManualTicket((current) => ({ ...current, desiredOutcome: event.target.value }))} />
              </label>
            </div>

            {manualError ? <div style={{ color: "var(--portal-danger)", fontWeight: 700, marginTop: 14 }}>{manualError}</div> : null}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 18 }}>
              <button type="button" onClick={() => setShowManualCreate(false)} style={buttonStyle("secondary")}>Annuleren</button>
              <button
                type="button"
                disabled={isCreating}
                onClick={async () => {
                  setIsCreating(true);
                  setManualError("");
                  try {
                    const result = await portalApi.createTicket(manualTicket);
                    setManualTicket({
                      companyName: "",
                      contactName: "",
                      email: "",
                      phone: "",
                      websiteUrl: "",
                      industry: "",
                      region: "",
                      websiteType: "bedrijfswebsite",
                      status: "Nieuw",
                      priority: "normaal",
                      seriousness: "intern",
                      visualStyle: "",
                      desiredOutcome: "",
                      reasonForRequest: "",
                      targetAudience: "",
                      companyDescription: "",
                    });
                    setShowManualCreate(false);
                    await loadDashboardData();
                    navigate(`/tickets/${result.ticketId}`);
                  } catch (error) {
                    setManualError(error instanceof Error ? error.message : "Ticket aanmaken mislukt.");
                  } finally {
                    setIsCreating(false);
                  }
                }}
                style={buttonStyle()}
              >
                {isCreating ? "Bezig..." : "Ticket aanmaken"}
              </button>
            </div>
          </div>
        ) : null}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16 }}>
          {(summary?.counts || []).map((entry) => (
            <div key={entry.status} style={{ ...cardStyle(), padding: 22 }}>
              <div style={{ color: "var(--portal-muted)", fontSize: 14 }}>{entry.status}</div>
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: 36, fontWeight: 800, marginTop: 8 }}>{entry.total}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "380px minmax(0, 1fr)", gap: 24 }}>
        <div style={{ ...cardStyle(), padding: 24, alignSelf: "start" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, marginTop: 0 }}>Filters</h2>
          <div style={{ display: "grid", gap: 14 }}>
            <input style={inputStyle()} placeholder="Zoek op bedrijf, ticket of contact" value={search} onChange={(event) => setSearch(event.target.value)} />
            <select style={inputStyle()} value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">Alle statussen</option>
              {["Nieuw", "In review", "In behandeling", "Wacht op assets", "Wacht op klantreactie", "Demo in opbouw", "Demo verzonden", "Wacht op goedkeuring", "Afgerond", "Gesloten", "Afgewezen"].map((entry) => (
                <option key={entry} value={entry}>{entry}</option>
              ))}
            </select>
            <select style={inputStyle()} value={priority} onChange={(event) => setPriority(event.target.value)}>
              <option value="">Alle prioriteiten</option>
              <option value="laag">Laag</option>
              <option value="normaal">Normaal</option>
              <option value="hoog">Hoog</option>
            </select>
            <select style={inputStyle()} value={assignedUserId} onChange={(event) => setAssignedUserId(event.target.value)}>
              <option value="">Iedereen</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gap: 24 }}>
          <div style={{ ...cardStyle(), padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, margin: 0 }}>Tickets</h2>
              <span style={{ color: "var(--portal-muted)" }}>{tickets.length} resultaten</span>
            </div>
            <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
              {tickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                  style={{
                    textAlign: "left",
                    borderRadius: 22,
                    border: "1px solid var(--portal-border)",
                    background: "rgba(247,242,234,0.45)",
                    padding: 18,
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                    <div>
                      <div style={{ fontWeight: 800 }}>{ticket.ticket_number} · {ticket.company_name}</div>
                      <div style={{ color: "var(--portal-muted)", marginTop: 4 }}>{ticket.contact_name} · {ticket.email}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 700 }}>{ticket.status}</div>
                      <div style={{ color: "var(--portal-muted)", fontSize: 13, marginTop: 4 }}>{formatDate(ticket.created_at)}</div>
                    </div>
                  </div>
                </button>
              ))}
              {!tickets.length ? <div style={{ color: "var(--portal-muted)" }}>Nog geen tickets gevonden.</div> : null}
            </div>
          </div>

          <div style={{ ...cardStyle(), padding: 24 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, marginTop: 0 }}>Laatste activiteit</h2>
            <div style={{ display: "grid", gap: 14 }}>
              {(summary?.latestActivity || []).map((activity) => (
                <div key={`${activity.ticket_number}-${activity.created_at}`} style={{ borderTop: "1px solid var(--portal-border)", paddingTop: 14 }}>
                  <div style={{ fontWeight: 700 }}>{activity.ticket_number} · {activity.company_name}</div>
                  <div style={{ color: "var(--portal-muted)", marginTop: 4 }}>{activity.message}</div>
                  <div style={{ color: "var(--portal-muted)", fontSize: 13, marginTop: 6 }}>{formatDate(activity.created_at)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function TicketPage({ users }: { users: PortalUser[] }) {
  const { ticketId = "" } = useParams();
  const location = useLocation();
  const [data, setData] = useState<PortalTicketDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [logMessage, setLogMessage] = useState("");
  const [logType, setLogType] = useState("status");

  async function refresh() {
    if (!ticketId) return;
    setIsLoading(true);
    setError("");

    try {
      const detail = await portalApi.ticket(ticketId);
      setData(detail);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ticket laden mislukt.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, [ticketId, location.key]);

  const requestPayload = useMemo(() => data?.ticket.request_payload || {}, [data]);

  if (isLoading) {
    return <main style={{ maxWidth: 1360, margin: "0 auto", padding: 24 }}>Ticket laden...</main>;
  }

  if (error) {
    return (
      <main style={{ maxWidth: 1360, margin: "0 auto", padding: 24 }}>
        <Link to="/dashboard" style={{ color: "var(--portal-muted)", fontWeight: 700 }}>← Terug naar dashboard</Link>
        <div style={{ ...cardStyle(), padding: 24, marginTop: 16 }}>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 32, marginTop: 0 }}>Ticket kon niet laden</h1>
          <p style={{ color: "var(--portal-danger)", fontWeight: 700 }}>{error}</p>
          <button type="button" onClick={() => void refresh()} style={buttonStyle()}>Opnieuw proberen</button>
        </div>
      </main>
    );
  }

  if (!data) {
    return <main style={{ maxWidth: 1360, margin: "0 auto", padding: 24 }}>Ticket niet gevonden.</main>;
  }

  const ticket = data.ticket;

  return (
    <main style={{ maxWidth: 1360, margin: "0 auto", padding: 24, display: "grid", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center" }}>
        <div>
          <Link to="/dashboard" style={{ color: "var(--portal-muted)", fontWeight: 700 }}>← Terug naar dashboard</Link>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 42, margin: "12px 0 8px" }}>{ticket.ticket_number} · {ticket.company_name}</h1>
          <p style={{ color: "var(--portal-muted)" }}>{ticket.contact_name} · {ticket.email} · {ticket.phone || "geen telefoon"}</p>
        </div>
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(360px, 0.8fr)", gap: 24 }}>
        <div style={{ display: "grid", gap: 24 }}>
          <div style={{ ...cardStyle(), padding: 24 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, marginTop: 0 }}>Aanvraagdetails</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
              {[
                ["Status", ticket.status],
                ["Prioriteit", ticket.priority],
                ["Type website", ticket.website_type],
                ["Seriousness", ticket.seriousness],
                ["Branche", ticket.industry],
                ["Regio", ticket.region],
                ["Website", ticket.website_url || "-"],
                ["Stijl", ticket.visual_style || "-"],
              ].map(([label, value]) => (
                <div key={label} style={{ border: "1px solid var(--portal-border)", borderRadius: 18, padding: 14 }}>
                  <div style={{ color: "var(--portal-muted)", fontSize: 13 }}>{label}</div>
                  <div style={{ marginTop: 6, fontWeight: 700 }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
              <div>
                <div style={{ fontWeight: 800 }}>Bedrijfsomschrijving</div>
                <div style={{ color: "var(--portal-muted)", marginTop: 6 }}>{String(requestPayload.companyDescription || "-")}</div>
              </div>
              <div>
                <div style={{ fontWeight: 800 }}>Doelgroep</div>
                <div style={{ color: "var(--portal-muted)", marginTop: 6 }}>{String(requestPayload.targetAudience || "-")}</div>
              </div>
              <div>
                <div style={{ fontWeight: 800 }}>Reden voor aanvraag</div>
                <div style={{ color: "var(--portal-muted)", marginTop: 6 }}>{ticket.reason_for_request || "-"}</div>
              </div>
              <div>
                <div style={{ fontWeight: 800 }}>Gewenste uitkomst</div>
                <div style={{ color: "var(--portal-muted)", marginTop: 6 }}>{ticket.desired_outcome || "-"}</div>
              </div>
            </div>
          </div>

          <div style={{ ...cardStyle(), padding: 24 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, marginTop: 0 }}>Uploads</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {data.attachments.map((attachment) => (
                <a key={attachment.id} href={`/api/portal/attachments/${attachment.id}/download`} style={{ border: "1px solid var(--portal-border)", borderRadius: 18, padding: 14, background: "rgba(247,242,234,0.45)" }}>
                  <div style={{ fontWeight: 700 }}>{attachment.original_name}</div>
                  <div style={{ color: "var(--portal-muted)", marginTop: 4 }}>{attachment.mime_type} · {Math.round(attachment.size_bytes / 1024)} KB</div>
                </a>
              ))}
              {!data.attachments.length ? <div style={{ color: "var(--portal-muted)" }}>Geen uploads beschikbaar.</div> : null}
            </div>
          </div>

          <div style={{ ...cardStyle(), padding: 24 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, marginTop: 0 }}>Historie en logs</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {data.statusHistory.map((entry) => (
                <div key={entry.id} style={{ borderBottom: "1px solid var(--portal-border)", paddingBottom: 12 }}>
                  <div style={{ fontWeight: 700 }}>{entry.from_status || "Start"} → {entry.to_status}</div>
                  <div style={{ color: "var(--portal-muted)", marginTop: 4 }}>{entry.changed_by_name || "Systeem"} · {formatDate(entry.changed_at)}</div>
                </div>
              ))}
              {data.logs.map((entry) => (
                <div key={entry.id} style={{ borderBottom: "1px solid var(--portal-border)", paddingBottom: 12 }}>
                  <div style={{ fontWeight: 700 }}>{entry.type}</div>
                  <div style={{ color: "var(--portal-muted)", marginTop: 4 }}>{entry.message}</div>
                  <div style={{ color: "var(--portal-muted)", marginTop: 4, fontSize: 13 }}>{entry.created_by_name || "Systeem"} · {formatDate(entry.created_at)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside style={{ display: "grid", gap: 24, alignSelf: "start" }}>
          <div style={{ ...cardStyle(), padding: 24 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, marginTop: 0 }}>Ticketbeheer</h2>
            <div style={{ display: "grid", gap: 14 }}>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Status</div>
                <select
                  style={inputStyle()}
                  value={ticket.status}
                  onChange={async (event) => {
                    await portalApi.updateTicket(String(ticket.id), { status: event.target.value, priority: ticket.priority, assignedUserId: ticket.assigned_user_id });
                    await refresh();
                  }}
                >
                  {["Nieuw", "In review", "In behandeling", "Wacht op assets", "Wacht op klantreactie", "Demo in opbouw", "Demo verzonden", "Wacht op goedkeuring", "Afgerond", "Gesloten", "Afgewezen"].map((entry) => (
                    <option key={entry} value={entry}>{entry}</option>
                  ))}
                </select>
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Prioriteit</div>
                <select
                  style={inputStyle()}
                  value={ticket.priority}
                  onChange={async (event) => {
                    await portalApi.updateTicket(String(ticket.id), { status: ticket.status, priority: event.target.value, assignedUserId: ticket.assigned_user_id });
                    await refresh();
                  }}
                >
                  <option value="laag">Laag</option>
                  <option value="normaal">Normaal</option>
                  <option value="hoog">Hoog</option>
                </select>
              </label>
              <label>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Toegewezen medewerker</div>
                <select
                  style={inputStyle()}
                  value={ticket.assigned_user_id || ""}
                  onChange={async (event) => {
                    await portalApi.updateTicket(String(ticket.id), { status: ticket.status, priority: ticket.priority, assignedUserId: event.target.value || null });
                    await refresh();
                  }}
                >
                  <option value="">Nog niet toegewezen</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div style={{ ...cardStyle(), padding: 24 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, marginTop: 0 }}>Interne notitie</h2>
            <textarea style={{ ...inputStyle(), minHeight: 120 }} value={note} onChange={(event) => setNote(event.target.value)} />
            <button
              style={{ ...buttonStyle(), marginTop: 14 }}
              onClick={async () => {
                if (!note.trim()) return;
                await portalApi.createNote(String(ticket.id), note.trim());
                setNote("");
                await refresh();
              }}
            >
              Notitie toevoegen
            </button>
            <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
              {data.notes.map((entry) => (
                <div key={entry.id} style={{ borderTop: "1px solid var(--portal-border)", paddingTop: 12 }}>
                  <div style={{ color: "var(--portal-muted)" }}>{entry.body}</div>
                  <div style={{ color: "var(--portal-muted)", fontSize: 13, marginTop: 6 }}>{entry.created_by_name || "Onbekend"} · {formatDate(entry.created_at)}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...cardStyle(), padding: 24 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, marginTop: 0 }}>Logregel toevoegen</h2>
            <select style={inputStyle()} value={logType} onChange={(event) => setLogType(event.target.value)}>
              <option value="email">E-mail verstuurd</option>
              <option value="follow-up">Wacht op klantreactie</option>
              <option value="concept">Concept gestart</option>
              <option value="demo">Demo opgeleverd</option>
              <option value="approval">Goedkeuring ontvangen</option>
              <option value="manual">Handmatige logregel</option>
            </select>
            <textarea style={{ ...inputStyle(), minHeight: 120, marginTop: 12 }} value={logMessage} onChange={(event) => setLogMessage(event.target.value)} />
            <button
              style={{ ...buttonStyle(), marginTop: 14 }}
              onClick={async () => {
                if (!logMessage.trim()) return;
                await portalApi.createLog(String(ticket.id), logType, logMessage.trim());
                setLogMessage("");
                await refresh();
              }}
            >
              Log toevoegen
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}

const PortalApp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<PortalUser | null>(null);
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    void portalApi.me()
      .then((result) => {
        setUser(result.user);
        return portalApi.users();
      })
      .then((result) => setUsers(result.users))
      .catch(() => setUser(null))
      .finally(() => setCheckedAuth(true));
  }, []);

  async function handleLogout() {
    await portalApi.logout();
    setUser(null);
    navigate("/login");
  }

  if (!checkedAuth) {
    return <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>Portal laden...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={async (nextUser) => {
        setUser(nextUser);
        const userResult = await portalApi.users();
        setUsers(userResult.users);
      }} />} />
      <Route element={user ? <DashboardLayout user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}>
        <Route path="/dashboard" element={<DashboardHome users={users} />} />
        <Route path="/tickets/:ticketId" element={<TicketPage users={users} />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
};

export default PortalApp;
