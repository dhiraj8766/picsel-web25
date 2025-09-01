import React, { createContext, useState, useRef, useContext, useEffect } from 'react';
// ❗ Make sure to place your audio file here and update the path
import backgroundMusic from '../assets/background-music.mp3';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef(null);

    // This effect handles playing the audio when it's unmuted
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
            audioRef.current.play().catch(error => {
                // Autoplay was prevented. This is common in browsers.
                // The audio will start once the user interacts (e.g., clicks to unmute).
                console.log("Audio autoplay prevented:", error);
            });
        }
    }, [isMuted]);

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return (
        <AudioContext.Provider value={{ isMuted, toggleMute }}>
            {/* The audio element is placed here so it persists across all pages */}
            <audio ref={audioRef} src={backgroundMusic} autoPlay loop muted />
            {children}
        </AudioContext.Provider>
    );
};

// Custom hook to easily use the audio context in any component
export const useAudio = () => {
    return useContext(AudioContext);
};