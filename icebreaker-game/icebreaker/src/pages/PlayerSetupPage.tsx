/**
 * PlayerSetupPage.tsx
 * Dynamic name input fields for each player with validation.
 */

import React, { useState, useRef, useEffect } from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { validatePlayers } from '../utils/PlayerManager';

interface Props {
  playerCount: number;
  onConfirm: (names: string[], timerEnabled: boolean) => void;
  onBack: () => void;
}

const PLACEHOLDER_NAMES = ['Alex', 'Jordan', 'Sam', 'Riley', 'Morgan', 'Casey'];
const EMOJIS = ['🦁', '🦊', '🐺', '🐼', '🦋', '🐉'];
const COLORS = ['#fbbf24', '#f472b6', '#60a5fa', '#34d399', '#a78bfa', '#fb923c'];

export const PlayerSetupPage: React.FC<Props> = ({ playerCount, onConfirm, onBack }) => {
  const [names, setNames] = useState<string[]>(Array(playerCount).fill(''));
  const [error, setError] = useState<string | null>(null);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { firstRef.current?.focus(); }, []);

  const handleChange = (i: number, val: string) => {
    setError(null);
    setNames((prev) => { const n = [...prev]; n[i] = val; return n; });
  };

  const handleSubmit = () => {
    const err = validatePlayers(names);
    if (err) { setError(err); return; }
    onConfirm(names, timerEnabled);
  };

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'Enter') {
      if (i === playerCount - 1) handleSubmit();
      else {
        const next = document.getElementById(`player-input-${i + 1}`);
        next?.focus();
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col noise">
      <AnimatedBackground variant="cool" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <button onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm font-mono">
          ← Back
        </button>

        <div className="text-center mb-10 animate-slide-down">
          <div className="text-4xl mb-4">✍️</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            Name your players
          </h2>
          <p className="text-white/40 font-body text-lg">{playerCount} players · Enter everyone's name</p>
        </div>

        {/* Name inputs */}
        <div className="w-full max-w-md space-y-3 mb-6 stagger-children">
          {Array.from({ length: playerCount }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              {/* Emoji avatar */}
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ backgroundColor: `${COLORS[i]}20`, border: `1px solid ${COLORS[i]}40` }}>
                {EMOJIS[i]}
              </div>
              {/* Input */}
              <div className="relative flex-1">
                <input
                  id={`player-input-${i}`}
                  ref={i === 0 ? firstRef : undefined}
                  type="text"
                  value={names[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  maxLength={24}
                  placeholder={`Player ${i + 1} — e.g. ${PLACEHOLDER_NAMES[i]}`}
                  className="w-full px-4 py-3 rounded-xl font-body text-white placeholder-white/20 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${names[i] ? COLORS[i] + '60' : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: names[i] ? `0 0 20px ${COLORS[i]}15` : 'none',
                    caretColor: COLORS[i],
                  }}
                />
                {/* Player label */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono"
                  style={{ color: COLORS[i] + '80' }}>
                  P{i + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="w-full max-w-md mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-body text-center animate-bounce-in">
            ⚠️ {error}
          </div>
        )}

        {/* Timer toggle */}
        <div className="w-full max-w-md mb-8">
          <button onClick={() => setTimerEnabled(!timerEnabled)}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
            style={{
              background: timerEnabled ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.04)',
              border: timerEnabled ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(255,255,255,0.08)',
            }}>
            <div className="flex items-center gap-3">
              <span className="text-xl">⏱️</span>
              <div className="text-left">
                <div className="text-white font-medium text-sm">30-Second Timer</div>
                <div className="text-white/40 text-xs font-mono">Auto-advance when time runs out</div>
              </div>
            </div>
            {/* Toggle pill */}
            <div className={`relative w-10 h-5 rounded-full transition-all duration-300 ${timerEnabled ? 'bg-emerald-400' : 'bg-white/20'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm ${timerEnabled ? 'left-5' : 'left-0.5'}`} />
            </div>
          </button>
        </div>

        {/* Continue button */}
        <button onClick={handleSubmit}
          className="w-full max-w-md py-4 rounded-xl font-display font-bold text-lg text-black transition-all duration-300 hover:scale-[1.02] active:scale-95"
          style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            boxShadow: '0 0 30px rgba(251,191,36,0.3)', }}>
          Let's Play! 🎯
        </button>

        <p className="mt-4 text-white/20 text-xs font-mono">Press Enter to move between fields</p>
      </div>
    </div>
  );
};
