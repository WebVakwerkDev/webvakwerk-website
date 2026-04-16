import { motion } from "framer-motion";
import { Code, Smartphone, Search, FileText, Server, ArrowRightLeft, Workflow, Bot, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { usePageSeo } from "@/hooks/use-page-seo";
import { useBreadcrumbSchema } from "@/hooks/use-breadcrumb-schema";

const webServices = [
  {
    icon: Code,
    title: "Website op maat",
    description:
      "Ik bouw een website die past bij je bedrijf, diensten en klanten. Geen standaard template, maar een site die er professioneel uitziet en aansluit op wat jij aanbiedt.",
  },
  {
    icon: Smartphone,
    title: "Mobiel & snel",
    description:
      "Je website werkt goed op telefoon, tablet en computer en laadt snel. Dat is belangrijk, omdat bezoekers anders afhaken voordat ze contact opnemen.",
  },
  {
    icon: Search,
    title: "Gevonden worden (SEO)",
    description:
      "Ik zorg ervoor dat je website beter vindbaar is in Google, zodat klanten je makkelijker vinden. Dat levert meer aanvragen op zonder dat je hoeft te betalen voor advertenties.",
  },
  {
    icon: FileText,
    title: "Content & teksten",
    description:
      "Ik help je met duidelijke teksten die meteen uitleggen wat je doet. Daardoor snappen bezoekers sneller je aanbod en nemen ze eerder contact op.",
  },
  {
    icon: Server,
    title: "Betaalbare hosting",
    description:
      "Veel bedrijven betalen te veel voor hosting via een bureau of reseller. Ik help bij het opzetten van goedkope, betrouwbare hosting in eigen beheer.",
  },
  {
    icon: ArrowRightLeft,
    title: "Overdracht op maat",
    description:
      "Wil je het zelf beheren of bij je eigen partij neerleggen? Dan draag ik alles netjes over. Jij behoudt altijd de volledige controle.",
  },
];

const extraServices = [
  {
    icon: Server,
    title: "Hosting & infrastructuur",
    description:
      "Betaal je te veel voor hosting? Ik help bij het opzetten van betaalbare hosting en bij migraties van cloud naar eigen server of andersom. Geen onnodige kosten, gewoon de infrastructuur die bij je situatie past.",
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
      "AI inzetten op de plekken waar het echt iets oplevert. Van AI agents die zelfstandig taken uitvoeren tot MCP koppelingen die AI toegang geven tot eigen data en systemen.",
  },
  {
    icon: Lightbulb,
    title: "Advies & strategie",
    description:
      "Ik help bepalen wat automatiseren of AI oplevert, in welke volgorde en met welke middelen. Zodat er gebouwd wordt op basis van een concreet doel.",
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
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const DienstenPage = () => {
  usePageSeo({
    title: "Diensten: website, hosting, automatisering & AI | Webvakwerk",
    description:
      "Van website op maat en SEO tot hosting migraties, procesautomatisering en AI-integratie. Webvakwerk helpt ondernemers met alles rondom hun online aanwezigheid.",
    canonicalPath: "/diensten",
  });

  useBreadcrumbSchema([{ name: "Diensten", path: "/diensten" }]);

  return (
    <div className="min-h-screen bg-background font-body pb-20 md:pb-0">
      <Navbar />
      <main id="main-content" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Diensten</p>
            <h1 className="text-3xl md:text-4xl font-syne font-extrabold text-foreground mb-4">
              Alles wat je nodig hebt voor een sterke online aanwezigheid
            </h1>
            <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
              Van een professionele website tot slimme automatisering. Geen onnodige complexiteit, wel concrete resultaten.
            </p>
          </motion.div>

          {/* Web services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Webdevelopment</p>
            <h2 className="font-syne text-2xl font-extrabold text-foreground mb-6">
              Websites die klanten opleveren
            </h2>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
            style={{ perspective: "1000px" }}
          >
            {webServices.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative rounded-2xl p-6 bg-foreground/5 border border-foreground/10 hover:border-primary/30 hover:bg-foreground/10 transition-colors duration-300"
              >
                <motion.div
                  className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="text-lg font-syne font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{service.description}</p>
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.06) 45%, transparent 50%)" }}
                />
              </motion.div>
            ))}
          </div>

          {/* Extra services — dark background */}
          <div className="bg-foreground/95 rounded-3xl relative overflow-hidden px-8 py-12 mb-16">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/15 blur-[100px] pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, hsl(var(--background)) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Overige diensten</p>
                <h2 className="font-syne text-2xl font-extrabold text-background mb-2">
                  Hosting, automatisering & AI
                </h2>
                <p className="text-background/50 max-w-2xl">
                  Naast webdevelopment help ik je met infrastructuur, automatisering en slimme AI-toepassingen.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ perspective: "1000px" }}>
                {extraServices.map((service, i) => (
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
                    <h3 className="text-lg font-syne font-bold text-background mb-2">{service.title}</h3>
                    <p className="text-background/60 text-sm leading-relaxed">{service.description}</p>
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.06) 45%, transparent 50%)" }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-syne font-extrabold text-foreground mb-3">
              Wil je weten wat dit voor jou kan betekenen?
            </h2>
            <p className="text-foreground/60 mb-6 max-w-lg mx-auto">
              Neem vrijblijvend contact op en we kijken samen naar de mogelijkheden.
            </p>
            <Link
              to="/aanvraag"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all"
            >
              Neem contact op
              <ArrowRight className="w-4 h-4" />
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
