import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <header className="bg-white dark:bg-neutral-900/80 dark:backdrop-blur-sm text-neutral-800 dark:text-neutral-300 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={toggleMenu} className="lg:hidden text-2xl focus:outline-none">
            &#9776;
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-blue-500 text-3xl">&#x23F0;</span>
            <span className="text-2xl font-bold text-neutral-900 dark:text-white">Time Buddy</span>
          </Link>
        </div>

        <nav className="hidden lg:flex space-x-6">
          <NavLink to="/clock" className={({ isActive }) => `hover:text-blue-500 dark:hover:text-white ${isActive ? 'text-blue-500' : ''}`}>Clock</NavLink>
          <NavLink to="/timer" className={({ isActive }) => `hover:text-blue-500 dark:hover:text-white ${isActive ? 'text-blue-500' : ''}`}>Timer</NavLink>
          <NavLink to="/stopwatch" className={({ isActive }) => `hover:text-blue-500 dark:hover:text-white ${isActive ? 'text-blue-500' : ''}`}>Stopwatch</NavLink>
          <NavLink to="/countdown" className={({ isActive }) => `hover:text-blue-500 dark:hover:text-white ${isActive ? 'text-blue-500' : ''}`}>Countdown</NavLink>
          <NavLink to="/alarm" className={({ isActive }) => `hover:text-blue-500 dark:hover:text-white ${isActive ? 'text-blue-500' : ''}`}>Alarm</NavLink>
          <NavLink to="/metronome" className={({ isActive }) => `hover:text-blue-500 dark:hover:text-white ${isActive ? 'text-blue-500' : ''}`}>Metronome</NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          <button onClick={toggle} className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none transition-colors">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button className="text-2xl focus:outline-none">
            🌐
          </button>

          <button onClick={toggleFullScreen} className="text-2xl focus:outline-none">
            &#x21F1;
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-neutral-100 dark:bg-neutral-800 mt-2 rounded-md shadow-lg">
          <NavLink to="/clock" onClick={toggleMenu} className="block px-4 py-2 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700">Clock</NavLink>
          <NavLink to="/timer" onClick={toggleMenu} className="block px-4 py-2 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700">Timer</NavLink>
          <NavLink to="/stopwatch" onClick={toggleMenu} className="block px-4 py-2 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700">Stopwatch</NavLink>
          <NavLink to="/countdown" onClick={toggleMenu} className="block px-4 py-2 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700">Countdown</NavLink>
          <NavLink to="/alarm" onClick={toggleMenu} className="block px-4 py-2 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700">Alarm</NavLink>
          <NavLink to="/metronome" onClick={toggleMenu} className="block px-4 py-2 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700">Metronome</NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
