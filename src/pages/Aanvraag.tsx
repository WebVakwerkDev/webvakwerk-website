import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, ImagePlus, LayoutTemplate, Palette, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { submitIntake } from "@/lib/api";

const pageOptions = ["Home", "Over ons", "Diensten", "Cases", "Tarieven", "FAQ", "Contact"];
const sectionOptions = ["Hero", "Diensten", "USP's", "Reviews", "Portfolio", "Contactformulier", "CTA"];
const featureOptions = ["Contactformulier", "WhatsApp knop", "Offerte aanvraag", "Agenda koppeling", "Blog", "Meertaligheid"];

type FormState = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  currentWebsite: string;
  websiteType: string;
  pageCount: string;
  goals: string;
  targetAudience: string;
  services: string;
  styleDirection: string;
  colorPreferences: string;
  brandNotes: string;
  domainStatus: string;
  hostingPreference: string;
  contentStatus: string;
  extraNotes: string;
  timeline: string;
  budgetRange: string;
};

const initialState: FormState = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  businessType: "",
  currentWebsite: "",
  websiteType: "single-page",
  pageCount: "1",
  goals: "",
  targetAudience: "",
  services: "",
  styleDirection: "",
  colorPreferences: "",
  brandNotes: "",
  domainStatus: "nog-niet",
  hostingPreference: "hosting-via-ons",
  contentStatus: "gedeeltelijk-klaar",
  extraNotes: "",
  timeline: "",
  budgetRange: "",
};

