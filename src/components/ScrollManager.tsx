import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAVBAR_OFFSET = 96;

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    let frame = 0;

    frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        const sectionId = decodeURIComponent(location.hash.replace("#", ""));
        const target = document.getElementById(sectionId);

        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
          return;
        }
      }

      window.scrollTo({ top: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollManager;
