import { useState, useEffect, useRef } from 'react';

// A simple visual indicator for the beat
const BeatIndicator = ({ currentBeat, isPlaying }) => (
  <div className="flex justify-center space-x-4 my-8">
    {[0, 1, 2, 3].map((beat) => (
      <div
        key={beat}
        className={`h-4 w-4 rounded-full transition-all duration-100 ${
          isPlaying && currentBeat === beat ? 'bg-green-500 scale-125' : 'bg-neutral-300 dark:bg-neutral-700'
        }`}
      ></div>
    ))}
  </div>
);

export default function MetronomePage() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(-1); // Start at -1 to make the first beat 0

  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);

  // Function to create and play a beep sound
  const playBeep = (currentBeat) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    // Higher pitch for the first beat of the measure
    const frequency = currentBeat === 0 ? 880 : 440;
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    gain.gain.setValueAtTime(1, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.05);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.05);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setBeat(prev => {
          const nextBeat = (prev + 1) % 4;
          playBeep(nextBeat);
          return nextBeat;
        });
      }, (60 / bpm) * 1000);
    } else {
      clearInterval(intervalRef.current);
      setBeat(-1);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, bpm]);

  const handleBpmChange = (e) => {
    const newBpm = parseInt(e.target.value, 10);
    setBpm(newBpm);
  };

  const togglePlay = () => {
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    // If turning on, play the first beat immediately
    if (!isPlaying) {
        const firstBeat = 0;
        playBeep(firstBeat);
        setBeat(firstBeat);
    }
    setIsPlaying(!isPlaying);
  };

  const buttonStyle = isPlaying
    ? 'bg-red-600 hover:bg-red-700'
    : 'bg-green-600 hover:bg-green-700';

  return (
    <div className="min-h-screen flex flex-col items-center pt-24 pb-12">
      <div className="w-full max-w-md px-4">
        <div className="p-8 rounded-lg bg-neutral-100 dark:bg-neutral-800/50 text-neutral-900 dark:text-white text-center">
          
          <h2 className="text-2xl font-bold mb-2">Metronome</h2>
          
          <BeatIndicator currentBeat={beat} isPlaying={isPlaying} />

          <div className="text-7xl font-bold font-mono">{bpm}</div>
          <div className="text-lg text-neutral-600 dark:text-neutral-400 -mt-2">BPM</div>

          <input
            type="range"
            min="40"
            max="240"
            value={bpm}
            onChange={handleBpmChange}
            className="w-full mt-8 h-3 rounded-lg appearance-none cursor-pointer range-thumb bg-neutral-300 dark:bg-neutral-700"
          />

          <button
            onClick={togglePlay}
            className={`w-full mt-8 py-4 rounded-lg text-xl font-bold transition-colors duration-200 ${buttonStyle}`}
          >
            {isPlaying ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
}