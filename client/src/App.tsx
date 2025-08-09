// client/src/App.tsx
import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import CategoryLanding from "@/components/category-landing";
import SubcategoryLanding from "@/components/subcategory-landing";
import { Toaster } from "@/components/ui/toaster";

// Prefijos SEO aceptados para categoría
const CAT_PREFIXES = ["alquiler-para-", "alquiler-de-"];
const SUB_PREFIX = "alquiler-de-";
const LOC_TAG = "-en-";

// Devuelve {base, location} separando "-en-<slug>" si existe
function splitBaseAndLocation(seg: string): { base: string; location?: string } {
    const idx = seg.lastIndexOf(LOC_TAG);
    if (idx === -1) return { base: seg };
    return { base: seg.slice(0, idx), location: decodeURIComponent(seg.slice(idx + LOC_TAG.length)) };
}

function parseCategoryFromBase(base: string): string | null {
    for (const p of CAT_PREFIXES) {
        if (base.startsWith(p)) return decodeURIComponent(base.slice(p.length));
    }
    return null;
}

function parseSubcategoryFromBase(base: string): string | null {
    if (!base.startsWith(SUB_PREFIX)) return null;
    return decodeURIComponent(base.slice(SUB_PREFIX.length));
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Switch>
                {/* Home */}
                <Route path="/" component={Home} />

                {/* Subcategoría (con o sin ubicación):
            /<seg1>/<seg2>
            seg1 = alquiler-(para|de)-{category}
            seg2 = alquiler-de-{subcategory}[-en-{location}] */}
                <Route path="/:seg1/:seg2">
                    {(params) => {
                        const { base: base1 } = splitBaseAndLocation(params.seg1);
                        const { base: base2, location } = splitBaseAndLocation(params.seg2);

                        const categorySlug = parseCategoryFromBase(base1);
                        const subcategorySlug = parseSubcategoryFromBase(base2);

                        if (categorySlug && subcategorySlug) {
                            return (
                                <SubcategoryLanding
                                    categorySlug={categorySlug}
                                    subcategorySlug={subcategorySlug}
                                    locationSlug={location}
                                />
                            );
                        }
                        return <NotFound />;
                    }}
                </Route>

                {/* Categoría (con o sin ubicación):
            /<seg1>
            seg1 = alquiler-(para|de)-{category}[-en-{location}] */}
                <Route path="/:seg1">
                    {(params) => {
                        const { base, location } = splitBaseAndLocation(params.seg1);
                        const categorySlug = parseCategoryFromBase(base);
                        if (categorySlug) {
                            return <CategoryLanding slug={categorySlug} locationSlug={location} />;
                        }
                        return <NotFound />;
                    }}
                </Route>

                {/* 404 */}
                <Route><NotFound /></Route>
            </Switch>

            <Toaster />
        </QueryClientProvider>
    );
}
