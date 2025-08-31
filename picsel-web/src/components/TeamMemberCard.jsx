import React from 'react';
import './TeamMemberCard.css';

const TeamMemberCard = ({ name, role, imageUrl }) => {
  return (
    <div className="team-member-card">
      <img src={imageUrl} alt={`Photo of ${name}`} className="member-photo" />
      <h4 className="member-name">{name}</h4>
      <p className="member-role">{role}</p>
    </div>
  );
};

export default TeamMemberCard;
