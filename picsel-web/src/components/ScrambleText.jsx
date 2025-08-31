import React, { useState, useRef, useEffect } from 'react';

const ScrambleText = ({ children }) => {
    const [text, setText] = useState(children);
    const intervalRef = useRef(null);

    const scramble = () => {
        const originalText = children;
        let iteration = 0;
        const chars = 'A!B<C>D_E\F\G/H[I]J{K}L—M=N+O*P^Q?R_ST@UV$WX&YZ-#-';

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            const scrambled = originalText
                .split('')
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    if (/\s/.test(letter)) return ' '; // Preserve spaces
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            setText(scrambled);
            
            if (iteration >= originalText.length) {
                clearInterval(intervalRef.current);
                setText(originalText);
            }
            iteration += 1 / 3;
        }, 70);
    };

    const reset = () => {
        clearInterval(intervalRef.current);
        setText(children);
    };
    
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current);
        }
    }, []);

    return (
        <span onMouseEnter={scramble} onMouseLeave={reset}>
            {text}
        </span>
    );
};

export default ScrambleText;