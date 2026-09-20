import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [flores, setFlores] = useState([]);
  const [petalos, setPetalos] = useState([]);
  const [iniciado, setIniciado] = useState(false);
  const [botonSaliendo, setBotonSaliendo] = useState(false);
  
  // Referencia para el audio
  const audioRef = useRef(null);

  useEffect(() => {
    // 1. Generar 120 flores variadas
    const cantidadFlores = 120;
    const tiposAnimacion = ['flotar', 'balanceo', 'latido', 'zigzag', 'caidaLenta'];
    // Variedad de flores amarillas
    const tiposFlores = ['🌻', '🌷', '🌼', '🏵️']; 
    
    const nuevasFlores = Array.from({ length: cantidadFlores }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 95}vw`,
      top: `${Math.random() * 95}vh`,
      animationName: tiposAnimacion[Math.floor(Math.random() * tiposAnimacion.length)],
      animationDuration: `${Math.random() * 6 + 3}s`, // Entre 3s y 9s
      animationDelay: `${Math.random() * 3}s`,
      scale: Math.random() * 0.7 + 0.5,
      tipo: tiposFlores[Math.floor(Math.random() * tiposFlores.length)]
    }));
    setFlores(nuevasFlores);

    // 2. Generar 100 pétalos para la lluvia
    const cantidadPetalos = 100;
    const nuevosPetalos = Array.from({ length: cantidadPetalos }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 5 + 4}s`,
      animationDelay: `${Math.random() * 5}s`,
      scale: Math.random() * 0.5 + 0.5,
    }));
    setPetalos(nuevosPetalos);
  }, []);

  const manejarInicio = () => {
    setBotonSaliendo(true); // Activa la animación de salida del botón
    
    // Reproducir música (Asegúrate de tener la ruta correcta a tu audio)
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.log("Error al reproducir audio:", error));
    }

    // Esperar a que termine la animación del botón (500ms) para mostrar el resto
    setTimeout(() => {
      setIniciado(true);
    }, 500);
  };

  return (
    <div className="contenedor-principal">
      
      {/* Etiqueta de audio oculta */}
      {/* NOTA: Cambia "tu-cancion.mp3" por la ruta real de tu archivo en la carpeta public */}
      <audio ref={audioRef} src="/tu-cancion.mp3" loop />

      {/* Pantalla inicial con solo el botón */}
      {!iniciado && (
        <div className="capa-inicio">
          <button 
            className={`btn-iniciar ${botonSaliendo ? 'animacion-rebote-salida' : 'animacion-latido'}`}
            onClick={manejarInicio}
          >
            Tengo algo para ti... 🌻
          </button>
        </div>
      )}

      {/* Se renderiza el contenido y las animaciones SOLO cuando 'iniciado' es true */}
      {iniciado && (
        <>
          {/* CAPA 1: FONDO ANIMADO */}
          <div className="capa-animaciones aparecer-suave">
            <div className="contenedor-petalos">
              {petalos.map((petalo) => (
                <div
                  key={`petalo-${petalo.id}`}
                  className="petalo"
                  style={{
                    left: petalo.left,
                    animationDuration: petalo.animationDuration,
                    animationDelay: petalo.animationDelay,
                    transform: `scale(${petalo.scale})`
                  }}
                ></div>
              ))}
            </div>

            <div className="contenedor-flores">
              {flores.map((flor) => (
                <div
                  key={`flor-${flor.id}`}
                  className="flor"
                  style={{
                    left: flor.left,
                    top: flor.top,
                    animationName: flor.animationName,
                    animationDuration: flor.animationDuration,
                    animationDelay: flor.animationDelay,
                    transform: `scale(${flor.scale})`
                  }}
                >
                  {flor.tipo}
                </div>
              ))}
            </div>
          </div>

          {/* CAPA 2: TU CONTENIDO */}
          <div className="capa-contenido aparecer-suave">
            <h1>¡Flores Amarillas!</h1>
            <p className="mensaje-principal">Aquí tus flores amarillas no se marchitarán xd</p>
          </div>
        </>
      )}

    </div>
  );
}

export default App;