import { useRef, type ChangeEvent } from 'react';
import { Music, Pause, Play, Upload, Volume1, Volume2, VolumeX } from 'lucide-react';
import { useLocalAudio } from '@/hooks/useLocalAudio';

const ACCEPTED_AUDIO = 'audio/mpeg,audio/*,.mp3';

export default function MusicPanel() {
  const { trackName, isPlaying, volume, setVolume, error, loadFile, togglePlayback } = useLocalAudio();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) loadFile(file);
    event.target.value = '';
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <section className="flex min-h-[560px] flex-col rounded-3xl border border-zen-700/70 bg-zen-800/50 p-8 backdrop-blur-sm">
      <div>
        <h2 className="text-xl font-extralight text-zen-100">Sonidos de Concentración</h2>
        <p className="mt-2 text-sm leading-relaxed text-zen-300">
          Tu música local, en bucle y sin interrupciones.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_AUDIO}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl border border-dashed border-zen-500 px-5 py-4 text-sm text-zen-100 transition-all duration-300 hover:border-terracotta-400/70 hover:bg-zen-700/60"
      >
        <Upload className="h-4 w-4 text-terracotta-400" />
        {trackName ? 'Cambiar música (.mp3)' : 'Cargar tu música (.mp3)'}
      </button>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-300">
          {error}
        </p>
      )}

      {trackName ? (
        <div className="mt-10 flex flex-1 flex-col gap-8 animate-fade-in">
          <div className="flex items-center gap-4 rounded-2xl bg-zen-900/60 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-terracotta-500/15">
              <Music className="h-5 w-5 text-terracotta-300" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm text-zen-100" title={trackName}>
                {trackName}
              </p>
              <div className="mt-2 flex h-3 items-end gap-1" aria-hidden="true">
                {[0, 0.2, 0.4].map((delay) => (
                  <span
                    key={delay}
                    className={`h-full w-1 origin-bottom rounded-full bg-terracotta-400 ${
                      isPlaying ? 'animate-equalizer' : 'scale-y-[0.3]'
                    }`}
                    style={{ animationDelay: `${delay}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={togglePlayback}
              aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-terracotta-500 text-zen-100 shadow-lg shadow-terracotta-600/20 transition-all duration-300 hover:bg-terracotta-400 active:scale-95"
            >
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
            </button>
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-zen-300">
                <span>Volumen</span>
                <span className="tabular-nums">{Math.round(volume * 100)}%</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <VolumeIcon className="h-4 w-4 shrink-0 text-zen-300" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  aria-label="Volumen"
                  className="w-full cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <Music className="h-8 w-8 text-zen-500" />
          <p className="max-w-[220px] text-sm leading-relaxed text-zen-400">
            Carga un archivo de audio desde tu ordenador para empezar a concentrarte.
          </p>
        </div>
      )}
    </section>
  );
}
