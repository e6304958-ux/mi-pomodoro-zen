import { useState } from 'react';
import AdBanner from '@/components/AdBanner';
import Header from '@/components/Header';
import MusicPanel from '@/components/MusicPanel';
import SettingsDrawer from '@/components/SettingsDrawer';
import TimerPanel from '@/components/TimerPanel';
import { usePomodoro } from '@/hooks/usePomodoro';

export default function App() {
  const pomodoro = usePomodoro();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col bg-[radial-gradient(ellipse_at_top,_#3a2a22_0%,_#1d1916_45%,_#14110f_100%)] text-zen-100">
      <Header />

      <main className="grid flex-1 grid-cols-1 gap-8 px-8 pb-8 lg:grid-cols-[320px_1fr]">
        <MusicPanel />
        <TimerPanel
          mode={pomodoro.mode}
          durations={pomodoro.durations}
          remainingMs={pomodoro.remainingMs}
          isRunning={pomodoro.isRunning}
          isFinished={pomodoro.isFinished}
          onSelectMode={pomodoro.selectMode}
          onStart={pomodoro.start}
          onPause={pomodoro.pause}
          onReset={pomodoro.reset}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      </main>

      <AdBanner />

      {settingsOpen && (
        <SettingsDrawer
          durations={pomodoro.durations}
          onClose={() => setSettingsOpen(false)}
          onSave={(durations) => {
            pomodoro.updateDurations(durations);
            setSettingsOpen(false);
          }}
        />
      )}
    </div>
  );
}
