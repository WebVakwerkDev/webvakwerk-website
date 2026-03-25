import { motion } from "framer-motion";

const OverWebvakwerk = () => {
  return (
    <section id="over" className="scroll-mt-28 px-6 py-14 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-foreground/[0.03] to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-10"
      >
        {/* Avatar/icon */}
        <div className="shrink-0">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[0_12px_30px_-8px_hsl(var(--warm-orange)/0.3)]">
            <span className="text-3xl font-syne font-extrabold text-primary-foreground">SvdP</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Over Webvakwerk</p>
          <h2 className="mt-2 font-syne text-2xl font-extrabold text-foreground sm:text-3xl">Gemaakt door Stijn van de Pol</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Ik help ondernemers aan een website die helder uitlegt wat je doet en direct aanzet
            tot contact. Geen lang traject of vaag gedoe, maar duidelijke keuzes, snel schakelen en een resultaat waar je mee
            verder kunt.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Meer over mij: <a href="https://stijnvandepol.nl" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">stijnvandepol.nl</a>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default OverWebvakwerk;
