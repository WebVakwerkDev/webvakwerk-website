export type DemoRequestPayload = {
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
  inputReadiness: string;
  desiredOutcome: string;
  privacyConsent: boolean;
  honeypot: string;
};

export type DemoRequestField = keyof DemoRequestPayload;
export type DemoRequestErrors = Partial<Record<DemoRequestField, string>>;

export const styleOptions = ["Modern", "Strak", "Warm", "Minimalistisch", "Premium", "Speels", "Ambachtelijk", "Technisch"];

export const websiteTypeOptions = [
  { value: "bedrijfswebsite", title: "Bedrijfswebsite", description: "Voor zichtbaarheid, vertrouwen en leads." },
  { value: "landingspagina", title: "Landingspagina", description: "Voor een campagne, dienst of actie." },
  { value: "portfolio", title: "Portfolio", description: "Voor cases, projecten of visueel werk." },
  { value: "anders", title: "Anders", description: "Als het net buiten deze opties valt." },
];

export const initialPayload: DemoRequestPayload = {
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
  inputReadiness: "We kunnen snel schakelen",
  desiredOutcome: "",
  privacyConsent: false,
  honeypot: "",
};

const requiredFieldMessages: Partial<Record<DemoRequestField, string>> = {
  companyName: "Bedrijfsnaam is verplicht.",
  contactName: "Contactpersoon is verplicht.",
  email: "E-mailadres is verplicht.",
  phone: "Telefoonnummer is verplicht.",
  industry: "Branche is verplicht.",
  subject: "Onderwerp is verplicht.",
  companyDescription: "Korte beschrijving van het bedrijf is verplicht.",
  companyActivities: "Beschrijf de belangrijkste activiteiten.",
  targetAudience: "Beschrijf de doelgroep.",
  primaryServices: "Noem de belangrijkste diensten of producten.",
  reasonForRequest: "Beschrijf kort waarom je deze website aanvraagt.",
  desiredOutcome: "Beschrijf het gewenste resultaat.",
};

const stepFields: DemoRequestField[][] = [
  ["companyName", "contactName", "email", "phone", "industry", "subject", "reasonForRequest"],
  ["companyDescription", "companyActivities", "targetAudience", "primaryServices"],
  ["desiredOutcome", "privacyConsent"],
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidHttpUrl(value: string) {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
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

  if (!isValidHttpUrl(payload.websiteUrl.trim())) {
    errors.websiteUrl = "Gebruik een volledige URL inclusief http:// of https://.";
  }

  if (!payload.privacyConsent) {
    errors.privacyConsent = "Je moet toestemming geven voor contact over deze aanvraag.";
  }

  return errors;
}

export function getStepErrors(payload: DemoRequestPayload, stepIndex: number) {
  const errors = validateDemoRequestPayload(payload);
  const fields = stepFields[stepIndex] || [];

  return Object.fromEntries(Object.entries(errors).filter(([field]) => fields.includes(field as DemoRequestField))) as DemoRequestErrors;
}
