import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import PublicarServicio from './pages/PublicarServicio';
import Servicios from './pages/Servicios';
import EditarServicio from './pages/EditarServicio';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // ✅ Ahora obtenemos un objeto completo
    } else {
      fetch("http://localhost:5000/check-session", {
        method: "GET",
        credentials: "include",
      })
      .then(response => response.json())
      .then(data => {
        if (data.authenticated) {
          setUser({ id: data.user_id }); // Al menos asignamos un objeto
        }
      })
      .catch(error => console.error("Error:", error));
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <NavBar user={user} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home setUser={setUser} />} />
            <Route path="/home" element={<Home setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil" element={<Perfil user={user} setUser={setUser} />} />
            <Route path="/publicar-servicio" element={<PublicarServicio />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/editar-servicio/:id" element={<EditarServicio />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
