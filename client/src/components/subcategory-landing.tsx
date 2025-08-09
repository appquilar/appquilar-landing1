import LandingLayout from "@/components/landing-layout";
import categories from "@/data/categories.json";
import locations from "@/data/locations.json";

type Subcategory = { slug: string; label: string; metaTitle?: string; metaDescription?: string; };
type Category = { slug: string; label: string; metaTitle?: string; metaDescription?: string; subcategories?: Subcategory[]; };
type Locations = { ccaa: {slug:string;name:string}[]; provincias: {slug:string;name:string}[]; ciudades: {slug:string;name:string}[]; };

const L = locations as Locations;

function prettyLocation(slug?: string): string | undefined {
    if (!slug) return undefined;
    const hit =
        L.provincias.find(p => p.slug === slug) ||
        L.ccaa.find(c => c.slug === slug) ||
        L.ciudades.find(c => c.slug === slug);
    return hit?.name;
}

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

    const baseTitle = `Alquiler de ${subcategory.label}`;
    const pageTitle = locName
        ? `${baseTitle} en ${locName} | ${category.label} | Appquilar`
        : `${baseTitle} | ${category.label} | Appquilar`;

    const description = locName
        ? `Alquiler de ${subcategory.label.toLowerCase()} en ${locName}. Disponibilidad y entrega cerca de ti.`
        : subcategory.metaDescription ?? `Alquiler de ${subcategory.label} en ${category.label}.`;

    return (
        <LandingLayout
            pageTitle={pageTitle}
            metaDescription={description}
            heroProps={{
                title: locName ? `${baseTitle} en ${locName}` : baseTitle,
                subtitle: description,
                eventTypes: [],
            }}
            // NO pasamos grid aquí (subcategoría)
        />
    );
}
