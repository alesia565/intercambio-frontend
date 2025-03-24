import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Intercambio de Servicios</div>
      <div className="navbar-container">
        <Link to="/home" className="logo2">
          Inter<span>X</span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/publicar-servicio">Publicar Servicio</Link></li>
          <li><Link to="/servicios">Servicios</Link></li>
          <li><Link to="/perfil">Perfil</Link></li>
          <li><Link to="/register">Registro</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;