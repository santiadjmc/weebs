import React, { useState, useEffect } from 'react'
import PasswordGame from '../Games/PasswordGame'
import './PasswordSection.css'

const PasswordSection = () => {
  const [activeTab, setActiveTab] = useState('tips')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('contraseñas')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const passwordTips = [
    {
      icon: '🔢',
      title: 'Usa números',
      description: 'Incluye al menos 2 números en tu contraseña'
    },
    {
      icon: '🔤',
      title: 'Letras mayúsculas y minúsculas',
      description: 'Mezcla letras grandes y pequeñas: "Hola123"'
    },
    {
      icon: '✨',
      title: 'Símbolos especiales',
      description: 'Añade caracteres como !, @, #, $'
    },
    {
      icon: '📏',
      title: 'Hazla larga',
      description: 'Mínimo 8 caracteres, mejor si son 12 o más'
    },
    {
      icon: '🚫',
      title: 'Evita lo obvio',
      description: 'No uses tu nombre, cumpleaños o "123456"'
    },
    {
      icon: '🎯',
      title: 'Una por sitio',
      description: 'Cada cuenta debe tener su propia contraseña'
    }
  ]

  const passwordExamples = [
    {
      password: '123456',
      strength: 'weak',
      feedback: '¡Muy fácil de adivinar! 😱'
    },
    {
      password: 'password',
      strength: 'weak',
      feedback: 'Demasiado común 😔'
    },
    {
      password: 'MiGato123',
      strength: 'medium',
      feedback: 'Mejor, pero puede mejorar 🤔'
    },
    {
      password: 'MiG@t0Azul#2024',
      strength: 'strong',
      feedback: '¡Excelente contraseña! 🎉'
    }
  ]

  return (
    <section id="contraseñas" className={`section password-section ${isVisible ? 'password-section--visible' : ''}`}>
      <div className="container">
        <div className="password-section__header">
          <h2 className="section__title">
            🔐 Contraseñas Súper Fuertes
          </h2>
          <p className="section__subtitle">
            Aprende a crear contraseñas que protejan tus cuentas como un verdadero superhéroe
          </p>
        </div>

        <div className="password-section__tabs">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'tips' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('tips')}
              aria-pressed={activeTab === 'tips'}
            >
              <span className="tab__icon">💡</span>
              Consejos
            </button>
            <button
              className={`tab ${activeTab === 'examples' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('examples')}
              aria-pressed={activeTab === 'examples'}
            >
              <span className="tab__icon">📊</span>
              Ejemplos
            </button>
            <button
              className={`tab ${activeTab === 'game' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('game')}
              aria-pressed={activeTab === 'game'}
            >
              <span className="tab__icon">🎮</span>
              Mini-juego
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'tips' && (
              <div className="password-tips">
                <div className="tips-grid">
                  {passwordTips.map((tip, index) => (
                    <div 
                      key={index} 
                      className="tip-card"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="tip-card__icon">{tip.icon}</div>
                      <h3 className="tip-card__title">{tip.title}</h3>
                      <p className="tip-card__description">{tip.description}</p>
                    </div>
                  ))}
                </div>

                <div className="password-formula">
                  <h3>🧮 La Fórmula Mágica</h3>
                  <div className="formula">
                    <div className="formula-part">
                      <span className="formula-icon">🎂</span>
                      <span>Algo personal</span>
                    </div>
                    <span className="formula-plus">+</span>
                    <div className="formula-part">
                      <span className="formula-icon">🔢</span>
                      <span>Números</span>
                    </div>
                    <span className="formula-plus">+</span>
                    <div className="formula-part">
                      <span className="formula-icon">✨</span>
                      <span>Símbolos</span>
                    </div>
                    <span className="formula-equals">=</span>
                    <div className="formula-result">
                      <span className="formula-icon">🛡️</span>
                      <span>¡Súper Contraseña!</span>
                    </div>
                  </div>
                  <p className="formula-example">
                    Ejemplo: <strong>MiPerroMax</strong> + <strong>2024</strong> + <strong>!</strong> = <em>MiPerroMax2024!</em>
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="password-examples">
                <h3>🔍 Analicemos algunas contraseñas</h3>
                <div className="examples-list">
                  {passwordExamples.map((example, index) => (
                    <div 
                      key={index} 
                      className={`example-card example-card--${example.strength}`}
                    >
                      <div className="example-card__password">
                        <code>{example.password}</code>
                      </div>
                      <div className="example-card__strength">
                        <div className={`strength-indicator strength-indicator--${example.strength}`}>
                          {example.strength === 'weak' && '⚠️ Débil'}
                          {example.strength === 'medium' && '⚡ Regular'}
                          {example.strength === 'strong' && '🛡️ Fuerte'}
                        </div>
                      </div>
                      <div className="example-card__feedback">
                        {example.feedback}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="password-meter-demo">
                  <h4>🎯 ¿Qué hace fuerte a una contraseña?</h4>
                  <div className="strength-factors">
                    <div className="factor">
                      <div className="factor__bar factor__bar--full"></div>
                      <span>Longitud (8+ caracteres)</span>
                    </div>
                    <div className="factor">
                      <div className="factor__bar factor__bar--full"></div>
                      <span>Letras mayúsculas y minúsculas</span>
                    </div>
                    <div className="factor">
                      <div className="factor__bar factor__bar--partial"></div>
                      <span>Números</span>
                    </div>
                    <div className="factor">
                      <div className="factor__bar factor__bar--partial"></div>
                      <span>Símbolos especiales</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'game' && (
              <div className="password-game-container">
                <h3>🎮 ¡Crea tu Contraseña Perfecta!</h3>
                <p>Prueba el generador de contraseñas y ve qué tan fuerte es la tuya</p>
                <PasswordGame />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PasswordSection