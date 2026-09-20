import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [flores, setFlores] = useState([]);
  const [petalos, setPetalos] = useState([]);

  useEffect(() => {
    // 1. Generar 120 flores dinámicas
    const cantidadFlores = 120;
    const tiposAnimacion = ['flotar', 'balanceo', 'latido'];
    
    const nuevasFlores = Array.from({ length: cantidadFlores }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 95}vw`,
      top: `${Math.random() * 95}vh`,
      animationName: tiposAnimacion[Math.floor(Math.random() * tiposAnimacion.length)],
      animationDuration: `${Math.random() * 4 + 3}s`,
      animationDelay: `${Math.random() * 2}s`,
      scale: Math.random() * 0.6 + 0.4 
    }));
    setFlores(nuevasFlores);

    // 2. Generar 80 pétalos para la lluvia
    const cantidadPetalos = 80;
    const nuevosPetalos = Array.from({ length: cantidadPetalos }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 4 + 4}s`,
      animationDelay: `${Math.random() * 5}s`,
    }));
    setPetalos(nuevosPetalos);
  }, []);

  return (
    <div className="contenedor-principal">
      
      {/* ==========================================
          CAPA 1: FONDO ANIMADO (No tocar)
      ========================================== */}
      <div className="capa-animaciones">
        <div className="contenedor-petalos">
          {petalos.map((petalo) => (
            <div
              key={`petalo-${petalo.id}`}
              className="petalo"
              style={{
                left: petalo.left,
                animationDuration: petalo.animationDuration,
                animationDelay: petalo.animationDelay,
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
              🌻
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          CAPA 2: TU CONTENIDO (Modifica esto)
      ========================================== */}
      <div className="capa-contenido">
        
        {/* ↓↓ PEGA AQUÍ TU HTML/MENSAJE ORIGINAL ↓↓ */}
        <h1>¡Flores Amarillas para ti!</h1>
        <p>Aquí vuelve a ir todo tu texto y diseño anterior.</p>
        <button onClick={() => alert('¡Hola!')}>Botón de prueba</button>
        {/* ↑↑ PEGA AQUÍ TU HTML/MENSAJE ORIGINAL ↑↑ */}

      </div>

    </div>
  );
}

export default App;