import React, { useState } from 'react';
import './App.css';
import FormularioJuego from './components/FormularioJuego/FormularioJuego';
import ListaReseñas from './components/ListaReseñas/ListaReseñas';
import FormularioReseña from './components/FormularioReseña/FormularioReseña';
import BibliotecaJuegos from './components/BibliotecaJuegos/BibliotecaJuegos';
import EstadisticasPersonales from './components/EstadisticasPersonales/EstadisticasPersonales';

const juegosIniciales = [
  {
    _id: 1,
    titulo: "The Legend of Zelda: Breath of the Wild",
    genero: "Aventura",
    plataforma: "Nintendo Switch",
    añoLanzamiento: 2017,
    desarrollador: "Nintendo",
    imagenPortada: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7y.jpg",
    descripcion: "Un juego de aventuras en mundo abierto...",
    completado: true,
    reseñas: [
      {
        _id: 101,
        puntuacion: 5,
        textoReseña: "¡Increíble juego! Los gráficos y la jugabilidad son excepcionales.",
        horasJugadas: 120,
        dificultad: "Normal",
        recomendaria: true,
        fechaCreacion: "2024-01-15"
      }
    ]
  },
  {
    _id: 2,
    titulo: "God of War",
    genero: "Acción", 
    plataforma: "PlayStation 4",
    añoLanzamiento: 2018,
    desarrollador: "Santa Monica Studio",
    imagenPortada: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1iwf.jpg",
    descripcion: "Kratos regresa en una nueva aventura...",
    completado: false,
    reseñas: []
  },
  {
    _id: 3,
    titulo: "Minecraft",
    genero: "Sandbox",
    plataforma: "Multiplataforma",
    añoLanzamiento: 2011,
    desarrollador: "Mojang",
    imagenPortada: "https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.jpg",
    descripcion: "Juego de construcción con bloques...",
    completado: true,
    reseñas: []
  }
];

function App() {
  const [juegos, setJuegos] = useState(juegosIniciales);
  const [juegoEditando, setJuegoEditando] = useState(null);
  const [mostrarReseñas, setMostrarReseñas] = useState(null);
  const [mostrarFormReseña, setMostrarFormReseña] = useState(null);

  const agregarJuego = (nuevoJuego) => {
    setJuegos(prevJuegos => [...prevJuegos, { ...nuevoJuego, reseñas: [] }]);
  };

  const eliminarJuego = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este juego?')) {
      setJuegos(prevJuegos => prevJuegos.filter(juego => juego._id !== id));
    }
  };

  const editarJuego = (juego) => {
    setJuegoEditando(juego);
  };

  const actualizarJuego = (juegoActualizado) => {
    setJuegos(prevJuegos => 
      prevJuegos.map(juego => 
        juego._id === juegoActualizado._id ? juegoActualizado : juego
      )
    );
    setJuegoEditando(null);
  };

  const cancelarEdicion = () => {
    setJuegoEditando(null);
  };

  const verReseñas = (juego) => {
    setMostrarReseñas(juego);
  };

  const cerrarReseñas = () => {
    setMostrarReseñas(null);
  };

  const abrirFormReseña = (juego) => {
    setMostrarFormReseña(juego);
  };

  const cerrarFormReseña = () => {
    setMostrarFormReseña(null);
  };

  const agregarReseña = (nuevaReseña) => {
    setJuegos(prevJuegos => 
      prevJuegos.map(juego => 
        juego._id === mostrarFormReseña._id 
          ? { 
              ...juego, 
              reseñas: [...juego.reseñas, { ...nuevaReseña, _id: Date.now() }] 
            }
          : juego
      )
    );
    setMostrarFormReseña(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎮 GameTracker</h1>
        <p>Tu biblioteca personal de videojuegos</p>
      </header>
      
      <FormularioJuego 
        onAgregarJuego={agregarJuego}
        juegoEditando={juegoEditando}
        onActualizarJuego={actualizarJuego}
        onCancelarEdicion={cancelarEdicion}
      />
      
      <EstadisticasPersonales juegos={juegos} />
      
      <BibliotecaJuegos 
        juegos={juegos}
        onEliminar={eliminarJuego}
        onEditar={editarJuego}
        onVerReseñas={verReseñas}
        onAgregarReseña={abrirFormReseña}
      />

      {mostrarReseñas && (
        <ListaReseñas 
          reseñas={mostrarReseñas.reseñas}
          onCerrar={cerrarReseñas}
        />
      )}
      
      {mostrarFormReseña && (
        <FormularioReseña 
          juego={mostrarFormReseña}
          onAgregarReseña={agregarReseña}
          onCerrar={cerrarFormReseña}
        />
      )}
    </div>
  );
}

export default App;