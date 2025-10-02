import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlarmPlus } from 'lucide-react';
import Clock from '../components/Clock';
import Switch from '../components/Switch';
import AlarmItem from '../components/AlarmItem';

export default function AlarmPage() {
  const { t } = useTranslation();
  const [is24HourFormat, setIs24HourFormat] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [alarmHour, setAlarmHour] = useState('');
  const [alarmMinute, setAlarmMinute] = useState('');
  const [alarmDescription, setAlarmDescription] = useState('');
  const [alarmAmPm, setAlarmAmPm] = useState('AM');

  const handleAddAlarm = () => {
    const hour = parseInt(alarmHour, 10);
    const minute = parseInt(alarmMinute, 10);

    if (Number.isNaN(hour) || Number.isNaN(minute) || alarmHour === '' || alarmMinute === '') {
      alert(t('alarm.validation.invalidTime'));
      return;
    }

    let h24 = hour;
    if (!is24HourFormat) {
      if (hour < 1 || hour > 12) {
        alert(t('alarm.validation.hourRange12'));
        return;
      }
      if (alarmAmPm === t('alarm.pm') && hour !== 12) {
        h24 += 12;
      } else if (alarmAmPm === t('alarm.am') && hour === 12) {
        h24 = 0;
      }
    } else if (hour < 0 || hour > 23) {
      alert(t('alarm.validation.hourRange24'));
      return;
    }

    if (minute < 0 || minute > 59) {
      alert(t('alarm.validation.minuteRange'));
      return;
    }

    const newAlarm = {
      id: Date.now(),
      hour: h24,
      minute,
      description: alarmDescription || t('alarm.descriptionPlaceholder'),
      isEnabled: true,
    };

    setAlarms((prev) => [...prev, newAlarm]);
    setAlarmHour('');
    setAlarmMinute('');
    setAlarmDescription('');
  };

  const handleDeleteAlarm = (id) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
  };

  const handleToggleAlarm = (id) => {
    setAlarms((prev) =>
      prev.map((alarm) => (alarm.id === id ? { ...alarm, isEnabled: !alarm.isEnabled } : alarm))
    );
  };

  const meridiemOptions = [t('alarm.am'), t('alarm.pm')];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-100 via-white to-slate-100 px-4 pb-16 pt-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
        <Clock is24HourFormat={is24HourFormat} />

        <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 px-6 py-4 text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
            <span className="text-lg font-semibold">{t('alarm.twelve')}</span>
            <Switch isOn={is24HourFormat} onToggle={() => setIs24HourFormat((prev) => !prev)} />
            <span className="text-lg font-semibold">{t('alarm.twentyFour')}</span>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-inner dark:border-slate-700 dark:bg-slate-900/70">
            <h2 className="mb-6 text-center text-2xl font-semibold text-slate-800 dark:text-slate-200">{t('alarm.set')}</h2>
            <div className="flex flex-wrap items-stretch gap-3">
              <input
                type="number"
                placeholder="HH"
                value={alarmHour}
                onChange={(event) => setAlarmHour(event.target.value)}
                className="w-24 rounded-xl border border-slate-300 bg-white/90 p-3 text-center text-2xl font-display font-semibold text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100"
                min={is24HourFormat ? 0 : 1}
                max={is24HourFormat ? 23 : 12}
              />
              <span className="pt-2 text-3xl font-display text-emerald-500">:</span>
              <input
                type="number"
                placeholder="MM"
                value={alarmMinute}
                onChange={(event) => setAlarmMinute(event.target.value)}
                className="w-24 rounded-xl border border-slate-300 bg-white/90 p-3 text-center text-2xl font-display font-semibold text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100"
                min="0"
                max="59"
              />
              {!is24HourFormat && (
                <div className="flex w-24 flex-col gap-2">
                  {meridiemOptions.map((meridiem) => (
                    <button
                      key={meridiem}
                      type="button"
                      onClick={() => setAlarmAmPm(meridiem)}
                      className={`h-12 rounded-xl border text-lg font-semibold transition ${
                        alarmAmPm === meridiem
                          ? 'border-emerald-500 bg-emerald-500 text-white shadow'
                          : 'border-slate-300 bg-white/90 text-slate-500 hover:border-emerald-400 hover:text-emerald-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300'
                      }`}
                    >
                      {meridiem}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder={t('alarm.descriptionPlaceholder')}
              value={alarmDescription}
              onChange={(event) => setAlarmDescription(event.target.value)}
              className="mt-4 w-full rounded-xl border border-slate-300 bg-white/90 p-3 text-lg text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100"
            />

            <button
              type="button"
              onClick={handleAddAlarm}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <AlarmPlus size={22} /> {t('alarm.add')}
            </button>
          </div>

          {alarms.length > 0 && (
            <div className="mt-8">
              <h2 className="px-2 text-xl font-semibold text-slate-700 dark:text-slate-200">{t('alarm.alarms')}</h2>
              <div className="mt-4 space-y-4">
                {alarms.map((alarm) => (
                  <AlarmItem
                    key={alarm.id}
                    alarm={alarm}
                    is24HourFormat={is24HourFormat}
                    onToggle={handleToggleAlarm}
                    onDelete={handleDeleteAlarm}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/75 p-6 text-left text-slate-700 shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{t('alarm.what')}</h2>
          <p className="mt-3 leading-relaxed text-justify">{t('alarm.whatDesc')}</p>
          <h3 className="mt-5 text-lg font-semibold text-emerald-600 dark:text-emerald-400">{t('alarm.fact')}</h3>
          <p className="mt-2 leading-relaxed text-justify">{t('alarm.factDesc')}</p>
        </div>
      </div>
    </div>
  );
}
