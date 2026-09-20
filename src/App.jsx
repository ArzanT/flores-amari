import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import "./App.css";

// 1. Margarita Clásica
const FlowerDaisy = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" width="100" height="100">
    <path d="M50 15 C40 0, 20 0, 30 25 C10 15, -5 35, 20 50 C-5 65, 10 85, 30 75 C20 100, 40 100, 50 85 C60 100, 80 100, 70 75 C90 85, 105 65, 80 50 C105 35, 90 15, 70 25 C80 0, 60 0, 50 15 Z" fill="#FFD700" stroke="#DAA520" strokeWidth="2"/>
    <circle cx="50" cy="50" r="15" fill="#8B4513" />
  </svg>
);

// 2. Flor Loto Brillante
const FlowerLotus = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" width="100" height="100">
    <path d="M50,10 Q65,40 95,50 Q65,60 50,90 Q35,60 5,50 Q35,40 50,10" fill="#FFEB3B" stroke="#FBC02D" strokeWidth="2"/>
    <path d="M50,25 Q58,45 80,50 Q58,55 50,75 Q42,55 20,50 Q42,45 50,25" fill="#FFF176" />
    <circle cx="50" cy="50" r="8" fill="#F57F17" />
  </svg>
);

// 3. Girasol / Flor Estrella
const FlowerStar = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" width="100" height="100">
    <polygon points="50,5 60,35 95,35 65,55 75,90 50,70 25,90 35,55 5,35 40,35" fill="#FFC107" stroke="#FF9800" strokeWidth="2"/>
    <circle cx="50" cy="50" r="12" fill="#5D4037" />
    <circle cx="50" cy="50" r="8" fill="#3E2723" />
  </svg>
);

// 4. Flor Burbuja Fantasía
const FlowerBubble = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" width="100" height="100">
    <g fill="#FFF59D" stroke="#FBC02D" strokeWidth="1">
      <circle cx="30" cy="50" r="22"/><circle cx="70" cy="50" r="22"/>
      <circle cx="50" cy="30" r="22"/><circle cx="50" cy="70" r="22"/>
      <circle cx="35" cy="35" r="18"/><circle cx="65" cy="65" r="18"/>
      <circle cx="35" cy="65" r="18"/><circle cx="65" cy="35" r="18"/>
    </g>
    <circle cx="50" cy="50" r="12" fill="#FF7043" />
  </svg>
);

// 5. Tulipán Abstracto
const FlowerTulip = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" width="90" height="90">
    <path d="M20 50 C 20 10, 50 0, 50 50 C 50 0, 80 10, 80 50 C 80 95, 50 90, 50 90 C 50 90, 20 95, 20 50" fill="#FFEE58" stroke="#FBC02D" strokeWidth="2"/>
    <path d="M35 40 C 35 20, 50 15, 50 40 C 50 15, 65 20, 65 40 C 65 70, 50 70, 50 70 C 50 70, 35 70, 35 40" fill="#FFCA28" />
  </svg>
);

// Array de componentes para iterarlos fácilmente
const FlowerTypes = [FlowerDaisy, FlowerLotus, FlowerStar, FlowerBubble, FlowerTulip];

// 5 Animaciones de entrada más elaboradas
const animations = [
  { initial: { scale: 0, rotate: -200 }, animate: { scale: 1, rotate: 10 }, transition: { type: "spring", bounce: 0.6, duration: 2 } },
  { initial: { opacity: 0, y: 150, scale: 0.5 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", bounce: 0.4, duration: 1.5 } },
  { initial: { scale: 0 }, animate: { scale: [1.3, 0.9, 1] }, transition: { duration: 1.2 } },
  { initial: { opacity: 0, x: -100, rotate: -45 }, animate: { opacity: 1, x: 0, rotate: 0 }, transition: { type: "spring", bounce: 0.5, duration: 1.5 } },
  { initial: { scale: 0, rotateX: 180 }, animate: { scale: 1, rotateX: 0 }, transition: { duration: 1.8 } }
];

// Más posiciones para llenar mejor la pantalla (10 flores en total)
const positions = [
  { top: "5%", left: "10%" }, { top: "10%", right: "15%" }, 
  { bottom: "15%", left: "8%" }, { bottom: "20%", right: "12%" }, 
  { top: "35%", left: "2%" }, { top: "45%", right: "4%" }, 
  { bottom: "35%", left: "20%" }, { bottom: "40%", right: "18%" },
  { top: "25%", left: "25%" }, { top: "25%", right: "25%" }
];

function App() {
  const [init, setInit] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  // Configuración MEJORADA de la lluvia de pétalos
const particlesOptions = {
    background: { color: { value: "transparent" } }, 
    particles: {
      number: { 
        value: 150, // 150 pétalos en pantalla simultáneamente
      },
      color: { value: ["#FFD700", "#FFC000", "#F5DEB3", "#FFF8DC"] },
      shape: { type: "circle" },
      opacity: { 
        value: { min: 0.3, max: 0.9 }
      },
      size: { 
        value: { min: 6, max: 14 }, // Más grandes para que destaquen
      },
      move: {
        enable: true,
        speed: { min: 3, max: 6 }, // Velocidad de caída
        direction: "bottom",
        straight: false,
        outModes: { default: "out" },
      },
    }
  };

  const handleStart = () => {
    setIsStarted(true);
    if (audioRef.current) audioRef.current.play();
  };

  return (
    <div className="container">
      <audio ref={audioRef} src="/cancion.mp3" loop />
      {init && <Particles id="tsparticles" options={particlesOptions} className="particles-bg" />}
      
      <div className="content">
        <AnimatePresence mode="wait">
          {!isStarted ? (
            <motion.button
              key="start-btn"
              className="start-button"
              onClick={handleStart}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Click aquí 💛
            </motion.button>
          ) : (
            <motion.div 
              key="main-card"
              className="card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h1 
                className="message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                feliz 21, aqui no se marchitaran tus flores amarillas xd
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        {isStarted && positions.map((pos, index) => {
          const anim = animations[index % animations.length];
          const FlowerComponent = FlowerTypes[index % FlowerTypes.length];
          // Asignamos una clase CSS aleatoria para que floten a distinto ritmo
          const floatClass = `float-anim-${(index % 3) + 1}`; 

          return (
            <motion.div
              key={`flower-${index}`}
              className={`flower-wrapper`}
              style={pos}
              initial={anim.initial}
              animate={anim.animate}
              transition={{ ...anim.transition, delay: 0.8 + (index * 0.15) }} // Aparecen más rápido en cascada
            >
              <FlowerComponent className={`flower-svg ${floatClass}`} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default App;