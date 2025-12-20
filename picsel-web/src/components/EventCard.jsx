import React from 'react';

const EventCard = ({ event, isPast }) => {
  return (
    <div className={`timeline-item ${isPast ? 'completed' : 'upcoming'}`}>
      <div className="timeline-dot"></div>
      
      {/* "compact" class added for tighter styling */}
      <div className="timeline-content compact">
        <span className="event-date-compact">{event.date}</span>
        <h3 className="event-title-compact">{event.title}</h3>
      </div>
    </div>
  );
};

export default EventCard;