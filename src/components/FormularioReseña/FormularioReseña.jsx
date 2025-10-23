import React, { useState } from 'react';
import './FormularioReseña.css';

const FormularioReseña = ({ juego, onAgregarReseña, onCerrar }) => {
  const [formData, setFormData] = useState({
    puntuacion: 0,
    textoReseña: '',
    horasJugadas: 0,
    dificultad: 'Normal',
    recomendaria: true
  });

  const [estrellasTemporal, setEstrellasTemporal] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePuntuacion = (puntos) => {
    setFormData(prevState => ({
      ...prevState,
      puntuacion: puntos
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.puntuacion > 0 && formData.textoReseña.trim()) {
      onAgregarReseña({
        ...formData,
        horasJugadas: parseInt(formData.horasJugadas) || 0,
        fechaCreacion: new Date().toISOString()
      });
      
      setFormData({
        puntuacion: 0,
        textoReseña: '',
        horasJugadas: 0,
        dificultad: 'Normal',
        recomendaria: true
      });
      
      alert('¡Reseña agregada exitosamente! ⭐');
    } else {
      alert('Por favor completa la puntuación y el comentario');
    }
  };

  const renderEstrellas = (puntuacion, temporal = false) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(
        <span
          key={i}
          className={`estrella ${i <= puntuacion ? 'activa' : ''} ${temporal ? 'temporal' : ''}`}
          onClick={() => handlePuntuacion(i)}
          onMouseEnter={() => temporal && setEstrellasTemporal(i)}
          onMouseLeave={() => temporal && setEstrellasTemporal(0)}
        >
          {i <= puntuacion ? '⭐' : '☆'}
        </span>
      );
    }
    return estrellas;
  };

  return (
    <div className="modal-reseña">
      <div className="modal-contenido">
        <div className="modal-header">
          <h3>⭐ Escribir Reseña</h3>
          <button className="btn-cerrar" onClick={onCerrar}>✕</button>
        </div>

        <div className="info-juego-reseña">
          <h4>{juego?.titulo}</h4>
          <p>{juego?.genero} • {juego?.plataforma}</p>
        </div>

        <form onSubmit={handleSubmit} className="formulario-reseña">
 
          <div className="campo">
            <label>Puntuación *</label>
            <div className="estrellas-container">
              <div 
                className="estrellas"
                onMouseLeave={() => setEstrellasTemporal(0)}
              >
                {renderEstrellas(estrellasTemporal || formData.puntuacion, true)}
              </div>
              <span className="puntuacion-texto">
                {formData.puntuacion > 0 ? `(${formData.puntuacion}/5 estrellas)` : 'Selecciona las estrellas'}
              </span>
            </div>
          </div>

          <div className="campo">
            <label>Tu Reseña *</label>
            <textarea
              name="textoReseña"
              value={formData.textoReseña}
              onChange={handleChange}
              placeholder="Comparte tu experiencia con este juego..."
              rows="4"
              required
            />
          </div>

          <div className="campo-doble">
            <div className="campo">
              <label>Horas Jugadas</label>
              <input
                type="number"
                name="horasJugadas"
                value={formData.horasJugadas}
                onChange={handleChange}
                min="0"
                max="1000"
                placeholder="0"
              />
            </div>

            <div className="campo">
              <label>Dificultad</label>
              <select 
                name="dificultad" 
                value={formData.dificultad} 
                onChange={handleChange}
              >
                <option value="Fácil">Fácil</option>
                <option value="Normal">Normal</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>
          </div>

          <div className="campo-checkbox">
            <label>
              <input
                type="checkbox"
                name="recomendaria"
                checked={formData.recomendaria}
                onChange={handleChange}
              />
              ¿Recomendarías este juego?
            </label>
          </div>

          <div className="acciones-formulario">
            <button 
              type="button" 
              className="btn-cancelar"
              onClick={onCerrar}
            >
              ❌ Cancelar
            </button>
            
            <button type="submit" className="btn-enviar">
              ⭐ Publicar Reseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioReseña;