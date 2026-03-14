import { motion } from "framer-motion";
import { Shield, Zap, Settings } from "lucide-react";

const hostingPlans = [
  {
    icon: Shield,
    name: "Basis hosting",
    price: "€15",
    period: "/maand",
    description: "SSL-certificaat + dagelijkse backup. Alles wat je nodig hebt.",
    accent: false,
  },
  {
    icon: Zap,
    name: "Pro hosting",
    price: "€25",
    period: "/maand",
    description: "SSL + backup + prioriteit support. Voor als je extra zekerheid wilt.",
    accent: true,
  },
  {
    icon: Settings,
    name: "Eigen hosting",
    price: "Jij regelt het",
    period: "",
    description: "Voor wie al een hosting provider of IT-er heeft. We dragen alles netjes over.",
    accent: false,
  },
];

const Hosting = () => {
  return (
    <section id="hosting" className="py-24 px-6 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-syne font-extrabold mb-4">
            Wij regelen de hosting — jij hoeft nergens naar om te kijken
          </h2>
          <p className="text-background/60 max-w-2xl mx-auto text-lg mb-16">
            Je website moet ergens op het internet staan. Dat noemen we hosting.
            Wij regelen dat volledig voor je — of je draagt het over aan je eigen partij.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {hostingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-xl p-6 border ${
                plan.accent
                  ? "border-amber-400/60 bg-background/10"
                  : "border-background/10 bg-background/5"
              }`}
            >
              <plan.icon className={`w-6 h-6 mb-4 ${plan.accent ? "text-amber-400" : "text-primary"}`} />
              <h3 className="text-lg font-syne font-bold mb-1">{plan.name}</h3>
              <div className="mb-3">
                <span className="text-2xl font-syne font-extrabold">{plan.price}</span>
                {plan.period && (
                  <span className="text-background/50 text-sm">{plan.period}</span>
                )}
              </div>
              <p className="text-background/60 text-sm leading-relaxed">
                {plan.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hosting;
