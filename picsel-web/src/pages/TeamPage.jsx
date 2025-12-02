import React from 'react';
import teamData from '../data/team.json';
import './TeamPage.css';

// Using React Icons for a polished look
import { FiLinkedin, FiInstagram, FiTwitter, FiGithub, FiGlobe, FiMail } from 'react-icons/fi';

// --- IMAGE LOADER ---
const allImages = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp}', { eager: true });

const getImageUrl = (jsonPath) => {
  if (!jsonPath) return "https://via.placeholder.com/400x500?text=Member";
  if (allImages[jsonPath]) return allImages[jsonPath].default;
  const filename = jsonPath.split('/').pop();
  const foundKey = Object.keys(allImages).find(key => key.toLowerCase().endsWith(filename.toLowerCase()));
  return foundKey ? allImages[foundKey].default : "https://via.placeholder.com/400x500?text=No+Image";
};

const getSocialIcon = (key) => {
    switch(key) {
        case 'linkedin': return <FiLinkedin />;
        case 'instagram': return <FiInstagram />;
        case 'twitter': return <FiTwitter />;
        case 'github': return <FiGithub />;
        case 'email': return <FiMail />;
        default: return <FiGlobe />;
    }
};

const TeamPage = () => {
  return (
    <div className="team-page-container">
      
      <div className="team-header-section">
        <span className="team-subtitle">Meet The Makers</span>
        <h1 className="team-title">Our Team</h1>
        <p className="team-description">
           The creative minds and technical wizards building the future of PICSEL.
        </p>
      </div>

      <div className="team-grid">
        {teamData.map((member) => (
          <div key={member.id} className="team-card">
            
            {/* 1. Full Height Image */}
            <div className="image-wrapper">
              <img 
                src={getImageUrl(member.imageUrl)} 
                alt={member.name} 
                className="member-photo" 
              />
              {/* Dark Gradient Overlay for text readability */}
              <div className="gradient-overlay"></div>
            </div>

            {/* 2. Floating Content Box */}
            <div className="card-content">
              <div className="text-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </div>

              {/* 3. Socials (Hidden initially, slide up on hover) */}
              <div className="social-links">
                <div className="social-divider"></div>
                <div className="icons-row">
                  {member.socials && Object.entries(member.socials).map(([key, url]) => (
                    url && (
                        <a 
                            key={key} 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-icon"
                            title={key}
                        >
                            {getSocialIcon(key)}
                        </a>
                    )
                  ))}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;