import LandingLayout from '@/components/landing-layout';
import {
    BrushCleaning,
    Forklift,
    MoreHorizontal,
    Hammer,
    Drill,
    Leaf,
    Shield
} from "lucide-react";

interface ToolsLandingProps {
    province?: string;
}

export default function ToolsLanding({ province }: ToolsLandingProps) {
    const provinceSuffix = province ? ` en ${province}` : '';

    return (
        <LandingLayout
            pageTitle={`Alquila las herramientas que necesites${provinceSuffix} | Appquilar`}
            metaDescription={`Encuentra y alquila herramientas${provinceSuffix}. ¡Empieza hoy mismo con Appquilar!`}
            heroProps={{
                title: 'Puedes alquilar',
                subtitle: 'Desde alicates hasta máquinas desbrozadoras. ¡Rápido y fácil!',
                color: "primary",
                eventTypes: [
                    'herramientas pequeñas',
                    'maquinaria',
                    'productos de limpieza',
                    'herramientas para el taller',
                    'herramientas para jardinería',
                    'herramientas para fontanería',
                    'equipos de protección personal',
                ]
            }}
            categoriesGridProps={{
                categories: [
                    {
                        name: "Herramientas Pequeñas",
                        description: "Alquila alicates, destornilladores o tenazas para tus proyectos domésticos",
                        icon: Drill,
                    },
                    {
                        name: "Maquinaria",
                        description: "Disfruta del alquiler de maquinaria pesada para obras con garantía",
                        icon: Forklift,
                    },
                    {
                        name: "Productos de Limpieza",
                        description: "Alquila productos de limpieza profesionales para mantener tu espacio impecable",
                        icon: BrushCleaning,
                    },
                    {
                        name: "Herramientas para el taller",
                        description: "Encuentra herramientas de taller de alta calidad para tus reparaciones",
                        icon: Hammer,
                    },
                    {
                        name: "Herramientas para la jardinería",
                        description: "Alquila herramientas de jardinería robustas para cuidar tu jardín fácilmente",
                        icon: Leaf,
                    },
                    {
                        name: "Equipos de protección personal",
                        description: "Consigue equipos de protección personal certificados para trabajar con seguridad",
                        icon: Shield,
                    },
                    {
                        name: "Y mucho más",
                        icon: MoreHorizontal,
                        description: "Descubre todas las categorías disponibles"
                    }
                ]
            }}
            isTestimonialsVisible={false}
        />
    );
}
