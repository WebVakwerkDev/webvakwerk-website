import { motion } from "framer-motion";

const OverWebvakwerk = () => {
  return (
    <section id="over" className="scroll-mt-28 px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-[1.75rem] border border-foreground/8 bg-card p-8 shadow-sm sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Over Webvakwerk</p>
          <h2 className="mt-3 font-syne text-3xl font-extrabold text-foreground sm:text-4xl">Gemaakt door Stijn van de Pol</h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Ik ben Stijn van de Pol. Met Webvakwerk bouw ik duidelijke websites voor ondernemers die snel online zichtbaar
            willen zijn en meer aanvragen willen krijgen. Kort traject, duidelijke afspraken en een site die gewoon klopt.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Meer over mij: <a href="https://stijnvandepol.nl" target="_blank" rel="noreferrer" className="font-bold text-primary hover:underline">stijnvandepol.nl</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OverWebvakwerk;
