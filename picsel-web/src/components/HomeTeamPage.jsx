import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./HomeTeamPage.css";

const API_URL = "http://localhost:8080/api/team";

const HomeTeamPage = () => {
  const [team, setTeam] = useState([]);
  const trackRef = useRef(null);
  const xRef = useRef(0);
  const rafRef = useRef(null);
  const isTouching = useRef(false);

  useEffect(() => {
    axios.get(API_URL).then(res => setTeam(res.data));
  }, []);

  const data = [...team, ...team];

  /* ---------- AUTO MOVE ---------- */
  useEffect(() => {
    if (!trackRef.current) return;

    const speed = 0.8;

    const animate = () => {
      if (!isTouching.current) {
        xRef.current -= speed;
        if (Math.abs(xRef.current) >= trackRef.current.scrollWidth / 2) {
          xRef.current = 0;
        }
        trackRef.current.style.transform = `translateX(${xRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, [team]);

  /* ---------- MOBILE TOUCH ONLY ---------- */
  let startX = 0;
  let lastX = 0;

  const onTouchStart = (e) => {
    isTouching.current = true;
    startX = e.touches[0].pageX;
    lastX = xRef.current;
  };

  const onTouchMove = (e) => {
    const currentX = e.touches[0].pageX;
    xRef.current = lastX + (currentX - startX);
    trackRef.current.style.transform = `translateX(${xRef.current}px)`;
  };

  const onTouchEnd = () => {
    setTimeout(() => (isTouching.current = false), 600);
  };

  if (!team.length) return null;

  return (
    
    <section className="team-section">
      <h2 className="team-title">Meet the Team</h2>

      <div className="team-mask">
        <div
          className="team-track"
          ref={trackRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {data.map((m, i) => (
            <div
              key={i}
              className="team-card"
              onClick={() =>
                m?.socials?.instagram &&
                window.open(m.socials.instagram, "_blank")
              }
            >
              <img src={m.imageUrl} alt={m.name} />
              <div className="team-overlay">
                <h4>{m.name}</h4>
                <span>{m.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="team-cta">
        <button className="team-btn">View full team →</button>
      </div>
      
    </section>
    
  );
};

export default HomeTeamPage;
