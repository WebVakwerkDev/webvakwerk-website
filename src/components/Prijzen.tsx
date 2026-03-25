import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "€499",
    period: "eenmalig",
    featured: false,
    tagline: "Perfect voor zzp'ers die snel online gevonden willen worden.",
    features: [
      "Tot 3 pagina's",
      "Mobiel geoptimaliseerd",
      "SEO-basis",
      "Gratis demo vooraf",
      "Max. 3 feedbackmomenten inbegrepen",
      "Overdracht naar eigen partij of hoster",
    ],
  },
  {
    name: "Enterprise",
    price: "€899",
    period: "eenmalig",
    featured: true,
    badge: "Meest gekozen",
    tagline: "Voor ondernemers die meer uit hun website willen halen.",
    features: [
      "Tot 5 pagina's",
      "Animaties en premium design",
      "Contactformulier en uitgebreide formulieren",
      "SEO uitgebreid",
      "Gratis demo vooraf",
      "Max. 5 feedbackmomenten inbegrepen",
      "Overdracht naar eigen partij of hoster",
    ],
  },
  {
    name: "Op maat",
    price: "Op aanvraag",
    period: "",
    featured: false,
    tagline: "Voor ondernemers die verder willen gaan dan alleen een website.",
    features: [
      "Onbeperkt pagina's",
      "Koppelingen met andere tools en software",
      "Automatisering van terugkerende taken",
      "Op maat gemaakte functionaliteiten",
      "Hulp bij hosting, onderhoud en doorontwikkeling",
    ],
  },
];

const Prijzen = () => {
  return (
    <section id="prijzen" className="scroll-mt-28 px-6 py-16 relative overflow-hidden">
      {/* Subtle warm background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-primary/[0.04]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Pakketten</p>
          <h2 className="mb-4 font-syne text-3xl font-extrabold text-foreground md:text-4xl max-w-lg">
            Transparante prijzen, geen verrassingen
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Starter voor een compacte site, Enterprise voor extra ruimte en Op maat voor grotere trajecten.
          </p>
          <p className="mt-3 max-w-2xl text-sm font-medium text-foreground/80">
            Alle genoemde pakketprijzen zijn exclusief 21% btw.
          </p>
          <div className="mt-4">
            <Link to="/voorwaarden" className="text-sm font-bold text-primary transition-colors hover:opacity-80">
              Bekijk voorwaarden
            </Link>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 ${
                plan.featured
                  ? "z-10 md:scale-[1.05] bg-primary text-primary-foreground shadow-[0_20px_60px_-12px_hsl(var(--warm-orange)/0.4)] order-first md:order-none"
                  : "bg-card border border-foreground/[0.04] shadow-[0_8px_30px_-12px_hsl(var(--ink)/0.1)] hover:shadow-[0_16px_40px_-8px_hsl(var(--ink)/0.16)] hover:-translate-y-1"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-1 text-xs font-bold text-background">
                  {plan.badge}
                </span>
              )}
              <h3 className={`mb-1 font-syne text-xl font-bold ${plan.featured ? "" : "text-foreground"}`}>{plan.name}</h3>
              {"tagline" in plan && plan.tagline && (
                <p className={`mb-3 text-sm ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.tagline}</p>
              )}
              <div className="mb-5">
                <span className={`font-syne text-3xl font-extrabold ${plan.featured ? "" : "text-foreground"}`}>{plan.price}</span>
                {plan.period && <span className={`ml-2 text-sm ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>}
                {plan.price !== "Op aanvraag" && !plan.featured && (
                  <p className="mt-2 text-sm font-medium text-muted-foreground">Excl. 21% btw</p>
                )}
                {plan.price !== "Op aanvraag" && plan.featured && (
                  <p className="mt-2 text-sm font-medium text-primary-foreground/60">Excl. 21% btw</p>
                )}
              </div>
              <ul className="mb-7 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex items-start gap-2 text-sm ${plan.featured ? "text-primary-foreground/90" : "text-foreground"}`}>
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-primary-foreground/70" : "text-primary"}`} />
                    {feature}
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
                {plan.price === "Op aanvraag" ? "Plan een gesprek" : "Gratis demo aanvragen →"}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          3 of 5 iteratiemomenten gehad en nog niet helemaal tevreden? Extra iteratiemomenten zijn bij te boeken voor €149 per keer (excl. btw).
        </p>
      </div>
    </section>
  );
};

export default Prijzen;
