import { motion } from "framer-motion";
import { Code, Smartphone, Search, FileText, ArrowRightLeft, Server, Workflow, Bot, Lightbulb } from "lucide-react";

const webServices = [
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
    title: "Betaalbare hosting",
    description: "Veel bedrijven betalen te veel voor hosting via een bureau of reseller. Wij helpen bij het opzetten van goedkope, betrouwbare hosting in eigen beheer. Geen onnodige marges, gewoon een stabiele omgeving voor een eerlijke prijs.",
  },
  {
    icon: ArrowRightLeft,
    title: "Overdracht op maat",
    description: "Wil je het zelf beheren of bij je eigen partij neerleggen? Dan dragen we alles netjes over. Zo zit je nergens aan vast en houd je zelf de regie over je website.",
  },
];

const automationServices = [
  {
    icon: Workflow,
    title: "Procesautomatisering",
    description: "Repetitieve taken automatisch laten verlopen met low-code flows. Denk aan offertes, facturen, e-mails en planningen die zichzelf afhandelen. Snel inzetbaar, zonder maatwerk-code.",
  },
  {
    icon: Bot,
    title: "AI & Integratie",
    description: "AI inzetten op de plekken waar het echt iets oplevert. Van AI agents die zelfstandig taken uitvoeren tot MCP koppelingen die AI toegang geven tot eigen data en systemen. Inclusief advies over aanpak en inrichting.",
  },
  {
    icon: Lightbulb,
    title: "Advies & strategie",
    description: "Samen bepalen wat automatiseren of AI oplevert, in welke volgorde en met welke middelen. Zodat er gebouwd wordt op basis van een concreet doel.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const Diensten = () => {
  return (
    <section id="diensten" className="scroll-mt-28 py-16 px-6 bg-foreground/95 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/15 blur-[100px]" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-primary/10 blur-[80px]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--background)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

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
            Van website tot automatisering, alles onder één dak
          </h2>
        </motion.div>

        {/* Web services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1000px" }}>
          {webServices.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group relative rounded-2xl p-6 bg-foreground/80 border border-background/10 hover:border-primary/30 hover:bg-foreground/90 transition-colors duration-300"
            >
              <motion.div
                className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <service.icon className="w-5 h-5 text-primary" />
              </motion.div>
              <h3 className="text-lg font-syne font-bold text-background mb-2">
                {service.title}
              </h3>
              <p className="text-background/60 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Hover shine effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.06) 45%, transparent 50%)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="my-12 flex items-center gap-4"
        >
          <div className="flex-1 h-px bg-background/10" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary px-3">Automatisering & AI</span>
          <div className="flex-1 h-px bg-background/10" />
        </motion.div>

        {/* Automation services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1000px" }}>
          {automationServices.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group relative rounded-2xl p-6 bg-foreground/80 border border-background/10 hover:border-primary/30 hover:bg-foreground/90 transition-colors duration-300"
            >
              <motion.div
                className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <service.icon className="w-5 h-5 text-primary" />
              </motion.div>
              <h3 className="text-lg font-syne font-bold text-background mb-2">
                {service.title}
              </h3>
              <p className="text-background/60 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Hover shine effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.06) 45%, transparent 50%)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Diensten;
