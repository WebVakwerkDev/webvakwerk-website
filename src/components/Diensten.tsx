import { motion } from "framer-motion";
import { Code, Smartphone, Search, FileText, ArrowRightLeft, Server } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Website op maat",
    description: "Wij bouwen een website die past bij je bedrijf, diensten en klanten. Geen standaard template, maar een site die er professioneel uitziet en aansluit op wat jij aanbiedt.",
  },
  {
    icon: Smartphone,
    title: "Mobiel & snel",
    description: "Je website werkt goed op telefoon, tablet en computer en laadt snel. Dat is belangrijk, omdat bezoekers anders afhaken voordat ze contact opnemen.",
  },
  {
    icon: Search,
    title: "Gevonden worden (SEO)",
    description: "Wij zorgen ervoor dat je website beter vindbaar is in Google, zodat klanten je makkelijker vinden. Dat levert meer aanvragen op zonder dat je hoeft te betalen voor advertenties.",
  },
  {
    icon: FileText,
    title: "Content & teksten",
    description: "We helpen je met duidelijke teksten die meteen uitleggen wat je doet. Daardoor snappen bezoekers sneller je aanbod en nemen ze eerder contact op.",
  },
  {
    icon: Server,
    title: "Hosting advies",
    description: "We helpen je de juiste plek kiezen om je website te laten draaien, zonder dat je te veel betaalt. We kijken naar wat je site nodig heeft en zorgen dat je niet vastzit aan dure abonnementen.",
  },
  {
    icon: ArrowRightLeft,
    title: "Overdracht op maat",
    description: "Wil je het zelf beheren of bij je eigen partij neerleggen? Dan dragen we alles netjes over. Zo zit je nergens aan vast en houd je zelf de regie over je website.",
  },
];

const Diensten = () => {
  return (
    <section id="diensten" className="scroll-mt-28 py-16 px-6 bg-foreground/95 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/15 blur-[100px]" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-primary/10 blur-[80px]" />

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Diensten</p>
          <h2 className="text-3xl md:text-4xl font-syne font-extrabold text-background mb-4">
            Alles wat je nodig hebt om goed online te staan
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl p-6 bg-foreground/80 border border-background/10 hover:border-primary/30 hover:bg-foreground/90 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-syne font-bold text-background mb-2">
                {service.title}
              </h3>
              <p className="text-background/60 text-sm leading-relaxed">
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
