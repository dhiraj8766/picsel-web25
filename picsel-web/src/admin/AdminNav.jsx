import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AdminNav.css";

const AdminNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Events", path: "/adminEvent" },
    { name: "Faculty", path: "/adminFaculty"},
    { name: "Team", path: "/adminTeam" },
  ];

  return (
    <aside className="admin-nav">
      <div className="nav-title">ADMIN</div>

      <ul className="nav-menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`nav-link ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminNav;
