import { motion } from "framer-motion";

const OverWebvakwerk = () => {
  return (
    <section id="over" className="scroll-mt-28 px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Over Webvakwerk</p>
        <h2 className="mt-3 font-syne text-3xl font-extrabold text-foreground sm:text-4xl">Gemaakt door Stijn van de Pol</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Ik help ondernemers aan een website die helder uitlegt wat je doet en direct aanzet
          tot contact. Geen lang traject of vaag gedoe, maar duidelijke keuzes, snel schakelen en een resultaat waar je mee
          verder kunt.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Meer over mij: <a href="https://stijnvandepol.nl" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">stijnvandepol.nl</a>
        </p>
      </motion.div>
    </section>
  );
};

export default OverWebvakwerk;
