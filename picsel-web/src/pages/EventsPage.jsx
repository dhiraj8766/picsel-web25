import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarWidget from "../components/CalendarWidget";
import EventCard from "../components/EventCard"; // Make sure path is correct
import "../styles/EventsPage.css";
import EventTheme from "../components/EventTheme";

const API_BASE = "http://localhost:8080/api/events";

const EventsPage = () => {
  // We keep 'allEvents' for the Calendar, and split lists for the Timeline
  const [allEvents, setAllEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ------------------------------------------------------------------
  // Load events & Sort
  // ------------------------------------------------------------------
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(API_BASE);
        const data = res.data;
        
        setAllEvents(data);

        // --- Sorting Logic ---
        const today = new Date().toISOString().split('T')[0];
        
        // Filter
        const upcoming = data.filter(e => e.date >= today);
        const past = data.filter(e => e.date < today);

        // Sort Upcoming (Nearest date first)
        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Sort Past (Most recent first)
        past.sort((a, b) => new Date(b.date) - new Date(a.date));

        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setLoading(false);

      } catch (err) {
        console.error("Failed to load events", err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-page">
      <div className="page-header">
        <span className="sub-header">Schedule</span>
        <h1 className="main-header">Upcoming &amp; Past Events</h1>
      </div>

      <div className="events-layout">
        
        {/* LEFT: Scrollable Timeline Box */}
        <div className="timeline-container-box">
            
            {loading && <p className="loading-text">Loading schedule...</p>}

            {/* UPCOMING SECTION */}
            {upcomingEvents.length > 0 && (
              <div className="timeline-section">
                <div className="section-title">Upcoming</div>
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} isPast={false} />
                ))}
              </div>
            )}

            {/* COMPLETED SECTION */}
            {pastEvents.length > 0 && (
              <div className="timeline-section">
                <div className="section-title">Completed</div>
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} isPast={true} />
                ))}
              </div>
            )}

            {!loading && upcomingEvents.length === 0 && pastEvents.length === 0 && (
                <p className="no-events-text">No events found.</p>
            )}
        </div>

        {/* RIGHT: Calendar (Sticky) */}
        <div className="calendar-section">
          <div className="sticky-wrapper">
             {/* Passing all events so calendar shows everything */}
            <CalendarWidget events={allEvents} />
          </div>
        </div>

            
      </div>
            <div className="full-width-event-theme">
              <EventTheme />
            </div>
    </div>
  );
};

export default EventsPage;