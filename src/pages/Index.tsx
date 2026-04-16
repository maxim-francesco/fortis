import HeroSection from "@/components/home/HeroSection";

import BenefitsSection from "@/components/home/BenefitsSection";
import FeaturedCars from "@/components/home/FeaturedCars";
import HowItWorks from "@/components/home/HowItWorks";
import LocationSection from "@/components/home/LocationSection";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

import { SEO } from "@/components/SEO";
import { getAutoDealerSchema, getWebsiteSchema, getOrganizationSchema } from "@/lib/seo/schemas";

export default function Index() {
  return (
    <main>
      <SEO 
        title="MEDFIL Automobile - Mașini Second-Hand Verificate în Cluj-Napoca"
        description="Parc auto MEDFIL Cluj-Napoca: peste 40 de mașini verificate tehnic, finanțare flexibilă TBI Bank, buy-back și comenzi personalizate. Str. Oașului 134a."
        canonical="https://medfil.ro/"
        ogImage="/og-home.jpg"
        structuredData={[getAutoDealerSchema(), getWebsiteSchema(), getOrganizationSchema()]}
      />
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
