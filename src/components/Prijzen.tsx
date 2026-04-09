import { motion, useInView } from "framer-motion";
import { Check, RefreshCw, ShieldCheck, Users, Minus } from "lucide-react";
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

          {/* Comparison table — donkere variant */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl border border-white/[0.08] overflow-hidden"
          >
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_140px] bg-white/[0.05] border-b border-white/[0.07] px-5 sm:px-6 py-4">
              <div />
              <div className="text-center px-2">
                <p className="text-xs font-bold uppercase tracking-widest text-background/40 mb-0.5">Basis</p>
                <p className="font-syne text-xl font-extrabold text-background">€49<span className="text-xs font-normal text-background/40">/mnd</span></p>
              </div>
              <div className="text-center px-2">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-0.5">Plus</p>
                <p className="font-syne text-xl font-extrabold text-primary">€99<span className="text-xs font-normal text-primary/50">/mnd</span></p>
              </div>
            </div>

            {/* Feature rows */}
            {([
              { label: "Hosting & technische updates", basis: true,     plus: true         },
              { label: "Uptime monitoring",            basis: true,     plus: true         },
              { label: "Aanpassingen per maand",       basis: "1x",     plus: "3x"         },
              { label: "Maandelijkse SEO-check",       basis: false,    plus: true         },
              { label: "Google prestatierapport",      basis: false,    plus: true         },
              { label: "Support",                      basis: "E-mail", plus: "Prioriteit" },
            ] as const).map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_140px] px-5 sm:px-6 py-3.5 border-b border-white/[0.05] last:border-0"
              >
                <span className="text-sm text-background/60 self-center">{row.label}</span>
                <div className="flex justify-center items-center px-2">
                  {row.basis === true
                    ? <Check className="h-4 w-4 text-background/35" />
                    : row.basis === false
                    ? <Minus className="h-3.5 w-3.5 text-background/15" />
                    : <span className="text-xs font-semibold text-background/50">{row.basis}</span>
                  }
                </div>
                <div className="flex justify-center items-center px-2">
                  {row.plus === true
                    ? <Check className="h-4 w-4 text-primary" />
                    : row.plus === false
                    ? <Minus className="h-3.5 w-3.5 text-background/15" />
                    : <span className="text-xs font-semibold text-primary">{row.plus}</span>
                  }
                </div>
              </motion.div>
            ))}

            {/* CTA row */}
            <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_140px] bg-white/[0.04] px-5 sm:px-6 py-4 gap-3">
              <div />
              <div className="px-2">
                <Link
                  to="/aanvraag"
                  className="block text-center text-xs font-semibold py-2 px-3 rounded-full border border-white/20 text-background hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  Basis kiezen
                </Link>
              </div>
              <div className="px-2">
                <Link
                  to="/aanvraag"
                  className="block text-center text-xs font-bold py-2 px-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Plus kiezen
                </Link>
              </div>
            </div>
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
