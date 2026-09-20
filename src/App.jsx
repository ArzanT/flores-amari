import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [flores, setFlores] = useState([]);
  const [petalos, setPetalos] = useState([]);
  const [iniciado, setIniciado] = useState(false);
  const [botonSaliendo, setBotonSaliendo] = useState(false);
  
  const videoRef = useRef(null);

  useEffect(() => {
    // 1. Aumentamos a 250 flores en pantalla
    const cantidadFlores = 250;
    const tiposAnimacion = [
      'flotar', 'balanceo', 'latido', 'zigzag', 
      'caidaLenta', 'rotacionContinua', 'vaiven', 'espiral'
    ];
    
    // Ampliamos la variedad aplicando filtros CSS para teñir de amarillo las flores rojas/rosas
    const tiposFlores = [
      { emoji: '🌻', filtro: '' }, // Girasol (amarillo nativo)
      { emoji: '🌼', filtro: '' }, // Margarita (amarillo nativo)
      { emoji: '🏵️', filtro: '' }, // Roseta (amarillo nativo)
      { emoji: '🌷', filtro: 'hue-rotate(45deg) saturate(1.5)' }, // Tulipán (de rojo a amarillo)
      { emoji: '🌹', filtro: 'hue-rotate(55deg) saturate(1.5)' }, // Rosa (de rojo a amarillo)
      { emoji: '🌺', filtro: 'hue-rotate(55deg) saturate(1.5)' }, // Hibisco (de rojo a amarillo)
      { emoji: '🌸', filtro: 'sepia(1) saturate(5) hue-rotate(15deg)' }, // Flor de cerezo (transformada a amarillo)
      { emoji: '🪷', filtro: 'sepia(1) saturate(5) hue-rotate(15deg)' }  // Loto (transformada a amarillo)
    ];
    
    const nuevasFlores = Array.from({ length: cantidadFlores }).map((_, i) => {
      const florSeleccionada = tiposFlores[Math.floor(Math.random() * tiposFlores.length)];
      return {
        id: i,
        left: `${Math.random() * 95}vw`,
        top: `${Math.random() * 95}vh`,
        animationName: tiposAnimacion[Math.floor(Math.random() * tiposAnimacion.length)],
        animationDuration: `${Math.random() * 8 + 4}s`,
        animationDelay: `${Math.random() * 4}s`,
        scale: Math.random() * 0.8 + 0.4,
        tipo: florSeleccionada.emoji,
        filtro: florSeleccionada.filtro // Guardamos el filtro específico
      };
    });
    setFlores(nuevasFlores);

    // 2. Aumentamos a 200 pétalos para equilibrar la densidad
    const cantidadPetalos = 200;
    const nuevosPetalos = Array.from({ length: cantidadPetalos }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 6 + 3}s`,
      animationDelay: `${Math.random() * 5}s`,
      scale: Math.random() * 0.6 + 0.4,
    }));
    setPetalos(nuevosPetalos);
  }, []);

  const manejarInicio = () => {
    setBotonSaliendo(true);
    
    if (videoRef.current) {
      videoRef.current.volume = 0.3;
      videoRef.current.play().catch(error => console.log("Error al reproducir video:", error));
    }

    setTimeout(() => {
      setIniciado(true);
    }, 500);
  };

  return (
    <div className="contenedor-principal">
      
      <video 
        ref={videoRef} 
        className="video-fondo" 
        src="/ask_to_the_wind_jp.mp4" 
        loop 
        playsInline
      ></video>

      <div className="capa-desenfoque"></div>

      {!iniciado && (
        <div className="capa-inicio">
          <button 
            className={`btn-iniciar ${botonSaliendo ? 'animacion-rebote-salida' : 'animacion-latido'}`}
            onClick={manejarInicio}
            aria-label="Iniciar sorpresa"
          >
            {/* Aquí mandamos a llamar tu SVG. Asegúrate que esté en la carpeta public */}
            <img src="/button.png" alt="Botón de inicio" className="btn-imagen" />
            
          </button>
        </div>
      )}

      {iniciado && (
        <>
          <div className="capa-animaciones aparecer-suave">
            
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
                    transform: `scale(${flor.scale})`,
                    // Mantenemos la sombra del CSS original y le sumamos la inyección de color
                    filter: `drop-shadow(0 5px 8px rgba(0,0,0,0.5)) ${flor.filtro}`
                  }}
                >
                  {flor.tipo}
                </div>
              ))}
            </div>

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

          </div>

          <div className="capa-contenido aparecer-suave">
            <h1>(˶ᵔ ᵕ ᵔ˶)</h1>
            <p className="mensaje-principal">Aquí tus flores amarillas no se marchitarán xd</p>
          </div>
        </>
      )}

    </div>
  );
}

export default App;