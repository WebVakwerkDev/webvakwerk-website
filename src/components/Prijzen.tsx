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
    <section id="prijzen" className="scroll-mt-28 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-syne text-3xl font-extrabold text-foreground md:text-4xl">
            Transparante prijzen, geen verrassingen
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Starter voor een compacte site, Enterprise voor extra ruimte en Op maat voor grotere trajecten.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-foreground/80">
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
              className={`relative flex flex-col rounded-xl border p-7 ${
                plan.featured
                  ? "z-10 scale-[1.03] border-primary bg-card shadow-lg"
                  : "border-border bg-card shadow-sm"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  {plan.badge}
                </span>
              )}
              <h3 className="mb-1 font-syne text-xl font-bold text-foreground">{plan.name}</h3>
              {"tagline" in plan && plan.tagline && (
                <p className="mb-3 text-sm text-muted-foreground">{plan.tagline}</p>
              )}
              <div className="mb-5">
                <span className="font-syne text-3xl font-extrabold text-foreground">{plan.price}</span>
                {plan.period && <span className="ml-2 text-sm text-muted-foreground">{plan.period}</span>}
                {plan.price !== "Op aanvraag" && (
                  <p className="mt-2 text-sm font-medium text-muted-foreground">Excl. 21% btw</p>
                )}
              </div>
              <ul className="mb-7 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/aanvraag"
                className={`block rounded-full py-3 text-center text-sm font-bold transition-colors ${
                  plan.featured
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-foreground/15 text-foreground hover:bg-secondary"
                }`}
              >
                {plan.price === "Op aanvraag" ? "Plan een gesprek" : "Gratis demo aanvragen →"}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prijzen;
