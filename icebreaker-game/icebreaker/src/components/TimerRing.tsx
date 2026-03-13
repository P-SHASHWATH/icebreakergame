/**
 * TimerRing.tsx
 * Circular countdown timer with color transitions.
 */

import React from 'react';

interface Props {
  timeLeft: number;
  progress: number; // 1 → 0
  isWarning: boolean;
  isDanger: boolean;
  size?: number;
}

export const TimerRing: React.FC<Props> = ({
  timeLeft,
  progress,
  isWarning,
  isDanger,
  size = 80,
}) => {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  const color = isDanger ? '#ef4444' : isWarning ? '#f97316' : '#34d399';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={6}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease',
            filter: `drop-shadow(0 0 6px ${color}80)`,
          }}
        />
      </svg>
      {/* Number */}
      <div className="absolute flex items-center justify-center">
        <span
          className={`font-display font-bold tabular-nums transition-colors duration-300 ${
            isDanger ? 'text-red-400 animate-pulse' : isWarning ? 'text-orange-400' : 'text-white'
          }`}
          style={{ fontSize: size * 0.28 }}
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
};
