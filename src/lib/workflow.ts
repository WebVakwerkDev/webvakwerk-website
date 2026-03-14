export type IntakeRequest = {
  id: string;
  createdAt: string;
  status: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  currentWebsite: string;
  websiteType: string;
  pageCount: string;
  pagesWanted: string[];
  goals: string;
  targetAudience: string;
  services: string;
  requiredSections: string[];
  functionalityNeeds: string[];
  styleDirection: string;
  colorPreferences: string;
  brandNotes: string;
  domainStatus: string;
  hostingPreference: string;
  contentStatus: string;
  extraNotes: string;
  timeline: string;
  budgetRange: string;
  logoFiles: UploadedAsset[];
  inspirationFiles: UploadedAsset[];
};

export type UploadedAsset = {
  id: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
};

export type TicketTodo = {
  id: string;
  title: string;
  done: boolean;
};

export type TicketNote = {
  id: string;
  text: string;
  createdAt: string;
};

export type TicketEmail = {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
};

export type Ticket = {
  id: string;
  requestId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  customerLabel: string;
  status: string;
  customerStatus: string;
  summary: string;
  todos: TicketTodo[];
  notes: TicketNote[];
  emails: TicketEmail[];
};

export type DashboardResponse = {
  requests: IntakeRequest[];
  tickets: Ticket[];
};
