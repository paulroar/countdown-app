import { useState, useEffect, useRef } from 'react';
import Card from '../components/Card';

// Helper to format time
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const TimerBar = ({ timer, onPlayPause, onDelete, onClone, onNameChange, onDurationChange, isActive, isRunning }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingDuration, setIsEditingDuration] = useState(false);
  const [editHours, setEditHours] = useState(String(Math.floor(timer.duration / 3600)));
  const [editMinutes, setEditMinutes] = useState(String(Math.floor((timer.duration % 3600) / 60)));
  const [editSeconds, setEditSeconds] = useState(String(timer.duration % 60));

  const handleDurationSave = () => {
    let h = Math.max(0, parseInt(editHours, 10) || 0);
    let m = Math.max(0, parseInt(editMinutes, 10) || 0);
    let s = Math.max(0, Math.min(59, parseInt(editSeconds, 10) || 0));
    
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
    // Cap hours at 24 (or higher if needed, but 24 is standard for HH:MM:SS)
    h = Math.min(24, h); 

    const newDuration = (h * 3600) + (m * 60) + s;
    onDurationChange(timer.id, newDuration);
    setEditHours(String(h));
    setEditMinutes(String(m));
    setEditSeconds(String(s));
    setIsEditingDuration(false);
  };

  const handleDurationKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleDurationSave();
      e.target.blur();
    } else if (e.key === 'Escape') {
      setEditHours(String(Math.floor(timer.duration / 3600)));
      setEditMinutes(String(Math.floor((timer.duration % 3600) / 60)));
      setEditSeconds(String(timer.duration % 60));
      setIsEditingDuration(false);
      e.target.blur();
    }
  };

  const handleInputChange = (e, setter) => {
    let value = e.target.value;
    if (value === '') {
      setter('');
      return;
    }
    value = Math.max(0, parseInt(value, 10) || 0);
    setter(String(value));
  };

  return (
    <div className={`flex items-center bg-neutral-800/50 rounded-lg p-2 gap-2 text-neutral-300 text-sm font-averia w-full h-[70px] ${isActive ? 'border border-green-500' : ''}`}>
      <span className="font-bold w-4 text-center">{timer.number}</span>
      
      {isEditingDuration ? (
        <div className="flex items-center gap-1 font-averia">
          <input 
            type="text" 
            value={editHours} 
            onChange={(e) => handleInputChange(e, setEditHours)} 
            onBlur={handleDurationSave}
            onKeyDown={handleDurationKeyDown}
            className="w-10 bg-neutral-700 text-center rounded px-1 font-averia"
          />
          <span>:</span>
          <input 
            type="text" 
            value={editMinutes} 
            onChange={(e) => handleInputChange(e, setEditMinutes)} 
            onBlur={handleDurationSave}
            onKeyDown={handleDurationKeyDown}
            className="w-10 bg-neutral-700 text-center rounded px-1 font-averia"
          />
          <span>:</span>
          <input 
            type="text" 
            value={editSeconds} 
            onChange={(e) => handleInputChange(e, setEditSeconds)} 
            onBlur={handleDurationSave}
            onKeyDown={handleDurationKeyDown}
            className="w-10 bg-neutral-700 text-center rounded px-1 font-averia"
          />
        </div>
      ) : (
        <span className="font-averia text-base cursor-pointer" onClick={() => setIsEditingDuration(true)}>{formatTime(timer.duration)}</span>
      )}

      <input 
        type="text" 
        value={timer.name} 
        onChange={(e) => onNameChange(timer.id, e.target.value)}
        placeholder={timer.name || `Timer ${timer.number}`} 
        className="flex-grow bg-transparent border-b border-neutral-600 focus:border-green-500 outline-none px-1 font-averia"
      />
      <button 
        onClick={() => onPlayPause(timer.id)}
        className={`p-2 rounded-lg ${isRunning ? 'bg-red-500' : 'bg-green-500'} text-white`}
      >
        {isRunning ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 112 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      <div className="relative">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1 rounded-full hover:bg-neutral-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-neutral-700 rounded-md shadow-lg z-10">
            <button onClick={() => { onDelete(timer.id); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-600">Delete</button>
            <button onClick={() => { onClone(timer.id); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-600">Clone</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CountdownPage() {
  const [timers, setTimers] = useState([]);
  const [activeTimerIndex, setActiveTimerIndex] = useState(-1);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isOverallRunning, setIsOverallRunning] = useState(false);
  const [nextId, setNextId] = useState(1);

  const intervalRef = useRef(null);

  // Effect for countdown logic
  useEffect(() => {
    if (isOverallRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isOverallRunning) {
      // Current timer finished, move to next
      const nextIndex = activeTimerIndex + 1;
      if (nextIndex < timers.length) {
        setActiveTimerIndex(nextIndex);
        setTimeRemaining(timers[nextIndex].duration);
      } else {
        // All timers finished
        setIsOverallRunning(false);
        setActiveTimerIndex(-1);
      }
    } else if (!isOverallRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOverallRunning, timeRemaining, activeTimerIndex, timers]);

  // Effect to update timeRemaining when activeTimerIndex changes
  useEffect(() => {
    if (activeTimerIndex !== -1 && timers[activeTimerIndex]) {
      setTimeRemaining(timers[activeTimerIndex].duration);
    } else {
      setTimeRemaining(0);
    }
  }, [activeTimerIndex, timers]);

  const handleAddTimer = () => {
    if (timers.length < 3) { // Limit to 3 timers for free version
      setTimers((prev) => [
        ...prev,
        { id: nextId, duration: 60, name: '', isRunning: false, isPaused: false },
      ]);
      setNextId((prev) => prev + 1);
    } else {
      alert("Free version limited to 3 timers!");
    }
  };

  const handleOverallPlayPause = () => {
    if (timers.length === 0) return;

    if (!isOverallRunning) {
      // If starting from scratch or after all timers finished
      if (activeTimerIndex === -1 || timeRemaining === 0) {
        setActiveTimerIndex(0);
        setTimeRemaining(timers[0].duration);
      }
    }
    setIsOverallRunning(!isOverallRunning);
  };

  const handleResetAll = () => {
    setIsOverallRunning(false);
    setActiveTimerIndex(-1);
    setTimeRemaining(0);
    setTimers(timers.map(t => ({ ...t, isRunning: false, isPaused: false }))); // Reset individual timer states
  };

  const handleSubTimerPlayPause = (id) => {
    const index = timers.findIndex(t => t.id === id);
    if (index === -1) return;

    // If this timer is already active and running, pause it
    if (activeTimerIndex === index && isOverallRunning) {
      setIsOverallRunning(false);
    } else if (activeTimerIndex === index && !isOverallRunning && timeRemaining > 0) {
      // If this timer is active and paused, resume it
      setIsOverallRunning(true);
    } else {
      // Switch to this timer and start it
      setIsOverallRunning(true);
      setActiveTimerIndex(index);
      setTimeRemaining(timers[index].duration);
    }
  };

  const handleDeleteTimer = (id) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
    // Adjust activeTimerIndex if the deleted timer was active or before it
    if (activeTimerIndex !== -1) {
      const deletedIndex = timers.findIndex(t => t.id === id);
      if (deletedIndex === activeTimerIndex) {
        setIsOverallRunning(false);
        setActiveTimerIndex(-1);
        setTimeRemaining(0);
      } else if (deletedIndex < activeTimerIndex) {
        setActiveTimerIndex(prev => prev - 1);
      }
    }
  };

  const handleCloneTimer = (id) => {
    const timerToClone = timers.find((t) => t.id === id);
    if (timerToClone && timers.length < 3) {
      setTimers((prev) => [
        ...prev,
        { ...timerToClone, id: nextId, name: `${timerToClone.name} (Clone)` },
      ]);
      setNextId((prev) => prev + 1);
    } else if (timers.length >= 3) {
      alert("Free version limited to 3 timers!");
    }
  };

  const handleNameChange = (id, newName) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, name: newName } : t))
    );
  };

  const handleDurationChange = (id, newDuration) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, duration: newDuration } : t))
    );
    // If the active timer's duration changed, update timeRemaining if it's not running
    if (activeTimerIndex !== -1 && timers[activeTimerIndex].id === id && !isOverallRunning) {
        setTimeRemaining(newDuration);
    }
  };

  const currentTimer = timers[activeTimerIndex];

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 py-8 font-averia">
      <Card className="flex flex-col items-center justify-center p-8">
        {/* Main Timer Display */}
        <div className="text-[90px] font-bold text-neutral-200 tracking-tighter">
          {formatTime(timeRemaining)}
        </div>
        <div className="text-xl text-neutral-400 mt-2">
          {currentTimer ? currentTimer.name || `Timer ${currentTimer.number}` : 'No Active Timer'}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button 
            onClick={handleOverallPlayPause}
            disabled={timers.length === 0}
            className="bg-green-600/80 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors disabled:opacity-50 disabled:hover:bg-green-600/80"
          >
            {isOverallRunning ? 'Pause All' : (timeRemaining > 0 ? 'Resume All' : 'Start All')}
          </button>
          <button 
            onClick={handleResetAll}
            disabled={timers.length === 0 && timeRemaining === 0}
            className="bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 font-bold py-3 px-8 rounded-lg text-xl transition-colors disabled:opacity-50 disabled:hover:bg-neutral-800/60"
          >
            Reset All
          </button>
        </div>
      </Card>

      {/* Timer Bars Container */}
      <div className="w-[480px] flex flex-col gap-3">
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

      {/* Add Timer Button */}
      <button 
        onClick={handleAddTimer}
        className="bg-blue-600/80 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors"
      >
        + Add Timer
      </button>
    </div>
  );
}
