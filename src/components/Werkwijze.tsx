import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Intake",
    description: "Jij geeft je wensen door: wat je bedrijf doet, wie je doelgroep is en wat de website moet opleveren.",
  },
  {
    number: "02",
    title: "Demo website",
    description: "Op basis van de intake bouwen wij een eerste demo-website zodat je direct ziet hoe de site eruit kan zien.",
  },
  {
    number: "03",
    title: "Akkoord op richting",
    description: "Je kiest of je akkoord bent met de richting. Zonder akkoord stoppen we hier, met akkoord gaan we door naar de iteraties.",
  },
  {
    number: "04",
    title: "Feedback en iteraties",
    description: "Na akkoord geef je feedback op wat je anders wilt zien. Het aantal feedbackrondes hangt af van het gekozen pakket.",
    accent: true,
  },
  {
    number: "05",
    title: "Oplevering",
    description: "Zodra je akkoord bent na de feedbackrondes, leveren we de website definitief op.",
  },
  {
    number: "06",
    title: "Hostingoverdracht",
    description: "We helpen bij de overdracht naar jouw hostingpartij of bij zelf hosten, zodat de livegang soepel verloopt.",
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
            Intake, demo, akkoord, iteraties en overdracht. Duidelijk proces, korte lijnen, geen gedoe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
