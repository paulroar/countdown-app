import { useState } from 'react';
import Clock from '../components/Clock';
import Switch from '../components/Switch';
import AlarmItem from '../components/AlarmItem';

export default function AlarmPage() {
  const [is24HourFormat, setIs24HourFormat] = useState(false);
  const [alarms, setAlarms] = useState([]);
  
  const [alarmHour, setAlarmHour] = useState('');
  const [alarmMinute, setAlarmMinute] = useState('');
  const [alarmDescription, setAlarmDescription] = useState('');
  const [alarmAmPm, setAlarmAmPm] = useState('AM');

  const handleAddAlarm = () => {
    const hour = parseInt(alarmHour, 10);
    const minute = parseInt(alarmMinute, 10);

    if (isNaN(hour) || isNaN(minute) || alarmHour === '' || alarmMinute === '') {
      alert('Please enter a valid hour and minute.');
      return;
    }

    let h24 = hour;
    if (!is24HourFormat) {
      if (hour < 1 || hour > 12) {
        alert('Please enter an hour between 1 and 12.');
        return;
      }
      if (alarmAmPm === 'PM' && hour !== 12) {
        h24 += 12;
      } else if (alarmAmPm === 'AM' && hour === 12) {
        h24 = 0;
      }
    } else {
      if (hour < 0 || hour > 23) {
        alert('Please enter an hour between 0 and 23.');
        return;
      }
    }
    
    if (minute < 0 || minute > 59) {
        alert('Please enter a minute between 0 and 59.');
        return;
    }

    const newAlarm = {
      id: Date.now(),
      hour: h24,
      minute: minute,
      description: alarmDescription || 'Alarm',
      isEnabled: true,
    };

    setAlarms([...alarms, newAlarm]);
    setAlarmHour('');
    setAlarmMinute('');
    setAlarmDescription('');
  };

  const handleDeleteAlarm = (id) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  const handleToggleAlarm = (id) => {
    setAlarms(alarms.map(alarm =>
      alarm.id === id ? { ...alarm, isEnabled: !alarm.isEnabled } : alarm
    ));
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-24 pb-12">
      <Clock is24HourFormat={is24HourFormat} />
      
      <div className="w-full max-w-md mt-8 px-4">
        <div className="flex items-center justify-center gap-4 p-4 rounded-lg bg-neutral-800/50">
          <span className="text-lg font-medium">12h</span>
          <Switch isOn={is24HourFormat} onToggle={() => setIs24HourFormat(!is24HourFormat)} />
          <span className="text-lg font-medium">24h</span>
        </div>

        <div className="mt-8 p-6 rounded-lg bg-neutral-800/50">
          <h2 className="text-xl font-semibold text-center mb-4">Set new alarm</h2>
          <div className="flex items-stretch gap-2">
            <input
              type="number"
              placeholder="HH"
              value={alarmHour}
              onChange={(e) => setAlarmHour(e.target.value)}
              className="w-1/3 p-3 bg-neutral-700 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              min={is24HourFormat ? 0 : 1}
              max={is24HourFormat ? 23 : 12}
            />
            <span className="text-2xl font-bold pt-2">:</span>
            <input
              type="number"
              placeholder="MM"
              value={alarmMinute}
              onChange={(e) => setAlarmMinute(e.target.value)}
              className="w-1/3 p-3 bg-neutral-700 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
              max="59"
            />
            {!is24HourFormat && (
              <div className="w-1/3 flex flex-col gap-1">
                <button 
                  onClick={() => setAlarmAmPm('AM')}
                  className={`w-full h-1/2 rounded-md text-lg font-semibold transition-colors ${alarmAmPm === 'AM' ? 'bg-green-600 text-white' : 'bg-neutral-700 text-neutral-400'}`}
                >AM</button>
                <button 
                  onClick={() => setAlarmAmPm('PM')}
                  className={`w-full h-1/2 rounded-md text-lg font-semibold transition-colors ${alarmAmPm === 'PM' ? 'bg-green-600 text-white' : 'bg-neutral-700 text-neutral-400'}`}
                >PM</button>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Alarm description"
            value={alarmDescription}
            onChange={(e) => setAlarmDescription(e.target.value)}
            className="w-full mt-4 p-3 bg-neutral-700 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button 
            onClick={handleAddAlarm}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alarm-plus"><path d="M12 21a7 7 0 1 0-7-7"/><path d="M19.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M22 12h-2"/><path d="M12 5V3"/><path d="m4.93 4.93 1.41 1.41"/><path d="M16 19h6"/><path d="M19 16v6"/></svg>
            Add alarm
          </button>
        </div>

        {alarms.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 px-2">Alarms</h2>
            <div className="space-y-4">
              {alarms.map(alarm => (
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
    </div>
  );
}