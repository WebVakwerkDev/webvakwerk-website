import { motion } from "framer-motion";
import { Code, Smartphone, Search, Server, FileText, ArrowRightLeft } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Website op maat",
    description: "Geen standaard template, maar een site die past bij je bedrijf, aanbod en doelgroep.",
  },
  {
    icon: Smartphone,
    title: "Mobiel & snel",
    description: "Werkt goed op mobiel, tablet en desktop en laadt snel. Dat is de basis.",
  },
  {
    icon: Search,
    title: "Gevonden worden (SEO)",
    description: "Technische basis voor Google: goede structuur, snelle pagina's en nette metadata.",
  },
  {
    icon: Server,
    title: "Hosting & beheer",
    description: "Hosting, SSL en backups kunnen we voor je regelen. Wil je het zelf doen, dan dragen we het over.",
  },
  {
    icon: FileText,
    title: "Content & teksten",
    description: "We helpen je teksten scherper maken, zodat bezoekers snel begrijpen wat je doet en contact opnemen.",
  },
  {
    icon: ArrowRightLeft,
    title: "Overdracht op maat",
    description: "Liever zelf beheren? Dan leveren we alles netjes op aan jou of je vaste partij.",
  },
];

const Diensten = () => {
  return (
    <section id="diensten" className="py-24 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-syne font-extrabold text-foreground mb-4">
            Gewoon goed geregeld
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
