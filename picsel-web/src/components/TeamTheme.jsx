import React from "react";
import "./TeamTheme.css";

const TeamTheme = ({ teamData }) => {
  return (
    <>
      {teamData.map((member, index) => (
        <section
          key={member.id}
          className={`team-theme ${index % 2 !== 0 ? "reverse" : ""}`}
        >
          {/* IMAGE */}
          <div className="team-image-wrapper">
            <div className="image-oval">
              <img src={member.imageUrl} alt={member.name} />
            </div>
          </div>

          {/* CONTENT */}
          <div className="team-content">
            <h1 className="team-name">{member.name}</h1>
            <h2 className="team-role">{member.role}</h2>

            <p className="team-desc">{member.description}</p>

            <div className="team-contact">
              <p>{member.mobile}</p>
              <p>{member.email}</p>
            </div>

            <div className="team-social">
              {member.socials?.instagram && (
                <a
                  href={member.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              )}
              {member.socials?.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}
              {member.socials?.twitter && (
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default TeamTheme;
