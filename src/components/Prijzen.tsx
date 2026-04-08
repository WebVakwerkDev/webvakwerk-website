import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

function AnimatedPrice({ target, prefix = "€" }: { target: number; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      start = Math.round(eased * target);
      setValue(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{value}</span>;
}

const plans = [
  {
    name: "Snel vindbaar",
    price: 499,
    priceLabel: "€499",
    period: "eenmalig",
    featured: false,
    tagline: "Perfect voor zzp'ers die snel online gevonden willen worden.",
    features: [
      "Tot 3 pagina's",
      "Mobiel geoptimaliseerd",
      "SEO-basis",
      "Gratis demo vooraf",
      "Max. 3 feedbackmomenten inbegrepen",
      "Nu tijdelijk: extra ronde gratis",
      "Overdracht naar eigen partij of hoster",
    ],
  },
  {
    name: "Optimaal vindbaar",
    price: 899,
    priceLabel: "€899",
    period: "eenmalig",
    featured: true,
    badge: "Meest gekozen",
    tagline: "Voor ondernemers die meer uit hun website willen halen.",
    features: [
      "Tot 5 pagina's",
      "Animaties en premium design",
      "Contactformulier en uitgebreide formulieren",
      "SEO uitgebreid",
      "Gratis demo vooraf",
      "Max. 5 feedbackmomenten inbegrepen",
      "Nu tijdelijk: extra ronde gratis",
      "Overdracht naar eigen partij of hoster",
    ],
  },
  {
    name: "Op maat",
    price: 0,
    priceLabel: "Op aanvraag",
    period: "",
    featured: false,
    tagline: "Voor ondernemers die verder willen gaan dan alleen een website.",
    features: [
      "Onbeperkt pagina's",
      "Koppelingen met andere tools en software",
      "Automatisering van terugkerende taken",
      "Op maat gemaakte functionaliteiten",
      "Hulp bij hosting, onderhoud en doorontwikkeling",
    ],
  },
];

const hostingPlans = [
  {
    name: "Basis",
    price: 49,
    period: "maand",
    featured: false,
    features: [
      "Hosting & technische updates",
      "Uptime monitoring",
      "1 kleine aanpassing per maand",
      "E-mail support",
    ],
  },
  {
    name: "Plus",
    price: 99,
    period: "maand",
    featured: true,
    features: [
      "Alles van Basis",
      "Maandelijkse SEO-check",
      "Google prestatierapport",
      "3 aanpassingen per maand",
      "Prioriteit support",
    ],
  },
];

const Prijzen = () => {
  return (
    <section id="prijzen" className="scroll-mt-28 px-6 py-16 relative overflow-hidden">
      {/* Subtle warm background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-primary/[0.04]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Pakketten</p>
          <h2 className="mb-4 font-syne text-3xl font-extrabold text-foreground md:text-4xl max-w-lg">
            Transparante prijzen, geen verrassingen
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Snel vindbaar voor een compacte site, Optimaal vindbaar voor extra ruimte en Op maat voor grotere trajecten. Alle prijzen zijn exclusief 21% btw.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={!plan.featured ? {
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              } : undefined}
              className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 ${
                plan.featured
                  ? "z-10 md:scale-[1.05] bg-primary text-primary-foreground shadow-[0_20px_60px_-12px_hsl(var(--warm-orange)/0.4)] order-first md:order-none"
                  : "bg-card border border-foreground/[0.04] shadow-[0_8px_30px_-12px_hsl(var(--ink)/0.1)] hover:shadow-[0_16px_40px_-8px_hsl(var(--ink)/0.16)]"
              }`}
            >
              {/* Shimmer effect on featured card */}
              {plan.featured && (
                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                  initial={false}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 40%, transparent 50%)",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                  />
                </motion.div>
              )}

              {plan.badge && (
                <motion.span
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-1 text-xs font-bold text-background"
                >
                  {plan.badge}
                </motion.span>
              )}
              <h3 className={`mb-1 font-syne text-xl font-bold ${plan.featured ? "" : "text-foreground"}`}>{plan.name}</h3>
              {plan.tagline && (
                <p className={`mb-3 text-sm ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.tagline}</p>
              )}
              <div className="mb-5">
                <span className={`font-syne text-3xl font-extrabold ${plan.featured ? "" : "text-foreground"}`}>
                  {plan.price > 0 ? <AnimatedPrice target={plan.price} /> : plan.priceLabel}
                </span>
                {plan.period && <span className={`ml-2 text-sm ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>}
                {plan.price > 0 && !plan.featured && (
                  <p className="mt-2 text-sm font-medium text-muted-foreground">Excl. 21% btw</p>
                )}
                {plan.price > 0 && plan.featured && (
                  <p className="mt-2 text-sm font-medium text-primary-foreground/60">Excl. 21% btw</p>
                )}
              </div>
              <ul className="mb-7 flex-1 space-y-3">
                {plan.features.map((feature, fi) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 + fi * 0.05, duration: 0.3 }}
                    className={`flex items-start gap-2 text-sm ${plan.featured ? "text-primary-foreground/90" : "text-foreground"}`}
                  >
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-primary-foreground/70" : "text-primary"}`} />
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/aanvraag"
                  className={`block rounded-full py-3 text-center text-sm font-bold transition-colors ${
                    plan.featured
                      ? "bg-primary-foreground text-primary hover:opacity-90"
                      : "border border-foreground/15 text-foreground hover:bg-secondary"
                  }`}
                >
                  {plan.price === 0 ? "Plan een gesprek" : "Gratis demo aanvragen →"}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground"
        >
          3 of 5 iteratiemomenten gehad en nog niet helemaal tevreden? Extra iteratiemomenten zijn bij te boeken voor €149 per keer (excl. btw).
        </motion.p>

        {/* Hosting packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-foreground/10" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary px-3">Hosting & onderhoud</span>
            <div className="flex-1 h-px bg-foreground/10" />
          </div>
          <p className="text-center text-muted-foreground mb-8">Hostingpakketten vanaf €49/maand excl. btw — wij houden je site stabiel, veilig en up-to-date.</p>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
            {hostingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                whileHover={!plan.featured ? {
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                } : undefined}
                className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 ${
                  plan.featured
                    ? "bg-primary text-primary-foreground shadow-[0_20px_60px_-12px_hsl(var(--warm-orange)/0.4)]"
                    : "bg-card border border-foreground/[0.04] shadow-[0_8px_30px_-12px_hsl(var(--ink)/0.1)] hover:shadow-[0_16px_40px_-8px_hsl(var(--ink)/0.16)]"
                }`}
              >
                {plan.featured && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                    initial={false}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 40%, transparent 50%)",
                      }}
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                    />
                  </motion.div>
                )}
                <h3 className={`mb-1 font-syne text-xl font-bold ${plan.featured ? "" : "text-foreground"}`}>{plan.name}</h3>
                <div className="mb-5">
                  <span className={`font-syne text-3xl font-extrabold ${plan.featured ? "" : "text-foreground"}`}>
                    <AnimatedPrice target={plan.price} />
                  </span>
                  <span className={`ml-2 text-sm ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>/{plan.period}</span>
                  <p className={`mt-2 text-sm font-medium ${plan.featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}>Excl. 21% btw</p>
                </div>
                <ul className="mb-7 flex-1 space-y-3">
                  {plan.features.map((feature, fi) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15 + fi * 0.05, duration: 0.3 }}
                      className={`flex items-start gap-2 text-sm ${plan.featured ? "text-primary-foreground/90" : "text-foreground"}`}
                    >
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-primary-foreground/70" : "text-primary"}`} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/aanvraag"
                    className={`block rounded-full py-3 text-center text-sm font-bold transition-colors ${
                      plan.featured
                        ? "bg-primary-foreground text-primary hover:opacity-90"
                        : "border border-foreground/15 text-foreground hover:bg-secondary"
                    }`}
                  >
                    Neem contact op →
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Prijzen;
