import React from 'react';
import '../styles/HomePage.css';

import SponsorsSection from '../components/SponsorsSection';
import HomeTopPage from '../components/HomeTopPage';
import HomeVisionPage from '../components/HomeVisionPage';
import HomeTeamPage from '../components/HomeTeamPage';

const HomePage = () => {
    return (
        <div className="home-page">
            <div className="home-overlay">
                <nav className="top-nav">
                    
                </nav>

                <section className="hero-content">
                    <HomeTopPage />
                </section>

                <div className="vision-section-wrapper">
                    <HomeVisionPage />
                </div>

                <div className="team-section-wrapper">
                    <HomeTeamPage />
                </div>

                <div className="sponsors-section-wrapper">
                    <SponsorsSection />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
