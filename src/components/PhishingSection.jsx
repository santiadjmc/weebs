import { useState } from 'react';
import { motion } from 'framer-motion';
import './PhishingSection.css';

const PhishingSection = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const phishingQuizzes = [
    {
      id: 1,
      type: 'email',
      title: '📧 ¿Es este email seguro?',
      content: {
        sender: 'banco.seguro@gmail.com',
        subject: '🚨 URGENTE: Tu cuenta será bloqueada en 24 horas',
        body: 'Estimado cliente, hemos detectado actividad sospechosa. Haz clic AQUÍ para verificar tu cuenta inmediatamente o será suspendida.',
        hasLink: true,
        linkText: 'VERIFICAR CUENTA AHORA'
      },
      question: '¿Qué te parece sospechoso de este email?',
      options: [
        { text: 'El remitente usa Gmail en lugar del dominio oficial del banco', correct: true },
        { text: 'El asunto es muy largo', correct: false },
        { text: 'Tiene emojis', correct: false },
        { text: 'No veo nada malo', correct: false }
      ],
      explanation: '¡Correcto! Los bancos usan sus propios dominios oficiales (@bancojemplo.com), nunca Gmail. Además, crean urgencia falsa para presionarte.'
    },
    {
      id: 2,
      type: 'website',
      title: '🌐 ¿Es esta página web confiable?',
      content: {
        url: 'http://faceb00k-login.com/secure',
        title: 'Facebook - Iniciar Sesión',
        hasWarning: true,
        warningText: 'Este sitio no es seguro'
      },
      question: '¿Qué señales de peligro ves?',
      options: [
        { text: 'La URL usa "00" en lugar de "oo" y no es HTTPS', correct: true },
        { text: 'El color azul no es el correcto', correct: false },
        { text: 'Tiene demasiado texto', correct: false },
        { text: 'No veo problemas', correct: false }
      ],
      explanation: '¡Excelente! Los sitios falsos usan URLs similares pero incorrectas. Facebook real sería "facebook.com" con HTTPS (candado verde).'
    },
    {
      id: 3,
      type: 'message',
      title: '💬 ¿Es este mensaje confiable?',
      content: {
        sender: 'Número desconocido',
        message: '¡FELICIDADES! Has ganado un iPhone 15 Pro. Solo necesitas pagar $50 de envío. Link: bit.ly/iphone-gratis-2024',
        hasLink: true
      },
      question: '¿Por qué es sospechoso este mensaje?',
      options: [
        { text: 'Pide dinero por algo "gratis" y usa un enlace acortado sospechoso', correct: true },
        { text: 'Menciona un iPhone', correct: false },
        { text: 'Es muy corto', correct: false },
        { text: 'No es sospechoso', correct: false }
      ],
      explanation: '¡Perfecto! Nada es realmente "gratis" si pides pagar algo. Los enlaces acortados ocultan el destino real.'
    }
  ];

  const phishingTips = [
    {
      icon: '🔍',
      title: 'Revisa el Remitente',
      description: 'Verifica que el email venga del dominio oficial de la empresa'
    },
    {
      icon: '🔗',
      title: 'Cuidado con los Enlaces',
      description: 'Nunca hagas clic en enlaces sospechosos. Mejor ve directo al sitio oficial'
    },
    {
      icon: '⏰',
      title: 'No te Presiones',
      description: 'Los phishers crean urgencia falsa. Tómate tiempo para verificar'
    },
    {
      icon: '💰',
      title: 'Si es Demasiado Bueno...',
      description: 'Ofertas increíbles o premios inesperados suelen ser estafas'
    }
  ];

  const handleAnswerSelect = (optionIndex) => {
    if (showResult) return;
    
    setSelectedAnswer(optionIndex);
    setShowResult(true);
    
    if (phishingQuizzes[currentQuiz].options[optionIndex].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuiz < phishingQuizzes.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const getCurrentQuiz = () => phishingQuizzes[currentQuiz];

  return (
    <section id="phishing" className="phishing-section">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>🎣 Detección de Phishing</h2>
          <p>Aprende a identificar y evitar intentos de estafa en línea</p>
        </motion.div>

        <div className="phishing-content">
          {!quizCompleted ? (
            <>
              {/* Quiz Section */}
              <motion.div
                className="quiz-section"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="quiz-header">
                  <h3>{getCurrentQuiz().title}</h3>
                  <div className="quiz-progress">
                    Pregunta {currentQuiz + 1} de {phishingQuizzes.length}
                  </div>
                </div>

                {/* Content Display */}
                <div className="phishing-example">
                  {getCurrentQuiz().type === 'email' && (
                    <div className="email-mockup">
                      <div className="email-header">
                        <div className="email-from">
                          <strong>De:</strong> {getCurrentQuiz().content.sender}
                        </div>
                        <div className="email-subject">
                          <strong>Asunto:</strong> {getCurrentQuiz().content.subject}
                        </div>
                      </div>
                      <div className="email-body">
                        {getCurrentQuiz().content.body}
                        {getCurrentQuiz().content.hasLink && (
                          <div className="fake-link">
                            🔗 {getCurrentQuiz().content.linkText}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {getCurrentQuiz().type === 'website' && (
                    <div className="website-mockup">
                      <div className="browser-bar">
                        <div className="url-bar">
                          {getCurrentQuiz().content.hasWarning && (
                            <span className="warning-icon">⚠️</span>
                          )}
                          {getCurrentQuiz().content.url}
                        </div>
                      </div>
                      <div className="website-content">
                        <h4>{getCurrentQuiz().content.title}</h4>
                        {getCurrentQuiz().content.hasWarning && (
                          <div className="security-warning">
                            🚨 {getCurrentQuiz().content.warningText}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {getCurrentQuiz().type === 'message' && (
                    <div className="message-mockup">
                      <div className="message-header">
                        <strong>De:</strong> {getCurrentQuiz().content.sender}
                      </div>
                      <div className="message-body">
                        {getCurrentQuiz().content.message}
                      </div>
                    </div>
                  )}
                </div>

                {/* Question and Options */}
                <div className="quiz-question">
                  <h4>{getCurrentQuiz().question}</h4>
                  <div className="quiz-options">
                    {getCurrentQuiz().options.map((option, index) => (
                      <motion.button
                        key={index}
                        className={`quiz-option ${
                          selectedAnswer === index
                            ? option.correct
                              ? 'correct'
                              : 'incorrect'
                            : ''
                        } ${
                          showResult && option.correct ? 'show-correct' : ''
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        whileHover={{ scale: showResult ? 1 : 1.02 }}
                        whileTap={{ scale: showResult ? 1 : 0.98 }}
                      >
                        {option.text}
                        {showResult && selectedAnswer === index && (
                          <span className="result-icon">
                            {option.correct ? '✅' : '❌'}
                          </span>
                        )}
                        {showResult && option.correct && selectedAnswer !== index && (
                          <span className="correct-icon">✅</span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Explanation */}
                {showResult && (
                  <motion.div
                    className="quiz-explanation"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="explanation-content">
                      <h5>💡 Explicación:</h5>
                      <p>{getCurrentQuiz().explanation}</p>
                    </div>
                    <button onClick={nextQuestion} className="next-btn">
                      {currentQuiz < phishingQuizzes.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'} →
                    </button>
                  </motion.div>
                )}
              </motion.div>

              {/* Tips Section */}
              <motion.div
                className="tips-sidebar"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3>🛡️ Consejos Anti-Phishing</h3>
                <div className="tips-list">
                  {phishingTips.map((tip, index) => (
                    <motion.div
                      key={index}
                      className="tip-item"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="tip-icon">{tip.icon}</div>
                      <div className="tip-content">
                        <h4>{tip.title}</h4>
                        <p>{tip.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          ) : (
            // Quiz Results
            <motion.div
              className="quiz-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="results-header">
                <div className="score-display">
                  <div className="score-circle">
                    <span className="score-number">{score}</span>
                    <span className="score-total">/{phishingQuizzes.length}</span>
                  </div>
                  <h3>
                    {score === phishingQuizzes.length
                      ? '🏆 ¡Experto en Seguridad!'
                      : score >= 2
                      ? '👍 ¡Buen Trabajo!'
                      : '📚 Sigue Practicando'}
                  </h3>
                </div>
                
                <div className="results-message">
                  {score === phishingQuizzes.length && (
                    <p>¡Increíble! Tienes todas las habilidades para detectar phishing. ¡Eres un verdadero ciber-héroe!</p>
                  )}
                  {score === 2 && (
                    <p>¡Muy bien! Tienes buenas habilidades para detectar estafas. Con un poco más de práctica serás un experto.</p>
                  )}
                  {score === 1 && (
                    <p>¡Buen intento! Repasa los consejos y practica más para mejorar tu capacidad de detección.</p>
                  )}
                  {score === 0 && (
                    <p>No te preocupes, todos empezamos por algún lugar. Revisa los consejos y vuelve a intentarlo.</p>
                  )}
                </div>

                <button onClick={restartQuiz} className="restart-btn">
                  🔄 Intentar de Nuevo
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Warning Signs Section */}
        <motion.div
          className="warning-signs"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>🚨 Señales de Alerta</h3>
          <div className="signs-grid">
            <div className="sign-item danger">
              <div className="sign-icon">⚠️</div>
              <h4>Urgencia Falsa</h4>
              <p>"Tu cuenta será cerrada en 24 horas"</p>
            </div>
            <div className="sign-item danger">
              <div className="sign-icon">🎯</div>
              <h4>Información Personal</h4>
              <p>Te piden contraseñas o datos bancarios</p>
            </div>
            <div className="sign-item danger">
              <div className="sign-icon">🔗</div>
              <h4>Enlaces Sospechosos</h4>
              <p>URLs extrañas o enlaces acortados</p>
            </div>
            <div className="sign-item danger">
              <div className="sign-icon">💰</div>
              <h4>Ofertas Increíbles</h4>
              <p>"Gana $1000 fácilmente" o premios inesperados</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhishingSection;