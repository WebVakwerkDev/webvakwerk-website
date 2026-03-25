import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-28 px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-[1.75rem] border border-foreground/8 bg-card p-8 shadow-sm sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Contact</p>
          <h2 className="mt-3 font-syne text-3xl font-extrabold text-foreground sm:text-4xl">
            Neem contact op
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Heb je een vraag, wil je meer weten over onze werkwijze of ben je benieuwd wat we voor
            jou kunnen betekenen? Neem gerust contact met ons op. We reageren zo snel mogelijk.
          </p>
          <motion.a
            href="mailto:info@webvakwerk.nl"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground text-sm transition-colors hover:opacity-90"
          >
            <Mail className="h-5 w-5" />
            info@webvakwerk.nl
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
