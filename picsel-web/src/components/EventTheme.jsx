import React, { useState, useEffect, useRef } from 'react';
import './EventTheme.css';

// --- 1. DEFINE YOUR HEADINGS HERE ---
const categoryNames = {
  "Type 1": "Sports Events",
  "Type 2": "Esports",
  "Type 3": "Technical Events",
  "Type 4": "Fun Events",
  // You can add more here later, e.g., "Type 5": "Cultural Events"
};

// --- Icons (Same as before) ---
const IconChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);
const IconChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);
const IconClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const IconCalendar = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const EventTheme = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/events')
      .then((res) => res.json())
      .then((data) => {
        // Filter logic: Show only Upcoming Events
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        const upcoming = data.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate >= today; 
        });

        setEvents(upcoming);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  const groupedEvents = events.reduce((acc, event) => {
    const type = event.eventType || "Other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(event);
    return acc;
  }, {});

  const openModal = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) return <div className="et-loader">Loading Upcoming Events...</div>;

  return (
    <div className="et-page-container">
      <div className="et-bg-pattern"></div>

      <div className="et-content-wrapper">
        <h1 className="et-main-title">Upcoming Events</h1>

        {Object.keys(groupedEvents).length === 0 ? (
           <div className="et-no-events">No upcoming events found.</div>
        ) : (
          Object.keys(groupedEvents).map((type) => (
            <EventSection 
              key={type} 
              // --- 2. USE THE MAPPING HERE ---
              // If type is "Type 1", it shows "Sports Events". 
              // If it's not in the list, it defaults to the original database value.
              title={categoryNames[type] || type} 
              events={groupedEvents[type]} 
              onCardClick={openModal}
            />
          ))
        )}
      </div>

      {/* Popup Modal */}
      {selectedEvent && (
        <div className="et-modal-overlay" onClick={closeModal}>
          <div className="et-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="et-modal-close-btn" onClick={closeModal}>
              <IconClose />
            </button>
            
            <div className="et-modal-image-box">
              <img 
                src={selectedEvent.coverImage || "https://via.placeholder.com/600x400?text=No+Image"} 
                alt={selectedEvent.title} 
              />
              <div className="et-modal-gradient-overlay"></div>
            </div>

            <div className="et-modal-details">
              <h2 className="et-modal-title">{selectedEvent.title}</h2>
              
              <div className="et-modal-meta">
                <span>📅 {selectedEvent.date}</span>
                <span>⏰ {selectedEvent.time}</span>
              </div>
              
              <div className="et-modal-location">
                📍 {selectedEvent.location}
              </div>

              <div className="et-modal-desc">
                <p>{selectedEvent.description}</p>
              </div>

              {selectedEvent.registerUrl && selectedEvent.registerUrl.trim() !== "" ? (
                <a 
                  href={selectedEvent.registerUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="et-modal-register-btn"
                >
                  Register Now
                </a>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component
const EventSection = ({ title, events, onCardClick }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 320; 
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="et-section">
      <div className="et-section-header">
        <h2 className="et-section-title">{title}</h2>
        <div className="et-section-nav">
          <button onClick={() => scroll('left')}><IconChevronLeft /></button>
          <button onClick={() => scroll('right')}><IconChevronRight /></button>
        </div>
      </div>

      <div className="et-scroll-container" ref={scrollRef}>
        {events.map((event) => (
          <div key={event.id} className="et-card">
            <div className="et-card-image-box" onClick={() => onCardClick(event)}>
              <img 
                src={event.coverImage || "https://via.placeholder.com/400x300?text=Event"} 
                alt={event.title} 
                className="et-card-img"
              />
              <div className="et-card-badge">{title}</div>
              <div className="et-card-overlay"></div>
            </div>
            
            <div className="et-card-content">
               <h3 className="et-card-title" onClick={() => onCardClick(event)}>{event.title}</h3>
               <div className="et-card-date"><IconCalendar /> {event.date}</div>
               
               {event.registerUrl && event.registerUrl.trim() !== "" ? (
                 <a 
                   href={event.registerUrl} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="et-card-btn"
                 >
                   Register Now ↗
                 </a>
               ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTheme;