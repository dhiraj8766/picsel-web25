import React from 'react';
import TeamMemberCard from '../components/TeamMemberCard';
import teamData from '../data/team.json';
import './TeamPage.css';

const TeamPage = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Meet Our Team</h1>
      <div className="team-grid">
        {teamData.map((member) => (
          <TeamMemberCard
            key={member.id}
            name={member.name}
            role={member.role}
            imageUrl={member.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
