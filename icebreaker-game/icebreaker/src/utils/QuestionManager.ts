/**
 * QuestionManager.ts
 * Handles question shuffling, selection, and pool management.
 * Ensures no question repeats until the pool is exhausted.
 */

import { Question, Category } from '../data/questions';

export interface QuestionManagerState {
  pool: Question[];       // Questions not yet used in current round
  used: Question[];       // Questions used in current round
  activeCategories: Set<Category>;
}

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Initialize question pool from questions array */
export function initPool(allQuestions: Question[], activeCategories?: Set<Category>): QuestionManagerState {
  const filtered = activeCategories
    ? allQuestions.filter((q) => activeCategories.has(q.category))
    : allQuestions;

  return {
    pool: shuffle(filtered),
    used: [],
    activeCategories: activeCategories ?? new Set(allQuestions.map((q) => q.category)),
  };
}

/**
 * Draw the next question. If pool is empty, resets it from the used stack.
 * Returns the question and the updated state.
 */
export function drawQuestion(
  state: QuestionManagerState,
  allQuestions: Question[]
): { question: Question; nextState: QuestionManagerState } {
  let pool = [...state.pool];
  let used = [...state.used];

  // Reset pool if exhausted
  if (pool.length === 0) {
    pool = shuffle(used);
    used = [];
  }

  const [question, ...rest] = pool;
  return {
    question,
    nextState: { ...state, pool: rest, used: [...used, question] },
  };
}

/** Shuffle and get a new random question (not the current one) */
export function shuffleQuestion(
  current: Question | null,
  state: QuestionManagerState,
  allQuestions: Question[]
): { question: Question; nextState: QuestionManagerState } {
  let pool = [...state.pool];
  let used = [...state.used];

  // Remove current from pool and try to avoid repeating it
  if (current && pool.length === 0) {
    pool = shuffle(used.filter((q) => q.id !== current.id));
    used = current ? [current] : [];
  }

  if (pool.length === 0) {
    // Fallback: just draw next question normally
    return drawQuestion(state, allQuestions);
  }

  const [question, ...rest] = pool;
  return {
    question,
    nextState: { ...state, pool: rest, used: [...used, question] },
  };
}

/** Get progress percentage for pool consumption */
export function getPoolProgress(state: QuestionManagerState): number {
  const total = state.pool.length + state.used.length;
  if (total === 0) return 0;
  return Math.round((state.used.length / total) * 100);
}
