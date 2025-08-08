import { useState } from 'react';
import { motion } from 'framer-motion';
import './DeviceSection.css';

const DeviceSection = () => {
  const [currentDevice, setCurrentDevice] = useState('phone');
  const [deviceTipIndex, setDeviceTipIndex] = useState(0);

  const deviceTypes = {
    phone: {
      name: 'Teléfono Móvil',
      icon: '📱',
      risks: [
        'Aplicaciones maliciosas',
        'Redes WiFi públicas inseguras',
        'Pérdida o robo del dispositivo',
        'Permisos excesivos de apps'
      ],
      tips: [
        'Usa códigos PIN o biométricos',
        'Descarga apps solo de tiendas oficiales',
        'Mantén el sistema actualizado',
        'Revisa los permisos de las apps regularmente'
      ]
    },
    laptop: {
      name: 'Computadora/Laptop',
      icon: '💻',
      risks: [
        'Malware y virus',
        'Phishing por email',
        'Robo de contraseñas',
        'Acceso no autorizado'
      ],
      tips: [
        'Instala y actualiza un antivirus',
        'Usa contraseñas seguras',
        'Haz copias de seguridad regulares',
        'No descargues software de sitios sospechosos'
      ]
    },
    tablet: {
      name: 'Tablet',
      icon: '🖥️',
      risks: [
        'Apps no verificadas',
        'Conexiones inseguras',
        'Pérdida de privacidad',
        'Contenido inapropiado'
      ],
      tips: [
        'Configura controles parentales',
        'Usa redes seguras',
        'Controla las descargas',
        'Supervisa el tiempo de uso'
      ]
    },
    smart: {
      name: 'Dispositivos Inteligentes',
      icon: '🏠',
      risks: [
        'Espionaje a través de micrófonos',
        'Acceso a cámaras',
        'Datos personales expuestos',
        'Red doméstica comprometida'
      ],
      tips: [
        'Cambia contraseñas por defecto',
        'Actualiza firmware regularmente',
        'Revisa configuración de privacidad',
        'Desconecta cuando no uses'
      ]
    }
  };

  const securityChecklist = [
    {
      category: 'Contraseñas y Autenticación',
      items: [
        'Usar contraseñas únicas y fuertes',
        'Activar autenticación de dos factores',
        'No guardar contraseñas en navegadores públicos',
        'Cambiar contraseñas periódicamente'
      ]
    },
    {
      category: 'Software y Actualizaciones',
      items: [
        'Mantener sistema operativo actualizado',
        'Instalar solo software de fuentes confiables',
        'Usar antivirus actualizado',
        'Revisar y desinstalar programas innecesarios'
      ]
    },
    {
      category: 'Redes y Conexiones',
      items: [
        'Evitar WiFi público para actividades sensibles',
        'Usar VPN cuando sea necesario',
        'Verificar certificados de sitios web',
        'Desactivar Bluetooth cuando no se use'
      ]
    },
    {
      category: 'Datos y Privacidad',
      items: [
        'Hacer copias de seguridad regulares',
        'Revisar configuración de privacidad',
        'No compartir información personal fácilmente',
        'Eliminar datos antes de vender/regalar dispositivos'
      ]
    }
  ];

  const emergencySteps = [
    {
      title: '🚨 Si sospechas que tu dispositivo está comprometido',
      steps: [
        'Desconéctalo inmediatamente de internet',
        'Cambia todas las contraseñas importantes',
        'Ejecuta un análisis completo de antivirus',
        'Contacta a un adulto de confianza'
      ]
    },
    {
      title: '📱 Si pierdes tu teléfono',
      steps: [
        'Usa "Buscar mi dispositivo" desde otro equipo',
        'Bloquea el dispositivo remotamente',
        'Cambia contraseñas de cuentas importantes',
        'Contacta a tu operador móvil'
      ]
    },
    {
      title: '💻 Si tu computadora actúa de forma extraña',
      steps: [
        'No ingreses información personal',
        'Ejecuta un análisis de malware',
        'Verifica procesos y programas inusuales',
        'Considera restaurar a un punto anterior'
      ]
    }
  ];

  const getDeviceColor = (device) => {
    const colors = {
      phone: 'var(--cyber-blue)',
      laptop: 'var(--cyber-purple)',
      tablet: 'var(--cyber-green)',
      smart: 'var(--cyber-orange)'
    };
    return colors[device] || 'var(--cyber-blue)';
  };

  return (
    <section id="devices" className="device-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>💻 Uso Responsable de Dispositivos</h2>
          <p>Aprende a usar tus dispositivos de forma segura y responsable</p>
        </motion.div>

        {/* Device Selector */}
        <motion.div
          className="device-selector"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3>Selecciona tu dispositivo</h3>
          <div className="device-tabs">
            {Object.entries(deviceTypes).map(([key, device]) => (
              <button
                key={key}
                className={`device-tab ${currentDevice === key ? 'active' : ''}`}
                onClick={() => setCurrentDevice(key)}
                style={{
                  '--device-color': getDeviceColor(key)
                }}
              >
                <span className="device-icon">{device.icon}</span>
                <span className="device-name">{device.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Device Information */}
        <motion.div
          className="device-info"
          key={currentDevice}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="device-content">
            <div className="device-risks">
              <h4>⚠️ Principales Riesgos</h4>
              <ul>
                {deviceTypes[currentDevice].risks.map((risk, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {risk}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="device-tips">
              <h4>✅ Consejos de Seguridad</h4>
              <ul>
                {deviceTypes[currentDevice].tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Security Checklist */}
        <motion.div
          className="security-checklist"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>🔒 Lista de Verificación de Seguridad</h3>
          <div className="checklist-grid">
            {securityChecklist.map((category, categoryIndex) => (
              <div key={categoryIndex} className="checklist-category">
                <h4>{category.category}</h4>
                <div className="checklist-items">
                  {category.items.map((item, itemIndex) => (
                    <label key={itemIndex} className="checklist-item">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      <span className="item-text">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Response */}
        <motion.div
          className="emergency-response"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>🚨 Qué Hacer en Emergencias</h3>
          <div className="emergency-scenarios">
            {emergencySteps.map((scenario, index) => (
              <div key={index} className="emergency-scenario">
                <h4>{scenario.title}</h4>
                <ol>
                  {scenario.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Digital Wellness */}
        <motion.div
          className="digital-wellness"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>🌱 Bienestar Digital</h3>
          <div className="wellness-content">
            <div className="wellness-tips">
              <h4>Consejos para un uso saludable:</h4>
              <ul>
                <li>⏰ Establece límites de tiempo de pantalla</li>
                <li>💤 No uses dispositivos antes de dormir</li>
                <li>👁️ Descansa la vista cada 20 minutos</li>
                <li>🏃 Toma descansos activos regularmente</li>
                <li>👨‍👩‍👧‍👦 Mantén interacciones cara a cara</li>
                <li>🌿 Dedica tiempo a actividades offline</li>
              </ul>
            </div>

            <div className="time-management">
              <h4>⏱️ Gestión del Tiempo</h4>
              <div className="time-tips">
                <div className="time-tip">
                  <span className="tip-icon">📚</span>
                  <div>
                    <strong>Estudios/Trabajo:</strong>
                    <p>Usa técnicas como Pomodoro para mantener el foco</p>
                  </div>
                </div>
                <div className="time-tip">
                  <span className="tip-icon">🎮</span>
                  <div>
                    <strong>Entretenimiento:</strong>
                    <p>Define horarios específicos para juegos y redes sociales</p>
                  </div>
                </div>
                <div className="time-tip">
                  <span className="tip-icon">😴</span>
                  <div>
                    <strong>Descanso:</strong>
                    <p>Desconéctate al menos 1 hora antes de dormir</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final Call to Action */}
        <motion.div
          className="final-cta"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <h3>🎉 ¡Felicidades, Ciber-Héroe!</h3>
          <p>
            Has completado tu entrenamiento en ciberseguridad. Ahora tienes las herramientas 
            necesarias para navegar el mundo digital de forma segura y responsable.
          </p>
          <div className="achievement-badges">
            <div className="badge">🔐 Experto en Contraseñas</div>
            <div className="badge">🎣 Detector de Phishing</div>
            <div className="badge">📱 Guardián de Redes Sociales</div>
            <div className="badge">🛡️ Protector de Privacidad</div>
            <div className="badge">💻 Usuario Responsable</div>
          </div>
          <button className="restart-journey">
            🚀 Repasar el Entrenamiento
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default DeviceSection;