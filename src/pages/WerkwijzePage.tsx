import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MessageSquare, Rocket, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { usePageSeo } from "@/hooks/use-page-seo";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";

const steps = [
  {
    number: "01",
    icon: Clock,
    title: "Intake en gratis demo",
    summary: "Je deelt wat je bedrijf doet en wat je wil uitstralen. Ik stel een paar gerichte vragen en ga aan de slag.",
    details: [
      "Kort gesprek via telefoon of WhatsApp (±30 min.)",
      "Je vertelt wie je klanten zijn en welk gevoel je website moet geven",
      "Geen technische kennis vereist van jouw kant",
      "Binnen 5 werkdagen staat er een werkende demo-website online",
      "Je kunt klikken, scrollen en direct beoordelen of het klopt",
    ],
    accent: false,
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Akkoord en uitwerking",
    summary: "Bevalt de demo? Dan kies je je pakket en verwerk ik jouw feedback in heldere rondes.",
    details: [
      "Kies: Snel vindbaar (3 revisierondes) of Optimaal vindbaar (5 rondes)",
      "Per ronde verwerk ik alle feedback tegelijk — overzichtelijk en efficiënt",
      "Direct contact via e-mail of WhatsApp, geen tussenpersonen",
      "Elke aanpassing is zichtbaar in een live preview",
      "Je betaalt pas nadat je de demo hebt goedgekeurd",
    ],
    accent: true,
  },
  {
    number: "03",
    icon: Rocket,
    title: "Oplevering en live gaan",
    summary: "Als alles klopt gaat de site live. Ik zorg voor een nette overdracht en vindbaarheid in Google.",
    details: [
      "Live binnen 3 weken na akkoord",
      "Domeinkoppeling en hosting inbegrepen, of overdracht naar jouw eigen omgeving",
      "Vindbaar in Google binnen 2–4 weken na livegang",
      "Optioneel: onderhoudspakket voor updates, hosting en SEO-monitoring",
      "Jij blijft altijd eigenaar van je website",
    ],
    accent: false,
  },
];

const timeline = [
  { period: "Dag 1", event: "Intake gesprek (±30 min.)" },
  { period: "Dag 1–5", event: "Demo bouwen en online zetten" },
  { period: "Week 1–2", event: "Feedback verwerken en uitwerken" },
  { period: "Week 3", event: "Definitieve oplevering en live gaan" },
];

const processFaqs = [
  {
    question: "Wat moet ik aanleveren?",
    answer: "Een korte omschrijving van je bedrijf, je logo als je die al hebt, en eventueel een paar voorbeeldwebsites die je aanspreken. De rest regel ik.",
  },
  {
    question: "Kan ik tussendoor feedback geven?",
    answer: "We werken in duidelijke feedbackrondes. Per ronde verwerk ik al je opmerkingen in één keer, zodat het proces overzichtelijk blijft. Buiten de rondes kun je altijd een bericht sturen.",
  },
  {
    question: "Hoe communiceren we tijdens het project?",
    answer: "Via e-mail of WhatsApp. Ik reageer binnen één werkdag. Geen ticketsystemen, geen doorverbinden — gewoon direct contact.",
  },
  {
    question: "Wat als de demo helemaal niet klopt?",
    answer: "Dan betaal je niks. Écht. De demo is er juist voor om te checken of we op dezelfde lijn zitten. Geen verplichtingen, geen factuur.",
  },
];

function ProcessFaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => setOpen(!open)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="w-full text-left rounded-2xl bg-card border border-foreground/[0.04] p-5 sm:p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-syne text-base font-bold text-foreground">{question}</h3>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

const WerkwijzePage = () => {
  usePageSeo({
    title: "Werkwijze: van intake tot live website in 3 weken | Webvakwerk",
    description:
      "Zo werkt Webvakwerk: gratis demo in 5 dagen, feedback in duidelijke rondes, live in 3 weken. Transparant proces, no cure no pay.",
    canonicalPath: "/werkwijze",
  });

  useBreadcrumbSchema([{ name: "Werkwijze", path: "/werkwijze" }]);

  return (
    <div className="min-h-screen bg-background font-body pb-20 md:pb-0">
      <Navbar />
      <main id="main-content" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Werkwijze</p>
            <h1 className="text-3xl md:text-4xl font-syne font-extrabold text-foreground mb-4">
              Van intake tot live website in 3 weken
            </h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Geen vage tijdlijn, geen lange wachttijden. Eerst een gratis demo, daarna pas het betaalde traject als jij verder wilt.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="space-y-6 mb-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-8 ${
                  step.accent
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-foreground/[0.05]"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="shrink-0">
                    <span className={`text-6xl font-syne font-extrabold ${step.accent ? "text-primary-foreground/20" : "text-primary/15"}`}>
                      {step.number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className={`font-syne text-xl font-extrabold mb-2 ${step.accent ? "text-primary-foreground" : "text-foreground"}`}>
                      {step.title}
                    </h2>
                    <p className={`mb-5 text-base leading-relaxed ${step.accent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {step.summary}
                    </p>
                    <ul className="space-y-2.5">
                      {step.details.map((detail) => (
                        <li key={detail} className={`flex items-start gap-2.5 text-sm ${step.accent ? "text-primary-foreground/80" : "text-foreground/70"}`}>
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${step.accent ? "bg-primary-foreground/40" : "bg-primary"}`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Planning</p>
            <h2 className="font-syne text-2xl font-extrabold text-foreground mb-6">Concrete tijdlijn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl bg-foreground/[0.03] border border-foreground/[0.06] p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{item.period}</p>
                  <p className="text-sm font-semibold text-foreground">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Process FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-3xl"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Vragen over het proces</p>
            <h2 className="font-syne text-2xl font-extrabold text-foreground mb-6">Hoe werkt het precies?</h2>
            <div className="space-y-3">
              {processFaqs.map((faq, i) => (
                <ProcessFaqItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-syne font-extrabold text-foreground mb-3">Klaar om te beginnen?</h2>
            <p className="text-foreground/60 mb-6 max-w-lg mx-auto">
              Vraag een gratis demo aan. Binnen 5 werkdagen zie je wat je website kan worden.
            </p>
            <Link
              to="/aanvraag"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all"
            >
              Ja, ik wil een gratis demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default WerkwijzePage;
