import { useEffect } from "react";

type BreadcrumbItem = {
  name: string;
  path: string;
};

const BREADCRUMB_SCRIPT_ID = "breadcrumb-jsonld";

export function useBreadcrumbSchema(items: BreadcrumbItem[]) {
  useEffect(() => {
    const origin = "https://webvakwerk.nl";
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
        ...items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: item.name,
          item: `${origin}${item.path}`,
        })),
      ],
    };

    let script = document.getElementById(BREADCRUMB_SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = BREADCRUMB_SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById(BREADCRUMB_SCRIPT_ID)?.remove();
    };
  }, [items]);
}
