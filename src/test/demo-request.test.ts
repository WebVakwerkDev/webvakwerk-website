import { describe, expect, it } from "vitest";
import { buildInternalApiPayload, demoRequestSchema } from "../../server/demo-request.js";
import { initialPayload, validateDemoRequestPayload } from "../lib/demo-request";

describe("demo request validation", () => {
  it("flags required frontend fields", () => {
    const errors = validateDemoRequestPayload({ ...initialPayload, companyName: "", contactName: "", email: "", phone: "" });

    expect(errors.companyName).toBe("Bedrijfsnaam is verplicht.");
    expect(errors.contactName).toBe("Contactpersoon is verplicht.");
    expect(errors.phone).toBe("Telefoonnummer is verplicht.");
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
      privacyConsent: true,
    });

    const result = buildInternalApiPayload(payload);

    expect(result).toEqual({
      client: {
        company_name: "Webvakwerk",
        contact_name: "Jan Jansen",
        email: "jan@bedrijf.nl",
        phone: "+31 6 12345678",
      },
      project_name: "Nieuwe website aanvraag",
      description: expect.stringContaining("De huidige site converteert niet goed."),
      source: "WEBSITE_FORM",
      priority: "MEDIUM",
    });
  });
});
