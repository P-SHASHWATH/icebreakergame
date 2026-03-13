/**
 * useGame.ts
 * Central game state hook. The single source of truth for all game state.
 */

import { useReducer, useCallback } from 'react';
import { GameState, GamePhase, initialGameState, nextPlayer, prevPlayer, recordAnswer } from '../utils/GameEngine';
import { Player, buildPlayers } from '../utils/PlayerManager';
import { QuestionManagerState, initPool, drawQuestion, shuffleQuestion } from '../utils/QuestionManager';
import allQuestions from '../data/questions';

type GameAction =
  | { type: 'GO_TO_PHASE'; phase: GamePhase }
  | { type: 'SET_PLAYERS'; players: Player[] }
  | { type: 'START_GAME'; timerEnabled: boolean }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_PLAYER' }
  | { type: 'SKIP_PLAYER' }
  | { type: 'SHUFFLE_QUESTION' }
  | { type: 'EXIT_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'TOGGLE_TIMER' };

interface FullState {
  game: GameState;
  qm: QuestionManagerState;
}

function gameReducer(state: FullState, action: GameAction): FullState {
  const { game, qm } = state;

  switch (action.type) {
    case 'GO_TO_PHASE':
      return { ...state, game: { ...game, phase: action.phase } };

    case 'SET_PLAYERS':
      return { ...state, game: { ...game, players: action.players } };

    case 'START_GAME': {
      const newQm = initPool(allQuestions);
      const { question, nextState: nextQm } = drawQuestion(newQm, allQuestions);
      return {
        qm: nextQm,
        game: {
          ...game,
          phase: 'playing',
          currentPlayerIndex: 0,
          currentQuestion: question,
          questionHistory: [],
          totalQuestionsAnswered: 0,
          roundNumber: 1,
          timerEnabled: action.timerEnabled,
          gameStartTime: new Date(),
        },
      };
    }

    case 'NEXT_QUESTION': {
      const recorded = recordAnswer(game);
      const { nextIndex, nextRound } = (() => {
        const ni = (game.currentPlayerIndex + 1) % game.players.length;
        const isNewRound = ni === 0;
        return { nextIndex: ni, nextRound: isNewRound ? game.roundNumber + 1 : game.roundNumber };
      })();
      const { question, nextState: nextQm } = drawQuestion(qm, allQuestions);
      return {
        qm: nextQm,
        game: {
          ...game,
          ...recorded,
          currentPlayerIndex: nextIndex,
          roundNumber: nextRound,
          currentQuestion: question,
        },
      };
    }

    case 'SKIP_PLAYER': {
      const nextState = nextPlayer(game);
      const { question, nextState: nextQm } = drawQuestion(qm, allQuestions);
      return {
        qm: nextQm,
        game: { ...game, ...nextState, currentQuestion: question },
      };
    }

    case 'PREV_PLAYER': {
      const prevState = prevPlayer(game);
      return { ...state, game: { ...game, ...prevState } };
    }

    case 'SHUFFLE_QUESTION': {
      const { question, nextState: nextQm } = shuffleQuestion(game.currentQuestion, qm, allQuestions);
      return { qm: nextQm, game: { ...game, currentQuestion: question } };
    }

    case 'EXIT_GAME':
      return { ...state, game: { ...game, phase: 'summary' } };

    case 'TOGGLE_TIMER':
      return { ...state, game: { ...game, timerEnabled: !game.timerEnabled } };

    case 'RESET_GAME':
      return { game: { ...initialGameState }, qm: initPool(allQuestions) };

    default:
      return state;
  }
}

const initialFullState: FullState = {
  game: initialGameState,
  qm: initPool(allQuestions),
};

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, initialFullState);

  const goToPhase = useCallback((phase: GamePhase) => dispatch({ type: 'GO_TO_PHASE', phase }), []);
  const setPlayers = useCallback((names: string[]) => dispatch({ type: 'SET_PLAYERS', players: buildPlayers(names) }), []);
  const startGame = useCallback((timerEnabled: boolean) => dispatch({ type: 'START_GAME', timerEnabled }), []);
  const nextQuestion = useCallback(() => dispatch({ type: 'NEXT_QUESTION' }), []);
  const skipPlayer = useCallback(() => dispatch({ type: 'SKIP_PLAYER' }), []);
  const prevPlayerAction = useCallback(() => dispatch({ type: 'PREV_PLAYER' }), []);
  const shuffleQuestion = useCallback(() => dispatch({ type: 'SHUFFLE_QUESTION' }), []);
  const exitGame = useCallback(() => dispatch({ type: 'EXIT_GAME' }), []);
  const resetGame = useCallback(() => dispatch({ type: 'RESET_GAME' }), []);
  const toggleTimer = useCallback(() => dispatch({ type: 'TOGGLE_TIMER' }), []);

  return {
    game: state.game,
    qm: state.qm,
    actions: {
      goToPhase,
      setPlayers,
      startGame,
      nextQuestion,
      skipPlayer,
      prevPlayer: prevPlayerAction,
      shuffleQuestion,
      exitGame,
      resetGame,
      toggleTimer,
    },
  };
}
