import React, { useState, useEffect } from "react";
import "../styles/Perfil.css";

const Perfil = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [services, setServices] = useState([]);

  // 🔹 Obtener usuario desde props o localStorage
  useEffect(() => {
    let storedUser = user || JSON.parse(localStorage.getItem("user") || "{}");
  
    if (!storedUser.id) {
      console.error("❌ No se encontró un usuario válido");
      setLoading(false);
      return;
    }

    if (storedUser && storedUser.id) {
      console.log("🔹 Cargando perfil del usuario ID:", storedUser.id);

      fetch(`http://localhost:5000/profile/${storedUser.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener perfil");
          }
          return response.json();
        })
        .then((data) => {
          setProfile(data);
          setName(data.name || "Sin nombre");
          setDescription(data.description || "Sin descripción");
          setServices(data.services || []);
        })
        .catch((error) => {
          console.error("❌ Error al cargar perfil:", error);
        })
        .finally(() => setLoading(false));
    } else {
      console.error("❌ No se encontró un usuario válido");
      setLoading(false);
    }
  }, [user]);

  // 🔹 Actualizar perfil
  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    fetch(`http://localhost:5000/profile/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        setEditing(false);
      })
      .catch((error) => console.error("❌ Error al actualizar perfil:", error));
  };

  // 🔹 Si el usuario no está autenticado
  if (!profile) {
    return (
      <div className="no-auth">
        No estás autenticado. <a href="/login">Inicia sesión</a>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>

      {loading ? (
        <p className="loading">Cargando perfil...</p>
      ) : profile ? (
        <div className="profile-box">
          <div className="profile-header">
            <img
              src={profile.image || "https://via.placeholder.com/150"}
              alt="Perfil"
              className="profile-image"
            />
            <h3>{profile.name}</h3>
            <p>{profile.description}</p>
            <button onClick={() => setEditing(!editing)} className="edit-button">
              {editing ? "Cancelar" : "Editar Perfil"}
            </button>
          </div>

          {editing && (
            <form onSubmit={handleUpdate} className="edit-form">
              <label>Nombre</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

              <label>Descripción</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

              <label>Imagen de Perfil</label>
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />

              <button type="submit" className="save-button">Guardar Cambios</button>
            </form>
          )}

          <h3>Servicios Publicados</h3>
          <ul className="services-list">
            {services.length > 0 ? (
              services.map((service) => (
                <li key={service.id}>
                  <p><strong>{service.title}</strong></p>
                  <p>{service.description}</p>
                </li>
              ))
            ) : (
              <p>No has publicado ningún servicio aún.</p>
            )}
          </ul>
        </div>
      ) : (
        <p className="error">Error al cargar perfil.</p>
      )}
    </div>
  );
};

export default Perfil;