/**
 * AnimatedBackground.tsx
 * Ambient gradient blob background used across all screens.
 */

import React from 'react';

interface Props {
  variant?: 'default' | 'warm' | 'cool' | 'game';
}

export const AnimatedBackground: React.FC<Props> = ({ variant = 'default' }) => {
  const configs = {
    default: {
      blob1: 'bg-amber-500/20',
      blob2: 'bg-pink-500/15',
      blob3: 'bg-violet-500/10',
    },
    warm: {
      blob1: 'bg-orange-500/20',
      blob2: 'bg-amber-400/15',
      blob3: 'bg-rose-500/10',
    },
    cool: {
      blob1: 'bg-blue-500/20',
      blob2: 'bg-indigo-500/15',
      blob3: 'bg-violet-500/10',
    },
    game: {
      blob1: 'bg-amber-400/15',
      blob2: 'bg-pink-400/10',
      blob3: 'bg-violet-400/8',
    },
  };

  const c = configs[variant];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#07070d]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated blobs */}
      <div
        className={`absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full ${c.blob1} blur-[120px] blob-animate`}
      />
      <div
        className={`absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full ${c.blob2} blur-[100px] blob-animate-2`}
      />
      <div
        className={`absolute top-1/3 left-1/2 w-1/2 h-1/2 rounded-full ${c.blob3} blur-[80px] blob-animate-3`}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(7,7,13,0.7) 100%)' }}
      />
    </div>
  );
};
