import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "EUR 499",
    period: "eenmalig",
    featured: false,
    features: [
      "Tot 5 pagina's",
      "Mobiel geoptimaliseerd",
      "Contactformulier",
      "SEO-basis",
      "Gratis demo vooraf",
      "Overdracht of hosting naar keuze",
    ],
    conditions: [
      "Maximaal 3 feedbackrondes inbegrepen",
      "Extra feedbackrondes en nieuwe toevoegingen daarna vallen onder meerwerk"/*  */,
    ],
  },
  {
    name: "Zakelijk",
    price: "EUR 899",
    period: "eenmalig",
    featured: true,
    badge: "Meest gekozen",
    features: [
      "Tot 10 pagina's",
      "Animaties en premium design",
      "Geavanceerde formulieren",
      "Google Analytics koppeling",
      "SEO uitgebreid",
      "Gratis demo vooraf",
      "1 maand gratis support na oplevering",
    ],
    conditions: [
      "Meer ruimte voor feedback en verfijning binnen de afgesproken scope",
      "Grote nieuwe toevoegingen buiten scope worden apart geoffreerd",
    ],
  },
  {
    name: "Op maat",
    price: "Op aanvraag",
    period: "",
    featured: false,
    features: [
      "Onbeperkt pagina's",
      "Webshop of klantportaal",
      "Koppelingen met externe systemen",
      "Maatwerk functionaliteiten",
      "Prioriteit support",
      "Onderhoudscontract mogelijk",
    ],
    conditions: [
      "Scope, feedbackmomenten en oplevering worden vooraf samen afgestemd",
      "Prijs en planning hangen af van functionaliteit en complexiteit",
    ],
  },
];

const Prijzen = () => {
  return (
    <section id="prijzen" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-syne text-3xl font-extrabold text-foreground md:text-4xl">
            Duidelijke prijzen
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Elk pakket heeft een duidelijke scope. Een heldere intake voorkomt onnodig uitloopwerk en maakt vooraf duidelijk wat inbegrepen is en wanneer extra werk apart wordt berekend.
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
              <div className="mb-5">
                <span className="font-syne text-3xl font-extrabold text-foreground">{plan.price}</span>
                {plan.period && <span className="ml-2 text-sm text-muted-foreground">{plan.period}</span>}
              </div>
              <ul className="mb-7 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mb-7 rounded-lg bg-secondary/60 px-4 py-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Belangrijke voorwaarden
                </p>
                <div className="space-y-2">
                  {plan.conditions.map((condition) => (
                    <p key={condition} className="text-sm leading-relaxed text-foreground/80">
                      {condition}
                    </p>
                  ))}
                </div>
              </div>
              <Link
                to="/aanvraag"
                className={`block rounded-full py-3 text-center text-sm font-bold transition-colors ${
                  plan.featured
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-foreground/15 text-foreground hover:bg-secondary"
                }`}
              >
                {plan.price === "Op aanvraag" ? "Plan een gesprek" : "Gratis demo aanvragen"}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prijzen;
