import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = ["Werkwijze", "Diensten", "Prijzen", "Contact"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav aria-label="Hoofdnavigatie" className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-foreground/5">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Ga naar inhoud
      </a>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tighter text-foreground font-syne">
            Webvakwerk
          </span>
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-foreground font-medium">
          {navLinks.map((item) => (
            <Link
              key={item}
              to={`/#${item.toLowerCase()}`}
              className="hover:text-primary transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="hidden sm:block"
        >
          <Link
            to="/aanvraag"
            className="block px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm transition-colors hover:opacity-90"
          >
            Gratis demo aanvragen
          </Link>
        </motion.div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-foreground/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item}
                  to={`/#${item.toLowerCase()}`}
                  className="text-foreground font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Link
                to="/aanvraag"
                className="mt-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm text-center"
                onClick={() => setMobileOpen(false)}
              >
                Gratis demo aanvragen
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
