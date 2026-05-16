'use client';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <a href="/" className="nav-logo">AM.</a>
        
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          {isOpen && (
            <li style={{ position: 'absolute', top: '2rem', right: '2rem' }}>
              <button className="nav-toggle" onClick={() => setIsOpen(false)}>✕</button>
            </li>
          )}
          <li><a href="#about" className="nav-link" onClick={handleLinkClick}>About</a></li>
          <li><a href="#experience" className="nav-link" onClick={handleLinkClick}>Experience</a></li>
          <li><a href="#skills" className="nav-link" onClick={handleLinkClick}>Skills</a></li>
          <li><a href="#personal" className="nav-link" onClick={handleLinkClick}>Personal</a></li>
          <li><a href="#testimonials" className="nav-link" onClick={handleLinkClick}>Testimonials</a></li>
          <li><a href="mailto:arnab.apps96@gmail.com" className="nav-contact" onClick={handleLinkClick}>Contact</a></li>
        </ul>
      </div>
      
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}
    </nav>
  );
}
