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
    description: "Geïnteresseerd? Dan kies je het pakket dat past en starten we het traject.",
    accent: true,
  },
  {
    number: "04",
    title: "Aanpassingen",
    description: "Afhankelijk van het gekozen pakket verwerken we je feedback in duidelijke aanpassingsrondes richting de definitieve versie.",
  },
  {
    number: "05",
    title: "Oplevering en overdracht",
    description: "Na de laatste akkoordronde leveren we de website definitief op en zorgen we voor een nette overdracht of livegang.",
  },
];

const Werkwijze = () => {
  return (
    <section id="werkwijze" className="scroll-mt-28 py-16 px-6 relative overflow-hidden">
      {/* Warm background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.07] via-primary/[0.03] to-transparent" />
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-gradient-to-l from-primary/[0.05] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Werkwijze</p>
          <h2 className="text-3xl md:text-4xl font-syne font-extrabold text-foreground mb-4 max-w-lg">
            Snel van idee naar live
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            Van intake tot overdracht: eerst een gratis demo, daarna pas het betaalde traject als je verder wilt.
          </p>
        </motion.div>

        {/* Timeline layout */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/20 to-primary/5 hidden xl:block" />

          <div className="space-y-6 xl:space-y-0 xl:grid xl:grid-cols-5 xl:gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className={`rounded-2xl p-6 mx-1 h-full ${
                  step.accent
                    ? "bg-primary text-primary-foreground shadow-[0_12px_40px_-8px_hsl(var(--warm-orange)/0.35)]"
                    : "bg-card shadow-[0_8px_30px_-12px_hsl(var(--ink)/0.1)] border border-foreground/[0.04]"
                }`}>
                  <span className={`text-5xl font-syne font-extrabold mb-4 block ${
                    step.accent ? "text-primary-foreground/30" : "text-primary/20"
                  }`}>
                    {step.number}
                  </span>
                  <h3 className={`text-lg font-syne font-bold mb-2 ${
                    step.accent ? "text-primary-foreground" : "text-foreground"
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    step.accent ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Werkwijze;
