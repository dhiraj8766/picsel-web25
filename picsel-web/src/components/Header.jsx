import React from 'react';
import Navbar from './Navbar'; // Import your existing centered navbar
import logo from '../assets/logo2.png'; // Make sure your path is correct
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      {/* 1. The Logo: Positioned Top-Left */}
      <a href="/" className="logo-container">
        <img src={logo} alt="Picsel Club Logo" className="app-logo" />
      </a>

      {/* 2. The Navbar: Remains Centered */}
      <div className="navbar-wrapper">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;