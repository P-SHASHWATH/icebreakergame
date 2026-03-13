/**
 * GameEngine.ts
 * Core game logic: manages turns, progression, and game state transitions.
 */

import { Player } from './PlayerManager';
import { Question } from '../data/questions';

export type GamePhase = 'landing' | 'player-select' | 'player-setup' | 'playing' | 'summary';

export interface GameState {
  phase: GamePhase;
  players: Player[];
  currentPlayerIndex: number;
  currentQuestion: Question | null;
  questionHistory: Question[];
  totalQuestionsAnswered: number;
  roundNumber: number;
  timerEnabled: boolean;
  gameStartTime: Date | null;
}

export const initialGameState: GameState = {
  phase: 'landing',
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: null,
  questionHistory: [],
  totalQuestionsAnswered: 0,
  roundNumber: 1,
  timerEnabled: false,
  gameStartTime: null,
};

/** Get the current player */
export function getCurrentPlayer(state: GameState): Player | null {
  if (state.players.length === 0) return null;
  return state.players[state.currentPlayerIndex];
}

/** Advance to the next player */
export function nextPlayer(state: GameState): Partial<GameState> {
  const nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
  const isNewRound = nextIndex === 0;
  return {
    currentPlayerIndex: nextIndex,
    roundNumber: isNewRound ? state.roundNumber + 1 : state.roundNumber,
  };
}

/** Advance to the previous player */
export function prevPlayer(state: GameState): Partial<GameState> {
  const prevIndex =
    state.currentPlayerIndex === 0
      ? state.players.length - 1
      : state.currentPlayerIndex - 1;
  return { currentPlayerIndex: prevIndex };
}

/** Record a question as answered */
export function recordAnswer(state: GameState): Partial<GameState> {
  if (!state.currentQuestion) return {};
  return {
    questionHistory: [...state.questionHistory, state.currentQuestion],
    totalQuestionsAnswered: state.totalQuestionsAnswered + 1,
  };
}

/** Format game duration */
export function formatDuration(startTime: Date | null): string {
  if (!startTime) return '0 min';
  const diff = Math.floor((Date.now() - startTime.getTime()) / 1000);
  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;
  if (minutes === 0) return `${seconds}s`;
  if (seconds === 0) return `${minutes} min`;
  return `${minutes}m ${seconds}s`;
}
