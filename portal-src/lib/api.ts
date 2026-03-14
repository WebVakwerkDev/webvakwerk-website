export type PortalUser = {
  id: string;
  email: string;
  name: string;
  roles: string[];
};

export type PortalTicket = {
  id: number;
  public_id: string;
  ticket_number: string;
  company_name: string;
  contact_name: string;
  email: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  website_type: string;
  seriousness: string;
  assigned_user_id: string | null;
  assigned_user_name?: string | null;
};

export type PortalTicketDetail = {
  ticket: PortalTicket & {
    request_payload: Record<string, unknown>;
    phone?: string;
    website_url?: string;
    industry?: string;
    region?: string;
    visual_style?: string;
    desired_outcome?: string;
    reason_for_request?: string;
    target_audience?: string;
  };
  attachments: Array<{
    id: string;
    original_name: string;
    mime_type: string;
    size_bytes: number;
  }>;
  logs: Array<{
    id: string;
    type: string;
    message: string;
    created_at: string;
    created_by_name?: string | null;
  }>;
  notes: Array<{
    id: string;
    body: string;
    created_at: string;
    created_by_name?: string | null;
  }>;
  statusHistory: Array<{
    id: string;
    from_status?: string | null;
    to_status: string;
    changed_at: string;
    changed_by_name?: string | null;
  }>;
};

export type ManualPortalTicketPayload = {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  websiteUrl?: string;
  industry?: string;
  region?: string;
  websiteType: string;
  status: string;
  priority: string;
  seriousness: string;
  visualStyle?: string;
  desiredOutcome?: string;
  reasonForRequest?: string;
  targetAudience?: string;
  companyDescription?: string;
};

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    credentials: "include",
    headers: {
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Er ging iets mis.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const portalApi = {
  me: () => request<{ user: PortalUser }>("/api/portal/auth/me"),
  login: (email: string, password: string) =>
    request<{ user: PortalUser }>("/api/portal/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }),
  logout: () =>
    request<void>("/api/portal/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }),
  summary: () => request<{ counts: Array<{ status: string; total: number }>; latestActivity: Array<{ message: string; created_at: string; ticket_number: string; company_name: string }> }>("/api/portal/dashboard/summary"),
  users: () => request<{ users: PortalUser[] }>("/api/portal/users"),
  tickets: (query = "") => request<{ tickets: PortalTicket[] }>(`/api/portal/tickets${query}`),
  createTicket: (payload: ManualPortalTicketPayload) =>
    request<{ ticketId: number; ticketNumber: string }>("/api/portal/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  ticket: (ticketId: string) => request<PortalTicketDetail>(`/api/portal/tickets/${ticketId}`),
  updateTicket: (ticketId: string, payload: Record<string, unknown>) =>
    request<{ ok: true }>(`/api/portal/tickets/${ticketId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  createNote: (ticketId: string, body: string) =>
    request<{ ok: true }>(`/api/portal/tickets/${ticketId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body, isInternal: true }),
    }),
  createLog: (ticketId: string, type: string, message: string) =>
    request<{ ok: true }>(`/api/portal/tickets/${ticketId}/logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, message }),
    }),
};
