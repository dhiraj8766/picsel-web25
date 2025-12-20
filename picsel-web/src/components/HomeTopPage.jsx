import { useEffect, useState } from "react";
import axios from "axios";
import "./HomeTopPage.css";

const API_URL = "http://localhost:8080/api/events/nearest";

const HomeTopPage = () => {
  const [events, setEvents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Swipe state variables
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  /* ---------------- FETCH EVENTS ---------------- */
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.content || [];
        setEvents(data);
      })
      .catch((err) => {
        console.error("Backend not available:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ---------------- AUTO SLIDE ---------------- */
  useEffect(() => {
    if (events.length === 0) return;
    const interval = setInterval(() => {
      nextEvent();
    }, 5000);
    return () => clearInterval(interval);
  }, [events, activeIndex]); // Add activeIndex to dep array to ensure timer resets cleanly

  /* ---------------- HANDLERS ---------------- */
  const nextEvent = () => {
    setActiveIndex((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleManualChange = (index) => {
    setActiveIndex(index);
  };

  /* ---------------- SWIPE LOGIC ---------------- */
  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextEvent();
    }
    if (isRightSwipe) {
      prevEvent();
    }
  };

  /* ---------------- STATES ---------------- */
  if (loading || error || events.length === 0) {
    return (
      <section className="home-top">
        <div className="hero-text-side">
          <h1 className="hero-title">
            Learn teamwork essentials for <br />
            <span className="highlight">effective collaboration.</span>
          </h1>
          <p className="hero-description">
            {loading
              ? "Loading upcoming events..."
              : "Events will appear here once the backend is available."}
          </p>
        </div>
      </section>
    );
  }

  /* ---------------- MAIN RENDER ---------------- */
  const activeEvent = events[activeIndex];

  return (
    <section className="home-top">
      {/* LEFT: Text Content */}
      <div className="hero-text-side">
        <h1 className="hero-title">
          Learn teamwork essentials for <br />
          <span className="highlight">
            effective <br /> collaboration.
          </span>
        </h1>

        <p className="hero-description">
          The modern Picsel dictates its own terms. Today, to be a competitive
          specialist requires more than professional skills.
        </p>
      </div>

      {/* RIGHT: Event Showcase (With Swipe handlers) */}
      <div 
        className="home-right"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="event-preview"
          style={{ backgroundImage: `url(${activeEvent.coverImage})` }}
        >
          <div className="event-overlay">
            
            {/* CONTENT BOTTOM: Title Left, Date Right */}
            <div className="event-content-wrapper">
              
              {/* Left Side: Title & Register */}
              <div className="event-info-left">
                <h2 className="event-title">{activeEvent.title}</h2>
                <p className="event-desc">{activeEvent.description}</p>
                {activeEvent.registerUrl && (
                  <a
  href={activeEvent.registerUrl}
  target="_blank"
  rel="noopener noreferrer"
  style={{ textDecoration: "none" }}
>
  <div className="button-borders">
    <button className="primary-button">
      Register Now
    </button>
  </div>
</a>

                )}
              </div>

              {/* Right Side: Date, Time, Label */}
              <div className="event-info-right">
                <span className="upcoming-label">Upcoming Event</span>
                <div className="date-time-group">
                  <span className="dt-text date">{activeEvent.date}</span>
                  {activeEvent.time && (
                     <span className="dt-text time"> • {activeEvent.time}</span>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="right-footer">
          <div className="event-thumbs">
            {events.map((ev, index) => (
              <div
                key={ev.id}
                className={`thumb ${index === activeIndex ? "active" : ""}`}
                style={{ backgroundImage: `url(${ev.coverImage})` }}
                onClick={() => handleManualChange(index)}
              >
                {/* Full layer progress overlay */}
                {index === activeIndex && <div className="thumb-progress"></div>}
              </div>
            ))}
          </div>

          <button className="learn-more">
  <span className="circle" aria-hidden="true">
    <span className="icon arrow"></span>
  </span>
  <span className="button-text">Explore Events</span>
</button>

        </div>
      </div>
    </section>
  );
};

export default HomeTopPage;