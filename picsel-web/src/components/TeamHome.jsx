import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TeamHome.css';
import teamData from '../data/team.json';

// --- IMAGE MAPPING FIX ---
// Import your images directly here. This tells the bundler (Vite/Webpack) to locate the files.
// Assign them to a variable (e.g., img1) to use in the map below.
import imgDefault from '../assets/teamimg/sc.jpg'; 
// import img2 from '../assets/teamimg/another-image.jpg'; // Add others as needed

// Map the path STRINGS from your JSON to the IMPORTED VARIABLES
const imageMap = {
    "../assets/teamimg/sc.jpg": imgDefault,
    // "../assets/teamimg/another-image.jpg": img2, 
};

// --- INLINE ICONS ---
const Icons = {
    Linkedin: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
    Instagram: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    Github: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
    Twitter: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>,
    Globe: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
};

const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
        case 'linkedin': return <Icons.Linkedin />;
        case 'instagram': return <Icons.Instagram />;
        case 'github': return <Icons.Github />;
        case 'twitter': return <Icons.Twitter />;
        case 'website': return <Icons.Globe />;
        default: return <Icons.Globe />;
    }
};

const TeamHome = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Smooth Auto Swipe
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % teamData.length);
        }, 4000); 
        return () => clearInterval(interval);
    }, []);

    // Helper to resolve image from map
    const resolveImage = (path) => {
        return imageMap[path] || path; // Returns the imported image if found, else the string path
    };

    // Card Class Logic for Smooth Transitions
    const getCardClass = (index) => {
        const total = teamData.length;
        if (index === activeIndex) return 'th-card slot-center';
        
        const prevIndex = (activeIndex - 1 + total) % total;
        if (index === prevIndex) return 'th-card slot-left';

        const nextIndex = (activeIndex + 1) % total;
        if (index === nextIndex) return 'th-card slot-right';

        return 'th-card slot-hidden';
    };

    return (
        <section className="team-home-section">
            <div className="team-home-bg"></div>

            <div className="th-header">
                <span className="th-subtitle">Our Leadership</span>
                <h2 className="th-title">The Committee</h2>
            </div>

            <div className="th-carousel">
                {teamData.map((member, index) => (
                    <div 
                        key={member.id} 
                        className={getCardClass(index)}
                        onClick={() => setActiveIndex(index)}
                    >
                        {/* THE IMAGE REFERENCE YOU REQUESTED */}
                        <div className="th-img-wrapper">
                            <img 
                                src={resolveImage(member.imageUrl)} 
                                alt={`Photo of ${member.name}`} 
                                className="th-img" 
                            />
                        </div>
                        
                        <div className="th-content">
                            <h3 className="th-name">{member.name}</h3>
                            <p className="th-role">{member.role}</p>
                            <p className="th-desc">{member.description}</p>
                            
                            {/* Social Icons */}
                            {member.socials && (
                                <div className="th-socials">
                                    {Object.entries(member.socials).map(([key, url]) => (
                                        <a 
                                            key={key} 
                                            href={url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="th-icon"
                                            onClick={(e) => e.stopPropagation()} // Prevent card click
                                        >
                                            {getSocialIcon(key)}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="th-controls">
                <div className="th-dots">
                    {teamData.map((_, idx) => (
                        <span 
                            key={idx} 
                            className={`th-dot ${idx === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(idx)}
                        ></span>
                    ))}
                </div>

                <Link to="/team" className="th-btn">
                    View Full Team
                </Link>
            </div>
        </section>
    );
};

export default TeamHome;