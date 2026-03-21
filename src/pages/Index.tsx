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

const Index = () => {
  usePageSeo({
    title: "Webvakwerk | Websites op maat voor ondernemers",
    description:
      "Webvakwerk bouwt converterende websites op maat voor ondernemers. Van intake tot livegang: snel, duidelijk en professioneel uitgevoerd.",
    canonicalPath: "/",
  });

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main id="main-content">
        <Hero />
        <SectionScrollHint targetId="werkwijze" />
        <Werkwijze />
        <SectionScrollHint targetId="diensten" />
        <Diensten />
        <SectionScrollHint targetId="prijzen" />
        <Prijzen />
        <SectionScrollHint targetId="over" />
        <OverWebvakwerk />
        <SectionScrollHint targetId="contact" />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
