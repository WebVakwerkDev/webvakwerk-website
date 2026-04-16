import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-foreground px-6 pt-14 pb-8 rounded-t-[3rem]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 pb-10 border-b border-background/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-xl font-extrabold tracking-tighter text-background font-syne">
                Webvakwerk
              </span>
              <span className="text-xl font-extrabold text-primary font-syne">.</span>
            </div>
            <p className="text-sm text-background/50 leading-relaxed max-w-xs">
              Websites op maat voor ondernemers die online gevonden willen worden. Regio Noord-Brabant.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm font-bold text-background/70 mb-4 uppercase tracking-widest">Pagina's</p>
            <ul className="space-y-2">
              {[
                { label: "Werkwijze", to: "/werkwijze" },
                { label: "Diensten", to: "/diensten" },
                { label: "Hosting & AI", to: "/diensten" },
                { label: "Pakketten", to: "/prijzen" },
                { label: "Demo aanvragen", to: "/aanvraag" },
              ].map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.to}
                    className="text-sm text-background/50 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-bold text-background/70 mb-4 uppercase tracking-widest">Contact</p>
            <a
              href="mailto:info@webvakwerk.nl"
              className="inline-flex items-center gap-2 text-sm text-background/50 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@webvakwerk.nl
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto my-6 w-full max-w-sm h-px bg-background/10" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Webvakwerk. KvK: 42015984. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/voorwaarden" className="text-xs text-background/40 transition-colors hover:text-primary">
              Voorwaarden
            </Link>
            <Link to="/privacy" className="text-xs text-background/40 transition-colors hover:text-primary">
              Privacybeleid
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
