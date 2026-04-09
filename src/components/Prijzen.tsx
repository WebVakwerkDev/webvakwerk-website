import { motion, useInView } from "framer-motion";
import { Check, RefreshCw, ShieldCheck, Users, Wrench, BarChart2, Star } from "lucide-react";
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
    valueAnchor: null,
    period: "eenmalig",
    featured: false,
    tagline: "Voor zzp'ers die deze week nog vindbaar willen zijn op Google.",
    features: [
      "Tot 3 pagina's, professioneel en mobiel klaar",
      "Basis SEO: klanten vinden je via Google",
      "Gratis demo vooraf, betaal pas bij akkoord",
      "Live binnen 3 weken na akkoord",
      "Max. 3 revisierondes inbegrepen",
      "Jij blijft altijd eigenaar van je site",
    ],
  },
  {
    name: "Optimaal vindbaar",
    price: 899,
    priceLabel: "€899",
    valueAnchor: null,
    period: "eenmalig",
    featured: true,
    badge: "Meest gekozen",
    tagline: "Voor ondernemers die structureel nieuwe klanten willen trekken via Google.",
    features: [
      "Tot 5 pagina's, animaties en premium design",
      "Contactformulier zodat klanten direct contact opnemen",
      "Uitgebreide SEO: beter vindbaar in Google",
      "Google Snelstart: Google Mijn Bedrijf setup",
      "30 Dagen Nazorg: gratis aanpassingen eerste maand",
      "Gratis demo vooraf, betaal pas bij akkoord",
      "Live binnen 3 weken na akkoord",
      "Max. 5 revisierondes inbegrepen",
      "Jij blijft altijd eigenaar van je site",
    ],
  },
  {
    name: "Op maat",
    price: 0,
    priceLabel: "Op aanvraag",
    valueAnchor: null,
    period: "",
    featured: false,
    tagline: "Voor ondernemers die verder willen gaan dan alleen een website.",
    features: [
      "Onbeperkt pagina's en functionaliteiten",
      "Koppelingen met andere tools en software",
      "Automatisering van terugkerende taken",
      "Op maat gemaakte functionaliteiten",
      "Hulp bij hosting, onderhoud en doorontwikkeling",
      "Vanaf €1.600 excl. btw, prijs op aanvraag",
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
                  <p className="mt-1 text-sm font-medium text-muted-foreground">Excl. 21% btw</p>
                )}
                {plan.price > 0 && plan.featured && (
                  <p className="mt-1 text-sm font-medium text-primary-foreground/60">Excl. 21% btw</p>
                )}
                {plan.valueAnchor && (
                  <p className={`mt-2 text-xs font-semibold ${plan.featured ? "text-primary-foreground/50" : "text-muted-foreground/60"}`}>
                    {plan.valueAnchor}, jij betaalt{" "}
                    <span className={plan.featured ? "text-primary-foreground font-bold" : "text-primary font-bold"}>
                      {plan.priceLabel}
                    </span>
                  </p>
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
                  {plan.price === 0 ? "Neem contact op →" : "Ja, ik wil een gratis demo →"}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-10 max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              icon: RefreshCw,
              label: "Extra revisieronde gratis",
              sub: "Tijdelijk cadeau — normaal €149 per ronde",
              accent: true,
            },
            {
              icon: ShieldCheck,
              label: "Betaal pas bij akkoord",
              sub: "Geen verborgen kosten, geen kleine lettertjes",
              accent: false,
            },
            {
              icon: Users,
              label: "Max. 3 projecten/maand",
              sub: "Zo garandeer ik kwaliteit voor elk project",
              accent: false,
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65 + i * 0.08 }}
              className={`flex flex-col items-center text-center gap-2 rounded-2xl px-5 py-5 ${
                item.accent
                  ? "bg-primary/8 border border-primary/20"
                  : "bg-card border border-foreground/[0.05]"
              }`}
            >
              <div className={`rounded-full p-2 ${item.accent ? "bg-primary/15" : "bg-secondary"}`}>
                <item.icon className={`h-4 w-4 ${item.accent ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <p className={`text-sm font-semibold leading-snug ${item.accent ? "text-primary" : "text-foreground"}`}>
                {item.label}
              </p>
              <p className="text-xs text-muted-foreground leading-snug">{item.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Onderhoudspakketten */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Na oplevering</p>
            <h3 className="mb-3 font-syne text-2xl font-extrabold text-foreground md:text-3xl">
              Onderhoud & groei
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm">
              Optioneel — maandelijks opzegbaar, geen gedoe.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-[0_12px_48px_-12px_hsl(var(--ink)/0.12)] border border-foreground/[0.06]">

            {/* Basis */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="bg-card p-8 flex flex-col border-b md:border-b-0 md:border-r border-foreground/[0.06] relative"
            >
              {/* Subtle corner decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.04] pointer-events-none">
                <svg viewBox="0 0 96 96" fill="none">
                  <circle cx="96" cy="0" r="60" fill="hsl(var(--ink))" />
                </svg>
              </div>

              <div className="flex items-center gap-2 mb-5">
                <div className="rounded-xl bg-secondary p-2">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="font-syne text-base font-bold text-foreground">Basis</span>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="font-syne text-4xl font-extrabold text-foreground">€49</span>
                  <span className="text-sm text-muted-foreground mb-1">/maand</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">excl. 21% btw</p>
              </div>

              <ul className="space-y-3 flex-1">
                {[
                  "Hosting & technische updates",
                  "Uptime monitoring",
                  "1 kleine aanpassing per maand",
                  "E-mail support",
                ].map((text) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {text}
                  </li>
                ))}
              </ul>

              <motion.a
                href="/aanvraag"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-7 block rounded-full border border-foreground/15 py-2.5 text-center text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                Basis kiezen →
              </motion.a>
            </motion.div>

            {/* Plus — featured */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="bg-primary p-8 flex flex-col relative overflow-hidden"
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
              />

              {/* Decorative circle */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/[0.06] pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/[0.04] pointer-events-none" />

              {/* Popular badge */}
              <div className="absolute top-5 right-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65, type: "spring", stiffness: 280 }}
                  className="flex items-center gap-1 rounded-full bg-primary-foreground/15 backdrop-blur-sm border border-white/20 px-3 py-1"
                >
                  <Star className="h-3 w-3 text-primary-foreground fill-primary-foreground" />
                  <span className="text-xs font-bold text-primary-foreground">Populair</span>
                </motion.div>
              </div>

              <div className="flex items-center gap-2 mb-5">
                <div className="rounded-xl bg-primary-foreground/15 p-2">
                  <BarChart2 className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-syne text-base font-bold text-primary-foreground">Plus</span>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="font-syne text-4xl font-extrabold text-primary-foreground">€99</span>
                  <span className="text-sm text-primary-foreground/70 mb-1">/maand</span>
                </div>
                <p className="text-xs text-primary-foreground/50 mt-1">excl. 21% btw</p>
              </div>

              <ul className="space-y-3 flex-1">
                {[
                  "Alles van Basis",
                  "Maandelijkse SEO-check",
                  "Google prestatierapport",
                  "3 aanpassingen per maand",
                  "Prioriteit support",
                ].map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className="flex items-center gap-3 text-sm text-primary-foreground/90"
                  >
                    <Check className="h-4 w-4 shrink-0 text-primary-foreground/60" />
                    {f}
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="/aanvraag"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-7 block rounded-full bg-primary-foreground py-2.5 text-center text-sm font-bold text-primary hover:opacity-90 transition-opacity"
              >
                Plus kiezen →
              </motion.a>
            </motion.div>
          </div>

          {/* Small disclaimer */}
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Geen contract — maandelijks opzegbaar. Onderhoud is altijd optioneel na oplevering.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Prijzen;
