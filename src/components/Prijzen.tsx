import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "€499",
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
  },
  {
    name: "Zakelijk",
    price: "€899",
    period: "eenmalig",
    featured: true,
    badge: "Meest gekozen",
    features: [
      "Tot 10 pagina's",
      "Animaties & premium design",
      "Geavanceerde formulieren",
      "Google Analytics koppeling",
      "SEO uitgebreid",
      "Gratis demo vooraf",
      "1 maand gratis support na oplevering",
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
  },
];

const Prijzen = () => {
  return (
    <section id="prijzen" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-syne font-extrabold text-foreground mb-4">
            Duidelijke prijzen
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-xl p-7 border flex flex-col ${
                plan.featured
                  ? "bg-card border-primary shadow-lg scale-[1.03] z-10"
                  : "bg-card border-border shadow-sm"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-syne font-bold text-foreground mb-1">
                {plan.name}
              </h3>
              <div className="mb-5">
                <span className="text-3xl font-syne font-extrabold text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground text-sm ml-2">
                    {plan.period}
                  </span>
                )}
              </div>
              <ul className="space-y-3 mb-7 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/aanvraag"
                className={`block text-center py-3 rounded-full font-bold text-sm transition-colors ${
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
