import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Werkwijze from "@/components/Werkwijze";
import Diensten from "@/components/Diensten";
import Prijzen from "@/components/Prijzen";
import OverWebvakwerk from "@/components/OverWebvakwerk";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SectionScrollHint from "@/components/SectionScrollHint";
import { usePageSeo } from "@/hooks/use-page-seo";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat kost een website bij Webvakwerk?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een Starter-website kost €499 (excl. btw) en bevat tot 3 pagina's met SEO-basis. Het Enterprise-pakket kost €899 (excl. btw) en biedt tot 5 pagina's met premium design, animaties en uitgebreide SEO. Voor grotere trajecten maken we een offerte op maat.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe lang duurt het om een website te laten maken?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We mikken op oplevering binnen enkele weken. De doorlooptijd hangt af van beschikbaarheid en het gekozen pakket. Het traject begint met een gratis demo, pas daarna start de betaalde fase.",
      },
    },
    {
      "@type": "Question",
      name: "Is de demo-aanvraag echt gratis en vrijblijvend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, de demo is volledig gratis en vrijblijvend. Pas als we samen besluiten om een opdracht te starten, betaal je iets. Je zit na het invullen van het formulier nergens aan vast.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik mijn website zelf beheren na oplevering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Als je het liever zelf beheert of bij je eigen partij neerlegt, dragen we alles netjes over. Zo zit je nergens aan vast en houd je zelf de regie over je website.",
      },
    },
  ],
};

const FAQ_SCRIPT_ID = "faq-jsonld";

const Index = () => {
  usePageSeo({
    title: "Webvakwerk | Websites op maat voor ondernemers",
    description:
      "Webvakwerk bouwt converterende websites op maat voor ondernemers. Van intake tot livegang: snel, duidelijk en professioneel uitgevoerd.",
    canonicalPath: "/",
  });

  useEffect(() => {
    if (!document.getElementById(FAQ_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = FAQ_SCRIPT_ID;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(faqJsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(FAQ_SCRIPT_ID)?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Werkwijze />
        <SectionScrollHint targetId="diensten" />
        <Diensten />
        <SectionScrollHint targetId="prijzen" />
        <Prijzen />
        <CTA />
        <OverWebvakwerk />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
