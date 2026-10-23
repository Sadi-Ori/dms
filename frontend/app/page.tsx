import { fetchAppeals, fetchFAQs } from "@/lib/api";
import { HeroSlider } from "@/components/HeroSlider";
import { UrgentAppeals } from "@/components/UrgentAppeals";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { PromiseSection } from "@/components/PromiseSection";
import { LegacyStorySection } from "@/components/LegacyStorySection";
import { GetInvolvedGrid } from "@/components/GetInvolvedGrid";
import { FaqSection } from "@/components/FaqSection";

export const revalidate = 60;

export default async function HomePage() {
  const appeals = await fetchAppeals();
  const faqs = await fetchFAQs();

  return (
    <div>
      {/* 1. Hero Section & Quick Donate Box */}
      <HeroSlider appeals={appeals} />

      {/* 2. Urgent Appeals Section */}
      <UrgentAppeals appeals={appeals} />

      {/* 3. Featured Impact Programs */}
      <FeaturedProjects />

      {/* 4. 100% Policy Promise */}
      <PromiseSection />

      {/* 5. Founder Legacy & Video Story */}
      <LegacyStorySection />

      {/* 6. Get Involved Action Grid */}
      <GetInvolvedGrid />

      {/* 7. Frequently Asked Questions */}
      <FaqSection faqs={faqs} />
    </div>
  );
}
