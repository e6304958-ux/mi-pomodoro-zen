const PARTIALS = [
  { ratio: 1, gain: 0.22, decay: 3.4 },
  { ratio: 2.76, gain: 0.07, decay: 2 },
  { ratio: 5.4, gain: 0.025, decay: 1.1 },
];

const BASE_FREQUENCY = 523.25;
const STRIKE_OFFSETS = [0, 1.9];

export function playZenBell(): void {
  const AudioContextClass =
    window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const start = ctx.currentTime + 0.05;

  for (const offset of STRIKE_OFFSETS) {
    const strikeTime = start + offset;
    for (const partial of PARTIALS) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = BASE_FREQUENCY * partial.ratio;
      gain.gain.setValueAtTime(0.0001, strikeTime);
      gain.gain.exponentialRampToValueAtTime(partial.gain, strikeTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + partial.decay);
      osc.connect(gain).connect(ctx.destination);
      osc.start(strikeTime);
      osc.stop(strikeTime + partial.decay + 0.05);
    }
  }

  window.setTimeout(() => void ctx.close(), 6000);
}
