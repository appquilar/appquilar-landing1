// client/src/components/faq-section.tsx
import React, { useId, useState } from "react";

export type FAQItem = { question: string; answer: string };

export default function FAQSection({ items }: { items: FAQItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const baseId = useId();

    if (!Array.isArray(items) || items.length === 0) return null;

    return (
        <section id="faq-section" className="py-16 px-20 bg-gray-50" aria-labelledby={`${baseId}-faq-title`}>
            <h2 id={`${baseId}-faq-title`} className="text-2xl sm:text-3xl font-semibold text-center">
                Preguntas frecuentes
            </h2>

            <div className="mt-6 divide-y rounded-2xl border shadow-sm max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {items.map((item, i) => {
                    const isOpen = openIndex === i;
                    const buttonId = `${baseId}-btn-${i}`;
                    const panelId = `${baseId}-panel-${i}`;
                    return (
                        <div key={i} className="p-4 sm:p-5">
                            <button
                                id={buttonId}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => setOpenIndex(isOpen ? null : i)}
                                className="flex w-full items-center justify-between gap-4 text-left"
                            >
                                <span className="text-base sm:text-lg font-medium">{item.question}</span>
                                <span
                                    className={`inline-block transition-transform duration-300 ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                    aria-hidden="true"
                                >
                  ▼
                </span>
                            </button>

                            {/* Panel con animación (grid-rows trick) */}
                            <div
                                id={panelId}
                                role="region"
                                aria-labelledby={buttonId}
                                className={`grid transition-all duration-300 ease-out ${
                                    isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-80"
                                }`}
                            >
                                <div className="overflow-hidden text-sm sm:text-base leading-relaxed text-gray-700">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
