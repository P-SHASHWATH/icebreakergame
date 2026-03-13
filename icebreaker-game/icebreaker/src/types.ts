// ============================================================
// Shared TypeScript types across the application
// ============================================================

export type GameScreen = 'landing' | 'playerSelect' | 'nameSetup' | 'game' | 'summary'

export interface Player {
  id: number
  name: string
  questionsAnswered: number
  color: string
}

export interface GameState {
  screen: GameScreen
  players: Player[]
  currentPlayerIndex: number
  currentQuestion: import('./data/questions').Question | null
  answeredQuestions: number[]
  totalQuestionsAnswered: number
  timerEnabled: boolean
  startedAt: Date | null
}

export interface GameSummary {
  players: Player[]
  totalQuestions: number
  duration: number // in seconds
}

// Player avatar colors — vibrant and distinct
export const PLAYER_COLORS = [
  '#f59e0b', // amber
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#10b981', // emerald
  '#8b5cf6', // violet
  '#f97316', // orange
]

export const PLAYER_COLOR_CLASSES = [
  { bg: 'bg-amber-500', text: 'text-amber-300', border: 'border-amber-400', glow: 'shadow-amber-500/50' },
  { bg: 'bg-pink-500', text: 'text-pink-300', border: 'border-pink-400', glow: 'shadow-pink-500/50' },
  { bg: 'bg-cyan-500', text: 'text-cyan-300', border: 'border-cyan-400', glow: 'shadow-cyan-500/50' },
  { bg: 'bg-emerald-500', text: 'text-emerald-300', border: 'border-emerald-400', glow: 'shadow-emerald-500/50' },
  { bg: 'bg-violet-500', text: 'text-violet-300', border: 'border-violet-400', glow: 'shadow-violet-500/50' },
  { bg: 'bg-orange-500', text: 'text-orange-300', border: 'border-orange-400', glow: 'shadow-orange-500/50' },
]
