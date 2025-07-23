import React, { ReactNode, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from './navbar';
import HeroSection, { HeroProps } from './hero-section';
import FeaturesSection from './features-section';
import DashboardPreview from './dashboard-preview';
import CategoriesGrid, { CategoriesGridProps } from './categories-grid';
import TestimonialsSection from './testimonials-section';
import CtaSection from './cta-section';
import FooterTiny from './footer-tiny';

export interface LandingLayoutProps {
    pageTitle: string;
    metaDescription?: string;
    heroProps: HeroProps;
    categoriesGridProps: CategoriesGridProps;
    isTestimonialsVisible?: boolean;

}

export default function LandingLayout(
    {
        pageTitle,
        metaDescription,
        heroProps,
        categoriesGridProps,
        isTestimonialsVisible = true,
    }: LandingLayoutProps) {
    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Head tags for SEO */}
            <Helmet>
                <title>{pageTitle}</title>
                {metaDescription && <meta name="description" content={metaDescription} />}
            </Helmet>

            <Navbar />
            <main className="flex-grow">
                <HeroSection {...heroProps} />
                <FeaturesSection />
                <DashboardPreview />
                <CategoriesGrid {...categoriesGridProps}/>
                {isTestimonialsVisible && <TestimonialsSection />}
                <CtaSection />
            </main>
            <FooterTiny />
        </div>
    );
}
