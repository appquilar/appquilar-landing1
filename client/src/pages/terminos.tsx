import {LegalTemplate} from "@/pages/legal-template";

const html = `<p>
  Estos términos regulan el acceso y uso de {{DOMAIN}} (el “Sitio”) y las condiciones aplicables a la suscripción premium (modelo freemium).
  El Titular actúa exclusivamente como <strong>intermediario</strong> entre usuarios y no participa en las transacciones de alquiler entre arrendadores y arrendatarios.
</p>

<h2>1. Registro de usuario</h2>
<p>
  Para publicar o contactar, puede requerirse registro con datos veraces y una contraseña bajo custodia del usuario.
  La edad mínima recomendada es de 14 años (o consentimiento de padres/tutores si aplica).
</p>

<h2>2. Funcionamiento y roles</h2>
<ul>
  <li><strong>Arrendador</strong>: publica artículos, fija condiciones y responde por su veracidad, licitud y estado.</li>
  <li><strong>Arrendatario</strong>: contacta y, en su caso, formaliza el alquiler directamente con el arrendador.</li>
</ul>
<p>
  El Titular no es propietario de los artículos ni interviene en los pagos entre usuarios.
</p>

<h2>3. Contenidos y artículos prohibidos</h2>
<p>
  Queda prohibida la publicación de artículos ilícitos, peligrosos, falsificados o cuyo alquiler esté restringido por normativa; así como contenidos que infrinjan derechos de terceros.
  El Titular podrá moderar, ocultar o retirar anuncios y suspender cuentas.
</p>

<h2>4. Responsabilidad del usuario</h2>
<ul>
  <li>Veracidad y licitud de datos y anuncios.</li>
  <li>Estado, seguridad y entrega/recogida de los artículos.</li>
  <li>Cumplimiento de la normativa aplicable (consumo, garantías, seguridad de producto, fiscalidad, etc.).</li>
</ul>

<h2>5. Limitación de responsabilidad del Titular</h2>
<p>
  El Titular no garantiza la disponibilidad continua del Sitio ni la ausencia de errores.
  No responde por daños, pérdidas o incumplimientos derivados de relaciones entre usuarios, ni por el uso indebido de la plataforma.
</p>

<h2>6. Suscripción Premium (condiciones de contratación)</h2>
<ul>
  <li><strong>Precio y facturación</strong>: según se indique en el proceso de alta ({{PREMIUM_PRICE_INFO}}).</li>
  <li><strong>Periodicidad y renovación</strong>: mensual/anual con renovación automática hasta cancelación.</li>
  <li><strong>Pago</strong>: mediante {{PAYMENT_PROVIDER}}. Pueden aplicarse comisiones del emisor.</li>
  <li><strong>Desistimiento (consumidores)</strong>: 14 días naturales desde la contratación. Si solicitas acceso inmediato a funcionalidades premium, aceptas que, si se presta el servicio durante el periodo de desistimiento, el reembolso podrá ser proporcional a la parte no disfrutada.</li>
  <li><strong>Cancelación</strong>: efectiva para el siguiente periodo de facturación si se solicita antes de la fecha de renovación.</li>
  <li><strong>Botón con obligación de pago</strong>: el flujo de contratación indicará claramente la aceptación del cargo y de estas condiciones.</li>
  <li><strong>Confirmación</strong>: recibirás confirmación por email tras la contratación.</li>
</ul>

<h2>7. Precios y modificaciones</h2>
<p>
  Podemos actualizar precios o funcionalidades con aviso razonable. Los cambios no afectan al periodo ya pagado.
</p>

<h2>8. Propiedad intelectual</h2>
<p>
  El usuario declara ser titular de los derechos necesarios sobre los contenidos que publique y concede al Titular una licencia no exclusiva para mostrar dichos anuncios en el Sitio.
</p>

<h2>9. Notificaciones y contacto</h2>
<p>
  Preferentemente por email a <a href="mailto:{{COMPANY_EMAIL}}">{{COMPANY_EMAIL}}</a>.
</p>

<h2>10. Duración y terminación</h2>
<p>
  Puedes cerrar tu cuenta en cualquier momento. Podemos suspender o terminar el servicio por incumplimientos, uso fraudulento, riesgos de seguridad o requerimiento legal.
</p>

<h2>11. Protección de datos</h2>
<p>
  El tratamiento de datos se rige por la <strong>Política de Privacidad</strong> (documento separado).
</p>

<h2>12. Ley aplicable y jurisdicción</h2>
<p>
  Estos Términos se rigen por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de {{JURISDICTION_CITY}}, salvo norma imperativa en contrario.
</p>`;

export function TerminosPage() {
    return (
        <LegalTemplate title="Términos y Condiciones" updatedAt="2025-08-16">
            <div
                className="prose prose-neutral max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </LegalTemplate>
    );
}
