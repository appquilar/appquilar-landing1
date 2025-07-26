import React, { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from '@radix-ui/react-accordion';
import { Helmet } from 'react-helmet';
import { Plus, Minus } from 'lucide-react';

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    items: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ items }) => {
    const [openValue, setOpenValue] = useState<string | undefined>(undefined);

    // JSON-LD schema for FAQPage
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section id="faq" className="py-16 px-4 bg-gray-50">
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
                <Accordion
                    type="single"
                    collapsible
                    value={openValue}
                    onValueChange={val => setOpenValue(val)}
                    className="space-y-4"
                >
                    {items.map((item, index) => {
                        const itemValue = `item-${index}`;
                        const isOpen = openValue === itemValue;
                        return (
                            <AccordionItem key={index} value={itemValue}>
                                <AccordionTrigger className="flex justify-between items-center w-full text-left py-4 px-6 bg-gray-100 rounded-lg focus:outline-none focus:ring-0">
                                    <span className="flex-1">{item.question}</span>
                                    {isOpen ? (
                                        <Minus className="w-5 h-5" />
                                    ) : (
                                        <Plus className="w-5 h-5" />
                                    )}
                                </AccordionTrigger>
                                <AccordionContent className="overflow-hidden p-0 data-[state=open]:px-6 data-[state=open]:py-6 data-[state=open]:bg-gray-200 data-[state=open]:rounded-b-lg data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                    <p className="text-gray-700 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </section>
    );
};

export default FAQSection;
