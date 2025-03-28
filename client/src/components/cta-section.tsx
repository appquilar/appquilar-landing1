import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-bold text-gray-900">¿Listo para empezar?</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Únete a nuestra plataforma y simplifica tus eventos.
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <Button
              variant="outline"
              size="lg"
              className="border-amber-500 text-amber-500 hover:bg-amber-500/5 flex items-center gap-2"
              onClick={() => window.dispatchEvent(new CustomEvent('open-user-modal'))}
            >
              Para clientes
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              variant="default"
              size="lg"
              className="bg-primary flex items-center gap-2"
              onClick={() => window.dispatchEvent(new CustomEvent('open-company-modal'))}
            >
              Para empresas
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
