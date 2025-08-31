import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">About Picsel Club</h1>
      <div className="about-content">
        <p>
          Picsel Club is the official photography and digital arts society of our college,
          established in 2015. Our mission is to provide a platform for students to
          explore their creativity, enhance their technical skills, and connect with
          like-minded individuals.
        </p>
        <p>
          We organize a variety of events throughout the year, including workshops
          led by industry professionals, photo walks to explore scenic locations,
          editing masterclasses, and our grand annual exhibition.
        </p>
        <p>
          Whether you are a seasoned professional with a DSLR or a curious beginner
          with a smartphone, Picsel Club welcomes you. Join us to learn, create,
          and capture the world through your unique lens.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
