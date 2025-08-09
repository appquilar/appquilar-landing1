// scripts/generate-sitemap.cjs
const fs = require("fs");
const path = require("path");

// Base URL
const BASE = process.env.SITE_URL || "https://appquilar.com";

// Cargar categorías
const categoriesPath = path.resolve(__dirname, "../client/src/data/categories.json");
const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf8"));

function urlJoin(base, ...parts) {
    const b = base.replace(/\/+$/, "");
    const p = parts.flat().filter(Boolean).map(s => String(s).replace(/^\/+|\/+$/g, ""));
    return [b, ...p].join("/");
}

// URLs: home + /:category
const urls = new Set([urlJoin(BASE, "/")]);
for (const c of categories) urls.add(urlJoin(BASE, c.slug));

const now = new Date().toISOString();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urls].map(u => `  <url><loc>${u}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join("\n")}
</urlset>`;

const robots = `User-agent: *
Allow: /
Sitemap: ${urlJoin(BASE, "sitemap.xml")}
`;

// Escribir a client/public
const publicDir = path.resolve(__dirname, "../client/public");
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml, "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");

console.log(`✅ sitemap.xml (${urls.size} URLs) & robots.txt generated`);
