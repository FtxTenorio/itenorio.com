import { useEffect } from "react";
import { HeroSection } from "./sections/HeroSection";
import { FeaturedProductSection } from "./sections/FeaturedProductSection";
import { ServicesSection } from "./sections/ServicesSection";
import { FounderSection } from "./sections/FounderSection";
import { ContactSection } from "./sections/ContactSection";
import { useSectionPaging } from "./useSectionPaging";

// / — company home: who we are, the featured product, what we do,
// who is behind it and how to reach us. On large screens every section fills
// the screen (html.home-snap in index.css) and one scroll gesture moves one
// section (useSectionPaging), so the reader never stops halfway between two.
export default function HomePage() {
  useSectionPaging();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("home-snap");
    return () => root.classList.remove("home-snap");
  }, []);

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
