import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white">¿Listo para empezar?</h2>
        <p className="mt-4 text-xl text-white text-opacity-90 max-w-2xl mx-auto">
          Únete a nuestra comunidad y transforma la forma en que organizas o equipas eventos.
        </p>
        <div className="mt-8 flex justify-center flex-wrap gap-4">
          <a href="#registro-usuarios">
            <Button variant="secondary" size="lg" className="text-primary font-semibold">
              Registrarme como Usuario
            </Button>
          </a>
          <a href="#registro-empresas">
            <Button variant="default" size="lg" className="bg-amber-500 hover:bg-amber-600 font-semibold border-none">
              Registrarme como Empresa
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
