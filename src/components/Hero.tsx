import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => (
  <section className="relative pt-10 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-primary/[0.06] via-primary/[0.02] to-transparent">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
          Gratis demo in 5 werkdagen
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-syne text-foreground leading-tight mb-6 tracking-tight">
          Een website die <span className="text-primary">klanten oplevert</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
          Wij bouwen websites voor ondernemers die online gevonden willen worden.
          Duidelijk, snel en gericht op resultaat.
        </p>
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block"
        >
          <Link
            to="/aanvraag"
            className="inline-flex items-center gap-2 px-8 py-4 sm:py-4 rounded-full bg-primary text-primary-foreground font-bold text-base sm:text-sm transition-colors hover:opacity-90 shadow-[0_8px_24px_-6px_hsl(var(--warm-orange)/0.4)]"
          >
            Gratis demo aanvragen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
        <p className="mt-4 text-sm text-muted-foreground">
          Vrijblijvend en gratis. Je betaalt pas als je verder wilt.
        </p>
      </motion.div>

      {/* Right Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative"
      >
        <div className="bg-card rounded-2xl shadow-[0_32px_64px_-16px_hsl(var(--ink)/0.1)] border border-foreground/5 overflow-hidden">
          {/* Browser Bar */}
          <div className="bg-foreground/5 px-4 py-3 flex items-center gap-2 border-b border-foreground/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[hsl(0,100%,67%)]" />
              <div className="w-3 h-3 rounded-full bg-[hsl(45,100%,59%)]" />
              <div className="w-3 h-3 rounded-full bg-[hsl(135,64%,46%)]" />
            </div>
            <div className="mx-auto bg-card rounded-md px-4 py-1 text-[10px] text-muted-foreground font-mono">
              jouwbedrijf.nl
            </div>
          </div>

          {/* Content Preview */}
          <div className="p-8 space-y-6 bg-gradient-to-b from-card to-background/40">
            <div className="bg-primary/10 rounded-lg p-6 space-y-3">
              <div className="h-4 bg-foreground/30 rounded w-3/4" />
              <div className="h-3 bg-foreground/20 rounded w-full" />
              <div className="h-3 bg-foreground/20 rounded w-5/6" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-12 bg-foreground/10 rounded" />
              <div className="h-12 bg-foreground/10 rounded" />
              <div className="h-12 bg-foreground/10 rounded" />
            </div>
            <div className="pt-2 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">1</div>
                  <span className="text-sm font-bold text-foreground">Intake en demo</span>
                </div>
                <span className="text-xs font-bold text-primary">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">2</div>
                  <span className="text-sm font-bold text-foreground">Uitwerking</span>
                </div>
                <span className="text-xs font-bold text-primary">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">3</div>
                  <span className="text-sm font-bold text-foreground">Live gaan</span>
                </div>
                <span className="text-xs font-bold text-primary animate-pulse">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </motion.div>
    </div>
  </section>
);

export default Hero;
