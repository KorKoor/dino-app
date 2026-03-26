import { useState, useEffect } from 'react';

// 1. Recibimos los props desde App.jsx
export default function Navbar({ activeTab, setActiveTab }) {
  const [sysTime, setSysTime] = useState("");

  // UX LOOP: Reloj en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const ms = String(now.getMilliseconds()).padStart(3, '0').substring(0, 2);
      setSysTime(`${hours}:${mins}:${secs}:${ms}`);
    }, 47);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md shadow-[0_4px_30px_var(--accent-bg)]">
      
      {/* BARRA SUPERIOR DE METADATA */}
      <div className="w-full bg-[var(--text-h)] px-6 py-1 flex justify-between items-center text-[8px] font-mono font-black uppercase tracking-[0.3em] text-[var(--bg)]">
        <span>Subnet: 192.168.4.15 // Gateway_Active</span>
        <span className="hidden md:block opacity-70">Uplink_Speed: 10Gbps</span>
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        
        {/* LOGO: Al hacer clic, nos devuelve a la pantalla principal */}
        <div 
          className="flex flex-col group cursor-pointer"
          onClick={() => setActiveTab && setActiveTab('Data_Samples')}
        >
          <div className="flex items-end gap-3 mb-1">
            <div className="bg-[var(--accent)] text-[var(--bg)] px-3 py-0.5 font-black text-2xl tracking-tighter shadow-[4px_4px_0px_var(--accent-border)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
              DINO-OS
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-[var(--accent)] animate-pulse rounded-full shadow-[0_0_8px_var(--accent)]"></span>
              <span className="text-[10px] font-mono font-bold text-[var(--text-h)] tracking-widest">SYS_ONLINE</span>
            </div>
          </div>
          <div className="flex gap-4 text-[9px] font-mono text-[var(--text)] uppercase tracking-widest opacity-80">
            <span>Ver. 4.0.2</span>
            <span className="text-[var(--accent)]">T_{sysTime}</span>
          </div>
        </div>

        {/* MENU TIPO TERMINAL (Botones de Navegación) */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest">
          {['Data_Samples', 'Chronology', 'Genetics', 'System_Log'].map((item) => {
            // Evaluamos si el botón actual es la pestaña activa
            const isActive = activeTab === item; 
            
            return (
              <button 
                key={item} 
                onClick={() => setActiveTab && setActiveTab(item)} // 2. Cambiamos la vista activa
                className={`group relative px-4 py-2 transition-all overflow-hidden border ${isActive ? 'border-[var(--accent)] text-[var(--bg)]' : 'border-transparent text-[var(--text)] hover:border-[var(--accent)]'}`}
              >
                {/* Fondo animado: se queda fijo si está activo */}
                <div className={`absolute inset-0 bg-[var(--accent)] transition-transform duration-300 ease-out z-0 ${isActive ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}></div>
                
                <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-[var(--bg)]' : 'group-hover:text-[var(--bg)]'}`}>
                  <span className={`mr-1 ${isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'}`}>&gt;</span>
                  {item}
                </span>
              </button>
            );
          })}
        </div>

        {/* INDICADORES DE ESTADO (Dashboard Táctico) */}
        <div className="flex items-stretch gap-6 font-mono">
          
          <div className="hidden md:flex flex-col justify-between py-1">
            <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-[var(--text)] mb-1">
              <span>Containment_Field</span>
              <span className="text-[var(--text-h)]">98.4%</span>
            </div>
            <div className="flex gap-0.5 h-3">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`w-2 border border-[var(--border)] ${i < 11 ? 'bg-[var(--accent)] opacity-80' : 'bg-transparent animate-pulse'}`}></div>
              ))}
            </div>
          </div>

          <div className="relative group cursor-help flex flex-col justify-center">
            <div className="absolute -inset-1 bg-[var(--text-h)] opacity-20 blur-sm group-hover:opacity-40 transition-opacity"></div>
            <div className="relative flex flex-col items-end border-r-4 border-[var(--text-h)] bg-[var(--code-bg)] px-4 py-2">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-[var(--text)] mb-1">Perimeter_Status</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] animate-flicker">⚠️</span>
                <span className="text-sm font-black tracking-widest text-[var(--text-h)]">CRITICAL</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}