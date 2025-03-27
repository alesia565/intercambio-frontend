import React, { useEffect, useState } from 'react';
import '../styles/OfertasRecibidas.css';

const OfertasRecibidas = () => {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/intercambios/recibidos", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setOfertas(data))
      .catch(err => console.error("❌ Error al cargar ofertas:", err));
  }, []);

  const aceptarOferta = (id) => {
    fetch(`http://localhost:5000/api/intercambios/aceptar/${id}`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        alert("¡Oferta aceptada!");
        setOfertas(prev => prev.filter(oferta => oferta.id !== id));
      })
      .catch(err => console.error("❌ Error al aceptar oferta:", err));
  };

  const cancelarOferta = (id) => {
    fetch(`http://localhost:5000/api/intercambios/cancelar/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(() => {
        alert("Oferta cancelada.");
        setOfertas(prev => prev.filter(oferta => oferta.id !== id));
      })
      .catch(err => console.error("❌ Error al cancelar oferta:", err));
  };

  return (
    <div className="ofertas-container">
      <h2 className="title">Ofertas Recibidas</h2>
      {ofertas.length === 0 ? (
        <p className="no-ofertas">No tienes ofertas por el momento.</p>
      ) : (
        <div className="ofertas-list">
          {ofertas.map((oferta) => (
            <div key={oferta.id} className="oferta-card">
              <p><strong>Servicio:</strong> {oferta.servicio.title}</p>
              <p><strong>De:</strong> {oferta.ofertante.name}</p>
              <p><strong>Mensaje:</strong> {oferta.mensaje}</p>

              <div className="oferta-buttons">
                <button onClick={() => aceptarOferta(oferta.id)} className="btn-aceptar">
                  Aceptar
                </button>
                <button onClick={() => cancelarOferta(oferta.id)} className="btn-cancelar">
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfertasRecibidas;