import React, { useState, useEffect } from 'react';
import facultyData from '../data/faculty.json';
import './FacultySection.css';

// Dynamic Image Import
const facultyImages = import.meta.glob('../assets/facultyimg/*.{png,jpg,jpeg,webp}', { eager: true });
const getImageUrl = (jsonPath) => facultyImages[jsonPath]?.default || jsonPath;

const FacultySection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % facultyData.length);
        }, 4000); // Slower (4s) for faculty to give time to read

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="faculty-section">
            <div className="faculty-container">
                
                <div className="faculty-header">
                    <span className="sub-label">Guidance & Leadership</span>
                    <h2 className="section-title">Faculty In-Charge</h2>
                </div>

                <div className="faculty-slider-wrapper">
                    {facultyData.map((faculty, index) => {
                        // Logic to determine slide position
                        let position = 'nextSlide';
                        if (index === currentIndex) {
                            position = 'activeSlide';
                        } else if (
                            index === currentIndex - 1 ||
                            (currentIndex === 0 && index === facultyData.length - 1)
                        ) {
                            position = 'lastSlide';
                        }

                        return (
                            <div className={`faculty-slide ${position}`} key={faculty.id}>
                                <div className="faculty-content-box">
                                    
                                    {/* Left: Image */}
                                    <div className="fac-image-box">
                                        <img 
                                            src={getImageUrl(faculty.imageUrl)} 
                                            alt={faculty.name} 
                                            className="fac-img"
                                        />
                                    </div>

                                    {/* Right: Text */}
                                    <div className="fac-text-box">
                                        <h3 className="fac-name">{faculty.name}</h3>
                                        <p className="fac-role">{faculty.role}</p>
                                        <div className="fac-divider"></div>
                                        <p className="fac-message">
                                            "{faculty.message}"
                                        </p>
                                    </div>

                                </div>
                            </div>
                        );
                    })}

                    {/* Progress Bar (Visual Timer) */}
                    <div className="slider-progress-bar">
                        <div key={currentIndex} className="progress-fill"></div>
                    </div>
                    
                </div>

            </div>
        </section>
    );
};

export default FacultySection;