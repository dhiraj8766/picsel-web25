import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TeamPage.css';
import TeamTheme from '../components/TeamTheme';

const API_URL = "http://localhost:8080/api/team";

const TeamPage = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await axios.get(API_URL);
      setTeamData(res.data);
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-screen">Loading Team...</div>;
  }

  return (
    <div className="team-page-container">
      {/* PAGE WATERMARK */}
      <div className="team-page-watermark">TEAM</div>

      {/* TEAM CONTENT */}
      <TeamTheme teamData={teamData} />
    </div>
  );
};

export default TeamPage;
