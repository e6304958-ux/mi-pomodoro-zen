import { useEffect, useRef, useState } from 'react';

interface Track {
  name: string;
  url: string;
}

const AUDIO_EXTENSION = /\.(mp3|wav|ogg|m4a)$/i;

export function useLocalAudio() {
  const [track, setTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!track) return;

    const audio = new Audio(track.url);
    audio.loop = true;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audioRef.current = null;
      URL.revokeObjectURL(track.url);
      setIsPlaying(false);
    };
  }, [track]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [track, volume]);

  const loadFile = (file: File) => {
    const isAudio = file.type.startsWith('audio/') || AUDIO_EXTENSION.test(file.name);
    if (!isAudio) {
      setError('Selecciona un archivo de audio válido (.mp3).');
      return;
    }
    setError(null);
    setTrack({ name: file.name, url: URL.createObjectURL(file) });
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(
        () => setError(null),
        () => setError('No se pudo reproducir este archivo.'),
      );
    } else {
      audio.pause();
    }
  };

  return {
    trackName: track?.name ?? null,
    isPlaying,
    volume,
    setVolume,
    error,
    loadFile,
    togglePlayback,
  };
}