function ToggleGroup({
  options,
  values,
  onChange,
}: {
  options: string[];
  values: string[];
  onChange: (nextValues: string[]) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const checked = values.includes(option);

        return (
          <label
            key={option}
            className="flex items-center gap-3 rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm"
          >
            <Checkbox
              checked={checked}
              onCheckedChange={(state) => {
                if (state) {
                  onChange([...values, option]);
                } else {
                  onChange(values.filter((item) => item !== option));
                }
              }}
            />
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
}

function Field({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <div className="space-y-1">
        <span className="block text-sm font-bold text-foreground">{label}</span>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </label>
  );
}

const Aanvraag = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [pagesWanted, setPagesWanted] = useState<string[]>(["Home", "Contact"]);
  const [requiredSections, setRequiredSections] = useState<string[]>(["Hero", "Diensten", "Contactformulier"]);
  const [functionalityNeeds, setFunctionalityNeeds] = useState<string[]>(["Contactformulier"]);
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [inspirationFiles, setInspirationFiles] = useState<File[]>([]);
  const [isDone, setIsDone] = useState(false);

  const mutation = useMutation({
    mutationFn: submitIntake,
    onSuccess: () => {
      setIsDone(true);
      setForm(initialState);
      setPagesWanted(["Home", "Contact"]);
      setRequiredSections(["Hero", "Diensten", "Contactformulier"]);
      setFunctionalityNeeds(["Contactformulier"]);
      setLogoFiles([]);
      setInspirationFiles([]);
    },
  });

  const checklist = useMemo(
    () => [
      "Bedrijfsinfo en contactgegevens",
      "Type website en gewenste pagina's",
      "Wensen voor stijl, kleuren en inhoud",
      "Logo's, iconen en voorbeeldbeelden uploaden",
    ],
    [],
  );

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDone(false);

    const payload = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, value);
    });

    payload.append("pagesWanted", JSON.stringify(pagesWanted));
    payload.append("requiredSections", JSON.stringify(requiredSections));
    payload.append("functionalityNeeds", JSON.stringify(functionalityNeeds));

    logoFiles.forEach((file) => payload.append("logoFiles", file));
    inspirationFiles.forEach((file) => payload.append("inspirationFiles", file));

    await mutation.mutateAsync(payload);
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      <section className="relative overflow-hidden border-b border-foreground/5 bg-secondary/40 px-6 py-16 lg:py-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.2),transparent_60%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/10" variant="secondary">
              Aanvraag
            </Badge>
            <h1 className="mb-6 max-w-3xl font-syne text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Vertel wat je nodig hebt. Dan kunnen wij snel bouwen.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Deze intake verzamelt alles wat nodig is om je website goed op te zetten:
              structuur, stijl, inhoud, bestanden, hosting en praktische wensen.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {checklist.map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                    <p className="text-sm font-medium text-foreground">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-foreground/10 bg-card p-8 shadow-[0_32px_80px_-30px_hsl(var(--ink)/0.22)]"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Snel geregeld</p>
                <h2 className="mt-2 font-syne text-2xl font-extrabold">Wat we van je nodig hebben</h2>
              </div>
              <LayoutTemplate className="h-8 w-8 text-primary" />
            </div>

            <div className="grid gap-4 text-sm text-muted-foreground">
              <div className="rounded-2xl bg-secondary/60 p-4">
                Kies of het om een single page of een website met meerdere pagina&apos;s gaat.
              </div>
              <div className="rounded-2xl bg-secondary/60 p-4">
                Upload je logo, iconen of beelden die je terug wilt zien.
              </div>
              <div className="rounded-2xl bg-secondary/60 p-4">
                Geef je huisstijl, kleuren, teksten en praktische voorkeuren door.
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="rounded-full border border-foreground/10 px-5 py-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
              >
                Dashboard openen
              </Link>
              <a
                href="/#prijzen"
                className="rounded-full border border-foreground/10 px-5 py-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
              >
                Bekijk prijzen
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <form className="grid gap-8" onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
                <div className="mb-8 flex items-center gap-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-syne text-2xl font-extrabold">Bedrijf en contact</h3>
                    <p className="text-sm text-muted-foreground">Basisinformatie voor de aanvraag.</p>
                  </div>
                </div>

                <div className="grid gap-5">
                  <Field label="Bedrijfsnaam">
                    <Input required value={form.companyName} onChange={(e) => updateField("companyName", e.target.value)} />
                  </Field>
                  <Field label="Contactpersoon">
                    <Input required value={form.contactName} onChange={(e) => updateField("contactName", e.target.value)} />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="E-mail">
                      <Input required type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
                    </Field>
                    <Field label="Telefoon">
                      <Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
                    </Field>
                  </div>
                  <Field label="Wat voor bedrijf heb je?">
                    <Input value={form.businessType} onChange={(e) => updateField("businessType", e.target.value)} placeholder="Bijvoorbeeld: schilder, coach, hoveniersbedrijf" />
                  </Field>
                  <Field label="Huidige website" description="Heb je al een domein of bestaande site? Vul die hier in.">
                    <Input value={form.currentWebsite} onChange={(e) => updateField("currentWebsite", e.target.value)} placeholder="https://..." />
                  </Field>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
                <div className="mb-8 flex items-center gap-3">
                  <LayoutTemplate className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-syne text-2xl font-extrabold">Website en inhoud</h3>
                    <p className="text-sm text-muted-foreground">Hoe moet de website eruitzien en wat moet erop staan?</p>
                  </div>
                </div>

                <div className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Type website">
                      <select
                        className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                        value={form.websiteType}
                        onChange={(e) => updateField("websiteType", e.target.value)}
                      >
                        <option value="single-page">Single page website</option>
                        <option value="multi-page">Multi page website</option>
                      </select>
                    </Field>
                    <Field label="Aantal pagina's">
                      <Input value={form.pageCount} onChange={(e) => updateField("pageCount", e.target.value)} />
                    </Field>
                  </div>

                  <Field label="Welke pagina's wil je?" description="Kies wat sowieso nodig is.">
                    <ToggleGroup options={pageOptions} values={pagesWanted} onChange={setPagesWanted} />
                  </Field>

                  <Field label="Belangrijkste secties">
                    <ToggleGroup options={sectionOptions} values={requiredSections} onChange={setRequiredSections} />
                  </Field>

                  <Field label="Functionaliteiten">
                    <ToggleGroup options={featureOptions} values={functionalityNeeds} onChange={setFunctionalityNeeds} />
                  </Field>

                  <Field label="Wat moet de website opleveren?">
                    <Textarea
                      value={form.goals}
                      onChange={(e) => updateField("goals", e.target.value)}
                      placeholder="Bijvoorbeeld: meer offerte-aanvragen, meer telefoontjes, professioneler overkomen"
                    />
                  </Field>

                  <Field label="Doelgroep">
                    <Textarea
                      value={form.targetAudience}
                      onChange={(e) => updateField("targetAudience", e.target.value)}
                      placeholder="Voor wie is de website bedoeld?"
                    />
                  </Field>

                  <Field label="Diensten of producten">
                    <Textarea
                      value={form.services}
                      onChange={(e) => updateField("services", e.target.value)}
                      placeholder="Beschrijf kort wat je verkoopt of aanbiedt"
                    />
                  </Field>
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
                <div className="mb-8 flex items-center gap-3">
                  <Palette className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-syne text-2xl font-extrabold">Stijl en merk</h3>
                    <p className="text-sm text-muted-foreground">Alles over uitstraling, kleuren en merkgevoel.</p>
                  </div>
                </div>

                <div className="grid gap-5">
                  <Field label="Welke stijl zoek je?">
                    <Textarea
                      value={form.styleDirection}
                      onChange={(e) => updateField("styleDirection", e.target.value)}
                      placeholder="Bijvoorbeeld: strak, luxe, modern, rustig, technisch, warm"
                    />
                  </Field>
                  <Field label="Huisstijlkleuren">
                    <Input
                      value={form.colorPreferences}
                      onChange={(e) => updateField("colorPreferences", e.target.value)}
                      placeholder="Bijvoorbeeld: oranje, zwart en wit of #F0642B"
                    />
                  </Field>
                  <Field label="Merkopmerkingen">
                    <Textarea
                      value={form.brandNotes}
                      onChange={(e) => updateField("brandNotes", e.target.value)}
                      placeholder="Vertel wat absoluut wel of niet bij je merk past"
                    />
                  </Field>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
                <div className="mb-8 flex items-center gap-3">
                  <ImagePlus className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-syne text-2xl font-extrabold">Uploads en bestanden</h3>
                    <p className="text-sm text-muted-foreground">Logo&apos;s, iconen, inspiratie en beelden die gebruikt moeten worden.</p>
                  </div>
                </div>

                <div className="grid gap-5">
                  <Field label="Logo's of iconen uploaden">
                    <Input type="file" multiple accept="image/*,.svg,.pdf" onChange={(e) => setLogoFiles(Array.from(e.target.files || []))} />
                  </Field>
                  {logoFiles.length ? (
                    <div className="flex flex-wrap gap-2">
                      {logoFiles.map((file) => (
                        <Badge key={`${file.name}-${file.size}`} variant="outline">
                          {file.name}
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  <Field label="Inspiratiebeelden of voorbeelden">
                    <Input type="file" multiple accept="image/*,.pdf" onChange={(e) => setInspirationFiles(Array.from(e.target.files || []))} />
                  </Field>
                  {inspirationFiles.length ? (
                    <div className="flex flex-wrap gap-2">
                      {inspirationFiles.map((file) => (
                        <Badge key={`${file.name}-${file.size}`} variant="outline">
                          {file.name}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
                <h3 className="mb-8 font-syne text-2xl font-extrabold">Praktisch</h3>
                <div className="grid gap-5">
                  <Field label="Domeinstatus">
                    <select
                      className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                      value={form.domainStatus}
                      onChange={(e) => updateField("domainStatus", e.target.value)}
                    >
                      <option value="nog-niet">Nog geen domein</option>
                      <option value="bestaat-al">Domein bestaat al</option>
                      <option value="weet-ik-niet">Weet ik nog niet</option>
                    </select>
                  </Field>
                  <Field label="Hosting">
                    <select
                      className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                      value={form.hostingPreference}
                      onChange={(e) => updateField("hostingPreference", e.target.value)}
                    >
                      <option value="hosting-via-ons">Hosting via jullie</option>
                      <option value="eigen-provider">Eigen hostingprovider of IT-partij</option>
                      <option value="nog-onbekend">Nog niet besloten</option>
                    </select>
                  </Field>
                  <Field label="Teksten en content">
                    <select
                      className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                      value={form.contentStatus}
                      onChange={(e) => updateField("contentStatus", e.target.value)}
                    >
                      <option value="klaar">Alles is al klaar</option>
                      <option value="gedeeltelijk-klaar">Gedeeltelijk klaar</option>
                      <option value="hulp-nodig">Hulp nodig met teksten</option>
                    </select>
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Gewenste planning">
                      <Input value={form.timeline} onChange={(e) => updateField("timeline", e.target.value)} placeholder="Bijvoorbeeld: binnen 3 weken" />
                    </Field>
                    <Field label="Budgetindicatie">
                      <Input value={form.budgetRange} onChange={(e) => updateField("budgetRange", e.target.value)} placeholder="Bijvoorbeeld: 750 - 1500" />
                    </Field>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
                <h3 className="mb-8 font-syne text-2xl font-extrabold">Extra toelichting</h3>
                <div className="grid gap-5">
                  <Field label="Extra wensen of opmerkingen">
                    <Textarea
                      value={form.extraNotes}
                      onChange={(e) => updateField("extraNotes", e.target.value)}
                      className="min-h-[220px]"
                      placeholder="Alles wat verder belangrijk is voor het bouwen van de website"
                    />
                  </Field>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-foreground/10 bg-foreground px-8 py-8 text-background shadow-[0_30px_80px_-30px_hsl(var(--ink)/0.5)]">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="font-syne text-2xl font-extrabold">Klaar om te versturen?</h3>
                  <p className="mt-2 max-w-2xl text-sm text-background/70">
                    Na het versturen komt de aanvraag direct in je dashboard binnen als intake. Daar kun je hem omzetten naar een ticket en verder opvolgen.
                  </p>
                  {isDone ? (
                    <p className="mt-4 text-sm font-bold text-[hsl(135,64%,70%)]">
                      Aanvraag verstuurd. Je ziet hem nu terug in het dashboard.
                    </p>
                  ) : null}
                  {mutation.isError ? (
                    <p className="mt-4 text-sm font-bold text-[hsl(0,100%,76%)]">
                      {(mutation.error as Error).message}
                    </p>
                  ) : null}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full bg-primary px-8 text-primary-foreground"
                  disabled={mutation.isPending}
                >
                  <Send className="h-4 w-4" />
                  {mutation.isPending ? "Bezig met versturen..." : "Aanvraag versturen"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Aanvraag;
