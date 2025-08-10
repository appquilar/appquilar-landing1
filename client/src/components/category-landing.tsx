import LandingLayout from "@/components/landing-layout";
import {type CategoriesGridProps, type Category as GridItem} from "@/components/categories-grid";
import * as Lucide from "lucide-react";
import categories from "@/data/categories.json";
import React from "react";
import {prettyLocation} from "@/utils/pretty-location.tsx";

type Subcategory = { slug: string; label: string; icon?: string; metaTitle?: string; metaDescription?: string; preposition?: "de"|"para" };
type Category = { slug: string; label: string; subtitle?: string; metaTitle?: string; metaDescription?: string; preposition?: "de"|"para"; subcategories?: Subcategory[] };

function getIconByName(name?: string) {
    const Cmp = name && (Lucide as Record<string, any>)[name];
    return (Cmp as React.ComponentType<any>) || Lucide.Box;
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

    const pref = category.preposition ?? "de";
    const baseTitle = `Alquiler ${pref} ${category.label}`;
    const pageTitle = locName ? `${baseTitle} en ${locName} | Appquilar` : `${baseTitle} | Appquilar`;
    const description =
        (locName
            ? `Alquiler ${pref} ${category.label.toLowerCase()} en ${locName}. Encuentra disponibilidad cerca de ti.`
            : category.metaDescription ?? category.subtitle ?? `Alquiler ${pref} ${category.label.toLowerCase()} cerca de ti.`);

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
                eventTypes: [],
            }}
            categoriesGridProps={categoriesGridProps}
        />
    );
}
