import { motion } from "framer-motion";

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
          Voor starters &amp; MKB
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-syne text-foreground leading-[1.1] mb-6 tracking-tight">
          Jouw bedrijf verdient een{" "}
          <span className="text-primary">echte website</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mb-10 font-medium leading-relaxed">
          Wij bouwen op maat gemaakte websites voor ondernemers die net starten
          of doorgroeien. Geen templates, geen gedoe — gewoon vakwerk.
        </p>
        <div className="flex flex-wrap gap-4">
          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold transition-colors hover:opacity-90"
          >
            Gratis demo aanvragen
          </motion.a>
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

          {/* Content Preview */}
          <div className="p-6 sm:p-8">
            <div className="aspect-video bg-foreground rounded-lg mb-8 flex items-center justify-center">
              <span className="text-background/20 font-syne font-bold text-sm">
                Website Preview
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-foreground">
                    Demo klaar
                  </span>
                  <span className="text-sm font-bold text-primary">80%</span>
                </div>
                <div className="w-full h-3 bg-foreground/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-md bg-[hsl(135,64%,90%)] text-[hsl(135,64%,30%)] text-xs font-bold">
                  ✓ Design
                </span>
                <span className="px-3 py-1 rounded-md bg-[hsl(135,64%,90%)] text-[hsl(135,64%,30%)] text-xs font-bold">
                  ✓ Content
                </span>
                <span className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold animate-pulse">
                  Afwerking...
                </span>
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
