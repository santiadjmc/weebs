import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './DevicesSection.css';

const DevicesSection = () => {
  const [activeDevice, setActiveDevice] = useState(0);
  const [securityChecklist, setSecurityChecklist] = useState({});
  const [threatSimulation, setThreatSimulation] = useState({ active: false, currentThreat: 0 });

  const devices = [
    {
      name: "Smartphone",
      icon: "📱",
      description: "Tu dispositivo más personal y vulnerable",
      threats: [
        "Apps maliciosas",
        "Redes WiFi públicas inseguras",
        "Pérdida o robo",
        "Acceso no autorizado a datos"
      ],
      protections: [
        {
          title: "Bloqueo de Pantalla",
          description: "Usa PIN, patrón, contraseña o biometría",
          importance: "Alto",
          steps: ["Configuración > Seguridad", "Elegir método de bloqueo", "Configurar tiempo de bloqueo automático"]
        },
        {
          title: "Permisos de Apps",
          description: "Controla qué datos pueden acceder las aplicaciones",
          importance: "Alto",
          steps: ["Configuración > Apps y permisos", "Revisar permisos por app", "Desactivar permisos innecesarios"]
        },
        {
          title: "Actualizaciones",
          description: "Mantén el sistema y apps actualizadas",
          importance: "Crítico",
          steps: ["Activar actualizaciones automáticas", "Revisar actualizaciones pendientes", "Instalar parches de seguridad"]
        },
        {
          title: "Ubicación y Privacidad",
          description: "Controla el seguimiento de ubicación",
          importance: "Medio",
          steps: ["Desactivar ubicación para apps innecesarias", "Usar ubicación precisa solo cuando sea necesario", "Revisar historial de ubicaciones"]
        }
      ]
    },
    {
      name: "Computadora",
      icon: "💻",
      description: "Tu centro de trabajo y estudio digital",
      threats: [
        "Malware y virus",
        "Ransomware",
        "Acceso remoto no autorizado",
        "Pérdida de datos"
      ],
      protections: [
        {
          title: "Antivirus y Antimalware",
          description: "Protección en tiempo real contra amenazas",
          importance: "Crítico",
          steps: ["Instalar antivirus confiable", "Activar protección en tiempo real", "Realizar escaneos regulares"]
        },
        {
          title: "Firewall",
          description: "Controla el tráfico de red entrante y saliente",
          importance: "Alto",
          steps: ["Activar firewall del sistema", "Configurar reglas básicas", "Monitorear conexiones sospechosas"]
        },
        {
          title: "Copias de Seguridad",
          description: "Respaldo regular de datos importantes",
          importance: "Alto",
          steps: ["Configurar backup automático", "Usar múltiples ubicaciones", "Probar restauración de datos"]
        },
        {
          title: "Navegación Segura",
          description: "Prácticas seguras para navegar en internet",
          importance: "Medio",
          steps: ["Usar navegadores actualizados", "Instalar bloqueadores de ads", "Verificar certificados SSL"]
        }
      ]
    },
    {
      name: "Router WiFi",
      icon: "📶",
      description: "La puerta de entrada a tu red doméstica",
      threats: [
        "Acceso no autorizado a la red",
        "Interceptación de datos",
        "Ataques man-in-the-middle",
        "Uso de la red para actividades ilegales"
      ],
      protections: [
        {
          title: "Contraseña del Router",
          description: "Cambiar credenciales predeterminadas",
          importance: "Crítico",
          steps: ["Acceder al panel de administración", "Cambiar usuario y contraseña por defecto", "Usar contraseña fuerte"]
        },
        {
          title: "Cifrado de Red",
          description: "Usar WPA3 o WPA2 para proteger la WiFi",
          importance: "Crítico",
          steps: ["Configurar WPA3 si está disponible", "Usar WPA2 como alternativa", "Evitar WEP o redes abiertas"]
        },
        {
          title: "Actualización de Firmware",
          description: "Mantener el software del router actualizado",
          importance: "Alto",
          steps: ["Verificar versión actual", "Descargar firmware oficial", "Instalar actualizaciones regularmente"]
        },
        {
          title: "Red de Invitados",
          description: "Separar dispositivos de visitantes",
          importance: "Medio",
          steps: ["Activar red de invitados", "Configurar contraseña diferente", "Limitar acceso a recursos locales"]
        }
      ]
    },
    {
      name: "Dispositivos IoT",
      icon: "🏠",
      description: "Dispositivos inteligentes del hogar",
      threats: [
        "Acceso no autorizado",
        "Espionaje a través de cámaras/micrófonos",
        "Uso en botnets",
        "Puerta de entrada a otros dispositivos"
      ],
      protections: [
        {
          title: "Contraseñas Únicas",
          description: "Cambiar credenciales predeterminadas",
          importance: "Crítico",
          steps: ["Identificar todos los dispositivos IoT", "Cambiar contraseñas por defecto", "Usar contraseñas únicas para cada dispositivo"]
        },
        {
          title: "Segmentación de Red",
          description: "Separar dispositivos IoT de la red principal",
          importance: "Alto",
          steps: ["Crear VLAN separada para IoT", "Configurar reglas de firewall", "Limitar comunicación entre redes"]
        },
        {
          title: "Actualizaciones Regulares",
          description: "Mantener firmware actualizado",
          importance: "Alto",
          steps: ["Verificar actualizaciones disponibles", "Configurar actualizaciones automáticas", "Monitorear boletines de seguridad"]
        },
        {
          title: "Monitoreo de Actividad",
          description: "Supervisar el comportamiento de los dispositivos",
          importance: "Medio",
          steps: ["Revisar logs del router", "Monitorear tráfico inusual", "Usar herramientas de monitoreo de red"]
        }
      ]
    }
  ];

  const threatSimulations = [
    {
      scenario: "Conexión WiFi Pública",
      description: "Estás en una cafetería y necesitas internet. Ves varias redes WiFi disponibles.",
      options: [
        "CafeLibre - Red abierta sin contraseña",
        "CafeWiFi_Secure - Red con contraseña en el menú",
        "Usar datos móviles en su lugar",
        "CafeGuest123 - Red que parece oficial"
      ],
      correct: 2,
      explanation: "Los datos móviles son más seguros que las redes WiFi públicas. Si debes usar WiFi público, usa una VPN y evita acceder a información sensible."
    },
    {
      scenario: "Descarga de Software",
      description: "Necesitas descargar un programa para tu computadora. ¿De dónde lo descargas?",
      options: [
        "De un sitio web de descargas gratuitas",
        "Del sitio web oficial del desarrollador",
        "De un enlace que te envió un amigo",
        "De la primera opción que aparece en Google"
      ],
      correct: 1,
      explanation: "Siempre descarga software del sitio oficial del desarrollador o de tiendas de aplicaciones confiables para evitar malware."
    },
    {
      scenario: "Dispositivo Perdido",
      description: "Has perdido tu smartphone con información personal importante. ¿Qué haces primero?",
      options: [
        "Esperar a ver si alguien lo encuentra",
        "Cambiar todas tus contraseñas desde otro dispositivo",
        "Usar la función de ubicación y bloqueo remoto",
        "Reportar a la policía inmediatamente"
      ],
      correct: 2,
      explanation: "Usar las funciones de 'Encontrar mi dispositivo' te permite localizarlo, bloquearlo y borrar datos remotamente si es necesario."
    }
  ];

  const handleChecklistToggle = (deviceIndex, protectionIndex) => {
    const key = `${deviceIndex}-${protectionIndex}`;
    setSecurityChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const startThreatSimulation = () => {
    setThreatSimulation({ active: true, currentThreat: 0 });
  };

  const handleThreatAnswer = (answerIndex) => {
    const isCorrect = answerIndex === threatSimulations[threatSimulation.currentThreat].correct;
    
    // Show result for 2 seconds, then move to next
    setTimeout(() => {
      if (threatSimulation.currentThreat < threatSimulations.length - 1) {
        setThreatSimulation(prev => ({ ...prev, currentThreat: prev.currentThreat + 1 }));
      } else {
        setThreatSimulation({ active: false, currentThreat: 0 });
        alert('¡Simulación completada! Has aprendido sobre diferentes amenazas de seguridad.');
      }
    }, 3000);

    return isCorrect;
  };

  const getSecurityScore = () => {
    const totalProtections = devices.reduce((sum, device) => sum + device.protections.length, 0);
    const completedProtections = Object.values(securityChecklist).filter(Boolean).length;
    return Math.round((completedProtections / totalProtections) * 100);
  };

  return (
    <section id="devices" className="devices-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>💻 Seguridad de Dispositivos</h2>
          <p>Protege todos tus dispositivos y mantén tus datos seguros</p>
        </motion.div>

        {/* Security Score */}
        <motion.div
          className="security-score"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="score-container">
            <div className="score-circle">
              <span className="score-value">{getSecurityScore()}%</span>
              <span className="score-label">Seguridad</span>
            </div>
            <div className="score-info">
              <h3>Nivel de Protección de tus Dispositivos</h3>
              <p>Completa las medidas de seguridad para mejorar tu puntuación</p>
            </div>
          </div>
        </motion.div>

        {/* Device Navigation */}
        <motion.div
          className="device-navigation"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {devices.map((device, index) => (
            <button
              key={index}
              className={`device-tab ${activeDevice === index ? 'active' : ''}`}
              onClick={() => setActiveDevice(index)}
            >
              <span className="device-icon">{device.icon}</span>
              <span className="device-name">{device.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Device Content */}
        <motion.div
          className="device-content"
          key={activeDevice}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="device-overview">
            <h3>
              <span className="device-icon-large">{devices[activeDevice].icon}</span>
              {devices[activeDevice].name}
            </h3>
            <p className="device-description">{devices[activeDevice].description}</p>

            {/* Threats */}
            <div className="threats-section">
              <h4>⚠️ Amenazas Comunes</h4>
              <div className="threats-grid">
                {devices[activeDevice].threats.map((threat, index) => (
                  <motion.div
                    key={index}
                    className="threat-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    🚨 {threat}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Protection Measures */}
          <div className="protections-section">
            <h4>🛡️ Medidas de Protección</h4>
            <div className="protections-grid">
              {devices[activeDevice].protections.map((protection, index) => (
                <motion.div
                  key={index}
                  className={`protection-card ${protection.importance.toLowerCase()}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="protection-header">
                    <h5>{protection.title}</h5>
                    <span className={`importance-badge ${protection.importance.toLowerCase()}`}>
                      {protection.importance}
                    </span>
                  </div>
                  
                  <p className="protection-description">{protection.description}</p>
                  
                  <div className="protection-steps">
                    <h6>Pasos a seguir:</h6>
                    <ol>
                      {protection.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="protection-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={securityChecklist[`${activeDevice}-${index}`] || false}
                        onChange={() => handleChecklistToggle(activeDevice, index)}
                      />
                      <span>Completado</span>
                    </label>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Threat Simulation */}
        <motion.div
          className="simulation-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {!threatSimulation.active ? (
            <div className="simulation-intro">
              <h3>🎮 Simulador de Amenazas</h3>
              <p>Pon a prueba tus conocimientos con escenarios reales de seguridad</p>
              <button className="simulation-btn" onClick={startThreatSimulation}>
                🚀 Iniciar Simulación
              </button>
            </div>
          ) : (
            <div className="simulation-game">
              <div className="simulation-header">
                <h3>Escenario {threatSimulation.currentThreat + 1} de {threatSimulations.length}</h3>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${((threatSimulation.currentThreat + 1) / threatSimulations.length) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="simulation-content">
                <h4>{threatSimulations[threatSimulation.currentThreat].scenario}</h4>
                <p>{threatSimulations[threatSimulation.currentThreat].description}</p>
                
                <div className="simulation-options">
                  {threatSimulations[threatSimulation.currentThreat].options.map((option, index) => (
                    <button
                      key={index}
                      className="simulation-option"
                      onClick={() => handleThreatAnswer(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          className="quick-tips-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>⚡ Consejos Rápidos</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🔒</div>
              <h4>Bloqueo Automático</h4>
              <p>Configura todos tus dispositivos para que se bloqueen automáticamente después de un período de inactividad</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">🔄</div>
              <h4>Actualizaciones</h4>
              <p>Mantén siempre tus dispositivos actualizados. Las actualizaciones incluyen importantes parches de seguridad</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">💾</div>
              <h4>Respaldos Regulares</h4>
              <p>Haz copias de seguridad regulares de tus datos importantes. Usa servicios en la nube y almacenamiento físico</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">🌐</div>
              <h4>Redes Seguras</h4>
              <p>Evita redes WiFi públicas para actividades sensibles. Usa VPN cuando sea necesario</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">🚫</div>
              <h4>Software Oficial</h4>
              <p>Descarga aplicaciones solo de tiendas oficiales y sitios web verificados</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">👁️</div>
              <h4>Monitoreo</h4>
              <p>Revisa regularmente la actividad de tus cuentas y dispositivos para detectar actividad sospechosa</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DevicesSection;