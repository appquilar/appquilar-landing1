import { Mail, Map, Phone } from "lucide-react";
import iconLogo from "@assets/pelota-blanco.png";
import textLogo from "@assets/logo-blanco.png";
import { useLocation } from "wouter";
import categoriesData from "@/data/categories.json";

type Subcategory = { slug: string; label: string; metaTitle?: string };
type Category = {
  slug: string;
  label: string;
  metaTitle?: string;
  subcategories?: Subcategory[];
};

const allCategories = categoriesData as Category[];

// Divide una lista en dos partes equilibradas (para columnas 3 y 4)
function splitInTwo<T>(arr: T[]): [T[], T[]] {
  const half = Math.ceil(arr.length / 2);
  return [arr.slice(0, half), arr.slice(half)];
}

// Helpers para extraer slugs desde la URL SEO
function parseCategoryFromSeg(seg?: string): string | null {
  const prefix = "alquiler-para-";
  if (!seg || !seg.startsWith(prefix)) return null;
  return decodeURIComponent(seg.slice(prefix.length));
}
function parseSubcategoryFromSeg(seg?: string): string | null {
  const prefix = "alquiler-de-";
  if (!seg || !seg.startsWith(prefix)) return null;
  return decodeURIComponent(seg.slice(prefix.length));
}

export default function Footer() {
  // Ruta actual (string), p.ej. "/", "/alquiler-para-eventos", "/alquiler-para-eventos/alquiler-de-inflables"
  const [location] = useLocation();
  const segments = location.split("/").filter(Boolean);

  const categorySlug = parseCategoryFromSeg(segments[0]);
  const subcategorySlug = parseSubcategoryFromSeg(segments[1]);

  const activeCategory = categorySlug
      ? allCategories.find((c) => c.slug === categorySlug)
      : undefined;

  // Enlaces dinámicos SEO:
  // - Home (o sin categoría) => categorías
  // - Categoría/Subcategoría => subcategorías de esa categoría
  const links =
      !activeCategory
          ? allCategories.map((c) => ({
            href: `/alquiler-para-${c.slug}`,
            text: `Alquiler para ${c.label}`,
            title: c.metaTitle ?? `Alquiler para ${c.label} | Appquilar`,
          }))
          : (activeCategory.subcategories ?? []).map((s) => ({
            href: `/alquiler-para-${activeCategory.slug}/alquiler-de-${s.slug}`,
            text: `Alquiler de ${s.label}`,
            title:
                s.metaTitle ??
                `Alquiler de ${s.label} | ${activeCategory.label} | Appquilar`,
          }));

  const [col3, col4] = splitInTwo(links);

  return (
      <footer className="bg-zinc-500 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Columna 1: Branding + RRSS (igual que tu original) */}
            <div>
              <a href="/">
                <div className="flex items-center mb-4">
                  <img src={iconLogo} alt="Logo icono" className="h-8 w-auto" />
                  <img src={textLogo} alt="Appquilar logo" className="ml-2 h-6 w-auto" />
                </div>
              </a>
              <p className="mb-4">
                La plataforma líder en alquiler de productos en toda España.
              </p>
              <div className="flex space-x-4">
                {/* Ícono Instagram real (SVG) */}
                <a
                    href="https://www.instagram.com/appquilar/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white"
                    aria-label="Instagram de Appquilar"
                    title="Instagram de Appquilar"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7zM18 6.8a1 1 0 1 1 0 2a1 1 0 0 1 0-2z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Columna 2: Enlaces rápidos (igual que tu original) */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Enlaces rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#caracteristicas" className="hover:text-white">Características</a></li>
                <li><a href="#dashboard" className="hover:text-white">Dashboard</a></li>
                <li><a href="#faq-section" className="hover:text-white">Preguntas frecuentes</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            {/* Columna 3: dinámica (1ª mitad) */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {!activeCategory ? "Categorías" : `Subcategorías de ${activeCategory.label}`}
              </h3>
              <ul className="space-y-2">
                {col3.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} title={l.title} className="hover:text-white">
                        {l.text}
                      </a>
                    </li>
                ))}
                {col3.length === 0 && <li className="opacity-70">No hay enlaces.</li>}
              </ul>
            </div>

            {/* Columna 4: dinámica (2ª mitad) */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">&nbsp;</h3>
              <ul className="space-y-2">
                {col4.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} title={l.title} className="hover:text-white">
                        {l.text}
                      </a>
                    </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© {new Date().getFullYear()} Appquilar. Todos los derechos reservados.</p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <a href="#" className="hover:text-white">Términos de servicio</a>
                <a href="#" className="hover:text-white">Política de privacidad</a>
                <a href="#" className="hover:text-white">Política de cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}
