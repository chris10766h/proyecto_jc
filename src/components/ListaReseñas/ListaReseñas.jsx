import React from 'react';
import './ListaReseñas.css';

const ListaReseñas = ({ reseñas, onCerrar }) => {

  const renderEstrellas = (puntuacion) => {
    return '⭐'.repeat(puntuacion) + '☆'.repeat(5 - puntuacion);
  };

  return (
    <div className="modal-reseñas">
      <div className="modal-contenido">
        <div className="modal-header">
          <h3>📝 Reseñas del Juego</h3>
          <button className="btn-cerrar" onClick={onCerrar}>✕</button>
        </div>
        
        <div className="lista-reseñas">
          {reseñas && reseñas.length > 0 ? (
            reseñas.map((reseña, index) => (
              <div key={index} className="reseña-item">
                <div className="reseña-header">
                  <div className="puntuacion">
                    {renderEstrellas(reseña.puntuacion)}
                    <span className="puntuacion-numero">({reseña.puntuacion}/5)</span>
                  </div>
                  <div className="reseña-meta">
                    <span className="horas">⏱️ {reseña.horasJugadas} horas</span>
                    <span className={`dificultad ${reseña.dificultad?.toLowerCase()}`}>
                      {reseña.dificultad}
                    </span>
                  </div>
                </div>
                
                <p className="texto-reseña">{reseña.textoReseña}</p>
                
                <div className="reseña-footer">
                  <span className={`recomendacion ${reseña.recomendaria ? 'si' : 'no'}`}>
                    {reseña.recomendaria ? '👍 Lo recomiendo' : '👎 No lo recomiendo'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="sin-reseñas">
              <p>🎮 Aún no hay reseñas para este juego</p>
              <p>¡Sé el primero en escribir una!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaReseñas;