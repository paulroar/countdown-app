import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import Card from './Card';
import PropTypes from 'prop-types';

export default function Clock({ is24HourFormat = false }) {
  const { i18n } = useTranslation();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const locale = i18n.language || 'en';
  const h24 = now.getHours();
  const hours12 = h24 % 12 || 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  const isDay = h24 >= 6 && h24 < 18;
  const displayHours = is24HourFormat ? h24 : hours12;

  const month = now.toLocaleString(locale, { month: 'short' });
  const dayNum = now.getDate().toString().padStart(2, '0');
  const weekday = now.toLocaleString(locale, { weekday: 'long' });

  return (
    <Card className="flex flex-col items-center justify-center overflow-hidden p-6 w-full max-w-lg mx-auto h-[320px]">
      <div className="absolute top-6 left-7 text-base font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300/90">
        {weekday}
      </div>

      <div className="absolute top-6 right-7 text-slate-500 dark:text-slate-300/90">
        {isDay ? <Sun size={26} strokeWidth={1.6} /> : <Moon size={26} strokeWidth={1.6} />}
      </div>

      <div className="relative flex w-full items-baseline justify-center gap-2 font-display">
        <span className="text-8xl sm:text-9xl md:text-[140px] font-semibold leading-none text-slate-800 dark:text-slate-100">
          {String(displayHours).padStart(2, '0')}
        </span>
        <span className="mx-1 animate-pulse text-6xl sm:text-8xl md:text-[120px] font-semibold leading-none text-emerald-500/80 dark:text-emerald-400/80">
          :
        </span>
        <span className="text-8xl sm:text-9xl md:text-[140px] font-semibold leading-none text-slate-800 dark:text-slate-100">
          {String(minutes).padStart(2, '0')}
        </span>
        {!is24HourFormat && (
          <span className="ml-2 sm:ml-4 text-2xl sm:text-4xl font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
            {ampm}
          </span>
        )}
      </div>

      <div className="absolute bottom-6 left-7 text-base font-semibold tracking-wide text-slate-500 dark:text-slate-300/80">
        {month} {dayNum}
      </div>

      <div className="absolute bottom-6 right-7 flex items-baseline gap-1 font-display text-slate-500 dark:text-slate-200/80">
        <span className="text-2xl sm:text-3xl font-semibold">
          {String(seconds).padStart(2, '0')}
        </span>
        <span className="text-xs sm:text-sm uppercase tracking-wide">sec</span>
      </div>
    </Card>
  );
}

Clock.propTypes = {
  is24HourFormat: PropTypes.bool,
};
