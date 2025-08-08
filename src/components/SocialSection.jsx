import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './SocialSection.css';

const SocialSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [privacyQuiz, setPrivacyQuiz] = useState({ active: false, currentQuestion: 0, score: 0 });

  const socialTabs = [
    {
      title: "Configuración de Privacidad",
      icon: "🔒",
      content: {
        title: "Protege tu Información Personal",
        tips: [
          {
            platform: "Facebook",
            icon: "📘",
            settings: [
              "Perfil solo para amigos",
              "Restringir búsquedas",
              "Desactivar ubicación",
              "Revisar etiquetas antes de publicar"
            ]
          },
          {
            platform: "Instagram",
            icon: "📷",
            settings: [
              "Cuenta privada",
              "Ocultar historias a desconocidos",
              "Desactivar estado de actividad",
              "Controlar comentarios"
            ]
          },
          {
            platform: "TikTok",
            icon: "🎵",
            settings: [
              "Perfil privado",
              "Restringir mensajes directos",
              "Desactivar descargas de videos",
              "Controlar quién puede hacer duetos"
            ]
          },
          {
            platform: "Twitter/X",
            icon: "🐦",
            settings: [
              "Proteger tweets",
              "Filtrar notificaciones",
              "Limitar quién puede etiquetarte",
              "Desactivar ubicación en tweets"
            ]
          }
        ]
      }
    },
    {
      title: "Reconocer Estafas",
      icon: "🕵️",
      content: {
        title: "Identifica Intentos de Estafa en Redes Sociales",
        scams: [
          {
            type: "Perfiles Falsos",
            description: "Cuentas que se hacen pasar por personas conocidas o celebridades",
            redFlags: ["Pocas fotos", "Seguidores falsos", "Gramática incorrecta", "Piden dinero o info personal"],
            example: "Un perfil con foto de celebridad que te pide ayuda financiera"
          },
          {
            type: "Enlaces Maliciosos",
            description: "Enlaces que llevan a sitios web peligrosos o descargan virus",
            redFlags: ["URLs acortadas sospechosas", "Ofertas demasiado buenas", "Urgencia artificial"],
            example: "¡GRATIS! iPhone 15 - Solo hoy - Haz clic aquí: bit.ly/iphonegratis"
          },
          {
            type: "Sorteos Falsos",
            description: "Concursos falsos que piden información personal",
            redFlags: ["Sin verificación oficial", "Piden datos bancarios", "Muchos sorteos similares"],
            example: "¡Ganaste $1000! Para reclamar, envía tu número de tarjeta de crédito"
          }
        ]
      }
    },
    {
      title: "Cyberbullying",
      icon: "🛡️",
      content: {
        title: "Protégete del Acoso en Línea",
        strategies: [
          {
            situation: "Recibes mensajes ofensivos",
            actions: ["No responder al agresor", "Bloquear y reportar", "Guardar evidencia", "Hablar con un adulto de confianza"]
          },
          {
            situation: "Publican información falsa sobre ti",
            actions: ["Reportar la publicación", "No confrontar públicamente", "Documentar todo", "Buscar ayuda de moderadores"]
          },
          {
            situation: "Te excluyen de grupos online",
            actions: ["No tomar venganza", "Buscar otros grupos positivos", "Hablar con alguien de confianza", "Enfocar en amistades reales"]
          }
        ],
        resources: [
          "Líneas de ayuda anti-bullying",
          "Herramientas de reporte de plataformas",
          "Grupos de apoyo en línea",
          "Consejeros escolares"
        ]
      }
    },
    {
      title: "Huella Digital",
      icon: "👣",
      content: {
        title: "Tu Huella Digital es Permanente",
        concepts: [
          {
            title: "¿Qué es la Huella Digital?",
            description: "Todo lo que haces en internet deja un rastro: posts, fotos, comentarios, búsquedas, likes.",
            impact: "Esta información puede afectar tu futuro académico, laboral y personal."
          },
          {
            title: "Consejos para una Huella Positiva",
            tips: [
              "Piensa antes de publicar",
              "Usa configuraciones de privacidad",
              "Sé respetuoso en comentarios",
              "Comparte contenido constructivo",
              "Revisa periódicamente tu historial"
            ]
          }
        ],
        checkpoints: [
          "¿Te sentirías cómodo si tus abuelos vieran esta publicación?",
          "¿Esto podría malinterpretarse en el futuro?",
          "¿Estoy compartiendo información demasiado personal?",
          "¿Este contenido aporta algo positivo?"
        ]
      }
    }
  ];

  const quizQuestions = [
    {
      question: "¿Cuál es la mejor configuración de privacidad para un adolescente?",
      options: [
        "Perfil completamente público para conseguir más seguidores",
        "Perfil privado solo para amigos conocidos",
        "Público pero sin mostrar ubicación",
        "No importa, nadie verá mis cosas"
      ],
      correct: 1,
      explanation: "Un perfil privado te permite controlar quién ve tu contenido y te protege de desconocidos."
    },
    {
      question: "Si alguien te está molestando en redes sociales, ¿qué debes hacer PRIMERO?",
      options: [
        "Responder con insultos para defenderte",
        "Bloquear y reportar a la persona",
        "Hacer una publicación pública quejándote",
        "Crear una cuenta falsa para investigar"
      ],
      correct: 1,
      explanation: "Bloquear y reportar es la respuesta más segura. No alimentes el conflicto respondiendo."
    },
    {
      question: "¿Qué información NUNCA debes compartir en redes sociales?",
      options: [
        "Tus hobbies favoritos",
        "Fotos de tu mascota",
        "Tu dirección exacta y horarios de casa",
        "Memes divertidos"
      ],
      correct: 2,
      explanation: "Tu dirección y horarios pueden ser usados por personas malintencionadas para ubicarte físicamente."
    }
  ];

  const handleQuizAnswer = (answerIndex) => {
    const isCorrect = answerIndex === quizQuestions[privacyQuiz.currentQuestion].correct;
    if (isCorrect) {
      setPrivacyQuiz(prev => ({ ...prev, score: prev.score + 1 }));
    }
    
    setTimeout(() => {
      if (privacyQuiz.currentQuestion < quizQuestions.length - 1) {
        setPrivacyQuiz(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
      } else {
        // Quiz finished
        alert(`¡Quiz completado! Puntuación: ${privacyQuiz.score + (isCorrect ? 1 : 0)}/${quizQuestions.length}`);
        setPrivacyQuiz({ active: false, currentQuestion: 0, score: 0 });
      }
    }, 2000);
  };

  return (
    <section id="social" className="social-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>📱 Seguridad en Redes Sociales</h2>
          <p>Aprende a usar las redes sociales de forma segura y responsable</p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="social-tabs"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {socialTabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-button ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-title">{tab.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          className="tab-content"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>{socialTabs[activeTab].content.title}</h3>

          {/* Privacy Settings Tab */}
          {activeTab === 0 && (
            <div className="privacy-settings">
              <div className="platforms-grid">
                {socialTabs[activeTab].content.tips.map((platform, index) => (
                  <motion.div
                    key={index}
                    className="platform-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="platform-header">
                      <span className="platform-icon">{platform.icon}</span>
                      <h4>{platform.platform}</h4>
                    </div>
                    <ul className="settings-list">
                      {platform.settings.map((setting, settingIndex) => (
                        <li key={settingIndex}>✅ {setting}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Scams Recognition Tab */}
          {activeTab === 1 && (
            <div className="scams-content">
              <div className="scams-grid">
                {socialTabs[activeTab].content.scams.map((scam, index) => (
                  <motion.div
                    key={index}
                    className="scam-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <h4>🚨 {scam.type}</h4>
                    <p>{scam.description}</p>
                    <div className="red-flags">
                      <h5>Señales de Alerta:</h5>
                      <ul>
                        {scam.redFlags.map((flag, flagIndex) => (
                          <li key={flagIndex}>🚩 {flag}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="scam-example">
                      <h5>Ejemplo:</h5>
                      <p className="example-text">"{scam.example}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Cyberbullying Tab */}
          {activeTab === 2 && (
            <div className="cyberbullying-content">
              <div className="strategies-section">
                <h4>¿Qué hacer en estas situaciones?</h4>
                {socialTabs[activeTab].content.strategies.map((strategy, index) => (
                  <motion.div
                    key={index}
                    className="strategy-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <h5>📱 {strategy.situation}</h5>
                    <div className="action-steps">
                      {strategy.actions.map((action, actionIndex) => (
                        <div key={actionIndex} className="action-step">
                          <span className="step-number">{actionIndex + 1}</span>
                          <span className="step-text">{action}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="resources-section">
                <h4>🆘 Recursos de Ayuda</h4>
                <div className="resources-grid">
                  {socialTabs[activeTab].content.resources.map((resource, index) => (
                    <div key={index} className="resource-item">
                      <span className="resource-icon">🔗</span>
                      <span>{resource}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Digital Footprint Tab */}
          {activeTab === 3 && (
            <div className="footprint-content">
              {socialTabs[activeTab].content.concepts.map((concept, index) => (
                <motion.div
                  key={index}
                  className="concept-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <h4>{concept.title}</h4>
                  <p>{concept.description}</p>
                  {concept.impact && <p className="impact-text"><strong>Impacto:</strong> {concept.impact}</p>}
                  {concept.tips && (
                    <ul className="tips-list">
                      {concept.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>💡 {tip}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
              
              <div className="checkpoint-section">
                <h4>🤔 Preguntas antes de publicar:</h4>
                <div className="checkpoints-grid">
                  {socialTabs[activeTab].content.checkpoints.map((checkpoint, index) => (
                    <div key={index} className="checkpoint-item">
                      <span className="checkpoint-icon">❓</span>
                      <p>{checkpoint}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Quiz Section */}
        <motion.div
          className="quiz-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {!privacyQuiz.active ? (
            <button
              className="quiz-start-btn"
              onClick={() => setPrivacyQuiz({ active: true, currentQuestion: 0, score: 0 })}
            >
              🧠 Pon a Prueba tus Conocimientos
            </button>
          ) : (
            <div className="quiz-container">
              <div className="quiz-header">
                <h4>Pregunta {privacyQuiz.currentQuestion + 1} de {quizQuestions.length}</h4>
                <div className="quiz-progress">
                  <div 
                    className="progress-bar"
                    style={{ width: `${((privacyQuiz.currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="quiz-question">
                <h5>{quizQuestions[privacyQuiz.currentQuestion].question}</h5>
                <div className="quiz-options">
                  {quizQuestions[privacyQuiz.currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className="quiz-option"
                      onClick={() => handleQuizAnswer(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialSection;