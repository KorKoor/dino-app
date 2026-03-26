export default function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-[var(--border)] p-8 lg:p-12 bg-[var(--code-bg)] relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text)] transition-opacity hover:opacity-100">
        
        {/* Identificador de Sistema */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[var(--accent)] animate-pulse"></span>
            &copy; 2026 DINOPEDIA_CORE_SYSTEM
          </span>
          <span className="text-[var(--accent)]">Sector_Aguascalientes // MX</span>
        </div>
        
        {/* Enlaces de Red (Tus perfiles reales) */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <a 
            href="https://github.com/KorKoor" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-[var(--accent)] transition-colors border-b border-transparent hover:border-[var(--accent)] pb-1"
          >
            GitHub_Source
          </a>
          <a 
            href="https://linkedin.com/in/carlosgarcia-it" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-[var(--accent)] transition-colors border-b border-transparent hover:border-[var(--accent)] pb-1"
          >
            LinkedIn_Profile
          </a>
          <a 
            href="https://korwork.org" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-[var(--accent)] transition-colors border-b border-transparent hover:border-[var(--accent)] pb-1"
          >
            Main_Network
          </a>
        </div>

      </div>
    </footer>
  );
}