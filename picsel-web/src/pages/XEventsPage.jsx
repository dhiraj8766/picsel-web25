import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import "../styles/XEventspage.css";

const API_BASE = "http://localhost:8080/api/events";
const PLACEHOLDER = "https://via.placeholder.com/400x300?text=No+Image";

const XEventspage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // --------------------------------------------------
  // Load events from backend
  // --------------------------------------------------
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(API_BASE);
        setEvents(res.data); // List<EventDto>
      } catch (err) {
        console.error("Failed to load events", err);
      }
    };
    fetchEvents();
  }, []);

  // --------------------------------------------------
  // Scroll indicator
  // --------------------------------------------------
  const handleScroll = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progressPercentage = (scrollPosition / totalHeight) * 100;
    setScrollProgress(progressPercentage);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --------------------------------------------------
  // Filter: only past events (completed)
  // --------------------------------------------------
  const pastEvents = useMemo(() => {
    const now = new Date();
    return events.filter((event) => {
      if (!event.date) return false;
      // date is "YYYY-MM-DD" from backend
      const eventDate = new Date(event.date);
      return eventDate < now;
    });
  }, [events]);

  const openModal = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="x-page">
      {/* Scroll Progress Bar */}
      <div className="scroll-track">
        <div
          className="scroll-thumb"
          style={{ height: `${scrollProgress}%` }}
        ></div>
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
            <div
              key={event.id}
              className="x-card"
              onClick={() => openModal(event)}
            >
              <div className="x-card-image-wrapper">
                <img
                  src={event.coverImage || PLACEHOLDER}
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
          <div
            className="x-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="x-close-btn" onClick={closeModal}>
              &times;
            </button>

            <div className="x-modal-header-top">
              <span className="x-modal-date">{selectedEvent.date}</span>
              <h2>{selectedEvent.title}</h2>
            </div>

            <div className="x-gallery-grid">
              {/* Featured Image */}
              {selectedEvent.coverImage && (
                <div className="x-gallery-item featured">
                  <img
                    src={selectedEvent.coverImage || PLACEHOLDER}
                    alt="Cover"
                  />
                </div>
              )}

              {/* Gallery Grid */}
              {selectedEvent.gallery && selectedEvent.gallery.length > 0 ? (
                selectedEvent.gallery.map((img, index) => (
                  <div key={index} className="x-gallery-item">
                    <img src={img || PLACEHOLDER} alt={`Gallery ${index}`} />
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
