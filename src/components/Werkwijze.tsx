import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Intake van 30 minuten",
    description: "We bespreken je aanbod, doelgroep en doel van de website. Daarna weet je precies wat we gaan bouwen.",
    accent: true,
  },
  {
    number: "02",
    title: "Eerste opzet binnen enkele werkdagen",
    description: "Je ziet snel een concrete eerste versie met structuur, copyrichting en visuele stijl.",
  },
  {
    number: "03",
    title: "Feedback en afronding",
    description: "We verwerken je feedback binnen de afgesproken scope en werken de site netjes af.",
  },
  {
    number: "04",
    title: "Livegang en overdracht",
    description: "Na oplevering kies je voor hosting via ons of overdracht naar je eigen IT-partij.",
  },
];

const Werkwijze = () => {
  return (
    <section id="werkwijze" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-syne font-extrabold text-foreground mb-4">
            Een simpel proces, zonder technische ruis
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Korte lijnen, duidelijke afspraken en een voorspelbare oplevering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative bg-card rounded-xl p-6 shadow-sm border border-border ${
                step.accent ? "border-t-4 border-t-primary" : ""
              }`}
            >
              <span className="text-4xl font-syne font-extrabold text-primary/20 mb-3 block">
                {step.number}
              </span>
              <h3 className="text-lg font-syne font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Werkwijze;
