import { motion } from "framer-motion";

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
      <motion.button
        type="button"
        onClick={handleScroll}
        className="group flex flex-col items-center gap-1.5 cursor-pointer"
        aria-label="Scroll naar volgende sectie"
        whileHover={{ y: 1 }}
      >
        <span className="text-xs font-medium text-muted-foreground/60 tracking-widest uppercase group-hover:text-muted-foreground transition-colors">
          scroll
        </span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-muted-foreground/40 to-transparent"
          aria-hidden="true"
        />
      </motion.button>
    </motion.div>
  );
};

export default SectionScrollHint;
