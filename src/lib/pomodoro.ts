export type ModeId = 'work' | 'shortBreak' | 'longBreak';

export type Durations = Record<ModeId, number>;

export const MODE_ORDER: ModeId[] = ['work', 'shortBreak', 'longBreak'];

export const MODE_LABELS: Record<ModeId, string> = {
  work: 'Trabajo',
  shortBreak: 'Descanso corto',
  longBreak: 'Descanso largo',
};

export const DEFAULT_DURATIONS: Durations = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
};

export const MIN_MINUTES = 1;
export const MAX_MINUTES = 120;

export function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
