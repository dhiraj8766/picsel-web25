import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ScrambleText from './ScrambleText';
import './Navbar.css';

// A simple chevron icon component for the accordion
const ChevronIcon = ({ isOpen }) => (
    <svg className={`submenu-indicator ${isOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null); // <-- NEW: State for mobile accordion
    const navRef = useRef(null);
    const leaveTimeoutRef = useRef(null);

    const menuItems = [
        { name: "Home", path: "/" },
        { 
            name: "About", 
            path: "/about",
            dropdown: [
                { name: "About Us", path: "/about", description: "Learn about our mission and team." },
                { name: "Contact", path: "/contact", description: "Get in touch with us." },
            ]
        },
        { 
            name: "Events", 
            path: "/events",
            dropdown: [
                { name: "Upcoming Events", path: "/events", description: "See what's next on our calendar." },
                { name: "Successful Events", path: "/xevents", description: "Browse our gallery of past events." },
            ]
        },
        { name: "Team", path: "/team" },
        { name: "Faculty", path: "/faculty" },
    ];
    
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const shouldLockScroll = isDesktop && activeDropdown !== null;
        document.body.style.overflow = shouldLockScroll ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isDesktop, activeDropdown]);

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

    // --- NEW: Function to toggle mobile submenus ---
    const handleSubmenuToggle = (itemName) => {
        setOpenMobileSubmenu(prev => (prev === itemName ? null : itemName));
    };

    useEffect(() => {
        if (!isMenuOpen) {
            setActiveDropdown(null);
            setOpenMobileSubmenu(null); // Reset submenu on main menu close
        }
    }, [isMenuOpen]);
    
    const currentDropdownData = menuItems.find(item => item.name === activeDropdown)?.dropdown;

    return (
        <header className={`navbar-header ${isMenuOpen ? 'menu-is-open' : ''}`} ref={navRef}>
            <div className="navbar-container">
                <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
                    <span className="logo-main">PICSEL</span>
                    <span className="logo-sub">KDKCE</span>
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

            {/* --- vvvv MOBILE MENU LOGIC UPDATED vvvv --- */}
            {isMenuOpen && <div className="nav-mobile-backdrop" onClick={toggleMenu}></div>}
            
            <div className="nav-mobile-menu">
                <div className="nav-mobile-header">
                     <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
                         <span className="logo-main">PICSEL</span>
                         <span className="logo-sub">KDKCE</span>
                     </Link>
                    <button className="nav-mobile-close-btn" onClick={toggleMenu} aria-label="Close menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                </div>
                <ul className="nav-links-mobile">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            {item.dropdown ? (
                                <>
                                    <div className="mobile-menu-trigger" onClick={() => handleSubmenuToggle(item.name)}>
                                        <span>{item.name}</span>
                                        <ChevronIcon isOpen={openMobileSubmenu === item.name} />
                                    </div>
                                    <ul className={`mobile-submenu ${openMobileSubmenu === item.name ? 'open' : ''}`}>
                                        {item.dropdown.map((subItem) => (
                                            <li key={subItem.name}>
                                                <NavLink to={subItem.path} onClick={toggleMenu}>
                                                    {subItem.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <NavLink to={item.path} end onClick={toggleMenu}>{item.name}</NavLink>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
             {/* --- ^^^^ MOBILE MENU LOGIC UPDATED ^^^^ --- */}

        </header>
    );
};

export default Navbar;