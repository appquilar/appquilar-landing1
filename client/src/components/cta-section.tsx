import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">¿Listo para empezar?</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Únete a nuestra plataforma y simplifica tus eventos.
          </p>
          <div className="mt-8 flex justify-center gap-6">

            <div className="flex justify-center">
              <a href="https://forms.fillout.com/t/oBy96bmpk8us" rel="noopener noreferrer">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-primary flex items-center gap-2"
                >
                  Me interesa
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
