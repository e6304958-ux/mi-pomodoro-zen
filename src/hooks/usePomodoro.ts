import { useEffect, useState } from 'react';
import { DEFAULT_DURATIONS, formatTime, type Durations, type ModeId } from '@/lib/pomodoro';
import { playZenBell } from '@/lib/zen-bell';

const minutesToMs = (minutes: number) => minutes * 60_000;

export function usePomodoro() {
  const [mode, setMode] = useState<ModeId>('work');
  const [durations, setDurations] = useState<Durations>(DEFAULT_DURATIONS);
  const [remainingMs, setRemainingMs] = useState(minutesToMs(DEFAULT_DURATIONS.work));
  const [endAt, setEndAt] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const isRunning = endAt !== null;

  useEffect(() => {
    if (endAt === null) return;

    const tick = () => {
      const left = endAt - Date.now();
      if (left <= 0) {
        setRemainingMs(0);
        setEndAt(null);
        setIsFinished(true);
        playZenBell();
        return;
      }
      setRemainingMs(left);
    };

    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [endAt]);

  useEffect(() => {
    document.title = `${formatTime(remainingMs)} · Pomodoro Zen`;
  }, [remainingMs]);

  const start = () => {
    if (isRunning) return;
    const base = remainingMs > 0 ? remainingMs : minutesToMs(durations[mode]);
    setIsFinished(false);
    setRemainingMs(base);
    setEndAt(Date.now() + base);
  };

  const pause = () => {
    if (endAt === null) return;
    setRemainingMs(Math.max(0, endAt - Date.now()));
    setEndAt(null);
  };

  const reset = () => {
    setEndAt(null);
    setIsFinished(false);
    setRemainingMs(minutesToMs(durations[mode]));
  };

  const selectMode = (next: ModeId) => {
    setMode(next);
    setEndAt(null);
    setIsFinished(false);
    setRemainingMs(minutesToMs(durations[next]));
  };

  const updateDurations = (next: Durations) => {
    setDurations(next);
    if (endAt === null) {
      setIsFinished(false);
      setRemainingMs(minutesToMs(next[mode]));
    }
  };

  return {
    mode,
    durations,
    remainingMs,
    isRunning,
    isFinished,
    start,
    pause,
    reset,
    selectMode,
    updateDurations,
  };
}
