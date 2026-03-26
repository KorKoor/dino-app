import { useState, useEffect } from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [sysTime, setSysTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Función para cambiar de pestaña, cerrar el menú móvil y hacer scroll Inteligente
  const handleNavigation = (item) => {
    if (setActiveTab) setActiveTab(item);
    setIsMobileMenuOpen(false); // Cierra el menú en móviles

    // Le damos 50ms a React para que actualice el DOM con la nueva pestaña antes de movernos
    setTimeout(() => {
      if (item === 'System_Log') {
        // Excepción: Como System_Log oculta el Hero, aquí sí debemos subir hasta el tope (cero)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Para las demás vistas: Buscamos el contenedor de contenido y bajamos directo hacia él
        const mainSection = document.getElementById('main-content');
        if (mainSection) {
          // Calculamos la distancia exacta, restando 85px para que la Navbar no tape el título
          const targetY = mainSection.getBoundingClientRect().top + window.scrollY - 85;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        } else {
          // Plan B de seguridad: Bajar el equivalente a una pantalla completa
          window.scrollTo({ top: window.innerHeight - 85, behavior: 'smooth' });
        }
      }
    }, 50);
  };

  // Lista centralizada de pestañas
  const NAV_ITEMS = ['Data_Samples', 'Chronology', 'Genetics', 'System_Log'];

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md shadow-[0_4px_30px_var(--accent-bg)]">
      
      {/* BARRA SUPERIOR DE METADATA */}
      <div className="w-full bg-[var(--text-h)] px-4 md:px-6 py-1 flex justify-between items-center text-[8px] font-mono font-black uppercase tracking-[0.3em] text-[var(--bg)]">
        <span>Subnet: 192.168.4.15 // Gateway_Active</span>
        <span className="hidden md:block opacity-70">Uplink_Speed: 10Gbps</span>
      </div>

      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        
        {/* LOGO E INFORMACIÓN DEL SISTEMA */}
        <div 
          className="flex flex-col group cursor-pointer"
          onClick={() => handleNavigation('Data_Samples')}
        >
          <div className="flex items-end gap-2 md:gap-3 mb-1">
            <div className="bg-[var(--accent)] text-[var(--bg)] px-2 md:px-3 py-0.5 font-black text-xl md:text-2xl tracking-tighter shadow-[4px_4px_0px_var(--accent-border)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
              DINO-OS
            </div>
            <div className="hidden md:flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-[var(--accent)] animate-pulse rounded-full shadow-[0_0_8px_var(--accent)]"></span>
              <span className="text-[10px] font-mono font-bold text-[var(--text-h)] tracking-widest">SYS_ONLINE</span>
            </div>
          </div>
          <div className="flex gap-4 text-[8px] md:text-[9px] font-mono text-[var(--text)] uppercase tracking-widest opacity-80 mt-1 md:mt-0">
            <span>Ver. 4.0.2</span>
            <span className="text-[var(--accent)]">T_{sysTime}</span>
          </div>
        </div>

        {/* CONTROLES DERECHOS (Desktop Menu + Status + Botón Móvil) */}
        <div className="flex items-center gap-6">
          
          {/* MENU DESKTOP */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item; 
              return (
                <button 
                  key={item} 
                  onClick={() => handleNavigation(item)}
                  className={`group relative px-4 py-2 transition-all overflow-hidden border ${isActive ? 'border-[var(--accent)] text-[var(--bg)]' : 'border-transparent text-[var(--text)] hover:border-[var(--accent)]'}`}
                >
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
          <div className="hidden md:flex items-stretch gap-6 font-mono">
            {/* Containment Grid */}
            <div className="flex flex-col justify-between py-1">
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

            {/* Badge de Estado Crítico */}
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

          {/* BOTÓN HAMBURGUESA (Solo Móvil) */}
          <button 
            className="lg:hidden p-2 text-[var(--text-h)] border-2 border-[var(--border)] bg-[var(--code-bg)] hover:border-[var(--accent)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isMobileMenuOpen ? (
                // Ícono de "X" (Cerrar)
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                // Ícono de "Hamburguesa" (Abrir)
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-[var(--bg)]/95 backdrop-blur-xl border-b-2 border-[var(--border)] overflow-hidden transition-all duration-300 ease-out origin-top ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        <div className="p-4 flex flex-col gap-2 font-mono">
          <span className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-[0.3em] mb-2 px-2">
            // Seleccionar_Módulo
          </span>
          
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                className={`flex items-center p-4 border-l-4 transition-colors ${isActive ? 'bg-[var(--code-bg)] border-[var(--accent)] text-[var(--text-h)]' : 'border-transparent text-[var(--text)] hover:bg-[var(--code-bg)]/50'}`}
              >
                <span className={`mr-3 ${isActive ? 'text-[var(--accent)]' : 'opacity-30'}`}>&gt;</span>
                <span className="text-sm font-bold uppercase tracking-widest">{item}</span>
              </button>
            );
          })}
          
          {/* Mini Status para Móvil */}
          <div className="mt-4 pt-4 border-t border-[var(--border)] flex justify-between items-center px-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text)]">Status_Local:</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-500 animate-pulse">Critical</span>
          </div>
        </div>
      </div>

    </nav>
  );
}