import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { usePageSeo } from "@/hooks/use-page-seo";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";

const plans = [
  {
    name: "Snel vindbaar",
    price: "€499",
    period: "eenmalig, excl. btw",
    featured: false,
    tagline: "Voor zzp'ers die snel vindbaar willen zijn op Google.",
    features: [
      "Tot 3 pagina's, professioneel en mobiel klaar",
      "Basis SEO: klanten vinden je via Google",
      "Gratis demo vooraf, betaal pas bij akkoord",
      "Live binnen 3 weken na akkoord",
      "Max. 3 revisierondes inbegrepen",
      "Jij blijft altijd eigenaar van je site",
    ],
  },
  {
    name: "Optimaal vindbaar",
    price: "€899",
    period: "eenmalig, excl. btw",
    featured: true,
    badge: "Meest gekozen",
    tagline: "Voor ondernemers die structureel nieuwe klanten willen trekken via Google.",
    features: [
      "Tot 5 pagina's, animaties en premium design",
      "Contactformulier zodat klanten direct contact opnemen",
      "Uitgebreide SEO: beter vindbaar in Google",
      "Gratis demo vooraf, betaal pas bij akkoord",
      "Live binnen 3 weken na akkoord",
      "Max. 5 revisierondes inbegrepen",
      "Jij blijft altijd eigenaar van je site",
    ],
  },
  {
    name: "Op maat",
    price: "Op aanvraag",
    period: "",
    featured: false,
    tagline: "Voor ondernemers die verder willen gaan dan alleen een website.",
    features: [
      "Onbeperkt pagina's en functionaliteiten",
      "Koppelingen met andere tools en software",
      "Automatisering van terugkerende taken",
      "Op maat gemaakte functionaliteiten",
      "Hulp bij hosting, onderhoud en doorontwikkeling",
      "Vanaf €1.600 excl. btw, prijs op aanvraag",
    ],
  },
];

const comparisonRows = [
  { feature: "Aantal pagina's", starter: "Tot 3", pro: "Tot 5" },
  { feature: "Mobiel geoptimaliseerd", starter: true, pro: true },
  { feature: "Animaties", starter: "Basis", pro: "Premium" },
  { feature: "Contactformulier", starter: false, pro: true },
  { feature: "SEO-optimalisatie", starter: "Basis", pro: "Uitgebreid" },
  { feature: "Revisierondes", starter: "3", pro: "5" },
  { feature: "Gratis demo vooraf", starter: true, pro: true },
  { feature: "Live binnen 3 weken", starter: true, pro: true },
  { feature: "Eigenaarschap website", starter: true, pro: true },
];

const costFaqs = [
  {
    question: "Wanneer moet ik betalen?",
    answer: "Pas nadat je de gratis demo hebt gezien en besluit verder te gaan. Geen verborgen kosten, geen kleine lettertjes.",
  },
  {
    question: "Zijn er terugkerende kosten?",
    answer: "Nee, tenzij je kiest voor een onderhoudspakket. De website zelf betaal je eenmalig. Hosting via mij kost €29 of €69 per maand (optioneel), maar je kunt ook zelf hosting regelen.",
  },
  {
    question: "Wat kost een extra revisieronde?",
    answer: "€149 excl. btw per ronde. Bij Snel vindbaar zijn 3 rondes inbegrepen, bij Optimaal vindbaar 5.",
  },
  {
    question: "Kan ik van pakket wisselen?",
    answer: "Ja, zolang de bouw nog niet is gestart kun je upgraden. Daarna is dat afhankelijk van hoe ver het project is.",
  },
  {
    question: "Wat zit er niet inbegrepen?",
    answer: "Domeinregistratie (€10–20/jaar via jouw eigen provider) en externe tools of licenties. Alles wat ik bouw en lever valt binnen de pakketprijs.",
  },
];

function CostFaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-card border border-foreground/[0.04] p-5 sm:p-6">
      <h3 className="font-syne text-base font-bold text-foreground">
        <motion.button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="w-full text-left flex items-center justify-between gap-4"
        >
          {question}
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
            <ChevronDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.button>
      </h3>
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
    </div>
  );
}

