import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

import VisionSection from '../components/VisionSection';
import TeamHome from '../components/TeamHome';
import SponsorsSection from '../components/SponsorsSection';
import FacultySection from '../components/FacultySection';

// FIX: Ensure you are using ".." to go up to src, then into assets
import img1 from '../assets/homeimg/js1.jpg'; 
import img2 from '../assets/homeimg/js2.jpg';
import img3 from '../assets/homeimg/js3.jpg';
import img4 from '../assets/homeimg/js4.jpg';

const imageList = [img1, img2, img3, img4];

const HomePage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-page">
            
            <nav className="top-nav">
                <div className="logo">Picsel Club</div>
            </nav>

            <section className="hero-content">
                {/* LEFT SIDE */}
                <div className="hero-text-side">
                    <h1 className="hero-title">
                        Learn teamwork essentials for <br />
                        <span className="highlight">effective <br /> collaboration.</span>
                    </h1>
                    
                    <p className="hero-description">
                        The modern Picsel dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </p>
                    
                    <Link to="/events" className="primary-button">
                        View Events
                    </Link>
                </div>

                {/* RIGHT SIDE: SLIDESHOW (Straight & Clean) */}
                <div className="hero-image-side">
                    <div className="image-container">
                        
                        {imageList.map((img, index) => (
                            <img 
                                key={index}
                                src={img} 
                                alt={`Slide ${index}`} 
                                className={`slide-image ${index === currentImageIndex ? 'active' : ''}`}
                            />
                        ))}

                        <div className="image-overlay-card">
                            <p>
                                <strong>PICSEL Committee:</strong> 
                                Ignite innovation, foster collaboration, and shape the future of technology!
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <div className="vision-section-wrapper">
                <VisionSection />
            </div>
            
            <div className="team-section-wrapper">
                <TeamHome />
            </div>

            <div className="faculty-section-wrapper">
                        
                <FacultySection />
            </div>

            <div className="sponsors-section-wrapper">
                <SponsorsSection />
            </div>
        </div>
    );
};

export default HomePage;    