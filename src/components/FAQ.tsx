import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Hoe lang duurt het om een website te laten maken?",
    answer: "We mikken op oplevering binnen enkele weken. De doorlooptijd hangt af van beschikbaarheid en het gekozen pakket. Het traject begint met een gratis demo, pas daarna start de betaalde fase.",
  },
  {
    question: "Wat als de demo niet precies is wat ik zoek?",
    answer: "De demo is bedoeld om te laten zien wat wij kunnen betekenen op het gebied van webdesign. Als je interesse hebt maar de demo niet helemaal aansluit bij je wensen, is dat geen probleem. Alle verbeterpunten en veranderingen bespreken we samen en worden doorgevoerd in het uiteindelijke ontwerp.",
  },
  {
    question: "Kan ik mijn website zelf beheren na oplevering?",
    answer: "Ja. Als je het liever zelf beheert of bij je eigen partij neerlegt, dragen we alles netjes over. Zo zit je nergens aan vast en houd je zelf de regie over je website.",
  },
  {
    question: "Kan ik later nog dingen aanpassen?",
    answer: "Zeker. Binnen het gekozen pakket heb je een aantal feedbackmomenten om aanpassingen door te voeren. Heb je daarna nog wijzigingen? Dan kun je extra iteratiemomenten bijboeken voor €149 per keer (excl. btw). Zo houd je de regie over je website, ook na oplevering.",
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
