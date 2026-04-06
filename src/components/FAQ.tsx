import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Hoe snel is mijn website live?",
    answer: "Je gratis demo staat binnen 5 werkdagen online. Beslis je om verder te gaan? Dan is je website live binnen 2 weken na akkoord. Geen vage tijdlijnen, gewoon een concrete datum.",
  },
  {
    question: "Wat als de demo niet precies is wat ik zoek?",
    answer: "Geen probleem — je krijgt een extra feedbackronde gratis. De demo is er juist voor om te zien wat we voor je kunnen betekenen. Bevalt het na die extra ronde nog steeds niet? Dan betaal je niks en stop je ermee. Geen verplichtingen.",
  },
  {
    question: "Hoeveel aanpassingen kan ik doen?",
    answer: "Bij het Starter pakket heb je 3 revisierondes, bij Enterprise 5. Heb je daarna nog wijzigingen nodig? Die kun je bijboeken voor €149 per ronde (excl. btw).",
  },
  {
    question: "Kan ik mijn website zelf beheren na oplevering?",
    answer: "Ja. Als je het liever zelf beheert of bij je eigen partij neerlegt, dragen we alles netjes over. Zo zit je nergens aan vast en houd je zelf de regie over je website.",
  },
  {
    question: "Wat kost een website laten maken bij Webvakwerk?",
    answer: "Het Starter pakket begint vanaf €499 eenmalig, het Enterprise pakket vanaf €899. Beide zijn exclusief 21% btw. Voor grotere projecten, koppelingen of maatwerk vragen we een prijs op aanvraag. Je betaalt sowieso pas nadat je de gratis demo hebt gezien en besluit verder te gaan.",
  },
  {
    question: "Kan ik ook hulp krijgen bij hosting?",
    answer: "Ja. We helpen je bij het opzetten van betaalbare, betrouwbare hosting in eigen beheer — of bij het migreren van je huidige omgeving. Geen onnodige marges via een bureau, gewoon hosting die past bij wat jij nodig hebt.",
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => setOpen(!open)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.01 }}
      className="w-full text-left rounded-2xl bg-card border border-foreground/[0.04] shadow-[0_4px_20px_-8px_hsl(var(--ink)/0.06)] p-5 sm:p-6 transition-shadow hover:shadow-[0_8px_24px_-8px_hsl(var(--ink)/0.1)]"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-syne text-base sm:text-lg font-bold text-foreground">{question}</h3>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-base leading-relaxed text-foreground/70">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

const FAQ = () => {
  return (
    <section id="faq" className="scroll-mt-28 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Veelgestelde vragen</p>
          <h2 className="text-3xl md:text-4xl font-syne font-extrabold text-foreground">
            Nog vragen?
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
