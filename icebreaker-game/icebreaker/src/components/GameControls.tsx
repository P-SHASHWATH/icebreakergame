/**
 * GameControls.tsx
 * Bottom control bar: Next, Previous, Skip, Shuffle, Exit.
 */

import React from 'react';

interface Props {
  onNext: () => void;
  onSkip: () => void;
  onShuffle: () => void;
  onExit: () => void;
  onToggleTimer: () => void;
  timerEnabled: boolean;
}

const Btn: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  className?: string;
}> = ({ onClick, children, variant = 'secondary', className = '' }) => {
  const base =
    'flex items-center gap-2 px-4 py-2.5 rounded-xl font-body font-medium text-sm transition-all duration-200 active:scale-95 select-none cursor-pointer';
  const styles = {
    primary:
      'bg-amber-400 text-black hover:bg-amber-300 shadow-lg shadow-amber-400/20',
    secondary:
      'glass text-white/80 hover:text-white hover:bg-white/10 border border-white/10',
    danger:
      'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30',
    ghost: 'text-white/50 hover:text-white/80',
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const GameControls: React.FC<Props> = ({
  onNext,
  onSkip,
  onShuffle,
  onExit,
  onToggleTimer,
  timerEnabled,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-3 px-4">
      {/* Primary action */}
      <Btn onClick={onNext} variant="primary" className="w-full max-w-sm justify-center py-3 text-base">
        <span>Next Question</span>
        <span className="text-lg">→</span>
      </Btn>

      {/* Secondary actions */}
      <div className="flex flex-wrap justify-center gap-2">
        <Btn onClick={onShuffle} variant="secondary">
          <span>🔀</span>
          <span>Shuffle</span>
        </Btn>
        <Btn onClick={onSkip} variant="secondary">
          <span>⏭️</span>
          <span>Skip Player</span>
        </Btn>
        <Btn
          onClick={onToggleTimer}
          variant={timerEnabled ? 'primary' : 'secondary'}
          className={timerEnabled ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30 hover:bg-emerald-400/30' : ''}
        >
          <span>⏱️</span>
          <span>{timerEnabled ? 'Timer On' : 'Timer Off'}</span>
        </Btn>
        <Btn onClick={onExit} variant="danger">
          <span>🚪</span>
          <span>Exit</span>
        </Btn>
      </div>

      {/* Keyboard hint */}
      <p className="text-white/20 text-xs font-mono hidden sm:block">
        → next &nbsp;|&nbsp; skip player &nbsp;|&nbsp; s shuffle
      </p>
    </div>
  );
};
