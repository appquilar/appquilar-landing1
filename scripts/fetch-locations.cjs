// scripts/fetch-locations.cjs
// Genera client/src/data/locations.json desde el repo:
// https://github.com/frontid/ComunidadesProvinciasPoblaciones
// 1) intenta con arbol.json (anidado)
// 2) si falla, usa ccaa.json + provincias.json + poblaciones.json

const fs = require("fs");
const path = require("path");
const https = require("https");

const RAWS = [
    "https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/master/arbol.json", // URL estable (sin refs/heads)
    "https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/arbol.json", // la que pegaste
];

const FALLBACK = {
    ccaa: "https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/master/ccaa.json",
    provincias: "https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/master/provincias.json",
    poblaciones: "https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/master/poblaciones.json",
};

const OUT_DIR = path.resolve(__dirname, "../client/src/data");
const OUT_FILE = path.join(OUT_DIR, "locations.json");

// --- utils ---
function slugify(s) {
    return String(s || "")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .toLowerCase().replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// descarga con seguimiento de redirects (hasta 5)
function download(url, depth = 0) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            const isRedirect = [301, 302, 303, 307, 308].includes(res.statusCode || 0);
            if (isRedirect && res.headers.location) {
                if (depth >= 5) return reject(new Error("Too many redirects"));
                const next = res.headers.location.startsWith("http")
                    ? res.headers.location
                    : new URL(res.headers.location, url).toString();
                res.resume();
                return resolve(download(next, depth + 1));
            }
            if (res.statusCode !== 200) {
                res.resume();
                return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            }
            let data = "";
            res.setEncoding("utf8");
            res.on("data", (d) => (data += d));
            res.on("end", () => resolve(data));
        }).on("error", reject);
    });
}

function normalizeNode(n) {
    // el repo usa "label" y "children"; dejamos fallbacks por si cambia
    const name = n?.label ?? n?.name ?? n?.nombre ?? n?.text ?? "";
    const code = n?.code ?? n?.value ?? n?.id ?? "";
    const children = n?.children ?? n?.hijos ?? n?.nodes ?? [];
    return { name, code, children };
}

// --- pipeline arbol.json ---
async function buildFromArbol() {
    // probamos primero la URL estable; si falla, la de refs/heads
    let raw;
    for (const u of RAWS) {
        try {
            raw = await download(u);
            break;
        } catch (_) {}
    }
    if (!raw) throw new Error("No se pudo descargar arbol.json");

    let tree = JSON.parse(raw);
    if (!Array.isArray(tree)) throw new Error("Formato inesperado: raíz no es array");

    const ccaa = [];
    const provincias = [];
    const ciudades = [];

    for (const c0 of tree) {
        const C = normalizeNode(c0);
        if (!C.name || !C.code) continue;
        const ccaaSlug = slugify(C.name);
        ccaa.push({ slug: ccaaSlug, name: C.name, code: C.code });

        for (const p0 of C.children || []) {
            const P = normalizeNode(p0);
            if (!P.name || !P.code) continue;
            const provSlug = slugify(P.name);
            provincias.push({ slug: provSlug, name: P.name, code: P.code, ccaa: ccaaSlug });

            for (const m0 of P.children || []) {
                const M = normalizeNode(m0);
                if (!M.name || !M.code) continue;
                const citySlug = slugify(M.name);
                ciudades.push({
                    slug: citySlug,
                    name: M.name,
                    code: M.code,
                    provincia: provSlug,
                    ccaa: ccaaSlug,
                });
            }
        }
    }

    if (ccaa.length === 0) throw new Error("arbol.json sin CCAA");
    // en el repo real deben salir también provincias/ciudades
    if (provincias.length === 0 || ciudades.length === 0) {
        throw new Error("arbol.json sin provincias/ciudades; activo fallback");
    }

    return { ccaa, provincias, ciudades };
}

