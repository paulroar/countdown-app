import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TimerPage from './pages/TimerPage';
import ClockPage from './pages/ClockPage';
import StopwatchPage from './pages/StopwatchPage';
import CountdownPage from './pages/CountdownPage';
import AlarmPage from './pages/AlarmPage';
import MetronomePage from './pages/MetronomePage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <div className="App font-cinzel">
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clock" element={<ClockPage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/stopwatch" element={<StopwatchPage />} />
          <Route path="/countdown" element={<CountdownPage />} />
          <Route path="/alarm" element={<AlarmPage />} />
          <Route path="/metronome" element={<MetronomePage />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
