import { useState, useEffect, useRef } from 'react';
import Card from '../components/Card';

// Helper to format time
const formatTime = (timeMs) => {
  const date = new Date(timeMs);
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10);

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const formatMilliseconds = (timeMs) => {
    const date = new Date(timeMs);
    return String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
}

export default function StopwatchPage() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);
  const startTimeRef = useRef(0);
  const pauseTimeRef = useRef(0);

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
  }, [isActive]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isActive) {
      const lastLapTime = laps.reduce((acc, lap) => acc + lap.lapTime, 0);
      const currentLapTime = time - lastLapTime;
      const newLap = { 
        number: laps.length + 1, 
        lapTime: currentLapTime, 
        totalTime: time 
      };
      setLaps([newLap, ...laps]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 py-8 pt-24">
      <Card className="flex flex-col items-center justify-center p-8">
        {/* Timer Display */}
        <div className="flex items-baseline">
            <span className="text-[120px] font-bold text-neutral-200 tracking-tighter">
                {formatTime(time)}
            </span>
            <span className="text-4xl font-medium text-neutral-400/85 ml-2">
                .{formatMilliseconds(time)}
            </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between w-full mt-6">
            <button onClick={handleReset} className="bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 font-bold py-3 px-8 rounded-lg text-xl transition-colors">Reset</button>
            <button onClick={handleLap} disabled={!isActive} className="bg-neutral-800/60 hover:bg-neutral-700/80 text-neutral-300 font-bold py-3 px-8 rounded-lg text-xl transition-colors disabled:opacity-50">Lap</button>
            <button onClick={handleToggle} className="bg-green-600/80 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors w-32">
                {isActive ? 'Pause' : (time > 0 ? 'Resume' : 'Start')}
            </button>
        </div>
      </Card>

      {/* Laps Table */}
      {laps.length > 0 && (
        <div className="w-full max-w-lg bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-4 text-neutral-300">
          <div className="grid grid-cols-3 gap-4 text-center font-bold border-b border-neutral-700 pb-2 mb-2">
            <div>Lap</div>
            <div>Lap Time</div>
            <div>Total Time</div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {laps.map((lap) => (
              <div key={lap.number} className="grid grid-cols-3 gap-4 text-center py-1 hover:bg-neutral-800/50 rounded">
                <div>{lap.number}</div>
                <div>{formatTime(lap.lapTime)}.{formatMilliseconds(lap.lapTime)}</div>
                <div>{formatTime(lap.totalTime)}.{formatMilliseconds(lap.totalTime)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}