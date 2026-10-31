import { useEffect, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import {
  MAX_MINUTES,
  MIN_MINUTES,
  MODE_LABELS,
  MODE_ORDER,
  type Durations,
  type ModeId,
} from '@/lib/pomodoro';

interface SettingsDrawerProps {
  durations: Durations;
  onClose: () => void;
  onSave: (durations: Durations) => void;
}

type Draft = Record<ModeId, string>;

const toDraft = (durations: Durations): Draft => ({
  work: String(durations.work),
  shortBreak: String(durations.shortBreak),
  longBreak: String(durations.longBreak),
});

const parseMinutes = (value: string): number | null => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < MIN_MINUTES || parsed > MAX_MINUTES) return null;
  return parsed;
};

export default function SettingsDrawer({ durations, onClose, onSave }: SettingsDrawerProps) {
  const [draft, setDraft] = useState<Draft>(() => toDraft(durations));
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const parsed = MODE_ORDER.reduce<Partial<Durations>>((acc, id) => {
    acc[id] = parseMinutes(draft[id]) ?? undefined;
    return acc;
  }, {});
  const isValid = MODE_ORDER.every((id) => parsed[id] !== undefined);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isValid) {
      setShowErrors(true);
      return;
    }
    onSave({
      work: parsed.work!,
      shortBreak: parsed.shortBreak!,
      longBreak: parsed.longBreak!,
    });
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Cerrar ajustes"
        onClick={onClose}
        className="absolute inset-0 h-full w-full animate-fade-in bg-black/50 backdrop-blur-[2px]"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        className="absolute right-0 top-0 flex h-full w-full max-w-md animate-slide-in-right flex-col border-l border-zen-700 bg-zen-800 p-8 shadow-2xl shadow-black/40"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="settings-title" className="text-2xl font-extralight text-zen-100">
              Ajustes de tiempo
            </h2>
            <p className="mt-2 text-sm text-zen-300">
              Define cuántos minutos dura cada modo. Entre {MIN_MINUTES} y {MAX_MINUTES} minutos.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-2 text-zen-300 transition-colors hover:bg-zen-700 hover:text-zen-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-1 flex-col gap-6" noValidate>
          {MODE_ORDER.map((id) => {
            const invalid = showErrors && parsed[id] === undefined;
            return (
              <label key={id} className="flex flex-col gap-2">
                <span className="text-sm text-zen-200">{MODE_LABELS[id]}</span>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={MIN_MINUTES}
                    max={MAX_MINUTES}
                    value={draft[id]}
                    onChange={(event) => {
                      setDraft((prev) => ({ ...prev, [id]: event.target.value }));
                    }}
                    className={`w-full rounded-xl border bg-zen-900/70 px-4 py-3 text-lg tabular-nums text-zen-100 outline-none transition-colors focus:border-terracotta-400 ${
                      invalid ? 'border-red-400/70' : 'border-zen-600'
                    }`}
                  />
                  <span className="text-sm text-zen-300">min</span>
                </div>
                {invalid && (
                  <span className="text-xs text-red-300">
                    Introduce un número entero entre {MIN_MINUTES} y {MAX_MINUTES}.
                  </span>
                )}
              </label>
            );
          })}

          <div className="mt-auto flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-zen-500 px-6 py-3 text-sm text-zen-100 transition-colors hover:bg-zen-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-terracotta-500 px-6 py-3 text-sm text-zen-100 transition-colors hover:bg-terracotta-400"
            >
              Guardar
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
