import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Clock', icon: (<span>&#9200;</span>), path: '/clock' },
  { name: 'Timer', icon: (<span>&#x23F2;</span>), path: '/timer' },
  { name: 'Stopwatch', icon: (<span>&#x23F1;</span>), path: '/stopwatch' },
  { name: 'Countdown', icon: (<span>&#128197;</span>), path: '/countdown' },
  { name: 'Alarm', icon: (<span>&#8988;</span>), path: '/alarm' },
  { name: 'Metronome', icon: (<span>&#9836;</span>), path: '/metronome' }, // Adicionado metrônomo
];

function NavigationMenu() {
  return (
    <nav className="bg-neutral-800 p-2 rounded-full shadow-lg mb-8">
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center p-3 rounded-full transition-colors duration-200
                ${isActive ? 'bg-blue-600 text-white' : 'text-neutral-300 hover:bg-neutral-700'}`
              }
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm mt-1">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavigationMenu;

