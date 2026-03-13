/**
 * useConfetti.ts
 * Manages confetti particle state for celebrations.
 */

import { useState, useCallback } from 'react';

export interface ConfettiParticle {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  shape: 'circle' | 'square' | 'triangle';
}

const COLORS = ['#fbbf24', '#f472b6', '#60a5fa', '#34d399', '#a78bfa', '#fb923c', '#f87171', '#38bdf8'];

let particleId = 0;

export function useConfetti() {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const [active, setActive] = useState(false);

  const burst = useCallback((count = 60) => {
    const newParticles: ConfettiParticle[] = Array.from({ length: count }, () => ({
      id: particleId++,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 8 + 6,
      delay: Math.random() * 0.8,
      duration: Math.random() * 1.5 + 2,
      shape: (['circle', 'square', 'triangle'] as const)[Math.floor(Math.random() * 3)],
    }));
    setParticles(newParticles);
    setActive(true);
    setTimeout(() => {
      setParticles([]);
      setActive(false);
    }, 3500);
  }, []);

  const clear = useCallback(() => {
    setParticles([]);
    setActive(false);
  }, []);

  return { particles, active, burst, clear };
}
