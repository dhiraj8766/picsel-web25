import React from 'react';
import './VisionSection.css';

const VisionSection = () => {
    const visionData = [
        {
            id: '01',
            title: "Face Challenges",
            description: "The PICSEL committee envisions empowering engineering students to confidently navigate the challenges encountered throughout their academic journey."
        },
        {
            id: '02',
            title: "Culture of Innovation",
            description: "The PICSEL committee aims to foster a culture of innovation among students by providing opportunities for research, idea exploration, and peer collaboration."
        },
        {
            id: '03',
            title: "Diversity",
            description: "The PICSEL committee is dedicated to promoting inclusivity within the student community. Our vision is to cultivate an environment where students from all backgrounds thrive."
        }
    ];

    return (
        <section className="vision-section">
            <div className="vision-container">
                
                {/* Section Header */}
                <div className="vision-header">
                    <span className="sub-label">The Future</span>
                    <h2 className="section-title">Our Vision</h2>
                </div>

                {/* The Grid */}
                <div className="vision-grid">
                    {visionData.map((item) => (
                        <div key={item.id} className="vision-card">
                            <div className="card-number">{item.id}</div>
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-desc">{item.description}</p>
                            <div className="card-hover-line"></div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default VisionSection;