const PrijzenPage = () => {
  usePageSeo({
    title: "Prijzen website laten maken | Vanaf €499 eenmalig | Webvakwerk",
    description:
      "Transparante prijzen voor een professionele website op maat. Snel vindbaar €499, Optimaal vindbaar €899. Gratis demo vooraf, betaal pas bij akkoord.",
    canonicalPath: "/prijzen",
  });

  useBreadcrumbSchema([{ name: "Prijzen", path: "/prijzen" }]);

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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Prijzen</p>
            <h1 className="text-3xl md:text-4xl font-syne font-extrabold text-foreground mb-4">
              Transparante prijzen, geen verrassingen
            </h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Alle pakketten inclusief gratis demo vooraf. Je betaalt pas als je verder wilt. Alle prijzen excl. 21% btw.
            </p>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl p-7 ${
                  plan.featured
                    ? "bg-primary text-primary-foreground shadow-[0_20px_60px_-12px_hsl(var(--warm-orange)/0.4)] md:scale-[1.04] z-10"
                    : "bg-card border border-foreground/[0.05]"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-1 text-xs font-bold text-background">
                    {plan.badge}
                  </span>
                )}
                <h2 className={`font-syne text-xl font-bold mb-1 ${plan.featured ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.name}
                </h2>
                <p className={`text-sm mb-4 ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.tagline}
                </p>
                <div className="mb-5">
                  <span className={`font-syne text-3xl font-extrabold ${plan.featured ? "text-primary-foreground" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`ml-2 text-sm ${plan.featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <ul className="flex-1 space-y-3 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.featured ? "text-primary-foreground/90" : "text-foreground"}`}>
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-primary-foreground/60" : "text-primary"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/aanvraag"
                  className={`block rounded-full py-3 text-center text-sm font-bold transition-colors ${
                    plan.featured
                      ? "bg-primary-foreground text-primary hover:opacity-90"
                      : "border border-foreground/15 text-foreground hover:bg-secondary"
                  }`}
                >
                  {plan.price === "Op aanvraag" ? "Neem contact op →" : "Ja, ik wil een gratis demo →"}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-3xl mx-auto"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Vergelijking</p>
            <h2 className="font-syne text-2xl font-extrabold text-foreground mb-6">
              Snel vindbaar vs. Optimaal vindbaar
            </h2>
            <div className="rounded-2xl border border-foreground/[0.06] overflow-hidden">
              <div className="grid grid-cols-3 bg-foreground/[0.03] border-b border-foreground/[0.06] px-5 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/40">Feature</p>
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/60 text-center">Snel vindbaar</p>
                <p className="text-xs font-bold uppercase tracking-wider text-primary text-center">Optimaal vindbaar</p>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 px-5 py-3.5 ${i % 2 === 0 ? "" : "bg-foreground/[0.02]"} border-b border-foreground/[0.04] last:border-0`}
                >
                  <p className="text-sm text-foreground/70">{row.feature}</p>
                  <div className="flex justify-center items-center">
                    {typeof row.starter === "boolean" ? (
                      row.starter ? (
                        <Check className="w-4 h-4 text-primary" aria-label="Ja" />
                      ) : (
                        <X className="w-4 h-4 text-foreground/20" aria-label="Nee" />
                      )
                    ) : (
                      <p className="text-sm text-foreground/60">{row.starter}</p>
                    )}
                  </div>
                  <div className="flex justify-center items-center">
                    {typeof row.pro === "boolean" ? (
                      row.pro ? (
                        <Check className="w-4 h-4 text-primary" aria-label="Ja" />
                      ) : (
                        <X className="w-4 h-4 text-foreground/20" aria-label="Nee" />
                      )
                    ) : (
                      <p className="text-sm text-foreground font-medium">{row.pro}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Maintenance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 bg-foreground/95 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-primary/15 blur-[80px] pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-2">Na oplevering</p>
              <h2 className="font-syne text-2xl font-extrabold text-background mb-2">Onderhoud & groei</h2>
              <p className="text-background/50 text-sm mb-8">Optioneel, maandelijks opzegbaar.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl border border-white/[0.08] overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
                <div className="p-7 flex flex-col">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-background/30 mb-4">Basis</p>
                  <span className="font-syne text-5xl font-extrabold text-background mb-1">€29</span>
                  <span className="text-sm text-background/30 mb-6">per maand, excl. btw</span>
                  <ul className="space-y-2 flex-1 mb-8">
                    {["Hosting & technische updates", "Uptime monitoring", "E-mail support"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-background/45">
                        <span className="w-1 h-1 rounded-full bg-background/25 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/aanvraag" className="block text-center text-sm font-semibold py-3 rounded-full border border-white/15 text-background/70 hover:bg-white/[0.07] transition-colors">
                    Basis kiezen
                  </Link>
                </div>
                <div className="p-7 flex flex-col bg-white/[0.04]">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Plus</p>
                  <span className="font-syne text-5xl font-extrabold text-background mb-1">€69</span>
                  <span className="text-sm text-background/30 mb-6">per maand, excl. btw</span>
                  <ul className="space-y-2 flex-1 mb-8">
                    {["Alles van Basis", "1 aanpassing per maand", "Maandelijkse SEO-check", "Google prestatierapport", "Prioriteit support"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-background/55">
                        <span className="w-1 h-1 rounded-full bg-background/30 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/aanvraag" className="block text-center text-sm font-bold py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                    Plus kiezen
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cost FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-3xl mx-auto"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Veelgestelde vragen over kosten</p>
            <h2 className="font-syne text-2xl font-extrabold text-foreground mb-6">Alles over de kosten</h2>
            <div className="space-y-3">
              {costFaqs.map((faq, i) => (
                <CostFaqItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
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
            <h2 className="text-2xl font-syne font-extrabold text-foreground mb-3">
              Wil je weten wat voor jou het beste past?
            </h2>
            <p className="text-foreground/60 mb-6 max-w-lg mx-auto">
              Start met een gratis demo. Betaal pas als je verder wilt.
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

export default PrijzenPage;
