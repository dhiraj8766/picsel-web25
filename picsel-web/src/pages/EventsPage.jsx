import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import CalendarWidget from '../components/CalendarWidget';
import eventsData from '../data/events.json'; 
import './EventsPage.css';

const EventsPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Glow Logic
  const handleScroll = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper: Check if event is passed
  const isEventPast = (dateStr, timeStr) => {
    // Combine date and time to create a Date object
    // Assuming format "YYYY-MM-DD" and "HH:MM AM/PM"
    const dateTimeString = `${dateStr} ${timeStr}`;
    const eventDate = new Date(dateTimeString);
    const now = new Date();
    return eventDate < now;
  };

  return (
    <div className="events-page">
      
      <div className="page-header">
        <span className="sub-header">Schedule</span>
        <h1 className="main-header">Upcoming & Past Events</h1>
      </div>

      <div className="events-layout">
        
        {/* LEFT: Timeline */}
        <div className="timeline-section">
          <div className="timeline-track">
            <div 
                className="timeline-progress" 
                style={{ height: `${scrollProgress}%` }}
            ></div>
          </div>

          <div className="events-list">
            {eventsData.map((event) => {
                const isPast = isEventPast(event.date, event.time);
                
                return (
                  <EventCard
                    key={event.id}
                    {...event}
                    isPast={isPast} // Pass the status to the card
                  />
                );
            })}
             <div style={{ height: '100px' }}></div> 
          </div>
        </div>

        {/* RIGHT: Calendar (Pass real data) */}
        <div className="calendar-section">
            <div className="sticky-wrapper">
                <CalendarWidget events={eventsData} />
            </div>
        </div>

      </div>
    </div>
  );
};

export default EventsPage;