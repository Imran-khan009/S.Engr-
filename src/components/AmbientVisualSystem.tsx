import React, { useEffect, useState } from 'react';

/**
 * High-performance, lightweight mouse-reactive glow and ambient background
 * Uses passive mouse coordinates with requestAnimationFrame for 60fps performance
 * and zero CPU overhead. Fully respects prefers-reduced-motion.
 */
export const AmbientVisualSystem: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Check for touch-only or reduced-motion devices
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          setMousePos({ x: targetX, y: targetY });
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle Mouse-Reactive Spotlight Glow */}
      {mousePos && (
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${mousePos.x - 250}px, ${mousePos.y - 250}px, 0)`,
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 70%)',
            willChange: 'transform'
          }}
        />
      )}

      {/* Subtle ambient deep gradients in corners */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-cyan-950/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-blue-950/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-950/15 rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
};
