// scripts/generate-sitemap.cjs
const fs = require("fs");
const path = require("path");

const BASE = process.env.SITE_URL || "https://appquilar.com";
const ROOT = path.resolve(__dirname, "..");

// Datos
const categories = JSON.parse(
    fs.readFileSync(path.join(ROOT, "client/src/data/categories.json"), "utf8")
);
const locations = JSON.parse(
    fs.readFileSync(path.join(ROOT, "client/src/data/locations.json"), "utf8")
);
const TOP_CITY_SLUGS = new Set(
    JSON.parse(
        fs.readFileSync(path.join(ROOT, "client/src/data/top-cities.json"), "utf8")
    )
);

// Prefijo “de/para” por categoría (ajústalo si añades/quitas categorías en tu JSON)
const CATS_DE = new Set(["herramientas", "vehiculos", "disfraces", "tecnologia"]);
const catPrefix = (slug) => (CATS_DE.has(slug) ? "de" : "para");

// Normalización para casar slugs aunque varíe alguna tilde/espacio
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

// Filtramos ubicaciones: todas CCAA + todas provincias + Top 100 ciudades
const ccaa = locations.ccaa || [];
const provincias = locations.provincias || [];
const ciudadesTop = (locations.ciudades || []).filter((c) => {
    const s = c.slug;
    if (TOP_CITY_SLUGS.has(s)) return true;
    // tolerancia por si algún slug difiere ligeramente
    const ns = norm(s);
    for (const t of TOP_CITY_SLUGS) {
        if (norm(t) === ns) return true;
    }
    // aliases puntuales (por si en el dataset vienen variantes)
    const aliases = {
        "donostia-san-sebastian": ["san-sebastian", "donostia"],
        "elche": ["elche-elx", "elx"],
        "a-coruna": ["la-coruna", "coruna"],
        "logrono": ["logronio"], // por si algún dataset lo translitera
    };
    for (const [main, list] of Object.entries(aliases)) {
        if (s === main || list.includes(s)) return true;
    }
    return false;
});

function urlJoin(base, ...parts) {
    const b = base.replace(/\/+$/, "");
    const p = parts.flat().filter(Boolean).map((s) => String(s).replace(/^\/+|\/+$/g, ""));
    return [b, ...p].join("/");
}

const now = new Date().toISOString();
const urls = new Set();

// Home
urls.add(urlJoin(BASE, "/"));

// Ubicaciones que vamos a combinar
const LOCS = [
    ...ccaa.map((x) => ({ kind: "ccaa", slug: x.slug })),
    ...provincias.map((x) => ({ kind: "provincia", slug: x.slug })),
    ...ciudadesTop.map((x) => ({ kind: "ciudad", slug: x.slug })),
];

// Construcción SEO
for (const c of categories) {
    const pref = catPrefix(c.slug);
    const catPath = `alquiler-${pref}-${c.slug}`;

    // categoría sin ubicación
    urls.add(urlJoin(BASE, catPath));

    // categoría con ubicación
    for (const loc of LOCS) {
        urls.add(urlJoin(BASE, `${catPath}-en-${loc.slug}`));
    }

    // subcategorías
    if (Array.isArray(c.subcategories)) {
        for (const s of c.subcategories) {
            const subPath = `${catPath}/alquiler-de-${s.slug}`;
            urls.add(urlJoin(BASE, subPath)); // sin ubicación
            for (const loc of LOCS) {
                urls.add(urlJoin(BASE, `${subPath}-en-${loc.slug}`));
            }
        }
    }
}

// Seguridad: no superar 50.000 URLs por archivo de sitemap
const MAX_URLS = 50000;
let urlsArr = [...urls];
if (urlsArr.length > MAX_URLS) {
    console.warn(
        `⚠️  ${urlsArr.length} URLs > ${MAX_URLS}. Se recorta automáticamente.`
    );
    urlsArr = urlsArr.slice(0, MAX_URLS);
}

function buildXml(arr) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${arr
        .map(
            (u) =>
                `  <url><loc>${u}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
        )
        .join("\n")}
</urlset>`;
}

const publicDir = path.join(ROOT, "client/public");
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), buildXml(urlsArr), "utf8");

// robots.txt
const robots = `User-agent: *
Allow: /
Sitemap: ${urlJoin(BASE, "sitemap.xml")}
`;
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");

console.log(
    `✅ sitemap.xml generado con ${urlsArr.length} URLs (categorías, subcategorías y CCAA + provincias + Top 100 ciudades).`
);
console.log(
    `   CCAA:${ccaa.length}  provincias:${provincias.length}  topCities:${ciudadesTop.length}`
);
