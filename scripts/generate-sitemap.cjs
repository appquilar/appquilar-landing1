// scripts/generate-sitemap.js
const fs   = require('fs');
const path = require('path');

// 1) Carga la lista de provincias
const provinces = require('../client/src/data/provincias.json');

// 2) Función para slugificar
function slugify(s) {
    return s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// 3) Genera rutas
function generateRoutesByProvince(baseSlug) {
    const routes = [{ path: `/${baseSlug}` }];
    provinces.forEach(prov => {
        routes.push({
            path: `/${baseSlug}-en-${slugify(prov)}`
        });
    });
    return routes;
}

const baseCamping = 'alquiler-cosas-camping';
const baseTools = 'alquiler-herramientas';

const BASE = 'https://appquilar.com';
const campingRoutes = generateRoutesByProvince(baseCamping);
const toolsRoutes = generateRoutesByProvince(baseTools);

const allPaths = [
    '/',
    ...campingRoutes.map(r => r.path),
    ...toolsRoutes.map(r => r.path)
];

// 4) Construye los contenidos
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths.map(p => `  <url><loc>${BASE}${p}</loc></url>`).join('\n')}
</urlset>`;

const robots = `User-agent: *
Allow: /
Sitemap: ${BASE}/sitemap.xml
`;

// 5) Asegura public/ y escribe
const publicDir = path.resolve(__dirname, '../client/public');
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);

console.log('✅ sitemap.xml & robots.txt generated');
