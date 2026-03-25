import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section id="contact" className="scroll-mt-28 px-6 py-4">
      <div className="mx-auto max-w-7xl relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-primary/85 py-16 px-6 shadow-[0_32px_80px_-20px_hsl(var(--warm-orange)/0.4)]">
        {/* Decorative shapes */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/[0.07]" />
        <div className="absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-white/[0.05]" />
        <div className="absolute right-1/4 bottom-0 h-32 w-32 rounded-full bg-white/[0.04]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-syne font-extrabold text-primary-foreground mb-4">
            Jouw gratis demo in 5 dagen
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Laat zien wat je doet en wij bouwen een eerste versie. Pas als we samen een opdracht starten, betaal je iets.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/aanvraag"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-foreground text-primary font-bold text-sm transition-colors hover:opacity-90 shadow-lg"
              >
                Gratis demo aanvragen
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.a
              href="mailto:info@webvakwerk.nl"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-bold text-sm transition-colors hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
            >
              <Mail className="w-4 h-4" />
              info@webvakwerk.nl
            </motion.a>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/50">
            Geen verplichting. Geen kleine lettertjes. Binnen 48 uur reactie.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
