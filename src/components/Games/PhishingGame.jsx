import React, { useState } from 'react'
import './PhishingGame.css'

const PhishingGame = () => {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState('playing') // playing, finished
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const messages = [
    {
      id: 1,
      sender: 'seguridad@g00gle-verificacion.net',
      subject: 'URGENTE: Verificación de cuenta necesaria',
      body: 'Tu cuenta de Google será suspendida en 24 horas si no verificas tu información. Haz clic aquí INMEDIATAMENTE: verificar-google-123.com',
      isPhishing: true,
      explanation: 'Este es phishing porque usa un dominio falso (g00gle con ceros), crea urgencia falsa y pide hacer clic en enlaces sospechosos.',
      redFlags: ['Dominio sospechoso', 'Urgencia falsa', 'Enlaces externos', 'Errores sutiles']
    },
    {
      id: 2,
      sender: 'notifications@netflix.com',
      subject: 'Tu factura mensual está disponible',
      body: 'Hola, tu factura de Netflix de este mes ya está disponible en tu cuenta. Puedes revisarla iniciando sesión en tu cuenta de Netflix.',
      isPhishing: false,
      explanation: 'Este mensaje es legítimo porque viene del dominio oficial, no pide información personal y no crea urgencia.',
      greenFlags: ['Dominio oficial', 'Sin peticiones de datos', 'Lenguaje profesional', 'Sin urgencia']
    },
    {
      id: 3,
      sender: 'premio@loteria-nacional-mega.org',
      subject: '¡¡¡FELICIDADES!!! Has ganado $50,000 USD',
      body: 'Estimado ganador, ha sido seleccionado para recibir $50,000 USD en nuestra lotería especial. Para reclamar su premio, envíe su nombre completo, dirección y número de cuenta bancaria.',
      isPhishing: true,
      explanation: 'Este es un phishing clásico que ofrece premios falsos para obtener información personal y bancaria.',
      redFlags: ['Premio no solicitado', 'Pide datos bancarios', 'Demasiado bueno para ser real', 'Dominio sospechoso']
    },
    {
      id: 4,
      sender: 'soporte@paypal.com',
      subject: 'Confirmación de transacción',
      body: 'Se ha procesado un pago de $299.99 en tu cuenta PayPal. Si no reconoces esta transacción, inicia sesión en tu cuenta de PayPal para revisarla.',
      isPhishing: false,
      explanation: 'Aunque genera preocupación, es legítimo porque viene del dominio oficial y te dirige a iniciar sesión normalmente.',
      greenFlags: ['Dominio oficial', 'No pide datos', 'Te dirige al sitio oficial', 'Información específica']
    },
    {
      id: 5,
      sender: 'admin@tu-banco-seguridad.com',
      subject: 'Problema detectado en tu cuenta',
      body: 'Hemos detectado actividad sospechosa. Tu cuenta sera bloqueada si no confirmas tu identidad en las proximas 2 horas. Usuario: tu_email Clave: [ESCRIBA AQUÍ]',
      isPhishing: true,
      explanation: 'Este es phishing porque pide contraseñas directamente, tiene errores ortográficos y usa un dominio genérico.',
      redFlags: ['Pide contraseña', 'Errores ortográficos', 'Dominio genérico', 'Urgencia extrema']
    }
  ]

  const currentMsg = messages[currentMessage]

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    setShowResult(true)
    
    if (answer === currentMsg.isPhishing) {
      setScore(score + 1)
    }
  }

  const nextMessage = () => {
    setShowResult(false)
    setSelectedAnswer(null)
    
    if (currentMessage < messages.length - 1) {
      setCurrentMessage(currentMessage + 1)
    } else {
      setGameState('finished')
    }
  }

  const restartGame = () => {
    setCurrentMessage(0)
    setScore(0)
    setGameState('playing')
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / messages.length) * 100
    if (percentage === 100) return { text: '¡Perfecto! Eres un experto detectando phishing 🎉', emoji: '🏆' }
    if (percentage >= 80) return { text: '¡Excelente! Tienes muy buenas habilidades 👏', emoji: '🌟' }
    if (percentage >= 60) return { text: '¡Bien hecho! Estás aprendiendo rápido 😊', emoji: '👍' }
    if (percentage >= 40) return { text: 'No está mal, pero necesitas más práctica 🤔', emoji: '📚' }
    return { text: '¡No te preocupes! Sigue practicando y mejorarás 💪', emoji: '🎯' }
  }

  if (gameState === 'finished') {
    const scoreMsg = getScoreMessage()
    return (
      <div className="phishing-game phishing-game--finished">
        <div className="game-results">
          <div className="results-emoji">{scoreMsg.emoji}</div>
          <h3>¡Juego Completado!</h3>
          <div className="final-score">
            <div className="score-number">{score}/{messages.length}</div>
            <div className="score-text">respuestas correctas</div>
          </div>
          <p className="score-message">{scoreMsg.text}</p>
          
          <div className="results-tips">
            <h4>💡 Recuerda siempre:</h4>
            <ul>
              <li>🔍 Revisa cuidadosamente el remitente</li>
              <li>🔗 Nunca hagas clic en enlaces sospechosos</li>
              <li>⏰ No te presiones por mensajes "urgentes"</li>
              <li>🤐 Nunca compartas información personal</li>
              <li>👨‍👩‍👧‍👦 Pregunta a un adulto si tienes dudas</li>
            </ul>
          </div>
          
          <button className="restart-btn" onClick={restartGame}>
            🎮 Jugar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="phishing-game">
      <div className="game-progress">
        <div className="progress-text">
          Mensaje {currentMessage + 1} de {messages.length}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentMessage + 1) / messages.length) * 100}%` }}
          />
        </div>
        <div className="current-score">
          Puntuación: {score}/{messages.length}
        </div>
      </div>

      <div className="message-container">
        <div className="fake-email">
          <div className="email-header">
            <div className="email-from">
              <strong>De:</strong> {currentMsg.sender}
            </div>
            <div className="email-subject">
              <strong>Asunto:</strong> {currentMsg.subject}
            </div>
          </div>
          <div className="email-body">
            {currentMsg.body}
          </div>
        </div>

        {!showResult ? (
          <div className="answer-buttons">
            <h4>🤔 ¿Este mensaje es confiable?</h4>
            <div className="button-group">
              <button 
                className="answer-btn answer-btn--safe"
                onClick={() => handleAnswer(false)}
              >
                ✅ ES SEGURO
                <span className="btn-subtitle">Puedo confiar en este mensaje</span>
              </button>
              <button 
                className="answer-btn answer-btn--phishing"
                onClick={() => handleAnswer(true)}
              >
                ⚠️ ES PHISHING
                <span className="btn-subtitle">Este mensaje es peligroso</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="result-container">
            <div className={`result-feedback ${selectedAnswer === currentMsg.isPhishing ? 'result-feedback--correct' : 'result-feedback--wrong'}`}>
              {selectedAnswer === currentMsg.isPhishing ? (
                <div className="feedback-header">
                  <div className="feedback-icon">🎉</div>
                  <div className="feedback-title">¡Correcto!</div>
                </div>
              ) : (
                <div className="feedback-header">
                  <div className="feedback-icon">😅</div>
                  <div className="feedback-title">No exactamente...</div>
                </div>
              )}
            </div>

            <div className="explanation">
              <p><strong>Explicación:</strong> {currentMsg.explanation}</p>
              
              <div className="flags-container">
                {currentMsg.isPhishing ? (
                  <div className="red-flags-list">
                    <h5>🚩 Señales de alerta:</h5>
                    <ul>
                      {currentMsg.redFlags.map((flag, index) => (
                        <li key={index}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="green-flags-list">
                    <h5>✅ Por qué es seguro:</h5>
                    <ul>
                      {currentMsg.greenFlags.map((flag, index) => (
                        <li key={index}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <button className="next-btn" onClick={nextMessage}>
              {currentMessage < messages.length - 1 ? 'Siguiente mensaje ➡️' : 'Ver resultados 🏆'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhishingGame