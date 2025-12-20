import React from 'react';
import './HomeVisionPage.css';

import img1 from '../assets/homeimg/js1.jpg';
import img2 from '../assets/homeimg/js2.jpg';
import img3 from '../assets/homeimg/js3.jpg';

const images = [img1, img2, img3];

const visionData = [
  {
    id: 1,
    number: "01",
    title: "Face Challenges",
    description:
      "The PICSEL committee envisions empowering engineering students to confidently navigate the challenges encountered throughout their academic journey."
  },
  {
    id: 2,
    number: "02",
    title: "Culture of Innovation",
    description:
      "The PICSEL committee aims to foster a culture of innovation among students by providing opportunities for research, idea exploration, and peer collaboration."
  },
  {
    id: 3,
    number: "03",
    title: "Diversity",
    description:
      "The PICSEL committee is dedicated to promoting inclusivity within the student community. Our vision is to cultivate an environment where students from all backgrounds thrive."
  }
];

const HomeVisionPage = () => {
  return (
    <section className="vision-page-container">
      {/* HEADER */}
      <div className="vision-header">
        <span className="small-tag">THE FUTURE</span>
        <h1 className="main-title">OUR VISION</h1>
        <p className="sub-text">
          Building the future, one pixel at a time.
        </p>
      </div>

      {/* STICKY STACK */}
      <div className="cards-wrapper">
        {visionData.map((item, index) => (
          <div
            key={item.id}
            className="vision-card"
            style={{ top: `calc(var(--card-top) + ${index * 32}px)` }}
          >
            <div className="card-content">
              <div className="text-section">
                <span className="card-number">{item.number}</span>
                <h2 className="card-title">{item.title}</h2>
                <p className="card-description">{item.description}</p>
              </div>

              <div className="media-section">
                <div className="media-frame">
                  <img
                    src={images[index]}
                    alt={item.title}
                    className="media-image"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* REQUIRED FOR STICKY */}
      <div className="vision-spacer" />
    </section>
  );
};

export default HomeVisionPage;
