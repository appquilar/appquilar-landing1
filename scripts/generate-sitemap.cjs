// scripts/generate-sitemap.cjs
const fs = require("fs");
const path = require("path");
const BASE = process.env.SITE_URL || "https://appquilar.com";
const categories = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../client/src/data/categories.json"), "utf8")
);

// categorías que suenan mejor con "de"
const CATS_DE = new Set(["herramientas", "vehiculos", "disfraces", "tecnologia"]);
const catPrefix = (slug) => (CATS_DE.has(slug) ? "de" : "para");

function urlJoin(base, ...parts) {
    const b = base.replace(/\/+$/, "");
    const p = parts.flat().filter(Boolean).map((s) => String(s).replace(/^\/+|\/+$/g, ""));
    return [b, ...p].join("/");
}

const urls = new Set([urlJoin(BASE, "/")]);

for (const c of categories) {
    const pref = catPrefix(c.slug);
    urls.add(urlJoin(BASE, `alquiler-${pref}-${c.slug}`));
    if (Array.isArray(c.subcategories)) {
        for (const s of c.subcategories) {
            urls.add(
                urlJoin(BASE, `alquiler-${pref}-${c.slug}`, `alquiler-de-${s.slug}`)
            );
        }
    }
}

const now = new Date().toISOString();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urls]
    .map(
        (u) =>
            `  <url><loc>${u}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    )
    .join("\n")}
</urlset>`;

const publicDir = path.resolve(__dirname, "../client/public");
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml, "utf8");

const robots = `User-agent: *
Allow: /
Sitemap: ${urlJoin(BASE, "sitemap.xml")}
`;
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");

console.log(`✅ sitemap.xml actualizado con ${urls.size} URLs (con 'de/para' por categoría).`);
