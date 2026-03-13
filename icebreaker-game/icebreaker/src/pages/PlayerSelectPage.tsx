/**
 * PlayerSelectPage.tsx
 * Player count selection with illustrated cards.
 */

import React from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';

interface Props {
  onSelect: (count: number) => void;
  onBack: () => void;
}

const PLAYER_OPTIONS = [
  { count: 2, emoji: '👫', label: 'Two', desc: 'Intimate & personal', color: '#fbbf24' },
  { count: 3, emoji: '👨‍👩‍👧', label: 'Three', desc: 'A perfect trio', color: '#f472b6' },
  { count: 4, emoji: '👨‍👩‍👧‍👦', label: 'Four', desc: 'The classic group', color: '#60a5fa' },
  { count: 6, emoji: '🎉', label: 'Six', desc: 'Maximum chaos', color: '#a78bfa' },
];

export const PlayerSelectPage: React.FC<Props> = ({ onSelect, onBack }) => {
  return (
    <div className="relative min-h-screen flex flex-col noise">
      <AnimatedBackground variant="warm" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Back */}
        <button onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm font-mono">
          ← Back
        </button>

        {/* Header */}
        <div className="text-center mb-12 animate-slide-down">
          <div className="text-4xl mb-4">👥</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            How many players?
          </h2>
          <p className="text-white/40 font-body text-lg">Choose your squad size</p>
        </div>

        {/* Player count cards */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg stagger-children">
          {PLAYER_OPTIONS.map(({ count, emoji, label, desc, color }) => (
            <button key={count} onClick={() => onSelect(count)}
              className="group relative glass rounded-2xl p-6 flex flex-col items-center gap-3 border border-white/10 hover:border-opacity-60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{ '--hover-color': color } as React.CSSProperties}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${color}60`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${color}20`;
                (e.currentTarget as HTMLElement).style.background = `${color}08`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
                (e.currentTarget as HTMLElement).style.background = '';
              }}>
              {/* Player icons */}
              <div className="text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110">
                {emoji}
              </div>
              {/* Count badge */}
              <div className="text-3xl font-display font-bold transition-colors duration-300"
                style={{ color }}>
                {count}
              </div>
              <div>
                <div className="text-white font-display font-semibold text-lg">{label}</div>
                <div className="text-white/40 text-sm font-body">{desc}</div>
              </div>
              {/* Person dots */}
              <div className="flex gap-1 mt-1">
                {Array.from({ length: count }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{ backgroundColor: color, opacity: 0.6 + i * 0.05 }} />
                ))}
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 text-white/20 text-xs font-mono">You can always add more fun later</p>
      </div>
    </div>
  );
};
