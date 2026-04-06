import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Intake en demo",
    description: "Jij deelt je wensen en doelen. Ik bouw gratis een demo-website zodat je direct kunt zien wat ik voor je kan doen.",
  },
  {
    number: "02",
    title: "Akkoord en uitwerking",
    description: "Tevreden met de richting? Dan kies je het pakket dat past en verwerk ik je feedback in duidelijke aanpassingsrondes.",
    accent: true,
  },
  {
    number: "03",
    title: "Oplevering",
    description: "Ik lever de definitieve website op en zorg voor een nette overdracht of livegang. Binnen 3 weken vindbaar op Google en klaar om klanten te ontvangen.",
  },
];

const Werkwijze = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="werkwijze" className="scroll-mt-28 py-16 px-6 relative overflow-hidden" ref={sectionRef}>
      {/* Subtle warm background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.04] to-transparent" />

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
            Van intake tot overdracht: eerst een gratis demo, daarna pas het betaalde traject als jij verder wilt.
          </p>
        </motion.div>

        {/* Timeline layout */}
        <div className="relative">
          {/* Animated connecting line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary/40"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`rounded-2xl p-6 mx-1 h-full ${
                    step.accent
                      ? "bg-primary text-primary-foreground shadow-[0_12px_40px_-8px_hsl(var(--warm-orange)/0.35)]"
                      : "bg-card shadow-[0_8px_30px_-12px_hsl(var(--ink)/0.1)] border border-foreground/[0.04]"
                  }`}
                >
                  <motion.span
                    className={`text-5xl font-syne font-extrabold mb-4 block ${
                      step.accent ? "text-primary-foreground/30" : "text-primary/20"
                    }`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.2, duration: 0.4, type: "spring" }}
                  >
                    {step.number}
                  </motion.span>
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
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Werkwijze;
