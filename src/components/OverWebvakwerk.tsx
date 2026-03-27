import { motion } from "framer-motion";

const OverWebvakwerk = () => {
  return (
    <section id="over" className="scroll-mt-28 px-6 py-14 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-foreground/[0.03] to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-10"
      >
        {/* Avatar/icon */}
        <motion.div
          className="shrink-0"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[0_12px_30px_-8px_hsl(var(--warm-orange)/0.3)] relative">
            <span className="text-3xl font-syne font-extrabold text-primary-foreground">SvdP</span>
          </div>
        </motion.div>
        <div>
          <motion.p
            className="text-sm font-bold uppercase tracking-[0.18em] text-primary"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Over Webvakwerk
          </motion.p>
          <motion.h2
            className="mt-2 font-syne text-2xl font-extrabold text-foreground sm:text-3xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Gemaakt door Stijn van de Pol
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Ik help ondernemers aan een website die helder uitlegt wat je doet en direct aanzet
            tot contact. Geen lang traject of vaag gedoe, maar duidelijke keuzes, snel schakelen en een resultaat waar je mee
            verder kunt.
          </motion.p>
          <motion.p
            className="mt-3 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Meer over mij: <a href="https://stijnvandepol.nl" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">stijnvandepol.nl</a>
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default OverWebvakwerk;
