// client/src/App.tsx
import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import CategoryLanding from "@/components/category-landing";
import SubcategoryLanding from "@/components/subcategory-landing";
import { Toaster } from "@/components/ui/toaster";

// Helpers: extraen slug si el segmento empieza por "alquiler-para-" o "alquiler-de-"
function parseCategoryFromSeg(seg: string): string | null {
    const prefixes = ["alquiler-para-", "alquiler-de-"];
    for (const p of prefixes) {
        if (seg?.startsWith(p)) return decodeURIComponent(seg.slice(p.length));
    }
    return null;
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

                {/* Subcategoría SEO:
           /alquiler-(para|de)-:categorySlug/alquiler-de-:subcategorySlug */}
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

                {/* Categoría SEO: /alquiler-(para|de)-:categorySlug */}
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
