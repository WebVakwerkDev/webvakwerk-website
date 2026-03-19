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
      subject: "Nieuwe website aanvraag",
      budget: "5000-10000",
      deadline: "2026-04-15",
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
        name: "Jan Jansen",
        email: "jan@bedrijf.nl",
        company: "Webvakwerk",
        phone: "+31 6 12345678",
      },
      project: {
        name: "Nieuwe website aanvraag",
        description: expect.stringContaining("Aanleiding: De huidige site converteert niet goed."),
        type: "bedrijfswebsite",
        budget: "5000-10000",
        deadline: "2026-04-15",
      },
      source: "website-form",
    });
  });
});
