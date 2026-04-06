import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const portfolio = [
  {
    name: "Barber Rens",
    description: "Duidelijke website die in één oogopslag laat zien wat Rens doet en klanten direct doorlinkt naar WhatsApp voor een afspraak.",
    url: "https://rensvandepol.nl",
  },
  {
    name: "SnackSpot",
    description: "Werkende community-app met actieve gebruikers die lokale eetgelegenheden ontdekken, beoordelen en delen.",
    url: "https://snackspot.online/product",
  },
  {
    name: "BunkHosting",
    description: "Volledig zelfgebouwd VPS hosting platform, van database tot gebruikersinterface, end-to-end ontwikkeld.",
    url: "https://bunkhosting.nl",
  },
  {
    name: "Stijn van de Pol, Portfolio",
    description: "Creatieve portfolio in macOS-stijl die meteen laat zien wat ik kan. Bezoekers zien direct mijn ervaring en skillset.",
    url: "https://stijnvandepol.nl",
  },
];

const OverWebvakwerk = () => {
  return (
    <section id="over" className="scroll-mt-28 px-6 py-14 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-foreground/[0.03] to-transparent" />
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col md:flex-row items-start gap-10"
        >
          {/* Avatar/icon */}
          <motion.div
            className="shrink-0"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[0_12px_30px_-8px_hsl(var(--warm-orange)/0.3)]">
              <span className="text-3xl font-syne font-extrabold text-primary-foreground">SvdP</span>
            </div>
          </motion.div>
          <div>
            <motion.p
              className="text-sm font-bold uppercase tracking-[0.18em] text-primary"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Over Webvakwerk
            </motion.p>
            <motion.h2
              className="mt-2 font-syne text-2xl font-extrabold text-foreground sm:text-3xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Gemaakt door Stijn van de Pol
            </motion.h2>
            <motion.p
              className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Ik ben een developer uit Noord-Brabant en Limburg met een achtergrond in IT-infrastructuur, webdevelopment en automatisering. Ik help zzp'ers en kleine bedrijven aan een website die helder uitlegt wat je doet en direct aanzet tot contact. Geen lang traject of vaag gedoe.
            </motion.p>
            <motion.p
              className="mt-3 text-base leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Naast websites bouw ik ook webapplicaties, hosting-oplossingen en automatiseringen. Alles wat ik aanbied heb ik zelf ook gebouwd en gebruik ik zelf.
            </motion.p>
            <motion.p
              className="mt-3 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              Meer over mij: <a href="https://stijnvandepol.nl" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">stijnvandepol.nl</a>
            </motion.p>
          </div>
        </motion.div>

        {/* Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-5">Eerder gemaakt</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolio.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.08 }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group flex items-start justify-between gap-4 rounded-xl border border-foreground/[0.06] bg-card p-5 hover:border-primary/30 transition-colors"
              >
                <div>
                  <p className="font-syne font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors mt-0.5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OverWebvakwerk;
