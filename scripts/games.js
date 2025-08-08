/**
 * Interactive games and educational mini-games for cybersecurity learning
 * Includes password games, phishing detection, and privacy scenarios
 */

// Game state management
const GameState = {
  currentGame: null,
  scores: {
    passwordGame: 0,
    phishingDetection: 0,
    privacyChallenge: 0
  },
  achievements: [],
  level: 1
};

/**
 * Initialize all interactive games
 */
function initializeGames() {
  initializePasswordGame();
  initializePhishingDetection();
  initializePrivacyChallenge();
  initializeSecurityScenarios();
  loadGameProgress();
}

/**
 * Password Strength Game
 */
class PasswordGame {
  constructor() {
    this.currentChallenge = 0;
    this.challenges = [
      {
        hint: "Crea una contraseña con tu animal favorito y tu edad",
        example: "GatoAzul15!",
        requirements: ["animal", "number", "symbol"]
      },
      {
        hint: "Usa una frase que solo tú entiendas",
        example: "MiPerroSaltaEnLaLuna7!",
        requirements: ["phrase", "number", "symbol"]
      },
      {
        hint: "Combina mayúsculas, minúsculas, números y símbolos",
        example: "SuperSecreta123!",
        requirements: ["uppercase", "lowercase", "number", "symbol"]
      }
    ];
    this.init();
  }
  
  init() {
    this.createGameInterface();
    this.setupEventListeners();
  }
  
  createGameInterface() {
    const gameContainer = document.createElement('div');
    gameContainer.className = 'password-game-advanced';
    gameContainer.innerHTML = `
      <div class="game-header">
        <h3>🎮 Desafío de Contraseñas</h3>
        <div class="game-progress">
          <span class="current-level">Nivel 1</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 0%"></div>
          </div>
        </div>
      </div>
      
      <div class="challenge-area">
        <div class="challenge-hint">
          <strong>Desafío:</strong> <span class="hint-text">Carga el primer desafío...</span>
        </div>
        
        <div class="password-input-area">
          <input type="password" class="game-password-input" placeholder="Escribe tu contraseña aquí...">
          <button class="password-visibility-toggle">👁️</button>
        </div>
        
        <div class="password-analysis">
          <div class="strength-indicators">
            <div class="indicator" data-requirement="length">
              <span class="indicator-icon">📏</span>
              <span class="indicator-text">Al menos 8 caracteres</span>
              <span class="indicator-status">❌</span>
            </div>
            <div class="indicator" data-requirement="uppercase">
              <span class="indicator-icon">🔤</span>
              <span class="indicator-text">Letra mayúscula</span>
              <span class="indicator-status">❌</span>
            </div>
            <div class="indicator" data-requirement="lowercase">
              <span class="indicator-icon">🔡</span>
              <span class="indicator-text">Letra minúscula</span>
              <span class="indicator-status">❌</span>
            </div>
            <div class="indicator" data-requirement="number">
              <span class="indicator-icon">🔢</span>
              <span class="indicator-text">Número</span>
              <span class="indicator-status">❌</span>
            </div>
            <div class="indicator" data-requirement="symbol">
              <span class="indicator-icon">🔣</span>
              <span class="indicator-text">Símbolo especial</span>
              <span class="indicator-status">❌</span>
            </div>
          </div>
        </div>
        
        <div class="game-actions">
          <button class="btn btn-secondary game-hint-btn">💡 Pista</button>
          <button class="btn btn-primary game-check-btn">✅ Verificar</button>
          <button class="btn btn-secondary game-next-btn" style="display: none;">➡️ Siguiente</button>
        </div>
        
        <div class="game-feedback"></div>
      </div>
    `;
    
    // Insert after the existing password game
    const existingGame = document.querySelector('.password-game');
    if (existingGame) {
      existingGame.parentNode.insertBefore(gameContainer, existingGame.nextSibling);
    }
  }
  
