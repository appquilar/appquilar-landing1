import LandingLayout from "@/components/landing-layout";
import categories from "@/data/categories.json";
import {prettyLocation} from "@/utils/pretty-location.tsx";

type Subcategory = { slug: string; label: string; metaTitle?: string; metaDescription?: string; preposition?: "de"|"para" };
type Category = { slug: string; label: string; preposition?: "de"|"para"; metaTitle?: string; metaDescription?: string; subcategories?: Subcategory[] };

export default function SubcategoryLanding(props: { categorySlug: string; subcategorySlug: string; locationSlug?: string }) {
    const all = categories as Category[];
    const category = all.find((c) => c.slug === props.categorySlug);
    const subcategory = category?.subcategories?.find((s) => s.slug === props.subcategorySlug);
    const locName = prettyLocation(props.locationSlug);

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

    const pref = subcategory.preposition ?? "de";
    const baseTitle = `Alquiler ${pref} ${subcategory.label}`;
    const pageTitle = locName
        ? `${baseTitle} en ${locName} | ${category.label} | Appquilar`
        : `${baseTitle} | ${category.label} | Appquilar`;

    const description = locName
        ? `Alquiler ${pref} ${subcategory.label.toLowerCase()} en ${locName}. Disponibilidad y entrega cerca de ti.`
        : subcategory.metaDescription ?? `Alquiler ${pref} ${subcategory.label} en ${category.label}.`;

    return (
        <LandingLayout
            pageTitle={pageTitle}
            metaDescription={description}
            heroProps={{
                title: locName ? `${baseTitle} en ${locName}` : baseTitle,
                subtitle: description,
                eventTypes: [],
            }}
        />
    );
}
