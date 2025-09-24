import FlipNumber from './FlipNumber';

function Timer() {
  const initialTime = 5; // 5 segundos para teste
  const [totalTimeLeft, setTotalTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || totalTimeLeft <= 0) return;

    const timer = setInterval(() => {
      setTotalTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, totalTimeLeft]);

  useEffect(() => {
    if (isRunning) {
      if (totalTimeLeft > 0) {
        const utterance = new SpeechSynthesisUtterance(`${totalTimeLeft} segundos restantes`);
        speechSynthesis.speak(utterance);
      } else if (totalTimeLeft === 0) {
        const utterance = new SpeechSynthesisUtterance("Tempo esgotado!");
        speechSynthesis.speak(utterance);
        setIsRunning(false);
      }
    }
  }, [totalTimeLeft, isRunning]);

  const minutes = Math.floor(totalTimeLeft / 60);
  const seconds = totalTimeLeft % 60;

  const toggleRunning = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTotalTimeLeft(initialTime);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-neutral-900 dark:bg-neutral-900 rounded-lg shadow-lg">
      <div className="flex space-x-2 md:space-x-4 mb-8">
        <FlipNumber value={minutes} />
        <FlipNumber value={seconds} />
        {/* <FlipNumber value={milliseconds} /> */}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={resetTimer}
          className="px-4 py-2 md:px-6 md:py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-xl text-lg md:text-xl font-semibold transition duration-300 flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12v1m4 4h.582m-15.356 2A8.001 8.001 0 0020 12v-1m-4-4h.582m-15.356-2A8.001 8.001 0 004 12v1m4 4h.582m-15.356 2A8.001 8.001 0 0020 12v-1" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12v1m4 4h.582m-15.356 2A8.001 8.001 0 0020 12v-1m-4-4h.582m-15.356-2A8.001 8.001 0 004 12v1m4 4h.582m-15.356 2A8.001 8.001 0 0020 12v-1" transform="rotate(180 12 12)" />
          </svg>
          Reset
        </button>
        <button
          onClick={toggleRunning}
          className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg md:text-xl font-semibold transition duration-300 flex items-center space-x-2"
        >
          {isRunning ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197 2.132A1 1 0 0110 13.82V10.18a1 1 0 011.555-.832l3.197 2.132a1 1 0 010 1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
}

export default Timer;
