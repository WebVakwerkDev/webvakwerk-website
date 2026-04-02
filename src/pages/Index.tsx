import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Werkwijze from "@/components/Werkwijze";
import Diensten from "@/components/Diensten";
import Automatisering from "@/components/Automatisering";
import Prijzen from "@/components/Prijzen";
import OverWebvakwerk from "@/components/OverWebvakwerk";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { usePageSeo } from "@/hooks/use-page-seo";

const Index = () => {
  usePageSeo({
    title: "Webvakwerk | Websites op maat voor ondernemers",
    description:
      "Webvakwerk bouwt converterende websites op maat voor ondernemers. Van intake tot livegang: snel, duidelijk en professioneel uitgevoerd.",
    canonicalPath: "/",
  });

  return (
    <div className="min-h-screen bg-background font-body pb-20 md:pb-0">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Werkwijze />
        <Diensten />
        <Automatisering />
        <Prijzen />
        <FAQ />
        <CTA />
        <OverWebvakwerk />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Index;