// --- pipeline fallback (3 ficheros planos) ---
async function buildFromFlat() {
    const [ccaaRaw, provRaw, pobRaw] = await Promise.all([
        download(FALLBACK.ccaa),
        download(FALLBACK.provincias),
        download(FALLBACK.poblaciones),
    ]);

    const ccaaJson = JSON.parse(ccaaRaw);       // [{ code,label }]
    const provJson = JSON.parse(provRaw);       // [{ code,label, parent_code?... }]
    const pobJson  = JSON.parse(pobRaw);        // [{ code,label, parent_code?... }]

    const ccaa = [];
    const provincias = [];
    const ciudades = [];

    // Mapas por código para relacionar
    // Detectamos llaves de relación de forma flexible
    const get = (o, keys) => keys.map(k => o?.[k]).find(v => v != null);

    // CCAA
    for (const c of ccaaJson) {
        const name = get(c, ["label", "name", "nombre", "text"]);
        const code = get(c, ["code", "id", "value", "codigo"]);
        if (!name || !code) continue;
        ccaa.push({ slug: slugify(name), name, code });
    }

    // Provincias (en el repo suele haber algún campo que apunta a la CCAA: p.ej. community_code)
    for (const p of provJson) {
        const name = get(p, ["label", "name", "nombre", "text"]);
        const code = get(p, ["code", "id", "value", "codigo"]);
        const ccaaCode = get(p, ["community_code", "ccaa_code", "parent_code", "parent", "ccaa"]);
        if (!name || !code) continue;

        // intenta enlazar por code→ccaa.code; si ccaaCode viene como texto con nombre, slugify-match
        let ccaaSlug;
        if (ccaaCode) {
            const byCode = ccaa.find(x => x.code === String(ccaaCode));
            if (byCode) ccaaSlug = byCode.slug;
            if (!ccaaSlug) {
                const ccaaBySlug = ccaa.find(x => x.slug === slugify(ccaaCode));
                if (ccaaBySlug) ccaaSlug = ccaaBySlug.slug;
            }
        }
        // si no hay relación, déjalo vacío (mejor a que falle)
        provincias.push({ slug: slugify(name), name, code, ccaa: ccaaSlug });
    }

    // Poblaciones (relación con provincia y, si existe, con ccaa)
    for (const m of pobJson) {
        const name = get(m, ["label", "name", "nombre", "text"]);
        const code = get(m, ["code", "id", "value", "codigo"]);
        const provCode = get(m, ["province_code", "provincia_code", "parent_code", "parent", "provincia"]);
        if (!name || !code) continue;

        let provinciaSlug;
        if (provCode) {
            const byCode = provincias.find(x => x.code === String(provCode));
            if (byCode) provinciaSlug = byCode.slug;
            if (!provinciaSlug) {
                const bySlug = provincias.find(x => x.slug === slugify(provCode));
                if (bySlug) provinciaSlug = bySlug.slug;
            }
        }
        // ccaa por herencia de provincia (si está resuelta)
        const ccaaSlug = provinciaSlug
            ? provincias.find(p => p.slug === provinciaSlug)?.ccaa
            : undefined;

        ciudades.push({
            slug: slugify(name),
            name,
            code,
            provincia: provinciaSlug,
            ccaa: ccaaSlug,
        });
    }

    return { ccaa, provincias, ciudades };
}

// --- main ---
(async () => {
    let data;
    try {
        data = await buildFromArbol();
        console.log("✅ Datos desde arbol.json");
    } catch (e) {
        console.warn("⚠️  arbol.json falló:", e.message);
        console.warn("➡️  probando con ccaa.json + provincias.json + poblaciones.json …");
        data = await buildFromFlat();
    }

    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(OUT_FILE, JSON.stringify(data, null, 2), "utf8");

    console.log(
        `✅ Generado ${OUT_FILE}  ccaa:${data.ccaa.length}  provincias:${data.provincias.length}  ciudades:${data.ciudades.length}`
    );
    console.log("   Ejemplos CCAA:", data.ccaa.slice(0, 3).map(x => x.name).join(", "));
    console.log("   Ejemplos provincias:", data.provincias.slice(0, 3).map(x => x.name).join(", "));
    console.log("   Ejemplos ciudades:", data.ciudades.slice(0, 3).map(x => x.name).join(", "));
})().catch((err) => {
    console.error("❌ Error generando locations.json:", err);
    process.exit(1);
});
