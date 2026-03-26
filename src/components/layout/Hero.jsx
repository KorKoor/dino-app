import { useEffect, useState, useRef } from 'react';

// RECIBIMOS setActiveTab COMO PROP
export default function Hero({ setActiveTab }) {
  // 1. PERFORMANCE: Usamos ref para el parallax
  const bgRef = useRef(null);
  
  // 2. LIVE DATA: Estado para la gráfica de barras
  const [neuralFeed, setNeuralFeed] = useState([40, 70, 45, 90, 65, 80, 30, 50, 85, 40]);

  // Efecto Parallax Optimizado (Hardware Accelerated)
  useEffect(() => {
    const handleMove = (e) => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      bgRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Simulador de Live Feed para la Actividad Neuronal
  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralFeed(prev => prev.map(() => Math.floor(Math.random() * 70) + 15));
    }, 450);
    return () => clearInterval(interval);
  }, []);

  // NUEVO: Función para iniciar el protocolo
  const handleStartProtocol = () => {
    // 1. Aseguramos que la vista principal esté activa
    if (setActiveTab) {
      setActiveTab('Data_Samples');
    }
    // 2. Deslizamos la pantalla hacia abajo, descontando ~80px del Navbar
    window.scrollTo({
      top: window.innerHeight - 80, 
      behavior: 'smooth'
    });
  };

  return (
    <header className="relative w-full border-b-2 border-[var(--border)] bg-[var(--bg)] overflow-hidden">
      
      {/* BACKGROUND LAYER OPTIMIZADO */}
      <div 
        ref={bgRef}
        className="absolute inset-[-50px] opacity-[0.04] pointer-events-none transition-transform duration-75 ease-out will-change-transform"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-repeat"></div>
      </div>

      <div className="relative mx-auto flex flex-col lg:flex-row items-stretch z-10">
        
        {/* COLUMNA IZQUIERDA: Tipografía Brutalista */}
        <div className="flex-1 p-10 lg:p-20 border-r-2 border-[var(--border)] flex flex-col justify-center relative">
          
          <div className="space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent)] text-[var(--bg)] shadow-[4px_4px_0px_var(--accent-border)]">
              <span className="w-2 h-2 bg-[var(--bg)] rounded-full animate-pulse"></span>
              <span className="font-mono text-[10px] font-black uppercase tracking-tighter">
                Secure_Connection: Established
              </span>
            </div>
            <div className="flex items-center gap-4 text-[var(--text)] opacity-50 font-mono text-[9px] uppercase tracking-[0.4em]">
              <span>Lat: 44.3106° N</span>
              <span className="text-[var(--accent)]">//</span>
              <span>Long: 104.2961° W</span>
            </div>
          </div>

          <h1 className="group cursor-crosshair text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase italic leading-[0.85] tracking-tighter text-[var(--text-h)] mb-12">
            MESOZOIC <br />
            <span className="text-transparent [-webkit-text-stroke:2px_var(--text-h)] group-hover:text-[var(--accent)] group-hover:[-webkit-text-stroke:2px_var(--accent)] transition-all duration-500">
              ARCHIVE
            </span>
          </h1>

          <div className="max-w-xl border-l-4 border-[var(--accent)] pl-6 py-1 relative">
            <div className="absolute -left-[4px] top-0 w-1 h-4 bg-[var(--text-h)]"></div>
            <p className="text-lg md:text-xl font-medium leading-relaxed text-[var(--text)] italic">
              "La extinción es solo una falla en la transferencia de datos. Estamos aquí para <span className="text-[var(--text-h)] font-black uppercase not-italic">restaurar la secuencia</span>."
            </p>
          </div>
        </div>

        {/* COLUMNA DERECHA: Bento Stats (Vida Visual) */}
        <div className="w-full lg:w-[450px] bg-[var(--code-bg)] p-10 flex flex-col gap-10 justify-between relative border-t-2 lg:border-t-0 border-[var(--border)]">
          
          {/* Stat 1: Contador de Especies */}
          <div className="group cursor-default">
            <div className="flex justify-between items-end mb-2">
              <span className="block text-[10px] font-black opacity-40 uppercase tracking-widest">Especies_Catalogadas</span>
              <span className="text-[8px] font-mono text-[var(--accent)] animate-pulse">SYNCING...</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-black text-[var(--text-h)] group-hover:text-[var(--accent)] transition-colors duration-500">25</span>
              <span className="text-xs font-mono font-bold opacity-40">/ 1,000+ EN COLA</span>
            </div>
            <div className="mt-4 flex gap-1 h-1.5 overflow-hidden">
               {[...Array(20)].map((_, i) => (
                 <div key={i} className={`flex-1 transition-all duration-500 ${i < 12 ? 'bg-[var(--accent)]' : 'bg-[var(--text)] opacity-20'}`}></div>
               ))}
            </div>
          </div>

          {/* Stat 2: Actividad de Red */}
          <div className="border-2 border-[var(--border)] p-6 relative overflow-hidden bg-black/40">
             <div className="absolute top-0 right-0 p-2 text-[8px] font-mono opacity-50 text-[var(--accent)]">LIVE_FEED</div>
             <span className="block text-[10px] font-black opacity-40 uppercase tracking-widest mb-6">Neural_Activity</span>
             <div className="flex items-end gap-[2px] h-20">
                {neuralFeed.map((height, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-[var(--accent)] opacity-40 transition-all duration-300 ease-out" 
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
             </div>
             <div className="w-full h-[1px] bg-[var(--accent)] opacity-50 mt-1"></div>
          </div>

          {/* Call to Action: CONECTADO AL ONCLICK */}
          <button 
            onClick={handleStartProtocol}
            className="group relative w-full h-16 bg-[var(--text-h)] text-[var(--bg)] font-black uppercase text-xs sm:text-sm tracking-[0.3em] transition-all hover:bg-[var(--accent)] overflow-hidden shadow-[6px_6px_0px_var(--accent-border)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[load_1s_ease-in-out_infinite]"></div>
            
            <span className="relative z-10 flex items-center justify-center gap-4 transition-transform group-active:scale-95">
              Iniciar_Protocolo_S4
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="group-hover:translate-x-2 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </button>

        </div>
      </div>

      {/* DETALLE TÉCNICO */}
      <div className="hidden md:flex absolute right-4 top-0 h-full flex-col justify-between py-12 opacity-30 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[9px] font-mono font-bold text-[var(--accent)]">0.{8 - i}</span>
            <div className="w-6 h-[2px] bg-[var(--text-h)]"></div>
          </div>
        ))}
      </div>
    </header>
  );
}