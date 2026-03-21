import { z } from "zod";

const MAX_FIELD_LENGTH = 2000;

const trimString = (value) => (typeof value === "string" ? value.trim() : value);

const optionalTrimmedString = z.preprocess(
  trimString,
  z
    .string()
    .max(MAX_FIELD_LENGTH, "Dit veld is te lang.")
    .optional()
    .or(z.literal("")),
);

const requiredTrimmedString = (label, max = 200) =>
  z.preprocess(
    trimString,
    z
      .string({ required_error: `${label} is verplicht.` })
      .min(1, `${label} is verplicht.`)
      .max(max, `${label} is te lang.`),
  );

const emailSchema = z.preprocess(
  trimString,
  z
    .string({ required_error: "E-mailadres is verplicht." })
    .min(1, "E-mailadres is verplicht.")
    .max(254, "E-mailadres is te lang.")
    .email("Voer een geldig e-mailadres in."),
);

const urlSchema = z.preprocess(
  trimString,
  z
    .string()
    .max(500, "Website URL is te lang.")
    .optional()
    .or(z.literal("")),
);

export const demoRequestSchema = z.object({
  companyName: requiredTrimmedString("Bedrijfsnaam"),
  contactName: requiredTrimmedString("Contactpersoon"),
  email: emailSchema,
  phone: requiredTrimmedString("Telefoonnummer", 50),
  websiteUrl: urlSchema,
  industry: optionalTrimmedString,
  region: optionalTrimmedString,
  subject: optionalTrimmedString,
  companyDescription: optionalTrimmedString,
  companyActivities: optionalTrimmedString,
  targetAudience: optionalTrimmedString,
  uniqueSellingPoints: optionalTrimmedString,
  primaryServices: optionalTrimmedString,
  visualStyle: optionalTrimmedString,
  inspirationExamples: optionalTrimmedString,
  brandColors: optionalTrimmedString,
  avoidedColors: optionalTrimmedString,
  brandKeywords: optionalTrimmedString,
  existingBrandAssets: optionalTrimmedString,
  websiteType: requiredTrimmedString("Type website", 80),
  reasonForRequest: optionalTrimmedString,
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "Je moet toestemming geven voor contact over deze aanvraag." }),
  }),
  honeypot: z.string().max(0).or(z.literal("")),
});

const descriptionSections = [
  ["Aanleiding", "reasonForRequest"],
  ["Bedrijfsomschrijving en werkzaamheden", "companySummary"],
  ["Gewenste uitstraling", "visualStyle"],
  ["Merkwoorden", "brandKeywords"],
  ["Voorkeurskleuren", "brandColors"],
  ["Vermijden kleuren", "avoidedColors"],
  ["Bestaande merkassets", "existingBrandAssets"],
  ["Inspiratie", "inspirationExamples"],
  ["Bestaande website", "websiteUrl"],
  ["Regio", "region"],
  ["Branche", "industry"],
];

const projectTypeMap = {
  bedrijfswebsite: "NEW_WEBSITE",
  landingspagina: "LANDING_PAGE",
  portfolio: "PORTFOLIO",
  anders: "OTHER",
};

export function formatValidationErrors(zodError) {
  return zodError.issues.reduce((accumulator, issue) => {
    const key = issue.path[0];

    if (typeof key === "string" && !accumulator[key]) {
      accumulator[key] = issue.message;
    }

    return accumulator;
  }, {});
}

function buildProjectDescription(payload) {
  const companySummaryParts = [
    payload.companyDescription,
    payload.companyActivities,
    payload.targetAudience,
    payload.primaryServices,
    payload.uniqueSellingPoints,
  ]
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);

  const companySummary = Array.from(new Set(companySummaryParts)).join("\n");

  return descriptionSections
    .map(([label, key]) => {
      const value = key === "companySummary" ? companySummary : payload[key];
      return value ? `${label}: ${value}` : null;
    })
    .filter(Boolean)
    .join("\n\n");
}

function buildProjectScope(payload) {
  const scopeItems = [payload.websiteType, payload.primaryServices]
    .filter(Boolean)
    .map((value) => value.trim())
    .filter(Boolean);

  return scopeItems.join(", ");
}

export function buildInternalApiPayload(payload) {
  const description = buildProjectDescription(payload);
  const scope = buildProjectScope(payload);

  return {
    client: {
      companyName: payload.companyName,
      contactName: payload.contactName,
      email: payload.email,
      phone: payload.phone,
      ...(payload.region ? { address: payload.region } : {}),
    },
    project: {
      name: payload.subject?.trim() || `${payload.companyName} — website aanvraag`,
      projectType: projectTypeMap[payload.websiteType] || "OTHER",
      status: "INTAKE",
      priority: "MEDIUM",
      description,
      intakeSummary: "Aanvraag via websiteformulier",
      scope: scope || undefined,
      tags: ["website-aanvraag"],
    },
    initialCommunication: {
      type: "EMAIL",
      subject: payload.subject,
      content: description,
      externalSenderName: payload.contactName,
      externalSenderEmail: payload.email,
    },
    source: {
      type: "website_form",
      label: "Website contactformulier",
    },
  };
}
