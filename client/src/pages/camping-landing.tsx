import LandingLayout from '@/components/landing-layout';
import {
    Bike,
    Binoculars,
    Caravan,
    FlameKindling,
    Flashlight,
    MoreHorizontal,
    RockingChair,
    TentTree
} from "lucide-react";

interface CampingLandingProps {
    province?: string;
}

export default function CampingLanding({ province }: CampingLandingProps) {
    const provinceSuffix = province ? ` en ${province}` : ' ';

    return (
        <LandingLayout
            pageTitle={`Alquila lo que quieras para ir de cámping${provinceSuffix} | Appquilar`}
            metaDescription={`Encuentra y alquila productos para ir de cámping${provinceSuffix}. ¡Empieza hoy mismo con Appquilar!`}
            heroProps={{
                title: 'Puedes alquilar',
                subtitle: 'Por si nunca has ido de cámping y quieres probarlo... ¡Rápido y fácil!',
                color: "primary",
                eventTypes: [
                    'una tienda de campaña',
                    'cuatro sillas',
                    'un cámping-gas',
                    'un saco de dormir'
                ]
            }}
            categoriesGridProps={{
                categories: [
                    {
                        name: "Tiendas de campaña",
                        description: "Alquila tiendas de campaña resistentes para disfrutar de acampadas cómodas",
                        icon: TentTree,
                    },
                    {
                        name: "Linternas",
                        description: "Encuentra linternas potentes para iluminar tus noches bajo las estrellas",
                        icon: Flashlight,
                    },
                    {
                        name: "Cámping-gas",
                        description: "Alquila equipos de cámping‑gas seguros para cocinar cómodamente en plena naturaleza",
                        icon: FlameKindling,
                    },
                    {
                        name: "Sillas y mesas",
                        description: "Disponibles sillas y mesas plegables para descansar y comer al aire libre",
                        icon: RockingChair,
                    },
                    {
                        name: "Caravanas",
                        description: "Explora caravanas espaciosas con todas las comodidades para viajes inolvidables",
                        icon: Caravan,
                    },
                    {
                        name: "Bicicletas",
                        description: "Alquila bicicletas robustas para recorrer senderos y descubrir nuevos paisajes",
                        icon: Bike,
                    },
                    {
                        name: "Gadgets necesarios",
                        description: "Lleva gadgets esenciales como mochilas, brújulas y kits de supervivencia",
                        icon: Binoculars,
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
