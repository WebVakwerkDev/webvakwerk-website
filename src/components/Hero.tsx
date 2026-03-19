import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => (
  <section className="relative pt-12 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
          Duidelijk. Snel. Vindbaar.
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-syne text-foreground leading-[1.1] mb-6 tracking-tight">
          Snel een <span className="text-primary">website</span> voor jou bedrijf
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mb-10 font-medium leading-relaxed">
          Vakwerk websites voor ondernemers die online gevonden willen worden.
          Snel gebouwd, technisch goed en gericht op duidelijkheid en vindbaarheid.
        </p>
        <div className="flex flex-wrap gap-4">
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <Link
              to="/aanvraag"
              className="block px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold transition-colors hover:opacity-90"
            >
              Gratis demo aanvragen
            </Link>
          </motion.div>
          <motion.a
            href="#werkwijze"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-full border-2 border-foreground text-foreground font-bold transition-colors hover:bg-foreground hover:text-background"
          >
            Bekijk werkwijze
          </motion.a>
        </div>
      </motion.div>

      {/* Right Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
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

          {/* Content Preview with Actual Sections */}
          <div className="p-8 space-y-6 bg-gradient-to-b from-card to-background/40">
            {/* Hero Section Mockup */}
            <div className="bg-primary/10 rounded-lg p-6 space-y-3">
              <div className="h-4 bg-foreground/30 rounded w-3/4" />
              <div className="h-3 bg-foreground/20 rounded w-full" />
              <div className="h-3 bg-foreground/20 rounded w-5/6" />
            </div>

            {/* Features Grid Mockup */}
            <div className="grid grid-cols-3 gap-3">
              <div className="h-12 bg-foreground/10 rounded" />
              <div className="h-12 bg-foreground/10 rounded" />
              <div className="h-12 bg-foreground/10 rounded" />
            </div>

            {/* Process Stages */}
            <div className="pt-2 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">1</div>
                    <span className="text-sm font-bold text-foreground">Korte intake</span>
                  </div>
                  <span className="text-xs font-bold text-primary">✓</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">2</div>
                    <span className="text-sm font-bold text-foreground">Eerste demo</span>
                  </div>
                  <span className="text-xs font-bold text-primary">✓</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">3</div>
                    <span className="text-sm font-bold text-foreground">Live gaan</span>
                  </div>
                  <span className="text-xs font-bold text-primary animate-pulse">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>
    </div>
  </section>
);

export default Hero;
