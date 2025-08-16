// src/components/CookieConsent.tsx
import { useEffect, useMemo, useState } from "react";

const VERSION = "v1";
const DEFAULT_STORAGE_KEY = "cookie-consent:" + VERSION;

type ConsentState = {
    necessary: boolean;   // always true
    analytics: boolean;   // GA / GTM analytics
    marketing: boolean;   // FB Pixel / GTM ads
};

type Props = {
    gaId?: string;           // Leave undefined if you trigger GA via GTM
    fbPixelId?: string;      // Leave undefined if you trigger Pixel via GTM
    storageKey?: string;
};

/* ========== Storage helpers ========== */
function getStoredConsent(storageKey: string): ConsentState | null {
    try {
        const raw = localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}
function saveConsent(storageKey: string, consent: ConsentState) {
    localStorage.setItem(storageKey, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent("cookie-consent:updated", { detail: consent }));
}

/* ========== GA (standalone) ========== */
function loadGA(gaId?: string) {
    if (!gaId) return;

    // If gtag exists we can (re)config and return
    if ((window as any).gtag) {
        (window as any).gtag("config", gaId, { anonymize_ip: true });
        return;
    }

    // Load GA library + bootstrap gtag queue
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag() { (window as any).dataLayer.push(arguments); }
    (window as any).gtag = gtag;
    gtag("js", new Date());
    gtag("config", gaId, { anonymize_ip: true });
}
function unloadGA() {
    // Neutralize future sends
    (window as any).gtag = undefined;
}

/* ========== GTM (only if consent allows) ========== */
function loadGTM(gaId?: string) {
    if (!gaId) return;

    // If GTM already inserted, do nothing
    if (document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${gaId}"]`)) return;

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

    const gtm = document.createElement("script");
    gtm.async = true;
    gtm.src = `https://www.googletagmanager.com/gtm.js?id=${gaId}`;
    document.head.appendChild(gtm);
}

/* ========== Facebook Pixel (with proper re-init) ========== */
function bootstrapFBStub() {
    // Create the stub regardless of previous state; queued calls will flush when fbevents.js loads
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq && (f.fbq as any).push) return; // already the real stub/instance
        n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        (n as any).push = n;
        (n as any).loaded = false;
        (n as any).version = "2.0";
        (n as any).queue = [];
        t = b.createElement(e); t.async = true; t.src = "https://connect.facebook.net/en_US/fbevents.js";
        s = b.getElementsByTagName(e)[0]; s.parentNode!.insertBefore(t, s);
    })(window, document, "script");
}
function loadFBPixel(pixelId?: string) {
    if (!pixelId) return;
    bootstrapFBStub();
    (window as any).fbq("init", pixelId);
}
function revokeFBPixel() {
    // Clean so a subsequent grant can fully re-bootstrap
    try { delete (window as any).fbq; } catch { (window as any).fbq = undefined; }
    try { delete (window as any)._fbq; } catch { (window as any)._fbq = undefined; }
}
function applyFBConsent(pixelId?: string, granted?: boolean) {
    if (!pixelId) return;
    if (granted) {
        loadFBPixel(pixelId);
        (window as any).fbq?.("consent", "grant");
        (window as any).fbq?.("track", "PageView");
    } else {
        (window as any).fbq?.("consent", "revoke");
        revokeFBPixel();
    }
}

