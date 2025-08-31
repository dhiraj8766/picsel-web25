import React from 'react';
import EventCard from '../components/EventCard';
import eventsData from '../data/events.json'; // Import the data
import './EventsPage.css';

const EventsPage = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Upcoming Events</h1>
      <div className="events-grid">
        {eventsData.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            description={event.description}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
