import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">HalalSpot</span>
          </Link>
        </div>
        
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>
        
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-menu">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className={({ isActive }) => isActive ? 'active' : ''}>
                Rechercher
              </NavLink>
            </li>
            <li>
              <NavLink to="/trending" className={({ isActive }) => isActive ? 'active' : ''}>
                Tendances
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;