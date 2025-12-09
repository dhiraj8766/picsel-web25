import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext'; // ✨ Import the AudioProvider

// Import all your pages and components

import XEventsPage from './pages/XEventspage';
import HomePage from './pages/HomePage'; 
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ContactPage from './pages/ContactPage';
import Facultypage from './pages/FacultyPage';
import LoginPage from './admin/LoginPage';
import DashboardPage from './admin/DashboardPage';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminEventPage from './admin/AdminEventPage';

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
            <Route path="/xevents" element={<XEventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faculty" element={<Facultypage />} />
            <Route path="/login" element={<LoginPage />} />
            
            

            {/* Protected Route - The Gatekeeper */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            {/* Redirect root to login for now */}
            <Route path="/" element={<LoginPage />} /> 

            
            <Route 
              path="/adminEvent" 
              element={
                <ProtectedRoute>
                  <AdminEventPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<LoginPage />} /> 



            
          </Routes>
        </main>
        <Footer />
      </div>
    </AudioProvider>
  );
}

export default App;
