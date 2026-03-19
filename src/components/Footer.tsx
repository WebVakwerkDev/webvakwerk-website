import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background px-6 py-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm text-muted-foreground">
          © {year} Webvakwerk - duidelijke websites voor ondernemers.
        </p>
        <div className="mt-3">
          <Link to="/voorwaarden" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Voorwaarden
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
