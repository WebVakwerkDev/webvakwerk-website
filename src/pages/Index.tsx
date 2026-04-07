import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Werkwijze from "@/components/Werkwijze";
import Diensten from "@/components/Diensten";
import Prijzen from "@/components/Prijzen";
import OverWebvakwerk from "@/components/OverWebvakwerk";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { usePageSeo } from "@/hooks/use-page-seo";

const Index = () => {
  usePageSeo({
    title: "Website laten maken op maat | Webvakwerk",
    description:
      "Webvakwerk bouwt websites die klanten opleveren. Gratis demo in 5 dagen, live in 3 weken. Vindbaar in 3 Weken vanaf €499, De Klantenmagneet vanaf €899. Niet tevreden? Dan betaal je niks.",
    canonicalPath: "/",
  });

  return (
    <div className="min-h-screen bg-background font-body pb-20 md:pb-0">
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
      <MobileNav />
    </div>
  );
};

export default Index;
