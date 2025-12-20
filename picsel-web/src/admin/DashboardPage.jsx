import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import "./DashboardPage.css";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      {/* Left Sidebar */}
      <AdminNav />

      {/* Main Area */}
      <div className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div></div>

          <div className="admin-profile">
            <div
              className="admin-avatar"
              onClick={() => setShowMenu(!showMenu)}
            >
              A
            </div>

            {showMenu && (
              <div className="profile-dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </header>

        {/* Middle Content (Blank as requested) */}
        <section className="dashboard-content">
          {/* Content will come here later */}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
