import provinces from '../data/provincias.json';

export type ProvinceRoute = {
    path: string;
    province?: string;
};

export function slugify(s: string): string {
    return s
        .toLowerCase()
        .normalize('NFD')                   // separate diacritics
        .replace(/[\u0300-\u036f]/g, '')    // remove diacritics
        .replace(/[^a-z0-9]+/g, '-')        // non-alphanumeric → hyphen
        .replace(/(^-|-$)/g, '');           // trim leading/trailing hyphens
}

/**
 * Generate the list of routes for a landing.
 *
 * @param baseSlug  base path segment (e.g. "alquiler-cosas-camping")
 * @returns         array of { path, province } entries
 */
export function generateRoutesByProvince(baseSlug: string): ProvinceRoute[] {
    const routes: ProvinceRoute[] = [{ path: `/${baseSlug}`, province: undefined }];
    provinces.forEach(p => {
        routes.push({ path: `/${baseSlug}-en-${slugify(p)}`, province: p });
    });
    return routes;
}
