import { describe, expect, it } from "vitest";
import { buildInternalApiPayload, demoRequestSchema } from "../../server/demo-request.js";
import { initialPayload, validateDemoRequestPayload } from "../lib/demo-request";

describe("demo request validation", () => {
  it("flags required frontend fields", () => {
    const errors = validateDemoRequestPayload(initialPayload);

    expect(errors.companyName).toBe("Bedrijfsnaam is verplicht.");
    expect(errors.subject).toBe("Onderwerp is verplicht.");
    expect(errors.privacyConsent).toBe("Je moet toestemming geven voor contact over deze aanvraag.");
  });

  it("maps the validated payload to the internal API payload", () => {
    const payload = demoRequestSchema.parse({
      ...initialPayload,
      companyName: "Webvakwerk",
      contactName: "Jan Jansen",
      email: "jan@bedrijf.nl",
      phone: "+31 6 12345678",
      industry: "Bouw",
      region: "Straat 1, 1234 AB Amsterdam",
      subject: "Nieuwe website aanvraag",
      companyDescription: "We bouwen maatwerk interieurs.",
      companyActivities: "Ontwerp en realisatie.",
      targetAudience: "Particulieren en architecten.",
      primaryServices: "Keukens en maatwerkmeubels.",
      reasonForRequest: "De huidige site converteert niet goed.",
      desiredOutcome: "Meer offerteaanvragen.",
      privacyConsent: true,
    });

    const result = buildInternalApiPayload(payload);

    expect(result).toEqual({
      client: {
        companyName: "Webvakwerk",
        contactName: "Jan Jansen",
        email: "jan@bedrijf.nl",
        phone: "+31 6 12345678",
        address: "Straat 1, 1234 AB Amsterdam",
      },
      project: {
        name: "Nieuwe website aanvraag",
        projectType: "NEW_WEBSITE",
        status: "INTAKE",
        priority: "MEDIUM",
        description: expect.stringContaining("Aanleiding: De huidige site converteert niet goed."),
        intakeSummary: "Aanvraag via websiteformulier",
        scope: "bedrijfswebsite, Keukens en maatwerkmeubels., Meer offerteaanvragen.",
      },
      initialLogEntry: {
        type: "EMAIL",
        subject: "Nieuwe website aanvraag",
        content: expect.stringContaining("Bedrijfsomschrijving: We bouwen maatwerk interieurs."),
        externalSenderName: "Jan Jansen",
        externalSenderEmail: "jan@bedrijf.nl",
      },
      source: {
        type: "website_form",
        label: "Website contactformulier",
      },
    });
  });
});
