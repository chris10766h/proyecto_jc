import React from 'react';
import './TarjetaJuego.css';

const TarjetaJuego = ({ juego, onEliminar, onEditar, onVerReseñas, onAgregarReseña }) => {
  return (
    <div className="tarjeta-juego">
      <div className="portada-container">
        <img 
          src={juego.imagenPortada} 
          alt={juego.titulo}
          className="portada"
        />
        <span className={`estado ${juego.completado ? 'completado' : 'pendiente'}`}>
          {juego.completado ? '✅ Completado' : '🎯 Por jugar'}
        </span>
      </div>
      
      <div className="info-juego">
        <h3 className="titulo">{juego.titulo}</h3>
        <p className="detalles">
          {juego.genero} • {juego.plataforma}
        </p>
        <p className="desarrollador">{juego.desarrollador}</p>
        <p className="año">Año: {juego.añoLanzamiento}</p>
        
        
        <div className="info-reseñas">
          <span className="contador-reseñas">
            📝 {juego.reseñas?.length || 0} reseñas
          </span>
          {juego.reseñas?.length > 0 && (
            <span className="puntuacion-promedio">
              ⭐ {(
                juego.reseñas.reduce((sum, reseña) => sum + reseña.puntuacion, 0) / 
                juego.reseñas.length
              ).toFixed(1)}
            </span>
          )}
        </div>
        
       
        <div className="acciones-tarjeta">
          <button 
            className="btn-reseñas"
            onClick={() => onVerReseñas(juego)}
          >
            👁️ Ver Reseñas
          </button>
          
          <button 
            className="btn-reseña-agregar"
            onClick={() => onAgregarReseña(juego)}
          >
            ⭐ Escribir Reseña
          </button>
          
          <button 
            className="btn-editar"
            onClick={() => onEditar(juego)}
          >
            ✏️ Editar
          </button>
          
          <button 
            className="btn-eliminar"
            onClick={() => onEliminar(juego._id)}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaJuego;