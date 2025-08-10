import {InstagramIcon, Mail, Map, Phone} from "lucide-react";
import iconLogo from "@assets/pelota-blanco.png";
import textLogo from "@assets/logo-blanco.png";
import { useLocation } from "wouter";
import { useMemo } from "react";

import categoriesData from "@/data/categories.json";
import locationsData from "@/data/locations.json";

// ===== Tipos =====
type Subcategory = {
    slug: string;
    label: string;
    metaTitle?: string;
    preposition?: "de" | "para";
};
type Category = {
    slug: string;
    label: string;
    metaTitle?: string;
    preposition?: "de" | "para";
    subcategories?: Subcategory[];
};

type Ccaa = { slug: string; name: string; code: string };
type Provincia = { slug: string; name: string; code: string; ccaa: string };
type Ciudad = { slug: string; name: string; code: string; provincia: string; ccaa: string };

const allCategories = categoriesData as Category[];

// ===== Utils =====
function splitInTwo<T>(arr: T[]): [T[], T[]] {
    const half = Math.ceil(arr.length / 2);
    return [arr.slice(0, half), arr.slice(half)];
}

// Extrae "lo que hay después de -en-" en un segmento
function extractLocFromSegment(seg?: string): string | undefined {
    if (!seg) return;
    const i = seg.lastIndexOf("-en-");
    return i !== -1 ? seg.slice(i + 4) : undefined;
}

// Quita "-en-<loc>" y devuelve la base
function baseBeforeEn(seg?: string): string | undefined {
    if (!seg) return;
    const i = seg.lastIndexOf("-en-");
    return i !== -1 ? seg.slice(0, i) : seg;
}

// Quita prefijos de categoría
function removeCategoryPrefix(base?: string): string | undefined {
    if (!base) return;
    const prefs = ["alquiler-para-", "alquiler-de-"];
    for (const p of prefs) {
        if (base.startsWith(p)) return base.slice(p.length);
    }
    return;
}

// Quita prefijo de subcategoría
function removeSubcatPrefix(base?: string): string | undefined {
    if (!base) return;
    const prefs = ["alquiler-de-", "alquiler-para-"];
    for (const p of prefs) {
        if (base.startsWith(p)) return base.slice(p.length);
    }
    return;
}

// Construcción de URLs
function buildCategoryUrl(cat: Category, locSlug: string) {
    const pref = cat.preposition ?? "de";
    return `/alquiler-${pref}-${cat.slug}-en-${locSlug}`;
}
function buildSubcategoryUrl(cat: Category, sub: Subcategory, locSlug: string) {
    const catPref = cat.preposition ?? "de";
    const subPref = sub.preposition ?? "de";
    return `/alquiler-${catPref}-${cat.slug}/alquiler-${subPref}-${sub.slug}-en-${locSlug}`;
}

