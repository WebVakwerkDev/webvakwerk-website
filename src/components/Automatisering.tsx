import { motion } from "framer-motion";
import { Workflow, Plug, Bot, Sparkles, RefreshCw, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "Low-code flows",
    description: "Werkprocessen automatiseren met N8N, Power Automate of Make — zonder maatwerk-code. Snel inzetbaar en eenvoudig te beheren.",
  },
  {
    icon: Plug,
    title: "API koppelingen",
    description: "Systemen laten samenwerken via API's: van CRM en boekhouding tot webshops en eigen platformen. Geen dubbel invoeren meer.",
  },
  {
    icon: Bot,
    title: "MCP integraties",
    description: "AI-tooling verbinden met je eigen omgeving via het Model Context Protocol. Geef AI toegang tot jouw data en systemen.",
  },
  {
    icon: Sparkles,
    title: "AI-driven flows",
    description: "Documenten verwerken, leads opvolgen, rapportages genereren — aangestuurd door AI. Slim automatiseren op basis van context.",
  },
  {
    icon: RefreshCw,
    title: "Procesautomatisering",
    description: "Offertes, facturen, e-mails en planningen automatisch laten afhandelen. Minder handmatig werk, meer tijd voor wat telt.",
  },
  {
    icon: Lightbulb,
    title: "Advies & strategie",
    description: "Samen bepalen wát je automatiseert, in welke volgorde en met welke tooling. Zodat je investering direct resultaat oplevert.",
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

const Automatisering = () => {
  return (
    <section id="automatisering" className="scroll-mt-28 py-16 px-6 bg-foreground/95 relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/15 blur-[100px]" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-primary/10 blur-[80px]" />

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
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Automatisering & AI</p>
          <h2 className="text-3xl md:text-4xl font-syne font-extrabold text-background mb-4">
            Meer dan een website — slimmer werken
          </h2>
          <p className="text-background/60 text-base max-w-xl mx-auto">
            Van low-code flows tot AI-gestuurde processen. Wij verbinden je systemen en automatiseren het handmatige werk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1000px" }}>
          {services.map((service, i) => (
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

export default Automatisering;
