import React, { useState, useMemo, useEffect } from 'react';
import './XEventspage.css';
import eventsData from '../data/events.json'; 

// --- ROBUST IMAGE LOADER ---
// 1. Load ALL images from any folder inside 'assets' (recursive search)
const allImages = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp}', { eager: true });

// 2. Smart Lookup Function
const getImageUrl = (jsonPath) => {
  if (!jsonPath) return "https://via.placeholder.com/400x300?text=No+Image";

  // Attempt 1: Exact Match (Fastest)
  if (allImages[jsonPath]) {
    return allImages[jsonPath].default;
  }

  // Attempt 2: Filename Match (Smart)
  // If JSON says "../assets/teamimg/sc.jpg" but React wants "./assets/teamimg/sc.jpg", this fixes it.
  const filename = jsonPath.split('/').pop(); // Get "sc.jpg" or "a.jpg"
  
  // Find a key in our loaded images that ends with this filename
  const foundKey = Object.keys(allImages).find(key => key.toLowerCase().endsWith(filename.toLowerCase()));

  if (foundKey) {
    return allImages[foundKey].default;
  }

  // Debugging: If still not found, print error to console
  console.error(`Image not found for path: ${jsonPath}`);
  return "https://via.placeholder.com/400x300?text=Image+Not+Found";
};

const XEventspage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // --- SCROLL INDICATOR ---
  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progressPercentage = (scrollPosition / totalHeight) * 100;
    setScrollProgress(progressPercentage);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- FILTER LOGIC ---
  const pastEvents = useMemo(() => {
    const now = new Date();
    return eventsData.filter(event => {
      const timeString = event.time || "00:00"; 
      const eventDate = new Date(`${event.date} ${timeString}`);
      return eventDate < now; 
    });
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="x-page">
      
      {/* Scroll Progress Bar */}
      <div className="scroll-track">
        <div className="scroll-thumb" style={{ height: `${scrollProgress}%` }}></div>
      </div>

      <div className="x-container">
        <div className="x-header-section">
          <span className="x-sub-header">Flashback</span>
          <h1 className="x-main-header">Our Success Stories</h1>
          <p className="x-header-desc">
            A gallery of moments where innovation met execution. <br />
            Explore the milestones that defined our journey.
          </p>
        </div>

        <div className="x-grid">
          {pastEvents.map((event) => (
            <div key={event.id} className="x-card" onClick={() => openModal(event)}>
              <div className="x-card-image-wrapper">
                {/* USE SMART IMAGE LOADER HERE */}
                <img 
                  src={getImageUrl(event.coverImage)} 
                  alt={event.title} 
                  className="x-card-img" 
                />
                <div className="x-card-overlay">
                  <span className="x-view-btn">View Gallery</span>
                </div>
              </div>
              
              <div className="x-card-content">
                <span className="x-date">{event.date}</span>
                <h3 className="x-title">{event.title}</h3>
                <p className="x-desc">{event.description}</p>
              </div>
            </div>
          ))}

          {pastEvents.length === 0 && (
            <div className="no-events">
              <p>No completed events to display yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL --- */}
      {selectedEvent && (
        <div className="x-modal-backdrop" onClick={closeModal}>
          <div className="x-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="x-close-btn" onClick={closeModal}>&times;</button>
            
            <div className="x-modal-header-top">
              <span className="x-modal-date">{selectedEvent.date}</span>
              <h2>{selectedEvent.title}</h2>
            </div>

            <div className="x-gallery-grid">
              {/* Featured Image */}
              {selectedEvent.coverImage && (
                 <div className="x-gallery-item featured">
                    <img src={getImageUrl(selectedEvent.coverImage)} alt="Cover" />
                 </div>
              )}
              
              {/* Gallery Grid */}
              {selectedEvent.gallery && selectedEvent.gallery.length > 0 ? (
                selectedEvent.gallery.map((img, index) => (
                  <div key={index} className="x-gallery-item">
                    <img src={getImageUrl(img)} alt={`Gallery ${index}`} />
                  </div>
                ))
              ) : (
                <p className="no-gallery-msg">More photos coming soon.</p>
              )}
            </div>

            <div className="x-modal-desc-section">
              <p className="x-modal-desc">{selectedEvent.description}</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default XEventspage;