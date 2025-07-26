import iconLogo from "@assets/pelota-blanco.png";
import textLogo from "@assets/logo-blanco.png";

export default function Footer() {
    return (
        <footer className="bg-zinc-500 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4">
                        <img src={iconLogo} alt="Logo icono" className="h-8 w-auto" />
                        <img src={textLogo} alt="Appquilar logo" className="ml-2 h-6 w-auto" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
