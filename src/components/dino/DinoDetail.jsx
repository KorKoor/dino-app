import { useState, useEffect } from 'react';

export default function DinoDetail({ dino, onClose }) {
  const [isDecrypting, setIsDecrypting] = useState(true);
  const [dnaSequence, setDnaSequence] = useState("A-T-C-G");

  // Efecto de "Hackeo / Secuenciación"
  useEffect(() => {
    // Generador de secuencias de ADN aleatorias
    const bases = ['A', 'T', 'C', 'G'];
    const interval = setInterval(() => {
      setDnaSequence(
        Array.from({ length: 12 }).map(() => bases[Math.floor(Math.random() * bases.length)]).join('')
      );
    }, 50);

    // Terminar la desencriptación después de 1.2 segundos
    const timer = setTimeout(() => {
      clearInterval(interval);
      setIsDecrypting(false);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  // Prevenir scroll en el body cuando el panel está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'auto';
  }, []);

  if (!dino) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* BACKDROP BLUR (Clic para cerrar) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
      ></div>

      {/* PANEL LATERAL BRUTALISTA */}
      <aside className="relative w-full max-w-2xl h-full bg-[var(--code-bg)] border-l-2 border-[var(--accent)] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.8)] animate-[slideIn_0.4s_cubic-bezier(0.19,1,0.22,1)]">
        
        {/* HEADER DEL PANEL */}
        <header className="flex justify-between items-center p-6 border-b border-[var(--border)] bg-[var(--bg)]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[var(--accent)] animate-pulse shadow-[0_0_10px_var(--accent)]"></span>
            <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)]">
              DATA_CORE // {dino.id}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-[var(--text)] hover:text-[var(--accent)] transition-colors p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </header>

        {/* ÁREA DE CONTENIDO */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          
          {isDecrypting ? (
            /* ESTADO 1: DESENCRIPTANDO (LOADING) */
            <div className="h-full flex flex-col items-center justify-center font-mono">
              <svg className="w-16 h-16 text-[var(--accent)] animate-spin mb-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              <h2 className="text-xl font-black uppercase tracking-[0.5em] text-[var(--text-h)] mb-4 animate-pulse">
                Desencriptando_ADN
              </h2>
              <p className="text-[var(--accent)] text-lg tracking-[0.5em] opacity-80 break-all text-center">
                {dnaSequence}
              </p>
              <div className="w-64 h-1 bg-white/10 mt-8 overflow-hidden">
                <div className="h-full bg-[var(--accent)] animate-[load_1.2s_ease-out_forwards]"></div>
              </div>
            </div>
          ) : (
            /* ESTADO 2: DATOS REVELADOS */
            <div className="animate-[reveal_0.5s_ease-out]">
              
              <div className="mb-10">
                <h1 className="text-5xl font-black uppercase italic tracking-tighter text-[var(--text-h)] leading-none mb-2">
                  {dino.name}
                </h1>
                <p className="font-mono text-sm text-[var(--accent)] opacity-80 tracking-widest">
                  {dino.scientificName}
                </p>
              </div>

              {/* SECCIÓN: CLASIFICACIÓN (Bento Grid) */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4 border-b border-[var(--border)] pb-2">
                  <span className="text-[var(--accent)]">▼</span>
                  <h4 className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text)]">Taxonomía</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(dino.classification).map(([key, value]) => (
                    <div key={key} className="bg-black/30 border border-[var(--border)] p-3">
                      <span className="block text-[8px] font-mono text-[var(--text)] uppercase opacity-60 mb-1">{key}</span>
                      <span className="text-xs font-bold text-[var(--text-h)] uppercase tracking-wider">{value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECCIÓN: DISCOVERY INFO */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4 border-b border-[var(--border)] pb-2">
                  <span className="text-[var(--accent)]">▼</span>
                  <h4 className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text)]">Expediente_de_Extracción</h4>
                </div>
                <ul className="space-y-3 font-mono text-xs text-[var(--text)]">
                  <li className="flex gap-4"><span className="opacity-50 w-24">Año:</span> <span className="text-[var(--text-h)]">{dino.discoveryInfo.firstDiscovered}</span></li>
                  <li className="flex gap-4"><span className="opacity-50 w-24">Autor:</span> <span className="text-[var(--text-h)]">{dino.discoveryInfo.discoveredBy}</span></li>
                  <li className="flex gap-4"><span className="opacity-50 w-24">Sector:</span> <span className="text-[var(--text-h)]">{dino.discoveryInfo.discoveryLocation}</span></li>
                </ul>
              </section>

              {/* SECCIÓN: DATOS CLASIFICADOS (Fun Facts) */}
              <section>
                <div className="flex items-center gap-2 mb-4 border-b border-[var(--border)] pb-2">
                  <span className="text-red-500 animate-pulse">●</span>
                  <h4 className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text)]">Archivos_Clasificados</h4>
                </div>
                <div className="space-y-4">
                  {dino.funFacts.map((fact, i) => (
                    <div key={i} className="flex gap-4 bg-[var(--accent-bg)] border-l-2 border-[var(--accent)] p-4">
                      <span className="font-mono text-[10px] text-[var(--accent)]">0{i + 1}</span>
                      <p className="text-sm italic font-medium text-[var(--text-h)]">{fact}</p>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          )}
        </div>
      </aside>

      {/* Estilos locales para las animaciones del panel */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--accent); }
      `}</style>
    </div>
  );
}