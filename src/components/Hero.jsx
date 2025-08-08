import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  const phrases = [
    "¡Aprende a protegerte en línea!",
    "¡Conviértete en un ciber-héroe!",
    "¡Protege tus datos como un experto!",
    "¡Navega seguro por internet!"
  ];

  const cyberHeroes = [
    { name: "Contraseñina", icon: "🔐", color: "--cyber-blue" },
    { name: "Anti-Phishing", icon: "🛡️", color: "--cyber-purple" },
    { name: "Privacidad", icon: "🔒", color: "--cyber-green" },
    { name: "Navegador Seguro", icon: "🌐", color: "--cyber-orange" }
  ];

  // Rotate phrases every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  const scrollToContent = () => {
    const contentSection = document.querySelector('#passwords');
    if (contentSection) {
      contentSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="hero">
      {/* Animated background elements */}
      <div className="hero-background">
        <div className="floating-icons">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="floating-icon"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            >
              {['🔒', '🛡️', '🔐', '🌐', '💻', '📱', '🔑', '⚡'][Math.floor(Math.random() * 8)]}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main title */}
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Bienvenido a{' '}
            <span className="title-highlight">CiberNiños</span>
          </motion.h1>

          {/* Rotating subtitle */}
          <motion.div 
            className="hero-subtitle-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="hero-subtitle">
              {phrases.map((phrase, index) => (
                <span
                  key={index}
                  className={`rotating-phrase ${
                    index === currentPhrase ? 'active' : ''
                  }`}
                >
                  {phrase}
                </span>
              ))}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Descubre el emocionante mundo de la ciberseguridad de forma divertida 
            e interactiva. Aprende a crear contraseñas fuertes, identificar phishing, 
            usar redes sociales de manera segura y mucho más.
          </motion.p>

          {/* Cyber Heroes */}
          <motion.div 
            className="cyber-heroes"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3>Conoce a nuestros Ciber-Héroes:</h3>
            <div className="heroes-grid">
              {cyberHeroes.map((hero, index) => (
                <motion.div
                  key={hero.name}
                  className="hero-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1 + (index * 0.1),
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  style={{
                    '--hero-color': `var(${hero.color})`
                  }}
                >
                  <div className="hero-icon">{hero.icon}</div>
                  <div className="hero-name">{hero.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to action button */}
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <button 
              className="cta-button"
              onClick={scrollToContent}
              aria-label="Comenzar aventura de ciberseguridad"
            >
              <span className="cta-text">¡Comenzar Aventura!</span>
              <span className="cta-icon">🚀</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="scroll-arrow" onClick={scrollToContent}>
            <span>Desliza hacia abajo</span>
            <div className="arrow-icon">⬇️</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;