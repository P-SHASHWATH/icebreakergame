// ============================================================
// GameEngine — orchestrates the game, exposes all actions
// ============================================================

import { useState, useCallback, useRef, useEffect } from 'react'
import { QuestionManager } from '../utils/QuestionManager'
import { PlayerManager } from '../utils/PlayerManager'
import { Player } from '../types'
import { Question } from '../data/questions'

interface GameEngineState {
  currentPlayer: Player
  allPlayers: Player[]
  currentPlayerIndex: number
  currentQuestion: Question | null
  totalAnswered: number
  timerEnabled: boolean
  timeLeft: number
  cardKey: number // changes to trigger re-animation
}

interface GameEngineActions {
  nextQuestion: () => void
  prevQuestion: () => void
  skipPlayer: () => void
  shuffleQuestion: () => void
  toggleTimer: () => void
  resetTimer: () => void
}

interface UseGameEngineProps {
  playerNames: string[]
  timerEnabled?: boolean
}

const TIMER_DURATION = 30

export function useGameEngine({ playerNames, timerEnabled: initialTimer = false }: UseGameEngineProps): [GameEngineState, GameEngineActions] {
  const questionManagerRef = useRef<QuestionManager>(new QuestionManager())
  const playerManagerRef = useRef<PlayerManager>(new PlayerManager(playerNames))
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [state, setState] = useState<GameEngineState>(() => {
    const qm = questionManagerRef.current
    const pm = playerManagerRef.current
    return {
      currentPlayer: pm.getCurrent(),
      allPlayers: pm.getAll(),
      currentPlayerIndex: pm.getCurrentIndex(),
      currentQuestion: qm.getNext(),
      totalAnswered: 0,
      timerEnabled: initialTimer,
      timeLeft: TIMER_DURATION,
      cardKey: 0,
    }
  })

  // Timer logic
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setState(s => ({ ...s, timeLeft: TIMER_DURATION }))

    timerRef.current = setInterval(() => {
      setState(s => {
        if (s.timeLeft <= 1) {
          // Auto advance player when timer hits 0
          if (timerRef.current) clearInterval(timerRef.current)
          const pm = playerManagerRef.current
          const qm = questionManagerRef.current
          pm.next()
          return {
            ...s,
            currentPlayer: pm.getCurrent(),
            allPlayers: pm.getAll(),
            currentPlayerIndex: pm.getCurrentIndex(),
            currentQuestion: qm.getNext(),
            totalAnswered: s.totalAnswered + 1,
            timeLeft: TIMER_DURATION,
            cardKey: s.cardKey + 1,
          }
        }
        return { ...s, timeLeft: s.timeLeft - 1 }
      })
    }, 1000)
  }, [])

  useEffect(() => {
    if (state.timerEnabled) {
      startTimer()
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.timerEnabled])

  const nextQuestion = useCallback(() => {
    const pm = playerManagerRef.current
    const qm = questionManagerRef.current
    pm.next()
    setState(s => ({
      ...s,
      currentPlayer: pm.getCurrent(),
      allPlayers: pm.getAll(),
      currentPlayerIndex: pm.getCurrentIndex(),
      currentQuestion: qm.getNext(),
      totalAnswered: s.totalAnswered + 1,
      timeLeft: TIMER_DURATION,
      cardKey: s.cardKey + 1,
    }))
    if (state.timerEnabled) startTimer()
  }, [state.timerEnabled, startTimer])

  const prevQuestion = useCallback(() => {
    const pm = playerManagerRef.current
    const qm = questionManagerRef.current
    pm.prev()
    setState(s => ({
      ...s,
      currentPlayer: pm.getCurrent(),
      allPlayers: pm.getAll(),
      currentPlayerIndex: pm.getCurrentIndex(),
      currentQuestion: qm.getRandom(),
      timeLeft: TIMER_DURATION,
      cardKey: s.cardKey + 1,
    }))
  }, [])

  const skipPlayer = useCallback(() => {
    const pm = playerManagerRef.current
    const qm = questionManagerRef.current
    pm.skip()
    setState(s => ({
      ...s,
      currentPlayer: pm.getCurrent(),
      allPlayers: pm.getAll(),
      currentPlayerIndex: pm.getCurrentIndex(),
      currentQuestion: qm.getNext(),
      timeLeft: TIMER_DURATION,
      cardKey: s.cardKey + 1,
    }))
    if (state.timerEnabled) startTimer()
  }, [state.timerEnabled, startTimer])

  const shuffleQuestion = useCallback(() => {
    const qm = questionManagerRef.current
    setState(s => ({
      ...s,
      currentQuestion: qm.getRandom(),
      timeLeft: TIMER_DURATION,
      cardKey: s.cardKey + 1,
    }))
    if (state.timerEnabled) startTimer()
  }, [state.timerEnabled, startTimer])

  const toggleTimer = useCallback(() => {
    setState(s => {
      const next = !s.timerEnabled
      if (!next && timerRef.current) clearInterval(timerRef.current)
      return { ...s, timerEnabled: next, timeLeft: TIMER_DURATION }
    })
  }, [])

  const resetTimer = useCallback(() => {
    if (state.timerEnabled) startTimer()
    else setState(s => ({ ...s, timeLeft: TIMER_DURATION }))
  }, [state.timerEnabled, startTimer])

  return [
    state,
    { nextQuestion, prevQuestion, skipPlayer, shuffleQuestion, toggleTimer, resetTimer },
  ]
}