  setupEventListeners() {
    const input = document.querySelector('.game-password-input');
    const checkBtn = document.querySelector('.game-check-btn');
    const hintBtn = document.querySelector('.game-hint-btn');
    const nextBtn = document.querySelector('.game-next-btn');
    const toggleBtn = document.querySelector('.password-visibility-toggle');
    
    if (input) {
      input.addEventListener('input', () => this.analyzePassword());
    }
    
    if (checkBtn) {
      checkBtn.addEventListener('click', () => this.checkPassword());
    }
    
    if (hintBtn) {
      hintBtn.addEventListener('click', () => this.showHint());
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextChallenge());
    }
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.togglePasswordVisibility());
    }
    
    this.loadChallenge();
  }
  
  loadChallenge() {
    const challenge = this.challenges[this.currentChallenge];
    const hintText = document.querySelector('.hint-text');
    const levelText = document.querySelector('.current-level');
    const progressFill = document.querySelector('.progress-fill');
    
    if (hintText) hintText.textContent = challenge.hint;
    if (levelText) levelText.textContent = `Nivel ${this.currentChallenge + 1}`;
    if (progressFill) {
      const progress = ((this.currentChallenge + 1) / this.challenges.length) * 100;
      progressFill.style.width = `${progress}%`;
    }
    
    // Reset indicators
    this.updateIndicators('');
  }
  
  analyzePassword() {
    const password = document.querySelector('.game-password-input').value;
    this.updateIndicators(password);
  }
  
  updateIndicators(password) {
    const indicators = document.querySelectorAll('.indicator');
    
    indicators.forEach(indicator => {
      const requirement = indicator.dataset.requirement;
      const statusElement = indicator.querySelector('.indicator-status');
      let passed = false;
      
      switch (requirement) {
        case 'length':
          passed = password.length >= 8;
          break;
        case 'uppercase':
          passed = /[A-Z]/.test(password);
          break;
        case 'lowercase':
          passed = /[a-z]/.test(password);
          break;
        case 'number':
          passed = /[0-9]/.test(password);
          break;
        case 'symbol':
          passed = /[!@#$%^&*(),.?":{}|<>]/.test(password);
          break;
      }
      
      statusElement.textContent = passed ? '✅' : '❌';
      indicator.classList.toggle('passed', passed);
    });
  }
  
  checkPassword() {
    const password = document.querySelector('.game-password-input').value;
    const feedback = document.querySelector('.game-feedback');
    
    if (!password) {
      this.showFeedback('⚠️ Escribe una contraseña primero.', 'warning');
      return;
    }
    
    const score = this.calculatePasswordScore(password);
    
    if (score >= 80) {
      this.showFeedback('🎉 ¡Excelente! Has creado una contraseña súper fuerte.', 'success');
      this.completedChallenge();
    } else if (score >= 60) {
      this.showFeedback('👍 Buena contraseña, pero puede mejorar. Revisa las indicaciones.', 'info');
    } else {
      this.showFeedback('😔 Tu contraseña necesita mejorar. Sigue las indicaciones de seguridad.', 'warning');
    }
  }
  
  calculatePasswordScore(password) {
    let score = 0;
    
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 15;
    
    return score;
  }
  
  showFeedback(message, type) {
    const feedback = document.querySelector('.game-feedback');
    feedback.className = `game-feedback ${type}`;
    feedback.textContent = message;
    feedback.style.display = 'block';
  }
  
  completedChallenge() {
    const nextBtn = document.querySelector('.game-next-btn');
    const checkBtn = document.querySelector('.game-check-btn');
    
    if (nextBtn) nextBtn.style.display = 'block';
    if (checkBtn) checkBtn.disabled = true;
    
    GameState.scores.passwordGame++;
    this.unlockAchievement('password_expert');
  }
  
  nextChallenge() {
    if (this.currentChallenge < this.challenges.length - 1) {
      this.currentChallenge++;
      this.loadChallenge();
      
      // Reset UI
      document.querySelector('.game-password-input').value = '';
      document.querySelector('.game-feedback').style.display = 'none';
      document.querySelector('.game-next-btn').style.display = 'none';
      document.querySelector('.game-check-btn').disabled = false;
    } else {
      this.showFeedback('🏆 ¡Has completado todos los desafíos de contraseñas! Eres un experto.', 'success');
      this.gameCompleted();
    }
  }
  
  showHint() {
    const challenge = this.challenges[this.currentChallenge];
    this.showFeedback(`💡 Ejemplo: ${challenge.example}`, 'info');
  }
  
  togglePasswordVisibility() {
    const input = document.querySelector('.game-password-input');
    const toggle = document.querySelector('.password-visibility-toggle');
    
    if (input.type === 'password') {
      input.type = 'text';
      toggle.textContent = '🙈';
    } else {
      input.type = 'password';
      toggle.textContent = '👁️';
    }
  }
  
  gameCompleted() {
    this.unlockAchievement('password_master');
    setTimeout(() => {
      createCelebrationParticles(document.querySelector('.password-game-advanced'));
    }, 500);
  }
  
  unlockAchievement(achievement) {
    if (!GameState.achievements.includes(achievement)) {
      GameState.achievements.push(achievement);
      this.showAchievement(achievement);
      saveGameProgress();
    }
  }
  
  showAchievement(achievement) {
    const achievements = {
      'password_expert': { icon: '🔐', title: 'Experto en Contraseñas', desc: 'Creaste tu primera contraseña fuerte' },
      'password_master': { icon: '👑', title: 'Maestro de Contraseñas', desc: 'Completaste todos los desafíos de contraseñas' }
    };
    
    const achievementData = achievements[achievement];
    if (!achievementData) return;
    
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-content">
        <span class="achievement-icon">${achievementData.icon}</span>
        <div class="achievement-text">
          <strong>${achievementData.title}</strong>
          <p>${achievementData.desc}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

/**
 * Phishing Detection Game
 */
class PhishingDetectionGame {
  constructor() {
    this.scenarios = [
      {
        type: 'email',
        content: {
          from: 'banco-seguro@gmai1.com',
          subject: '¡URGENTE! Confirma tu cuenta AHORA',
          body: 'Tu cuenta será bloqueada en 24 horas. Haz clic aquí INMEDIATAMENTE para confirmar.',
          suspicious: true
        },
        clues: ['Dirección de email sospechosa (gmai1.com)', 'Tono urgente', 'Amenazas', 'Pide acción inmediata']
      },
      {
        type: 'website',
        content: {
          url: 'https://www.amazom.com/login',
          title: 'Amazon - Iniciar Sesión',
          suspicious: true
        },
        clues: ['URL incorrecta (amazom en lugar de amazon)', 'Sitio web falso']
      }
    ];
    
    this.currentScenario = 0;
    this.correctAnswers = 0;
    this.init();
  }
  
  init() {
    // Game would be implemented similar to PasswordGame
    // For brevity, showing structure only
  }
}

/**
 * Privacy Challenge Game
 */
class PrivacyChallenge {
  constructor() {
    this.scenarios = [
      {
        situation: "Tu amigo quiere publicar una foto tuya en redes sociales",
        options: [
          { text: "Le dices que está bien", points: 0 },
          { text: "Le pides que te pregunte primero", points: 10 },
          { text: "Le explicas por qué prefieres que no la publique", points: 15 }
        ],
        explanation: "Siempre tienes el derecho de decidir qué fotos tuyas se publican."
      }
    ];
    
    this.currentScenario = 0;
    this.totalPoints = 0;
    this.init();
  }
  
  init() {
    // Similar implementation to other games
  }
}

/**
 * Save and load game progress
 */
function saveGameProgress() {
  localStorage.setItem('cybersecurity_game_progress', JSON.stringify(GameState));
}

function loadGameProgress() {
  const saved = localStorage.getItem('cybersecurity_game_progress');
  if (saved) {
    const progress = JSON.parse(saved);
    Object.assign(GameState, progress);
  }
}

/**
 * Initialize security scenarios
 */
function initializeSecurityScenarios() {
  // Create interactive scenarios for learning
  const scenarios = [
    {
      title: "¿Qué harías si recibes este mensaje?",
      content: "Un desconocido te envía: 'Hola, soy tu primo. ¿Puedes darme tu dirección?'",
      options: [
        { text: "Le doy mi dirección", correct: false },
        { text: "Lo ignoro y le cuento a un adulto", correct: true },
        { text: "Le pregunto más detalles", correct: false }
      ]
    }
  ];
  
  // Implementation would create interactive scenario cards
}

/**
 * Initialize all games when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    initializeGames();
    
    // Initialize individual game instances
    if (document.querySelector('.password-game')) {
      new PasswordGame();
    }
  }, 500);
});

// Add achievement notification styles
const achievementStyles = document.createElement('style');
achievementStyles.textContent = `
  .achievement-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #6366f1, #f59e0b);
    color: white;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    transform: translateX(400px);
    transition: transform 0.3s ease-out;
    z-index: 10000;
    max-width: 300px;
  }
  
  .achievement-notification.show {
    transform: translateX(0);
  }
  
  .achievement-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .achievement-icon {
    font-size: 2rem;
  }
  
  .achievement-text strong {
    display: block;
    margin-bottom: 4px;
  }
  
  .achievement-text p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

document.head.appendChild(achievementStyles);