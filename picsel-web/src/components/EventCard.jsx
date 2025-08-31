import React from 'react';
import './EventCard.css'; // <-- Import the CSS file here

const EventCard = ({ title, date, location, description }) => {
  return (
    <div className="event-card">
      <h3 className="event-title">{title}</h3>
      <p className="event-details">
        <strong>Date:</strong> {date}
      </p>
      <p className="event-details">
        <strong>Location:</strong> {location}
      </p>
      <p className="event-description">{description}</p>
    </div>
  );
};

export default EventCard;
