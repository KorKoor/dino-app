import { useState, useMemo } from 'react';

// Datos estáticos del sistema para las Eras Geológicas
const ERAS_DATA = {
  "Triásico": {
    period: "252 - 201 Millones de años",
    climate: "Árido y seco. Pangea comienza a separarse.",
    atmosphere: "O2: 16% // CO2: Alto",
    dominance: "Aparición de los primeros dinosaurios bípedos pequeños.",
    color: "text-amber-500",
    bgAccent: "bg-amber-500"
  },
  "Jurásico": {
    period: "201 - 145 Millones de años",
    climate: "Cálido y húmedo. Bosques de coníferas y helechos.",
    atmosphere: "O2: 26% // CO2: Moderado",
    dominance: "Era de los gigantes saurópodos y grandes alosauroideos.",
    color: "text-blue-500",
    bgAccent: "bg-blue-500"
  },
  "Cretácico": {
    period: "145 - 66 Millones de años",
    climate: "Nivel del mar muy alto. Aparición de plantas con flores.",
    atmosphere: "O2: 30% // CO2: Medio-Alto",
    dominance: "Máxima diversidad: ceratópsidos y tiranosáuridos.",
    color: "text-[var(--accent)]",
    bgAccent: "bg-[var(--accent)]"
  }
};

