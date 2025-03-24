import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Servicios.css';


const Servicios = () => {
  const [services, setServices] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica la sesión del usuario
    fetch('http://localhost:5000/check-session', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setUserId(data.user_id);
        }
      });

    // Carga los servicios
    fetch('http://localhost:5000/api/services', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // Eliminar un servicio
  const handleDelete = (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) return;

    fetch(`http://localhost:5000/api/services/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          setServices(services.filter(service => service.id !== id));
        } else {
          alert('No se pudo eliminar el servicio');
        }
      })
      .catch(error => console.error('Error al eliminar:', error));
  };

  return (
    <div className="services-container">
      <h2 className="title">Nuestros Servicios</h2>
      <div className="service-list">
        {services.length === 0 ? (
          <p className="no-services">No hay servicios disponibles en este momento.</p>
        ) : (
          services.map(service => (
            <div key={service.id} className="service-card">
              {service.image && (
                <img
                  src={`http://localhost:5000/uploads/${service.image}`}
                  alt={service.title}
                  className="service-image"
                />
              )}
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.user_id === userId && (
                <div className="buttons">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/editar-servicio/${service.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(service.id)}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Servicios;
