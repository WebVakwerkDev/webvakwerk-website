import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock3, SearchCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type LeadFormData = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  businessType: string;
  targetAudience: string;
  primaryGoal: string;
  timeline: string;
  budget: string;
  message: string;
  privacyConsent: boolean;
  honeypot: string;
};

const initialForm: LeadFormData = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  websiteUrl: "",
  businessType: "dienstverlener",
  targetAudience: "",
  primaryGoal: "meer-aanvragen",
  timeline: "binnen-1-maand",
  budget: "",
  message: "",
  privacyConsent: false,
  honeypot: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildMailBody(data: LeadFormData) {
  return [
    `Bedrijfsnaam: ${data.companyName}`,
    `Contactpersoon: ${data.contactName}`,
    `E-mail: ${data.email}`,
    `Telefoon: ${data.phone || "-"}`,
    `Huidige website: ${data.websiteUrl || "-"}`,
    `Type bedrijf: ${data.businessType}`,
    `Doelgroep: ${data.targetAudience || "-"}`,
    `Belangrijkste doel: ${data.primaryGoal}`,
    `Gewenste planning: ${data.timeline}`,
    `Budgetindicatie: ${data.budget || "-"}`,
    "",
    "Toelichting:",
    data.message || "-",
  ].join("\n");
}

