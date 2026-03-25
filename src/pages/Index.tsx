import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Werkwijze from "@/components/Werkwijze";
import Diensten from "@/components/Diensten";
import Prijzen from "@/components/Prijzen";
import OverWebvakwerk from "@/components/OverWebvakwerk";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
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
        <Werkwijze />
        <Diensten />
        <Prijzen />
        <FAQ />
        <CTA />
        <OverWebvakwerk />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
