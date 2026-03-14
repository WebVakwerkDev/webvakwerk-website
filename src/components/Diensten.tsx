import { motion } from "framer-motion";
import { Code, Smartphone, Search, Server, FileText, ArrowRightLeft } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Website op maat",
    description: "Geen template, maar een website die past bij jouw bedrijf. Ontworpen en gebouwd op basis van jouw wensen.",
  },
  {
    icon: Smartphone,
    title: "Mobiel & snel",
    description: "Elke website werkt perfect op telefoon, tablet en desktop. Razendsnel geladen, altijd.",
  },
  {
    icon: Search,
    title: "Gevonden worden (SEO)",
    description: "Basisoptimalisatie zodat je goed vindbaar bent in Google. Van meta-tags tot snelle laadtijden.",
  },
  {
    icon: Server,
    title: "Hosting & beheer",
    description: "Wij regelen je hosting, SSL-certificaat en backups. Jij hoeft nergens naar om te kijken.",
  },
  {
    icon: FileText,
    title: "Content & teksten",
    description: "Hulp nodig bij teksten? Wij denken mee over heldere, effectieve content voor je website.",
  },
  {
    icon: ArrowRightLeft,
    title: "Overdracht op maat",
    description: "Liever zelf beheren? We dragen alles netjes over aan jou of je IT-partner. Inclusief uitleg.",
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
            Alles voor jouw online aanwezigheid
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
