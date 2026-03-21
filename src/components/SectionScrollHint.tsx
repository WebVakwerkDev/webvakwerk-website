import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type SectionScrollHintProps = {
  targetId: string;
};

const NAV_OFFSET = 96;

const SectionScrollHint = ({ targetId }: SectionScrollHintProps) => {
  function handleScroll() {
    const target = document.getElementById(targetId);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 0.35 }}
      className="flex justify-center px-6 py-2"
    >
      <button
        type="button"
        onClick={handleScroll}
        className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        aria-label="Scroll naar volgende sectie"
      >
        Scroll
        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </motion.div>
  );
};

export default SectionScrollHint;
