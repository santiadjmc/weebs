import { useState } from 'react';
import { motion } from 'framer-motion';
import './PrivacySection.css';

const PrivacySection = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'friends',
    personalInfo: 'private',
    locationSharing: false,
    dataCollection: 'minimal',
    ads: 'limited',
    twoFactor: false
  });

  const [simulatorStep, setSimulatorStep] = useState(0);
  const [privacyScore, setPrivacyScore] = useState(0);

  const privacyOptions = {
    profileVisibility: {
      title: '👤 Visibilidad del Perfil',
      description: '¿Quién puede ver tu perfil completo?',
      options: [
        { value: 'public', label: 'Público', score: 0, risk: 'alto' },
        { value: 'friends', label: 'Solo Amigos', score: 20, risk: 'medio' },
        { value: 'private', label: 'Solo Yo', score: 25, risk: 'bajo' }
      ]
    },
    personalInfo: {
      title: '📞 Información Personal',
      description: '¿Qué información personal es visible?',
      options: [
        { value: 'all', label: 'Toda mi información', score: 0, risk: 'alto' },
        { value: 'some', label: 'Solo nombre y foto', score: 15, risk: 'medio' },
        { value: 'private', label: 'Nada personal', score: 25, risk: 'bajo' }
      ]
    },
    locationSharing: {
      title: '📍 Compartir Ubicación',
      description: '¿Permites que las apps sepan dónde estás?',
      options: [
        { value: true, label: 'Siempre activa', score: 0, risk: 'alto' },
        { value: false, label: 'Solo cuando necesario', score: 25, risk: 'bajo' }
      ]
    },
    dataCollection: {
      title: '📊 Recopilación de Datos',
      description: '¿Cuántos datos pueden recopilar las empresas?',
      options: [
        { value: 'full', label: 'Todos mis datos', score: 0, risk: 'alto' },
        { value: 'some', label: 'Solo lo necesario', score: 15, risk: 'medio' },
        { value: 'minimal', label: 'Lo mínimo indispensable', score: 25, risk: 'bajo' }
      ]
    }
  };

  const privacyTips = [
    {
      icon: '🔐',
      title: 'Contraseñas Únicas',
      description: 'Usa contraseñas diferentes para cada cuenta importante',
      importance: 'crítico'
    },
    {
      icon: '🔒',
      title: 'Verificación en Dos Pasos',
      description: 'Activa la autenticación de dos factores donde sea posible',
      importance: 'crítico'
    },
    {
      icon: '👥',
      title: 'Revisa tus Contactos',
      description: 'Periódicamente revisa quién tiene acceso a tu información',
      importance: 'importante'
    },
    {
      icon: '🕵️',
      title: 'Modo Incógnito',
      description: 'Usa modo privado para búsquedas sensibles',
      importance: 'útil'
    },
    {
      icon: '📱',
      title: 'Permisos de Apps',
      description: 'Revisa qué permisos das a cada aplicación',
      importance: 'importante'
    },
    {
      icon: '🚫',
      title: 'Bloquea Anuncios',
      description: 'Usa bloqueadores para reducir el rastreo publicitario',
      importance: 'útil'
    }
  ];

  const handleSettingChange = (setting, value) => {
    const newSettings = { ...privacySettings, [setting]: value };
    setPrivacySettings(newSettings);
    calculatePrivacyScore(newSettings);
  };

  const calculatePrivacyScore = (settings) => {
    let score = 0;
    
    Object.keys(settings).forEach(key => {
      if (privacyOptions[key]) {
        const option = privacyOptions[key].options.find(opt => 
          opt.value === settings[key]
        );
        if (option) score += option.score;
      }
    });

    // Add bonus points for two-factor auth
    if (settings.twoFactor) score += 25;
    
    setPrivacyScore(Math.min(score, 100));
  };

  const getPrivacyLevel = () => {
    if (privacyScore >= 80) return { level: 'Excelente', color: 'var(--success-color)', icon: '🛡️' };
    if (privacyScore >= 60) return { level: 'Bueno', color: 'var(--cyber-blue)', icon: '👍' };
    if (privacyScore >= 40) return { level: 'Regular', color: 'var(--warning-color)', icon: '⚠️' };
    return { level: 'Necesita Mejoras', color: 'var(--danger-color)', icon: '🚨' };
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'alto': return 'var(--danger-color)';
      case 'medio': return 'var(--warning-color)';
      case 'bajo': return 'var(--success-color)';
      default: return 'var(--text-secondary)';
    }
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
          <h2>🛡️ Privacidad Online</h2>
          <p>Aprende a proteger tu información personal en el mundo digital</p>
        </motion.div>

        <div className="privacy-content">
          {/* Privacy Settings Simulator */}
          <motion.div
            className="privacy-simulator"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="simulator-header">
              <h3>🔧 Simulador de Configuración</h3>
              <p>Configura tus ajustes de privacidad y ve tu puntuación</p>
            </div>

            <div className="privacy-score-display">
              <div className="score-circle">
                <span className="score-number">{privacyScore}</span>
                <span className="score-label">puntos</span>
              </div>
              <div className="score-info">
                <div 
                  className="privacy-level"
                  style={{ color: getPrivacyLevel().color }}
                >
                  {getPrivacyLevel().icon} {getPrivacyLevel().level}
                </div>
                <p>Tu nivel de privacidad actual</p>
              </div>
            </div>

            <div className="privacy-settings">
              {Object.entries(privacyOptions).map(([key, setting]) => (
                <div key={key} className="setting-group">
                  <h4>{setting.title}</h4>
                  <p>{setting.description}</p>
                  <div className="setting-options">
                    {setting.options.map((option) => (
                      <label
                        key={option.value}
                        className={`setting-option ${
                          privacySettings[key] === option.value ? 'selected' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name={key}
                          value={option.value}
                          checked={privacySettings[key] === option.value}
                          onChange={() => handleSettingChange(key, option.value)}
                        />
                        <span className="option-content">
                          <span className="option-label">{option.label}</span>
                          <span 
                            className="risk-indicator"
                            style={{ color: getRiskColor(option.risk) }}
                          >
                            Riesgo: {option.risk}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Two-Factor Authentication Toggle */}
              <div className="setting-group">
                <h4>🔐 Verificación en Dos Pasos</h4>
                <p>¿Tienes activada la autenticación de dos factores?</p>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={privacySettings.twoFactor}
                    onChange={(e) => handleSettingChange('twoFactor', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">
                    {privacySettings.twoFactor ? 'Activada ✅' : 'Desactivada ❌'}
                  </span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Privacy Tips */}
          <motion.div
            className="privacy-tips-panel"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>💡 Consejos de Privacidad</h3>
            <div className="tips-list">
              {privacyTips.map((tip, index) => (
                <motion.div
                  key={index}
                  className={`tip-item ${tip.importance}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="tip-icon">{tip.icon}</div>
                  <div className="tip-content">
                    <h4>{tip.title}</h4>
                    <p>{tip.description}</p>
                    <span className={`importance-badge ${tip.importance}`}>
                      {tip.importance}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Data Types Information */}
        <motion.div
          className="data-types"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>📊 Tipos de Datos que Recopilan</h3>
          <div className="data-grid">
            <div className="data-category sensitive">
              <div className="category-header">
                <span className="category-icon">🚨</span>
                <h4>Datos Sensibles</h4>
              </div>
              <ul>
                <li>📍 Ubicación en tiempo real</li>
                <li>💳 Información financiera</li>
                <li>🏥 Datos médicos</li>
                <li>🔑 Contraseñas</li>
              </ul>
            </div>

            <div className="data-category personal">
              <div className="category-header">
                <span className="category-icon">👤</span>
                <h4>Datos Personales</h4>
              </div>
              <ul>
                <li>📧 Direcciones de email</li>
                <li>📞 Números de teléfono</li>
                <li>🎂 Fecha de nacimiento</li>
                <li>🏠 Dirección física</li>
              </ul>
            </div>

            <div className="data-category behavioral">
              <div className="category-header">
                <span className="category-icon">📈</span>
                <h4>Datos de Comportamiento</h4>
              </div>
              <ul>
                <li>🔍 Historial de búsquedas</li>
                <li>🌐 Sitios web visitados</li>
                <li>🛒 Compras realizadas</li>
                <li>⏱️ Tiempo en apps</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Privacy Action Plan */}
        <motion.div
          className="action-plan"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>📋 Plan de Acción para tu Privacidad</h3>
          <div className="plan-steps">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Audita tus Cuentas</h4>
                <p>Revisa todas tus cuentas en redes sociales y servicios online</p>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Actualiza Configuraciones</h4>
                <p>Cambia la configuración de privacidad en todas tus cuentas</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Elimina Datos Innecesarios</h4>
                <p>Borra publicaciones antiguas y información que ya no necesitas compartir</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Monitorea Regularmente</h4>
                <p>Revisa tus configuraciones cada 3 meses</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacySection;