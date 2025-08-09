// client/src/components/category-landing.tsx
import LandingLayout from "@/components/landing-layout";
import { type Category as GridItem, type CategoriesGridProps } from "@/components/categories-grid";
import * as Lucide from "lucide-react";
import categories from "@/data/categories.json";

type Subcategory = {
    slug: string;
    label: string;
    icon?: string;
    metaTitle?: string;
    metaDescription?: string;
};

type Category = {
    slug: string;
    label: string;
    subtitle?: string;
    metaTitle?: string;
    metaDescription?: string;
    subcategories?: Subcategory[];
};

function getIconByName(name?: string) {
    const Cmp = name && (Lucide as Record<string, any>)[name];
    return (Cmp as React.ComponentType<any>) || Lucide.Box;
}

export default function CategoryLanding({ slug }: { slug: string }) {
    const all = categories as Category[];
    const category = all.find((c) => c.slug === slug);

    if (!category) {
        return (
            <LandingLayout
                pageTitle="Página no encontrada | Appquilar"
                metaDescription="La página que buscas no existe."
                heroProps={{
                    title: "No encontramos esa categoría",
                    subtitle: "Vuelve al inicio para ver todas las categorías disponibles.",
                    eventTypes: ["para tu evento", "para la playa", "para tu acampada"],
                }}
                // No pasamos grid
            />
        );
    }

    const pageTitle =
        category.metaTitle ?? `${category.metaTitle} | Appquilar`;
    const description =
        category.metaDescription ?? category.subtitle ?? `Alquiler de ${category.label} cerca de ti.`;

    // Mapear subcategorías al shape EXACTO que espera CategoriesGrid
    const subcats: GridItem[] = (category.subcategories ?? []).map((s) => ({
        name: s.label,
        icon: getIconByName(s.icon),
        description: s.metaDescription,
    }));

    // Construimos la prop específica del layout
    const categoriesGridProps: CategoriesGridProps | undefined =
        subcats.length > 0 ? { categories: subcats } : undefined;

    return (
        <LandingLayout
            pageTitle={pageTitle}
            metaDescription={description}
            heroProps={{
                title: `${category.subtitle}`,
                subtitle: description,
                eventTypes: []
            }}
            categoriesGridProps={categoriesGridProps} // <-- AQUÍ va el grid por la propiedad del Layout
        />
    );
}
