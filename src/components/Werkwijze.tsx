import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Intake",
    description: "Jij deelt je wensen, doelen, stijlvoorkeuren en wat de website voor je bedrijf moet gaan opleveren.",
  },
  {
    number: "02",
    title: "Demo oplevering",
    description: "Op basis van de intake bouwen we gratis een demo-website en zetten die live, zodat jij deze kunt bekijken en beoordelen.",
  },
  {
    number: "03",
    title: "Akkoord en betaling",
    description: "Geinterresseerd? Dan kies je het pakket dat past en start het traject.",
    accent: true,
  },
  {
    number: "04",
    title: "Iteraties",
    description: "Afhankelijk van het gekozen pakket verwerken we je feedback in duidelijke iteratiemomenten richting de definitieve versie.",
  },
  {
    number: "05",
    title: "Oplevering en overdracht",
    description: "Na de laatste akkoordronde leveren we de website definitief op en zorgen we voor een nette overdracht of livegang.",
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
            Snel van idee naar live
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Van intake tot overdracht: eerst een gratis demo, daarna pas het betaalde traject als je verder wilt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
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
