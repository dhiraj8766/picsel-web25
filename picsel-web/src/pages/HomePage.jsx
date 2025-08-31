import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ThreeDBackground from '../components/ThreeDBackground'; // Import the new 3D component
import './HomePage.css'; // Import the new CSS

const HomePage = () => {
    const [subtitle, setSubtitle] = useState('');
    const phrases = useMemo(() => ["We Code.", "We Build.", "We Compete.", "We Collaborate."], []);
    const [phraseIndex, setPhraseIndex] = useState(0);

    useEffect(() => {
        let currentText = '';
        let isDeleting = false;
        let timer;

        const typingEffect = () => {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                currentText = currentPhrase.substring(0, currentText.length - 1);
            } else {
                currentText = currentPhrase.substring(0, currentText.length + 1);
            }
            setSubtitle(currentText);

            let typeSpeed = 150;
            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && currentText === currentPhrase) {
                typeSpeed = 2000; // Pause at the end of a phrase
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
                typeSpeed = 500;
            }
            timer = setTimeout(typingEffect, typeSpeed);
        };

        timer = setTimeout(typingEffect, 250);

        return () => clearTimeout(timer);
    }, [phraseIndex, phrases]);

    return (
        <div className="home-page">
            <ThreeDBackground />
            <section className="hero-content">
                <h1 className="hero-title" data-text="Picsel Club">
                    Picsel Club
                </h1>
                <p className="hero-subtitle">
                    {subtitle}
                    <span className="typing-cursor"></span>
                </p>
                <Link to="/events" className="hero-button">
                    Explore Events
                </Link>
            </section>
        </div>
    );
};

export default HomePage;