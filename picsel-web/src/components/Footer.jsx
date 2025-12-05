import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* --- TOP SECTION: Columns --- */}
        <div className="footer-top">
          
          {/* Column 1: Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">Picsel Club</div>
            <p className="footer-desc">
              Igniting innovation and fostering collaboration for the future of engineering.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <h4 className="col-title">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/team">Team</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-col">
            <h4 className="col-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Join the Club</a></li>
              <li><a href="#">Community Guidelines</a></li>
              <li><a href="#">Projects Gallery</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div className="footer-col">
            <h4 className="col-title social-icons">Connect</h4>
            <div className="social-icons">
              
              {/* Instagram Icon */}
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>

              {/* LinkedIn Icon */}
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>

              {/* GitHub Icon */}
              <a href="#" className="social-link" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>

            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Watermark & Copyright --- */}
        <div className="footer-bottom">
          <div className="watermark-container">
            <h1 className="footer-watermark">PICSEL CLUB</h1>
          </div>
          
          <div className="copyright-row">
            <p>&copy; {currentYear} Picsel Club KDKCE. All Rights Reserved.</p>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;