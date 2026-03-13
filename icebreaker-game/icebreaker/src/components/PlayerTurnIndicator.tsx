/**
 * PlayerTurnIndicator.tsx
 * Shows all players with the current one highlighted.
 */

import React from 'react';
import { Player } from '../utils/PlayerManager';

interface Props {
  players: Player[];
  currentIndex: number;
}

export const PlayerTurnIndicator: React.FC<Props> = ({ players, currentIndex }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 px-4">
      {players.map((player, index) => {
        const isCurrent = index === currentIndex;
        return (
          <div
            key={player.id}
            className="flex items-center gap-1.5 transition-all duration-500"
          >
            <div
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-500 ${
                isCurrent
                  ? 'text-black scale-110'
                  : 'text-white/40 scale-95'
              }`}
              style={
                isCurrent
                  ? {
                      backgroundColor: player.color,
                      boxShadow: `0 0 20px ${player.color}80, 0 0 40px ${player.color}40`,
                    }
                  : { backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }
              }
            >
              <span className={`text-xs transition-all duration-300 ${isCurrent ? 'opacity-100' : 'opacity-40'}`}>
                {player.emoji}
              </span>
              <span className="font-body font-medium">{player.name}</span>
              {isCurrent && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </div>

            {/* Separator dot */}
            {index < players.length - 1 && (
              <span className="text-white/20 text-xs select-none">•</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
