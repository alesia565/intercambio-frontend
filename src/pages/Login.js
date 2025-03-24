import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Credenciales incorrectas");
        }
        return response.json();
      })
      .then((data) => {
        if (data.user) {
          // 🔹 Guardamos el usuario y el token en localStorage correctamente
          localStorage.setItem("token", data.token || ""); 
          localStorage.setItem("user", JSON.stringify(data.user)); 
          
          setUser(data.user); // ✅ Actualiza el estado global del usuario
          setSuccess("Inicio de sesión exitoso 🎉");
          setError("");

          // 🔹 Redirigir automáticamente al perfil después de 1s
          setTimeout(() => {
            navigate("/perfil");
          }, 1000);
        } else {
          throw new Error("Error al obtener datos del usuario.");
        }
      })
      .catch((error) => {
        setError(error.message || "Error al iniciar sesión");
        setSuccess("");
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Correo Electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ejemplo@correo.com" required />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" required />
          </div>

          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;