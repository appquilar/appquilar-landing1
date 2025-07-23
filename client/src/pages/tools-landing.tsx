import LandingLayout from '@/components/landing-layout';

export default function ToolsLanding() {
    return (
        <LandingLayout
            pageTitle="Alquila las herramientas que necesites | Appquilar"
            metaDescription="Encuentra y alquila herramientas. ¡Empieza hoy mismo con Appquilar!"
            heroProps={{
                title: 'Puedes alquilar',
                subtitle: 'Desde alicates hasta máquinas desbrozadoras. ¡Rápido y fácil!',
                color: "primary",
                eventTypes: [
                    'una tienda de campaña'
                ]
            }}
        />
    );
}
