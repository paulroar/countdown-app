import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, MoreVertical, Pause, Play, Pencil, Trash2 } from 'lucide-react';
import Card from '../components/Card';
import PropTypes from 'prop-types';

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const TimerBar = ({
  timer,
  onPlayPause,
  onDelete,
  onClone,
  onNameChange,
  onDurationChange,
  isActive,
  isRunning,
}) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingDuration, setIsEditingDuration] = useState(false);
  const [editHours, setEditHours] = useState(String(Math.floor(timer.duration / 3600)));
  const [editMinutes, setEditMinutes] = useState(String(Math.floor((timer.duration % 3600) / 60)));
  const [editSeconds, setEditSeconds] = useState(String(timer.duration % 60));

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleDurationSave = () => {
    let h = Math.max(0, parseInt(editHours, 10) || 0);
    let m = Math.max(0, parseInt(editMinutes, 10) || 0);
    let s = Math.max(0, parseInt(editSeconds, 10) || 0);

    if (s >= 60) {
      m += Math.floor(s / 60);
      s %= 60;
    }
    if (m >= 60) {
      h += Math.floor(m / 60);
      m %= 60;
    }
    h = Math.min(24, h);

    const newDuration = h * 3600 + m * 60 + s;
    onDurationChange(timer.id, newDuration);
    setEditHours(String(h));
    setEditMinutes(String(m));
    setEditSeconds(String(s));
    setIsEditingDuration(false);
  };

  const handleDurationKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleDurationSave();
      event.target.blur();
    } else if (event.key === 'Escape') {
      setEditHours(String(Math.floor(timer.duration / 3600)));
      setEditMinutes(String(Math.floor((timer.duration % 3600) / 60)));
      setEditSeconds(String(timer.duration % 60));
      setIsEditingDuration(false);
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

  return (
    <div
      className={`flex h-[72px] w-full items-center gap-3 rounded-2xl border px-4 py-2 text-sm transition-colors ${
        isActive
          ? 'border-emerald-400 bg-emerald-50/80 shadow-lg dark:border-emerald-500 dark:bg-emerald-500/10'
          : 'border-slate-200 bg-white/85 dark:border-slate-800 dark:bg-slate-900/70'
      }`}
    >
      <span className="w-6 text-center text-sm font-semibold text-slate-500 dark:text-slate-300">
        {timer.number}
      </span>

      {isEditingDuration ? (
        <div className="flex items-center gap-1 font-display text-lg text-slate-700 dark:text-slate-100">
          <input
            type="text"
            value={editHours}
            onChange={(event) => handleInputChange(event, setEditHours)}
            onBlur={handleDurationSave}
            onKeyDown={handleDurationKeyDown}
            className="h-10 w-12 rounded-lg border border-slate-300 bg-white text-center text-base font-semibold outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 dark:border-slate-700 dark:bg-slate-900/90"
          />
          <span className="px-1 text-emerald-500">:</span>
          <input
            type="text"
            value={editMinutes}
            onChange={(event) => handleInputChange(event, setEditMinutes)}
            onBlur={handleDurationSave}
            onKeyDown={handleDurationKeyDown}
            className="h-10 w-12 rounded-lg border border-slate-300 bg-white text-center text-base font-semibold outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 dark:border-slate-700 dark:bg-slate-900/90"
          />
          <span className="px-1 text-emerald-500">:</span>
          <input
            type="text"
            value={editSeconds}
            onChange={(event) => handleInputChange(event, setEditSeconds)}
            onBlur={handleDurationSave}
            onKeyDown={handleDurationKeyDown}
            className="h-10 w-12 rounded-lg border border-slate-300 bg-white text-center text-base font-semibold outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 dark:border-slate-700 dark:bg-slate-900/90"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsEditingDuration(true)}
          className="font-display text-lg font-semibold text-slate-700 transition hover:text-emerald-500 focus:outline-none focus:text-emerald-500 dark:text-slate-100"
        >
          {formatTime(timer.duration)}
        </button>
      )}

      <input
        type="text"
        value={timer.name}
        onChange={(event) => onNameChange(timer.id, event.target.value)}
        placeholder={timer.name || t('countdownPage.timerName', { number: timer.number })}
        className="flex-1 border-b border-slate-300 bg-transparent px-2 text-base font-medium text-slate-700 outline-none transition focus:border-emerald-500 dark:border-slate-600 dark:text-slate-100"
      />

      <button
        type="button"
        onClick={() => onPlayPause(timer.id)}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 ${
          isRunning
            ? 'bg-rose-500 hover:bg-rose-600 focus:ring-rose-400'
            : 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-400'
        }`}
        aria-label={isRunning ? t('stopwatch.pause') : t('stopwatch.start')}
      >
        {isRunning ? <Pause size={18} strokeWidth={2} /> : <Play size={18} strokeWidth={2} />}
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label="Timer actions"
        >
          <MoreVertical size={18} />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-12 w-40 rounded-xl border border-slate-200 bg-white py-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <button
              type="button"
              onClick={() => {
                onClone(timer.id);
                setIsMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Copy size={16} /> {t('countdown.clone')}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditingDuration(true);
                setIsMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Pencil size={16} /> {t('countdown.edit')}
            </button>
            <button
              type="button"
              onClick={() => {
                onDelete(timer.id);
                setIsMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-rose-500 transition hover:bg-rose-50 focus:bg-rose-50 focus:outline-none dark:text-rose-400 dark:hover:bg-rose-500/10"
            >
              <Trash2 size={16} /> {t('countdown.delete')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

TimerBar.propTypes = {
  timer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClone: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDurationChange: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isRunning: PropTypes.bool.isRequired,
};

export default function CountdownPage() {
  const { t } = useTranslation();
  const [timers, setTimers] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [activeTimerIndex, setActiveTimerIndex] = useState(-1);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isOverallRunning, setIsOverallRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isOverallRunning && activeTimerIndex !== -1) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          clearInterval(intervalRef.current);
          setIsOverallRunning(false);
          setActiveTimerIndex((index) => {
            const nextIndex = index + 1;
            if (nextIndex < timers.length) {
              setTimeRemaining(timers[nextIndex].duration);
              setIsOverallRunning(true);
              return nextIndex;
            }
            return -1;
          });
          return 0;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isOverallRunning, activeTimerIndex, timers]);

  useEffect(() => {
    if (activeTimerIndex !== -1 && timers[activeTimerIndex]) {
      setTimeRemaining(timers[activeTimerIndex].duration);
    }
  }, [activeTimerIndex, timers]);

  const handleAddTimer = () => {
    if (timers.length >= 3) {
      alert(t('countdownPage.limit'));
      return;
    }

    const newTimer = {
      id: nextId,
      name: t('countdownPage.timerName', { number: nextId }),
      duration: 300,
      isRunning: false,
      isPaused: false,
    };

    setTimers((prev) => [...prev, newTimer]);
    setNextId((prev) => prev + 1);

    if (activeTimerIndex === -1) {
      setActiveTimerIndex(0);
      setTimeRemaining(newTimer.duration);
    }
  };

  const handleSubTimerPlayPause = (id) => {
    const index = timers.findIndex((timer) => timer.id === id);
    if (index === -1) return;

    if (activeTimerIndex === index && isOverallRunning) {
      setIsOverallRunning(false);
    } else if (activeTimerIndex === index && !isOverallRunning && timeRemaining > 0) {
      setIsOverallRunning(true);
    } else {
      setIsOverallRunning(true);
      setActiveTimerIndex(index);
      setTimeRemaining(timers[index].duration);
    }
  };

  const handleDeleteTimer = (id) => {
    setTimers((prev) => prev.filter((timer) => timer.id !== id));
    if (activeTimerIndex !== -1) {
      const deletedIndex = timers.findIndex((timer) => timer.id === id);
      if (deletedIndex === activeTimerIndex) {
        setIsOverallRunning(false);
        setActiveTimerIndex(-1);
        setTimeRemaining(0);
      } else if (deletedIndex < activeTimerIndex) {
        setActiveTimerIndex((prev) => prev - 1);
      }
    }
  };

  const handleCloneTimer = (id) => {
    const timerToClone = timers.find((timer) => timer.id === id);
    if (timerToClone && timers.length < 3) {
      setTimers((prev) => [
        ...prev,
        { ...timerToClone, id: nextId, name: t('countdown.cloneSuffix', { name: timerToClone.name }) },
      ]);
      setNextId((prev) => prev + 1);
    } else if (timers.length >= 3) {
      alert(t('countdownPage.limit'));
    }
  };

  const handleNameChange = (id, newName) => {
    setTimers((prev) => prev.map((timer) => (timer.id === id ? { ...timer, name: newName } : timer)));
  };

  const handleDurationChange = (id, newDuration) => {
    setTimers((prev) => prev.map((timer) => (timer.id === id ? { ...timer, duration: newDuration } : timer)));
    if (activeTimerIndex !== -1 && timers[activeTimerIndex].id === id && !isOverallRunning) {
      setTimeRemaining(newDuration);
    }
  };

  const handleOverallPlayPause = () => {
    if (!timers.length) return;
    if (activeTimerIndex === -1) {
      setActiveTimerIndex(0);
      setTimeRemaining(timers[0].duration);
      setIsOverallRunning(true);
      return;
    }
    setIsOverallRunning((prev) => !prev);
  };

  const handleResetAll = () => {
    setIsOverallRunning(false);
    setActiveTimerIndex(-1);
    setTimeRemaining(0);
    setTimers((prev) => prev.map((timer) => ({ ...timer, isRunning: false, isPaused: false })));
  };

  const currentTimer = timers[activeTimerIndex];

  const overallButtonLabel = isOverallRunning
    ? t('countdown.pauseAll')
    : timeRemaining > 0
      ? t('countdown.resumeAll')
      : t('countdown.startAll');

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-100 via-white to-slate-100 px-4 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
        <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="font-display text-[88px] font-semibold leading-none text-slate-900 dark:text-slate-100">
            {formatTime(timeRemaining)}
          </div>
          <div className="text-lg font-medium text-slate-500 dark:text-slate-300">
            {currentTimer ? currentTimer.name || t('countdownPage.timerName', { number: currentTimer.number }) : t('countdown.noActive')}
          </div>
          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={handleOverallPlayPause}
              disabled={timers.length === 0}
              className="rounded-lg bg-emerald-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {overallButtonLabel}
            </button>
            <button
              type="button"
              onClick={handleResetAll}
              disabled={timers.length === 0 && timeRemaining === 0}
              className="rounded-lg border border-slate-300 bg-white/80 px-8 py-3 text-lg font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t('countdown.resetAll')}
            </button>
          </div>
        </Card>

        <div className="flex w-full max-w-xl flex-col gap-3">
          {timers.map((timer, index) => (
            <TimerBar
              key={timer.id}
              timer={{ ...timer, number: index + 1 }}
              onPlayPause={handleSubTimerPlayPause}
              onDelete={handleDeleteTimer}
              onClone={handleCloneTimer}
              onNameChange={handleNameChange}
              onDurationChange={handleDurationChange}
              isActive={activeTimerIndex !== -1 && timers[activeTimerIndex].id === timer.id}
              isRunning={activeTimerIndex !== -1 && timers[activeTimerIndex].id === timer.id && isOverallRunning}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddTimer}
          className="rounded-full border border-dashed border-emerald-400 px-8 py-3 text-lg font-semibold text-emerald-600 transition hover:border-emerald-500 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          {t('countdown.add')}
        </button>

        <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/75 p-6 text-left text-slate-700 shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{t('countdown.what')}</h2>
          <p className="mt-3 leading-relaxed text-justify">{t('countdown.whatDesc')}</p>
          <h3 className="mt-5 text-lg font-semibold text-emerald-600 dark:text-emerald-400">{t('countdown.fact')}</h3>
          <p className="mt-2 leading-relaxed text-justify">{t('countdown.factDesc')}</p>
        </div>
      </div>
    </div>
  );
}
