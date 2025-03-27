import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DetalleServicio.css';

const DetalleServicio = () => {
  const { id } = useParams();
  const [servicio, setServicio] = useState(null);
  const [oferta, setOferta] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/services/${id}`)
      .then(res => res.json())
      .then(data => setServicio(data))
      .catch(err => console.error('❌ Error al obtener servicio:', err));
  }, [id]);

  const handleEnviarOferta = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/intercambios`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        servicio_id: id,
        mensaje: oferta
      })
    })
      .then(res => res.json())
      .then(data => {
        setMensaje("¡Oferta enviada con éxito!");
        setOferta('');
      })
      .catch(err => {
        console.error("❌ Error al enviar oferta:", err);
        setMensaje("Error al enviar la oferta");
      });
  };

  if (!servicio) {
    return <div className="detalle-container">Cargando servicio...</div>;
  }

  return (
    <div className="detalle-container">
      <h2>{servicio.title}</h2>
      {servicio.image && (
        <img
          src={`http://localhost:5000/uploads/${servicio.image}`}
          alt={servicio.title}
          className="detalle-imagen"
        />
      )}
      <p><strong>Descripción:</strong> {servicio.description}</p>
      <p><strong>Categoría:</strong> {servicio.category}</p>
      <p><strong>Ubicación:</strong> {servicio.location}</p>
      <p><strong>Términos de intercambio:</strong> {servicio.exchange_terms}</p>

      <h3>Ofrecer un servicio a cambio</h3>
      <form onSubmit={handleEnviarOferta} className="formulario-oferta">
        <textarea
          value={oferta}
          onChange={(e) => setOferta(e.target.value)}
          placeholder="Escribe aquí tu propuesta..."
          required
        ></textarea>
        <button type="submit">Enviar oferta</button>
      </form>

      {mensaje && <p className="mensaje-oferta">{mensaje}</p>}
    </div>
  );
};

export default DetalleServicio;