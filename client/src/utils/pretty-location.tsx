import locations from "@/data/locations.json";

type Locations = { ccaa: {slug:string;name:string}[]; provincias: {slug:string;name:string}[]; ciudades: {slug:string;name:string}[] };

const L = locations as Locations;

export function prettyLocation(slug?: string): string | undefined {
    if (!slug) return undefined;
    const hit =
        L.provincias.find(p => p.slug === slug) ||
        L.ccaa.find(c => c.slug === slug) ||
        L.ciudades.find(c => c.slug === slug);
    return hit?.name;
}