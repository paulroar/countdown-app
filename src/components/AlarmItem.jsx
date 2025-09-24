import Switch from './Switch';

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 text-neutral-600 dark:text-neutral-400 hover:text-red-500 transition-colors">
    <path d="M3 6h18"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <line x1="10" x2="10" y1="11" y2="17"/>
    <line x1="14" x2="14" y1="11" y2="17"/>
  </svg>
);

export default function AlarmItem({ alarm, is24HourFormat, onToggle, onDelete }) {
  const formatHour = (h24) => {
    if (is24HourFormat) {
      return String(h24).padStart(2, '0');
    }
    const hour12 = (h24 % 12) || 12;
    return String(hour12).padStart(2, '0');
  };

  const getAmPm = (h24) => {
    if (is24HourFormat) return '';
    return h24 >= 12 ? 'PM' : 'AM';
  };

  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-800/60 p-4 rounded-lg flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex items-baseline">
          <span className="font-mono text-4xl font-bold text-neutral-900 dark:text-neutral-200">
            {formatHour(alarm.hour)}:{String(alarm.minute).padStart(2, '0')}
          </span>
          {!is24HourFormat && (
            <span className="text-lg font-medium text-neutral-600 dark:text-neutral-400 ml-2">{getAmPm(alarm.hour)}</span>
          )}
        </div>
        <button onClick={() => onDelete(alarm.id)} className="p-1">
          <TrashIcon />
        </button>
      </div>
      
      <div className="flex items-end justify-between mt-2">
        <span className="text-neutral-800 dark:text-neutral-300 text-lg">{alarm.description}</span>
        <Switch isOn={alarm.isEnabled} onToggle={() => onToggle(alarm.id)} />
      </div>
    </div>
  );
}
