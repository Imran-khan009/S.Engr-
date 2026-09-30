import React from 'react';
import { WhatsAppIcon } from './SocialIcons';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside
      aria-label="Instant WhatsApp chat"
      className="fixed bottom-6 right-6 z-40 flex items-center group"
    >
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-xl bg-slate-900/95 text-slate-100 text-xs font-mono font-bold border border-slate-800 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Quick Chat with Engr. Imran Khan
      </span>

      {/* Floating Action Button */}
      <a
        id="floating-whatsapp-btn"
        href="https://wa.me/923331244214?text=Assalam-o-Alaikum%20Engr.%20Imran,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer relative"
        aria-label="Chat on WhatsApp with Engr. Imran Khan"
      >
        {/* Pulse beacon */}
        <span className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-orange-400 border-2 border-slate-950 animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-orange-400 border-2 border-slate-950" />
        
        <WhatsAppIcon className="w-5 h-5 md:w-7 md:h-7 transition-all duration-200" />
      </a>
    </aside>
  );
};
