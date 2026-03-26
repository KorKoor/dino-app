import { useState, useRef, useEffect } from 'react';

export default function DinoCard({ dino, onDecrypt }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Intersection Observer para disparar animaciones cuando la card entra en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsIntersecting(true);
    }, { threshold: 0.1 });
    
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    // Desactivamos el efecto 3D en pantallas pequeñas (móviles) para no romper el scroll
    if (window.innerWidth < 1024) return; 

    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRotate({ 
      x: ((y - rect.height / 2) / (rect.height / 2)) * -6, 
      y: ((x - rect.width / 2) / (rect.width / 2)) * 6 
    });
    setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  if (!dino) return null;

  const geneticStability = (dino.id.length % 5) + 4; 

  return (
    <article 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: rotate.x === 0 ? 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
      }}
      className="group relative flex flex-col h-full bg-[var(--bg)] border-2 border-[var(--border)] transition-all lg:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] lg:hover:z-20"
    >
      {/* SKELETON LOADER */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 bg-[var(--code-bg)] animate-pulse flex items-center justify-center">
          <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest text-[var(--accent)]">
            Downloading_Assets...
          </span>
        </div>
      )}

      {/* GLOW LAYER (Solo Desktop) */}
      <div 
        className="hidden lg:block absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(500px circle at ${glow.x}% ${glow.y}%, var(--accent-bg), transparent 50%)` }}
      />

      {/* HUD SUPERIOR */}
      <div className="flex justify-between items-center px-4 py-2 border-b-2 border-[var(--border)] bg-[var(--code-bg)] text-[var(--text)] font-mono text-[9px] font-black uppercase">
        <div className="flex items-center gap-2">
          {/* En móvil parpadea siempre, en desktop también */}
          <div className="w-1.5 h-1.5 bg-[var(--accent)] animate-ping rounded-full shadow-[0_0_8px_var(--accent)]" />
          <span className="tracking-[0.2em] truncate">FILE_{dino.id}</span>
        </div>
        <span className="opacity-50 italic truncate max-w-[100px] text-right">{dino.period}</span>
      </div>

      {/* VISUAL CORE CON FALLBACK Y LÓGICA MÓVIL */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-black shrink-0 border-b-2 border-[var(--border)]">
        <img
          src={dino.image}
          alt={dino.name}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://commons.wikimedia.org/wiki/Special:FilePath/Tyrannosaurus_Rex_Holotype.jpg"; 
          }}
          // FIX MÓVIL: En LG es gris y colorea al hacer hover. En móvil (menor a LG) SIEMPRE es a color.
          className={`h-full w-full object-cover transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'} lg:group-hover:scale-110 lg:grayscale lg:group-hover:grayscale-0`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[var(--bg)] via-[var(--bg)]/40 to-transparent opacity-90" />
      </div>

      {/* CONTENT CORE */}
      <div className="p-6 md:p-8 relative z-20 flex flex-col flex-grow">
        
        <header className="mb-4">
          <h2 className="text-3xl lg:text-4xl font-black uppercase italic tracking-tighter text-[var(--text-h)] lg:group-hover:text-[var(--accent)] transition-colors duration-500 break-words hyphens-auto leading-[0.85] mb-2">
            {dino.name}
          </h2>
          <p className="text-[10px] font-mono font-bold text-[var(--text)] opacity-60 tracking-widest uppercase">
            // CLASS: {dino.diet}
          </p>
        </header>

        <p className="text-xs font-medium leading-relaxed text-[var(--text)] italic border-l-2 border-[var(--accent-border)] pl-4 mb-6 line-clamp-3">
          "{dino.description}"
        </p>

        {/* DATA BARS DINÁMICAS */}
        <div className="space-y-4 mt-auto mb-8">
          {[
            { label: 'Hazard_Level', val: dino.dangerLevel, color: 'var(--accent)' },
            { label: 'Gen_Stability', val: geneticStability, color: 'var(--text-h)' }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-[9px] font-black opacity-50 uppercase tracking-widest text-[var(--text-h)]">
                <span>{stat.label}</span>
                <span>Lv.{stat.val}</span>
              </div>
              <div className="flex gap-0.5 h-2">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    // FIX MÓVIL: En teléfonos el borde es sutilmente visible para no perder la forma de la barra
                    className="flex-1 transition-all duration-500 border border-white/5 lg:border-[var(--border)]"
                    style={{ 
                      backgroundColor: i < stat.val && isIntersecting ? stat.color : 'transparent',
                      transitionDelay: `${i * 40 + idx * 150}ms`,
                      transform: isIntersecting ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'bottom'
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTÓN INFERIOR (Optimizado para Touch) */}
        <button 
          onClick={() => onDecrypt(dino)}
          className="mt-auto w-full group/btn relative py-4 lg:py-3 bg-transparent border-2 border-[var(--text-h)] overflow-hidden transition-all active:scale-95 active:brightness-75"
        >
          {/* FIX MÓVIL: En móvil el fondo reacciona al "active" (tap), en desktop al "hover" */}
          <div className="absolute inset-0 bg-[var(--text-h)] translate-y-[100%] lg:group-hover/btn:translate-y-0 active:translate-y-0 transition-transform duration-300 ease-out" />
          
          <span className="relative z-10 flex items-center justify-center gap-3 font-black text-[10px] tracking-[0.3em] text-[var(--text-h)] lg:group-hover/btn:text-[var(--bg)] active:text-[var(--bg)] transition-colors duration-300">
            DESENCRIPTAR
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="lg:group-hover/btn:translate-x-2 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </button>

      </div>

      {/* OVERLAY TÉCNICO (Borde iluminado en Desktop) */}
      <div className="hidden lg:block absolute -inset-[1px] border border-white/5 pointer-events-none group-hover:border-[var(--accent-border)] transition-colors duration-500" />
    </article>
  );
}