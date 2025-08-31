import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ScrambleText from './ScrambleText';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // State to track viewport size
    const navRef = useRef(null);
    const leaveTimeoutRef = useRef(null);

    const menuItems = [
        { name: "Home", path: "/" },
        { 
            name: "About", 
            path: "/about",
            dropdown: [
                { name: "About Us", path: "/about-us", description: "Learn about our mission and team." },
                { name: "Contact", path: "/contact", description: "Get in touch with us." },
                { name: "Learn More", path: "/learn-more", description: "Explore our detailed resources." },
            ]
        },
        { 
            name: "Events", 
            path: "/events",
            dropdown: [
                { name: "Upcoming Events", path: "/events/upcoming", description: "See what's next on our calendar." },
                { name: "Successful Events", path: "/events/successful", description: "Browse our gallery of past events." },
            ]
        },
        { name: "Team", path: "/team" },
    ];
    
    // --- NEW: Effect to check screen size ---
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- NEW: Smarter scroll-lock effect ---
    useEffect(() => {
        // Only lock scroll if we are on a desktop AND a dropdown is active
        const shouldLockScroll = isDesktop && activeDropdown !== null;

        if (shouldLockScroll) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup function to ensure scrolling is re-enabled
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isDesktop, activeDropdown]); // This effect runs when the view changes or a dropdown opens/closes


    const handleMouseEnter = (itemName) => {
        clearTimeout(leaveTimeoutRef.current);
        const item = menuItems.find(i => i.name === itemName);
        if (item && item.dropdown) {
            setActiveDropdown(itemName);
        } else {
             setActiveDropdown(null);
        }
    };
    
    const handleMouseLeave = () => {
        leaveTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 200);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    useEffect(() => {
        if (!isMenuOpen) setActiveDropdown(null);
    }, [isMenuOpen]);
    
    const currentDropdownData = menuItems.find(item => item.name === activeDropdown)?.dropdown;

    return (
        <header className={`navbar-header ${isMenuOpen ? 'menu-is-open' : ''}`} ref={navRef}>
            <div className="navbar-container">
                <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
                    <span className="logo-main">PICSEL</span>
                    <span className="logo-sub">CLUB</span>
                </Link>

                <nav className="nav-desktop" onMouseLeave={handleMouseLeave}>
                    <button className="menu-toggle-btn" onClick={toggleMenu} aria-expanded={isMenuOpen} aria-label="Open menu">
                        MENU
                    </button>
                    <ul className="nav-links-desktop">
                        {menuItems.map((item) => (
                            <li key={item.name} onMouseEnter={() => handleMouseEnter(item.name)}>
                                <NavLink to={item.path} end>
                                    <ScrambleText>{item.name}</ScrambleText>
                                </NavLink>
                            </li>
                        ))}
                        <li>
                            <button className="nav-close-btn" onClick={toggleMenu} aria-label="Close menu">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className="nav-right">
                    <button className="hamburger-btn" onClick={toggleMenu} aria-label="Open menu" aria-expanded={isMenuOpen}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                </div>
            </div>
            
            <div className={`dropdown-panel ${activeDropdown ? 'visible' : ''}`} onMouseEnter={() => clearTimeout(leaveTimeoutRef.current)} onMouseLeave={handleMouseLeave}>
                {currentDropdownData && (
                    <div className="dropdown-content">
                        <h3>{activeDropdown}</h3>
                        <div className="dropdown-links-grid">
                            {currentDropdownData.map((item, index) => (
                                <Link to={item.path} key={index} className="dropdown-link">
                                    <span className="dropdown-link-title">{item.name}</span>
                                    <span className="dropdown-link-desc">{item.description}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="nav-mobile-overlay">
                <div className="nav-mobile-header">
                     <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
                        <span className="logo-main">PICSEL</span>
                        <span className="logo-sub">CLUB</span>
                    </Link>
                    <button className="nav-mobile-close-btn" onClick={toggleMenu} aria-label="Close menu">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                </div>
                <ul className="nav-links-mobile">
                     {menuItems.map((item, index) => (
                        <li key={item.name} style={{ transitionDelay: `${0.15 + index * 0.05}s` }}>
                            <NavLink to={item.path} end onClick={toggleMenu}>{item.name}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;