import LandingLayout from '@/components/landing-layout';
import {Armchair, Bike, Gamepad2, MoreHorizontal, Mountain, Sparkles, Umbrella, Wrench} from "lucide-react";

export default function Home() {
    return (
        <LandingLayout
            pageTitle="Alquila lo que quieras | Appquilar"
            metaDescription="Encuentra y alquila productos. ¡Empieza hoy mismo con Appquilar!"
            heroProps={{
                title: 'Alquila lo que necesitas',
                subtitle: 'Desde herramientas hasta equipamiento de camping. ¡Rápido y fácil!',
                color: "primary",
                eventTypes: [
                    "para tu evento",
                    "para la playa",
                    "para tu acampada",
                    "para tu trabajo",
                    "para tu bricolaje"
                ]
            }}
            categoriesGridProps={{
                categories: [
                    {
                        name: "Cosas para la playa",
                        icon: Umbrella,
                        description: "Sombrillas, sillas de playa, neveras portátiles"
                    },
                    {
                        name: "Cosas para el camping",
                        icon: Mountain,
                        description: "Tiendas de campaña, sacos de dormir, hornillos"
                    },
                    {
                        name: "Herramientas",
                        icon: Wrench,
                        description: "Taladros, sierras, equipamiento profesional"
                    },
                    {
                        name: "Sillas y mesas",
                        icon: Armchair,
                        description: "Mobiliario para eventos y celebraciones"
                    },
                    {
                        name: "Decoración para eventos",
                        icon: Sparkles,
                        description: "Centros de mesa, iluminación, elementos decorativos"
                    },
                    {
                        name: "Bicicletas",
                        icon: Bike,
                        description: "Bicicletas de montaña, urbanas, eléctricas"
                    },
                    {
                        name: "Consolas",
                        icon: Gamepad2,
                        description: "PlayStation, Xbox, Nintendo, accesorios gaming"
                    },
                    {
                        name: "Y mucho más",
                        icon: MoreHorizontal,
                        description: "Descubre todas las categorías disponibles"
                    }
                ]
            }}
        />
    );
}
