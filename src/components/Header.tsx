import { Coffee, Leaf } from 'lucide-react';
import { SUPPORT_URL } from '@/lib/links';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <div className="flex items-center gap-3">
        <Leaf className="h-5 w-5 text-terracotta-400" aria-hidden="true" />
        <span className="text-sm uppercase tracking-[0.3em] text-zen-200">Pomodoro Zen</span>
      </div>
      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 rounded-full border border-zen-600 bg-zen-800/70 px-5 py-2.5 text-sm text-zen-100 transition-all duration-300 hover:border-terracotta-400/60 hover:bg-zen-700 hover:shadow-lg hover:shadow-black/20"
      >
        <Coffee className="h-4 w-4 text-terracotta-400 transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
        Invítame a un café
      </a>
    </header>
  );
}
