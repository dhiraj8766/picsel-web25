import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';
import './EventCard.css';

const EventList = () => {
  const [events, setEvents] = useState({ upcoming: [], completed: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events');
        const allEvents = response.data;

        // Get today's date in YYYY-MM-DD format for comparison
        const today = new Date().toISOString().split('T')[0];

        // 1. Filter
        const upcoming = allEvents.filter(e => e.date >= today);
        const completed = allEvents.filter(e => e.date < today);

        // 2. Sort
        // Upcoming: Nearest date first (Ascending)
        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Completed: Most recent completed first (Descending)
        completed.sort((a, b) => new Date(b.date) - new Date(a.date));

        setEvents({ upcoming, completed });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="timeline-container" style={{padding: '2rem'}}>Loading...</div>;

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <h2>Club Schedule</h2>
      </div>

      <div className="timeline-scroll-area">
        
        {/* UPCOMING SECTION */}
        {events.upcoming.length > 0 && (
          <div className="timeline-section">
            <div className="section-title">Upcoming</div>
            {events.upcoming.map(event => (
              <EventCard key={event.id} event={event} isPast={false} />
            ))}
          </div>
        )}

        {/* COMPLETED SECTION */}
        {events.completed.length > 0 && (
          <div className="timeline-section">
            <div className="section-title">Completed</div>
            {events.completed.map(event => (
              <EventCard key={event.id} event={event} isPast={true} />
            ))}
          </div>
        )}
        
        {events.upcoming.length === 0 && events.completed.length === 0 && (
            <p style={{color: '#666', textAlign:'center'}}>No events found.</p>
        )}

      </div>
    </div>
  );
};

export default EventList;