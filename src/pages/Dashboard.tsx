import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { ArrowRight, BriefcaseBusiness, Clock3, Mail, NotebookPen, RefreshCcw, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchDashboard, convertRequestToTicket, updateTicket, addTicketNote, addTicketEmail } from "@/lib/api";
import type { IntakeRequest, Ticket, TicketTodo } from "@/lib/workflow";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

function formatDate(date: string) {
  return format(new Date(date), "d MMM yyyy, HH:mm", { locale: nl });
}

function RequestDetails({ request }: { request: IntakeRequest }) {
  const allFiles = [...request.logoFiles, ...request.inspirationFiles];

  return (
    <div className="space-y-6 rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <Badge>{request.status === "converted" ? "Omgezet naar ticket" : "Nieuwe aanvraag"}</Badge>
        <span className="text-sm text-muted-foreground">{formatDate(request.createdAt)}</span>
      </div>

      <div>
        <h2 className="font-syne text-3xl font-extrabold">{request.companyName}</h2>
        <p className="mt-2 text-muted-foreground">{request.contactName} · {request.email}{request.phone ? ` · ${request.phone}` : ""}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard title="Type website" value={request.websiteType} />
        <InfoCard title="Aantal pagina's" value={request.pageCount} />
        <InfoCard title="Hosting" value={request.hostingPreference} />
        <InfoCard title="Contentstatus" value={request.contentStatus} />
      </div>

      <LongBlock title="Doel van de website" text={request.goals} />
      <LongBlock title="Doelgroep" text={request.targetAudience} />
      <LongBlock title="Diensten of producten" text={request.services} />
      <LongBlock title="Stijl en merk" text={`${request.styleDirection}\n\nKleuren: ${request.colorPreferences}\n\n${request.brandNotes}`} />
      <LongBlock title="Extra opmerkingen" text={request.extraNotes} />

      <div className="grid gap-5 md:grid-cols-2">
        <ListBlock title="Gewenste pagina's" values={request.pagesWanted} />
        <ListBlock title="Functionaliteiten" values={request.functionalityNeeds} />
      </div>

      <div className="rounded-2xl border border-border bg-secondary/50 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Upload className="h-4 w-4 text-primary" />
          <h3 className="font-bold">Uploads</h3>
        </div>
        {allFiles.length ? (
          <div className="flex flex-wrap gap-3">
            {allFiles.map((file) => (
              <a
                key={file.id}
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary"
              >
                {file.originalName}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Geen bestanden geüpload.</p>
        )}
      </div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <p className="mt-2 text-sm font-medium text-foreground">{value || "-"}</p>
    </div>
  );
}

function LongBlock({ title, text }: { title: string; text: string }) {
  if (!text) return null;

  return (
    <div className="rounded-2xl border border-border bg-secondary/30 p-5">
      <h3 className="mb-2 font-bold text-foreground">{title}</h3>
      <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function ListBlock({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/30 p-5">
      <h3 className="mb-3 font-bold text-foreground">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {values.length ? values.map((value) => <Badge key={value} variant="outline">{value}</Badge>) : <span className="text-sm text-muted-foreground">Niet ingevuld</span>}
      </div>
    </div>
  );
}

function TicketPanel({
  ticket,
  request,
  onSave,
  onAddNote,
  onAddEmail,
}: {
  ticket: Ticket;
  request?: IntakeRequest;
  onSave: (payload: Partial<Ticket>) => Promise<void>;
  onAddNote: (text: string) => Promise<void>;
  onAddEmail: (subject: string, body: string) => Promise<void>;
}) {
  const [noteText, setNoteText] = useState("");
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");

  function updateTodo(todoId: string, checked: boolean) {
    const todos: TicketTodo[] = ticket.todos.map((todo) => (
      todo.id === todoId ? { ...todo, done: checked } : todo
    ));

    void onSave({ todos });
  }

  return (
    <div className="space-y-6 rounded-[1.75rem] border border-border bg-foreground p-8 text-background shadow-[0_32px_80px_-30px_hsl(var(--ink)/0.6)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-primary">Ticket</p>
          <h2 className="mt-2 font-syne text-3xl font-extrabold">{ticket.title}</h2>
          <p className="mt-2 text-sm text-background/65">
            {request ? `${request.contactName} · ${request.email}` : ticket.customerLabel}
          </p>
        </div>
        <Badge className="bg-background text-foreground hover:bg-background" variant="secondary">
          {ticket.status}
        </Badge>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-bold text-background">Interne status</span>
          <select
            className="h-11 w-full rounded-md border border-background/10 bg-background/10 px-3 text-sm text-background"
            value={ticket.status}
            onChange={(e) => void onSave({ status: e.target.value })}
          >
            <option value="nieuw">Nieuw</option>
            <option value="in behandeling">In behandeling</option>
            <option value="wachten op klant">Wachten op klant</option>
            <option value="feedback verwerken">Feedback verwerken</option>
            <option value="opgeleverd">Opgeleverd</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-bold text-background">Klantstatus</span>
          <Input
            value={ticket.customerStatus}
            onChange={(e) => void onSave({ customerStatus: e.target.value })}
            className="border-background/10 bg-background/10 text-background placeholder:text-background/40"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-bold text-background">Projectsamenvatting</span>
        <Textarea
          value={ticket.summary}
          onChange={(e) => void onSave({ summary: e.target.value })}
          className="min-h-[110px] border-background/10 bg-background/10 text-background placeholder:text-background/40"
        />
      </label>

      <div className="rounded-2xl border border-background/10 bg-background/5 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-primary" />
          <h3 className="font-bold">Automatische to-do&apos;s</h3>
        </div>
        <div className="space-y-3">
          {ticket.todos.map((todo) => (
            <label key={todo.id} className="flex items-center gap-3 rounded-xl border border-background/10 px-4 py-3 text-sm">
              <Checkbox checked={todo.done} onCheckedChange={(value) => updateTodo(todo.id, Boolean(value))} />
              <span className={todo.done ? "line-through text-background/45" : ""}>{todo.title}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-background/10 bg-background/5 p-5">
          <div className="mb-4 flex items-center gap-2">
            <NotebookPen className="h-4 w-4 text-primary" />
            <h3 className="font-bold">Notities</h3>
          </div>
          <Textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="min-h-[120px] border-background/10 bg-background/10 text-background placeholder:text-background/40"
            placeholder="Nieuwe interne notitie"
          />
          <Button
            className="mt-3 rounded-full"
            onClick={() => {
              if (!noteText.trim()) return;
              void onAddNote(noteText.trim()).then(() => setNoteText(""));
            }}
          >
            Notitie toevoegen
          </Button>

          <div className="mt-5 space-y-3">
            {ticket.notes.length ? ticket.notes.map((note) => (
              <div key={note.id} className="rounded-xl border border-background/10 px-4 py-3">
                <p className="whitespace-pre-line text-sm text-background/85">{note.text}</p>
                <p className="mt-2 text-xs text-background/45">{formatDate(note.createdAt)}</p>
              </div>
            )) : <p className="text-sm text-background/55">Nog geen notities.</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-background/10 bg-background/5 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <h3 className="font-bold">Verstuurde mails</h3>
          </div>
          <Input
            value={mailSubject}
            onChange={(e) => setMailSubject(e.target.value)}
            className="mb-3 border-background/10 bg-background/10 text-background placeholder:text-background/40"
            placeholder="Onderwerp"
          />
          <Textarea
            value={mailBody}
            onChange={(e) => setMailBody(e.target.value)}
            className="min-h-[120px] border-background/10 bg-background/10 text-background placeholder:text-background/40"
            placeholder="Mailinhoud"
          />
          <Button
            className="mt-3 rounded-full"
            onClick={() => {
              if (!mailSubject.trim() || !mailBody.trim()) return;
              void onAddEmail(mailSubject.trim(), mailBody.trim()).then(() => {
                setMailSubject("");
                setMailBody("");
              });
            }}
          >
            Mail loggen
          </Button>

          <div className="mt-5 space-y-3">
            {ticket.emails.length ? ticket.emails.map((email) => (
              <div key={email.id} className="rounded-xl border border-background/10 px-4 py-3">
                <p className="text-sm font-bold text-background">{email.subject}</p>
                <p className="mt-2 whitespace-pre-line text-sm text-background/80">{email.body}</p>
                <p className="mt-2 text-xs text-background/45">{formatDate(email.createdAt)}</p>
              </div>
            )) : <p className="text-sm text-background/55">Nog geen mails gelogd.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });

  const requests = data?.requests ?? [];
  const tickets = data?.tickets ?? [];

  const selectedRequest = useMemo(
    () => requests.find((request) => request.id === selectedRequestId) ?? requests[0],
    [requests, selectedRequestId],
  );

  const selectedTicket = useMemo(
    () => tickets.find((ticket) => ticket.id === selectedTicketId)
      ?? (selectedRequest ? tickets.find((ticket) => ticket.requestId === selectedRequest.id) : tickets[0]),
    [tickets, selectedTicketId, selectedRequest],
  );

  async function refresh() {
    await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  }

  const convertMutation = useMutation({
    mutationFn: convertRequestToTicket,
    onSuccess: async (ticket) => {
      setSelectedTicketId(ticket.id);
      await refresh();
    },
  });

  const saveMutation = useMutation({
    mutationFn: ({ ticketId, payload }: { ticketId: string; payload: Partial<Ticket> }) => updateTicket(ticketId, payload),
    onSuccess: refresh,
  });

  const noteMutation = useMutation({
    mutationFn: ({ ticketId, text }: { ticketId: string; text: string }) => addTicketNote(ticketId, text),
    onSuccess: refresh,
  });

  const emailMutation = useMutation({
    mutationFn: ({ ticketId, subject, body }: { ticketId: string; subject: string; body: string }) => addTicketEmail(ticketId, subject, body),
    onSuccess: refresh,
  });

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      <section className="border-b border-foreground/5 bg-secondary/40 px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-5 bg-primary/10 text-primary hover:bg-primary/10" variant="secondary">
              Dashboard
            </Badge>
            <h1 className="font-syne text-4xl font-extrabold sm:text-5xl">Aanvragen en tickets op één plek</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Nieuwe intakeformulieren komen hier binnen. Vanuit hier zet je ze om naar een ticket en houd je het hele traject bij.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-full" onClick={() => void refetch()}>
              <RefreshCcw className="h-4 w-4" />
              Vernieuwen
            </Button>
            <Button asChild className="rounded-full">
              <Link to="/aanvraag">
                Nieuwe aanvraag
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <BriefcaseBusiness className="h-5 w-5 text-primary" />
                <h2 className="font-syne text-2xl font-extrabold">Aanvragen</h2>
              </div>

              <div className="space-y-3">
                {requests.map((request) => (
                  <button
                    key={request.id}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition-colors ${
                      selectedRequest?.id === request.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-secondary/20 hover:bg-secondary/40"
                    }`}
                    onClick={() => setSelectedRequestId(request.id)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold">{request.companyName}</span>
                      <Badge variant={request.status === "converted" ? "secondary" : "outline"}>
                        {request.status === "converted" ? "Ticket" : "Nieuw"}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{request.contactName}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatDate(request.createdAt)}</p>
                  </button>
                ))}
                {!requests.length && !isLoading ? <p className="text-sm text-muted-foreground">Nog geen aanvragen.</p> : null}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
              <h2 className="font-syne text-2xl font-extrabold">Tickets</h2>
              <div className="mt-4 space-y-3">
                {tickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition-colors ${
                      selectedTicket?.id === ticket.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-secondary/20 hover:bg-secondary/40"
                    }`}
                    onClick={() => setSelectedTicketId(ticket.id)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold">{ticket.customerLabel}</span>
                      <Badge variant="outline">{ticket.status}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{ticket.customerStatus}</p>
                  </button>
                ))}
                {!tickets.length && !isLoading ? <p className="text-sm text-muted-foreground">Nog geen tickets.</p> : null}
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            {isLoading ? <div className="rounded-[1.75rem] border border-border bg-card p-8">Dashboard laden...</div> : null}
            {isError ? <div className="rounded-[1.75rem] border border-destructive/40 bg-card p-8 text-destructive">De dashboarddata kon niet geladen worden. Start ook de backendserver.</div> : null}

            {!isLoading && !isError && selectedRequest ? (
              <>
                <RequestDetails request={selectedRequest} />

                {!tickets.find((ticket) => ticket.requestId === selectedRequest.id) ? (
                  <div className="rounded-[1.75rem] border border-dashed border-primary/40 bg-primary/5 p-8">
                    <h2 className="font-syne text-2xl font-extrabold">Zet deze aanvraag om naar ticket</h2>
                    <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                      Bij het omzetten maken we automatisch een ticket aan met standaard to-do&apos;s voor intake, eerste opzet, feedback en livegang.
                    </p>
                    <Button
                      className="mt-5 rounded-full"
                      disabled={convertMutation.isPending}
                      onClick={() => void convertMutation.mutateAsync(selectedRequest.id)}
                    >
                      {convertMutation.isPending ? "Omzetten..." : "Omzetten naar ticket"}
                    </Button>
                  </div>
                ) : null}
              </>
            ) : null}

            {selectedTicket ? (
              <TicketPanel
                ticket={selectedTicket}
                request={requests.find((request) => request.id === selectedTicket.requestId)}
                onSave={(payload) => saveMutation.mutateAsync({ ticketId: selectedTicket.id, payload })}
                onAddNote={(text) => noteMutation.mutateAsync({ ticketId: selectedTicket.id, text })}
                onAddEmail={(subject, body) => emailMutation.mutateAsync({ ticketId: selectedTicket.id, subject, body })}
              />
            ) : null}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
