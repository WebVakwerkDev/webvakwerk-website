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
      className="flex justify-center px-6 py-3"
    >
      <button
        type="button"
        onClick={handleScroll}
        className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Scroll naar volgende sectie"
      >
        <span className="h-px w-12 bg-border transition-colors group-hover:bg-foreground/70" aria-hidden="true" />
        Scroll
        <ChevronDown className="h-3.5 w-3.5 animate-bounce text-foreground/70" aria-hidden="true" />
      </button>
    </motion.div>
  );
};

export default SectionScrollHint;
