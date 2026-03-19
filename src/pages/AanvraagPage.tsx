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
  websiteType: string;
  reasonForRequest: string;
  desiredOutcome: string;
  deadline: string;
  budgetIndication: string;
  privacyConsent: boolean;
  honeypot: string;
};

const styleOptions = ["Modern", "Strak", "Luxe", "Technisch", "Lokaal", "Premium", "Speels"];

const steps = [
  { title: "Bedrijfsgegevens", description: "Wie je bent en hoe we je bereiken." },
  { title: "Bedrijfscontext", description: "Wat je doet, voor wie en hoe je wilt overkomen." },
  { title: "Afronden", description: "Laatste checks en versturen." },
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
  websiteType: "bedrijfswebsite",
  reasonForRequest: "",
  desiredOutcome: "",
  deadline: "",
  budgetIndication: "",
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
              Deze intake is bedoeld voor bedrijven die echt willen zien wat wij voor hun website kunnen neerzetten.
              Daarom vragen we direct alle input die nodig is om een sterk concept op te bouwen.
            </p>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
              Door een aanvraag te versturen ga je akkoord met onze algemene voorwaarden, inclusief afspraken over scope,
              oplevering, revisierondes en meerwerk.
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
                <p className="mt-3 text-sm font-medium text-foreground">Upload direct logo&apos;s, foto&apos;s en briefingbestanden</p>
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
                <h2 className="mt-2 font-syne text-2xl font-extrabold">Wat wij van je nodig hebbens</h2>
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
                <SectionCard title="Bedrijfsgegevens" description="De basis om je aanvraag direct goed te kunnen beoordelen.">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Bedrijfsnaam">
                      <Input value={payload.companyName} onChange={(event) => updateField("companyName", event.target.value)} />
                    </Field>
                    <Field label="Contactpersoon">
                      <Input value={payload.contactName} onChange={(event) => updateField("contactName", event.target.value)} />
                    </Field>
                    <Field label="E-mailadres">
                      <Input type="email" value={payload.email} onChange={(event) => updateField("email", event.target.value)} />
                    </Field>
                    <Field label="Telefoonnummer">
                      <Input value={payload.phone} onChange={(event) => updateField("phone", event.target.value)} />
                    </Field>
                    <Field label="Website URL">
                      <Input value={payload.websiteUrl} onChange={(event) => updateField("websiteUrl", event.target.value)} placeholder="https://..." />
                    </Field>
                    <Field label="Vestigingsplaats / regio">
                      <Input value={payload.region} onChange={(event) => updateField("region", event.target.value)} />
                    </Field>
                  </div>
                  <Field label="Branche / type bedrijf">
                    <Input value={payload.industry} onChange={(event) => updateField("industry", event.target.value)} />
                  </Field>
                </SectionCard>
              ) : null}

              {currentStep === 1 ? (
                <SectionCard title="Bedrijfscontext" description="Alles wat nodig is om een sterk websiteconcept te bouwen.">
                  <Field label="Korte beschrijving van het bedrijf">
                    <Textarea value={payload.companyDescription} onChange={(event) => updateField("companyDescription", event.target.value)} />
                  </Field>
                  <Field label="Wat doet het bedrijf?">
                    <Textarea value={payload.companyActivities} onChange={(event) => updateField("companyActivities", event.target.value)} />
                  </Field>
                  <Field label="Wie is de doelgroep?">
                    <Textarea value={payload.targetAudience} onChange={(event) => updateField("targetAudience", event.target.value)} />
                  </Field>
                  <Field label="Wat onderscheidt jullie van concurrenten?">
                    <Textarea value={payload.uniqueSellingPoints} onChange={(event) => updateField("uniqueSellingPoints", event.target.value)} />
                  </Field>
                  <Field label="Belangrijkste diensten of producten">
                    <Textarea value={payload.primaryServices} onChange={(event) => updateField("primaryServices", event.target.value)} />
                  </Field>
                  <Field label="Gewenste uitstraling">
                    <div className="flex flex-wrap gap-2">
                      {styleOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("visualStyle", option)}
                          className={`rounded-full px-4 py-2 text-sm font-bold ${payload.visualStyle === option ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Voorbeelden van websites die jullie mooi vinden">
                    <Textarea value={payload.inspirationExamples} onChange={(event) => updateField("inspirationExamples", event.target.value)} />
                  </Field>
                </SectionCard>
              ) : null}

              {currentStep === 2 ? (
                <SectionCard title="Laatste checks" description="Voordat je verstuurt, willen we zeker weten dat de aanvraag compleet is.">
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-4 text-sm text-muted-foreground">
                    Voor websitepakketten gelden maximaal 3 feedbackrondes. Extra rondes of wijzigingen buiten scope vallen
                    onder meerwerk (EUR 100 per extra feedbackronde).
                    <Link to="/voorwaarden" className="ml-1 font-bold text-primary underline-offset-4 hover:underline">
                      Bekijk alle voorwaarden
                    </Link>
                  </div>
                  <label className="flex items-start gap-3 rounded-2xl border border-foreground/5 bg-secondary/30 px-4 py-4 text-sm">
                    <Checkbox checked={payload.privacyConsent} onCheckedChange={(checked) => updateField("privacyConsent", Boolean(checked))} />
                    <span>
                      Ik ga akkoord met het privacybeleid en de
                      <Link to="/voorwaarden" className="ml-1 font-bold text-primary underline-offset-4 hover:underline">
                        algemene voorwaarden
                      </Link>
                      .
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
