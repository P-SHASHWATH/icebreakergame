/**
 * LandingPage.tsx
 * Hero landing page with animated background, CTA, and about section.
 */

import React, { useEffect, useState } from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';

interface Props {
  onStart: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStart }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const stars = [
    { x: 10, y: 15, delay: 0, size: 12 }, { x: 85, y: 10, delay: 1.2, size: 8 },
    { x: 5, y: 60, delay: 0.6, size: 10 }, { x: 92, y: 55, delay: 1.8, size: 14 },
    { x: 50, y: 5, delay: 0.4, size: 9 }, { x: 75, y: 80, delay: 2.1, size: 11 },
  ];

  return (
    <div className="relative min-h-screen flex flex-col noise">
      <AnimatedBackground variant="default" />
      {stars.map((s, i) => (
        <div key={i} className="absolute text-amber-400/25 select-none pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size,
            animation: `float ${3 + s.delay}s ease-in-out ${s.delay}s infinite` }}>✦</div>
      ))}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Badge */}
        <div className={`mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.1s' }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-amber-400/80 text-sm font-mono border border-amber-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Party game · No app needed · Free forever
          </span>
        </div>

        {/* Title */}
        <div className={`text-center mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.2s' }}>
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-none mb-2">
            <span className="text-gradient">New Friends</span>
          </h1>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-white/90 leading-none">
            Icebreaker
          </h1>
        </div>

        {/* Subtitle */}
        <p className={`text-white/50 text-lg sm:text-xl font-body font-light text-center max-w-md mb-12 leading-relaxed transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.35s' }}>
          Break the ice, spark real conversations, and discover who you're really hanging out with.
        </p>

        {/* CTA */}
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ transitionDelay: '0.5s' }}>
          <button onClick={onStart}
            className="group relative px-10 py-4 rounded-2xl font-display font-bold text-xl text-black overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              boxShadow: '0 0 40px rgba(251,191,36,0.4), 0 8px 32px rgba(0,0,0,0.3)' }}>
            <span className="relative z-10 flex items-center gap-3">
              <span>🎯</span>
              Start Playing
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '0.65s' }}>
          {[{ value: '200+', label: 'Questions', emoji: '❓' }, { value: '5', label: 'Categories', emoji: '🎨' },
            { value: '6', label: 'Player Max', emoji: '👥' }, { value: '∞', label: 'Fun', emoji: '✨' }].map((s) => (
            <div key={s.label} className="glass rounded-xl px-5 py-3 border border-white/10 text-center">
              <div className="text-2xl font-display font-bold text-amber-400">{s.emoji} {s.value}</div>
              <div className="text-white/40 text-xs font-mono uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* About section */}
        <div className={`w-full max-w-3xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.8s' }}>
          <div className="glass rounded-3xl p-8 border border-white/10">
            <h2 className="font-display text-2xl font-bold text-white mb-2 text-center">How It Works</h2>
            <p className="text-white/40 text-sm text-center mb-8 font-mono">Perfect for parties, meetups, or any new group</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { step: '01', icon: '👥', title: 'Add Players', desc: 'Enter names for 2–6 players. No accounts, no downloads.' },
                { step: '02', icon: '🎴', title: 'Draw Questions', desc: 'Each player gets a fun question across 5 categories.' },
                { step: '03', icon: '🔥', title: 'Get Talking', desc: 'Answer honestly, laugh loudly, and get to know each other.' },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>
                      {item.icon}
                    </div>
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-400 text-black text-[9px] font-bold font-mono flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white text-lg">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-body">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/30 text-xs font-mono uppercase tracking-widest text-center mb-4">Question Categories</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[{ emoji: '😂', label: 'Funny', color: '#fbbf24' }, { emoji: '🌊', label: 'Deep', color: '#60a5fa' },
                  { emoji: '😳', label: 'Embarrassing', color: '#f472b6' }, { emoji: '💛', label: 'Personal', color: '#34d399' },
                  { emoji: '🚀', label: 'Hypothetical', color: '#a78bfa' }].map((cat) => (
                  <span key={cat.label} className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: `${cat.color}15`, border: `1px solid ${cat.color}30`, color: cat.color }}>
                    {cat.emoji} {cat.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-8 text-white/20 text-xs font-mono">Made with ✦ for curious humans everywhere</p>
      </div>
    </div>
  );
};
