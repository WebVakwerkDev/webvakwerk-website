import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Werkwijze from "@/components/Werkwijze";
import Diensten from "@/components/Diensten";
import Prijzen from "@/components/Prijzen";
import Hosting from "@/components/Hosting";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <Hero />
      <Diensten />
      <Werkwijze />
      <Prijzen />
      <Hosting />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
