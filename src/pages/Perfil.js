import React, { useState, useEffect } from "react";
import "../styles/Perfil.css";
import { useNavigate } from "react-router-dom";

const Perfil = ({ user }) => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const storedUser = user || JSON.parse(localStorage.getItem("user") || "{}");

    if (!storedUser.id) {
      console.error("❌ No se encontró un usuario válido");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/profile/${storedUser.id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener perfil");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setName(data.name || "Sin nombre");
        setDescription(data.description || "Sin descripción");
        setServices(data.services || []);
      })
      .catch((err) => console.error("❌ Error al cargar perfil:", err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    fetch(`http://localhost:5000/profile/update`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setEditing(false);
      })
      .catch((err) => console.error("❌ Error al actualizar perfil:", err));
  };

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((err) => console.error("❌ Error al cerrar sesión:", err));
  };

  if (!profile && !loading) {
    return (
      <div className="no-auth">
        No estás autenticado. <a href="/login">Inicia sesión</a>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2 className="title">Perfil de Usuario</h2>

      {loading ? (
        <p className="loading">Cargando perfil...</p>
      ) : (
        <div className="profile-box">
          <div className="profile-header">
            <img
              src={
                profile.image
                  ? `http://localhost:5000${profile.image}`
                  : "https://via.placeholder.com/150"
              }
              alt="Perfil"
              className="profile-img"
            />
            <h3>{profile.name}</h3>
            <p className="description">{profile.description}</p>
            <div className="action-buttons">
              <button onClick={() => setEditing(!editing)}>
                {editing ? "Cancelar" : "Editar Perfil"}
              </button>
              <button onClick={handleLogout}>Cerrar sesión</button>
              <button onClick={() => navigate("/ofertas-recibidas")}>Mis Ofertas</button>
            </div>
          </div>

          {editing && (
            <form onSubmit={handleUpdate} className="edit-form">
              <label>Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label>Imagen de Perfil</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <button type="submit">Guardar Cambios</button>
            </form>
          )}

          <h3 className="section-title">Mis Servicios Publicados</h3>
          <div className="services-list">
            {services.length > 0 ? (
              services.map((service) => (
                <div className="service-card" key={service.id}>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                </div>
              ))
            ) : (
              <p>No has publicado ningún servicio aún.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;