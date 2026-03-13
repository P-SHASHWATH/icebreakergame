/**
 * GamePage.tsx
 * Main game screen: player indicator, question card, timer, controls.
 */

import React, { useEffect, useRef, useState } from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { PlayerTurnIndicator } from '../components/PlayerTurnIndicator';
import { QuestionCard } from '../components/QuestionCard';
import { GameControls } from '../components/GameControls';
import { TimerRing } from '../components/TimerRing';
import { Confetti } from '../components/Confetti';
import { useTimer } from '../hooks/useTimer';
import { useConfetti } from '../hooks/useConfetti';
import { GameState } from '../utils/GameEngine';

interface GameActions {
  nextQuestion: () => void;
  skipPlayer: () => void;
  shuffleQuestion: () => void;
  exitGame: () => void;
  toggleTimer: () => void;
}

interface Props {
  game: GameState;
  actions: GameActions;
}

export const GamePage: React.FC<Props> = ({ game, actions }) => {
  const { players, currentPlayerIndex, currentQuestion, totalQuestionsAnswered, timerEnabled, roundNumber } = game;
  const currentPlayer = players[currentPlayerIndex];
  const [flipKey, setFlipKey] = useState(0);
  const { particles, burst } = useConfetti();
  const prevQuestionId = useRef<number | null>(null);

  // Trigger flip + confetti on question change
  useEffect(() => {
    if (currentQuestion && currentQuestion.id !== prevQuestionId.current) {
      prevQuestionId.current = currentQuestion.id;
      setFlipKey((k) => k + 1);
      burst(45);
    }
  }, [currentQuestion?.id]); // eslint-disable-line

  // Timer
  const timer = useTimer({
    duration: 30,
    enabled: timerEnabled,
    onComplete: actions.nextQuestion,
  });

  // Reset timer when question changes
  useEffect(() => { if (timerEnabled) timer.reset(); }, [flipKey]); // eslint-disable-line

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === 'ArrowRight' || e.key === 'Enter') actions.nextQuestion();
      if (e.key === 'ArrowLeft') actions.skipPlayer();
      if (e.key === 's' || e.key === 'S') actions.shuffleQuestion();
      if (e.key === 'Escape') actions.exitGame();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [actions]);

  if (!currentPlayer || !currentQuestion) return null;

  return (
    <div className="relative min-h-screen flex flex-col noise">
      <AnimatedBackground variant="game" />
      <Confetti particles={particles} />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-5 pb-2">
          {/* Round + count info */}
          <div className="flex flex-col">
            <span className="text-white/30 text-xs font-mono uppercase tracking-widest">
              Round {roundNumber}
            </span>
            <span className="text-white/60 text-sm font-display font-medium">
              {totalQuestionsAnswered} answered
            </span>
          </div>

          {/* Timer */}
          {timerEnabled && (
            <TimerRing
              timeLeft={timer.timeLeft}
              progress={timer.progress}
              isWarning={timer.isWarning}
              isDanger={timer.isDanger}
              size={72}
            />
          )}

          {/* Exit button */}
          <button onClick={actions.exitGame}
            className="text-white/30 hover:text-white/70 transition-colors text-sm font-mono flex items-center gap-1">
            Exit <span>✕</span>
          </button>
        </div>

        {/* Player turn indicator */}
        <div className="px-4 py-4">
          <PlayerTurnIndicator players={players} currentIndex={currentPlayerIndex} />
        </div>

        {/* Current player hero label */}
        <div className="text-center px-4 mb-2">
          <div className="inline-flex items-center gap-2">
            <span className="font-display text-2xl sm:text-3xl font-bold transition-all duration-500"
              style={{ color: currentPlayer.color, textShadow: `0 0 30px ${currentPlayer.color}60` }}>
              {currentPlayer.emoji} {currentPlayer.name}
            </span>
            <span className="text-white/30 font-display text-xl font-light">'s turn</span>
          </div>
        </div>

        {/* Question card — flex grows to fill space */}
        <div className="flex-1 flex flex-col items-center justify-center py-6">
          <QuestionCard
            question={currentQuestion}
            playerName={currentPlayer.name}
            playerColor={currentPlayer.color}
            playerEmoji={currentPlayer.emoji}
            flipKey={flipKey}
          />
        </div>

        {/* Controls */}
        <div className="pb-8 pt-2">
          <GameControls
            onNext={actions.nextQuestion}
            onSkip={actions.skipPlayer}
            onShuffle={actions.shuffleQuestion}
            onExit={actions.exitGame}
            onToggleTimer={actions.toggleTimer}
            timerEnabled={timerEnabled}
          />
        </div>
      </div>
    </div>
  );
};
