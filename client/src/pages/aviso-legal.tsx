import {LegalTemplate} from "@/pages/legal-template";

const html = `<h2>1. Identificación del Titular</h2>
<p>
  Titular: Appquilar<br>
  Domicilio: Mataró<br>
  Email: <a href="mailto:appquilar.contacto@gmail.com">appquilar.contacto@gmail.com</a><br>
  Dominio: https://appquilar.com<br>
</p>

<h2>2. Objeto del Sitio</h2>
<p>
  El sitio web <a href="https://appquilar.com">https://appquilar.com.</a> (en adelante, el "Sitio") ofrece una plataforma de intermediación para la publicación y búsqueda de artículos en alquiler. El titular no es parte en las transacciones de alquiler entre usuarios ni gestiona los pagos entre arrendador y arrendatario.
</p>

<h2>3. Condiciones de Uso</h2>
<p>
  El acceso y uso del Sitio implica la aceptación de este Aviso Legal y del resto de textos legales. El usuario se compromete a un uso lícito, diligente y conforme a la normativa vigente.
</p>

<h2>4. Propiedad Intelectual e Industrial</h2>
<p>
  Salvo indicación expresa, los contenidos del Sitio (textos, imágenes, logotipos, software, diseño) pertenecen al Titular o a terceros licenciantes. Queda prohibida su reproducción, distribución o comunicación pública sin autorización.
</p>

<h2>5. Enlaces</h2>
<p>
  Los enlaces a sitios de terceros se facilitan para conveniencia. El Titular no responde de sus contenidos ni de daños derivados de su uso.
</p>

<h2>6. Exclusión de Responsabilidad</h2>
<p>
  El Titular no garantiza la veracidad de la información proporcionada por usuarios ni el estado/seguridad de los artículos anunciados. Cualquier operación entre usuarios se realiza bajo su exclusiva responsabilidad.
</p>

<h2>7. Disponibilidad y Seguridad</h2>
<p>
  El Titular procura la continuidad del servicio y la seguridad del Sitio, sin garantizar la ausencia de interrupciones o elementos maliciosos.
</p>

<h2>8. Ley Aplicable y Jurisdicción</h2>
<p>
  Este Aviso Legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de España, salvo norma imperativa en contrario.
</p>`;

export function AvisoLegalPage() {
    return (
        <LegalTemplate title="Aviso Legal" updatedAt="2025-08-16">
            <div
                className="prose prose-neutral max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </LegalTemplate>
    );
}
