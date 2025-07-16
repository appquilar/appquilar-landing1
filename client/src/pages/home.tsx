import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import DashboardPreview from "@/components/dashboard-preview";
import TestimonialsSection from "@/components/testimonials-section";

import CtaSection from "@/components/cta-section";
import RegistrationModals from "@/components/registration-modals";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <DashboardPreview />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
      <RegistrationModals />
    </div>
  );
}
