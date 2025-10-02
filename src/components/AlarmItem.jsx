import { useTranslation } from 'react-i18next';
import { Trash2 } from 'lucide-react';
import Switch from './Switch';
import PropTypes from 'prop-types';

export default function AlarmItem({ alarm, is24HourFormat, onToggle, onDelete }) {
  const { t } = useTranslation();

  const formatHour = (hour24) => {
    if (is24HourFormat) {
      return String(hour24).padStart(2, '0');
    }
    const hour12 = hour24 % 12 || 12;
    return String(hour12).padStart(2, '0');
  };

  const getAmPm = (hour24) => {
    if (is24HourFormat) return '';
    return hour24 >= 12 ? t('alarm.pm') : t('alarm.am');
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80">
      <div className="flex items-start justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl font-semibold text-slate-900 dark:text-slate-100">
            {formatHour(alarm.hour)}:{String(alarm.minute).padStart(2, '0')}
          </span>
          {!is24HourFormat && (
            <span className="text-lg font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
              {getAmPm(alarm.hour)}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onDelete(alarm.id)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-rose-400 hover:text-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-400 dark:hover:text-rose-400"
          aria-label="Delete alarm"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-medium text-slate-700 dark:text-slate-200">{alarm.description}</span>
        <Switch isOn={alarm.isEnabled} onToggle={() => onToggle(alarm.id)} />
      </div>
    </div>
  );
}

AlarmItem.propTypes = {
  alarm: PropTypes.shape({
    id: PropTypes.string.isRequired,
    hour: PropTypes.number.isRequired,
    minute: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool.isRequired,
  }).isRequired,
  is24HourFormat: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
