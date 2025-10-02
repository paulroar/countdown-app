import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';

const formatTime = (timeMs) => {
  const date = new Date(timeMs);
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const formatMilliseconds = (timeMs) => {
  const date = new Date(timeMs);
  return String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
};

export default function StopwatchPage() {
  const { t } = useTranslation();
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);
  const startTimeRef = useRef(0);

  useEffect(() => {
    let animationFrameId;

    if (isActive) {
      startTimeRef.current = Date.now() - time;
      const tick = () => {
        setTime(Date.now() - startTimeRef.current);
        animationFrameId = requestAnimationFrame(tick);
      };
      tick();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive, time]);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (!isActive) return;
    const lastLapTime = laps.reduce((acc, lap) => acc + lap.lapTime, 0);
    const currentLapTime = time - lastLapTime;
    const newLap = {
      number: laps.length + 1,
      lapTime: currentLapTime,
      totalTime: time,
    };
    setLaps([newLap, ...laps]);
  };

  const primaryButtonLabel = isActive
    ? t('stopwatch.pause')
    : time > 0
      ? t('stopwatch.resume')
      : t('stopwatch.start');

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-100 via-white to-slate-100 px-4 pb-16 pt-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
        <Card className="flex w-[480px] flex-col items-center justify-center gap-6 p-8 text-center">
          <div className="flex items-baseline">
            <span className="font-display text-[120px] font-semibold leading-none text-slate-900 dark:text-slate-100">
              {formatTime(time)}
            </span>
            <span className="ml-3 text-4xl font-display font-semibold text-emerald-500">
              .{formatMilliseconds(time)}
            </span>
          </div>

          <div className="flex w-full items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-slate-300 bg-white/80 px-6 py-3 text-lg font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t('stopwatch.reset')}
            </button>
            <button
              type="button"
              onClick={handleLap}
              disabled={!isActive}
              className="rounded-lg border border-emerald-400 bg-white/80 px-6 py-3 text-lg font-semibold text-emerald-600 transition hover:border-emerald-500 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:opacity-40 dark:border-emerald-500/70 dark:bg-slate-900/70 dark:text-emerald-300"
            >
              {t('stopwatch.lap')}
            </button>
            <button
              type="button"
              onClick={handleToggle}
              className="rounded-lg bg-emerald-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {primaryButtonLabel}
            </button>
          </div>
        </Card>

        {laps.length > 0 && (
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white/85 p-5 text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
            <div className="grid grid-cols-3 gap-4 border-b border-slate-200 pb-3 text-center font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:text-slate-300">
              <div>{t('stopwatch.lapHeader')}</div>
              <div>{t('stopwatch.lapTimeHeader')}</div>
              <div>{t('stopwatch.totalTimeHeader')}</div>
            </div>
            <div className="max-h-64 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
              {laps.map((lap) => (
                <div key={lap.number} className="grid grid-cols-3 gap-4 py-2 text-center text-base">
                  <div>#{lap.number}</div>
                  <div className="font-display">
                    {formatTime(lap.lapTime)}.{formatMilliseconds(lap.lapTime)}
                  </div>
                  <div className="font-display">
                    {formatTime(lap.totalTime)}.{formatMilliseconds(lap.totalTime)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/75 p-6 text-left text-slate-700 shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{t('stopwatch.what')}</h2>
          <p className="mt-3 leading-relaxed text-justify">{t('stopwatch.whatDesc')}</p>
          <h3 className="mt-5 text-lg font-semibold text-emerald-600 dark:text-emerald-400">{t('stopwatch.fact')}</h3>
          <p className="mt-2 leading-relaxed text-justify">{t('stopwatch.factDesc')}</p>
        </div>
      </div>
    </div>
  );
}
