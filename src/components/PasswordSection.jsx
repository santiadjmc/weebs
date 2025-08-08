import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './PasswordSection.css';

const PasswordSection = () => {
  const [password, setPassword] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [showTips, setShowTips] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const passwordTips = [
    {
      title: "Longitud Mínima",
      description: "Usa al menos 12 caracteres",
      icon: "📏",
      example: "MiContraseñaSuperSegura123!"
    },
    {
      title: "Mezcla de Caracteres",
      description: "Combina mayúsculas, minúsculas, números y símbolos",
      icon: "🎭",
      example: "Casa#Verde$2024"
    },
    {
      title: "Evita Información Personal",
      description: "No uses tu nombre, fecha de nacimiento o datos personales",
      icon: "🚫",
      example: "❌ Ana2010 ✅ Luna&Sol*789"
    },
    {
      title: "Frases Memorables",
      description: "Usa frases que recuerdes fácilmente",
      icon: "💭",
      example: "MiGato#Come&Pescado!123"
    }
  ];

  const analyzePassword = (pwd) => {
    const analysis = {
      score: 0,
      feedback: [],
      strength: 'Muy Débil',
      color: 'var(--danger-color)'
    };

    // Length check
    if (pwd.length >= 12) {
      analysis.score += 25;
      analysis.feedback.push({ type: 'success', message: '✅ Longitud adecuada' });
    } else if (pwd.length >= 8) {
      analysis.score += 15;
      analysis.feedback.push({ type: 'warning', message: '⚠️ Mejor si es más larga' });
    } else {
      analysis.feedback.push({ type: 'error', message: '❌ Muy corta (mín. 8 caracteres)' });
    }

    // Character variety checks
    if (/[a-z]/.test(pwd)) {
      analysis.score += 15;
      analysis.feedback.push({ type: 'success', message: '✅ Contiene minúsculas' });
    } else {
      analysis.feedback.push({ type: 'error', message: '❌ Falta minúsculas' });
    }

    if (/[A-Z]/.test(pwd)) {
      analysis.score += 15;
      analysis.feedback.push({ type: 'success', message: '✅ Contiene mayúsculas' });
    } else {
      analysis.feedback.push({ type: 'error', message: '❌ Falta mayúsculas' });
    }

    if (/\d/.test(pwd)) {
      analysis.score += 15;
      analysis.feedback.push({ type: 'success', message: '✅ Contiene números' });
    } else {
      analysis.feedback.push({ type: 'error', message: '❌ Falta números' });
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      analysis.score += 15;
      analysis.feedback.push({ type: 'success', message: '✅ Contiene símbolos' });
    } else {
      analysis.feedback.push({ type: 'error', message: '❌ Falta símbolos (!@#$%...)' });
    }

    // No repeated characters
    if (!/(.)\1{2,}/.test(pwd)) {
      analysis.score += 10;
      analysis.feedback.push({ type: 'success', message: '✅ Sin repeticiones excesivas' });
    } else {
      analysis.feedback.push({ type: 'warning', message: '⚠️ Evita repetir caracteres' });
    }

    // Common patterns check
    const commonPatterns = ['123', 'abc', 'password', 'contraseña', 'qwerty'];
    const hasCommonPattern = commonPatterns.some(pattern => 
      pwd.toLowerCase().includes(pattern)
    );
    
    if (!hasCommonPattern) {
      analysis.score += 5;
      analysis.feedback.push({ type: 'success', message: '✅ Sin patrones comunes' });
    } else {
      analysis.score -= 10;
      analysis.feedback.push({ type: 'error', message: '❌ Evita patrones comunes' });
    }

    // Determine strength and color
    if (analysis.score >= 80) {
      analysis.strength = 'Muy Fuerte';
      analysis.color = 'var(--success-color)';
    } else if (analysis.score >= 60) {
      analysis.strength = 'Fuerte';
      analysis.color = 'var(--cyber-green)';
    } else if (analysis.score >= 40) {
      analysis.strength = 'Regular';
      analysis.color = 'var(--warning-color)';
    } else if (analysis.score >= 20) {
      analysis.strength = 'Débil';
      analysis.color = 'var(--cyber-orange)';
    }

    return analysis;
  };

  useEffect(() => {
    if (password) {
      const analysis = analyzePassword(password);
      setScore(analysis.score);
      setFeedback(analysis.feedback);
    } else {
      setScore(0);
      setFeedback([]);
    }
  }, [password]);

  const generatePassword = () => {
    const words = ['Luna', 'Sol', 'Mar', 'Viento', 'Estrella', 'Cielo', 'Tierra', 'Fuego'];
    const symbols = ['!', '@', '#', '$', '%', '&', '*'];
    const numbers = Math.floor(Math.random() * 1000);
    
    const word1 = words[Math.floor(Math.random() * words.length)];
    const word2 = words[Math.floor(Math.random() * words.length)];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    const generated = `${word1}${symbol}${word2}${numbers}`;
    setPassword(generated);
  };

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % passwordTips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + passwordTips.length) % passwordTips.length);
  };

  return (
    <section id="passwords" className="password-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>🔐 Contraseñas Seguras</h2>
          <p>Aprende a crear contraseñas super fuertes que protejan tus cuentas</p>
        </motion.div>

        <div className="password-content">
          {/* Password Tester Game */}
          <motion.div
            className="password-tester"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="tester-header">
              <h3>🎮 Probador de Contraseñas</h3>
              <p>Escribe una contraseña y ve qué tan segura es:</p>
            </div>

            <div className="password-input-container">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Escribe tu contraseña aquí..."
                className="password-input"
                aria-label="Campo para probar contraseña"
              />
              <button
                onClick={generatePassword}
                className="generate-btn"
                aria-label="Generar contraseña segura"
              >
                🎲 Generar
              </button>
            </div>

            {password && (
              <motion.div
                className="password-analysis"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                <div className="strength-meter">
                  <div className="meter-label">
                    Fuerza: <span style={{ color: analyzePassword(password).color }}>
                      {analyzePassword(password).strength}
                    </span>
                  </div>
                  <div className="meter-bar">
                    <div
                      className="meter-fill"
                      style={{
                        width: `${score}%`,
                        background: analyzePassword(password).color
                      }}
                    />
                  </div>
                  <div className="score-text">{score}/100 puntos</div>
                </div>

                <div className="feedback-list">
                  {feedback.map((item, index) => (
                    <motion.div
                      key={index}
                      className={`feedback-item ${item.type}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item.message}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Tips Carousel */}
          <motion.div
            className="tips-section"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="tips-header">
              <h3>💡 Consejos para Contraseñas Seguras</h3>
              <button
                onClick={() => setShowTips(!showTips)}
                className="tips-toggle"
                aria-label={showTips ? 'Ocultar consejos' : 'Mostrar consejos'}
              >
                {showTips ? '▼' : '▶'} {showTips ? 'Ocultar' : 'Ver'} Consejos
              </button>
            </div>

            {showTips && (
              <motion.div
                className="tips-carousel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                <div className="tip-card">
                  <div className="tip-icon">{passwordTips[currentTip].icon}</div>
                  <h4>{passwordTips[currentTip].title}</h4>
                  <p>{passwordTips[currentTip].description}</p>
                  <div className="tip-example">
                    <strong>Ejemplo:</strong> <code>{passwordTips[currentTip].example}</code>
                  </div>
                </div>

                <div className="carousel-controls">
                  <button onClick={prevTip} className="carousel-btn" aria-label="Consejo anterior">
                    ← Anterior
                  </button>
                  <div className="carousel-dots">
                    {passwordTips.map((_, index) => (
                      <button
                        key={index}
                        className={`dot ${index === currentTip ? 'active' : ''}`}
                        onClick={() => setCurrentTip(index)}
                        aria-label={`Ir al consejo ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button onClick={nextTip} className="carousel-btn" aria-label="Siguiente consejo">
                    Siguiente →
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Best Practices */}
        <motion.div
          className="best-practices"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>🌟 Mejores Prácticas</h3>
          <div className="practices-grid">
            <div className="practice-item">
              <div className="practice-icon">🔄</div>
              <h4>Cambia Regularmente</h4>
              <p>Actualiza tus contraseñas cada 3-6 meses</p>
            </div>
            <div className="practice-item">
              <div className="practice-icon">🚫</div>
              <h4>Una por Cuenta</h4>
              <p>Nunca uses la misma contraseña en varias cuentas</p>
            </div>
            <div className="practice-item">
              <div className="practice-icon">🔒</div>
              <h4>Usa un Gestor</h4>
              <p>Los gestores de contraseñas son muy útiles y seguros</p>
            </div>
            <div className="practice-item">
              <div className="practice-icon">🤐</div>
              <h4>No las Compartas</h4>
              <p>Nunca compartas tus contraseñas con nadie</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PasswordSection;