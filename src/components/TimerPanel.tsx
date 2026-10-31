import { Pause, Play, RotateCcw, Settings, Sparkles } from 'lucide-react';
import { MODE_LABELS, MODE_ORDER, formatTime, type Durations, type ModeId } from '@/lib/pomodoro';

interface TimerPanelProps {
  mode: ModeId;
  durations: Durations;
  remainingMs: number;
  isRunning: boolean;
  isFinished: boolean;
  onSelectMode: (mode: ModeId) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
}

export default function TimerPanel({
  mode,
  durations,
  remainingMs,
  isRunning,
  isFinished,
  onSelectMode,
  onStart,
  onPause,
  onReset,
  onOpenSettings,
}: TimerPanelProps) {
  return (
    <section className="flex min-h-[560px] flex-col rounded-3xl border border-zen-700/70 bg-zen-800/50 p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        <div role="tablist" aria-label="Modos del temporizador" className="flex flex-wrap gap-2 rounded-full bg-zen-900/60 p-1.5">
          {MODE_ORDER.map((id) => {
            const active = id === mode;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => onSelectMode(id)}
                className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                  active
                    ? 'bg-terracotta-500/20 text-terracotta-300 shadow-inner shadow-black/30'
                    : 'text-zen-300 hover:text-zen-100'
                }`}
              >
                {MODE_LABELS[id]} ({durations[id]} min)
              </button>
            );
          })}
        </div>
        <button
          onClick={onOpenSettings}
          aria-label="Configurar tiempos"
          className="rounded-full border border-zen-600 p-2.5 text-zen-300 transition-all duration-300 hover:rotate-45 hover:border-terracotta-400/60 hover:text-terracotta-300"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        {isFinished ? (
          <div className="flex animate-fade-in items-center gap-2 rounded-full bg-terracotta-500/15 px-5 py-2 text-sm text-terracotta-300">
            <Sparkles className="h-4 w-4 animate-breathe" />
            Tiempo completado. Tómate un momento para respirar.
          </div>
        ) : (
          <div className="h-[34px]" aria-hidden="true" />
        )}

        <div
          role="timer"
          aria-live="off"
          className={`select-none font-extralight tabular-nums leading-none tracking-tight text-zen-100 text-[clamp(6rem,17vw,13rem)] transition-colors duration-500 ${
            isRunning ? 'animate-breathe' : ''
          } ${isFinished ? 'text-terracotta-300' : ''}`}
        >
          {formatTime(remainingMs)}
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={onStart}
            disabled={isRunning}
            className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-8 py-3.5 text-sm font-normal text-zen-100 shadow-lg shadow-terracotta-600/20 transition-all duration-300 hover:bg-terracotta-400 hover:shadow-terracotta-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Play className="h-4 w-4 fill-current" />
            Iniciar
          </button>
          <button
            onClick={onPause}
            disabled={!isRunning}
            className="inline-flex items-center gap-2 rounded-full border border-zen-500 px-8 py-3.5 text-sm text-zen-100 transition-all duration-300 hover:border-zen-300 hover:bg-zen-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Pause className="h-4 w-4 fill-current" />
            Pausar
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-full border border-zen-500 px-8 py-3.5 text-sm text-zen-100 transition-all duration-300 hover:border-zen-300 hover:bg-zen-700 active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
            Reiniciar
          </button>
        </div>
      </div>
    </section>
  );
}
