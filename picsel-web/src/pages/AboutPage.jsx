import React, { useEffect, useRef } from "react";
import "./AboutPage.css";

const AboutPage = () => {
  const progressRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const pageHeight = document.body.scrollHeight - window.innerHeight;

      // animate left line progress
      const progress = (scrollTop / pageHeight) * 100;
      if (progressRef.current) {
        progressRef.current.style.height = `${progress}%`;
      }

      // Animate cards with reveal + translate effect
      cardsRef.current.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          card.classList.add("show-card");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about-page">
      {/* PAGE HEADER */}
      <div className="page-header">
        <p className="sub-header">About Our Committee</p>
        <h1 className="main-header">Who We Are</h1>
      </div>

      {/* PAGE LAYOUT */}
      <div className="about-layout">
        {/* LEFT LINE */}
        <div className="line-section">
          <div className="line-track"></div>
          <div className="line-progress" ref={progressRef}></div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="content-section">

          {/* CARD 1 */}
          <div
            className="about-card"
            ref={(el) => (cardsRef.current[0] = el)}
          >
            <h2 className="about-card-title">Who We Are</h2>
            <p className="about-card-text">
              We are a student-led committee focused on building an innovative,
              collaborative and growth-centered tech ecosystem on campus.
              Our goal is to help students explore new skills, opportunities,
              and real-world experiences.
            </p>
          </div>

          {/* CARD 2 */}
          <div
            className="about-card"
            ref={(el) => (cardsRef.current[1] = el)}
          >
            <h2 className="about-card-title">Our Mission</h2>
            <p className="about-card-text">
              To empower students through creativity, technical excellence,
              leadership, and hands-on learning. We bridge the gap between
              ideas and execution through workshops, events, hackathons,
              and industry interactions.
            </p>
          </div>

          {/* CARD 3 */}
          <div
            className="about-card"
            ref={(el) => (cardsRef.current[2] = el)}
          >
            <h2 className="about-card-title">Our Vision</h2>
            <p className="about-card-text">
              Our vision is to develop a future-ready community of innovators,
              leaders, designers, and developers who inspire transformation on
              and beyond campus.
            </p>
          </div>

          {/* CARD 4 */}
          <div
            className="about-card"
            ref={(el) => (cardsRef.current[3] = el)}
          >
            <h2 className="about-card-title">What We Do</h2>
            <p className="about-card-text">
              • Conduct workshops, seminars & industry expert talks <br />
              • Organize hackathons, coding contests, design challenges <br />
              • Help students build strong portfolios & real-world projects <br />
              • Provide mentorship, leadership opportunities & teamwork skills
            </p>
          </div>

          {/* CARD 5 */}
          <div
            className="about-card"
            ref={(el) => (cardsRef.current[4] = el)}
          >
            <h2 className="about-card-title">Our Values</h2>
            <p className="about-card-text">
              Innovation, Integrity, Leadership, Excellence and Community —
              these values shape the foundation of everything we create.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
