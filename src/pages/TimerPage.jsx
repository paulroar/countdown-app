import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import Switch from '../components/Switch';

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const PRESETS = [1, 2, 3, 5, 10, 15, 20, 30, 60];

export default function TimerPage() {
  const { t } = useTranslation();
  const [initialTime, setInitialTime] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [inputHours, setInputHours] = useState('');
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');

  const prevInputHours = useRef('');
  const prevInputMinutes = useRef('');
  const prevInputSeconds = useRef('');

  const [isAlarmOn, setIsAlarmOn] = useState(true);

  useEffect(() => {
    let intervalId = null;
    if (isActive && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      if (isAlarmOn) {
        console.log(t('timerPage.alarm'));
      }
    }

    return () => clearInterval(intervalId);
  }, [isActive, time, isAlarmOn, t]);

  const handleStartPause = () => {
    if (time > 0) {
      setIsActive((prev) => !prev);
    }
  };

  const handleReset = () => {
    setTime(initialTime);
    setIsActive(false);
  };

  const handlePresetClick = (minutes) => {
    const seconds = minutes * 60;
    setInitialTime(seconds);
    setTime(seconds);
    setIsActive(false);
    setInputHours('');
    setInputMinutes('');
    setInputSeconds('');
  };

  const updateMainTimerFromInputs = () => {
    let h = Math.max(0, parseInt(inputHours, 10) || 0);
    let m = Math.max(0, parseInt(inputMinutes, 10) || 0);
    let s = Math.max(0, parseInt(inputSeconds, 10) || 0);

    if (s >= 60) {
      m += Math.floor(s / 60);
      s %= 60;
    }
    if (m >= 60) {
      h += Math.floor(m / 60);
      m %= 60;
    }
    h = Math.min(24, h);

    const totalSeconds = h * 3600 + m * 60 + s;

    if (totalSeconds > 0) {
      setInitialTime(totalSeconds);
      setTime(totalSeconds);
      setIsActive(false);
    }

    setInputHours('');
    setInputMinutes('');
    setInputSeconds('');

    prevInputHours.current = '';
    prevInputMinutes.current = '';
    prevInputSeconds.current = '';
  };

  const handleInputKeyDown = (event, setter, prevRef) => {
    if (event.key === 'Enter') {
      updateMainTimerFromInputs();
      event.target.blur();
    } else if (event.key === 'Escape') {
      setter(prevRef.current);
      event.target.blur();
    }
  };

  const handleInputChange = (event, setter) => {
    let value = event.target.value;
    if (value === '') {
      setter('');
      return;
    }
    value = Math.max(0, parseInt(value, 10) || 0);
    setter(String(value));
  };

  useEffect(() => {
    prevInputHours.current = inputHours;
  }, [inputHours]);

  useEffect(() => {
    prevInputMinutes.current = inputMinutes;
  }, [inputMinutes]);

  useEffect(() => {
    prevInputSeconds.current = inputSeconds;
  }, [inputSeconds]);

  const timerButtonLabel = isActive
    ? t('stopwatch.pause')
    : time > 0
      ? t('stopwatch.resume')
      : t('stopwatch.start');

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-100 via-white to-slate-100 px-4 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
        <Card className="flex flex-col items-center justify-center gap-6 p-8 text-center">
          <div className="font-display text-[92px] font-semibold leading-none text-slate-900 dark:text-slate-100">
            {formatTime(time)}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleStartPause}
              disabled={initialTime === 0}
              className="rounded-lg bg-emerald-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {timerButtonLabel}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={initialTime === 0}
              className="rounded-lg border border-slate-300 bg-white/70 px-8 py-3 text-lg font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t('stopwatch.reset')}
            </button>
          </div>
        </Card>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {PRESETS.map((min) => (
            <button
              key={min}
              type="button"
              onClick={() => handlePresetClick(min)}
              className="rounded-full border border-slate-200 bg-white/80 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
            >
              {t('timer.presetMinutes', { minutes: min })}
            </button>
          ))}
        </div>

        <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="mb-4 text-center text-xl font-semibold text-slate-700 dark:text-slate-200">{t('timer.custom')}</h3>
          <div className="mb-6 flex items-center justify-center gap-4">
            <input
              type="text"
              inputMode="numeric"
              placeholder="HH"
              value={inputHours}
              onChange={(event) => handleInputChange(event, setInputHours)}
              onKeyDown={(event) => handleInputKeyDown(event, setInputHours, prevInputHours)}
              onBlur={updateMainTimerFromInputs}
              className="h-16 w-24 rounded-xl border border-slate-300 bg-white/90 text-center text-3xl font-display font-semibold text-slate-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100"
            />
            <span className="text-4xl font-display text-emerald-500">:</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM"
              value={inputMinutes}
              onChange={(event) => handleInputChange(event, setInputMinutes)}
              onKeyDown={(event) => handleInputKeyDown(event, setInputMinutes, prevInputMinutes)}
              onBlur={updateMainTimerFromInputs}
              className="h-16 w-24 rounded-xl border border-slate-300 bg-white/90 text-center text-3xl font-display font-semibold text-slate-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100"
            />
            <span className="text-4xl font-display text-emerald-500">:</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="SS"
              value={inputSeconds}
              onChange={(event) => handleInputChange(event, setInputSeconds)}
              onKeyDown={(event) => handleInputKeyDown(event, setInputSeconds, prevInputSeconds)}
              onBlur={updateMainTimerFromInputs}
              className="h-16 w-24 rounded-xl border border-slate-300 bg-white/90 text-center text-3xl font-display font-semibold text-slate-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100"
            />
          </div>

          <hr className="my-6 border-slate-200 dark:border-slate-700" />

          <h3 className="mb-4 text-center text-xl font-semibold text-slate-700 dark:text-slate-200">{t('timer.settings')}</h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-slate-700 dark:text-slate-200">{t('timer.alarmSound')}</span>
            <Switch isOn={isAlarmOn} onToggle={() => setIsAlarmOn((prev) => !prev)} />
          </div>
        </div>

        <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/75 p-6 text-left text-slate-700 shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{t('timer.what')}</h2>
          <p className="mt-3 leading-relaxed text-justify">{t('timer.whatDesc')}</p>
          <h3 className="mt-5 text-lg font-semibold text-emerald-600 dark:text-emerald-400">{t('timer.fact')}</h3>
          <p className="mt-2 leading-relaxed text-justify">{t('timer.factDesc')}</p>
        </div>
      </div>
    </div>
  );
}
