import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {

const [notificaciones, setNotificaciones] = useState([]);
const cantidadNoLeidas = notificaciones.filter(n => !n.leido).length;


useEffect(() => {
  fetch("http://localhost:5000/api/notificaciones", {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => setNotificaciones(data))
    .catch(err => console.error("Error al cargar notificaciones:", err));
}, []);


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
          <NavLink 
          to="/notificaciones" 
          className={cantidadNoLeidas > 0 ? "noti-alerta" : ""}
          >
            + {cantidadNoLeidas > 0 ? `(${cantidadNoLeidas})` : ""}
            </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;