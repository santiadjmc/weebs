import { useState } from 'react';
import { motion } from 'framer-motion';
import './SocialSection.css';

const SocialSection = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [scenarioResults, setScenarioResults] = useState([]);

  const socialScenarios = [
    {
      id: 1,
      title: '👤 Solicitud de Amistad Extraña',
      description: 'Recibes una solicitud de amistad de alguien que no conoces, pero tiene una foto atractiva y dice conocerte del colegio.',
      image: '👤',
      actions: [
        { 
          text: 'Aceptar inmediatamente', 
          result: 'danger', 
          explanation: '❌ Nunca aceptes solicitudes de desconocidos. Podrían ser cuentas falsas creadas para estafar.' 
        },
        { 
          text: 'Verificar con amigos reales si lo conocen', 
          result: 'good', 
          explanation: '👍 ¡Buena decisión! Siempre verifica con amigos de verdad antes de aceptar.' 
        },
        { 
          text: 'Ignorar la solicitud', 
          result: 'best', 
          explanation: '✅ ¡Perfecto! Es mejor ser cauteloso con desconocidos en línea.' 
        },
        { 
          text: 'Preguntarle información personal para "verificar"', 
          result: 'danger', 
          explanation: '❌ Nunca compartas ni pidas información personal. Es arriesgado.' 
        }
      ]
    },
    {
      id: 2,
      title: '📸 Foto Vergonzosa de un Amigo',
      description: 'Tu amigo subió una foto tuya en una situación vergonzosa. Todos en el colegio la están viendo y comentando.',
      image: '📸',
      actions: [
        { 
          text: 'Publicar una foto vergonzosa de él para vengarme', 
          result: 'danger', 
          explanation: '❌ La venganza nunca es la solución y puede empeorar las cosas.' 
        },
        { 
          text: 'Hablar privadamente con mi amigo para que la quite', 
          result: 'best', 
          explanation: '✅ ¡Excelente! La comunicación directa es la mejor solución.' 
        },
        { 
          text: 'Reportar la foto a la plataforma', 
          result: 'good', 
          explanation: '👍 Es una buena opción si la conversación no funciona.' 
        },
        { 
          text: 'No hacer nada y esperar que pase', 
          result: 'poor', 
          explanation: '⚠️ A veces es mejor actuar para proteger tu privacidad.' 
        }
      ]
    },
    {
      id: 3,
      title: '💰 Concurso Increíble',
      description: 'Ves una publicación que dice "Comparte esta imagen y gana un iPhone 15 Pro gratis! Solo los primeros 100". Ya tiene miles de compartidos.',
      image: '🎁',
      actions: [
        { 
          text: 'Compartir inmediatamente antes de que se acaben', 
          result: 'danger', 
          explanation: '❌ Estos "concursos" casi siempre son estafas para recopilar datos.' 
        },
        { 
          text: 'Verificar si la cuenta es oficial de la marca', 
          result: 'good', 
          explanation: '👍 ¡Buena idea! Siempre verifica la autenticidad de los concursos.' 
        },
        { 
          text: 'Ignorar porque parece demasiado bueno para ser verdad', 
          result: 'best', 
          explanation: '✅ ¡Perfecto! Tu instinto es correcto. Si parece demasiado bueno, probablemente lo es.' 
        },
        { 
          text: 'Compartir pero solo con amigos cercanos', 
          result: 'poor', 
          explanation: '⚠️ Aún es arriesgado. Mejor no compartir contenido sospechoso.' 
        }
      ]
    },
    {
      id: 4,
      title: '😡 Cyberbullying',
      description: 'Un compañero de clase está siendo atacado con comentarios crueles en sus fotos. Los comentarios son muy hirientes.',
      image: '😢',
      actions: [
        { 
          text: 'Unirme a los comentarios para encajar', 
          result: 'danger', 
          explanation: '❌ Nunca participes en cyberbullying. Eso te convierte en parte del problema.' 
        },
        { 
          text: 'Reportar los comentarios y apoyar a mi compañero', 
          result: 'best', 
          explanation: '✅ ¡Eres un héroe! Reportar y apoyar a las víctimas es lo correcto.' 
        },
        { 
          text: 'No hacer nada porque no es mi problema', 
          result: 'poor', 
          explanation: '⚠️ El cyberbullying es problema de todos. Tu apoyo puede hacer la diferencia.' 
        },
        { 
          text: 'Contarle a un adulto de confianza', 
          result: 'good', 
          explanation: '👍 ¡Muy bien! Los adultos pueden ayudar a manejar estas situaciones.' 
        }
      ]
    }
  ];

  const socialTips = [
    {
      icon: '🔒',
      title: 'Configuración de Privacidad',
      description: 'Revisa y ajusta tu configuración de privacidad regularmente. No todo el mundo necesita ver tus publicaciones.'
    },
    {
      icon: '🤔',
      title: 'Piensa Antes de Publicar',
      description: 'Pregúntate: ¿Estaría cómodo si mis padres, profesores o futuros empleadores vieran esto?'
    },
    {
      icon: '👥',
      title: 'Amigos Reales',
      description: 'Solo acepta solicitudes de amistad de personas que conoces en la vida real.'
    },
    {
      icon: '🚨',
      title: 'Reportar Problemas',
      description: 'Si ves cyberbullying o contenido inapropiado, no dudes en reportarlo a la plataforma.'
    }
  ];

  const handleActionSelect = (actionIndex) => {
    if (showResult) return;
    
    setSelectedAction(actionIndex);
    setShowResult(true);
    
    // Store result for final score
    const scenario = socialScenarios[currentScenario];
    const action = scenario.actions[actionIndex];
    const newResult = {
      scenario: currentScenario,
      result: action.result
    };
    
    setScenarioResults([...scenarioResults, newResult]);
  };

  const nextScenario = () => {
    if (currentScenario < socialScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAction(null);
      setShowResult(false);
    } else {
      // Show final results
      calculateFinalScore();
    }
  };

  const calculateFinalScore = () => {
    // Implementation for final scoring would go here
    console.log('Final results:', scenarioResults);
  };

  const resetScenarios = () => {
    setCurrentScenario(0);
    setSelectedAction(null);
    setShowResult(false);
    setScenarioResults([]);
  };

  const getCurrentScenario = () => socialScenarios[currentScenario];

  const getResultClass = (result) => {
    switch (result) {
      case 'best': return 'result-best';
      case 'good': return 'result-good';
      case 'poor': return 'result-poor';
      case 'danger': return 'result-danger';
      default: return '';
    }
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
          <h2>📱 Redes Sociales Seguras</h2>
          <p>Aprende a navegar las redes sociales de forma segura y responsable</p>
        </motion.div>

        <div className="social-content">
          {/* Interactive Scenarios */}
          <motion.div
            className="scenarios-section"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="scenario-header">
              <h3>🎯 Situaciones Reales</h3>
              <div className="scenario-progress">
                Escenario {currentScenario + 1} de {socialScenarios.length}
              </div>
            </div>

            <div className="scenario-card">
              <div className="scenario-visual">
                <div className="scenario-icon">{getCurrentScenario().image}</div>
                <h4>{getCurrentScenario().title}</h4>
              </div>
              
              <div className="scenario-description">
                <p>{getCurrentScenario().description}</p>
              </div>

              <div className="scenario-question">
                <h5>¿Qué harías en esta situación?</h5>
                <div className="action-options">
                  {getCurrentScenario().actions.map((action, index) => (
                    <motion.button
                      key={index}
                      className={`action-option ${
                        selectedAction === index ? getResultClass(action.result) : ''
                      }`}
                      onClick={() => handleActionSelect(index)}
                      disabled={showResult}
                      whileHover={{ scale: showResult ? 1 : 1.02 }}
                      whileTap={{ scale: showResult ? 1 : 0.98 }}
                    >
                      <span className="action-text">{action.text}</span>
                      {showResult && selectedAction === index && (
                        <span className="action-result">
                          {action.result === 'best' && '✅'}
                          {action.result === 'good' && '👍'}
                          {action.result === 'poor' && '⚠️'}
                          {action.result === 'danger' && '❌'}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {showResult && (
                <motion.div
                  className="scenario-result"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="result-explanation">
                    <p>{getCurrentScenario().actions[selectedAction].explanation}</p>
                  </div>
                  
                  <button onClick={nextScenario} className="next-scenario-btn">
                    {currentScenario < socialScenarios.length - 1 ? 'Siguiente Escenario' : 'Finalizar'} →
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Privacy Settings Guide */}
          <motion.div
            className="privacy-guide"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>🔧 Configuración de Privacidad</h3>
            
            <div className="privacy-steps">
              <div className="privacy-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Perfil Privado</h4>
                  <p>Configura tu cuenta como privada para que solo tus amigos puedan ver tus publicaciones.</p>
                </div>
              </div>

              <div className="privacy-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Información Personal</h4>
                  <p>No compartas tu número de teléfono, dirección o ubicación en tiempo real.</p>
                </div>
              </div>

              <div className="privacy-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Fotos y Etiquetas</h4>
                  <p>Controla quién puede etiquetarte y revisa las fotos antes de que aparezcan en tu perfil.</p>
                </div>
              </div>

              <div className="privacy-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Mensajes</h4>
                  <p>Configura los mensajes para que solo los amigos puedan escribirte directamente.</p>
                </div>
              </div>
            </div>

            <div className="privacy-checklist">
              <h4>✅ Lista de Verificación</h4>
              <div className="checklist-items">
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Mi perfil está configurado como privado</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>Solo mis amigos pueden ver mis publicaciones</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>He revisado quién puede enviarme mensajes</span>
                </label>
                <label className="checklist-item">
                  <input type="checkbox" />
                  <span>No comparto mi ubicación automáticamente</span>
                </label>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media Tips */}
        <motion.div
          className="social-tips"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>💡 Consejos para Redes Sociales</h3>
          <div className="tips-grid">
            {socialTips.map((tip, index) => (
              <motion.div
                key={index}
                className="tip-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="tip-icon">{tip.icon}</div>
                <h4>{tip.title}</h4>
                <p>{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Digital Footprint */}
        <motion.div
          className="digital-footprint"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>👣 Tu Huella Digital</h3>
          <div className="footprint-content">
            <div className="footprint-visual">
              <div className="footprint-icon">👣</div>
              <p>Todo lo que publicas en internet deja una huella permanente</p>
            </div>
            <div className="footprint-examples">
              <h4>Recuerda que tu huella digital incluye:</h4>
              <ul>
                <li>🖼️ Fotos y videos que publicas o en los que te etiquetan</li>
                <li>💭 Comentarios y mensajes públicos</li>
                <li>👍 "Me gusta" y reacciones a publicaciones</li>
                <li>📍 Ubicaciones que compartes</li>
                <li>🔍 Búsquedas y actividad online</li>
              </ul>
            </div>
          </div>
          
          <div className="footprint-tip">
            <p><strong>Consejo importante:</strong> Antes de publicar algo, pregúntate: ¿Estaría cómodo si mis padres, profesores o futuros empleadores vieran esto en 5 años?</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialSection;