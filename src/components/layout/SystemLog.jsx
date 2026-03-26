import { useState, useEffect, useRef } from 'react';

export default function SystemLog() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const endOfTerminalRef = useRef(null);

  // Secuencia de comandos y datos clasificados
  const sequence = [
    { type: 'cmd', text: '> INITIALIZING OVERRIDE PROTOCOL...', delay: 800 },
    { type: 'success', text: '  [OK] AUTH_TOKEN_ACCEPTED.', delay: 400 },
    { type: 'cmd', text: '> BYPASSING MAINFRAME SECURITY...', delay: 900 },
    { type: 'warning', text: '  [!] WARNING: UNREGISTERED ACCESS DETECTED.', delay: 500 },
    { type: 'cmd', text: '> FETCH_ENGINEER_DATA --target="Carlos_García"', delay: 1200 },
    { type: 'info', text: '  DOWNLOADING DECRYPTED PAYLOAD...', delay: 1500 },
    { type: 'json', delay: 200, text: `{` },
    { type: 'json', delay: 100, text: `  "id": "DEV-001",` },
    { type: 'json', delay: 100, text: `  "name": "Carlos García Huerta",` },
    { type: 'json', delay: 100, text: `  "role": "Software Developer",` },
    { type: 'json', delay: 100, text: `  "current_location": "Aguascalientes_Sector // MX",` },
    { type: 'json-highlight', delay: 100, text: `  "relocation_status": "READY_FOR_TRANSFER // TARGET: GUADALAJARA (Softtek_Node)",` },
    { type: 'json', delay: 100, text: `  "contact_nodes": {` },
    { type: 'link', delay: 100, label: `    "email": `, url: `mailto:charliegarcia.it@gmail.com`, value: `"charliegarcia.it@gmail.com",` },
    { type: 'link', delay: 100, label: `    "portfolio": `, url: `https://korwork.org`, value: `"korwork.org",` },
    { type: 'link', delay: 100, label: `    "github": `, url: `https://github.com/KorKoor`, value: `"KorKoor",` },
    { type: 'link', delay: 100, label: `    "linkedin": `, url: `https://linkedin.com/in/carlosgarcia-it`, value: `"carlosgarcia-it"` },
    { type: 'json', delay: 100, text: `  },` },
    { type: 'json', delay: 200, text: `  "core_competencies": [` },
    { type: 'json', delay: 100, text: `    "React", "Android Development", "Kotlin",` },
    { type: 'json', delay: 100, text: `    "Jetpack Compose", "KMP (Kotlin Multiplatform)",` },
    { type: 'json', delay: 100, text: `    "Clean Architecture", "MVVM"` },
    { type: 'json', delay: 100, text: `  ],` },
    { type: 'json', delay: 200, text: `  "classified_projects": [` },
    { type: 'json', delay: 100, text: `    "ParDos: Zen Math Puzzle (Mobile)",` },
    { type: 'json', delay: 100, text: `    "ACIF Suite (Hipertensión / Diabetes)",` },
    { type: 'json', delay: 100, text: `    "PLAY-ZONE (React Engine)"` },
    { type: 'json', delay: 100, text: `  ]` },
    { type: 'json', delay: 200, text: `}` },
    { type: 'success', text: '  [OK] EOF. CONNECTION SECURE.', delay: 500 }
  ];

  // Motor de la terminal (ejecuta la secuencia paso a paso)
  useEffect(() => {
    let currentIndex = 0;
    let isMounted = true;

    const processNextLine = () => {
      if (!isMounted) return;
      if (currentIndex < sequence.length) {
        const currentLine = sequence[currentIndex];
        
        setTimeout(() => {
          if (!isMounted) return;
          setDisplayedLines(prev => [...prev, currentLine]);
          currentIndex++;
          
          // Auto-scroll hacia abajo
          endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
          
          processNextLine();
        }, currentLine.delay);
      } else {
        setIsTyping(false);
      }
    };

    processNextLine();

    return () => { isMounted = false; };
  }, []);

  return (
    <section className="animate-[reveal_0.4s_ease-out] h-[750px] flex flex-col border-2 border-[var(--border)] bg-black relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
      
      {/* HEADER DE LA TERMINAL */}
      <header className="bg-[var(--code-bg)] border-b-2 border-[var(--border)] p-4 flex justify-between items-center shrink-0 z-10">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-red-500 animate-pulse shadow-[0_0_8px_red]"></span>
          <h2 className="text-sm font-mono font-black uppercase tracking-[0.3em] text-[var(--text-h)]">
            SYSTEM_LOG // CLASSIFIED_ACCESS
          </h2>
        </div>
        <span className="text-[10px] font-mono text-[var(--text)] opacity-50">ROOT@DINO-OS:~#</span>
      </header>

      {/* CUERPO DE LA TERMINAL (Consola) */}
      <div className="flex-1 p-6 md:p-10 font-mono text-xs md:text-sm overflow-y-auto custom-scrollbar relative z-10">
        <div className="flex flex-col gap-1.5">
          {displayedLines.map((line, index) => {
            // Renderizado condicional según el tipo de línea
            if (line.type === 'cmd') return <span key={index} className="text-[var(--text)] opacity-70 mt-2">{line.text}</span>;
            if (line.type === 'success') return <span key={index} className="text-[var(--accent)] font-bold">{line.text}</span>;
            if (line.type === 'warning') return <span key={index} className="text-amber-500 font-bold">{line.text}</span>;
            if (line.type === 'info') return <span key={index} className="text-blue-400 italic mb-2">{line.text}</span>;
            if (line.type === 'json-highlight') return <span key={index} className="text-[var(--bg)] bg-[var(--accent)] font-bold px-1 animate-pulse inline-block self-start">{line.text}</span>;
            
            if (line.type === 'link') {
              return (
                <div key={index} className="text-[var(--text-h)]">
                  {line.label}
                  <a href={line.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-[var(--accent)] hover:underline transition-colors cursor-crosshair">
                    {line.value}
                  </a>
                </div>
              );
            }
            
            // Default JSON text
            return <span key={index} className="text-[var(--text-h)] whitespace-pre">{line.text}</span>;
          })}
          
          {/* Cursor parpadeante */}
          {isTyping ? (
            <span className="w-2.5 h-4 bg-[var(--text-h)] animate-flicker mt-2 inline-block"></span>
          ) : (
            <div className="mt-8 flex gap-4 animate-[fadeIn_1s_ease-in]">
               <span className="text-[var(--text)] opacity-50">&gt; ACTION_REQUIRED:</span>
               <a href="mailto:charliegarcia.it@gmail.com" className="bg-[var(--accent)] text-black px-4 py-1 font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-crosshair">
                 [ INICIAR_CONTACTO ]
               </a>
            </div>
          )}
          <div ref={endOfTerminalRef} className="h-4"></div>
        </div>
      </div>

      {/* EFECTO DE CRT DE LA TERMINAL */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-20"></div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-20"></div>

    </section>
  );
}