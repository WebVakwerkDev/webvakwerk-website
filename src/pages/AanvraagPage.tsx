import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, FileImage, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type DemoRequestPayload = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  industry: string;
  region: string;
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

const styleOptions = ["Modern", "Strak", "Warm", "Minimalistisch", "Premium", "Speels", "Ambachtelijk", "Technisch"];

const websiteTypeOptions = [
  { value: "bedrijfswebsite", title: "Bedrijfswebsite", description: "Voor zichtbaarheid, vertrouwen en leads." },
  { value: "landingspagina", title: "Landingspagina", description: "Voor een campagne, dienst of actie." },
  { value: "portfolio", title: "Portfolio", description: "Voor cases, projecten of visueel werk." },
  { value: "anders", title: "Anders", description: "Als het net buiten deze opties valt." },
];

const steps = [
  { title: "Bedrijf en project", description: "De snelle basis: wie je bent en wat je nodig hebt." },
  { title: "Doelgroep en stijl", description: "Inhoud, uitstraling en huisstijlvoorkeuren." },
  { title: "Controleren en versturen", description: "Vrijblijvend indienen en laatste controle." },
];

const initialPayload: DemoRequestPayload = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  websiteUrl: "",
  industry: "",
  region: "",
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
  inputReadiness: "we kunnen snel schakelen",
  desiredOutcome: "",
  privacyConsent: false,
  honeypot: "",
};

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
  const [currentStep, setCurrentStep] = useState(0);
  const [payload, setPayload] = useState(initialPayload);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const progress = useMemo(() => ((currentStep + 1) / steps.length) * 100, [currentStep]);

  function updateField<K extends keyof DemoRequestPayload>(key: K, value: DemoRequestPayload[K]) {
    setPayload((current) => ({ ...current, [key]: value }));
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
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      console.log("[demo-request] verzenden gestart", {
        companyName: payload.companyName,
        contactName: payload.contactName,
        email: payload.email,
        websiteType: payload.websiteType,
      });

      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload,
          fileNames: files.map((file) => file.name),
        }),
      });

      const data = await response.json().catch(() => null);

      console.log("[demo-request] response ontvangen", {
        status: response.status,
        ok: response.ok,
        data,
      });

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "De aanvraag kon niet worden verstuurd.");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("[demo-request] fout", error);
      setErrorMessage(error instanceof Error ? error.message : "De aanvraag kon niet worden verstuurd.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      <section className="relative overflow-hidden border-b border-foreground/5 bg-secondary/40 pt-14 pb-20">
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

      <section className="px-6 py-16">
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
                <SectionCard title="Bedrijf en project" description="Korte basisinformatie, zodat iemand dit in een paar minuten kan invullen.">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Bedrijfsnaam">
                      <Input
                        value={payload.companyName}
                        onChange={(event) => updateField("companyName", event.target.value)}
                        placeholder="Bijvoorbeeld: Bakkerij Jansen"
                      />
                    </Field>
                    <Field label="Contactpersoon">
                      <Input
                        value={payload.contactName}
                        onChange={(event) => updateField("contactName", event.target.value)}
                        placeholder="Voor- en achternaam"
                      />
                    </Field>
                    <Field label="E-mailadres">
                      <Input
                        type="email"
                        value={payload.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        placeholder="naam@bedrijf.nl"
                      />
                    </Field>
                    <Field label="Telefoonnummer">
                      <Input
                        value={payload.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                        placeholder="+31 6 12 34 56 78"
                      />
                    </Field>
                    <Field label="Website URL">
                      <Input
                        value={payload.websiteUrl}
                        onChange={(event) => updateField("websiteUrl", event.target.value)}
                        placeholder="https://..."
                      />
                    </Field>
                    <Field label="Vestigingsplaats / regio">
                      <Input
                        value={payload.region}
                        onChange={(event) => updateField("region", event.target.value)}
                        placeholder="Bijvoorbeeld: Amsterdam of Randstad"
                      />
                    </Field>
                  </div>
                  <Field label="Branche / type bedrijf">
                    <Input
                      value={payload.industry}
                      onChange={(event) => updateField("industry", event.target.value)}
                      placeholder="Bijvoorbeeld: bouw, zorg, horeca, consultancy"
                    />
                  </Field>
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
                  </Field>
                  <Field label="Waarom vraag je deze website aan?" helper="Een paar woorden zijn genoeg.">
                    <Textarea
                      rows={3}
                      value={payload.reasonForRequest}
                      onChange={(event) => updateField("reasonForRequest", event.target.value)}
                      placeholder="Bijvoorbeeld: huidige site is verouderd, we willen professioneler overkomen of meer aanvragen krijgen."
                    />
                  </Field>
                </SectionCard>
              ) : null}

              {currentStep === 1 ? (
                <SectionCard title="Doelgroep en stijl" description="We houden het compact, maar wel concreet genoeg om een passende richting te bepalen.">
                  <Field label="Korte beschrijving van het bedrijf">
                    <Textarea
                      rows={3}
                      value={payload.companyDescription}
                      onChange={(event) => updateField("companyDescription", event.target.value)}
                      placeholder="Wat doet jullie bedrijf in 2 of 3 zinnen?"
                    />
                  </Field>
                  <Field label="Wat doet het bedrijf?">
                    <Textarea
                      rows={3}
                      value={payload.companyActivities}
                      onChange={(event) => updateField("companyActivities", event.target.value)}
                      placeholder="Welke diensten, producten of werkzaamheden zijn het belangrijkst?"
                    />
                  </Field>
                  <Field label="Wie is de doelgroep?">
                    <Textarea
                      rows={3}
                      value={payload.targetAudience}
                      onChange={(event) => updateField("targetAudience", event.target.value)}
                      placeholder="Bijvoorbeeld: particulieren, mkb, aannemers, starters of bestaande klanten."
                    />
                  </Field>
                  <Field label="Wat onderscheidt jullie van concurrenten?">
                    <Textarea
                      rows={3}
                      value={payload.uniqueSellingPoints}
                      onChange={(event) => updateField("uniqueSellingPoints", event.target.value)}
                      placeholder="Bijvoorbeeld: snel, persoonlijk, specialistisch of premium."
                    />
                  </Field>
                  <Field label="Belangrijkste diensten of producten">
                    <Textarea
                      rows={3}
                      value={payload.primaryServices}
                      onChange={(event) => updateField("primaryServices", event.target.value)}
                      placeholder="Noem de belangrijkste diensten, producten of categorieen."
                    />
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
                      </Field>
                      <Field label="Kleuren die je niet wilt">
                        <Input
                          value={payload.avoidedColors}
                          onChange={(event) => updateField("avoidedColors", event.target.value)}
                          placeholder="Bijvoorbeeld: felgroen of paars"
                        />
                      </Field>
                      <Field label="Huisstijlwoorden" helper="Denk aan woorden als rustig, strak, warm of uitgesproken.">
                        <Input
                          value={payload.brandKeywords}
                          onChange={(event) => updateField("brandKeywords", event.target.value)}
                          placeholder="Bijvoorbeeld: professioneel, warm, modern"
                        />
                      </Field>
                      <Field label="Wat is er al aanwezig?" helper="Bijvoorbeeld een logo, lettertype, kleurenpalet of bestaande brochure.">
                        <Input
                          value={payload.existingBrandAssets}
                          onChange={(event) => updateField("existingBrandAssets", event.target.value)}
                          placeholder="Bijvoorbeeld: logo aanwezig, nog geen vaste huisstijl"
                        />
                      </Field>
                    </div>
                  </div>
                  <Field label="Voorbeelden van websites die jullie mooi vinden">
                    <Textarea
                      rows={3}
                      value={payload.inspirationExamples}
                      onChange={(event) => updateField("inspirationExamples", event.target.value)}
                      placeholder="Plak links of beschrijf kort wat je aanspreekt."
                    />
                  </Field>
                  <Field label="Bestanden uploaden" helper="Optioneel: stuur een logo, screenshot, moodboard of briefing mee.">
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.png,.jpg,.jpeg,.webp,.svg"
                      onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
                      className="h-auto py-3"
                    />
                    {files.length ? (
                      <p className="text-xs text-muted-foreground">{files.length} bestand(en) geselecteerd: {files.map((file) => file.name).join(", ")}</p>
                    ) : null}
                  </Field>
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
                  <div className="rounded-[1.5rem] border border-primary/25 bg-amber-50 px-5 py-5 text-sm text-slate-900 shadow-sm">
                    <p className="font-bold">Duidelijkheid over revisies en meerwerk</p>
                    <p className="mt-2 leading-relaxed">
                      Voor websitepakketten zijn maximaal 3 feedbackrondes inbegrepen. Extra rondes of wijzigingen buiten de
                      afgesproken scope vallen onder meerwerk van EUR 100 per extra feedbackronde.
                    </p>
                    <Link to="/voorwaarden" className="mt-3 inline-flex font-bold text-primary underline-offset-4 hover:underline">
                      Bekijk alle voorwaarden
                    </Link>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Gewenst resultaat" helper="Wat moet deze website vooral opleveren?">
                      <Textarea
                        rows={3}
                        value={payload.desiredOutcome}
                        onChange={(event) => updateField("desiredOutcome", event.target.value)}
                        placeholder="Bijvoorbeeld: meer offerteaanvragen, professionelere uitstraling of betere vindbaarheid."
                      />
                    </Field>
                    <Field label="Hoe snel kunnen jullie input aanleveren?">
                      <RadioGroup value={payload.inputReadiness} onValueChange={(value) => updateField("inputReadiness", value)} className="gap-3">
                        {[
                          "We kunnen snel schakelen",
                          "We hebben nog wat materiaal nodig",
                          "We willen eerst de richting bepalen",
                        ].map((option) => (
                          <label key={option} className="flex items-center gap-3 rounded-2xl border border-foreground/8 bg-secondary/25 px-4 py-3 text-sm text-foreground">
                            <RadioGroupItem value={option} />
                            <span>{option}</span>
                          </label>
                        ))}
                      </RadioGroup>
                    </Field>
                  </div>
                  <label className="flex items-start gap-3 rounded-2xl border border-foreground/5 bg-secondary/30 px-4 py-4 text-sm">
                    <Checkbox checked={payload.privacyConsent} onCheckedChange={(checked) => updateField("privacyConsent", Boolean(checked))} />
                    <span>
                      Ik geef toestemming om mijn gegevens te gebruiken voor contact over deze aanvraag en ik heb de
                      <Link to="/voorwaarden" className="ml-1 font-bold text-primary underline-offset-4 hover:underline">
                        algemene voorwaarden
                      </Link>
                      gelezen.
                    </span>
                  </label>
                  <div className="hidden">
                    <Input value={payload.honeypot} onChange={(event) => updateField("honeypot", event.target.value)} tabIndex={-1} autoComplete="off" />
                  </div>
                  {errorMessage ? <p className="text-sm font-bold text-destructive">{errorMessage}</p> : null}
                </SectionCard>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-4">
                <Button type="button" variant="outline" className="rounded-full" onClick={() => setCurrentStep((current) => Math.max(0, current - 1))} disabled={currentStep === 0}>
                  <ArrowLeft className="h-4 w-4" />
                  Vorige stap
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button type="button" className="rounded-full" onClick={() => setCurrentStep((current) => Math.min(steps.length - 1, current + 1))}>
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

      <Footer />
    </div>
  );
};

export default AanvraagPage;
