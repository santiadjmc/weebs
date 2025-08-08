import React, { useState } from 'react'
import './SocialMediaQuiz.css'

const SocialMediaQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)

  const questions = [
    {
      id: 1,
      question: '¿Qué información NUNCA debes compartir en redes sociales?',
      options: [
        'Tu comida favorita',
        'Tu dirección de casa',
        'Tus colores favoritos',
        'Tus programas de TV favoritos'
      ],
      correct: 1,
      explanation: 'Tu dirección es información personal privada que puede ser peligrosa si la ven extraños.'
    },
    {
      id: 2,
      question: '¿Cuál es la mejor configuración de privacidad para tu perfil?',
      options: [
        'Público para que todos me vean',
        'Privado solo para amigos',
        'Semi-privado para algunos',
        'No importa la configuración'
      ],
      correct: 1,
      explanation: 'Un perfil privado te protege porque solo tus amigos reales pueden ver tu contenido.'
    },
    {
      id: 3,
      question: 'Si alguien que no conoces te envía un mensaje raro, ¿qué haces?',
      options: [
        'Le respondo para ser amable',
        'Ignoro el mensaje y se lo cuento a mis padres',
        'Le doy mi información personal',
        'Acepto conocerlo en persona'
      ],
      correct: 1,
      explanation: '¡Perfecto! Nunca respondas a extraños y siempre cuéntaselo a un adulto de confianza.'
    },
    {
      id: 4,
      question: '¿Cuándo es seguro encontrarse con alguien que conociste online?',
      options: [
        'Cuando me mande fotos',
        'Después de hablar por una semana',
        'NUNCA sin un adulto presente',
        'Cuando me prometa regalos'
      ],
      correct: 2,
      explanation: 'Nunca te encuentres con personas que conociste online sin que un adulto esté presente y lo sepa.'
    },
    {
      id: 5,
      question: 'Antes de publicar una foto, debes preguntarte:',
      options: [
        '¿Tendré muchos likes?',
        '¿Estarían bien mis padres viendo esto?',
        '¿Se ve bonita?',
        '¿Será popular?'
      ],
      correct: 1,
      explanation: 'Siempre piensa si tus padres estarían orgullosos de lo que publicas. ¡Es la mejor regla!'
    }
  ]

  const currentQ = questions[currentQuestion]

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    if (answerIndex === currentQ.correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    setShowResult(false)
    setSelectedAnswer(null)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setGameFinished(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameFinished(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage === 100) return { text: '¡Eres un experto en seguridad digital! 🌟', emoji: '🏆' }
    if (percentage >= 80) return { text: '¡Excelente trabajo! Sabes cómo mantenerte seguro 👏', emoji: '🎉' }
    if (percentage >= 60) return { text: '¡Bien hecho! Estás aprendiendo mucho 😊', emoji: '👍' }
    if (percentage >= 40) return { text: 'Buen intento, pero practica más estos consejos 🤔', emoji: '📚' }
    return { text: '¡Sigue practicando! La seguridad es muy importante 💪', emoji: '🎯' }
  }

  if (gameFinished) {
    const scoreMsg = getScoreMessage()
    return (
      <div className="social-quiz social-quiz--finished">
        <div className="quiz-results">
          <div className="results-emoji">{scoreMsg.emoji}</div>
          <h3>¡Quiz Completado!</h3>
          <div className="final-score">
            <div className="score-number">{score}/{questions.length}</div>
            <div className="score-text">respuestas correctas</div>
          </div>
          <p className="score-message">{scoreMsg.text}</p>
          
          <div className="social-reminders">
            <h4>🌟 Recuerda siempre:</h4>
            <ul>
              <li>🔒 Mantén tu perfil privado</li>
              <li>👥 Solo acepta amigos que conoces en la vida real</li>
              <li>🤐 Nunca compartas información personal</li>
              <li>👨‍👩‍👧‍👦 Habla con tus padres sobre cualquier problema</li>
              <li>❤️ Trata a otros con respeto y amabilidad</li>
            </ul>
          </div>
          
          <button className="restart-btn" onClick={restartQuiz}>
            🎯 Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="social-quiz">
      <div className="quiz-progress">
        <div className="progress-text">
          Pregunta {currentQuestion + 1} de {questions.length}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="current-score">
          Puntuación: {score}/{questions.length}
        </div>
      </div>

      <div className="question-container">
        <div className="question-card">
          <h4 className="question-text">
            {currentQ.question}
          </h4>
          
          {!showResult ? (
            <div className="options-container">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  className="option-btn"
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="result-container">
              <div className={`result-feedback ${selectedAnswer === currentQ.correct ? 'result-feedback--correct' : 'result-feedback--wrong'}`}>
                {selectedAnswer === currentQ.correct ? (
                  <div className="feedback-header">
                    <div className="feedback-icon">🎉</div>
                    <div className="feedback-title">¡Correcto!</div>
                  </div>
                ) : (
                  <div className="feedback-header">
                    <div className="feedback-icon">💭</div>
                    <div className="feedback-title">¡Aprende más!</div>
                  </div>
                )}
              </div>

              <div className="explanation">
                <p><strong>💡 Explicación:</strong> {currentQ.explanation}</p>
                {selectedAnswer !== currentQ.correct && (
                  <p><strong>✅ Respuesta correcta:</strong> {currentQ.options[currentQ.correct]}</p>
                )}
              </div>

              <button className="next-btn" onClick={nextQuestion}>
                {currentQuestion < questions.length - 1 ? 'Siguiente pregunta ➡️' : 'Ver resultados 🏆'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SocialMediaQuiz