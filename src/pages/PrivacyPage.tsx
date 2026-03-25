import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageSeo } from "@/hooks/use-page-seo";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";

const PrivacyPage = () => {
  usePageSeo({
    title: "Privacybeleid | Webvakwerk",
    description:
      "Lees hoe Webvakwerk omgaat met je persoonsgegevens. Informatie over verzamelde gegevens, doeleinden, bewaartermijnen en je rechten onder de AVG.",
    canonicalPath: "/privacy",
  });

  useBreadcrumbSchema([{ name: "Privacybeleid", path: "/privacy" }]);

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      <main id="main-content">
        <section className="border-b border-foreground/5 bg-secondary/30 px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Privacybeleid</p>
            <h1 className="mt-4 max-w-3xl font-syne text-4xl font-extrabold leading-[1.05] text-foreground md:text-5xl">
              Hoe wij omgaan met je gegevens
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground">
              Webvakwerk hecht waarde aan je privacy. In dit privacybeleid leggen we uit welke
              gegevens we verzamelen, waarvoor we ze gebruiken en welke rechten je hebt.
            </p>
            <p className="mt-3 max-w-3xl text-sm font-medium text-foreground/80">
              Laatst bijgewerkt: 25 maart 2026
            </p>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--secondary)/0.35))] px-6 py-16">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-[1.5rem] border border-foreground/10 bg-card p-7 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.22)] sm:p-9">
              <h2 className="font-syne text-2xl font-extrabold tracking-tight text-foreground">1. Verwerkingsverantwoordelijke</h2>
              <div className="mt-6 space-y-4 text-[1.02rem] leading-8 text-foreground">
                <p>Webvakwerk is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid.</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Bedrijfsnaam: Webvakwerk</li>
                  <li>KvK-nummer: 42015984</li>
                  <li>E-mailadres: info@webvakwerk.nl</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-foreground/10 bg-card p-7 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.22)] sm:p-9">
              <h2 className="font-syne text-2xl font-extrabold tracking-tight text-foreground">2. Welke gegevens verzamelen we</h2>
              <div className="mt-6 space-y-4 text-[1.02rem] leading-8 text-foreground">
                <p>Via het demo-aanvraagformulier op onze website verzamelen we de volgende gegevens:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Bedrijfsnaam en contactpersoon</li>
                  <li>E-mailadres en telefoonnummer</li>
                  <li>Website URL en vestigingsplaats</li>
                  <li>Branche en projectinformatie</li>
                  <li>Voorkeuren voor stijl, kleuren en content</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-foreground/10 bg-card p-7 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.22)] sm:p-9">
              <h2 className="font-syne text-2xl font-extrabold tracking-tight text-foreground">3. Waarvoor gebruiken we je gegevens</h2>
              <div className="mt-6 space-y-4 text-[1.02rem] leading-8 text-foreground">
                <p>We gebruiken je gegevens uitsluitend voor:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Het beoordelen en opvolgen van je demo-aanvraag</li>
                  <li>Contact opnemen over je aanvraag of project</li>
                  <li>Het opstellen van een offerte of voorstel</li>
                  <li>Het uitvoeren van een eventuele opdracht</li>
                </ul>
                <p>We delen je gegevens niet met derden, tenzij dit noodzakelijk is voor de uitvoering van de opdracht en je daar vooraf over bent geïnformeerd.</p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-foreground/10 bg-card p-7 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.22)] sm:p-9">
              <h2 className="font-syne text-2xl font-extrabold tracking-tight text-foreground">4. Grondslag voor verwerking</h2>
              <div className="mt-6 space-y-4 text-[1.02rem] leading-8 text-foreground">
                <p>We verwerken je persoonsgegevens op basis van:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Je toestemming (bij het indienen van het aanvraagformulier)</li>
                  <li>De uitvoering van een overeenkomst of het nemen van precontractuele maatregelen</li>
                  <li>Gerechtvaardigd belang (het opvolgen van zakelijke aanvragen)</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-foreground/10 bg-card p-7 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.22)] sm:p-9">
              <h2 className="font-syne text-2xl font-extrabold tracking-tight text-foreground">5. Bewaartermijn</h2>
              <div className="mt-6 space-y-4 text-[1.02rem] leading-8 text-foreground">
                <p>We bewaren je gegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Aanvraaggegevens zonder opvolging: maximaal 12 maanden</li>
                  <li>Gegevens bij een actieve opdracht: gedurende de looptijd van de opdracht plus de wettelijke bewaartermijn voor de financiele administratie (7 jaar)</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-foreground/10 bg-card p-7 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.22)] sm:p-9">
              <h2 className="font-syne text-2xl font-extrabold tracking-tight text-foreground">6. Je rechten</h2>
              <div className="mt-6 space-y-4 text-[1.02rem] leading-8 text-foreground">
                <p>Op grond van de AVG heb je de volgende rechten:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Recht op inzage in je persoonsgegevens</li>
                  <li>Recht op correctie van onjuiste gegevens</li>
                  <li>Recht op verwijdering van je gegevens</li>
                  <li>Recht op beperking van de verwerking</li>
                  <li>Recht op overdraagbaarheid van je gegevens</li>
                  <li>Recht om je toestemming in te trekken</li>
                </ul>
                <p>
                  Je kunt een verzoek indienen door te mailen naar info@webvakwerk.nl. We reageren
                  binnen 30 dagen op je verzoek.
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-foreground/10 bg-card p-7 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.22)] sm:p-9">
              <h2 className="font-syne text-2xl font-extrabold tracking-tight text-foreground">7. Beveiliging</h2>
              <div className="mt-6 space-y-4 text-[1.02rem] leading-8 text-foreground">
                <p>We nemen passende technische en organisatorische maatregelen om je gegevens te beschermen tegen onbevoegde toegang, verlies of misbruik. De website maakt gebruik van een beveiligde verbinding (HTTPS).</p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-foreground/10 bg-card p-7 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.22)] sm:p-9">
              <h2 className="font-syne text-2xl font-extrabold tracking-tight text-foreground">8. Klachten</h2>
              <div className="mt-6 space-y-4 text-[1.02rem] leading-8 text-foreground">
                <p>
                  Als je een klacht hebt over hoe wij met je gegevens omgaan, horen we dat graag
                  via info@webvakwerk.nl. Je hebt ook het recht om een klacht in te dienen bij de
                  Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-primary/20 bg-primary/8 p-7 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.18)] sm:p-9">
              <h2 className="font-syne text-2xl font-extrabold text-foreground">Vragen over je privacy?</h2>
              <p className="mt-4 max-w-3xl text-[1.02rem] leading-8 text-foreground">
                Neem gerust contact met ons op via info@webvakwerk.nl. We helpen je graag.
              </p>
              <div className="mt-6">
                <Link
                  to="/aanvraag"
                  className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90"
                >
                  Neem contact op
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
