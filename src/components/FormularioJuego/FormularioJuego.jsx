import React, { useState, useEffect } from 'react';
import './FormularioJuego.css';

const FormularioJuego = ({ 
  onAgregarJuego, 
  juegoEditando, 
  onActualizarJuego, 
  onCancelarEdicion 
}) => {
  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    añoLanzamiento: '',
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
    completado: false
  });

  useEffect(() => {
    if (juegoEditando) {
      setFormData({
        titulo: juegoEditando.titulo,
        genero: juegoEditando.genero,
        plataforma: juegoEditando.plataforma,
        añoLanzamiento: juegoEditando.añoLanzamiento,
        desarrollador: juegoEditando.desarrollador,
        imagenPortada: juegoEditando.imagenPortada,
        descripcion: juegoEditando.descripcion,
        completado: juegoEditando.completado
      });
    } else {
  
      setFormData({
        titulo: '',
        genero: '',
        plataforma: '',
        añoLanzamiento: '',
        desarrollador: '',
        imagenPortada: '',
        descripcion: '',
        completado: false
      });
    }
  }, [juegoEditando]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.titulo && formData.genero && formData.plataforma) {
      if (juegoEditando) {
  
        onActualizarJuego({
          ...juegoEditando,
          ...formData,
          añoLanzamiento: parseInt(formData.añoLanzamiento) || 0
        });
        alert('¡Juego actualizado exitosamente! ✏️');
      } else {
   
        onAgregarJuego({
          ...formData,
          _id: Date.now(),
          añoLanzamiento: parseInt(formData.añoLanzamiento) || 0
        });
        alert('¡Juego agregado exitosamente! 🎮');
      }

      if (!juegoEditando) {
        setFormData({
          titulo: '',
          genero: '',
          plataforma: '',
          añoLanzamiento: '',
          desarrollador: '',
          imagenPortada: '',
          descripcion: '',
          completado: false
        });
      }
    } else {
      alert('Por favor completa los campos obligatorios: Título, Género y Plataforma');
    }
  };

  return (
    <div className="formulario-juego-container">
      <h3>{juegoEditando ? '✏️ Editar Juego' : '➕ Agregar Nuevo Juego'}</h3>
      
      <form onSubmit={handleSubmit} className="formulario-juego">
        <div className="campo">
          <label>Título del Juego *</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ej: The Legend of Zelda"
            required
          />
        </div>

        <div className="campo">
          <label>Género *</label>
          <select 
            name="genero" 
            value={formData.genero} 
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un género</option>
            <option value="Acción">Acción</option>
            <option value="Aventura">Aventura</option>
            <option value="RPG">RPG</option>
            <option value="Estrategia">Estrategia</option>
            <option value="Deportes">Deportes</option>
            <option value="Shooter">Shooter</option>
            <option value="Sandbox">Sandbox</option>
            <option value="Indie">Indie</option>
          </select>
        </div>

        <div className="campo">
          <label>Plataforma *</label>
          <select 
            name="plataforma" 
            value={formData.plataforma} 
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una plataforma</option>
            <option value="PC">PC</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="PlayStation 4">PlayStation 4</option>
            <option value="Xbox Series X">Xbox Series X</option>
            <option value="Xbox One">Xbox One</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Mobile">Mobile</option>
            <option value="Multiplataforma">Multiplataforma</option>
          </select>
        </div>

        <div className="campo-doble">
          <div className="campo">
            <label>Año de Lanzamiento</label>
            <input
              type="number"
              name="añoLanzamiento"
              value={formData.añoLanzamiento}
              onChange={handleChange}
              placeholder="2023"
              min="1970"
              max="2030"
            />
          </div>

          <div className="campo">
            <label>Desarrollador</label>
            <input
              type="text"
              name="desarrollador"
              value={formData.desarrollador}
              onChange={handleChange}
              placeholder="Ej: Nintendo, Sony, etc."
            />
          </div>
        </div>

        <div className="campo">
          <label>URL de la Portada</label>
          <input
            type="url"
            name="imagenPortada"
            value={formData.imagenPortada}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div className="campo">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe el juego..."
            rows="3"
          />
        </div>

        <div className="campo-checkbox">
          <label>
            <input
              type="checkbox"
              name="completado"
              checked={formData.completado}
              onChange={handleChange}
            />
            ¿Ya completaste este juego?
          </label>
        </div>

        <div className="acciones-formulario">
          {juegoEditando && (
            <button 
              type="button" 
              className="btn-cancelar"
              onClick={onCancelarEdicion}
            >
              ❌ Cancelar
            </button>
          )}
          
          <button type="submit" className="btn-enviar">
            {juegoEditando ? '💾 Guardar Cambios' : '🎮 Agregar a Mi Biblioteca'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioJuego;