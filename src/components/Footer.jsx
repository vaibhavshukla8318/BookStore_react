import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Footer logo and tagline */}
        <div className="footer-logo">
          <h2>Vaibhav's World</h2>
          <p>Empowering your learning journey.</p>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Footer Social Icons */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2024 Vaibhav's World. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
