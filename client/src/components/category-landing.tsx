import LandingLayout from "@/components/landing-layout";
import CategoriesGrid, { type Category as GridItem, type CategoriesGridProps } from "@/components/categories-grid";
import * as Lucide from "lucide-react";
import categories from "@/data/categories.json";
import locations from "@/data/locations.json";

type Subcategory = { slug: string; label: string; icon?: string; metaTitle?: string; metaDescription?: string; };
type Category = { slug: string; label: string; subtitle?: string; metaTitle?: string; metaDescription?: string; subcategories?: Subcategory[]; };
type Locations = { ccaa: {slug:string;name:string}[]; provincias: {slug:string;name:string}[]; ciudades: {slug:string;name:string}[]; };

const L = locations as Locations;

function getIconByName(name?: string) {
    const Cmp = name && (Lucide as Record<string, any>)[name];
    return (Cmp as React.ComponentType<any>) || Lucide.Box;
}

function prettyLocation(slug?: string): string | undefined {
    if (!slug) return undefined;
    const hit =
        L.provincias.find(p => p.slug === slug) ||
        L.ccaa.find(c => c.slug === slug) ||
        L.ciudades.find(c => c.slug === slug);
    return hit?.name;
}

export default function CategoryLanding({ slug, locationSlug }: { slug: string; locationSlug?: string }) {
    const all = categories as Category[];
    const category = all.find((c) => c.slug === slug);
    const locName = prettyLocation(locationSlug);

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
            />
        );
    }

    const baseTitle = `Alquiler de ${category.label}`;
    const pageTitle = locName ? `${baseTitle} en ${locName} | Appquilar` : `${baseTitle} | Appquilar`;
    const description =
        (locName
            ? `Alquiler de ${category.label.toLowerCase()} en ${locName}. Encuentra disponibilidad cerca de ti.`
            : category.metaDescription ?? category.subtitle ?? `Alquiler de ${category.label} cerca de ti.`);

    const subcats: GridItem[] = (category.subcategories ?? []).map((s) => ({
        name: s.label,
        icon: getIconByName(s.icon),
        description: s.metaDescription,
    }));

    const categoriesGridProps: CategoriesGridProps | undefined =
        subcats.length > 0 ? { categories: subcats } : undefined;

    return (
        <LandingLayout
            pageTitle={pageTitle}
            metaDescription={description}
            heroProps={{
                title: locName ? `${baseTitle} en ${locName}` : baseTitle,
                subtitle: description,
                eventTypes: []
            }}
            categoriesGridProps={categoriesGridProps}
        />
    );
}
