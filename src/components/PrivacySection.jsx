import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './PrivacySection.css';

const PrivacySection = () => {
  const [activeScenario, setActiveScenario] = useState(0);
  const [privacyScore, setPrivacyScore] = useState(0);
  const [completedChecks, setCompletedChecks] = useState([]);

  const privacyScenarios = [
    {
      title: "Información Personal",
      icon: "👤",
      description: "¿Qué datos personales es seguro compartir?",
      safeToShare: [
        "Tu nombre de pila",
        "Tus hobbies e intereses",
        "Tu edad aproximada (ej: adolescente)",
        "Tu ciudad (sin dirección exacta)"
      ],
      neverShare: [
        "Tu dirección completa",
        "Número de teléfono personal",
        "Información de tarjetas de crédito",
        "Contraseñas",
        "Número de documento de identidad",
        "Ubicación en tiempo real"
      ],
      tips: [
        "Usa configuraciones de privacidad estrictas",
        "Piensa dos veces antes de subir fotos",
        "No compartas planes de viaje en tiempo real",
        "Evita mostrar objetos de valor en fotos"
      ]
    },
    {
      title: "Configuraciones de Privacidad",
      icon: "⚙️",
      description: "Configuraciones esenciales para proteger tu privacidad",
      platforms: [
        {
          name: "Google/Gmail",
          settings: [
            "Activar verificación en dos pasos",
            "Revisar aplicaciones con acceso a tu cuenta",
            "Configurar historial de ubicaciones",
            "Gestionar datos de publicidad"
          ]
        },
        {
          name: "Smartphone",
          settings: [
            "Desactivar ubicación para apps innecesarias",
            "Limitar acceso a cámara y micrófono",
            "Configurar permisos de apps",
            "Activar bloqueo de pantalla seguro"
          ]
        },
        {
          name: "Navegador",
          settings: [
            "Usar modo incógnito para búsquedas sensibles",
            "Bloquear cookies de terceros",
            "Desactivar autocompletado de formularios",
            "Usar extensiones de privacidad"
          ]
        }
      ]
    },
    {
      title: "Identidad Digital",
      icon: "🎭",
      description: "Cómo manejar tu identidad en línea de forma segura",
      concepts: [
        {
          title: "Separación de Identidades",
          description: "Usa diferentes perfiles para diferentes propósitos",
          examples: [
            "Perfil personal solo para familia y amigos cercanos",
            "Perfil académico para escuela y proyectos educativos",
            "Considera seudónimos para foros o comunidades"
          ]
        },
        {
          title: "Gestión de Reputación",
          description: "Tu presencia online puede afectar tu futuro",
          actions: [
            "Busca tu nombre en Google periódicamente",
            "Configura alertas de tu nombre",
            "Elimina contenido inapropiado del pasado",
            "Construye una presencia digital positiva"
          ]
        }
      ]
    }
  ];

  const privacyChecklist = [
    {
      id: 1,
      category: "Redes Sociales",
      item: "Configuré mi perfil como privado",
      points: 10
    },
    {
      id: 2,
      category: "Redes Sociales",
      item: "Revisé mi lista de amigos/seguidores",
      points: 10
    },
    {
      id: 3,
      category: "Redes Sociales",
      item: "Desactivé ubicación en publicaciones",
      points: 15
    },
    {
      id: 4,
      category: "Dispositivos",
      item: "Activé bloqueo de pantalla",
      points: 15
    },
    {
      id: 5,
      category: "Dispositivos",
      item: "Revisé permisos de aplicaciones",
      points: 10
    },
    {
      id: 6,
      category: "Cuentas",
      item: "Activé verificación en dos pasos",
      points: 20
    },
    {
      id: 7,
      category: "Cuentas",
      item: "Revisé dispositivos conectados",
      points: 10
    },
    {
      id: 8,
      category: "Navegación",
      item: "Configuré navegador para mayor privacidad",
      points: 10
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScenario((prev) => (prev + 1) % privacyScenarios.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [privacyScenarios.length]);

  useEffect(() => {
    const totalPoints = completedChecks.reduce((sum, checkId) => {
      const check = privacyChecklist.find(item => item.id === checkId);
      return sum + (check ? check.points : 0);
    }, 0);
    setPrivacyScore(totalPoints);
  }, [completedChecks, privacyChecklist]);

  const handleChecklistToggle = (checkId) => {
    setCompletedChecks(prev => 
      prev.includes(checkId) 
        ? prev.filter(id => id !== checkId)
        : [...prev, checkId]
    );
  };

  const getScoreLevel = (score) => {
    if (score >= 80) return { level: "Experto en Privacidad", color: "var(--cyber-green)", emoji: "🛡️" };
    if (score >= 60) return { level: "Buen Nivel", color: "var(--cyber-blue)", emoji: "💪" };
    if (score >= 40) return { level: "En Progreso", color: "var(--cyber-orange)", emoji: "📚" };
    return { level: "Principiante", color: "var(--danger-color)", emoji: "🌱" };
  };

  return (
    <section id="privacy" className="privacy-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>🔒 Protección de Privacidad</h2>
          <p>Aprende a proteger tu información personal y controlar tu huella digital</p>
        </motion.div>

        {/* Privacy Score Dashboard */}
        <motion.div
          className="privacy-dashboard"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{privacyScore}</span>
              <span className="score-total">/100</span>
            </div>
            <div className="score-info">
              <h3>Tu Puntuación de Privacidad</h3>
              <div className="score-level" style={{ color: getScoreLevel(privacyScore).color }}>
                {getScoreLevel(privacyScore).emoji} {getScoreLevel(privacyScore).level}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Scenarios */}
        <motion.div
          className="scenarios-section"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="scenarios-nav">
            {privacyScenarios.map((scenario, index) => (
              <button
                key={index}
                className={`scenario-tab ${activeScenario === index ? 'active' : ''}`}
                onClick={() => setActiveScenario(index)}
              >
                <span className="tab-icon">{scenario.icon}</span>
                <span className="tab-text">{scenario.title}</span>
              </button>
            ))}
          </div>

          <div className="scenario-content">
            <motion.div
              key={activeScenario}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="active-scenario"
            >
              <h3>{privacyScenarios[activeScenario].title}</h3>
              <p className="scenario-description">{privacyScenarios[activeScenario].description}</p>

              {/* Personal Information Scenario */}
              {activeScenario === 0 && (
                <div className="info-sharing-guide">
                  <div className="sharing-columns">
                    <div className="safe-column">
                      <h4>✅ Seguro de Compartir</h4>
                      <ul>
                        {privacyScenarios[activeScenario].safeToShare.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="danger-column">
                      <h4>❌ Nunca Compartir</h4>
                      <ul>
                        {privacyScenarios[activeScenario].neverShare.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="privacy-tips">
                    <h4>💡 Consejos de Privacidad</h4>
                    <div className="tips-grid">
                      {privacyScenarios[activeScenario].tips.map((tip, index) => (
                        <div key={index} className="tip-card">
                          <span className="tip-icon">🔐</span>
                          <span className="tip-text">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Scenario */}
              {activeScenario === 1 && (
                <div className="settings-guide">
                  <div className="platforms-list">
                    {privacyScenarios[activeScenario].platforms.map((platform, index) => (
                      <motion.div
                        key={index}
                        className="platform-settings"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        <h4>🔧 {platform.name}</h4>
                        <ul className="settings-checklist">
                          {platform.settings.map((setting, settingIndex) => (
                            <li key={settingIndex} className="setting-item">
                              <input
                                type="checkbox"
                                id={`${index}-${settingIndex}`}
                                className="setting-checkbox"
                              />
                              <label htmlFor={`${index}-${settingIndex}`}>
                                {setting}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Digital Identity Scenario */}
              {activeScenario === 2 && (
                <div className="identity-guide">
                  {privacyScenarios[activeScenario].concepts.map((concept, index) => (
                    <motion.div
                      key={index}
                      className="concept-card"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <h4>{concept.title}</h4>
                      <p>{concept.description}</p>
                      
                      {concept.examples && (
                        <div className="examples-section">
                          <h5>📋 Ejemplos:</h5>
                          <ul>
                            {concept.examples.map((example, exampleIndex) => (
                              <li key={exampleIndex}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {concept.actions && (
                        <div className="actions-section">
                          <h5>🎯 Acciones:</h5>
                          <ul>
                            {concept.actions.map((action, actionIndex) => (
                              <li key={actionIndex}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Privacy Checklist */}
        <motion.div
          className="checklist-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>📋 Lista de Verificación de Privacidad</h3>
          <p>Completa estas tareas para mejorar tu puntuación de privacidad:</p>
          
          <div className="checklist-grid">
            {Object.entries(
              privacyChecklist.reduce((groups, item) => {
                if (!groups[item.category]) groups[item.category] = [];
                groups[item.category].push(item);
                return groups;
              }, {})
            ).map(([category, items]) => (
              <div key={category} className="checklist-category">
                <h4>{category}</h4>
                <div className="checklist-items">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      className={`checklist-item ${completedChecks.includes(item.id) ? 'completed' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: item.id * 0.05 }}
                    >
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={completedChecks.includes(item.id)}
                          onChange={() => handleChecklistToggle(item.id)}
                        />
                        <span className="checkmark"></span>
                        <span className="item-text">{item.item}</span>
                        <span className="item-points">+{item.points}</span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy Resources */}
        <motion.div
          className="resources-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>🔗 Recursos Útiles</h3>
          <div className="resources-grid">
            <div className="resource-card">
              <h4>🛡️ Herramientas de Privacidad</h4>
              <ul>
                <li>Navegadores seguros (Firefox, Brave)</li>
                <li>VPN para conexiones seguras</li>
                <li>Gestores de contraseñas</li>
                <li>Extensiones de bloqueo de rastreadores</li>
              </ul>
            </div>
            
            <div className="resource-card">
              <h4>📚 Aprende Más</h4>
              <ul>
                <li>Guías de configuración de privacidad</li>
                <li>Cursos gratuitos de ciberseguridad</li>
                <li>Blogs especializados en privacidad</li>
                <li>Comunidades de seguridad digital</li>
              </ul>
            </div>
            
            <div className="resource-card">
              <h4>🆘 Ayuda y Soporte</h4>
              <ul>
                <li>Centros de ayuda de plataformas</li>
                <li>Líneas de reporte de incidentes</li>
                <li>Organizaciones de derechos digitales</li>
                <li>Consultores de privacidad</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacySection;