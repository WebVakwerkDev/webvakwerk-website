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
  ["Projecttitel", "subject"],
  ["Wat voor website heb je ongeveer nodig?", "websiteType"],
  ["Heb je al bestaande teksten die we kunnen gebruiken?", "reasonForRequest"],
  ["Korte beschrijving van je bedrijf, werkzaamheden en belangrijkste diensten", "companySummary"],
  ["Gewenste uitstraling", "visualStyle"],
  ["Voorkeurskleuren", "brandColors"],
  ["Voorbeelden van websites die jullie mooi vinden", "inspirationExamples"],
  ["Website URL", "websiteUrl"],
  ["Vestigingsplaats / regio", "region"],
  ["Branche / type bedrijf", "industry"],
];

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

export function buildInternalApiPayload(payload) {
  const description = buildProjectDescription(payload);

  return {
    client: {
      company_name: payload.companyName,
      contact_name: payload.contactName,
      email: payload.email,
      phone: payload.phone,
    },
    project_name: payload.subject?.trim() || `${payload.companyName} — website aanvraag`,
    description: description || `Website aanvraag van ${payload.companyName}`,
    source: "WEBSITE_FORM",
    priority: "MEDIUM",
  };
}
