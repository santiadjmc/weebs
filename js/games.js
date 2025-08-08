/**
 * Interactive games for CiberNiños application
 * Handles mini-games and educational activities
 */

// Games state management
const GamesManager = {
    activeGame: null,
    gameScores: {},
    gameProgress: {},
    achievements: []
};

/**
 * Initialize games system
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeGameSystem();
    loadGameProgress();
});

/**
 * Initialize the games system
 */
function initializeGameSystem() {
    initializeGameModals();
    initializeGameCards();
    loadAchievements();
    
    console.log('🎮 Games system initialized');
}

/**
 * Initialize game modal functionality
 */
function initializeGameModals() {
    const gameModal = document.getElementById('gameModal');
    if (!gameModal) return;
    
    // Close modal when clicking overlay
    gameModal.addEventListener('click', function(e) {
        if (e.target === gameModal) {
            closeGame();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && GamesManager.activeGame) {
            closeGame();
        }
    });
}

/**
 * Initialize game card interactions
 */
function initializeGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        // Add hover sound effect (if audio is enabled)
        card.addEventListener('mouseenter', function() {
            playHoverSound();
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

/**
 * Open a specific game
 */
function openGame(gameId) {
    const gameModal = document.getElementById('gameModal');
    const gameTitle = document.getElementById('gameTitle');
    const gameContent = document.getElementById('gameContent');
    
    if (!gameModal || !gameTitle || !gameContent) return;
    
    // Set active game
    GamesManager.activeGame = gameId;
    
    // Configure game based on ID
    switch(gameId) {
        case 'password-builder':
            setupPasswordBuilderGame(gameTitle, gameContent);
            break;
        case 'email-detective':
            setupEmailDetectiveGame(gameTitle, gameContent);
            break;
        case 'privacy-guardian':
            setupPrivacyGuardianGame(gameTitle, gameContent);
            break;
        case 'cyber-quiz':
            setupCyberQuizGame(gameTitle, gameContent);
            break;
        default:
            console.warn('Unknown game ID:', gameId);
            return;
    }
    
    // Show modal with animation
    gameModal.style.display = 'flex';
    gameModal.classList.add('modal-enter');
    document.body.style.overflow = 'hidden';
    
    // Play opening sound
    playGameOpenSound();
    
    // Focus management
    setTimeout(() => {
        const firstFocusable = gameContent.querySelector('button, input, select, [tabindex]');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }, 300);
    
    console.log(`🎮 Opened game: ${gameId}`);
}

/**
 * Close the current game
 */
function closeGame() {
    const gameModal = document.getElementById('gameModal');
    if (!gameModal) return;
    
    // Save game progress if applicable
    saveGameProgress();
    
    // Hide modal with animation
    gameModal.classList.remove('modal-enter');
    gameModal.classList.add('modal-exit');
    
    setTimeout(() => {
        gameModal.style.display = 'none';
        gameModal.classList.remove('modal-exit');
        document.body.style.overflow = '';
        
        // Clear active game
        GamesManager.activeGame = null;
    }, 300);
    
    console.log('🎮 Game closed');
}

/**
 * Setup Password Builder Game
 */
function setupPasswordBuilderGame(titleElement, contentElement) {
    titleElement.innerHTML = '<i class="fas fa-key"></i> Constructor de Contraseñas';
    
    const game = new PasswordBuilderGame(contentElement);
}

/**
 * Password Builder Game Class
 */
class PasswordBuilderGame {
    constructor(container) {
        this.container = container;
        this.level = 1;
        this.score = 0;
        this.targetStrength = 60;
        this.components = {
            length: 8,
            uppercase: false,
            lowercase: false,
            numbers: false,
            symbols: false
        };
        
        this.init();
    }
    
    init() {
        this.render();
        this.bindEvents();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="password-game">
                <div class="game-header">
                    <div class="level-info">
                        <span>Nivel: ${this.level}</span>
                        <span>Puntuación: ${this.score}</span>
                    </div>
                    <div class="target-info">
                        <span>Objetivo: ${this.targetStrength}% de fuerza</span>
                    </div>
                </div>
                
                <div class="robot-character">
                    <div class="robot-head">
                        <div class="robot-eyes ${this.getRobotMood()}">
                            <span class="eye"></span>
                            <span class="eye"></span>
                        </div>
                        <div class="robot-mouth"></div>
                    </div>
                    <div class="robot-speech">
                        ${this.getRobotMessage()}
                    </div>
                </div>
                
                <div class="password-components">
                    <h4>🔧 Componentes de Contraseña:</h4>
                    <div class="components-grid">
                        <div class="component-item">
                            <label for="length-slider">Longitud:</label>
                            <input type="range" id="length-slider" min="4" max="20" value="${this.components.length}">
                            <span class="component-value">${this.components.length} caracteres</span>
                        </div>
                        
                        <div class="component-toggle ${this.components.uppercase ? 'active' : ''}">
                            <input type="checkbox" id="uppercase-toggle" ${this.components.uppercase ? 'checked' : ''}>
                            <label for="uppercase-toggle">
                                <i class="fas fa-font"></i>
                                Mayúsculas (A-Z)
                            </label>
                        </div>
                        
                        <div class="component-toggle ${this.components.lowercase ? 'active' : ''}">
                            <input type="checkbox" id="lowercase-toggle" ${this.components.lowercase ? 'checked' : ''}>
                            <label for="lowercase-toggle">
                                <i class="fas fa-font"></i>
                                Minúsculas (a-z)
                            </label>
                        </div>
                        
                        <div class="component-toggle ${this.components.numbers ? 'active' : ''}">
                            <input type="checkbox" id="numbers-toggle" ${this.components.numbers ? 'checked' : ''}>
                            <label for="numbers-toggle">
                                <i class="fas fa-hashtag"></i>
                                Números (0-9)
                            </label>
                        </div>
                        
                        <div class="component-toggle ${this.components.symbols ? 'active' : ''}">
                            <input type="checkbox" id="symbols-toggle" ${this.components.symbols ? 'checked' : ''}>
                            <label for="symbols-toggle">
                                <i class="fas fa-at"></i>
                                Símbolos (!@#$)
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="password-preview">
                    <h4>🔍 Contraseña Generada:</h4>
                    <div class="password-display">
                        <input type="text" id="generated-password" value="${this.generatePassword()}" readonly>
                        <button class="btn btn-secondary" onclick="this.parentElement.previousElementSibling.querySelector('input').select(); document.execCommand('copy')">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <div class="strength-meter">
                        <div class="strength-bar" style="width: ${this.calculateStrength()}%; background-color: ${this.getStrengthColor()}"></div>
                        <span class="strength-text">${this.calculateStrength()}% de fuerza</span>
                    </div>
                </div>
                
                <div class="game-actions">
                    <button class="btn btn-primary" onclick="this.generateNewPassword()">
                        <i class="fas fa-sync-alt"></i>
                        Nueva Contraseña
                    </button>
                    <button class="btn btn-success" onclick="this.checkPassword()" ${this.calculateStrength() >= this.targetStrength ? '' : 'disabled'}>
                        <i class="fas fa-check"></i>
                        ¡Completar Nivel!
                    </button>
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        const lengthSlider = this.container.querySelector('#length-slider');
        const checkboxes = this.container.querySelectorAll('input[type="checkbox"]');
        
        lengthSlider?.addEventListener('input', () => {
            this.components.length = parseInt(lengthSlider.value);
            this.update();
        });
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const type = checkbox.id.replace('-toggle', '');
                this.components[type] = checkbox.checked;
                this.update();
            });
        });
    }
    
    update() {
        this.render();
        this.bindEvents();
    }
    
    generatePassword() {
        let charset = '';
        if (this.components.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (this.components.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (this.components.numbers) charset += '0123456789';
        if (this.components.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (!charset) return 'Selecciona al menos un tipo de carácter';
        
        let password = '';
        for (let i = 0; i < this.components.length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        return password;
    }
    
    calculateStrength() {
        let strength = 0;
        
        // Length bonus
        strength += Math.min(this.components.length * 5, 40);
        
        // Variety bonus
        if (this.components.uppercase) strength += 15;
        if (this.components.lowercase) strength += 15;
        if (this.components.numbers) strength += 15;
        if (this.components.symbols) strength += 15;
        
        return Math.min(strength, 100);
    }
    
    getStrengthColor() {
        const strength = this.calculateStrength();
        if (strength < 30) return '#ef4444';
        if (strength < 60) return '#f59e0b';
        if (strength < 80) return '#10b981';
        return '#3b82f6';
    }
    
    getRobotMood() {
        const strength = this.calculateStrength();
        if (strength >= this.targetStrength) return 'happy';
        if (strength >= this.targetStrength * 0.7) return 'neutral';
        return 'sad';
    }
    
    getRobotMessage() {
        const strength = this.calculateStrength();
        
        if (strength >= this.targetStrength) {
            return '🎉 ¡Excelente! Esta contraseña es muy fuerte.';
        } else if (strength >= this.targetStrength * 0.7) {
            return '🤔 Casi ahí... Agrega más variedad.';
        } else {
            return '😟 Necesita ser más fuerte. ¡Sigue intentando!';
        }
    }
    
    checkPassword() {
        if (this.calculateStrength() >= this.targetStrength) {
            this.levelComplete();
        }
    }
    
    levelComplete() {
        this.score += this.level * 10;
        this.level++;
        this.targetStrength = Math.min(this.targetStrength + 10, 90);
        
        // Show celebration
        this.showCelebration();
        
        // Update game
        setTimeout(() => {
            this.update();
        }, 2000);
    }
    
    showCelebration() {
        const celebration = document.createElement('div');
        celebration.className = 'level-celebration';
        celebration.innerHTML = `
            <div class="celebration-content">
                <h3>🎉 ¡Nivel ${this.level - 1} Completado!</h3>
                <p>+${(this.level - 1) * 10} puntos</p>
                <p>Siguiente objetivo: ${this.targetStrength}%</p>
            </div>
        `;
        
        this.container.appendChild(celebration);
        
        setTimeout(() => {
            celebration.remove();
        }, 2000);
        
        // Save progress
        this.saveProgress();
    }
    
    saveProgress() {
        GamesManager.gameProgress['password-builder'] = {
            level: this.level,
            score: this.score,
            timestamp: Date.now()
        };
        
        saveGameProgress();
    }
}

/**
 * Setup Email Detective Game
 */
function setupEmailDetectiveGame(titleElement, contentElement) {
    titleElement.innerHTML = '<i class="fas fa-search"></i> Detective de Emails';
    
    const game = new EmailDetectiveGame(contentElement);
}

/**
 * Email Detective Game Class
 */
class EmailDetectiveGame {
    constructor(container) {
        this.container = container;
        this.currentCase = 0;
        this.score = 0;
        this.streak = 0;
        this.cases = this.generateCases();
        
        this.init();
    }
    
    init() {
        this.render();
        this.bindEvents();
    }
    
    generateCases() {
        return [
            {
                suspect: 'Banco Nacional',
                from: 'security@banc0-nacional.com',
                subject: 'Verificación urgente de cuenta',
                body: 'Su cuenta será suspendida en 2 horas. Haga clic aquí para verificar: http://banco-verificacion.suspicious.net',
                clues: [
                    'El "0" en lugar de "o" en la dirección',
                    'URL sospechosa que no coincide con el banco',
                    'Presión de tiempo para crear pánico'
                ],
                isPhishing: true,
                difficulty: 'Fácil'
            },
            {
                suspect: 'Tienda Online',
                from: 'ofertas@tienda-online.com',
                subject: 'Confirmación de pedido #TO123456',
                body: 'Gracias por tu compra. Tu pedido será procesado en 24-48 horas. Puedes consultar el estado en tu cuenta.',
                clues: [
                    'Dirección de email coherente',
                    'No pide información personal',
                    'Mensaje informativo sin presión'
                ],
                isPhishing: false,
                difficulty: 'Fácil'
            },
            {
                suspect: 'Servicio Técnico',
                from: 'support@microsoft-security.net',
                subject: 'Virus detectado en su computadora',
                body: 'Hemos detectado virus en su PC. Llame inmediatamente al +1-800-FAKE-NUM o su computadora será dañada permanentemente.',
                clues: [
                    'Microsoft no usa ese dominio',
                    'Crea pánico sobre virus falsos',
                    'Pide llamar a un número sospechoso'
                ],
                isPhishing: true,
                difficulty: 'Medio'
            }
        ];
    }
    
    render() {
        if (this.currentCase >= this.cases.length) {
            this.renderResults();
            return;
        }
        
        const case_ = this.cases[this.currentCase];
        
        this.container.innerHTML = `
            <div class="detective-game">
                <div class="game-header">
                    <div class="detective-info">
                        <div class="detective-badge">🕵️‍♂️</div>
                        <div class="detective-stats">
                            <div>Caso ${this.currentCase + 1}/${this.cases.length}</div>
                            <div>Puntuación: ${this.score}</div>
                            <div>Racha: ${this.streak}</div>
                        </div>
                    </div>
                    <div class="case-difficulty">
                        <span class="difficulty-badge ${case_.difficulty.toLowerCase()}">${case_.difficulty}</span>
                    </div>
                </div>
                
                <div class="case-file">
                    <h4>📁 Expediente del Caso</h4>
                    <div class="suspect-info">
                        <strong>Sospechoso:</strong> ${case_.suspect}
                    </div>
                    
                    <div class="evidence-section">
                        <h5>📧 Evidencia - Email Interceptado:</h5>
                        <div class="email-evidence">
                            <div class="email-header">
                                <div><strong>De:</strong> ${case_.from}</div>
                                <div><strong>Asunto:</strong> ${case_.subject}</div>
                            </div>
                            <div class="email-body">
                                ${case_.body}
                            </div>
                        </div>
                    </div>
                    
                    <div class="magnifying-glass" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
                        🔍
                    </div>
                </div>
                
                <div class="investigation-section">
                    <h4>🔍 Tu Investigación</h4>
                    <p>Examina cuidadosamente el email y decide...</p>
                    
                    <div class="clues-section">
                        <h5>💡 Pistas encontradas:</h5>
                        <div class="clues-list" id="clues-list">
                            <button class="btn btn-secondary reveal-clues" onclick="this.revealClues()">
                                <i class="fas fa-eye"></i>
                                Revelar Pistas (−5 puntos)
                            </button>
                        </div>
                    </div>
                    
                    <div class="verdict-section">
                        <h5>⚖️ Tu Veredicto:</h5>
                        <div class="verdict-buttons">
                            <button class="btn btn-success verdict-btn" data-verdict="legitimate">
                                <i class="fas fa-check-circle"></i>
                                LEGÍTIMO
                                <small>Este email es real y seguro</small>
                            </button>
                            <button class="btn btn-danger verdict-btn" data-verdict="phishing">
                                <i class="fas fa-exclamation-triangle"></i>
                                PHISHING
                                <small>Este email es una estafa</small>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        const verdictButtons = this.container.querySelectorAll('.verdict-btn');
        
        verdictButtons.forEach(button => {
            button.addEventListener('click', () => {
                const verdict = button.dataset.verdict;
                this.makeVerdict(verdict === 'phishing');
            });
        });
        
        // Add reveal clues functionality
        const revealButton = this.container.querySelector('.reveal-clues');
        if (revealButton) {
            revealButton.onclick = () => this.revealClues();
        }
    }
    
    revealClues() {
        const case_ = this.cases[this.currentCase];
        const cluesList = this.container.querySelector('#clues-list');
        
        cluesList.innerHTML = `
            <div class="clues-revealed">
                ${case_.clues.map(clue => `
                    <div class="clue-item">
                        <i class="fas fa-lightbulb"></i>
                        ${clue}
                    </div>
                `).join('')}
            </div>
        `;
        
        // Deduct points for using hint
        this.score = Math.max(0, this.score - 5);
        this.updateScore();
    }
    
    makeVerdict(userSaysPhishing) {
        const case_ = this.cases[this.currentCase];
        const isCorrect = userSaysPhishing === case_.isPhishing;
        
        if (isCorrect) {
            this.score += this.getScoreForCase();
            this.streak++;
            this.showFeedback(true, case_);
        } else {
            this.streak = 0;
            this.showFeedback(false, case_);
        }
        
        // Move to next case after delay
        setTimeout(() => {
            this.currentCase++;
            this.render();
            this.bindEvents();
        }, 4000);
    }
    
    getScoreForCase() {
        const baseScore = 10;
        const difficultyMultiplier = {
            'Fácil': 1,
            'Medio': 1.5,
            'Difícil': 2
        };
        
        const case_ = this.cases[this.currentCase];
        const streakBonus = Math.min(this.streak * 2, 10);
        
        return Math.round(baseScore * difficultyMultiplier[case_.difficulty] + streakBonus);
    }
    
    showFeedback(isCorrect, case_) {
        const feedback = document.createElement('div');
        feedback.className = `case-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        
        feedback.innerHTML = `
            <div class="feedback-header">
                <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
                <h4>${isCorrect ? '¡CASO RESUELTO!' : 'VEREDICTO INCORRECTO'}</h4>
            </div>
            <div class="feedback-body">
                <p><strong>Veredicto correcto:</strong> ${case_.isPhishing ? 'PHISHING' : 'LEGÍTIMO'}</p>
                <div class="case-explanation">
                    <h5>🔍 Análisis del caso:</h5>
                    <ul>
                        ${case_.clues.map(clue => `<li>${clue}</li>`).join('')}
                    </ul>
                </div>
                ${isCorrect ? `
                    <div class="score-gained">
                        +${this.getScoreForCase()} puntos
                        ${this.streak > 1 ? `<br><small>🔥 Racha de ${this.streak}!</small>` : ''}
                    </div>
                ` : ''}
            </div>
        `;
        
        this.container.appendChild(feedback);
        
        // Update score display
        this.updateScore();
        
        // Play sound effect
        if (isCorrect) {
            playSuccessSound();
        } else {
            playErrorSound();
        }
    }
    
    updateScore() {
        const scoreElement = this.container.querySelector('.detective-stats');
        if (scoreElement) {
            scoreElement.innerHTML = `
                <div>Caso ${this.currentCase + 1}/${this.cases.length}</div>
                <div>Puntuación: ${this.score}</div>
                <div>Racha: ${this.streak}</div>
            `;
        }
    }
    
    renderResults() {
        const percentage = Math.round((this.score / (this.cases.length * 10)) * 100);
        let rank = '';
        let badge = '';
        
        if (percentage >= 90) {
            rank = 'Detective Experto';
            badge = '🏆';
        } else if (percentage >= 75) {
            rank = 'Detective Experimentado';
            badge = '🥈';
        } else if (percentage >= 60) {
            rank = 'Detective Junior';
            badge = '🥉';
        } else {
            rank = 'Cadete de Policía';
            badge = '👮‍♂️';
        }
        
        this.container.innerHTML = `
            <div class="detective-results">
                <div class="results-header">
                    <div class="results-badge">${badge}</div>
                    <h3>¡Investigación Completada!</h3>
                    <div class="detective-rank">${rank}</div>
                </div>
                
                <div class="results-stats">
                    <div class="stat-card">
                        <div class="stat-number">${this.score}</div>
                        <div class="stat-label">Puntuación Final</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${this.cases.filter((_, i) => i < this.currentCase).length}</div>
                        <div class="stat-label">Casos Investigados</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${percentage}%</div>
                        <div class="stat-label">Precisión</div>
                    </div>
                </div>
                
                <div class="detective-certificate">
                    <h4>🏅 Certificado de Detective</h4>
                    <p>Por completar la investigación de emails sospechosos y ayudar a mantener internet más seguro.</p>
                    <div class="certificate-signature">
                        <em>- Departamento de Ciberseguridad CiberNiños</em>
                    </div>
                </div>
                
                <div class="results-actions">
                    <button class="btn btn-primary" onclick="this.restart()">
                        <i class="fas fa-redo"></i>
                        Nueva Investigación
                    </button>
                    <button class="btn btn-secondary" onclick="closeGame()">
                        <i class="fas fa-home"></i>
                        Volver al Menú
                    </button>
                </div>
            </div>
        `;
        
        // Save progress
        this.saveProgress();
    }
    
    saveProgress() {
        GamesManager.gameProgress['email-detective'] = {
            score: this.score,
            casesCompleted: this.currentCase,
            timestamp: Date.now()
        };
        
        saveGameProgress();
    }
}

/**
 * Play sound effects (if enabled)
 */
function playHoverSound() {
    // Subtle hover sound - could be implemented with Web Audio API
}

function playGameOpenSound() {
    // Game opening sound
}

function playSuccessSound() {
    // Success sound effect
}

function playErrorSound() {
    // Error sound effect
}

/**
 * Save game progress to localStorage
 */
function saveGameProgress() {
    localStorage.setItem('ciberninos-game-progress', JSON.stringify(GamesManager.gameProgress));
    localStorage.setItem('ciberninos-game-scores', JSON.stringify(GamesManager.gameScores));
}

/**
 * Load game progress from localStorage
 */
function loadGameProgress() {
    const progress = localStorage.getItem('ciberninos-game-progress');
    const scores = localStorage.getItem('ciberninos-game-scores');
    
    if (progress) {
        GamesManager.gameProgress = JSON.parse(progress);
    }
    
    if (scores) {
        GamesManager.gameScores = JSON.parse(scores);
    }
}

/**
 * Load and check achievements
 */
function loadAchievements() {
    const achievements = localStorage.getItem('ciberninos-achievements');
    
    if (achievements) {
        GamesManager.achievements = JSON.parse(achievements);
    }
    
    checkForNewAchievements();
}

/**
 * Check for new achievements
 */
function checkForNewAchievements() {
    const newAchievements = [];
    
    // Example achievements
    if (GamesManager.gameProgress['password-builder']?.level >= 5) {
        if (!GamesManager.achievements.includes('password-master')) {
            newAchievements.push({
                id: 'password-master',
                title: 'Maestro de Contraseñas',
                description: 'Alcanzaste el nivel 5 en Constructor de Contraseñas',
                icon: '🔐'
            });
        }
    }
    
    if (GamesManager.gameProgress['email-detective']?.casesCompleted >= 3) {
        if (!GamesManager.achievements.includes('email-detective')) {
            newAchievements.push({
                id: 'email-detective',
                title: 'Detective de Emails',
                description: 'Completaste 3 casos de investigación',
                icon: '🕵️‍♂️'
            });
        }
    }
    
    // Show new achievements
    if (newAchievements.length > 0) {
        showAchievements(newAchievements);
        
        // Add to achievements list
        newAchievements.forEach(achievement => {
            GamesManager.achievements.push(achievement.id);
        });
        
        // Save achievements
        localStorage.setItem('ciberninos-achievements', JSON.stringify(GamesManager.achievements));
    }
}

/**
 * Show achievement notifications
 */
function showAchievements(achievements) {
    achievements.forEach(achievement => {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">
                    <h4>¡Logro Desbloqueado!</h4>
                    <h5>${achievement.title}</h5>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    });
}

/**
 * Add game-specific styles
 */
function addGameStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Game modal styles */
        .game-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .game-modal-content {
            background: var(--bg-primary);
            border-radius: var(--border-radius-lg);
            max-width: 90vw;
            max-height: 90vh;
            overflow: auto;
            position: relative;
        }
        
        .game-modal-header {
            padding: 1rem 2rem;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .game-modal-body {
            padding: 2rem;
        }
        
        .close-game {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-secondary);
            padding: 0.5rem;
            border-radius: 50%;
            transition: all var(--transition-fast);
        }
        
        .close-game:hover {
            background: var(--bg-secondary);
            color: var(--text-primary);
        }
        
        /* Achievement notification styles */
        .achievement-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 1rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-xl);
            transform: translateX(400px);
            transition: transform var(--transition-normal);
            z-index: 10001;
            max-width: 300px;
        }
        
        .achievement-notification.show {
            transform: translateX(0);
        }
        
        .achievement-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .achievement-icon {
            font-size: 2rem;
        }
        
        .achievement-text h4 {
            margin: 0;
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .achievement-text h5 {
            margin: 0.2rem 0;
            font-size: 1.1rem;
        }
        
        .achievement-text p {
            margin: 0;
            font-size: 0.8rem;
            opacity: 0.8;
        }
        
        /* Game-specific styles will be added by each game */
    `;
    
    document.head.appendChild(style);
}

// Initialize game styles
document.addEventListener('DOMContentLoaded', addGameStyles);

// Make functions globally available
window.openGame = openGame;
window.closeGame = closeGame;
window.GamesManager = GamesManager;