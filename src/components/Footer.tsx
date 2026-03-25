import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground px-6 py-10">
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-syne text-lg font-bold text-background/90">
          Webvakwerk
        </p>
        <p className="mt-2 text-sm text-background/50">
          © {new Date().getFullYear()} Webvakwerk. Alle rechten voorbehouden.
        </p>
        <p className="mt-1 text-xs text-background/40">
          KvK: 42015984
        </p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Link to="/voorwaarden" className="text-sm text-background/50 transition-colors hover:text-primary">
            Voorwaarden
          </Link>
          <span className="text-background/20">|</span>
          <Link to="/privacy" className="text-sm text-background/50 transition-colors hover:text-primary">
            Privacybeleid
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
