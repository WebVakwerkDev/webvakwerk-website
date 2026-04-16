import { motion, useInView } from "framer-motion";
import { Check, RefreshCw, ShieldCheck, Users } from "lucide-react";
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
    <section id="prijzen" className="scroll-mt-28 relative overflow-hidden">
      {/* Prijzen deel — lichte achtergrond */}
      <div className="px-6 py-16 relative">
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
              sub: "Tijdelijk cadeau, normaal €149 per ronde",
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

      </div>
      </div>

      {/* Onderhoud — donkere escape, zelfde stijl als Diensten */}
      <div className="bg-foreground/95 relative overflow-hidden px-6 py-16">
        {/* Decoratieve gloed */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/15 blur-[100px] pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        {/* Dot patroon */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--background)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="mx-auto max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8"
          >
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-2">Na oplevering</p>
              <h3 className="font-syne text-2xl font-extrabold text-background md:text-3xl">
                Onderhoud & groei
              </h3>
            </div>
            <p className="text-sm text-background/40 shrink-0">
              Optioneel, maandelijks opzegbaar.
            </p>
          </motion.div>

          {/* Één container, twee kolommen */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl border border-white/[0.08] overflow-hidden grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]"
          >
            {/* Basis */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="p-8 flex flex-col"
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-background/35 mb-5">Basis</p>
              <div className="mb-7">
                <span className="font-syne text-6xl font-extrabold text-background leading-none">€29</span>
                <span className="block text-sm text-background/30 mt-2">per maand, excl. btw</span>
              </div>
              <ul className="space-y-2.5 flex-1 mb-8">
                {["Hosting & technische updates", "Uptime monitoring", "E-mail support"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-background/45">
                    <span className="w-1 h-1 rounded-full bg-background/25 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/aanvraag"
                className="block text-center text-sm font-semibold py-3 rounded-full border border-white/15 text-background/70 hover:bg-white/[0.07] transition-colors"
              >
                Basis kiezen
              </Link>
            </motion.div>

            {/* Plus */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="p-8 flex flex-col bg-white/[0.04]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary mb-5">Plus</p>
              <div className="mb-7">
                <span className="font-syne text-6xl font-extrabold text-background leading-none">€69</span>
                <span className="block text-sm text-background/30 mt-2">per maand, excl. btw</span>
              </div>
              <ul className="space-y-2.5 flex-1 mb-8">
                {["Alles van Basis", "1 aanpassing per maand", "Maandelijkse SEO-check", "Google prestatierapport", "Prioriteit support"].map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: 6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.55 + i * 0.05 }}
                    className="flex items-center gap-2.5 text-sm text-background/55"
                  >
                    <span className="w-1 h-1 rounded-full bg-background/30 shrink-0" />
                    {f}
                  </motion.li>
                ))}
              </ul>
              <Link
                to="/aanvraag"
                className="block text-center text-sm font-bold py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Plus kiezen
              </Link>
            </motion.div>
          </motion.div>

          <p className="mt-4 text-center text-xs text-background/30">
            Geen contract, maandelijks opzegbaar. Altijd optioneel na oplevering.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Prijzen;
