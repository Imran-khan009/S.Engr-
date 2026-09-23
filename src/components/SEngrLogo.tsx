import React from 'react';

interface SEngrLogoProps {
  className?: string;
  variant?: 'card' | 'badge' | 'minimal' | 'navbar';
  onClick?: () => void;
}

export const SEngrLogo: React.FC<SEngrLogoProps> = ({
  className = '',
  variant = 'badge',
  onClick
}) => {
  if (variant === 'navbar') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
      >
        <div className="w-10 h-10 rounded-xl bg-[#1d1f21] border border-slate-700/80 p-1 flex items-center justify-center shadow-md group-hover:border-orange-500/50 transition-colors">
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full text-slate-100"
            fill="none"
          >
            {/* Serif IK Monogram */}
            <text
              x="170"
              y="300"
              fontFamily="Cinzel, 'Playfair Display', Didot, 'Times New Roman', serif"
              fontSize="165"
              fontWeight="700"
              fill="#F5F5F3"
              textAnchor="middle"
            >
              I
            </text>
            <text
              x="330"
              y="300"
              fontFamily="Cinzel, 'Playfair Display', Didot, 'Times New Roman', serif"
              fontSize="165"
              fontWeight="700"
              fill="#F5F5F3"
              textAnchor="middle"
            >
              K
            </text>
            {/* Divider line & diamond */}
            <line x1="250" y1="130" x2="250" y2="215" stroke="#A8A7A4" strokeWidth="2.5" />
            <line x1="250" y1="265" x2="250" y2="350" stroke="#A8A7A4" strokeWidth="2.5" />
            <polygon points="250,125 254,130 250,135 246,130" fill="#A8A7A4" />
            <polygon points="250,345 254,350 250,355 246,350" fill="#A8A7A4" />
            {/* S • ENGR crossbar */}
            <rect x="140" y="222" width="220" height="34" fill="#1d1f21" />
            <text
              x="250"
              y="244"
              fontFamily="Montserrat, system-ui, sans-serif"
              fontSize="20"
              fontWeight="700"
              fill="#F5F5F3"
              letterSpacing="0.32em"
              textAnchor="middle"
            >
              S • ENGR
            </text>
          </svg>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-extrabold tracking-wider text-slate-100 text-sm sm:text-base leading-none">
            S • ENGR
          </span>
          <span className="text-[10px] tracking-widest uppercase font-mono text-slate-400 mt-1">
            Technology &amp; Engineering
          </span>
        </div>
      </div>
    );
  }

  // Large Prominent Brand Card (Matches uploaded 2.png with perfection)
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl bg-[#222325] border border-slate-800 shadow-2xl p-6 sm:p-8 flex flex-col items-center justify-center select-none text-center ${className}`}
    >
      <div className="w-full max-w-[280px] aspect-square flex items-center justify-center relative">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full drop-shadow-md"
          fill="none"
        >
          {/* Serif IK Monogram */}
          <text
            x="170"
            y="300"
            fontFamily="Cinzel, 'Playfair Display', Didot, 'Times New Roman', serif"
            fontSize="165"
            fontWeight="700"
            fill="#F4F3F0"
            textAnchor="middle"
          >
            I
          </text>
          <text
            x="330"
            y="300"
            fontFamily="Cinzel, 'Playfair Display', Didot, 'Times New Roman', serif"
            fontSize="165"
            fontWeight="700"
            fill="#F4F3F0"
            textAnchor="middle"
          >
            K
          </text>

          {/* Vertical Divider with Diamond Endpoints */}
          <g stroke="#BEBDBA" strokeWidth="2">
            <line x1="250" y1="130" x2="250" y2="215" />
            <line x1="250" y1="265" x2="250" y2="355" />
            <polygon points="250,123 255,130 250,137 245,130" fill="#BEBDBA" />
            <polygon points="250,348 255,355 250,362 245,355" fill="#BEBDBA" />
          </g>

          {/* S • ENGR Banner across middle */}
          <rect x="130" y="222" width="240" height="34" fill="#222325" />
          <text
            x="254"
            y="245"
            fontFamily="Montserrat, system-ui, sans-serif"
            fontSize="21"
            fontWeight="700"
            fill="#F4F3F0"
            letterSpacing="0.36em"
            textAnchor="middle"
          >
            S • ENGR
          </text>

          {/* Technology & Engineering Subtitle */}
          <text
            x="252"
            y="410"
            fontFamily="Montserrat, system-ui, sans-serif"
            fontSize="12"
            fontWeight="500"
            fill="#A8A7A4"
            letterSpacing="0.42em"
            textAnchor="middle"
          >
            TECHNOLOGY &amp; ENGINEERING
          </text>
        </svg>
      </div>
    </div>
  );
};
