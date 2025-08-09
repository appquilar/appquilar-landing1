// client/src/pages/home.tsx
import LandingLayout, { type LandingLayoutProps } from "@/components/landing-layout";
import categories from "@/data/categories.json";

type Category = {
    label: string;
    slug: string;
    subtitle?: string;
};

const categoriesFromJson = categories as Category[];

function buildCategoriesGridProps() {
    return {
        title: "Explora por categorías",
        items: categoriesFromJson.map((c) => ({
            label: c.label,
            href: `/alquiler-para-${c.slug}`, // <-- nueva ruta SEO
            subtitle: c.subtitle ?? "",
        })),
    };
}

export default function Home() {
    const props: LandingLayoutProps = {
        pageTitle: "Appquilar — Alquila lo que necesites, cuando lo necesites",
        metaDescription:
            "Encuentra y alquila artículos de forma fácil. Herramientas, camping, eventos y más en tu ciudad.",
        heroProps: {
            title: "Alquila lo que necesites, cuando lo necesites",
            subtitle: "Herramientas, camping, fiestas y más. Sin comprar, sin complicarte.",
            eventTypes: []
        },
        categoriesGridProps: {
            categories: buildCategoriesGridProps(),
        },
    };

    return <LandingLayout {...props} />;
}
