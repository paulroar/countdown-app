import { useState, useEffect, useRef } from 'react';
import Card from '../components/Card';
import Switch from '../components/Switch';

// Helper to format time
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const PRESETS = [1, 2, 3, 5, 10, 15, 20, 30, 60];

export default function TimerPage() {
  // Timer state
  const [initialTime, setInitialTime] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Custom input state
  const [inputHours, setInputHours] = useState('');
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');

  // Store previous valid input values for Esc key
  const prevInputHours = useRef('');
  const prevInputMinutes = useRef('');
  const prevInputSeconds = useRef('');

  // Settings state
  const [isAlarmOn, setIsAlarmOn] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      if (isAlarmOn) {
        // Placeholder for alarm sound logic
        console.log("Alarm!");
      }
    }
    return () => clearInterval(interval);
  }, [isActive, time, isAlarmOn]);

  const handleStartPause = () => {
    if (time > 0) {
      setIsActive(!isActive);
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
    // Clear custom input fields when a preset is selected
    setInputHours('');
    setInputMinutes('');
    setInputSeconds('');
  };

  // Function to update the main timer from custom inputs
  const updateMainTimerFromInputs = () => {
    let h = Math.max(0, parseInt(inputHours, 10) || 0);
    let m = Math.max(0, parseInt(inputMinutes, 10) || 0);
    let s = Math.max(0, parseInt(inputSeconds, 10) || 0);

    // Handle seconds overflow
    if (s >= 60) {
      m += Math.floor(s / 60);
      s %= 60;
    }
    // Handle minutes overflow
    if (m >= 60) {
      h += Math.floor(m / 60);
      m %= 60;
    }
    // Cap hours at 24
    h = Math.min(24, h);

    const totalSeconds = (h * 3600) + (m * 60) + s;

    if (totalSeconds > 0) {
      setInitialTime(totalSeconds);
      setTime(totalSeconds);
      setIsActive(false);
    }

    // Clear input fields after update
    setInputHours('');
    setInputMinutes('');
    setInputSeconds('');

    // Update previous input values for Esc key (these will also be empty)
    prevInputHours.current = '';
    prevInputMinutes.current = '';
    prevInputSeconds.current = '';
  };

  const handleInputKeyDown = (e, setter, prevRef) => {
    if (e.key === 'Enter') {
      updateMainTimerFromInputs();
      e.target.blur(); // Remove focus after Enter
    } else if (e.key === 'Escape') {
      setter(prevRef.current);
      e.target.blur(); // Remove focus after Escape
    }
  };

  const handleInputChange = (e, setter) => { // Removed maxVal parameter
    let value = e.target.value;
    if (value === '') {
      setter('');
      return;
    }
    value = Math.max(0, parseInt(value, 10) || 0); // Ensure non-negative
    setter(String(value));
  };

  // Update previous input values when they change
  useEffect(() => {
    prevInputHours.current = inputHours;
  }, [inputHours]);
  useEffect(() => {
    prevInputMinutes.current = inputMinutes;
  }, [inputMinutes]);
  useEffect(() => {
    prevInputSeconds.current = inputSeconds;
  }, [inputSeconds]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 py-8 font-averia">
      <Card className="flex flex-col items-center justify-center p-8">
        <div className="text-[90px] font-bold text-neutral-200 tracking-tighter">
          {formatTime(time)}
        </div>
        <div className="flex items-center gap-4 mt-4">
          <button onClick={handleStartPause} disabled={initialTime === 0} className="bg-neutral-700/50 hover:bg-neutral-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors disabled:opacity-50 disabled:hover:bg-neutral-700/50">
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={handleReset} disabled={initialTime === 0} className="bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 font-bold py-3 px-8 rounded-lg text-xl transition-colors disabled:opacity-50 disabled:hover:bg-neutral-800/60">
            Reset
          </button>
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-center gap-3 max-w-lg">
        {PRESETS.map((min) => (
          <button key={min} onClick={() => handlePresetClick(min)} className="bg-neutral-800/60 hover:bg-neutral-700/80 text-neutral-300 font-semibold py-2 px-4 rounded-lg transition-colors">
            {min} min
          </button>
        ))}
      </div>

      {/* Custom Time & Settings */}
      <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-6 w-full max-w-lg">
        <h3 className="text-xl font-bold text-center text-neutral-300 mb-4">Custom Time</h3>
        <div className="flex items-center justify-center gap-4 mb-6">
          <input type="text" placeholder="HH" value={inputHours} 
            onChange={(e) => handleInputChange(e, setInputHours)} 
            onKeyDown={(e) => handleInputKeyDown(e, setInputHours, prevInputHours)} 
            onBlur={updateMainTimerFromInputs} // Update on blur
            className="w-24 bg-neutral-800/90 text-center text-2xl font-bold p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" placeholder="MM" value={inputMinutes} 
            onChange={(e) => handleInputChange(e, setInputMinutes)} 
            onKeyDown={(e) => handleInputKeyDown(e, setInputMinutes, prevInputMinutes)} 
            onBlur={updateMainTimerFromInputs} // Update on blur
            className="w-24 bg-neutral-800/90 text-center text-2xl font-bold p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" placeholder="SS" value={inputSeconds} 
            onChange={(e) => handleInputChange(e, setInputSeconds)} 
            onKeyDown={(e) => handleInputKeyDown(e, setInputSeconds, prevInputSeconds)} 
            onBlur={updateMainTimerFromInputs} // Update on blur
            className="w-24 bg-neutral-800/90 text-center text-2xl font-bold p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        
        <hr className="border-neutral-800 my-6" />

        <h3 className="text-xl font-bold text-center text-neutral-300 mb-4">Settings</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg text-neutral-300">Alarm Sound</span>
          <Switch isOn={isAlarmOn} onToggle={() => setIsAlarmOn(!isAlarmOn)} />
        </div>
      </div>
    </div>
  );
}
