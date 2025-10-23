import React from 'react';
import './EstadisticasPersonales.css';

const EstadisticasPersonales = ({ juegos }) => {

  const totalJuegos = juegos.length;
  const juegosCompletados = juegos.filter(j => j.completado).length;
  const juegosPendientes = totalJuegos - juegosCompletados;
  const totalReseñas = juegos.reduce((total, j) => total + (j.reseñas?.length || 0), 0);
  const totalHorasJugadas = juegos.reduce((total, j) => 
    total + j.reseñas?.reduce((horas, r) => horas + (r.horasJugadas || 0), 0) || 0, 0
  );

  const generos = {};
  juegos.forEach(juego => {
    generos[juego.genero] = (generos[juego.genero] || 0) + 1;
  });

  const plataformas = {};
  juegos.forEach(juego => {
    plataformas[juego.plataforma] = (plataformas[juego.plataforma] || 0) + 1;
  });

  return (
    <div className="estadisticas-container">
      <h2>📊 Mis Estadísticas de Gaming</h2>
      
      <div className="estadisticas-grid">

        <div className="estadistica-card total">
          <h3>🎮 Total Juegos</h3>
          <div className="valor">{totalJuegos}</div>
        </div>
        
        <div className="estadistica-card completados">
          <h3>✅ Completados</h3>
          <div className="valor">{juegosCompletados}</div>
          <div className="porcentaje">
            {totalJuegos > 0 ? ((juegosCompletados / totalJuegos) * 100).toFixed(1) : 0}%
          </div>
        </div>
        
        <div className="estadistica-card pendientes">
          <h3>🎯 Por Jugar</h3>
          <div className="valor">{juegosPendientes}</div>
          <div className="porcentaje">
            {totalJuegos > 0 ? ((juegosPendientes / totalJuegos) * 100).toFixed(1) : 0}%
          </div>
        </div>
        
        <div className="estadistica-card reseñas">
          <h3>📝 Reseñas</h3>
          <div className="valor">{totalReseñas}</div>
        </div>
        
        <div className="estadistica-card horas">
          <h3>⏱️ Horas Jugadas</h3>
          <div className="valor">{totalHorasJugadas}</div>
          <div className="subtexto">aprox.</div>
        </div>
      </div>

      <div className="seccion-estadisticas">
        <h3>🎭 Distribución por Género</h3>
        <div className="distribucion">
          {Object.entries(generos).map(([genero, cantidad]) => (
            <div key={genero} className="item-distribucion">
              <span className="label">{genero}</span>
              <div className="barra-container">
                <div 
                  className="barra" 
                  style={{ width: `${(cantidad / totalJuegos) * 100}%` }}
                ></div>
              </div>
              <span className="valor">{cantidad}</span>
            </div>
          ))}
        </div>
      </div>

    
      <div className="seccion-estadisticas">
        <h3>🖥️ Plataformas</h3>
        <div className="plataformas-grid">
          {Object.entries(plataformas).map(([plataforma, cantidad]) => (
            <div key={plataforma} className="plataforma-card">
              <span className="plataforma-nombre">{plataforma}</span>
              <span className="plataforma-cantidad">{cantidad} juegos</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstadisticasPersonales;