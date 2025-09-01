import React, { useEffect, useRef } from 'react';
// The logo import is no longer needed
// import logo from '../assets/logo.png'; 
import { useAudio } from '../context/AudioContext';

const styles = `
.spinning-logo-container {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 120px;
    height: 120px;
    z-index: 1000;
    cursor: pointer;
    /* This container will center the rotating part */
    display: flex;
    justify-content: center;
    align-items: center;
}
/* This new div will handle the rotation for everything inside it */
.spinner-rotator {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.spinner-rotator .spinner-svg {
    position: absolute;
    width: 100%;
    height: 100%;
}
.spinner-rotator .spinner-text {
    font-family: var(--font-mono, 'Roboto Mono', monospace);
    font-size: 15px;
    font-weight: bold;
    fill: var(--accent-cyan, #64ffda);
    text-transform: uppercase;
    letter-spacing: 3px;
}
/* This is the new style for the central mute/unmute icon */
.spinner-icon {
    font-size: 40px; /* Increased size for visibility */
    /* The icon is a regular text character, so it will rotate with its parent */
    filter: drop-shadow(0 0 5px rgba(0,0,0,0.7));
}
`;

const SpinningLogo = () => {
    const { isMuted, toggleMute } = useAudio();
    const rotatorRef = useRef(null); // Ref for the element that will spin
    const currentRotation = useRef(0);
    const targetRotation = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            targetRotation.current = window.scrollY * 0.2;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        let animationFrameId;
        const animate = () => {
            const diff = targetRotation.current - currentRotation.current;
            const easingFactor = 0.08;
            currentRotation.current += diff * easingFactor;
            
            // Apply the rotation to the rotator div
            if (rotatorRef.current) {
                rotatorRef.current.style.transform = `rotate(${currentRotation.current}deg)`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <style>{styles}</style>
            <div 
                className="spinning-logo-container" 
                onClick={toggleMute} 
                title={isMuted ? "Unmute" : "Mute"}
            >
                {/* This entire div now rotates, including the icon and the SVG text */}
                <div className="spinner-rotator" ref={rotatorRef}>
                    {/* The SVG with the circular text */}
                    <svg className="spinner-svg" viewBox="0 0 100 100">
                        <defs>
                            <path 
                                id="circlePath" 
                                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" 
                            />
                        </defs>
                        <text className="spinner-text">
                            <textPath href="#circlePath">
                                Computer Science and Engineering
                            </textPath>
                        </text>
                    </svg>

                    {/* The mute/unmute icon, which is now inside the rotating div */}
                    <div className="spinner-icon">
                        {isMuted ? '🔇' : '🔊'}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpinningLogo;