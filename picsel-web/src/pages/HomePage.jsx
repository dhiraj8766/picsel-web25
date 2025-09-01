import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import SpinningLogo from '../components/SpinningLogo'; 
import ThreeDBackground from '../components/ThreeDBackground'; // ✨ Restored this import

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
                typeSpeed = 2000;
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
            <ThreeDBackground /> {/* ✨ Added the component back */}
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

            <section className="placeholder-section">
                <h2>About Our Club</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
                </p>
            </section>

            <section className="placeholder-section">
                <h2>Our Mission</h2>
                <p>
                    Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.
                </p>
            </section>
            
            <SpinningLogo />
        </div>
    );
};

export default HomePage;