const AanvraagPage = () => {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});

  function updateField<K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: "" }));
  }

  function validate() {
    const errors: Partial<Record<keyof LeadFormData, string>> = {};

    if (!form.companyName.trim()) errors.companyName = "Bedrijfsnaam is verplicht.";
    if (!form.contactName.trim()) errors.contactName = "Contactpersoon is verplicht.";
    if (!form.email.trim()) errors.email = "E-mailadres is verplicht.";
    if (form.email.trim() && !isValidEmail(form.email.trim())) errors.email = "Vul een geldig e-mailadres in.";
    if (!form.message.trim()) errors.message = "Geef kort aan wat je wilt laten bouwen.";
    if (!form.privacyConsent) errors.privacyConsent = "Je moet akkoord gaan met het privacybeleid.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    setErrorMessage("");

    if (!validate()) {
      return;
    }

    if (form.honeypot) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        submittedAt: new Date().toISOString(),
      };

      const endpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim();

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Het formulier kon niet worden verzonden. Probeer het later opnieuw.");
        }
      } else {
        const recipient = import.meta.env.VITE_CONTACT_EMAIL?.trim() || "info@webvakwerk.nl";
        const subject = encodeURIComponent(`Nieuwe intake-aanvraag - ${form.companyName}`);
        const body = encodeURIComponent(buildMailBody(form));
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      }

      setIsSuccess(true);
      setForm(initialForm);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Er ging iets mis bij het versturen.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      <section className="relative overflow-hidden border-b border-foreground/5 bg-secondary/40 pt-14 pb-20">
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.22),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            <Sparkles className="h-4 w-4" />
            Intake-aanvraag
          </span>
          <h1 className="mt-6 max-w-4xl font-syne text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Vertel kort wat je nodig hebt, dan krijg je snel een duidelijke aanpak.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            Geen lang en technisch formulier. Alleen de informatie die nodig is om jouw website logisch,
            professioneel en vindbaar op te zetten.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-foreground/5 bg-card p-5 shadow-sm">
              <Clock3 className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-medium text-foreground">Binnen 2 werkdagen reactie</p>
            </div>
            <div className="rounded-2xl border border-foreground/5 bg-card p-5 shadow-sm">
              <SearchCheck className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-medium text-foreground">Focus op duidelijkheid en vindbaarheid</p>
            </div>
            <div className="rounded-2xl border border-foreground/5 bg-card p-5 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-medium text-foreground">Praktische intake, zonder gedoe</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {isSuccess ? (
            <div className="rounded-[2rem] border border-foreground/5 bg-card p-8 text-center shadow-sm">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-6 font-syne text-3xl font-extrabold">Aanvraag ontvangen</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Dank je. We nemen snel contact met je op met een duidelijke vervolgstap.
              </p>
              <Button asChild className="mt-8 rounded-full">
                <Link to="/">Terug naar home</Link>
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] border border-foreground/5 bg-card p-6 shadow-sm sm:p-8"
            >
              <div className="mb-8">
                <h2 className="font-syne text-3xl font-extrabold text-foreground">Intakeformulier</h2>
                <p className="mt-2 text-muted-foreground">
                  Velden met * zijn verplicht. Formulieren worden verstuurd via een externe form-endpoint
                  als die is ingesteld, anders openen we je e-mailapp als fallback.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-bold text-foreground">Bedrijfsnaam *</span>
                  <Input value={form.companyName} onChange={(event) => updateField("companyName", event.target.value)} />
                  {fieldErrors.companyName ? <p className="text-xs text-destructive">{fieldErrors.companyName}</p> : null}
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-foreground">Contactpersoon *</span>
                  <Input value={form.contactName} onChange={(event) => updateField("contactName", event.target.value)} />
                  {fieldErrors.contactName ? <p className="text-xs text-destructive">{fieldErrors.contactName}</p> : null}
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-foreground">E-mailadres *</span>
                  <Input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
                  {fieldErrors.email ? <p className="text-xs text-destructive">{fieldErrors.email}</p> : null}
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-foreground">Telefoonnummer</span>
                  <Input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-foreground">Huidige website</span>
                  <Input value={form.websiteUrl} onChange={(event) => updateField("websiteUrl", event.target.value)} placeholder="https://..." />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-foreground">Type bedrijf</span>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.businessType} onChange={(event) => updateField("businessType", event.target.value)}>
                    <option value="dienstverlener">Dienstverlener</option>
                    <option value="lokaal-bedrijf">Lokaal bedrijf</option>
                    <option value="zakelijke-dienstverlening">Zakelijke dienstverlening</option>
                    <option value="creatieve-sector">Creatieve sector</option>
                    <option value="anders">Anders</option>
                  </select>
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-bold text-foreground">Doelgroep</span>
                  <Input value={form.targetAudience} onChange={(event) => updateField("targetAudience", event.target.value)} placeholder="Bijv. huiseigenaren in regio Utrecht" />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-foreground">Belangrijkste doel</span>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.primaryGoal} onChange={(event) => updateField("primaryGoal", event.target.value)}>
                    <option value="meer-aanvragen">Meer aanvragen</option>
                    <option value="duidelijk-aanbod">Aanbod duidelijker maken</option>
                    <option value="professioneler-imago">Professioneler overkomen</option>
                    <option value="beter-vindbaar">Beter vindbaar worden in Google</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-foreground">Gewenste planning</span>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.timeline} onChange={(event) => updateField("timeline", event.target.value)}>
                    <option value="binnen-2-weken">Binnen 2 weken</option>
                    <option value="binnen-1-maand">Binnen 1 maand</option>
                    <option value="binnen-2-maanden">Binnen 2 maanden</option>
                    <option value="flexibel">Flexibel</option>
                  </select>
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-bold text-foreground">Budgetindicatie</span>
                  <Input value={form.budget} onChange={(event) => updateField("budget", event.target.value)} placeholder="Bijv. 1000 - 2500 EUR" />
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-bold text-foreground">Wat moet de website vooral duidelijk maken? *</span>
                  <Textarea value={form.message} onChange={(event) => updateField("message", event.target.value)} rows={6} />
                  {fieldErrors.message ? <p className="text-xs text-destructive">{fieldErrors.message}</p> : null}
                </label>
              </div>

              <label className="mt-6 flex items-start gap-3 rounded-2xl border border-foreground/5 bg-secondary/30 px-4 py-4 text-sm">
                <Checkbox checked={form.privacyConsent} onCheckedChange={(checked) => updateField("privacyConsent", Boolean(checked))} />
                <span>Ik ga akkoord met het privacybeleid en verwerking van mijn gegevens voor contact over deze aanvraag. *</span>
              </label>
              {fieldErrors.privacyConsent ? <p className="mt-2 text-xs text-destructive">{fieldErrors.privacyConsent}</p> : null}

              <div className="hidden">
                <Input value={form.honeypot} onChange={(event) => updateField("honeypot", event.target.value)} tabIndex={-1} autoComplete="off" />
              </div>

              {errorMessage ? <p className="mt-4 text-sm font-bold text-destructive">{errorMessage}</p> : null}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">Liever direct mailen? info@webvakwerk.nl</p>
                <Button type="button" className="rounded-full" disabled={isSubmitting} onClick={handleSubmit}>
                  {isSubmitting ? "Bezig met versturen..." : "Intake versturen"}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AanvraagPage;
