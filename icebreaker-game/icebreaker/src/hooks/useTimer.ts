/**
 * useTimer.ts
 * Countdown timer hook for the optional 30-second timer mode.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerOptions {
  duration: number; // seconds
  onComplete: () => void;
  enabled: boolean;
}

export function useTimer({ duration, onComplete, enabled }: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const reset = useCallback(() => {
    setTimeLeft(duration);
    setIsRunning(enabled);
  }, [duration, enabled]);

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => { if (enabled) setIsRunning(true); }, [enabled]);

  // Auto-start when enabled changes
  useEffect(() => {
    if (enabled) {
      setTimeLeft(duration);
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [enabled, duration]);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) {
      setIsRunning(false);
      onCompleteRef.current();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [isRunning, timeLeft]);

  const progress = timeLeft / duration; // 1 → 0
  const isWarning = timeLeft <= 10;
  const isDanger = timeLeft <= 5;

  return { timeLeft, isRunning, progress, isWarning, isDanger, reset, pause, resume };
}
