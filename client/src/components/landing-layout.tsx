import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "./navbar";
import HeroSection, { HeroProps } from "./hero-section";
import FeaturesSection from "./features-section";
import DashboardPreview from "./dashboard-preview";
import CategoriesGrid, { CategoriesGridProps } from "./categories-grid";
// Testimonials eliminado
import CtaSection from "./cta-section";
import FAQSection from "@/components/faq-section.tsx";
import faqItems from "@/data/faqItems.json";
import Footer from "@/components/footer.tsx";

export interface LandingLayoutProps {
    pageTitle: string;
    metaDescription?: string;
    heroProps: HeroProps;
    categoriesGridProps?: CategoriesGridProps;
}

export default function LandingLayout({
                                          pageTitle,
                                          metaDescription,
                                          heroProps,
                                          categoriesGridProps,
                                      }: LandingLayoutProps) {
    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    return (
        <div className="min-h-screen flex flex-col">
            <Helmet>
                <title>{pageTitle}</title>
                {metaDescription ? (
                    <meta name="description" content={metaDescription} />
                ) : null}
            </Helmet>

            <Navbar />

            <main className="flex-grow">
                <HeroSection {...heroProps} />
                <FeaturesSection />
                <DashboardPreview />
                {categoriesGridProps && <CategoriesGrid {...categoriesGridProps} />}
                <FAQSection items={faqItems} />
                <CtaSection />
            </main>

            <Footer />
        </div>
    );
}
