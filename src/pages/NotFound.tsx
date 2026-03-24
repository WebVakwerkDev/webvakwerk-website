import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { usePageSeo } from "@/hooks/use-page-seo";

const NotFound = () => {
  const location = useLocation();

  usePageSeo({
    title: "Pagina niet gevonden | Webvakwerk",
    description: "De opgevraagde pagina bestaat niet of is verplaatst.",
    canonicalPath: location.pathname,
    robots: "noindex,nofollow",
  });

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Deze pagina bestaat niet of is verplaatst.</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          Terug naar home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