export default function Chronology({ dinosaurs }) {
  const [activeEra, setActiveEra] = useState("Cretácico");
  const [isScanning, setIsScanning] = useState(false);

  // Filtramos los dinosaurios por la era seleccionada usando useMemo para rendimiento
  const eraDinos = useMemo(() => {
    return dinosaurs.filter(d => d.period === activeEra);
  }, [dinosaurs, activeEra]);

  // Simulador de escaneo de base de datos al cambiar de era
  const handleEraChange = (era) => {
    if (era === activeEra) return;
    setIsScanning(true);
    setActiveEra(era);
    // Tiempo de "lectura" de datos
    setTimeout(() => setIsScanning(false), 600);
  };

  const currentData = ERAS_DATA[activeEra];

  return (
    <section className="flex flex-col gap-10 animate-[reveal_0.6s_ease-out] min-h-[800px]">
      
      {/* HEADER DE LA VISTA */}
      <div className="border-b-2 border-[var(--border)] pb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl lg:text-4xl font-black uppercase italic tracking-tighter text-[var(--text-h)]">
            // Chronological_Records
          </h2>
          <p className="font-mono text-xs text-[var(--text)] opacity-70 mt-2">
            Desplazamiento temporal activado. Seleccione un estrato geológico para escanear bio-firmas.
          </p>
        </div>
        <div className="hidden md:flex gap-2">
           <span className="w-2 h-4 bg-[var(--text-h)] animate-pulse"></span>
           <span className="w-2 h-4 bg-[var(--text)] opacity-50"></span>
           <span className="w-2 h-4 bg-[var(--text)] opacity-20"></span>
        </div>
      </div>

      {/* LÍNEA DE TIEMPO INTERACTIVA */}
      <div className="relative w-full bg-[var(--code-bg)] border-2 border-[var(--border)] p-8 lg:p-12 overflow-hidden">
        {/* Decoración de fondo de la terminal */}
        <div className="absolute top-0 right-0 p-3 text-[8px] font-mono opacity-30 text-[var(--accent)] bg-[var(--accent-bg)] border-l border-b border-[var(--accent-border)]">
          TIMELINE_CONTROL_NODE
        </div>
        
        {/* Eje de la línea de tiempo */}
        <div className="relative h-2 w-full bg-white/10 my-10 lg:w-5/6 lg:mx-auto">
          {/* Línea de progreso dinámica con GLOW mejorado */}
          <div 
            className={`absolute top-0 left-0 h-full transition-all duration-700 ease-in-out ${currentData.bgAccent}`}
            style={{ 
              width: activeEra === 'Triásico' ? '0%' : activeEra === 'Jurásico' ? '50%' : '100%',
              boxShadow: `0 0 20px 2px var(--color-${currentData.bgAccent.split('-')[1]}-500)` // Sombra dinámica
            }}
          ></div>

          {/* Nodos de tiempo */}
          {Object.keys(ERAS_DATA).map((era, index) => {
            const isActive = activeEra === era;
            const position = index === 0 ? 'left-[0%]' : index === 1 ? 'left-[50%]' : 'left-[100%]';
            
            return (
              <div 
                key={era}
                className={`absolute top-1/2 -translate-y-1/2 ${position} -translate-x-1/2 flex flex-col items-center cursor-crosshair group z-10`}
                onClick={() => handleEraChange(era)}
              >
                {/* El "Botón" del nodo */}
                <div className={`w-8 h-8 border-4 flex items-center justify-center bg-[var(--code-bg)] transition-all duration-300 ease-out ${isActive ? `border-${currentData.bgAccent.split('-')[1]}-500 scale-125 shadow-[0_0_15px_currentColor]` : 'border-[var(--border)] hover:border-white/50 hover:scale-110'}`}>
                   {isActive && <div className={`w-3 h-3 animate-ping ${currentData.bgAccent}`}></div>}
                </div>
                
                {/* Etiqueta del nodo */}
                <span className={`absolute top-12 font-black uppercase tracking-widest text-[10px] md:text-xs transition-colors whitespace-nowrap ${isActive ? currentData.color : 'text-[var(--text)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--text-h)]'}`}>
                  {era}
                </span>
              </div>
            );
          })}
        </div>
        <div className="h-8"></div> {/* Espaciador para las etiquetas absolutas */}
      </div>

      {/* PANEL DE DATOS DE LA ERA (Bento Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Box 1 */}
        <div className="bg-[var(--code-bg)] border border-[var(--border)] p-6 lg:col-span-1 shadow-[4px_4px_0_var(--border)] transition-colors hover:border-[var(--text-h)]">
          <span className="text-[10px] font-mono text-[var(--text)] uppercase tracking-widest opacity-60">Intervalo_Temporal</span>
          <h3 className={`text-3xl font-black italic mt-2 mb-6 ${currentData.color}`}>{currentData.period}</h3>
          
          <div className="space-y-4 font-mono text-xs border-l-2 border-[var(--border)] pl-4">
            <div>
              <span className="block opacity-50 mb-1">Atmósfera:</span>
              <span className="text-[var(--text-h)] font-bold">{currentData.atmosphere}</span>
            </div>
            <div>
              <span className="block opacity-50 mb-1">Clima Global:</span>
              <span className="text-[var(--text-h)] leading-relaxed">{currentData.climate}</span>
            </div>
          </div>
        </div>

        {/* Info Box 2 */}
        <div className="bg-[var(--code-bg)] border border-[var(--border)] p-8 lg:col-span-2 relative overflow-hidden shadow-[4px_4px_0_var(--border)] transition-colors hover:border-[var(--text-h)] flex flex-col justify-center">
          <div className={`absolute -right-4 -bottom-10 text-[180px] leading-none opacity-[0.03] font-black italic ${currentData.color} select-none`}>
            {activeEra.substring(0, 3).toUpperCase()}
          </div>
          <span className="text-[10px] font-mono text-[var(--text)] uppercase tracking-widest opacity-60 relative z-10">Registro_Evolutivo_Dominante</span>
          <p className="text-2xl md:text-3xl font-medium italic text-[var(--text-h)] mt-4 leading-snug relative z-10">
            "{currentData.dominance}"
          </p>
        </div>
      </div>

      {/* LISTA DE DINOSAURIOS DE LA ERA (Compact View) */}
      <div className="mt-4 border-t-2 border-[var(--border)] pt-8">
        <div className="flex justify-between items-end mb-8">
          <h3 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text)]">
            <span className={`w-2 h-2 ${currentData.bgAccent} shadow-[0_0_8px_currentColor]`}></span>
            Especies_Registradas [{eraDinos.length}]
          </h3>
          <span className={`hidden md:block text-[8px] font-mono uppercase tracking-widest ${currentData.color} animate-pulse`}>
            Status: {isScanning ? 'ANALYZING_DATA...' : 'STABLE'}
          </span>
        </div>

        {isScanning ? (
          // PANTALLA DE CARGA DEL ESCÁNER
          <div className="h-64 border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center font-mono opacity-70 bg-[var(--code-bg)]">
             <div className="flex gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-2 h-8 ${currentData.bgAccent} animate-pulse`} style={{ animationDelay: `${i * 100}ms` }}></div>
                ))}
             </div>
             <span className={`text-[10px] uppercase tracking-[0.3em] ${currentData.color}`}>Descifrando_Estrato_Geológico...</span>
          </div>
        ) : (
          // GRID DE TARJETAS COMPACTAS
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {eraDinos.map((dino, idx) => (
              <div 
                key={dino.id} 
                className="flex items-center gap-4 bg-[var(--code-bg)] border border-[var(--border)] p-3 hover:border-[var(--text-h)] transition-all duration-300 group cursor-default hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(255,255,255,0.1)] animate-[reveal_0.4s_ease-out]"
                style={{ animationDelay: `${idx * 30}ms` }} // Cascada más rápida
              >
                {/* Miniatura en blanco y negro con Fallback de Imagen */}
                <div className="w-16 h-16 shrink-0 overflow-hidden bg-black border border-[var(--border)] relative">
                  <img 
                    src={dino.image} 
                    alt={dino.name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://commons.wikimedia.org/wiki/Special:FilePath/Tyrannosaurus_Rex_Holotype.jpg";
                    }}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-110 group-hover:scale-100" 
                  />
                  {/* Overlay táctico en la imagen */}
                  <div className="absolute inset-0 bg-[var(--bg)] mix-blend-color opacity-50 group-hover:opacity-0 transition-opacity"></div>
                </div>
                
                {/* Datos compactos */}
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-sm font-black uppercase truncate text-[var(--text-h)] group-hover:text-[var(--accent)] transition-colors">{dino.name}</h4>
                  <div className="flex justify-between items-end mt-1">
                    <span className="text-[9px] font-mono text-[var(--text)] uppercase tracking-widest truncate max-w-[60%]">{dino.diet}</span>
                    <span className={`text-[10px] font-black italic ${currentData.color}`}>Lv.{dino.dangerLevel}</span>
                  </div>
                  {/* Mini barra de nivel (Data Visualization) */}
                  <div className="w-full h-1 bg-white/10 mt-2 overflow-hidden">
                     <div className={`h-full ${currentData.bgAccent} transition-all duration-1000 ease-out`} style={{ width: `${dino.dangerLevel * 10}%`, transformOrigin: 'left', animation: 'load 1s ease-out' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
}