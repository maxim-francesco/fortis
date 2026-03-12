import HeroSection from "@/components/home/HeroSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import FeaturedCars from "@/components/home/FeaturedCars";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

export default function Index() {
  return (
    <main>
      <HeroSection />
      <BenefitsSection />
      <FeaturedCars />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
