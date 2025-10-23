import React from 'react';
import TarjetaJuego from '../TarjetaJuego/TarjetaJuego';
import './BibliotecaJuegos.css';

const BibliotecaJuegos = ({ 
  juegos, 
  onEliminar, 
  onEditar, 
  onVerReseñas, 
  onAgregarReseña 
}) => {
  return (
    <div className="biblioteca-container">
      <div className="biblioteca-header">
        <h2>Mi Biblioteca ({juegos.length} juegos)</h2>
        <div className="estadisticas-rapidas">
          <span className="estadistica">
            ✅ {juegos.filter(j => j.completado).length} completados
          </span>
          <span className="estadistica">
            🎯 {juegos.filter(j => !j.completado).length} por jugar
          </span>
          <span className="estadistica">
            📝 {juegos.reduce((total, j) => total + (j.reseñas?.length || 0), 0)} reseñas
          </span>
        </div>
      </div>
      
      <div className="juegos-grid">
        {juegos.length > 0 ? (
          juegos.map(juego => (
            <TarjetaJuego 
              key={juego._id} 
              juego={juego} 
              onEliminar={onEliminar}
              onEditar={onEditar}
              onVerReseñas={onVerReseñas}
              onAgregarReseña={onAgregarReseña}
            />
          ))
        ) : (
          <div className="sin-juegos">
            <h3>🎮 Tu biblioteca está vacía</h3>
            <p>¡Agrega tu primer juego usando el formulario arriba!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BibliotecaJuegos;