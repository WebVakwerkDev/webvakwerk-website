import type { DashboardResponse, Ticket } from "@/lib/workflow";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${input}`, {
    credentials: "include",
    ...init,
  });

  if (!response.ok) {
    const text = await response.text();
    let parsedMessage = "";

    try {
      const parsed = JSON.parse(text);
      parsedMessage = parsed.message || "";
    } catch {
      parsedMessage = "";
    }

    throw new Error(parsedMessage || text || "Er ging iets mis met de aanvraag.");
  }

  return response.json() as Promise<T>;
}

export function getApiAssetUrl(path: string) {
  if (!path) {
    return path;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_BASE}${path}`;
}

export async function submitIntake(formData: FormData) {
  return request("/api/requests", {
    method: "POST",
    body: formData,
  });
}

export async function login(email: string, password: string) {
  return request<{ email: string }>("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function fetchCurrentUser() {
  return request<{ email: string }>("/api/auth/me");
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
