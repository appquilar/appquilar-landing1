// client/src/App.tsx
import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import CategoryLanding from "@/components/category-landing";
import SubcategoryLanding from "@/components/subcategory-landing";
import { Toaster } from "@/components/ui/toaster";

/** Helpers para extraer slugs de los segmentos SEO */
function parseCategoryFromSeg(seg: string): string | null {
    const prefix = "alquiler-para-";
    if (!seg?.startsWith(prefix)) return null;
    return decodeURIComponent(seg.slice(prefix.length));
}

function parseSubcategoryFromSeg(seg: string): string | null {
    const prefix = "alquiler-de-";
    if (!seg?.startsWith(prefix)) return null;
    return decodeURIComponent(seg.slice(prefix.length));
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Switch>
                {/* Home */}
                <Route path="/" component={Home} />

                {/* Subcategoría SEO: /alquiler-para-:categorySlug/alquiler-de-:subcategorySlug */}
                <Route path="/:seg1/:seg2">
                    {(params) => {
                        const categorySlug = parseCategoryFromSeg(params.seg1);
                        const subcategorySlug = parseSubcategoryFromSeg(params.seg2);
                        if (categorySlug && subcategorySlug) {
                            return (
                                <SubcategoryLanding
                                    categorySlug={categorySlug}
                                    subcategorySlug={subcategorySlug}
                                />
                            );
                        }
                        return <NotFound />;
                    }}
                </Route>

                {/* Categoría SEO: /alquiler-para-:categorySlug */}
                <Route path="/:seg1">
                    {(params) => {
                        const categorySlug = parseCategoryFromSeg(params.seg1);
                        if (categorySlug) {
                            return <CategoryLanding slug={categorySlug} />;
                        }
                        return <NotFound />;
                    }}
                </Route>

                {/* 404 */}
                <Route>
                    <NotFound />
                </Route>
            </Switch>

            <Toaster />
        </QueryClientProvider>
    );
}
