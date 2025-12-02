import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext'; // ✨ Import the AudioProvider

// Import all your pages and components
import XEventspage from './pages/XEventspage';
import HomePage from './pages/HomePage'; 
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  // Show the preloader while isLoading is true
  if (isLoading) {
    return <Preloader />;
  }

  // Otherwise, show the main website, wrapped in the AudioProvider
  return (
    <AudioProvider> {/* ✨ Wrap the entire app */}
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/xevents" element={<XEventspage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AudioProvider>
  );
}

export default App;
