import React, { useState, useEffect } from 'react'
import PhishingGame from '../Games/PhishingGame'
import './PhishingSection.css'

const PhishingSection = () => {
  const [activeTab, setActiveTab] = useState('learn')
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

    const element = document.getElementById('phishing')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const phishingWarnings = [
    {
      icon: '📧',
      title: 'Correos sospechosos',
      description: 'Ten cuidado con emails que piden información personal o contraseñas',
      example: '"Hola, necesitamos verificar tu cuenta. Haz clic aquí."'
    },
    {
      icon: '🔗',
      title: 'Enlaces extraños',
      description: 'No hagas clic en links de sitios web que no conoces',
      example: 'www.g00gle-segurid4d.com (¡No es Google real!)'
    },
    {
      icon: '⚡',
      title: 'Urgencia falsa',
      description: 'Los estafadores dicen "¡Rápido!" para que actúes sin pensar',
      example: '"¡Tu cuenta será cerrada en 1 hora si no actúas YA!"'
    },
    {
      icon: '💰',
      title: 'Ofertas increíbles',
      description: 'Si algo suena demasiado bueno para ser verdad, ¡probablemente lo es!',
      example: '"¡Has ganado $1,000,000! Solo da tu información."'
    }
  ]

  const redFlags = [
    '❌ Errores de ortografía y gramática',
    '❌ Pedidos de información personal',
    '❌ Enlaces que no coinciden con el sitio',
    '❌ Presión para actuar "inmediatamente"',
    '❌ Amenazas o consecuencias graves',
    '❌ Remitente desconocido o sospechoso'
  ]

  const safetyTips = [
    '✅ Verifica siempre el remitente',
    '✅ Pasa el cursor sobre los enlaces sin hacer clic',
    '✅ Ve directamente al sitio web oficial',
    '✅ Pregunta a un adulto si tienes dudas',
    '✅ Nunca compartas contraseñas por email',
    '✅ Reporta mensajes sospechosos'
  ]

  return (
    <section id="phishing" className={`section phishing-section ${isVisible ? 'phishing-section--visible' : ''}`}>
      <div className="container">
        <div className="phishing-section__header">
          <h2 className="section__title">
            🎣 Detecta el Phishing
          </h2>
          <p className="section__subtitle">
            Aprende a identificar mensajes peligrosos y protégete de los estafadores online
          </p>
        </div>

        <div className="phishing-section__content">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'learn' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('learn')}
              aria-pressed={activeTab === 'learn'}
            >
              <span className="tab__icon">📚</span>
              Aprende
            </button>
            <button
              className={`tab ${activeTab === 'examples' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('examples')}
              aria-pressed={activeTab === 'examples'}
            >
              <span className="tab__icon">🕵️</span>
              Ejemplos
            </button>
            <button
              className={`tab ${activeTab === 'game' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('game')}
              aria-pressed={activeTab === 'game'}
            >
              <span className="tab__icon">🎮</span>
              Detective
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'learn' && (
              <div className="phishing-learn">
                <div className="warning-cards">
                  {phishingWarnings.map((warning, index) => (
                    <div 
                      key={index}
                      className="warning-card"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="warning-card__icon">{warning.icon}</div>
                      <h3 className="warning-card__title">{warning.title}</h3>
                      <p className="warning-card__description">{warning.description}</p>
                      <div className="warning-card__example">
                        <strong>Ejemplo:</strong> {warning.example}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="safety-checklist">
                  <div className="checklist-column">
                    <h3>🚩 Señales de Alerta</h3>
                    <ul className="red-flags">
                      {redFlags.map((flag, index) => (
                        <li key={index}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="checklist-column">
                    <h3>🛡️ Consejos de Seguridad</h3>
                    <ul className="safety-tips">
                      {safetyTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="phishing-examples">
                <h3>🕵️ Analiza estos mensajes</h3>
                <p className="examples-intro">
                  ¿Puedes identificar qué hace que estos mensajes sean sospechosos?
                </p>
                
                <div className="message-examples">
                  <div className="fake-message fake-message--phishing">
                    <div className="message-header">
                      <span className="sender">De: seguridad@b4nc0-segur0.com</span>
                      <span className="subject">URGENTE: Verifica tu cuenta</span>
                    </div>
                    <div className="message-body">
                      <p>Estimado cliente,</p>
                      <p>Su cuenta sera bloqueada en 2 horas si no verifica su informacion INMEDIATAMENTE.</p>
                      <p>Haga clic aquí para evitar el bloqueo: <a href="#">www.banco-falso-123.com</a></p>
                      <p>Atte,<br/>Equipo de Seguridad</p>
                    </div>
                    <div className="message-analysis">
                      <h4>🚨 ¡PHISHING! Señales:</h4>
                      <ul>
                        <li>❌ URL sospechosa con números raros</li>
                        <li>❌ Errores de ortografía ("sera", "informacion")</li>
                        <li>❌ Urgencia falsa ("2 horas")</li>
                        <li>❌ Pide hacer clic en enlaces</li>
                      </ul>
                    </div>
                  </div>

                  <div className="fake-message fake-message--safe">
                    <div className="message-header">
                      <span className="sender">De: notificaciones@netflix.com</span>
                      <span className="subject">Tu factura mensual está lista</span>
                    </div>
                    <div className="message-body">
                      <p>Hola [Tu nombre],</p>
                      <p>Tu factura de Netflix del mes de enero está disponible en tu cuenta.</p>
                      <p>Puedes revisarla iniciando sesión en netflix.com</p>
                      <p>¡Gracias por ser parte de Netflix!</p>
                    </div>
                    <div className="message-analysis">
                      <h4>✅ SEGURO. Razones:</h4>
                      <ul>
                        <li>✅ Dominio oficial (netflix.com)</li>
                        <li>✅ Sin errores de ortografía</li>
                        <li>✅ No pide información personal</li>
                        <li>✅ No crea urgencia falsa</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'game' && (
              <div className="phishing-game-container">
                <h3>🕵️‍♀️ ¡Conviértete en Detective Cyber!</h3>
                <p>Pon a prueba tus habilidades identificando mensajes de phishing</p>
                <PhishingGame />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PhishingSection