// import React from 'react';
// import './FacultyPage.css';

// const FacultyPage = () => {
//     return (
//         <div>
//             <h1 className="page-title">Faculty Page</h1>
//         </div>
//     );
// };

// export default FacultyPage;

import "./FacultyPage.css";

const FacultyPage = () => {
  const faculty = [
    {
      name: "Dr. Sanjana",
      designation: "Professor, Computer Science",
      role: "Head Coordinator",
      img: "https://via.placeholder.com/200",
      message:
        "Always believe in learning by doing. Our club is built on creativity and teamwork."
    },
    {
      name: "Prof. Rahul",
      designation: "Technical Lead",
      role: "Website Incharge",
      img: "https://via.placeholder.com/200",
      message:
        "Pursue knowledge without fear. Innovation starts when you dare to try."
    },
    {
      name: "Dr. Meera",
      designation: "Event Mentor",
      role: "Forum Incharge",
      img: "https://via.placeholder.com/200",
      message:
        "Every student has a spark—your skill is to find it and strengthen it."
    }
  ];

  return (
    <div className="faculty-container">
      <h1 className="faculty-title">Our Faculty</h1>

      <div className="faculty-grid">
        {faculty.map((f, i) => (
          <div className="faculty-card" key={i}>
            <img src={f.img} alt={f.name} className="faculty-photo" />

            <h2 className="faculty-name">{f.name}</h2>
            <p className="faculty-designation">{f.designation}</p>
            <p className="faculty-role">• {f.role}</p>

            <p className="faculty-message">
              “{f.message}”
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyPage;

