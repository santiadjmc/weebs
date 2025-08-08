import React, { useEffect, useState } from 'react'
import './Hero.css'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToFirstSection = () => {
    const element = document.getElementById('contraseñas')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero__background">
        <div className="hero__shapes">
          <div className="shape shape--1">🔒</div>
          <div className="shape shape--2">🛡️</div>
          <div className="shape shape--3">🔐</div>
          <div className="shape shape--4">🌐</div>
          <div className="shape shape--5">⚡</div>
          <div className="shape shape--6">🚀</div>
        </div>
      </div>
      
      <div className="container">
        <div className="hero__content">
          <div className={`hero__text ${isVisible ? 'hero__text--visible' : ''}`}>
            <h1 className="hero__title">
              ¡Bienvenido a <span className="hero__title--gradient">CiberNiños</span>!
            </h1>
            <p className="hero__subtitle">
              Aprende sobre ciberseguridad de manera <strong>divertida</strong> y <strong>segura</strong>
            </p>
            <p className="hero__description">
              Descubre cómo protegerte en internet, crear contraseñas súper fuertes, 
              detectar mensajes peligrosos y ser un verdadero <em>superhéroe digital</em>.
            </p>
            
            <div className="hero__stats">
              <div className="hero__stat">
                <div className="hero__stat-number">5</div>
                <div className="hero__stat-label">Lecciones</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-number">10+</div>
                <div className="hero__stat-label">Mini-juegos</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-number">100%</div>
                <div className="hero__stat-label">Diversión</div>
              </div>
            </div>

            <button 
              className="hero__cta"
              onClick={scrollToFirstSection}
              aria-label="Comenzar a aprender sobre ciberseguridad"
            >
              <span>¡Empezar mi aventura!</span>
              <div className="hero__cta-icon">🚀</div>
            </button>
          </div>

          <div className={`hero__visual ${isVisible ? 'hero__visual--visible' : ''}`}>
            <div className="hero__character">
              <div className="character">
                <div className="character__head">
                  <div className="character__eyes">
                    <div className="character__eye character__eye--left"></div>
                    <div className="character__eye character__eye--right"></div>
                  </div>
                  <div className="character__mouth"></div>
                </div>
                <div className="character__body">
                  <div className="character__shield">🛡️</div>
                </div>
                <div className="character__cape"></div>
              </div>
              <div className="hero__floating-icons">
                <div className="floating-icon floating-icon--1">💻</div>
                <div className="floating-icon floating-icon--2">🔑</div>
                <div className="floating-icon floating-icon--3">🌟</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero