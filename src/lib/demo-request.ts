export type DemoRequestPayload = {
  serviceType: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  industry: string;
  region: string;
  subject: string;
  companyDescription: string;
  companyActivities: string;
  targetAudience: string;
  uniqueSellingPoints: string;
  primaryServices: string;
  visualStyle: string;
  inspirationExamples: string;
  brandColors: string;
  avoidedColors: string;
  brandKeywords: string;
  existingBrandAssets: string;
  websiteType: string;
  reasonForRequest: string;
  automationProcesses: string;
  currentTools: string;
  desiredOutcome: string;
  privacyConsent: boolean;
  honeypot: string;
};

export type DemoRequestField = keyof DemoRequestPayload;
export type DemoRequestErrors = Partial<Record<DemoRequestField, string>>;

export const styleOptions = ["Modern", "Strak", "Warm", "Minimalistisch", "Premium", "Speels", "Ambachtelijk", "Technisch"];


export function generateSubjectSuggestion(serviceType: string, websiteType: string): string {
  if (serviceType === "automatisering") {
    return "Uitwerking automatiseringsproces";
  }
  if (serviceType === "website") {
    const map: Record<string, string> = {
      bedrijfswebsite: "Ontwerp en realisatie bedrijfswebsite",
      landingspagina: "Ontwerp en realisatie landingspagina",
      portfolio: "Ontwerp en realisatie portfolio",
      anders: "Ontwerp en realisatie website",
    };
    return map[websiteType] ?? "Ontwerp en realisatie website";
  }
  return "";
}

export const websiteTypeOptions = [
  { value: "bedrijfswebsite", title: "Bedrijfswebsite", description: "Voor zichtbaarheid, vertrouwen en leads." },
  { value: "landingspagina", title: "Landingspagina", description: "Voor een campagne, dienst of actie." },
  { value: "portfolio", title: "Portfolio", description: "Voor cases, projecten of visueel werk." },
  { value: "anders", title: "Anders", description: "Als het net buiten deze opties valt." },
];

export const initialPayload: DemoRequestPayload = {
  serviceType: "website",
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  websiteUrl: "",
  industry: "",
  region: "",
  subject: "",
  companyDescription: "",
  companyActivities: "",
  targetAudience: "",
  uniqueSellingPoints: "",
  primaryServices: "",
  visualStyle: "",
  inspirationExamples: "",
  brandColors: "",
  avoidedColors: "",
  brandKeywords: "",
  existingBrandAssets: "",
  websiteType: "bedrijfswebsite",
  reasonForRequest: "",
  automationProcesses: "",
  currentTools: "",
  desiredOutcome: "",
  privacyConsent: false,
  honeypot: "",
};

const requiredFieldMessages: Partial<Record<DemoRequestField, string>> = {
  serviceType: "Kies een diensttype.",
  companyName: "Bedrijfsnaam is verplicht.",
  contactName: "Contactpersoon is verplicht.",
  email: "E-mailadres is verplicht.",
  phone: "Telefoonnummer is verplicht.",
};

const stepFields: DemoRequestField[][] = [
  ["serviceType", "companyName", "contactName", "email", "phone"],
  [],
  ["privacyConsent"],
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateDemoRequestPayload(payload: DemoRequestPayload) {
  const errors: DemoRequestErrors = {};

  for (const [field, message] of Object.entries(requiredFieldMessages) as [DemoRequestField, string][]) {
    const value = payload[field];

    if (typeof value === "string" && !value.trim()) {
      errors[field] = message;
    }
  }

  if (payload.email && !isValidEmail(payload.email.trim())) {
    errors.email = "Voer een geldig e-mailadres in.";
  }

  if (!payload.privacyConsent) {
    errors.privacyConsent = "Je moet toestemming geven voor contact over deze aanvraag.";
  }

  return errors;
}

export function getStepErrors(payload: DemoRequestPayload, stepIndex: number) {
  const errors = validateDemoRequestPayload(payload);
  const fields = stepFields[stepIndex] || [];

  return Object.fromEntries(
    Object.entries(errors).filter(([field]) => fields.includes(field as DemoRequestField))
  ) as DemoRequestErrors;
}
