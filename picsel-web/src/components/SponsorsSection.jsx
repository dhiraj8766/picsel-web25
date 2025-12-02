import React from 'react';
import './SponsorsSection.css';

const sponsors = [
    { id: 1, name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { id: 2, name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { id: 3, name: "GitHub", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" },
    { id: 4, name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
    { id: 5, name: "Vercel", logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" },
    // Add more here...
];

const SponsorsSection = () => {
    return (
        <section className="sponsors-section">
            <div className="sponsors-container">
                
                <div className="sponsors-header">
                    <span className="sub-label">Ecosystem</span>
                    <h2 className="section-title">Our Sponsors & Partners</h2>
                    <p className="sponsors-desc">
                        Empowering our vision through their generous support and collaboration.
                    </p>
                </div>

                <div className="sponsors-grid">
                    {/* Render Sponsors */}
                    {sponsors.map((sponsor) => (
                        <div key={sponsor.id} className="sponsor-card">
                            <img 
                                src={sponsor.logo} 
                                alt={sponsor.name} 
                                className="sponsor-logo"
                            />
                        </div>
                    ))}

                    {/* "Become a Sponsor" Card */}
                    <div className="sponsor-card cta-card">
                        <span className="cta-text">Your Logo Here</span>
                        <span className="cta-sub">Become a Sponsor →</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SponsorsSection;