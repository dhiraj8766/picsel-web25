import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all your pages and components
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader'; // Import the new preloader

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the preloader after the animation completes (5 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // This duration should match your CSS animation

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Show the preloader while isLoading is true
  if (isLoading) {
    return <Preloader />;
  }

  // Otherwise, show the main website
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;