import React from 'react';
import './EventCard.css';

const EventCard = ({ title, date, time, location, description, isPast }) => {
  return (
    <div className={`event-card ${isPast ? 'past-event' : ''}`}>
      
      {/* Date Box */}
      <div className="event-date-box">
        <span className="event-month">{new Date(date).toLocaleString('default', { month: 'short' })}</span>
        <span className="event-day">{new Date(date).getDate() + 1}</span> 
        {/* Note: +1 fix is sometimes needed due to timezone, check your local output */}
      </div>
      
      {/* Content */}
      <div className="event-content">
        <div className="header-row">
            <h3 className="event-title">{title}</h3>
            {isPast && <span className="status-badge">COMPLETED</span>}
        </div>
        
        <div className="event-meta">
           <span>🕒 {time}</span>
           <span>📍 {location}</span>
        </div>
        <p className="event-description">{description}</p>
      </div>
    </div>
  );
};

export default EventCard;