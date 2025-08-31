import React, { useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = () => {
    const [currentGreeting, setCurrentGreeting] = useState('Hello');

    useEffect(() => {
        const greetings = [
  'नमस्ते',   
  'Bonjour', 
  'Hello',
  'Hola',     
  '你好',     
  'Ciao', 
  'Halo',    
  'こんにちは', 
  'Guten Tag',
  'Olá',     
  '안녕하세요', 
  'Merhaba', 
  'السلام عليكم', 
  'Привет',  
  'שָׁלוֹם',  
  'Sawubona', 
  'Jambo',    
  'Selamat siang', 
  'Hej',      
  'God dag' 
        
];
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % greetings.length;
            setCurrentGreeting(greetings[index]);
        }, 200);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="preloader">
            {/* Videos are now wrapped in positioned containers */}
            <div className="video-container video-container-1">
                <video className="preloader-video" src="/clip.mp4" autoPlay muted playsInline loop></video>
            </div>
            <div className="video-container video-container-2">
                <video className="preloader-video" src="/clip.mp4" autoPlay muted playsInline loop></video>
            </div>

            <div className="preloader-content">
                <h1 className="preloader-logo">PICSEL</h1>
                <p className="preloader-greeting">{currentGreeting}</p>
                <div className="preloader-divider"></div>
                <p className="preloader-department">Department Of Computer Science & Engineering</p>
            </div>
        </div>
    );
};
export default Preloader;