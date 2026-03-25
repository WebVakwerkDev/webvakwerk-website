import { motion } from "framer-motion";
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
    answer: "Zeker. Binnen het gekozen pakket heb je een aantal feedbackmomenten om aanpassingen door te voeren. Na oplevering kun je zelf verder of een vervolgtraject afspreken.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="w-full text-left rounded-2xl bg-card border border-foreground/[0.04] shadow-[0_4px_20px_-8px_hsl(var(--ink)/0.06)] p-5 sm:p-6 transition-shadow hover:shadow-[0_8px_24px_-8px_hsl(var(--ink)/0.1)]"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-syne text-base sm:text-lg font-bold text-foreground">{question}</h3>
        <ChevronDown className={`w-5 h-5 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </div>
      {open && (
        <p className="mt-3 text-base leading-relaxed text-foreground/70">{answer}</p>
      )}
    </button>
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
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
