import React, { useState, useEffect } from 'react'
import SocialMediaQuiz from '../Games/SocialMediaQuiz'
import './SocialMediaSection.css'

const SocialMediaSection = () => {
  const [activeTab, setActiveTab] = useState('basics')
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

    const element = document.getElementById('redes-sociales')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const socialTips = [
    {
      icon: '👤',
      title: 'Tu perfil privado',
      description: 'Mantén tu perfil privado para que solo tus amigos puedan ver tus fotos y publicaciones',
      tip: 'Ve a Configuración > Privacidad y activa todas las protecciones'
    },
    {
      icon: '📷',
      title: 'Piensa antes de publicar',
      description: 'Una vez que publicas algo, puede quedarse en internet para siempre',
      tip: 'Pregúntate: ¿Estaría bien que mis padres o abuelos vieran esto?'
    },
    {
      icon: '👥',
      title: 'Solo amigos reales',
      description: 'No agregues a personas que no conoces en la vida real',
      tip: 'Si alguien te pide información personal, ¡díselo a un adulto!'
    },
    {
      icon: '💬',
      title: 'Comunicación positiva',
      description: 'Trata a otros como te gustaría que te trataran a ti',
      tip: 'Si ves ciberbullying, repórtalo y cuéntaselo a un adulto'
    }
  ]

  const privacySettings = [
    {
      platform: 'Instagram',
      color: '#E4405F',
      settings: [
        'Cuenta privada activada',
        'Comentarios solo de seguidores',
        'Mensajes solo de personas que sigues',
        'Ubicación desactivada en fotos'
      ]
    },
    {
      platform: 'TikTok',
      color: '#000000',
      settings: [
        'Cuenta privada activada',
        'Solo amigos pueden enviarte mensajes',
        'Duetos solo de amigos',
        'Descargas deshabilitadas'
      ]
    },
    {
      platform: 'Snapchat',
      color: '#FFFC00',
      settings: [
        'Solo amigos pueden contactarte',
        'Ubicación en modo fantasma',
        'Historia visible solo para amigos',
        'Mensajes de extraños bloqueados'
      ]
    }
  ]

  const dangerSigns = [
    '🚨 Te piden fotos personales',
    '🚨 Quieren conocerte en persona',
    '🚨 Te piden que no le digas a tus padres',
    '🚨 Te hacen sentir incómodo o asustado',
    '🚨 Te piden información personal (dirección, escuela)',
    '🚨 Te ofrecen regalos o dinero'
  ]

  const goodHabits = [
    '✅ Habla con tus padres sobre lo que haces online',
    '✅ Reporta comportamientos extraños',
    '✅ Usa configuraciones de privacidad',
    '✅ Piensa antes de compartir',
    '✅ Sé amable con todos',
    '✅ Toma descansos de las redes sociales'
  ]

  return (
    <section id="redes-sociales" className={`section social-section ${isVisible ? 'social-section--visible' : ''}`}>
      <div className="container">
        <div className="social-section__header">
          <h2 className="section__title">
            📱 Redes Sociales Seguras
          </h2>
          <p className="section__subtitle">
            Descubre cómo usar las redes sociales de forma divertida y segura
          </p>
        </div>

        <div className="social-section__content">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'basics' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('basics')}
              aria-pressed={activeTab === 'basics'}
            >
              <span className="tab__icon">🌟</span>
              Básicos
            </button>
            <button
              className={`tab ${activeTab === 'privacy' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('privacy')}
              aria-pressed={activeTab === 'privacy'}
            >
              <span className="tab__icon">🔒</span>
              Privacidad
            </button>
            <button
              className={`tab ${activeTab === 'safety' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('safety')}
              aria-pressed={activeTab === 'safety'}
            >
              <span className="tab__icon">🛡️</span>
              Seguridad
            </button>
            <button
              className={`tab ${activeTab === 'quiz' ? 'tab--active' : ''}`}
              onClick={() => setActiveTab('quiz')}
              aria-pressed={activeTab === 'quiz'}
            >
              <span className="tab__icon">🎯</span>
              Quiz
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'basics' && (
              <div className="social-basics">
                <h3>🚀 Fundamentos de las Redes Sociales</h3>
                <p className="intro-text">
                  Las redes sociales pueden ser súper divertidas para conectar con amigos, 
                  pero es importante usarlas de manera inteligente y segura.
                </p>
                
                <div className="tips-grid">
                  {socialTips.map((tip, index) => (
                    <div 
                      key={index}
                      className="social-tip-card"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="tip-card__icon">{tip.icon}</div>
                      <h4 className="tip-card__title">{tip.title}</h4>
                      <p className="tip-card__description">{tip.description}</p>
                      <div className="tip-card__advice">
                        <strong>💡 Consejo:</strong> {tip.tip}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="golden-rules">
                  <h3>📜 Las 3 Reglas de Oro</h3>
                  <div className="rules-container">
                    <div className="rule">
                      <div className="rule-number">1</div>
                      <div className="rule-content">
                        <h4>Mantén tu información privada</h4>
                        <p>Tu nombre completo, dirección, teléfono y escuela son secretos</p>
                      </div>
                    </div>
                    <div className="rule">
                      <div className="rule-number">2</div>
                      <div className="rule-content">
                        <h4>Solo amigos reales</h4>
                        <p>Si no los conoces en persona, no son amigos de verdad</p>
                      </div>
                    </div>
                    <div className="rule">
                      <div className="rule-number">3</div>
                      <div className="rule-content">
                        <h4>Habla con tus padres</h4>
                        <p>Siempre cuéntales si algo te parece raro o te hace sentir mal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="privacy-settings">
                <h3>🔒 Configuraciones de Privacidad</h3>
                <p className="privacy-intro">
                  Cada red social tiene configuraciones especiales para mantenerte seguro. 
                  ¡Aprende cómo activarlas!
                </p>

                <div className="platforms-grid">
                  {privacySettings.map((platform, index) => (
                    <div 
                      key={index}
                      className="platform-card"
                      style={{ 
                        borderColor: platform.color,
                        animationDelay: `${index * 0.2}s`
                      }}
                    >
                      <div className="platform-header">
                        <h4 style={{ color: platform.color }}>{platform.platform}</h4>
                      </div>
                      <div className="platform-settings">
                        {platform.settings.map((setting, settingIndex) => (
                          <div key={settingIndex} className="setting-item">
                            <span className="setting-check">✅</span>
                            <span className="setting-text">{setting}</span>
                          </div>
                        ))}
                      </div>
                      <div className="platform-footer">
                        <button className="setup-guide-btn">
                          📱 Ver cómo configurar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="privacy-tip-box">
                  <h4>💡 Consejo Pro</h4>
                  <p>
                    Pide a tus padres que te ayuden a configurar estas opciones. 
                    ¡Es súper importante hacerlo antes de empezar a usar cualquier red social!
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="safety-guide">
                <h3>🛡️ Mantente Seguro Online</h3>
                <p className="safety-intro">
                  Aprende a identificar situaciones peligrosas y qué hacer cuando las encuentres.
                </p>

                <div className="safety-comparison">
                  <div className="danger-column">
                    <h4>🚨 Señales de Peligro</h4>
                    <div className="danger-list">
                      {dangerSigns.map((sign, index) => (
                        <div key={index} className="danger-item">
                          {sign}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="good-column">
                    <h4>✅ Buenos Hábitos</h4>
                    <div className="good-list">
                      {goodHabits.map((habit, index) => (
                        <div key={index} className="good-item">
                          {habit}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="emergency-plan">
                  <h4>🆘 ¿Qué hacer si algo sale mal?</h4>
                  <div className="emergency-steps">
                    <div className="step">
                      <div className="step-icon">1️⃣</div>
                      <div className="step-text">
                        <strong>No respondas</strong> - No contestes mensajes raros
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-icon">2️⃣</div>
                      <div className="step-text">
                        <strong>Toma capturas</strong> - Guarda evidencia del problema
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-icon">3️⃣</div>
                      <div className="step-text">
                        <strong>Reporta</strong> - Usa el botón de reportar en la app
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-icon">4️⃣</div>
                      <div className="step-text">
                        <strong>Cuéntaselo a un adulto</strong> - Padres, maestros o familiares
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="social-quiz-container">
                <h3>🎯 Quiz de Redes Sociales</h3>
                <p>Pon a prueba lo que has aprendido sobre seguridad en redes sociales</p>
                <SocialMediaQuiz />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialMediaSection