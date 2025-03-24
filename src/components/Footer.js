import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  console.log("✅ Footer se está renderizando...");

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="copyright">&copy; {new Date().getFullYear()} InterX. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;