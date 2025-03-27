import React, { useEffect, useState } from 'react';
import '../styles/Notificaciones.css';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/notificaciones", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log("🔔 Notificaciones recibidas:", data);  
        setNotificaciones(data);
      })
      .catch(err => console.error("❌ Error cargando notificaciones:", err));
  }, []);

  return (
    <div className="notificaciones-container">
      <h2>Notificaciones</h2>
      {notificaciones.length === 0 ? (
        <p>No tienes notificaciones aún.</p>
      ) : (
        <ul>
          {notificaciones.map(noti => (
            <li key={noti.id} className={noti.leido ? 'leida' : 'nueva'}>
              <p>{noti.mensaje}</p>
              <small>{new Date(noti.fecha).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notificaciones;