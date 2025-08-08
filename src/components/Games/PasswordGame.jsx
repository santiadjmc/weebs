import React, { useState, useEffect } from 'react'
import './PasswordGame.css'

const PasswordGame = () => {
  const [password, setPassword] = useState('')
  const [feedback, setFeedback] = useState([])
  const [strength, setStrength] = useState(0)
  const [showGenerator, setShowGenerator] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState('')

  // Password strength evaluation
  const evaluatePassword = (pwd) => {
    const criteria = [
      {
        test: pwd.length >= 8,
        message: 'Al menos 8 caracteres',
        icon: '📏'
      },
      {
        test: /[a-z]/.test(pwd),
        message: 'Letras minúsculas',
        icon: '🔤'
      },
      {
        test: /[A-Z]/.test(pwd),
        message: 'Letras MAYÚSCULAS',
        icon: '🔠'
      },
      {
        test: /\d/.test(pwd),
        message: 'Números',
        icon: '🔢'
      },
      {
        test: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        message: 'Símbolos especiales',
        icon: '✨'
      },
      {
        test: pwd.length >= 12,
        message: 'Extra larga (12+ caracteres)',
        icon: '🚀'
      }
    ]

    const passedCriteria = criteria.filter(c => c.test)
    const strengthScore = Math.min((passedCriteria.length / criteria.length) * 100, 100)
    
    setFeedback(criteria)
    setStrength(strengthScore)
  }

  useEffect(() => {
    evaluatePassword(password)
  }, [password])

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*(),.?":{}|<>'
    
    const allChars = lowercase + uppercase + numbers + symbols
    let newPassword = ''
    
    // Ensure at least one character from each category
    newPassword += lowercase[Math.floor(Math.random() * lowercase.length)]
    newPassword += uppercase[Math.floor(Math.random() * uppercase.length)]
    newPassword += numbers[Math.floor(Math.random() * numbers.length)]
    newPassword += symbols[Math.floor(Math.random() * symbols.length)]
    
    // Fill the rest randomly (target length: 12-16 characters)
    const targetLength = Math.floor(Math.random() * 5) + 12
    for (let i = newPassword.length; i < targetLength; i++) {
      newPassword += allChars[Math.floor(Math.random() * allChars.length)]
    }
    
    // Shuffle the password
    newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('')
    
    setGeneratedPassword(newPassword)
    setShowGenerator(true)
  }

  const copyPassword = (pwd) => {
    navigator.clipboard.writeText(pwd)
    // You could add a toast notification here
  }

  const useGeneratedPassword = () => {
    setPassword(generatedPassword)
    setShowGenerator(false)
  }

  const getStrengthLabel = () => {
    if (strength < 30) return { label: 'Muy débil', color: '#ef4444', emoji: '😨' }
    if (strength < 50) return { label: 'Débil', color: '#f59e0b', emoji: '😐' }
    if (strength < 70) return { label: 'Regular', color: '#eab308', emoji: '🙂' }
    if (strength < 90) return { label: 'Fuerte', color: '#22c55e', emoji: '😊' }
    return { label: '¡Súper fuerte!', color: '#16a34a', emoji: '🎉' }
  }

  const strengthInfo = getStrengthLabel()

  return (
    <div className="password-game">
      <div className="password-input-section">
        <div className="input-group">
          <label htmlFor="password-input" className="input-label">
            🔐 Escribe tu contraseña:
          </label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Escribe una contraseña aquí..."
            className="password-input"
            aria-describedby="password-feedback"
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById('password-input')
              input.type = input.type === 'password' ? 'text' : 'password'
            }}
            className="toggle-visibility"
            aria-label="Mostrar/ocultar contraseña"
          >
            👁️
          </button>
        </div>

        <div className="password-strength">
          <div className="strength-bar">
            <div 
              className="strength-fill"
              style={{ 
                width: `${strength}%`,
                backgroundColor: strengthInfo.color
              }}
            ></div>
          </div>
          <div className="strength-label" style={{ color: strengthInfo.color }}>
            {strengthInfo.emoji} {strengthInfo.label}
          </div>
        </div>
      </div>

      <div id="password-feedback" className="password-feedback">
        <h4>📋 Requisitos:</h4>
        <div className="criteria-list">
          {feedback.map((criterion, index) => (
            <div 
              key={index}
              className={`criterion ${criterion.test ? 'criterion--passed' : 'criterion--failed'}`}
            >
              <span className="criterion-icon">{criterion.icon}</span>
              <span className="criterion-text">{criterion.message}</span>
              <span className="criterion-status">
                {criterion.test ? '✅' : '❌'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="password-actions">
        <button 
          className="generate-btn"
          onClick={generatePassword}
        >
          <span>🎲</span>
          Generar contraseña segura
        </button>
        
        <button 
          className="clear-btn"
          onClick={() => setPassword('')}
          disabled={!password}
        >
          <span>🗑️</span>
          Limpiar
        </button>
      </div>

      {showGenerator && (
        <div className="password-generator">
          <h4>🎉 ¡Contraseña generada!</h4>
          <div className="generated-password">
            <code>{generatedPassword}</code>
            <div className="generated-actions">
              <button
                onClick={() => copyPassword(generatedPassword)}
                className="copy-btn"
                title="Copiar contraseña"
              >
                📋
              </button>
              <button
                onClick={useGeneratedPassword}
                className="use-btn"
              >
                ✅ Usar esta contraseña
              </button>
            </div>
          </div>
          <button 
            className="close-generator"
            onClick={() => setShowGenerator(false)}
          >
            ❌
          </button>
        </div>
      )}

      <div className="game-tips">
        <h4>💡 Consejos rápidos:</h4>
        <ul>
          <li>🎭 Usa una frase que solo tú conozcas</li>
          <li>🔄 Cambia algunas letras por números o símbolos</li>
          <li>🎯 Haz que sea única para cada sitio web</li>
          <li>🤐 ¡Nunca la compartas con nadie!</li>
        </ul>
      </div>
    </div>
  )
}

export default PasswordGame