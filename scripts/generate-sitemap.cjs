// scripts/generate-sitemaps.cjs
// Genera:
//  - /client/public/sitemap.xml             (ÍNDICE)
//  - /client/public/sitemaps/sitemap-base.xml
//      -> home, categorías (sin ubicación), categorías en CCAA, categorías en provincias
//         + subcategorías (sin ubicación), subcategorías en CCAA, subcategorías en provincias
//  - /client/public/sitemaps/sitemap-cities-<provincia>[ -<n> ].xml
//      -> TODAS las ciudades de esa provincia para categorías y subcategorías
//
// Requisitos:
//  - client/src/data/categories.json  (con "preposition" por categoría/subcategoría)
//  - client/src/data/locations.json   (ccaa, provincias, ciudades)  -> generado con fetch-locations.cjs
//
// Uso:
//  SITE_URL=https://appquilar.com node scripts/generate-sitemaps.cjs

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "client/public");
const SITEMAPS_DIR = path.join(PUBLIC_DIR, "sitemaps");

const BASE_URL = process.env.SITE_URL || "https://appquilar.com/landing";
const NOW = new Date().toISOString();
const MAX_URLS_PER_FILE = 50000;

function urlJoin(base, ...parts) {
    const b = base.replace(/\/+$/, "");
    const p = parts.flat().filter(Boolean).map((s) => String(s).replace(/^\/+|\/+$/g, ""));
    return [b, ...p].join("/");
}
function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
}
function xmlUrlset(urls) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        urls.map(u =>
            `  <url><loc>${u}</loc><lastmod>${NOW}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
        ).join("\n") +
        `\n</urlset>\n`;
}
function xmlIndex(items) {
    // items: [{ loc, lastmod }]
    return `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        items.map(i => `  <sitemap><loc>${i.loc}</loc><lastmod>${i.lastmod || NOW}</lastmod></sitemap>`).join("\n") +
        `\n</sitemapindex>\n`;
}
function ensureDir(d) { fs.mkdirSync(d, { recursive: true }); }

// --- lee datos ---
const categories = JSON.parse(
    fs.readFileSync(path.join(ROOT, "client/src/data/categories.json"), "utf8")
);
const locations = JSON.parse(
    fs.readFileSync(path.join(ROOT, "client/src/data/locations.json"), "utf8")
);

// helpers SEO
const ccaa = locations.ccaa || [];
const provincias = locations.provincias || [];
const ciudades = locations.ciudades || [];

const catPath = (c) => `alquiler-${(c.preposition === "para" ? "para" : "de")}-${c.slug}`;
const subPath = (c, s) => `${catPath(c)}/alquiler-de-${s.slug}`;

// ---------- 1) SITEMAP BASE (sin ciudades) ----------
const baseUrls = new Set();
// Home
baseUrls.add(urlJoin(BASE_URL, "/"));

for (const c of categories) {
    const cp = catPath(c);

    // Categoría sin ubicación
    baseUrls.add(urlJoin(BASE_URL, cp));

    // Categoría con CCAA y con provincias
    for (const x of ccaa) baseUrls.add(urlJoin(BASE_URL, `${cp}-en-${x.slug}`));
    for (const x of provincias) baseUrls.add(urlJoin(BASE_URL, `${cp}-en-${x.slug}`));

    // Subcategorías
    if (Array.isArray(c.subcategories)) {
        for (const s of c.subcategories) {
            const sp = subPath(c, s);
            // Subcategoría sin ubicación
            baseUrls.add(urlJoin(BASE_URL, sp));
            // Subcategoría con CCAA y con provincias
            for (const x of ccaa) baseUrls.add(urlJoin(BASE_URL, `${sp}-en-${x.slug}`));
            for (const x of provincias) baseUrls.add(urlJoin(BASE_URL, `${sp}-en-${x.slug}`));
        }
    }
}

// ---------- 2) SITEMAPS POR PROVINCIA (TODAS SUS CIUDADES) ----------
const provinceSitemaps = []; // { filename, urls[] }

for (const prov of provincias) {
    const citiesInProv = ciudades.filter((m) => m.provincia === prov.slug);
    if (citiesInProv.length === 0) continue;

    const urls = [];

    for (const c of categories) {
        const cp = catPath(c);
        for (const city of citiesInProv) {
            urls.push(urlJoin(BASE_URL, `${cp}-en-${city.slug}`));
        }
        if (Array.isArray(c.subcategories)) {
            for (const s of c.subcategories) {
                const sp = subPath(c, s);
                for (const city of citiesInProv) {
                    urls.push(urlJoin(BASE_URL, `${sp}-en-${city.slug}`));
                }
            }
        }
    }

    // Particiona si excede 50k
    const chunks = chunk(urls, MAX_URLS_PER_FILE);
    if (chunks.length === 1) {
        provinceSitemaps.push({
            filename: `sitemap-cities-${prov.slug}.xml`,
            urls: chunks[0],
        });
    } else {
        chunks.forEach((part, idx) => {
            provinceSitemaps.push({
                filename: `sitemap-cities-${prov.slug}-${idx + 1}.xml`,
                urls: part,
            });
        });
    }
}

// ---------- Escritura ----------
ensureDir(SITEMAPS_DIR);

// base
const baseFilename = "sitemap-base.xml";
fs.writeFileSync(path.join(SITEMAPS_DIR, baseFilename), xmlUrlset([...baseUrls]), "utf8");

// provincias
for (const sm of provinceSitemaps) {
    fs.writeFileSync(path.join(SITEMAPS_DIR, sm.filename), xmlUrlset(sm.urls), "utf8");
}

// index (como /sitemap.xml en raíz)
const indexItems = [
    { loc: urlJoin(BASE_URL, "sitemaps", baseFilename), lastmod: NOW },
    ...provinceSitemaps.map((sm) => ({
        loc: urlJoin(BASE_URL, "sitemaps", sm.filename),
        lastmod: NOW,
    })),
];

fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xmlIndex(indexItems), "utf8");

// robots.txt (apunta al índice)
const robots = `User-agent: *
Allow: /
Sitemap: ${urlJoin(BASE_URL, "sitemap.xml")}
`;
fs.writeFileSync(path.join(PUBLIC_DIR, "robots.txt"), robots, "utf8");

console.log(`✅ Generado sitemap INDEX con ${indexItems.length} entradas`);
console.log(`   Base: ${baseUrls.size} URLs -> sitemaps/${baseFilename}`);
console.log(`   Provincias: ${provinceSitemaps.length} sitemaps (todas sus ciudades)`);
