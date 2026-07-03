import { HeroSection } from "@/components/vathala/hero-section";
import { HeroTrustHighlights } from "@/components/vathala/hero-trust-highlights";
import { MainNavigation } from "@/components/vathala/main-navigation";
import { OurApproachSection } from "@/components/vathala/our-approach-section";
import { HowItWorksSection } from "@/components/vathala/how-it-works-section";
import { ServicesGridSection } from "@/components/vathala/services-grid-section";
import { FloatingBottomCtas } from "@/components/vathala/floating-bottom-ctas";
import { CallbackModalProvider } from "@/components/vathala/callback-modal-context";
import { StoriesQuoteSection } from "@/components/vathala/stories-quote-section";
import { FaqSection } from "@/components/vathala/faq-section";
import { HomeCtaSection } from "@/components/vathala/home-cta-section";
import { AppDownloadSection } from "@/components/vathala/app-download-section";
import { SiteFooter } from "@/components/vathala/site-footer";
import { BlogFallbackRedirect } from "@/components/vathala/blog-fallback-redirect";

export default function Home() {
  return (
    <>
      <BlogFallbackRedirect />
      <CallbackModalProvider>
        <MainNavigation />
        <main className="pb-[calc(9rem+env(safe-area-inset-bottom))] sm:pb-36">
          <HeroSection />
          <HeroTrustHighlights />
          <ServicesGridSection />
          <OurApproachSection />
          <HowItWorksSection />
          <StoriesQuoteSection />
          <HomeCtaSection />
          <AppDownloadSection />
          <FaqSection />
        </main>
        <FloatingBottomCtas />
        <SiteFooter />
      </CallbackModalProvider>
    </>
  );
}
