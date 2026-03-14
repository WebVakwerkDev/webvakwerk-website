import { motion } from "framer-motion";
import { Code, Smartphone, Search, Server, FileText, ArrowRightLeft } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Website op maat",
    description: "Wij bouwen een website die past bij je bedrijf, diensten en klanten. Zo ziet je site er professioneel uit en sluit alles beter aan op wat jij verkoopt.",
  },
  {
    icon: Smartphone,
    title: "Mobiel & snel",
    description: "Je website werkt goed op mobiel, tablet en desktop en laadt snel. Dat is belangrijk, omdat bezoekers anders afhaken voordat ze contact opnemen.",
  },
  {
    icon: Search,
    title: "Gevonden worden (SEO)",
    description: "Wij zorgen ervoor dat je website beter vindbaar is in Google en klanten je makkelijker kunnen vinden. Dat zorgt voor meer aanvragen en sneller contact.",
  },
  {
    icon: Server,
    title: "Hosting & beheer",
    description: "Wij kunnen de hosting, beveiliging en backups voor je regelen. Zo blijft je website online en veilig, zonder dat jij daar zelf achteraan hoeft.",
  },
  {
    icon: FileText,
    title: "Content & teksten",
    description: "We helpen je met duidelijke teksten die meteen uitleggen wat je doet. Daardoor snappen bezoekers sneller je aanbod en nemen ze sneller contact op.",
  },
  {
    icon: ArrowRightLeft,
    title: "Overdracht op maat",
    description: "Wil je het liever zelf beheren of bij je eigen partij neerleggen, dan dragen we alles netjes over. Zo zit je nergens aan vast en houd je zelf de regie.",
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
