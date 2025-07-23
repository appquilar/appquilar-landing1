import LandingLayout from '@/components/landing-layout';
import {RockingChair, Bike, Binoculars, MoreHorizontal, Flashlight, Caravan, TentTree, FlameKindling} from "lucide-react";

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
                color: "green",
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
                        icon: TentTree,
                    },
                    {
                        name: "Linternas",
                        icon: Flashlight,
                    },
                    {
                        name: "Cámping-gas",
                        icon: FlameKindling,
                    },
                    {
                        name: "Sillas y mesas",
                        icon: RockingChair,
                    },
                    {
                        name: "Caravanas",
                        icon: Caravan,
                    },
                    {
                        name: "Bicicletas",
                        icon: Bike,
                    },
                    {
                        name: "Gadgets necesarios",
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
