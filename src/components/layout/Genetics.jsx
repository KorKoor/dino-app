import { useState, useMemo, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

// Diccionario de ADN Recombinante y sus efectos
const DNA_MODIFIERS = {
  none: { name: 'Puro (Sin Alterar)', effects: { Fuerza: 0, Velocidad: 0, Inteligencia: 0, Sigilo: 0, Agresividad: 0 }, log: 'SECUENCIA GENÉTICA ESTABLE. NO SE DETECTAN MUTACIONES.' },
  frog: { name: 'Amphibia (Rana Arborícola)', effects: { Fuerza: -15, Velocidad: 5, Inteligencia: -10, Sigilo: 45, Agresividad: -10 }, log: 'MUTACIÓN DETECTADA: CAPACIDAD DE CAMUFLAJE Y TERMORREGULACIÓN INCREMENTADA. FUERZA ÓSEA COMPROMETIDA.' },
  ostrich: { name: 'Aves (Avestruz)', effects: { Fuerza: -10, Velocidad: 40, Inteligencia: 10, Sigilo: -15, Agresividad: -20 }, log: 'MUTACIÓN DETECTADA: ESTRUCTURA ÓSEA ALIGERADA. METABOLISMO ACELERADO. ÍNDICE DE AGRESIÓN REDUCIDO.' },
  croc: { name: 'Reptilia (Cocodrilo del Nilo)', effects: { Fuerza: 35, Velocidad: -15, Inteligencia: -20, Sigilo: 10, Agresividad: 30 }, log: 'MUTACIÓN DETECTADA: HIPERTROFIA MUSCULAR Y ENGROSAMIENTO DÉRMICO. CAPACIDAD COGNITIVA REDUCIDA.' },
  cuttlefish: { name: 'Cephalopoda (Sepia)', effects: { Fuerza: -20, Velocidad: -10, Inteligencia: 30, Sigilo: 50, Agresividad: -10 }, log: 'MUTACIÓN DETECTADA: EXPANSIÓN NEURAL. CROMATÓFOROS ACTIVOS EN LA EPIDERMIS. SIGILO EXTREMO.' }
};

export default function Genetics({ dinosaurs }) {
  const [selectedDinoId, setSelectedDinoId] = useState(dinosaurs[0]?.id || '');
  const [selectedDNA, setSelectedDNA] = useState('none');
  const [terminalText, setTerminalText] = useState('');

  // Efecto de máquina de escribir para el log de la terminal
  useEffect(() => {
    const fullText = DNA_MODIFIERS[selectedDNA].log;
    let i = 0;
    setTerminalText('');
    const typing = setInterval(() => {
      setTerminalText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(typing);
    }, 30);
    return () => clearInterval(typing);
  }, [selectedDNA, selectedDinoId]);

  const activeDino = useMemo(() => dinosaurs.find(d => d.id === selectedDinoId), [dinosaurs, selectedDinoId]);

  // Algoritmo para extrapolar stats (0-100) basándonos en el JSON real
  const chartData = useMemo(() => {
    if (!activeDino) return [];

    // 1. Extraemos números de los strings (ej. "8000kg" -> 8000, "17-20 km/h" -> 20)
    const weightMatch = activeDino.stats.weight.match(/\d+/);
    const speedMatch = activeDino.stats.speed.match(/\d+/g);
    
    const rawWeight = weightMatch ? parseInt(weightMatch[0]) : 1000;
    // Si hay un rango de velocidad, tomamos el número más alto
    const rawSpeed = speedMatch ? Math.max(...speedMatch.map(Number)) : 15;

    // 2. Calculamos Stats Base Matemáticamente
    // Fuerza: Dinosaurios pesados tienen mucha fuerza (tope 100)
    let baseFuerza = Math.min(Math.round((rawWeight / 10000) * 100), 100);
    if (baseFuerza < 20) baseFuerza = 20;

    // Velocidad: Multiplicamos los km/h x 2 (tope 100)
    let baseVelocidad = Math.min(rawSpeed * 2.5, 100);

    // Agresividad: Directamente proporcional al Danger Level (1-10 -> 10-100)
    let baseAgresividad = activeDino.dangerLevel * 10;

    // Inteligencia: Carnívoros suelen ser más astutos, más un extra por el tamaño del cerebro
    let baseInteligencia = activeDino.diet === 'Carnívoro' ? 65 : 40;
    if (activeDino.stats.brainSize?.toLowerCase().includes('grande')) baseInteligencia += 25;

    // Sigilo: Dinosaurios pequeños son más sigilosos
    let baseSigilo = Math.max(100 - (rawWeight / 100), 10);

    const baseStats = { Fuerza: baseFuerza, Velocidad: baseVelocidad, Inteligencia: baseInteligencia, Sigilo: baseSigilo, Agresividad: baseAgresividad };
    const modifiers = DNA_MODIFIERS[selectedDNA].effects;

    // 3. Formateamos la data para Recharts
    return Object.keys(baseStats).map(key => {
      // Aplicamos la mutación y limitamos entre 0 y 100
      const mutatedVal = Math.max(0, Math.min(100, baseStats[key] + modifiers[key]));
      return {
        atributo: key,
        Base: baseStats[key],
        Mutación: mutatedVal,
        fullMark: 100,
      };
    });
  }, [activeDino, selectedDNA]);

  if (!activeDino) return null;

  return (
    <section className="animate-[reveal_0.5s_ease-out] flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[700px]">
      
      {/* COLUMNA IZQUIERDA: Controles del Laboratorio */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        
        <div className="border-b-2 border-[var(--border)] pb-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[var(--text-h)]">
            // Splicing_Lab
          </h2>
          <p className="font-mono text-xs text-[var(--text)] opacity-70 mt-2">
            Simulador de recombinación genética in-vitro.
          </p>
        </div>

        {/* SELECTOR DE ESPÉCIMEN */}
        <div className="bg-[var(--code-bg)] border border-[var(--border)] p-6">
          <span className="block text-[10px] font-mono text-[var(--accent)] uppercase tracking-widest mb-3">
            1. Seleccionar_Genoma_Base
          </span>
          <select 
            className="w-full bg-[var(--bg)] border-2 border-[var(--border)] p-3 font-mono text-xs uppercase text-[var(--text-h)] outline-none focus:border-[var(--accent)] cursor-pointer"
            value={selectedDinoId}
            onChange={(e) => {
              setSelectedDinoId(e.target.value);
              setSelectedDNA('none'); // Reseteamos la mutación al cambiar de dino
            }}
          >
            {dinosaurs.map(d => (
              <option key={d.id} value={d.id}>{d.name} [{d.id}]</option>
            ))}
          </select>

          {/* Mini Info del Dino Seleccionado */}
          <div className="mt-4 pt-4 border-t border-[var(--border)] flex gap-4">
             <div className="w-16 h-16 bg-black border border-[var(--border)] shrink-0">
               <img src={activeDino.image} alt="Thumbnail" className="w-full h-full object-cover grayscale opacity-80" />
             </div>
             <div className="flex flex-col justify-center">
               <span className="font-black uppercase text-sm text-[var(--text-h)]">{activeDino.classification.genus}</span>
               <span className="font-mono text-[9px] text-[var(--text)] uppercase">{activeDino.diet} // Lv.{activeDino.dangerLevel}</span>
             </div>
          </div>
        </div>

        {/* INYECTOR DE ADN */}
        <div className="bg-[var(--code-bg)] border border-[var(--border)] p-6 flex-grow">
          <span className="block text-[10px] font-mono text-[var(--text)] uppercase tracking-widest mb-4">
            2. Inyectar_Secuencia_Moderna
          </span>
          
          <div className="flex flex-col gap-3">
            {Object.entries(DNA_MODIFIERS).map(([key, data]) => {
              const isActive = selectedDNA === key;
              return (
                <button 
                  key={key}
                  onClick={() => setSelectedDNA(key)}
                  className={`group relative px-4 py-3 text-left font-mono text-xs uppercase tracking-widest transition-all border-2 overflow-hidden ${isActive ? 'border-[var(--accent)] text-[var(--bg)]' : 'border-[var(--border)] text-[var(--text)] hover:border-[var(--text-h)]'}`}
                >
                  <div className={`absolute inset-0 transition-transform duration-300 ease-out z-0 ${isActive ? 'bg-[var(--accent)] translate-x-0' : 'bg-[var(--text-h)] -translate-x-full group-hover:translate-x-0'}`}></div>
                  <span className={`relative z-10 font-bold ${isActive ? 'text-black' : 'group-hover:text-black'}`}>
                    {isActive ? '[x] ' : '[ ] '}{data.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA: Visualización de Datos */}
      <div className="w-full lg:w-2/3 flex flex-col border-2 border-[var(--border)] bg-[var(--code-bg)] relative overflow-hidden">
        
        {/* Decoración UI */}
        <div className="absolute top-0 right-0 p-4 flex gap-2">
          <span className="w-2 h-2 bg-red-500 animate-pulse"></span>
          <span className="text-[8px] font-mono text-[var(--text)] uppercase tracking-widest">Live_Telemetry</span>
        </div>

        {/* GRÁFICO DE RADAR (Recharts) */}
        <div className="flex-grow w-full h-[400px] lg:h-auto p-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              {/* Estilo de la telaraña de fondo */}
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis 
                dataKey="atributo" 
                tick={{ fill: 'var(--text)', fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' }} 
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              
              {/* Tooltip Brutalista Personalizado */}
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg)', border: '1px solid var(--accent)', borderRadius: 0 }}
                itemStyle={{ fontFamily: 'monospace', fontSize: '12px' }}
                labelStyle={{ color: 'var(--text-h)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}
              />

              {/* Genoma Original */}
              <Radar 
                name="Genoma Original" 
                dataKey="Base" 
                stroke="var(--text)" 
                fill="var(--text)" 
                fillOpacity={0.1} 
                strokeWidth={2}
              />
              
              {/* Genoma Mutado (Solo se muestra si hay mutación) */}
              {selectedDNA !== 'none' && (
                <Radar 
                  name="Mutación Activa" 
                  dataKey="Mutación" 
                  stroke="var(--accent)" 
                  fill="var(--accent)" 
                  fillOpacity={0.4} 
                  strokeWidth={3}
                />
              )}
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* CONSOLA DE SALIDA (Terminal Bottom) */}
        <div className="h-32 bg-black border-t-2 border-[var(--border)] p-6 font-mono text-xs md:text-sm">
          <div className="flex gap-3 items-start">
            <span className="text-[var(--text)] opacity-50">&gt; sys.analyze_mutation()</span>
          </div>
          <div className="flex gap-3 items-start mt-2">
            <span className="text-[var(--accent)] font-bold animate-pulse">&gt;</span>
            <p className={`uppercase tracking-widest leading-relaxed ${selectedDNA === 'none' ? 'text-[var(--text-h)]' : 'text-[var(--accent)]'}`}>
              {terminalText}
              <span className="inline-block w-2 h-4 bg-[var(--accent)] ml-1 animate-flicker align-middle"></span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}