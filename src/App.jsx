import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import DinoCard from './components/dino/DinoCard';
import DinoDetail from './components/dino/DinoDetail';
import Chronology from './components/layout/Chronology';
import Genetics from './components/layout/Genetics';
import SystemLog from './components/layout/SystemLog';
import Footer from './components/layout/Footer.jsx';
import dinosaurs from './data/dinosaurs.json';

//HOLA SOY CHARLIE
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDinos, setFilteredDinos] = useState(dinosaurs);
  const [isSystemReady, setIsSystemReady] = useState(false);
  const [selectedDino, setSelectedDino] = useState(null);
  
  // ESTADO CENTRAL: Controla la navegación
  const [activeTab, setActiveTab] = useState('Data_Samples');

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsSystemReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Lógica de búsqueda
  useEffect(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const filtered = dinosaurs.filter(dino => 
      dino.name.toLowerCase().includes(normalizedSearch) ||
      dino.diet.toLowerCase().includes(normalizedSearch) ||
      dino.period.toLowerCase().includes(normalizedSearch) ||
      dino.id.toLowerCase().includes(normalizedSearch)
    );
    setFilteredDinos(filtered);
  }, [searchTerm]);

  if (!isSystemReady) {
    return (
      <div className="h-svh w-full bg-[var(--bg)] flex flex-col items-center justify-center font-mono">
        <div className="flex items-end gap-2 mb-8">
          <span className="text-4xl font-black text-[var(--text-h)] tracking-tighter">DINO-OS</span>
          <span className="text-[var(--accent)] text-lg animate-pulse">●</span>
        </div>
        <div className="w-64 h-[2px] bg-[var(--border)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[var(--accent)] animate-load shadow-[0_0_15px_var(--accent)]"></div>
        </div>
        <span className="mt-6 text-[10px] uppercase tracking-[0.4em] text-[var(--text)] opacity-70 animate-pulse">
          Inicializando_Secuencia_Base...
        </span>
      </div>
    );
  }

  return (
    <div id="root" className="flex flex-col min-h-svh border-x-2 border-[var(--border)] bg-[var(--bg)] relative overflow-x-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-[1400px] mx-auto">
      
      {/* 1. NAVEGACIÓN (Recibe estado para cambiar de vista) */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. HERO (Se oculta en System_Log para mayor inmersión) */}
      {activeTab !== 'System_Log' && <Hero />}

      {/* 3. VISTAS DINÁMICAS */}
      <main className="flex-grow p-8 lg:p-16 relative z-10">
        
        {/* VISTA 1: DATA SAMPLES (Buscador y Grid) */}
        {activeTab === 'Data_Samples' && (
          <section className="animate-[reveal_0.4s_ease-out]">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-2 border-[var(--border)] pb-8">
              <div className="max-w-md">
                <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-3">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] animate-flicker"></span>
                  Filtrado_de_Frecuencia_Genética
                </h3>
                <p className="text-xs font-medium opacity-60 italic text-[var(--text)]">
                  Introduce el nombre del espécimen, dieta (Carnívoro/Herbívoro) o periodo para localizar su registro en el núcleo principal.
                </p>
              </div>

              <div className="relative w-full md:w-96 group">
                <div className="absolute -top-3 left-2 bg-[var(--bg)] px-2 text-[8px] font-mono text-[var(--accent)] tracking-widest z-10">
                  QUERY_INPUT
                </div>
                <input 
                  type="text"
                  placeholder="BUSCAR_REGISTRO..."
                  className="w-full bg-[var(--code-bg)] border-2 border-[var(--border)] p-4 font-mono text-xs text-[var(--text-h)] uppercase tracking-widest outline-none focus:border-[var(--accent)] transition-all group-hover:shadow-[4px_4px_0px_var(--accent-border)]"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-40 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
              </div>
            </div>

            {filteredDinos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-14">
                {filteredDinos.map((dino, index) => (
                  <div key={dino.id} className="animate-reveal h-full" style={{ animationDelay: `${index * 50}ms` }}>
                    <DinoCard dino={dino} onDecrypt={setSelectedDino} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 flex flex-col items-center justify-center text-center border-2 border-dashed border-[var(--border)] bg-[var(--code-bg)]">
                <span className="text-4xl mb-4">⚠️</span>
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text)] opacity-50 mb-2">
                  Error_404 // No_Match_Found
                </span>
                <span className="font-mono text-xs text-[var(--accent)]">
                  Ninguna firma genética coincide con: "{searchTerm}"
                </span>
              </div>
            )}
          </section>
        )}

        {/* VISTA 2: CRONOLOGÍA */}
        {activeTab === 'Chronology' && <Chronology dinosaurs={dinosaurs} />}

        {/* VISTA 3: LABORATORIO GENÉTICO */}
        {activeTab === 'Genetics' && <Genetics dinosaurs={dinosaurs} />}

        {/* VISTA 4: SYSTEM LOG (Tu CV) */}
        {activeTab === 'System_Log' && <SystemLog />}

      </main>

      {/* 4. FOOTER EXTERNO */}
      <Footer />

      {/* OVERLAYS GLOBALES */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

      {/* PANEL LATERAL MODAL */}
      {selectedDino && (
        <DinoDetail 
          dino={selectedDino} 
          onClose={() => setSelectedDino(null)} 
        />
      )}
    </div>
  );
}

export default App;