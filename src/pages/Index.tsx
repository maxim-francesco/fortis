import HeroSection from "@/components/home/HeroSection";
import { Helmet } from "react-helmet-async";
import BenefitsSection from "@/components/home/BenefitsSection";
import FeaturedCars from "@/components/home/FeaturedCars";
import HowItWorks from "@/components/home/HowItWorks";
import LocationSection from "@/components/home/LocationSection";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

export default function Index() {
  return (
    <main>
      <Helmet>
        <title>Parc Auto Rulate Cluj | Garanție 12 luni | MEDFIL Automobile</title>
        <meta name="description" content="Parc auto MEDFIL în Cluj-Napoca, cartier Iris. Mașini rulate verificate cu istoric clar, garanție 12 luni motor+cutie, finanțare TBI Bank și servicii buy-back." />
        <link rel="canonical" href="https://medfil.ro/" />
      </Helmet>
      <HeroSection />
      <BenefitsSection />
      <FeaturedCars />
      <HowItWorks />
      <LocationSection />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
