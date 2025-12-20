import React, { useRef } from "react";
import "../styles/ContactPage.css";

const team = [
  { name: "Olivia Martinez", role: "Payments Support", photo: "https://i.pravatar.cc/500?img=32" },
  { name: "Richard Mills", role: "Customer Support", photo: "https://i.pravatar.cc/500?img=12" },
  { name: "Viola Bassett", role: "Customer Success Lead", photo: "https://i.pravatar.cc/500?img=48" },
  { name: "Sophie Chamberlain", role: "Specialized Support", photo: "https://i.pravatar.cc/500?img=47" },
  { name: "Erik Anders", role: "VP Customer Success", photo: "https://i.pravatar.cc/500?img=15" },
];

// duplicate ONCE (this is enough)
const beltData = [...team, ...team];

const TeamBelt = () => {
  const trackRef = useRef(null);

  const speedUp = (dir) => {
    trackRef.current.style.animationDuration =
      dir === "fast" ? "15s" : "35s";
  };

  return (
    
    <section className="team-belt-section">
      <h2 className="belt-title">
        We’ve got an entire team dedicated to supporting you
      </h2>

      <div className="belt-container">
        {/* Desktop controls */}
        <button
          className="nav left"
          onMouseDown={() => speedUp("fast")}
          onMouseUp={() => speedUp("normal")}
        >
          ‹
        </button>

        <button
          className="nav right"
          onMouseDown={() => speedUp("fast")}
          onMouseUp={() => speedUp("normal")}
        >
          ›
        </button>

        <div className="belt-mask">
          <div className="belt-track" ref={trackRef}>
            {beltData.map((m, i) => (
              <div className="belt-card" key={i}>
                <img src={m.photo} alt={m.name} />
                <div className="belt-info">
                  <h4>{m.name}</h4>
                  <span>{m.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="belt-cta">
        <button>View team →</button>
      </div>
    </section>

    
  );
};

export default TeamBelt;
