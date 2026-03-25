import { motion } from "framer-motion";
import { Code, Smartphone, Search, FileText, ArrowRightLeft, Server } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Website op maat",
    description: "Custom frontend gebouwd met moderne frameworks zoals React en Vite. Geen WordPress-templates, maar schone, onderhoudbare code die exact doet wat jouw business nodig heeft.",
  },
  {
    icon: Smartphone,
    title: "Mobiel & snel",
    description: "Responsive design met mobile-first approach. Geoptimaliseerde assets, lazy loading en hoge Core Web Vitals scores zodat je site snel laadt op elk apparaat en netwerk.",
  },
  {
    icon: Search,
    title: "SEO & vindbaarheid",
    description: "Technische SEO vanaf de basis: structured data (JSON-LD), semantic HTML, optimale meta-tags, sitemap en snelle laadtijden. Zo scoor je beter in Google zonder afhankelijk te zijn van ads.",
  },
  {
    icon: FileText,
    title: "Content & teksten",
    description: "Heldere, conversiegerichte copy die aansluit op je doelgroep. We schrijven teksten met de juiste tone of voice en zorgen voor een logische informatiearchitectuur op elke pagina.",
  },
  {
    icon: Server,
    title: "Hosting advies",
    description: "We helpen je de juiste hosting kiezen zonder te veel te betalen. Of het nu Vercel, Netlify, een VPS of shared hosting is — we kijken naar wat je site nodig heeft qua traffic, uptime en budget.",
  },
  {
    icon: ArrowRightLeft,
    title: "Overdracht op maat",
    description: "Volledige overdracht van broncode, deployment pipeline en documentatie. Je krijgt toegang tot de Git-repo en kunt zelf verder ontwikkelen of het bij je eigen partij onderbrengen.",
  },
];

const Diensten = () => {
  return (
    <section id="diensten" className="scroll-mt-28 py-24 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-syne font-extrabold text-foreground mb-4">
            Alles wat je nodig hebt om goed online te staan
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-syne font-bold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Diensten;
