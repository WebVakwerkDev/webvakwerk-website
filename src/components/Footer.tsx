import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background px-6 py-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Webvakwerk. Alle rechten voorbehouden.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          KvK: 42015984
        </p>
        <div className="mt-3 flex items-center justify-center gap-4">
          <Link to="/voorwaarden" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Voorwaarden
          </Link>
          <span className="text-muted-foreground/40">|</span>
          <Link to="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Privacybeleid
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