// Parsing de contexto activo desde el path actual
function useActiveContext(path: string) {
    const segs = path.replace(/^\//, "").split("/");
    // Ubicación (si hay en seg2 manda; si no, en seg1)
    const loc =
        extractLocFromSegment(segs[1]) ||
        extractLocFromSegment(segs[0]) ||
        undefined;

    // Categoría
    const catBase = baseBeforeEn(segs[0]);
    const catSlug = removeCategoryPrefix(catBase);

    // Subcategoría (si hay segundo segmento)
    const subBase = baseBeforeEn(segs[1]);
    const subSlug = removeSubcatPrefix(subBase);

    return { catSlug, subSlug, locSlug: loc };
}

// Localiza el slug en ccaa/provincia/ciudad
function locate(
    locSlug: string | undefined,
    data: { ccaa: Ccaa[]; provincias: Provincia[]; ciudades: Ciudad[] }
) {
    if (!locSlug) return { kind: "none" as const };
    const ccaa = data.ccaa.find((x) => x.slug === locSlug);
    if (ccaa) return { kind: "ccaa" as const, ccaa };
    const prov = data.provincias.find((x) => x.slug === locSlug);
    if (prov) return { kind: "prov" as const, prov };
    const city = data.ciudades.find((x) => x.slug === locSlug);
    if (city) return { kind: "city" as const, city };
    return { kind: "unknown" as const };
}

// Para el bloque superior (categorías/subcategorías)
function useActiveCategoryFromPath(path: string): Category | undefined {
    const { catSlug } = useActiveContext(path);
    if (!catSlug) return;
    return (allCategories || []).find((c) => c.slug === catSlug);
}

// ===== BLOQUE DINÁMICO DE UBICACIONES (abajo del footer) =====
function FooterLocations() {
    const [path] = useLocation();
    const data = locationsData as {
        ccaa: Ccaa[];
        provincias: Provincia[];
        ciudades: Ciudad[];
    };

    const { catSlug, subSlug, locSlug } = useActiveContext(path);

    const activeCategory = useMemo(
        () => (catSlug ? (allCategories || []).find((c) => c.slug === catSlug) : undefined),
        [catSlug]
    );
    const activeSubcategory = useMemo(
        () =>
            activeCategory && subSlug
                ? (activeCategory.subcategories || []).find((s) => s.slug === subSlug)
                : undefined,
        [activeCategory, subSlug]
    );

    const where = useMemo(() => locate(locSlug, data), [locSlug, data]);

    type Item = { href: string; text: string };

    const items: Item[] = useMemo(() => {
        // Fallback si no hay categoría o ubicación válida: categorías × CCAA
        if (!activeCategory || where.kind === "none" || where.kind === "unknown") {
            const out: Item[] = [];
            const orderedCcaa = [...data.ccaa].sort((a, b) => a.name.localeCompare(b.name, "es"));
            for (const region of orderedCcaa) {
                for (const cat of allCategories) {
                    const pref = cat.preposition ?? "de";
                    out.push({
                        href: buildCategoryUrl(cat, region.slug),
                        text: `Alquiler ${pref} ${cat.label} en ${region.name}`,
                    });
                }
            }
            return out;
        }

        const cat = activeCategory;
        const subs = activeCategory.subcategories || [];

        // Helper para añadir enlaces de categoría + subcategorías
        const pushCatAndSubs = (acc: Item[], locSlug: string, locName: string) => {
            acc.push({
                href: buildCategoryUrl(cat, locSlug),
                text: `Alquiler ${cat.preposition ?? "de"} ${cat.label} en ${locName}`,
            });
            for (const s of subs) {
                acc.push({
                    href: buildSubcategoryUrl(cat, s, locSlug),
                    text: `Alquiler ${s.preposition ?? "de"} ${s.label} en ${locName}`,
                });
            }
        };

        const out: Item[] = [];

        if (where.kind === "ccaa") {
            // 1) La CCAA con todas las subcategorías (y la categoría)
            pushCatAndSubs(out, where.ccaa.slug, where.ccaa.name);

            // 2) Todas las provincias de esa CCAA con la categoría y todas las subcategorías
            const provs = data.provincias
                .filter((p) => p.ccaa === where.ccaa.slug)
                .sort((a, b) => a.name.localeCompare(b.name, "es"));

            for (const p of provs) {
                pushCatAndSubs(out, p.slug, p.name);
            }
        }

        if (where.kind === "prov") {
            // Provincia → todos los municipios con categoría + subcategorías (sin límite)
            const cities = data.ciudades
                .filter((c) => c.provincia === where.prov.slug)
                .sort((a, b) => a.name.localeCompare(b.name, "es"));

            for (const c of cities) {
                pushCatAndSubs(out, c.slug, c.name);
            }
        }

        // where.kind === "city": no hay nivel inferior
        return out;
    }, [activeCategory, activeSubcategory, where, data]);

    // Sin títulos y sin "no hay resultados": si no hay enlaces, no pintamos nada.
    if (items.length === 0) return null;

    return (
        <div className="text-[11px]">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-2">
                {items.map((it, i) => (
                    <a key={i} href={it.href} className="text-gray-300 hover:text-white">
                        {it.text}
                    </a>
                ))}
            </div>
        </div>
    );
}

// ===== FOOTER PRINCIPAL (parte superior) =====
export default function Footer() {
    const [path] = useLocation();
    const activeCategory = useActiveCategoryFromPath(path);

    const links = !activeCategory
        ? allCategories.map((c) => {
            const pref = c.preposition ?? "de";
            return {
                href: `/alquiler-${pref}-${c.slug}`,
                text: `Alquiler ${pref} ${c.label}`,
                title: c.metaTitle ?? `Alquiler ${pref} ${c.label} | Appquilar`,
            };
        })
        : (activeCategory.subcategories ?? []).map((s) => ({
            href: `/alquiler-${activeCategory.preposition ?? "de"}-${activeCategory.slug}/alquiler-${s.preposition ?? "de"}-${s.slug}`,
            text: `Alquiler ${s.preposition ?? "de"} ${s.label}`,
            title:
                s.metaTitle ??
                `Alquiler ${s.preposition ?? "de"} ${s.label} | ${activeCategory.label} | Appquilar`,
        }));

    const [col3, col4] = splitInTwo(links);

    return (
        <footer className="bg-zinc-500 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Bloque superior: 4 columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Col 1: Branding */}
                    <div>
                        <a href="/" className="inline-flex items-center space-x-3">
                            <img src={iconLogo} alt="Appquilar" className="h-8 w-8" />
                            <img src={textLogo} alt="Appquilar" className="h-6" />
                        </a>
                        <p className="mt-4 text-sm opacity-80">
                            Encuentra lo que necesitas, donde lo necesitas.
                        </p>
                        <p className="mt-2 text-sm opacity-80">
                            <a href="https://appquilar.com/appquilar" target="_blank" className="hover:text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </p>
                    </div>

                    {/* Col 2: Contacto */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <a href="tel:+34999999999" className="hover:text-white">
                                    +34 999 999 999
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <a href="mailto:hola@appquilar.com" className="hover:text-white">
                                    hola@appquilar.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Map className="w-4 h-4" />
                                <span>Mataró, Barcelona</span>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: dinámico (1ª mitad) */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            {!activeCategory ? "Categorías" : `Subcategorías de ${activeCategory.label}`}
                        </h3>
                        <ul className="space-y-2">
                            {col3.map((l) => (
                                <li key={l.href}>
                                    <a href={l.href} title={l.title} className="hover:text-white">
                                        {l.text}
                                    </a>
                                </li>
                            ))}
                            {col3.length === 0 && <li className="opacity-70">No hay enlaces.</li>}
                        </ul>
                    </div>

                    {/* Col 4: dinámico (2ª mitad) */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">&nbsp;</h3>
                        <ul className="space-y-2">
                            {col4.map((l) => (
                                <li key={l.href}>
                                    <a href={l.href} title={l.title} className="hover:text-white">
                                        {l.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bloque final: ubicaciones dinámicas (8 columnas, 11px) */}
                <div className="border-t border-gray-800 mt-10 pt-8">
                    <FooterLocations />
                </div>
            </div>
        </footer>
    );
}
