import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [description, setDescription] = useState('');

  // Usamos useEffect para cargar los datos del usuario al montar el componente
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userEmail = decoded.email;
        setEmail(userEmail);

        const storedPic = localStorage.getItem(`profilePic-${userEmail}`);
        if (storedPic) {
          setProfilePic(storedPic);
        }

        fetch(`http://50.17.170.185:4565/get-description?email=${userEmail}`)
          .then((res) => res.json())
          .then((data) => {
            setDescription(data.description || 'Sin descripción');
          })
          .catch((err) => console.error('Error al cargar descripción:', err));
      } catch (err) {
        console.error('Token inválido');
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToSettings = () => {
    navigate('/settings');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = `profile_pics/${Date.now()}-${file.name}`;
    const s3URL = `https://chatapp-profile-photos-kamartinez.s3.amazonaws.com/${fileName}`;

    try {
      await fetch(s3URL, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file
      });
      setProfilePic(s3URL);
      localStorage.setItem(`profilePic-${email}`, s3URL);
    } catch (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al subir la imagen');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <button onClick={goToSettings} className="header-button">Configuraciones</button>
        <button onClick={handleLogout} className="header-button">Cerrar sesión</button>
      </div>

      {/* Foto de perfil en una esquina */}
      <div className="profile-container">
        <div className="profile-picture-container">
          {profilePic ? (
            <img src={profilePic} alt="Perfil" className="profile-picture" />
          ) : (
            <span className="profile-placeholder">Foto</span>
          )}
        </div>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
        <p className="dashboard-email">{email}</p>
        <p className="user-description">{description}</p>
      </div>

      {/* Botones */}
      <div className="dashboard-actions">
        <button onClick={goToSettings} className="action-button">Configuraciones</button>
        <button onClick={handleLogout} className="action-button">Cerrar sesión</button>
      </div>
    </div>
  );
}

export default Dashboard;
