import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarServicio = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    exchangeTerms: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/services`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('No se pudo obtener el servicio');
        return res.json();
      })
      .then(data => {
        const servicio = data.find(s => s.id === parseInt(id));
        if (servicio) {
          setFormData({
            title: servicio.title,
            description: servicio.description,
            category: servicio.category,
            location: servicio.location || '',
            exchangeTerms: servicio.exchange_terms || '',
          });
        } else {
          setError('Servicio no encontrado');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar el servicio');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al actualizar el servicio');
        return res.json();
      })
      .then(data => {
        alert(data.message || 'Servicio actualizado');
        navigate('/servicios');
      })
      .catch(err => {
        console.error(err);
        alert('Error al actualizar el servicio');
      });
  };

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="editar-servicio">
      <h2>Editar Servicio</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="Música">Música</option>
          <option value="Educación">Educación</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Otro">Otro</option>
        </select>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Ubicación"
        />
        <input
          name="exchangeTerms"
          value={formData.exchangeTerms}
          onChange={handleChange}
          placeholder="Condiciones del intercambio"
          required
        />
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarServicio;