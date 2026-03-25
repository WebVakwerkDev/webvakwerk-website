import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground px-6 pt-14 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 pb-10 border-b border-background/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-extrabold tracking-tighter text-background font-syne">
                Webvakwerk
              </span>
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <p className="text-sm text-background/50 leading-relaxed max-w-xs">
              Websites op maat voor ondernemers die online gevonden willen worden.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm font-bold text-background/70 mb-4">Pagina's</p>
            <ul className="space-y-2">
              <li>
                <Link to="/#werkwijze" className="text-sm text-background/50 hover:text-primary transition-colors">
                  Werkwijze
                </Link>
              </li>
              <li>
                <Link to="/#diensten" className="text-sm text-background/50 hover:text-primary transition-colors">
                  Diensten
                </Link>
              </li>
              <li>
                <Link to="/#prijzen" className="text-sm text-background/50 hover:text-primary transition-colors">
                  Pakketten
                </Link>
              </li>
              <li>
                <Link to="/aanvraag" className="text-sm text-background/50 hover:text-primary transition-colors">
                  Demo aanvragen
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-bold text-background/70 mb-4">Contact</p>
            <a
              href="mailto:info@webvakwerk.nl"
              className="inline-flex items-center gap-2 text-sm text-background/50 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@webvakwerk.nl
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
