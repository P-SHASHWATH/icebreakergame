/**
 * SummaryPage.tsx
 * End-of-game summary screen with stats and navigation options.
 */

import React, { useEffect, useState } from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Confetti } from '../components/Confetti';
import { useConfetti } from '../hooks/useConfetti';
import { GameState, formatDuration } from '../utils/GameEngine';
import { CATEGORY_CONFIG } from '../data/questions';

interface Props {
  game: GameState;
  onPlayAgain: () => void;
  onHome: () => void;
}

export const SummaryPage: React.FC<Props> = ({ game, onPlayAgain, onHome }) => {
  const { players, totalQuestionsAnswered, questionHistory, gameStartTime, roundNumber } = game;
  const { particles, burst } = useConfetti();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    setTimeout(() => burst(80), 400);
  }, []); // eslint-disable-line

  // Count questions by category
  const categoryCounts = questionHistory.reduce<Record<string, number>>((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];
  const duration = formatDuration(gameStartTime);

  return (
    <div className="relative min-h-screen flex flex-col noise">
      <AnimatedBackground variant="warm" />
      <Confetti particles={particles} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Trophy */}
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          style={{ transitionDelay: '0.1s' }}>
          <div className="text-7xl sm:text-8xl mb-4 text-center animate-bounce-in">🏆</div>
        </div>

        {/* Title */}
        <div className={`text-center mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.3s' }}>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
            Game <span className="text-gradient">Complete!</span>
          </h2>
          <p className="text-white/40 font-body text-lg">You all survived the icebreaker 🎉</p>
        </div>

        {/* Stats grid */}
        <div className={`w-full max-w-lg grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.45s' }}>
          {[
            { label: 'Players', value: players.length.toString(), emoji: '👥' },
            { label: 'Questions', value: totalQuestionsAnswered.toString(), emoji: '❓' },
            { label: 'Rounds', value: roundNumber.toString(), emoji: '🔄' },
            { label: 'Time', value: duration, emoji: '⏱️' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 border border-white/10 text-center">
              <div className="text-2xl mb-1">{s.emoji}</div>
              <div className="font-display font-bold text-amber-400 text-xl">{s.value}</div>
              <div className="text-white/40 text-xs font-mono uppercase tracking-wide mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Players who played */}
        <div className={`w-full max-w-lg glass rounded-2xl p-5 border border-white/10 mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.6s' }}>
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest text-center mb-4">Players</p>
          <div className="flex flex-wrap justify-center gap-2">
            {players.map((p) => (
              <div key={p.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: `${p.color}20`, border: `1px solid ${p.color}40`, color: p.color }}>
                <span>{p.emoji}</span>
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top category */}
        {topCategory && (
          <div className={`w-full max-w-lg mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0.75s' }}>
            <div className="glass rounded-2xl p-4 border border-white/10 text-center">
              <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-2">Most Asked Category</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">{CATEGORY_CONFIG[topCategory[0] as keyof typeof CATEGORY_CONFIG]?.emoji}</span>
                <span className="font-display font-bold text-white text-xl capitalize">{topCategory[0]}</span>
                <span className="text-white/30 font-mono text-sm">({topCategory[1]} questions)</span>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className={`w-full max-w-lg flex flex-col sm:flex-row gap-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.9s' }}>
          <button onClick={onPlayAgain}
            className="flex-1 py-4 rounded-xl font-display font-bold text-lg text-black transition-all duration-300 hover:scale-[1.02] active:scale-95"
            style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              boxShadow: '0 0 30px rgba(251,191,36,0.3)' }}>
            🔄 Play Again
          </button>
          <button onClick={onHome}
            className="flex-1 py-4 rounded-xl font-display font-bold text-lg text-white/80 transition-all duration-300 hover:text-white hover:scale-[1.02] active:scale-95"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            🏠 Return Home
          </button>
        </div>
      </div>
    </div>
  );
};
