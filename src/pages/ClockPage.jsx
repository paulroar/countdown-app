import { useTranslation } from 'react-i18next';
import Clock from '../components/Clock';

function ClockPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-100 via-white to-slate-100 px-4 pb-16 pt-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
        <Clock />
        <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/75 p-6 text-left text-slate-700 shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{t('clock.what')}</h2>
          <p className="mt-3 leading-relaxed text-justify">{t('clock.whatDesc')}</p>
          <h3 className="mt-5 text-lg font-semibold text-emerald-600 dark:text-emerald-400">{t('clock.fact')}</h3>
          <p className="mt-2 leading-relaxed text-justify">{t('clock.factDesc')}</p>
        </div>
      </div>
    </div>
  );
}

export default ClockPage;
