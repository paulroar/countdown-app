import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import logoUrl from '../assets/hoopacha-logo.svg';
import { Menu, Sun, Moon, Languages, Maximize2, Minimize2 } from 'lucide-react';
import { CSSTransition } from 'react-transition-group';
import './Header.css';

const navItems = [
  { to: '/clock', label: 'nav.clock' },
  { to: '/timer', label: 'nav.timer' },
  { to: '/stopwatch', label: 'nav.stopwatch' },
  { to: '/countdown', label: 'nav.countdown' },
  { to: '/alarm', label: 'nav.alarm' },
  { to: '/metronome', label: 'nav.metronome' },
];

function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(() => Boolean(document.fullscreenElement));
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleScroll = () => {
      closeMenu();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const toggleLanguage = () => {
    const next = i18n.language.startsWith('pt') ? 'en' : 'pt';
    i18n.changeLanguage(next);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur supports-[backdrop-filter]:backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/75">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-900 lg:hidden"
            aria-label="Toggle navigation"
          >
            <Menu size={22} strokeWidth={1.8} />
          </button>

          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img src={logoUrl} alt={t('brand')} className="h-16 w-auto drop-shadow-sm" />
            <span className="hidden font-cinzel-decorative font-bold text-2xl tracking-wide text-slate-800 dark:text-slate-100 lg:inline">
              {t('brand')}
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-base font-medium text-slate-600 dark:text-slate-200 lg:flex">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `transition-colors hover:text-emerald-500 focus:outline-none focus:text-emerald-500 dark:hover:text-emerald-300 ${
                  isActive ? 'text-emerald-600 dark:text-emerald-300' : ''
                }`
              }
            >
              {t(label)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-900"
          >
            {theme === 'dark' ? <Sun size={20} strokeWidth={1.9} /> : <Moon size={20} strokeWidth={1.9} />}
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Language selector"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-900"
          >
            <Languages size={20} strokeWidth={1.9} />
          </button>

          <button
            type="button"
            onClick={toggleFullScreen}
            aria-label="Toggle full screen"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-900"
          >
            {isFullscreen ? <Minimize2 size={20} strokeWidth={1.9} /> : <Maximize2 size={20} strokeWidth={1.9} />}
          </button>
        </div>
      </div>

      <CSSTransition
        in={isMenuOpen}
        timeout={300}
        classNames="menu-primary"
        unmountOnExit
      >
        <div className="lg:hidden border-t border-slate-200 bg-white/95 px-4 pb-4 pt-2 dark:border-slate-700 dark:bg-slate-900/95">
          <nav className="flex flex-col gap-1">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-base transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:hover:bg-slate-800 dark:focus:bg-slate-800 ${
                    isActive ? 'text-emerald-600 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-200'
                  }`
                }
              >
                {t(label)}
              </NavLink>
            ))}
          </nav>
        </div>
      </CSSTransition>
    </header>
  );
}

export default Header;
