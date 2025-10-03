import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlarmClock, Clock, Hourglass, Music4, Timer, TimerReset } from 'lucide-react';

const navItems = [
  { key: 'nav.clock', icon: Clock, path: '/clock' },
  { key: 'nav.timer', icon: Timer, path: '/timer' },
  { key: 'nav.stopwatch', icon: TimerReset, path: '/stopwatch' },
  { key: 'nav.countdown', icon: Hourglass, path: '/countdown' },
  { key: 'nav.alarm', icon: AlarmClock, path: '/alarm' },
  { key: 'nav.metronome', icon: Music4, path: '/metronome' },
];

function NavigationMenu() {
  const { t } = useTranslation();

  return (
    <nav className="mb-10 rounded-full border border-slate-200 bg-white/80 px-3 py-2 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <ul className="flex flex-wrap justify-center items-center gap-3">
        {navItems.map(({ key, icon: Icon, path }) => (
          <li key={key}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex min-w-[84px] flex-col items-center rounded-full px-4 py-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80'
                }`
              }
            >
              <Icon size={22} strokeWidth={1.9} className="mb-1" />
              <span className="tracking-wide">{t(key)}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavigationMenu;
