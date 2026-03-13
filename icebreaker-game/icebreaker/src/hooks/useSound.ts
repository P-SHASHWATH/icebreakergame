// ============================================================
// useSound — lightweight Web Audio API sound effects
// ============================================================

import { useCallback, useRef } from 'react'

type SoundType = 'flip' | 'next' | 'skip' | 'celebrate' | 'tick'

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext()
    }
    return ctxRef.current
  }, [])

  const playTone = useCallback((
    frequency: number,
    type: OscillatorType,
    duration: number,
    volume = 0.15,
    delay = 0,
  ) => {
    try {
      const ctx = getCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = type
      osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay)
      gain.gain.setValueAtTime(0, ctx.currentTime + delay)
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration)
      osc.start(ctx.currentTime + delay)
      osc.stop(ctx.currentTime + delay + duration)
    } catch {
      // Ignore audio errors (user hasn't interacted yet, etc.)
    }
  }, [getCtx])

  const play = useCallback((sound: SoundType) => {
    switch (sound) {
      case 'flip':
        playTone(440, 'sine', 0.1, 0.12)
        playTone(660, 'sine', 0.1, 0.1, 0.05)
        break
      case 'next':
        playTone(523, 'triangle', 0.08, 0.1)
        playTone(659, 'triangle', 0.08, 0.1, 0.06)
        playTone(784, 'triangle', 0.1, 0.1, 0.12)
        break
      case 'skip':
        playTone(330, 'sawtooth', 0.08, 0.08)
        playTone(280, 'sawtooth', 0.08, 0.08, 0.06)
        break
      case 'celebrate':
        playTone(523, 'sine', 0.15, 0.12)
        playTone(659, 'sine', 0.15, 0.12, 0.1)
        playTone(784, 'sine', 0.15, 0.12, 0.2)
        playTone(1047, 'sine', 0.2, 0.15, 0.3)
        break
      case 'tick':
        playTone(800, 'square', 0.04, 0.05)
        break
    }
  }, [playTone])

  return { play }
}
