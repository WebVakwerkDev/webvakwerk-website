import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, FileImage, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { usePageSeo } from "@/hooks/use-page-seo";
import {
  getStepErrors,
  initialPayload,
  styleOptions,
  validateDemoRequestPayload,
  websiteTypeOptions,
  type DemoRequestErrors,
  type DemoRequestPayload,
} from "@/lib/demo-request";

const steps = [
  { title: "Bedrijf en project", description: "Vertel wie je bent en wat je nodig hebt voor je demo-website." },
  { title: "Doelgroep en stijl", description: "Inhoud, uitstraling en huisstijlvoorkeuren." },
  { title: "Controleren en versturen", description: "Vrijblijvend indienen en laatste controle." },
];

const FORM_SCROLL_OFFSET = 104;

function SectionCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="rounded-[1.75rem] border border-foreground/5 bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="font-syne text-2xl font-extrabold text-foreground">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-5">{children}</div>
    </div>
  );
}

function Field({ label, helper, children }: { label: string; helper?: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-bold text-foreground">{label}</span>
      {children}
      {helper ? <p className="text-xs text-muted-foreground">{helper}</p> : null}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-xs font-bold text-destructive">{message}</p>;
}

function ChoiceChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-foreground/10 bg-secondary text-foreground hover:border-primary/30 hover:bg-secondary/80"
      }`}
    >
      {children}
    </button>
  );
}

const AanvraagPage = () => {
  usePageSeo({
    title: "Gratis demo-aanvraag | Webvakwerk",
    description:
      "Vraag vrijblijvend een demo-website aan bij Webvakwerk. Deel je wensen, doelgroep en stijl in een korte intake.",
    canonicalPath: "/aanvraag",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [payload, setPayload] = useState(initialPayload);
  const [fieldErrors, setFieldErrors] = useState<DemoRequestErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);
  const formSectionRef = useRef<HTMLElement | null>(null);

  const progress = useMemo(() => ((currentStep + 1) / steps.length) * 100, [currentStep]);

  function scrollToFormSection() {
    const section = formSectionRef.current;

    if (!section) {
      return;
    }

    const top = section.getBoundingClientRect().top + window.scrollY - FORM_SCROLL_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  useEffect(() => {
    const onScroll = () => {
      setShowScrollPrompt(window.scrollY < 120);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function updateField<K extends keyof DemoRequestPayload>(key: K, value: DemoRequestPayload[K]) {
    setPayload((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      if (!current[key]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[key];
      return nextErrors;
    });
  }

  function toggleStyleOption(option: string) {
    setPayload((current) => {
      const selected = current.visualStyle
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

      const nextSelection = selected.includes(option)
        ? selected.filter((value) => value !== option)
        : [...selected, option];

      return { ...current, visualStyle: nextSelection.join(", ") };
    });
  }

  async function handleSubmit() {
    const validationErrors = validateDemoRequestPayload(payload);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setErrorMessage("Controleer de ingevulde velden en probeer het opnieuw.");
      scrollToFormSection();
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        if (data?.errors) {
          setFieldErrors(data.errors as DemoRequestErrors);
        }

        throw new Error(data?.message || "De aanvraag kon niet worden verstuurd.");
      }

      setIsSuccess(true);
      setFieldErrors({});
      setPayload(initialPayload);
      scrollToFormSection();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "De aanvraag kon niet worden verstuurd.");
      scrollToFormSection();
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleNextStep() {
    const stepErrors = getStepErrors(payload, currentStep);

    if (Object.keys(stepErrors).length > 0) {
      setFieldErrors((current) => ({ ...current, ...stepErrors }));
      setErrorMessage("Controleer de ingevulde velden voordat je doorgaat.");
      scrollToFormSection();
      return;
    }

    setErrorMessage("");
    setCurrentStep((current) => Math.min(steps.length - 1, current + 1));
    scrollToFormSection();
  }

  function handlePreviousStep() {
    setCurrentStep((current) => Math.max(0, current - 1));
    setErrorMessage("");
    scrollToFormSection();
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      <main id="main-content">
        <section className="relative overflow-hidden border-b border-foreground/5 bg-secondary/40 pt-14 pb-14">
          <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.22),transparent_60%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <Sparkles className="h-4 w-4" />
              Gratis demo-aanvraag
            </span>
            <h1 className="mt-6 max-w-3xl font-syne text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Vraag een demo-website aan.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Deze intake is vrijblijvend. Je zit na het invullen nergens aan vast, maar geeft ons wel genoeg context om
              snel te beoordelen of we een sterk websiteconcept voor je kunnen neerzetten.
            </p>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
              Pas als we samen echt een opdracht starten, gelden de afspraken over scope, oplevering, revisierondes en
              meerwerk uit onze voorwaarden.
              <Link to="/voorwaarden" className="ml-1 font-bold text-primary underline-offset-4 hover:underline">
                Lees de voorwaarden
              </Link>
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-foreground/5 bg-card p-5 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-medium text-foreground">Gericht op serieuze aanvragen</p>
              </div>
              <div className="rounded-2xl border border-foreground/5 bg-card p-5 shadow-sm">
                <FileImage className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-medium text-foreground">Deel direct logo&apos;s, voorbeelden en briefingmateriaal</p>
              </div>
              <div className="rounded-2xl border border-foreground/5 bg-card p-5 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-medium text-foreground">Veilig verwerkt en intern opgevolgd</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-foreground/5 bg-card p-7 shadow-[0_32px_80px_-32px_hsl(var(--ink)/0.18)] sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Aanvraagflow</p>
                <h2 className="mt-2 font-syne text-2xl font-extrabold">Wat wij van je nodig hebben</h2>
              </div>
              <span className="rounded-full bg-secondary px-4 py-1 text-sm font-bold text-foreground">
                {currentStep + 1}/{steps.length}
              </span>
            </div>
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-foreground/5">
              <motion.div animate={{ width: `${progress}%` }} className="h-full rounded-full bg-primary" />
            </div>
            <div className="mt-8 space-y-4">
              {steps.map((step, index) => (
                <div key={step.title} className={`rounded-2xl border px-4 py-4 ${index === currentStep ? "border-primary bg-primary/5" : "border-foreground/5 bg-secondary/40"}`}>
                  <p className="text-sm font-bold text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          </div>
        </section>

        {currentStep === 0 && !isSuccess && showScrollPrompt ? (
          <motion.button
            type="button"
            onClick={scrollToFormSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-5 left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-foreground/10 bg-card/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-foreground shadow-[0_12px_30px_-18px_hsl(var(--ink)/0.45)] backdrop-blur-sm transition-colors hover:border-primary/35 hover:text-primary"
            aria-label="Scroll naar aanvraagformulier"
          >
            Naar formulier
            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.button>
        ) : null}

        <section ref={formSectionRef} className="px-6 py-10 sm:py-12">
          <div className="mx-auto max-w-5xl">
          {isSuccess ? (
            <div className="rounded-[2rem] border border-foreground/5 bg-card p-8 text-center shadow-sm">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-6 font-syne text-3xl font-extrabold">Aanvraag ontvangen</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Je aanvraag staat bij ons binnen. We beoordelen of dit past binnen onze demo-aanpak en nemen daarna contact met je op.
              </p>
              <Button asChild className="mt-8 rounded-full">
                <Link to="/">Terug naar home</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {currentStep === 0 ? (
                <SectionCard title="Bedrijf en project" description="Vul hier je bedrijfsgegevens en wensen in, zodat we je demo-website gericht kunnen voorbereiden.">
                  <p className="-mt-2 text-xs text-muted-foreground">Velden met <span className="text-destructive font-bold">*</span> zijn verplicht.</p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Bedrijfsnaam *">
                      <Input
                        value={payload.companyName}
                        onChange={(event) => updateField("companyName", event.target.value)}
                        placeholder="Bijvoorbeeld: Bakkerij Jansen"
                      />
                      <FieldError message={fieldErrors.companyName} />
                    </Field>
                    <Field label="Contactpersoon *">
                      <Input
                        value={payload.contactName}
                        onChange={(event) => updateField("contactName", event.target.value)}
                        placeholder="Voor- en achternaam"
                      />
                      <FieldError message={fieldErrors.contactName} />
                    </Field>
                    <Field label="E-mailadres *">
                      <Input
                        type="email"
                        value={payload.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        placeholder="naam@bedrijf.nl"
                      />
                      <FieldError message={fieldErrors.email} />
                    </Field>
                    <Field label="Telefoonnummer *">
                      <Input
                        value={payload.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                        placeholder="+31 6 12 34 56 78"
                      />
                      <FieldError message={fieldErrors.phone} />
                    </Field>
                    <Field label="Website URL" helper="Leeghouden als je nog niet over een website beschikt.">
                      <Input
                        value={payload.websiteUrl}
                        onChange={(event) => updateField("websiteUrl", event.target.value)}
                        placeholder="Bijvoorbeeld: webvakwerk.nl"
                      />
                      <FieldError message={fieldErrors.websiteUrl} />
                    </Field>
                    <Field label="Vestigingsplaats / regio">
                      <Input
                        value={payload.region}
                        onChange={(event) => updateField("region", event.target.value)}
                        placeholder="Bijvoorbeeld: Amsterdam of Randstad"
                      />
                      <FieldError message={fieldErrors.region} />
                    </Field>
                  </div>
                  <Field label="Branche / type bedrijf">
                    <Input
                      value={payload.industry}
                      onChange={(event) => updateField("industry", event.target.value)}
                      placeholder="Bijvoorbeeld: bouw, zorg, horeca, consultancy"
                    />
                    <FieldError message={fieldErrors.industry} />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Projecttitel"
                      helper="Deze titel gebruiken we als onderwerp van je aanvraag en als projectnaam in verdere administratie (zoals offerte/factuur)."
                    >
                      <Input
                        value={payload.subject}
                        onChange={(event) => updateField("subject", event.target.value)}
                        placeholder="Bijvoorbeeld: Ontwerp en realisatie nieuwe website"
                      />
                      <FieldError message={fieldErrors.subject} />
                    </Field>
                  </div>
                  <Field label="Wat voor website heb je ongeveer nodig?" helper="Kies de richting die het dichtst in de buurt komt.">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {websiteTypeOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => updateField("websiteType", option.value)}
                          className={`rounded-2xl border p-4 text-left transition-colors ${
                            payload.websiteType === option.value
                              ? "border-primary bg-primary/8 shadow-sm"
                              : "border-foreground/8 bg-secondary/30 hover:border-primary/25"
                          }`}
                        >
                          <p className="text-sm font-bold text-foreground">{option.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
                        </button>
                      ))}
                    </div>
                    <FieldError message={fieldErrors.websiteType} />
                  </Field>
                </SectionCard>
              ) : null}

              {currentStep === 1 ? (
                <SectionCard title="Doelgroep en stijl" description="We houden het compact, maar wel concreet genoeg om een passende richting te bepalen.">
                  <Field
                    label="Korte beschrijving van je bedrijf, werkzaamheden en belangrijkste diensten"
                    helper="Handig om te noemen: wat je precies doet, wie je doelgroep is, je 3-5 belangrijkste diensten/producten, je werkwijze en wat je onderscheidt van concurrenten."
                  >
                    <Textarea
                      rows={4}
                      value={payload.companyDescription}
                      onChange={(event) => updateField("companyDescription", event.target.value)}
                      placeholder="Bijvoorbeeld: Wij helpen mkb-bedrijven met installatie en onderhoud van zonnepanelen. Doelgroep: huiseigenaren en kleine bedrijven in regio Utrecht. Belangrijkste diensten: advies, installatie, monitoring en servicecontracten. We onderscheiden ons met snelle service en vaste contactpersonen."
                    />
                    <FieldError message={fieldErrors.companyDescription} />
                  </Field>
                  <Field
                    label="Heb je al bestaande teksten die we kunnen gebruiken?"
                    helper="Plak hier bestaande teksten of notities. Je mag hier ook stijlwoorden, kleuren die je juist niet wilt en wat je al hebt (zoals logo/brandguide) toevoegen. Heb je nog niets? Zet dan: ik denk er zelf nog over na."
                  >
                    <Textarea
                      rows={3}
                      value={payload.reasonForRequest}
                      onChange={(event) => updateField("reasonForRequest", event.target.value)}
                      placeholder="Bijvoorbeeld: We hebben al teksten per dienst en een logo. Stijlwoorden: strak en professioneel. Geen felle kleuren. Of: nog geen teksten, ik denk er zelf nog over na."
                    />
                    <FieldError message={fieldErrors.reasonForRequest} />
                  </Field>
                  <Field label="Gewenste uitstraling" helper="Selecteer gerust meerdere richtingen.">
                    <div className="flex flex-wrap gap-2">
                      {styleOptions.map((option) => (
                        <ChoiceChip
                          key={option}
                          active={payload.visualStyle.split(",").map((value) => value.trim()).includes(option)}
                          onClick={() => toggleStyleOption(option)}
                        >
                          {option}
                        </ChoiceChip>
                      ))}
                    </div>
                    <FieldError message={fieldErrors.visualStyle} />
                  </Field>
                  <div className="rounded-[1.5rem] border border-foreground/8 bg-secondary/25 p-5 sm:p-6">
                    <h3 className="font-syne text-xl font-extrabold text-foreground">Kleur- en huisstijlwensen</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Dit helpt om sneller een richting te kiezen die echt bij jullie merk past.
                    </p>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <Field label="Voorkeurskleuren" helper="Noem kleuren, tinten of hex-codes als je die hebt.">
                        <Input
                          value={payload.brandColors}
                          onChange={(event) => updateField("brandColors", event.target.value)}
                          placeholder="Bijvoorbeeld: donkerblauw, zand, koper"
                        />
                        <FieldError message={fieldErrors.brandColors} />
                      </Field>
                    </div>
                  </div>
                  <Field label="Voorbeelden van websites die jullie mooi vinden" helper="Optioneel: dit is geen must en niet verplicht.">
                    <Textarea
                      rows={3}
                      value={payload.inspirationExamples}
                      onChange={(event) => updateField("inspirationExamples", event.target.value)}
                      placeholder="Plak links of beschrijf kort wat je aanspreekt."
                    />
                    <FieldError message={fieldErrors.inspirationExamples} />
                  </Field>
                  <div className="rounded-2xl border border-foreground/8 bg-secondary/25 px-4 py-4 text-sm text-muted-foreground">
                    Bestanden meesturen? Mail ze na je aanvraag naar info@webvakwerk.nl.
                  </div>
                </SectionCard>
              ) : null}

              {currentStep === 2 ? (
                <SectionCard title="Laatste checks" description="Dien je aanvraag vrijblijvend in. Dit is nog geen opdracht of betaalverplichting.">
                  <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-5 text-sm text-emerald-950 shadow-sm">
                    <p className="font-bold">Het invullen van dit formulier is volledig vrijblijvend.</p>
                    <p className="mt-2 leading-relaxed">
                      Je zit na het versturen nog nergens aan vast. We bekijken eerst of jouw aanvraag past, en nemen daarna
                      contact met je op om de mogelijkheden te bespreken.
                    </p>
                  </div>
                  <label className="flex items-start gap-3 rounded-2xl border border-foreground/5 bg-secondary/30 px-4 py-4 text-sm">
                    <Checkbox checked={payload.privacyConsent} onCheckedChange={(checked) => updateField("privacyConsent", Boolean(checked))} />
                    <span>
                      Ik geef toestemming om mijn gegevens te gebruiken voor contact over deze aanvraag en ik heb de{" "}
                      <Link to="/voorwaarden" className="font-bold text-primary underline-offset-4 hover:underline">
                        algemene voorwaarden
                      </Link>
                      {" "}gelezen.
                    </span>
                  </label>
                  <FieldError message={fieldErrors.privacyConsent} />
                  <div className="hidden">
                    <Input value={payload.honeypot} onChange={(event) => updateField("honeypot", event.target.value)} tabIndex={-1} autoComplete="off" />
                  </div>
                  {errorMessage ? <p className="text-sm font-bold text-destructive" role="alert">{errorMessage}</p> : null}
                </SectionCard>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-4">
                <Button type="button" variant="outline" className="rounded-full" onClick={handlePreviousStep} disabled={currentStep === 0}>
                  <ArrowLeft className="h-4 w-4" />
                  Vorige stap
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button type="button" className="rounded-full" onClick={handleNextStep}>
                    Volgende stap
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="button" className="rounded-full" disabled={isSubmitting} onClick={handleSubmit}>
                    {isSubmitting ? "Bezig met versturen..." : "Aanvraag versturen"}
                  </Button>
                )}
              </div>
            </div>
          )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AanvraagPage;
