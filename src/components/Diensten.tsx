import { motion } from "framer-motion";
import { Code, Smartphone, Search, Server, FileText, ArrowRightLeft } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Heldere website-opbouw",
    description: "We bouwen een structuur die direct uitlegt wat je doet, voor wie en hoe klanten contact opnemen.",
  },
  {
    icon: Smartphone,
    title: "Snel en mobiel vriendelijk",
    description: "Je site werkt op mobiel, tablet en desktop en laadt snel, zodat bezoekers niet afhaken.",
  },
  {
    icon: Search,
    title: "Vindbaarheid als basis",
    description: "We leggen SEO-fundamenten direct goed aan met duidelijke pagina-opbouw, metadata en logische content.",
  },
  {
    icon: Server,
    title: "Hosting zonder gedoe",
    description: "Wij regelen hosting, updates en back-ups, of dragen alles netjes over aan je eigen partij.",
  },
  {
    icon: FileText,
    title: "Teksten die converteren",
    description: "Geen vage marketingtaal, maar concrete copy die vertrouwen geeft en aanzet tot actie.",
  },
  {
    icon: ArrowRightLeft,
    title: "Duidelijke overdracht",
    description: "Je zit nergens aan vast: na oplevering kies je zelf voor beheer door ons of volledige overdracht.",
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
            Voor ondernemers die online duidelijk willen zijn
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We bouwen websites voor bedrijven die professioneel willen overkomen, beter gevonden willen worden en snel live willen.
          </p>
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
