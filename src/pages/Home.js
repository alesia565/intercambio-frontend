import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';

const logo = "/interx-logo.png";

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url('/fondo-moderno.jpg')` }}>
      {/* Logo con animación de entrada */}
      <motion.img 
        src={logo} 
        alt="InterX Logo" 
        className="logo"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      />

      {/* Contenido con efectos de entrada */}
      <motion.div 
        className="home-content" 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1.2 }}
      >
        <h1><span className="green-letter">B</span>ienvenido al Inter<span className="green-letter">X</span></h1>
        <p className="tagline">Intercambio de servicios de manera rápida y segura</p>
        <p>Conecta con expertos y ofrece tus habilidades de manera sencilla.</p>

        {/* Botones con animación */}
        <div className="cta-buttons">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/register" className="cta-button">Únete Ahora</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/servicios" className="cta-button">Explorar Servicios</Link>
          </motion.div>
        </div>

        {/* Sección de características con animaciones de aparición */}
        <div className="features">
          <motion.div className="feature" whileHover={{ scale: 1.05 }} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <h3>Encuentra Profesionales</h3>
            <p>Accede a una red confiable de expertos en diferentes áreas.</p>
          </motion.div>
          <motion.div className="feature" whileHover={{ scale: 1.05 }} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <h3>Publica tu Servicio</h3>
            <p>Expón tus habilidades y encuentra clientes sin complicaciones.</p>
          </motion.div>
          <motion.div className="feature" whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h3>Seguridad y Confianza</h3>
            <p>Plataforma verificada para conectar con profesionales de calidad.</p>
          </motion.div>
        </div>

        {/* Sección de servicios populares con efecto slider */}
        <div className="services-preview">
          <h3>Servicios Populares</h3>
          <motion.div className="services-list" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <motion.div className="service-card" whileHover={{ scale: 1.05 }}>
              <h4>Diseño Web</h4>
              <p>Diseño moderno e innovador para tu negocio.</p>
            </motion.div>
            <motion.div className="service-card" whileHover={{ scale: 1.05 }}>
              <h4>Clases de Inglés</h4>
              <p>Aprende inglés con expertos en enseñanza.</p>
            </motion.div>
            <motion.div className="service-card" whileHover={{ scale: 1.05 }}>
              <h4>Reparación de Ordenadores</h4>
              <p>Soluciones rápidas y efectivas para tu equipo.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
