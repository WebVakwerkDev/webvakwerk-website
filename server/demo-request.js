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
    .refine((value) => value === "" || /^https?:\/\//i.test(value), "Gebruik een volledige URL inclusief http:// of https://.")
    .optional()
    .or(z.literal("")),
);

const dateSchema = z.preprocess(
  trimString,
  z
    .string()
    .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), "Gebruik een geldige datum.")
    .optional()
    .or(z.literal("")),
);

export const demoRequestSchema = z.object({
  companyName: requiredTrimmedString("Bedrijfsnaam"),
  contactName: requiredTrimmedString("Contactpersoon"),
  email: emailSchema,
  phone: requiredTrimmedString("Telefoonnummer", 50),
  websiteUrl: urlSchema,
  industry: requiredTrimmedString("Branche", 120),
  region: optionalTrimmedString,
  subject: requiredTrimmedString("Onderwerp", 160),
  budget: optionalTrimmedString,
  deadline: dateSchema,
  companyDescription: requiredTrimmedString("Bedrijfsomschrijving", 1200),
  companyActivities: requiredTrimmedString("Bedrijfsactiviteiten", 1200),
  targetAudience: requiredTrimmedString("Doelgroep", 1200),
  uniqueSellingPoints: optionalTrimmedString,
  primaryServices: requiredTrimmedString("Belangrijkste diensten of producten", 1200),
  visualStyle: optionalTrimmedString,
  inspirationExamples: optionalTrimmedString,
  brandColors: optionalTrimmedString,
  avoidedColors: optionalTrimmedString,
  brandKeywords: optionalTrimmedString,
  existingBrandAssets: optionalTrimmedString,
  websiteType: requiredTrimmedString("Type website", 80),
  reasonForRequest: requiredTrimmedString("Aanvraag", 1200),
  inputReadiness: requiredTrimmedString("Inputgereedheid", 120),
  desiredOutcome: requiredTrimmedString("Gewenst resultaat", 1200),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "Je moet toestemming geven voor contact over deze aanvraag." }),
  }),
  honeypot: z.string().max(0).or(z.literal("")),
});

const descriptionSections = [
  ["Aanleiding", "reasonForRequest"],
  ["Bedrijfsomschrijving", "companyDescription"],
  ["Bedrijfsactiviteiten", "companyActivities"],
  ["Doelgroep", "targetAudience"],
  ["Belangrijkste diensten of producten", "primaryServices"],
  ["Gewenst resultaat", "desiredOutcome"],
  ["Onderscheidend vermogen", "uniqueSellingPoints"],
  ["Gewenste uitstraling", "visualStyle"],
  ["Merkwoorden", "brandKeywords"],
  ["Voorkeurskleuren", "brandColors"],
  ["Vermijden kleuren", "avoidedColors"],
  ["Bestaande merkassets", "existingBrandAssets"],
  ["Inspiratie", "inspirationExamples"],
  ["Bestaande website", "websiteUrl"],
  ["Regio", "region"],
  ["Branche", "industry"],
  ["Inputgereedheid", "inputReadiness"],
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

export function buildInternalApiPayload(payload) {
  const description = descriptionSections
    .map(([label, key]) => {
      const value = payload[key];
      return value ? `${label}: ${value}` : null;
    })
    .filter(Boolean)
    .join("\n\n");

  return {
    client: {
      name: payload.contactName,
      email: payload.email,
      company: payload.companyName,
      phone: payload.phone,
    },
    project: {
      name: payload.subject,
      description,
      type: payload.websiteType,
      budget: payload.budget || undefined,
      deadline: payload.deadline || undefined,
    },
    source: "website-form",
  };
}
