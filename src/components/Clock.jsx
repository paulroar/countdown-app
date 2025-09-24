import { useState, useEffect } from "react";
import Card from "./Card";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-400/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-15.66l-.707.707M4.04 19.96l-.707.707M21 12h-1M4 12H3m15.66 8.66l-.707-.707M4.04 4.04l-.707-.707" />
    <circle cx="12" cy="12" r="5" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-400/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export default function Clock({ is24HourFormat = false }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const h24 = now.getHours();
  const hours12 = (h24 % 12) || 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = h24 >= 12 ? "PM" : "AM";
  const isDay = h24 >= 6 && h24 < 18; // 6am to 6pm

  const displayHours = is24HourFormat ? h24 : hours12;

  const month = now.toLocaleString("en-US", { month: "short" });
  const dayNum = now.getDate().toString().padStart(2, "0");
  const weekday = now.toLocaleString("en-US", { weekday: "long" });

  return (
    <Card className="flex flex-col items-center justify-center p-6 select-none">
      
      {/* Top Left: Weekday */}
      <div className="absolute top-6 left-7 text-neutral-400/85 text-lg font-medium">{weekday}</div>

      {/* Top Right: Sun/Moon Icon */}
      <div className="absolute top-6 right-7">{isDay ? <SunIcon /> : <MoonIcon />}</div>

      {/* Main Time Display */}
      <div className="relative flex items-baseline justify-center w-full font-averia">
        <span className="text-[140px] font-bold text-neutral-200 tracking-tighter">
          {String(displayHours).padStart(2, "0")}
        </span>
        <span className="text-[120px] font-bold text-neutral-500/80 mx-1 animate-pulse">:</span>
        <span className="text-[140px] font-bold text-neutral-200 tracking-tighter">
          {String(minutes).padStart(2, "0")}
        </span>
        {!is24HourFormat && (
          <span className="text-4xl font-medium text-neutral-400/85 ml-4">
            {ampm}
          </span>
        )}
      </div>

      {/* Bottom Left: Date */}
      <div className="absolute bottom-6 left-7 text-neutral-400/85 text-lg font-medium">
        <span>{month} {dayNum}</span>
      </div>

      {/* Bottom Right: Seconds */}
      <div className="absolute bottom-6 right-7 flex items-baseline space-x-2 text-neutral-400/85 font-medium">
        <span className="font-mono text-2xl text-neutral-300">{String(seconds).padStart(2, '0')}</span>
      </div>

    </Card>
  );
}
