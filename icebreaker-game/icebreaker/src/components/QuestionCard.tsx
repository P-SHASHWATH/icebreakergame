/**
 * QuestionCard.tsx
 * The animated question card with flip effect and category badge.
 */

import React, { useState, useEffect } from 'react';
import { Question, CATEGORY_CONFIG } from '../data/questions';

interface Props {
  question: Question | null;
  playerName: string;
  playerColor: string;
  playerEmoji: string;
  flipKey: number; // increment to trigger flip
}

export const QuestionCard: React.FC<Props> = ({
  question,
  playerName,
  playerColor,
  playerEmoji,
  flipKey,
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [displayQuestion, setDisplayQuestion] = useState(question);

  useEffect(() => {
    setIsFlipping(true);
    const t1 = setTimeout(() => {
      setDisplayQuestion(question);
    }, 300); // swap at halfway point
    const t2 = setTimeout(() => {
      setIsFlipping(false);
    }, 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [flipKey]); // eslint-disable-line

  if (!displayQuestion) return null;

  const catConfig = CATEGORY_CONFIG[displayQuestion.category];

  const difficultyDots = {
    easy: 1,
    medium: 2,
    hard: 3,
  }[displayQuestion.difficulty];

  return (
    <div className="card-flip-container w-full max-w-2xl mx-auto px-4">
      <div className={`card-flip-inner ${isFlipping ? 'flipping' : ''}`}>
        {/* Card */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
            border: `1px solid ${playerColor}40`,
            boxShadow: `0 0 60px ${playerColor}20, 0 20px 60px rgba(0,0,0,0.4)`,
          }}
        >
          {/* Top accent bar */}
          <div
            className="h-1 w-full"
            style={{ background: `linear-gradient(90deg, ${playerColor}, ${catConfig.color})` }}
          />

          {/* Card header */}
          <div className="px-6 pt-5 pb-3 flex items-center justify-between">
            {/* Category badge */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${catConfig.gradient} text-black`}
            >
              <span>{catConfig.emoji}</span>
              <span className="uppercase tracking-wider font-semibold">{catConfig.label}</span>
            </div>

            {/* Difficulty */}
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((d) => (
                <div
                  key={d}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: d <= difficultyDots ? catConfig.color : 'rgba(255,255,255,0.15)',
                    boxShadow: d <= difficultyDots ? `0 0 6px ${catConfig.color}80` : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Question text */}
          <div className="px-6 py-6">
            <p
              className="text-white text-xl sm:text-2xl leading-relaxed font-display font-light tracking-wide text-center"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              {displayQuestion.question}
            </p>
          </div>

          {/* Bottom player attribution */}
          <div className="px-6 pb-5 flex items-center justify-center gap-2">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: `${playerColor}20`,
                border: `1px solid ${playerColor}40`,
                color: playerColor,
              }}
            >
              <span>{playerEmoji}</span>
              <span>Question for <strong>{playerName}</strong></span>
            </div>
          </div>

          {/* Subtle corner decoration */}
          <div
            className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-10"
            style={{
              background: `radial-gradient(circle at bottom right, ${playerColor}, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
