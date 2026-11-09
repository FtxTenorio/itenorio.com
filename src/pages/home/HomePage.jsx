import { HeroSection } from "./sections/HeroSection";
import { FeaturedProductSection } from "./sections/FeaturedProductSection";
import { ServicesSection } from "./sections/ServicesSection";
import { FounderSection } from "./sections/FounderSection";
import { ContactSection } from "./sections/ContactSection";

// / — company home: who we are, the featured product, what we do,
// who is behind it and how to reach us.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProductSection />
      <ServicesSection />
      <FounderSection />
      <ContactSection />
    </>
  );
}
