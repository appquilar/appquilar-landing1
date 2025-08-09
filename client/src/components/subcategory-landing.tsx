// client/src/components/subcategory-landing.tsx
import LandingLayout from "@/components/landing-layout";
import categories from "@/data/categories.json";

type Subcategory = {
    slug: string;
    label: string;
    metaTitle?: string;
    metaDescription?: string;
    subtitle?: string;
};

type Category = {
    slug: string;
    label: string;
    subtitle?: string;
    metaTitle?: string;
    metaDescription?: string;
    subcategories?: Subcategory[];
};

export default function SubcategoryLanding(props: { categorySlug: string; subcategorySlug: string }) {
    const all = categories as Category[];
    const category = all.find((c) => c.slug === props.categorySlug);
    const subcategory = category?.subcategories?.find((s) => s.slug === props.subcategorySlug);

    if (!category || !subcategory) {
        return (
            <LandingLayout
                pageTitle="Página no encontrada | Appquilar"
                metaDescription="La página que buscas no existe."
                heroProps={{
                    title: "No encontramos esa página",
                    subtitle: "Vuelve al inicio para ver todas las categorías disponibles.",
                    eventTypes: ["para tu evento", "para la playa", "para tu acampada"],
                }}
            />
        );
    }

    const pageTitle =
        subcategory.metaTitle ??
        `Alquiler de ${subcategory.label} | ${category.label} | Appquilar`;
    const description =
        subcategory.metaDescription ??
        `Alquiler de ${subcategory.label.toLowerCase()} en ${category.label}. Encuentra disponibilidad cerca de ti.`;

    return (
        <LandingLayout
            pageTitle={pageTitle}
            metaDescription={description}
            heroProps={{
                title: `${subcategory.subtitle ?? ('Alquiler de ' +  subcategory.label)}`,
                subtitle: description,
                eventTypes: [],
            }}
        />
    );
}
