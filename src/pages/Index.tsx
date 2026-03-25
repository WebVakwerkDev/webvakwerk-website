import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Werkwijze from "@/components/Werkwijze";
import Diensten from "@/components/Diensten";
import Prijzen from "@/components/Prijzen";
import OverWebvakwerk from "@/components/OverWebvakwerk";
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
      <main id="main-content" className="relative overflow-hidden">
        {/* Decorative background orbs for visual flow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 top-[600px] h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-[100px]" />
          <div className="absolute -right-32 top-[1200px] h-[600px] w-[600px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -left-20 top-[2000px] h-[400px] w-[400px] rounded-full bg-primary/[0.05] blur-[80px]" />
        </div>
        <Hero />
        <Werkwijze />
        <Diensten />
        <Prijzen />
        <CTA />
        <OverWebvakwerk />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
