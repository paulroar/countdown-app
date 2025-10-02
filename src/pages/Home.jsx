import { useTranslation } from 'react-i18next';
import NavigationMenu from '../components/NavigationMenu';

function Home() {
  const { t } = useTranslation();
  const brand = t('brand');

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-100 via-white to-slate-100 px-4 py-24 text-center dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8">
        <h1 className="text-4xl font-semibold leading-tight text-slate-800 md:text-6xl md:leading-tight dark:text-slate-100">
          {t('home.headline', { brand })}
        </h1>
        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          {t('home.subheadline')}
        </p>
        <NavigationMenu />
        <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/80 p-6 text-left text-slate-700 shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{t('home.why')}</h2>
          <p className="mt-3 leading-relaxed text-justify">
            {t('home.hoo')}
          </p>
          <p className="mt-3 leading-relaxed text-justify">
            {t('home.pacha')}
          </p>
          <p className="mt-3 leading-relaxed text-justify">
            {t('home.unity')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
