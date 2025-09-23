import NavigationMenu from '../components/NavigationMenu';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl md:text-6xl font-bold mb-8 text-neutral-200 dark:text-amber-500">
        Welcome to Countdown App
      </h1>
      <NavigationMenu />
    </div>
  );
}

export default Home;
