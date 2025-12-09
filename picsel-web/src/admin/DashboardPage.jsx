import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Optional: used to highlight the active tab

  const handleLogout = () => {
    // 1. Clear session data
    localStorage.removeItem('isAuthenticated'); 
    
    // 2. Redirect to Login
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* --- Sidebar Navigation (Left Side) --- */}
      <aside className="sidebar">
        <div className="sidebar-brand">PICSEL CLUB</div>
        
        <ul className="nav-links">
          {/* 1. Dashboard Link */}
          <li 
            className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => navigate('/dashboard')}
          >
            <span>📊</span> Dashboard
          </li>

          {/* 2. Admin Event Link */}
          <li 
            className={`nav-item ${location.pathname === '/adminEvent' ? 'active' : ''}`}
            onClick={() => navigate('/adminEvent')}
          >
            <span>📅</span> Events
          </li>
          
          {/* 3. Logout Button */}
          <li className="nav-item logout-btn" onClick={handleLogout}>
            <span>🚪</span> Logout
          </li>
        </ul>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="main-content">
        <header className="header">
          <div className="welcome-text">
            <h2>Welcome back, Admin</h2>
            <p>Here's what's happening with Picsel Club today.</p>
          </div>
          <div className="user-profile">
            <span className="user-name">Admin</span>
            <div className="avatar">A</div>
          </div>
        </header>

        {/* Stats Grid (Kept from reference for visual structure) */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Total Members</span>
              <span className="stat-icon">👥</span>
            </div>
            <h3 className="stat-value">1,240</h3>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Upcoming Events</span>
              <span className="stat-icon">📅</span>
            </div>
            <h3 className="stat-value">03</h3>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Club Budget</span>
              <span className="stat-icon">💰</span>
            </div>
            <h3 className="stat-value">$2,400</h3>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;