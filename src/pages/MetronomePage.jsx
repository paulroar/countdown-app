import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const BeatIndicator = ({ currentBeat, isPlaying }) => (
  <div className="my-8 flex justify-center gap-4">
    {[0, 1, 2, 3].map((beat) => (
      <span
        key={beat}
        className={`h-4 w-4 rounded-full transition-all duration-150 ${
          isPlaying && currentBeat === beat
            ? 'scale-125 bg-emerald-500 shadow-lg'
            : 'bg-slate-200 dark:bg-slate-700'
        }`}
      />
    ))}
  </div>
);

BeatIndicator.propTypes = {
  currentBeat: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default function MetronomePage() {
  const { t } = useTranslation();
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(-1);

  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);

  const playBeep = (currentBeat) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    const frequency = currentBeat === 0 ? 880 : 480;
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    gain.gain.setValueAtTime(1, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.05);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.05);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setBeat((prev) => {
          const nextBeat = (prev + 1) % 4;
          playBeep(nextBeat);
          return nextBeat;
        });
      }, (60 / bpm) * 1000);
    } else {
      clearInterval(intervalRef.current);
      setBeat(-1);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, bpm]);

  const handleBpmChange = (event) => {
    const newBpm = parseInt(event.target.value, 10);
    setBpm(newBpm);
  };

  const togglePlay = () => {
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    if (!isPlaying) {
      playBeep(0);
      setBeat(0);
    }
    setIsPlaying((prev) => !prev);
  };

  const playButtonLabel = isPlaying ? t('metronome.stop') : t('metronome.start');

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-100 via-white to-slate-100 px-4 pb-16 pt-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-10">
        <div className="w-full rounded-3xl border border-slate-200 bg-white/90 p-10 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900/80">
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">{t('metronome.title')}</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            {t('metronome.subtitle')}
          </p>

          <BeatIndicator currentBeat={beat} isPlaying={isPlaying} />

          <div className="font-display text-7xl font-semibold text-slate-900 dark:text-slate-100">{bpm}</div>
          <div className="-mt-1 text-lg font-semibold tracking-[0.4em] text-emerald-500">BPM</div>

          <input
            type="range"
            min="40"
            max="240"
            value={bpm}
            onChange={handleBpmChange}
            className="range-thumb mt-8 w-full cursor-pointer"
          />

          <button
            type="button"
            onClick={togglePlay}
            className={`mt-8 w-full rounded-xl px-6 py-4 text-xl font-semibold text-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 ${
              isPlaying ? 'bg-rose-500 hover:bg-rose-600 focus:ring-rose-400' : 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-400'
            }`}
          >
            {playButtonLabel}
          </button>
        </div>

        <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/75 p-6 text-left text-slate-700 shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{t('metronome.what')}</h2>
          <p className="mt-3 leading-relaxed text-justify">{t('metronome.whatDesc')}</p>
          <h3 className="mt-5 text-lg font-semibold text-emerald-600 dark:text-emerald-400">{t('metronome.fact')}</h3>
          <p className="mt-2 leading-relaxed text-justify">{t('metronome.factDesc')}</p>
        </div>
      </div>
    </div>
  );
}
