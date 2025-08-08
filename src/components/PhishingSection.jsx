import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './PhishingSection.css';

const PhishingSection = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const phishingScenarios = [
    {
      title: "Email Sospechoso",
      description: "Has recibido un email que dice ser de tu banco",
      email: {
        from: "banco_seguro@gmail.com",
        subject: "¡URGENTE! Verifica tu cuenta",
        body: "Hola, hemos detectado actividad sospechosa. Haz clic AQUÍ para verificar tu cuenta en los próximos 10 minutos o será bloqueada."
      },
      redFlags: ["Dirección de email incorrecta", "Urgencia excesiva", "Amenazas", "Enlaces sospechosos"],
      isPhishing: true,
      explanation: "Este es un email de phishing típico. Los bancos nunca piden verificar datos por email."
    },
    {
      title: "Sitio Web Falso",
      description: "Has llegado a lo que parece ser la página de tu red social favorita",
      website: {
        url: "faceb00k-login.com",
        title: "Inicia Sesión en Facebook",
        description: "Una página que imita el diseño de Facebook pero con URL sospechosa"
      },
      redFlags: ["URL incorrecta", "Diseño ligeramente diferente", "Sin HTTPS", "Errores ortográficos"],
      isPhishing: true,
      explanation: "Sitio web falso que intenta robar tus credenciales. Siempre verifica la URL oficial."
    },
    {
      title: "Mensaje de Texto",
      description: "Recibes un SMS con un premio",
      sms: {
        from: "+1234567890",
        message: "¡FELICIDADES! Has ganado $1000. Haz clic en el enlace para reclamar: bit.ly/premio123"
      },
      redFlags: ["Premios no solicitados", "Enlaces acortados", "Número desconocido"],
      isPhishing: true,
      explanation: "Los premios no solicitados son siempre una estafa. Nunca hagas clic en enlaces sospechosos."
    }
  ];

  const quizQuestions = [
    {
      question: "¿Cuál es la mejor manera de verificar si un email es legítimo?",
      options: [
        "Hacer clic en el enlace para verificar",
        "Contactar directamente a la empresa por teléfono",
        "Responder al email preguntando si es real",
        "Compartirlo en redes sociales para preguntar"
      ],
      correct: 1,
      explanation: "Siempre contacta directamente a la empresa usando números de teléfono oficiales, nunca los del email sospechoso."
    },
    {
      question: "¿Qué debes hacer si recibes un mensaje urgente pidiendo tus datos?",
      options: [
        "Responder inmediatamente para evitar problemas",
        "Tomarte tu tiempo y verificar la fuente",
        "Ignorarlo completamente",
        "Compartir tus datos solo si es urgente"
      ],
      correct: 1,
      explanation: "La urgencia es una táctica común del phishing. Siempre tómate tiempo para verificar."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showQuiz) {
        setCurrentScenario((prev) => (prev + 1) % phishingScenarios.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [phishingScenarios.length, showQuiz]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correct;
    setQuizResult({
      isCorrect,
      explanation: quizQuestions[currentQuestion].explanation
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setQuizResult(null);
    } else {
      setShowQuiz(false);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setQuizResult(null);
    }
  };

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
          <h2>🎣 Protección Anti-Phishing</h2>
          <p>Aprende a identificar y evitar los intentos de phishing</p>
        </motion.div>

        <div className="phishing-content">
          {!showQuiz ? (
            <>
              {/* Scenario Display */}
              <motion.div
                className="scenario-display"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="scenario-header">
                  <h3>🚨 Escenario de Phishing #{currentScenario + 1}</h3>
                  <div className="scenario-indicators">
                    {phishingScenarios.map((_, index) => (
                      <div
                        key={index}
                        className={`indicator ${index === currentScenario ? 'active' : ''}`}
                        onClick={() => setCurrentScenario(index)}
                      />
                    ))}
                  </div>
                </div>

                <div className="scenario-content">
                  <h4>{phishingScenarios[currentScenario].title}</h4>
                  <p>{phishingScenarios[currentScenario].description}</p>

                  <div className="scenario-example">
                    {phishingScenarios[currentScenario].email && (
                      <div className="fake-email">
                        <div className="email-header">
                          <strong>De:</strong> {phishingScenarios[currentScenario].email.from}<br/>
                          <strong>Asunto:</strong> {phishingScenarios[currentScenario].email.subject}
                        </div>
                        <div className="email-body">
                          {phishingScenarios[currentScenario].email.body}
                        </div>
                      </div>
                    )}

                    {phishingScenarios[currentScenario].website && (
                      <div className="fake-website">
                        <div className="browser-bar">
                          <span className="url">{phishingScenarios[currentScenario].website.url}</span>
                        </div>
                        <div className="website-content">
                          <h5>{phishingScenarios[currentScenario].website.title}</h5>
                          <p>{phishingScenarios[currentScenario].website.description}</p>
                        </div>
                      </div>
                    )}

                    {phishingScenarios[currentScenario].sms && (
                      <div className="fake-sms">
                        <div className="sms-header">
                          <strong>SMS de:</strong> {phishingScenarios[currentScenario].sms.from}
                        </div>
                        <div className="sms-body">
                          {phishingScenarios[currentScenario].sms.message}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="red-flags">
                    <h5>🚩 Señales de Alerta:</h5>
                    <ul>
                      {phishingScenarios[currentScenario].redFlags.map((flag, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          {flag}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="explanation">
                    <p><strong>💡 Explicación:</strong> {phishingScenarios[currentScenario].explanation}</p>
                  </div>
                </div>
              </motion.div>

              {/* Quiz Button */}
              <motion.div
                className="quiz-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setShowQuiz(true)}
                  className="quiz-btn"
                  aria-label="Iniciar quiz de phishing"
                >
                  🧠 ¡Pon a Prueba tus Conocimientos!
                </button>
              </motion.div>
            </>
          ) : (
            /* Quiz Display */
            <motion.div
              className="quiz-display"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="quiz-header">
                <h3>🧠 Quiz Anti-Phishing</h3>
                <p>Pregunta {currentQuestion + 1} de {quizQuestions.length}</p>
              </div>

              <div className="quiz-content">
                <h4>{quizQuestions[currentQuestion].question}</h4>
                
                <div className="quiz-options">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`quiz-option ${
                        selectedAnswer === index ? 
                          (quizResult?.isCorrect ? 'correct' : 'incorrect') : 
                          ''
                      }`}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {quizResult && (
                  <motion.div
                    className={`quiz-result ${quizResult.isCorrect ? 'success' : 'error'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>
                      {quizResult.isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}
                    </p>
                    <p>{quizResult.explanation}</p>
                    <button onClick={nextQuestion} className="next-btn">
                      {currentQuestion < quizQuestions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Quiz'}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Prevention Tips */}
        <motion.div
          className="prevention-tips"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>🛡️ Consejos de Prevención</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🔍</div>
              <h4>Verifica el Remitente</h4>
              <p>Siempre verifica la dirección de email y los dominios oficiales</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">⏰</div>
              <h4>No te Apresures</h4>
              <p>Los estafadores crean urgencia artificial. Tómate tu tiempo</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🔗</div>
              <h4>Cuidado con los Enlaces</h4>
              <p>Pasa el mouse sobre los enlaces para ver la URL real antes de hacer clic</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📞</div>
              <h4>Confirma por Otro Medio</h4>
              <p>Si tienes dudas, llama directamente a la empresa usando números oficiales</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhishingSection;