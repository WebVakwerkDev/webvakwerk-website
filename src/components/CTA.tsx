import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-syne font-extrabold text-primary-foreground mb-4">
          Snel doorpakken?
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          Laat zien wat je doet en wij bouwen een eerste opzet. Dan weet je snel waar je aan toe bent.
        </p>
        <motion.a
          href="#contact"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-foreground text-primary font-bold text-sm transition-colors hover:opacity-90"
        >
          Gratis demo aanvragen
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default CTA;
