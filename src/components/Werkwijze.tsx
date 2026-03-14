import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Kennismaking",
    description: "Vertel wat je doet, stuur je logo en huisstijl mee. We bespreken je wensen en doelen in een kort gesprek.",
    accent: true,
  },
  {
    number: "02",
    title: "Gratis demo",
    description: "Wij bouwen alvast een demo die 80% klaar is. Volledig vrijblijvend — vind je het niks? Dan stop je gewoon.",
  },
  {
    number: "03",
    title: "Akkoord & betaling",
    description: "Pas als je akkoord gaat betaal je. Daarna werken we de laatste 20% samen af tot het perfect is.",
  },
  {
    number: "04",
    title: "Live & overdracht",
    description: "Tevreden? Dan zetten we je website online of leveren we alles netjes aan jou of je IT-er over.",
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
            Van gesprek naar live website
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Geen vage trajecten. Je weet precies waar je staat — en wanneer je betaalt.
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
