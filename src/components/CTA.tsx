import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section id="cta" className="scroll-mt-28 py-24 px-6 bg-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-syne font-extrabold text-primary-foreground mb-4">
          Klaar om te starten?
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          Laat zien wat je doet en wij bouwen een eerste versie, gratis en vrijblijvend. Pas als we samen een opdracht starten, betaal je iets.
        </p>
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block"
        >
          <Link
            to="/aanvraag"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-foreground text-primary font-bold text-sm transition-colors hover:opacity-90"
          >
            Gratis demo aanvragen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTA;
