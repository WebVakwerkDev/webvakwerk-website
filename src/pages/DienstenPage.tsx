import { motion } from "framer-motion";
import { Server, CloudUpload, Workflow, Bot, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { usePageSeo } from "@/hooks/use-page-seo";

const services = [
  {
    icon: Server,
    title: "Hosting & infrastructuur",
    description:
      "Betaal je te veel voor hosting, of zit je vast aan een dure cloudoplossing? Wij helpen bij het opzetten van betaalbare hosting, en bij migraties van cloud naar eigen server of andersom. Geen onnodige kosten, gewoon de infrastructuur die bij je situatie past.",
  },
  {
    icon: Workflow,
    title: "Procesautomatisering",
    description:
      "Repetitieve taken automatisch laten verlopen met low-code flows. Denk aan offertes, facturen, e-mails en planningen die zichzelf afhandelen. Snel inzetbaar, zonder maatwerk-code.",
  },
  {
    icon: Bot,
    title: "AI & Integratie",
    description:
      "AI inzetten op de plekken waar het echt iets oplevert. Van AI agents die zelfstandig taken uitvoeren tot MCP koppelingen die AI toegang geven tot eigen data en systemen. Inclusief advies over aanpak en inrichting.",
  },
  {
    icon: Lightbulb,
    title: "Advies & strategie",
    description:
      "Samen bepalen wat automatiseren of AI oplevert, in welke volgorde en met welke middelen. Zodat er gebouwd wordt op basis van een concreet doel.",
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

const DienstenPage = () => {
  usePageSeo({
    title: "Overige diensten | Webvakwerk",
    description:
      "Hosting, infrastructuur migratie, procesautomatisering en AI-integratie. Webvakwerk helpt je verder dan alleen een website.",
    canonicalPath: "/diensten",
  });

  return (
    <div className="min-h-screen bg-background font-body pb-20 md:pb-0">
      <Navbar />
      <main className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">
              Overige diensten
            </p>
            <h1 className="text-3xl md:text-4xl font-syne font-extrabold text-foreground mb-4">
              Hosting, automatisering & AI
            </h1>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Naast webdevelopment helpen we je met infrastructuur, automatisering en slimme AI-toepassingen. Geen onnodige complexiteit, wel concrete resultaten.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            style={{ perspective: "1000px" }}
          >
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="group relative rounded-2xl p-6 bg-foreground/5 border border-foreground/10 hover:border-primary/30 hover:bg-foreground/10 transition-colors duration-300"
              >
                <motion.div
                  className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <h2 className="text-lg font-syne font-bold text-foreground mb-2">
                  {service.title}
                </h2>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {service.description}
                </p>

                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.06) 45%, transparent 50%)",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-syne font-extrabold text-foreground mb-3">
              Wil je weten wat dit voor jou kan betekenen?
            </h3>
            <p className="text-foreground/60 mb-6 max-w-lg mx-auto">
              Neem vrijblijvend contact op en we kijken samen naar de mogelijkheden.
            </p>
            <Link
              to="/aanvraag"
              className="inline-block px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm transition-colors hover:opacity-90"
            >
              Neem contact op
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default DienstenPage;
