import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // Will store 'Events' or 'About'
    const navLinksRef = useRef(null);
    const bubbleRef = useRef(null);

    const menuItems = [
        { name: "Home", path: "/" },
        { name: "Events", path: "/events",
          dropdown: [
            { name: "Upcoming Events", path: "/events/upcoming" },
            { name: "Successful Events", path: "/events/successful" }
          ]
        },
        { name: "About", path: "/about",
          dropdown: [
            { name: "About Us", path: "/about" },
            { name: "Learn More", path: "/about/learn-more" },
            { name: "Contact", path: "/contact" }
          ]
        },
        { name: "Team", path: "/team" },
    ];

    const handleLinkHover = (e) => {
        if (!bubbleRef.current) return;
        const { offsetLeft, offsetWidth } = e.currentTarget;
        bubbleRef.current.style.setProperty('--bubble-left', `${offsetLeft}px`);
        bubbleRef.current.style.setProperty('--bubble-width', `${offsetWidth}px`);
        bubbleRef.current.style.opacity = '1';
    };

    const resetBubble = () => {
        if (!navLinksRef.current || !bubbleRef.current) return;
        const activeLink = navLinksRef.current.querySelector('a.active');
        if (activeLink) {
            const { offsetLeft, offsetWidth } = activeLink.parentElement;
            bubbleRef.current.style.setProperty('--bubble-left', `${offsetLeft}px`);
            bubbleRef.current.style.setProperty('--bubble-width', `${offsetWidth}px`);
            bubbleRef.current.style.opacity = '1';
        } else {
             bubbleRef.current.style.opacity = '0';
        }
    };
    
    // Position bubble when nav opens
    useEffect(() => {
        if (isNavOpen) {
            const timer = setTimeout(resetBubble, 50);
            return () => clearTimeout(timer);
        }
    }, [isNavOpen]);

    const handleWrapperMouseLeave = () => {
        setIsNavOpen(false);
        setOpenDropdown(null);
    }
    
    // Find the content for the currently open dropdown
    const currentDropdownContent = menuItems.find(item => item.name === openDropdown)?.dropdown || [];

    return (
        <div 
            className="navbar-wrapper"
            onMouseEnter={() => setIsNavOpen(true)}
            onMouseLeave={handleWrapperMouseLeave}
        >
            <nav className={`navbar-container ${isNavOpen ? 'open' : ''}`}>
                <Link to="/" className="nav-logo">
                    PICSEL
                </Link>
                <ul className="nav-links" ref={navLinksRef} onMouseLeave={resetBubble}>
                    <div className="nav-bubble" ref={bubbleRef}></div>
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            onMouseEnter={(e) => {
                                handleLinkHover(e);
                                setOpenDropdown(item.dropdown ? item.name : null);
                            }}
                        >
                            <NavLink to={item.path} end>
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* Dropdown panel is now outside the nav bar for centered positioning */}
            <div className={`dropdown-panel ${openDropdown ? 'visible' : ''}`}>
                {currentDropdownContent.map((dropdownItem) => (
                    <Link to={dropdownItem.path} key={dropdownItem.name} className="dropdown-link">
                        {dropdownItem.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Navbar;