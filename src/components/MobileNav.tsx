import { motion } from "framer-motion";
import { Compass, Layers, CreditCard, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  { icon: Compass, label: "Werkwijze", href: "/werkwijze" },
  { icon: Layers, label: "Diensten", href: "/diensten" },
  { icon: CreditCard, label: "Prijzen", href: "/prijzen" },
  { icon: Mail, label: "Contact", href: "/aanvraag" },
];

const MobileNav = () => {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 25 }}
      className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-background/90 backdrop-blur-xl z-50 rounded-t-[2rem] border-t border-foreground/5 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]"
    >
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          className="flex flex-col items-center justify-center text-foreground/50 hover:text-primary transition-colors"
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1">{item.label}</span>
        </Link>
      ))}
    </motion.nav>
  );
};

export default MobileNav;
