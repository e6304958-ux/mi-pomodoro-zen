import { useEffect, useRef } from 'react';
import { AD_SNIPPET_HTML } from '@/lib/ads';

export default function AdBanner() {
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot || !AD_SNIPPET_HTML) return;

    slot.innerHTML = AD_SNIPPET_HTML;
    slot.querySelectorAll('script').forEach((inertScript) => {
      const script = document.createElement('script');
      for (const attr of Array.from(inertScript.attributes)) {
        script.setAttribute(attr.name, attr.value);
      }
      script.textContent = inertScript.textContent;
      inertScript.replaceWith(script);
    });

    return () => {
      slot.innerHTML = '';
    };
  }, []);

  return (
    <footer className="px-6 pb-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-[728px] flex-col items-center gap-3">
        <span className="text-[11px] uppercase tracking-[0.3em] text-zen-500">Publicidad</span>
        <div className="isolate relative flex min-h-[90px] w-full items-center justify-center overflow-hidden rounded-2xl border border-zen-700/70 bg-zen-800/30 p-3 transition-colors duration-300 hover:border-zen-600">
          {!AD_SNIPPET_HTML && (
            <code className="px-4 text-center font-mono text-xs text-zen-400">
              {'<!-- INSERTAR AQUÍ CÓDIGO DE ANUNCIOS HORIZONTAL DE GOOGLE ADSENSE -->'}
            </code>
          )}
          <div ref={slotRef} id="ad-slot" className="flex max-w-full items-center justify-center" />
        </div>
      </div>
    </footer>
  );
}
