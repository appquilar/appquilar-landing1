// src/pages/LegalTemplate.tsx
import { Helmet } from "react-helmet-async";

type Props = {
    title?: string;
    updatedAt?: string; // ISO string or human date
    children?: React.ReactNode;
};

/**
 * Minimal legal page wrapper for static legal content.
 * Renders a clean container, sets <title>, and marks page as noindex.
 */
export function LegalTemplate({ title = "Documento legal", updatedAt, children }: Props) {
    const pageTitle = `${title} | Appquilar`;
    return (
        <main className="min-h-screen bg-white">
            <Helmet>
                <title>{pageTitle}</title>
                {updatedAt && <meta name="last-modified" content={updatedAt} />}
                <meta name="robots" content="noindex,follow" />
            </Helmet>

            <div className="max-w-3xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                {updatedAt && (
                    <p className="text-sm text-gray-500 mb-8">
                        Última actualización: {updatedAt}
                    </p>
                )}
                <article className="prose prose-neutral max-w-none">
                    {children}
                </article>
            </div>
        </main>
    );
}
