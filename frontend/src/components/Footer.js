import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>HalalSpot</h3>
          <p>Découvrez les meilleurs restaurants halal en France</p>
        </div>
        
        <div className="footer-section">
          <h3>Navigation</h3>
          <ul className="footer-links">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/search">Recherche</Link></li>
            <li><Link to="/trending">Tendances</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Nous contacter</h3>
          <ul className="footer-links">
            <li><a href="mailto:contact@halalspot.fr">contact@halalspot.fr</a></li>
            <li><a href="https://www.instagram.com/halalspot" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@halalspot" target="_blank" rel="noopener noreferrer">TikTok</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Légal</h3>
          <ul className="footer-links">
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
            <li><Link to="/confidentialite">Politique de confidentialité</Link></li>
            <li><Link to="/conditions-utilisation">Conditions d'utilisation</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HalalSpot. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;