/* ========== Component ========== */
export function CookieConsent({
                                          gaId,
                                          fbPixelId,
                                          storageKey = DEFAULT_STORAGE_KEY,
                                      }: Props) {
    const [bannerVisible, setBannerVisible] = useState<boolean>(() => !getStoredConsent(storageKey));
    const [panelOpen, setPanelOpen] = useState<boolean>(false);
    const [consent, setConsent] = useState<ConsentState>(() => {
        return getStoredConsent(storageKey) ?? { necessary: true, analytics: false, marketing: false };
    });

    // Public opener for header/footer link
    useEffect(() => {
        (window as any).openCookieSettings = () => setPanelOpen(true);
    }, []);

    // Apply consent to vendors
    useEffect(() => {
        // If you orchestrate via GTM, load GTM ONLY when at least one non-essential is granted
        if (gaId && (consent.analytics || consent.marketing)) {
            loadGTM(gaId);
        }

        // GA standalone (skip if you run GA inside GTM and leave gaId undefined)
        if (gaId) {
            if (consent.analytics) loadGA(gaId);
            else unloadGA();
        }

        // Facebook Pixel (skip if managed via GTM and leave fbPixelId undefined)
        applyFBConsent(fbPixelId, consent.marketing);
    }, [consent.analytics, consent.marketing, gaId, fbPixelId]);

    const acceptAll = () => {
        const next: ConsentState = { necessary: true, analytics: true, marketing: true };
        setConsent(next); saveConsent(storageKey, next); setPanelOpen(false); setBannerVisible(false);
    };
    const rejectAll = () => {
        const next: ConsentState = { necessary: true, analytics: false, marketing: false };
        setConsent(next); saveConsent(storageKey, next); setPanelOpen(false); setBannerVisible(false);
    };
    const saveChoices = () => {
        saveConsent(storageKey, consent); setPanelOpen(false); setBannerVisible(false);
    };

    // Bottom banner
    const Banner = useMemo(() => {
        if (!bannerVisible) return null;
        return (
            <div className="fixed inset-x-0 bottom-0 z-[60] bg-white border-t border-gray-200 shadow-lg">
                <div className="max-w-7xl mx-auto p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm text-gray-700">
                        Utilizamos tecnologías como las cookies para almacenar y/o acceder a la información del dispositivo. El consentimiento de estas tecnologías nos permitirá procesar datos como el comportamiento de navegación o las identificaciones únicas en este sitio. No consentir o retirar el consentimiento, puede afectar negativamente a ciertas características y funciones.
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <button onClick={rejectAll} className="px-3 py-2 text-sm border rounded-md">Rechazar</button>
                        <button onClick={() => setPanelOpen(true)} className="px-3 py-2 text-sm border rounded-md">Configurar</button>
                        <button onClick={acceptAll} className="px-3 py-2 text-sm rounded-md bg-black text-white">Aceptar</button>
                    </div>
                </div>
            </div>
        );
    }, [bannerVisible]);

    return (
        <>
            {Banner}
            {panelOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setPanelOpen(false)} />
                    <div className="relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-xl p-6">
                        <h2 className="text-xl font-semibold mb-2">Preferencias de cookies</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Ajusta qué categorías de cookies permites. Las necesarias siempre están activas.
                        </p>

                        <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Necesarias</h3>
                                        <p className="text-sm text-gray-600">Imprescindibles para el funcionamiento básico (login, seguridad).</p>
                                    </div>
                                    <input type="checkbox" checked readOnly className="h-4 w-4" />
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Analítica (GA4 / GTM)</h3>
                                        <p className="text-sm text-gray-600">Nos ayudan a entender el uso para mejorar la plataforma.</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4"
                                        checked={!!consent.analytics}
                                        onChange={(e) => setConsent((c) => ({ ...c, analytics: e.target.checked }))}
                                    />
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Marketing (Facebook Pixel / GTM)</h3>
                                        <p className="text-sm text-gray-600">Permiten personalizar publicidad y medir campañas.</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4"
                                        checked={!!consent.marketing}
                                        onChange={(e) => setConsent((c) => ({ ...c, marketing: e.target.checked }))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <button onClick={rejectAll} className="px-3 py-2 text-sm border rounded-md">Rechazar todo</button>
                            <button onClick={saveChoices} className="px-3 py-2 text-sm border rounded-md">Guardar preferencias</button>
                            <button onClick={acceptAll} className="px-3 py-2 text-sm rounded-md bg-black text-white">Aceptar todo</button>
                        </div>

                        <button
                            onClick={() => setPanelOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                            aria-label="Cerrar"
                            title="Cerrar"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
