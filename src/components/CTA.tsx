import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const floatingShapes = [
  { size: 64, top: "-16px", right: "-16px", opacity: 0.07 },
  { size: 40, bottom: "-8px", left: "-8px", opacity: 0.05 },
  { size: 32, bottom: "0", right: "25%", opacity: 0.04 },
];

const CTA = () => {
  return (
    <section id="contact" className="scroll-mt-28 px-6 py-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="mx-auto max-w-7xl relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-primary/85 py-16 px-6 shadow-[0_32px_80px_-20px_hsl(var(--warm-orange)/0.4)]"
      >
        {/* Decorative shapes */}
        {floatingShapes.map((shape, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              width: shape.size * 4,
              height: shape.size * 4,
              opacity: shape.opacity,
              top: shape.top,
              right: shape.right,
              bottom: shape.bottom,
              left: shape.left,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-syne font-extrabold text-primary-foreground mb-4"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Jouw gratis demo in 5 dagen
          </motion.h2>
          <motion.p
            className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Laat zien wat je doet en wij bouwen een eerste versie. Niet tevreden met de demo? Je krijgt een extra ronde gratis. Bevalt het daarna nog niet? Dan betaal je niks.
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/aanvraag"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-foreground text-primary font-bold text-sm transition-colors hover:opacity-90 shadow-lg"
              >
                Gratis demo aanvragen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.a
              href="mailto:info@webvakwerk.nl"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-bold text-sm transition-colors hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
            >
              <Mail className="w-4 h-4" />
              info@webvakwerk.nl
            </motion.a>
          </div>
          <motion.p
            className="mt-6 text-sm text-primary-foreground/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            Geen verplichting. Geen kleine lettertjes. Demo binnen 5 werkdagen. Live binnen 3 weken.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTA;
