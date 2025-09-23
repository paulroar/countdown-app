import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Importar useTheme

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Usar o contexto do tema

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
    <header className="bg-neutral-900/80 backdrop-blur-sm text-neutral-300 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Menu Hamburger */}
          <button onClick={toggleMenu} className="lg:hidden text-2xl focus:outline-none">
            &#9776;
          </button>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-blue-500 text-3xl">&#x23F0;</span>
            <span className="text-2xl font-bold text-white">Time Buddy</span>
          </Link>
        </div>

        {/* Navegação principal - visível em telas maiores, escondida em pequenas (para o dropdown) */}
        <nav className="hidden lg:flex space-x-6">
          <NavLink to="/clock" className={({ isActive }) => `hover:text-white ${isActive ? 'text-blue-500' : ''}`}>Clock</NavLink>

          <NavLink to="/timer" className={({ isActive }) => `hover:text-white ${isActive ? 'text-blue-500' : ''}`}>Timer</NavLink>
          <NavLink to="/stopwatch" className={({ isActive }) => `hover:text-white ${isActive ? 'text-blue-500' : ''}`}>Stopwatch</NavLink>
          <NavLink to="/countdown" className={({ isActive }) => `hover:text-white ${isActive ? 'text-blue-500' : ''}`}>Countdown</NavLink>
          <NavLink to="/alarm" className={({ isActive }) => `hover:text-white ${isActive ? 'text-blue-500' : ''}`}>Alarm</NavLink>
          <NavLink to="/metronome" className={({ isActive }) => `hover:text-white ${isActive ? 'text-blue-500' : ''}`}>Metronome</NavLink>
        </nav>

        {/* Ícones de Ação */}
        <div className="flex items-center space-x-4">
          {/* Dark/Light Mode Toggle */}
          <button onClick={toggleTheme} className="text-2xl focus:outline-none">
            {theme === 'dark' ? '☀️' : '💡'} {/* Usar o tema do contexto */}
          </button>

          {/* Language Selector */}
          <button className="text-2xl focus:outline-none">
            🌐
          </button>

          {/* Fullscreen Toggle */}
          <button onClick={toggleFullScreen} className="text-2xl focus:outline-none">
            &#x21F1;
          </button>
        </div>
      </div>

      {/* Menu Dropdown para telas pequenas */}
      {isMenuOpen && (
        <div className="lg:hidden bg-neutral-800 mt-2 rounded-md shadow-lg">
          <NavLink to="/clock" onClick={toggleMenu} className="block px-4 py-2 text-neutral-300 hover:bg-neutral-700">Clock</NavLink>

          <NavLink to="/timer" onClick={toggleMenu} className="block px-4 py-2 text-neutral-300 hover:bg-neutral-700">Timer</NavLink>
          <NavLink to="/stopwatch" onClick={toggleMenu} className="block px-4 py-2 text-neutral-300 hover:bg-neutral-700">Stopwatch</NavLink>
          <NavLink to="/countdown" onClick={toggleMenu} className="block px-4 py-2 text-neutral-300 hover:bg-neutral-700">Countdown</NavLink>
          <NavLink to="/alarm" onClick={toggleMenu} className="block px-4 py-2 text-neutral-300 hover:bg-neutral-700">Alarm</NavLink>
          <NavLink to="/metronome" onClick={toggleMenu} className="block px-4 py-2 text-neutral-300 hover:bg-neutral-700">Metronome</NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
