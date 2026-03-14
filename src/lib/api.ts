import type { DashboardResponse, Ticket } from "@/lib/workflow";

const API_BASE = "";

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${input}`, init);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Er ging iets mis met de aanvraag.");
  }

  return response.json() as Promise<T>;
}

export async function submitIntake(formData: FormData) {
  return request("/api/requests", {
    method: "POST",
    body: formData,
  });
}

export async function fetchDashboard() {
  return request<DashboardResponse>("/api/dashboard");
}

export async function convertRequestToTicket(requestId: string) {
  return request<Ticket>(`/api/requests/${requestId}/convert-to-ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
}

export async function updateTicket(ticketId: string, payload: Partial<Ticket>) {
  return request<Ticket>(`/api/tickets/${ticketId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function addTicketNote(ticketId: string, text: string) {
  return request<Ticket>(`/api/tickets/${ticketId}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
}

export async function addTicketEmail(ticketId: string, subject: string, body: string) {
  return request<Ticket>(`/api/tickets/${ticketId}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subject, body }),
  });
}
