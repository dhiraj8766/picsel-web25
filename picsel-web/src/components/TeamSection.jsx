import React, { useState, useEffect } from 'react';
import teamData from '../data/team.json';
import './TeamSection.css';

// Dynamic Image Import (Same as before)
const teamImages = import.meta.glob('../assets/teamimg/*.{png,jpg,jpeg,webp}', { eager: true });
const getImageUrl = (jsonPath) => teamImages[jsonPath]?.default || jsonPath;

const TeamSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Automatic Slider Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % teamData.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    // Helper to determine the position of a card relative to the active index
    const getCardClass = (index) => {
        const total = teamData.length;
        
        // Calculate standard active index
        if (index === activeIndex) return 'card-center';

        // Calculate Left (Previous)
        // We use modulo math to handle the "wrap around" (e.g. index 0 -> index -1 becomes last item)
        const prevIndex = (activeIndex - 1 + total) % total;
        if (index === prevIndex) return 'card-left';

        // Calculate Right (Next)
        const nextIndex = (activeIndex + 1) % total;
        if (index === nextIndex) return 'card-right';

        return 'card-hidden'; // All other cards are hidden
    };

    return (
        <section className="team-section">
            <div className="team-container">
                
                <div className="team-header">
                    <span className="sub-label">Who We Are</span>
                    <h2 className="section-title">The Committee</h2>
                </div>

                {/* The Carousel Container */}
                <div className="carousel-wrapper">
                    {teamData.map((member, index) => (
                        <div 
                            key={member.id} 
                            className={`team-card ${getCardClass(index)}`}
                        >
                            
                            {/* Bigger Image Wrapper */}
                            <div className="image-wrapper">
                                <img 
                                    src={getImageUrl(member.imageUrl)} 
                                    alt={member.name} 
                                    className="member-img"
                                />
                            </div>

                            {/* Info shows only when card is in center (handled in CSS) */}
                            <div className="member-info">
                                <h3 className="member-name">{member.name}</h3>
                                <p className="member-role">{member.role}</p>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Optional: Dots to show progress */}
                <div className="carousel-dots">
                    {teamData.map((_, idx) => (
                        <span 
                            key={idx} 
                            className={`dot ${idx === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(idx)}
                        ></span>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TeamSection;