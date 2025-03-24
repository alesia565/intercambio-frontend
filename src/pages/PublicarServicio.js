import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/PublicarServicio.css"; 

const PublicarServicio = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
    location: "",
    exchangeTerms: "",
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/check-session", {
      method: "GET",
      credentials: "include",
    })
      .then(response => response.json())
      .then(data => {
        if (data.authenticated) {
          setUser(data.user);
        } else {
          alert("Debes iniciar sesión para publicar un servicio");
          navigate("/login");
        }
      })
      .catch(error => {
        console.error("Error verificando sesión:", error);
        alert("Error de conexión con el servidor.");
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        credentials: "include",
        body: data,
      });

      if (response.ok) {
        alert("Servicio publicado con éxito");
        setFormData({
          title: "",
          description: "",
          category: "",
          image: null,
          location: "",
          exchangeTerms: "",
        });
        navigate("/servicios");
      } else {
        const errorData = await response.json();
        alert("Error al publicar: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al conectar con el servidor");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>📢 Publica tu Servicio</h2>
        <form onSubmit={handleSubmit}>
          <label>Título</label>
          <input type="text" name="title" placeholder="Ej: Clases de Guitarra" value={formData.title} onChange={handleChange} required />

          <label>Descripción</label>
          <textarea name="description" placeholder="Describe tu servicio..." value={formData.description} onChange={handleChange} required />

          <label>Categoría</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Selecciona una categoría</option>
            <option value="Música">Música</option>
            <option value="Educación">Educación</option>
            <option value="Tecnología">Tecnología</option>
          </select>

          <label>Imagen</label>
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />

          <label>Ubicación (opcional)</label>
          <input type="text" name="location" placeholder="Ej: Ciudad, País" value={formData.location} onChange={handleChange} />

          <label>Condiciones de Intercambio</label>
          <input type="text" name="exchangeTerms" placeholder="Ej: Intercambio por clases de cocina" value={formData.exchangeTerms} onChange={handleChange} required />

          <button type="submit">🚀 Publicar Servicio</button>
        </form>
      </div>
    </div>
  );
};

export default PublicarServicio;