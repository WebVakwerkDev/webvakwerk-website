import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const Hero = () => {
  const [endWord] = useState<"worden" | "doen">(() => {
    const stored = localStorage.getItem("hero-end-word");
    const next = stored === "worden" ? "doen" : "worden";
    localStorage.setItem("hero-end-word", next);
    return next;
  });

  const titleWords = `Gratis zien wat jouw website kan ${endWord}`.split(" ");

  return (
    <section
      className="relative pt-10 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-primary/[0.06] via-primary/[0.02] to-transparent"
    >
      {/* Static background orbs — CSS only */}
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-primary/[0.07] blur-[100px] animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary/[0.05] blur-[80px] animate-[float_10s_ease-in-out_infinite_1s]" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Content */}
        <div>
          <motion.span
            initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2 align-middle animate-pulse" />
            Duidelijk. Snel. Vindbaar.
          </motion.span>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-syne text-foreground leading-[1.1] mb-6 tracking-tight">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block mr-[0.3em] ${word === endWord ? "text-primary" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-base sm:text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed"
          >
            Elke dag zonder website gaat een klant naar je concurrent. Ik laat je eerst gratis zien hoe dat verandert.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <Link
              to="/aanvraag"
              className="group inline-flex items-center gap-2 px-8 py-4 sm:py-4 rounded-full bg-primary text-primary-foreground font-bold text-base sm:text-sm transition-all hover:opacity-90 hover:shadow-[0_16px_40px_-6px_hsl(var(--warm-orange)/0.5)] shadow-[0_8px_24px_-6px_hsl(var(--warm-orange)/0.4)]"
            >
              Ja, ik wil een gratis demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            Geen technisch gedoe van jouw kant. Je betaalt pas als je verder wilt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="text-xs text-muted-foreground/60 uppercase tracking-widest font-bold">Eerder gemaakt voor</span>
            {["Barber Rens", "SnackSpot", "BunkHosting"].map((name) => (
              <span key={name} className="text-xs font-semibold text-foreground/50">{name}</span>
            ))}
            <span className="flex items-center gap-1 text-xs text-muted-foreground/50 ml-auto sm:ml-0">
              <MapPin className="w-3 h-3" />
              Noord-Brabant
            </span>
          </motion.div>
        </div>

        {/* Right Visual — 3D tilt browser mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ transformPerspective: 1200 }}
          className="relative"
        >
          {/* Glow behind card */}
          <div className="absolute inset-0 -z-10 bg-primary/20 rounded-3xl blur-[60px] scale-90" />

          <div className="bg-card rounded-2xl shadow-[0_32px_64px_-16px_hsl(var(--ink)/0.1)] border border-foreground/5 overflow-hidden animate-[float_5s_ease-in-out_infinite]">
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
                <motion.div
                  className="h-4 bg-foreground/30 rounded w-3/4"
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                />
                <motion.div
                  className="h-3 bg-foreground/20 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                />
                <motion.div
                  className="h-3 bg-foreground/20 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: "83%" }}
                  transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-12 bg-foreground/10 rounded"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6 + i * 0.15, duration: 0.4 }}
                  />
                ))}
              </div>
              <div className="pt-2 space-y-4">
                {[
                  { num: "1", label: "Intake en demo", done: true },
                  { num: "2", label: "Uitwerking", done: true },
                  { num: "3", label: "Live gaan", done: false },
                ].map((step, i) => (
                  <motion.div
                    key={step.num}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 + i * 0.2, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${step.done ? "bg-primary/20" : "bg-primary"} flex items-center justify-center text-xs font-bold ${step.done ? "text-primary" : "text-primary-foreground"}`}>
                        {step.num}
                      </div>
                      <span className="text-sm font-bold text-foreground">{step.label}</span>
                    </div>
                    {step.done ? (
                      <span className="text-xs font-bold text-primary">✓</span>
                    ) : (
                      <span className="text-xs font-bold text-primary animate-pulse">→</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative */}
          <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
