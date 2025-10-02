import { Github, Linkedin, Coffee } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/paulo-caesar-prado/',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/paulroar',
    icon: Github,
  },
  {
    label: 'Buy Me a Coffee',
    href: 'https://buymeacoffee.com/pauloprado',
    icon: Coffee,
  },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200/70 bg-white/85 px-4 py-6 text-sm text-slate-600 backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/80 dark:text-slate-300">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{t('brand')}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('tagline')}</p>
        </div>
        <nav className="flex flex-wrap items-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-emerald-400 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300 dark:focus:ring-offset-slate-900"
            >
              <Icon size={18} />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
