/**
 * CiberKids - Interactive Games System
 * Educational mini-games for cybersecurity learning
 */

class GameManager {
    constructor() {
        this.games = new Map();
        this.currentGame = null;
        this.scores = {
            passwordBuilder: 0,
            phishingDetective: 0,
            privacyGuardian: 0
        };
        
        this.initialize();
    }

    initialize() {
        this.registerGames();
        this.setupEventListeners();
        console.log('🎮 Game system initialized');
    }

    registerGames() {
        this.games.set('password-builder', new PasswordBuilderGame());
        this.games.set('phishing-detective', new PhishingDetectiveGame());
        this.games.set('privacy-guardian', new PrivacyGuardianGame());
    }

    setupEventListeners() {
        // Listen for game events
        document.addEventListener('gameCompleted', this.handleGameCompleted.bind(this));
        document.addEventListener('gameScoreUpdate', this.handleScoreUpdate.bind(this));
    }

    startGame(gameId) {
        const game = this.games.get(gameId);
        if (game) {
            this.currentGame = game;
            return game.start();
        }
        return null;
    }

    handleGameCompleted(event) {
        const { gameId, score, completed } = event.detail;
        this.scores[gameId] = Math.max(this.scores[gameId], score);
        
        // Save scores to localStorage
        localStorage.setItem('ciberkids-scores', JSON.stringify(this.scores));
        
        console.log(`🏆 Game completed: ${gameId}, Score: ${score}`);
    }

    handleScoreUpdate(event) {
        const { gameId, score } = event.detail;
        this.scores[gameId] = score;
    }

    getHighScores() {
        return this.scores;
    }
}

/**
 * Base Game Class
 */
class BaseGame {
    constructor(gameId, title) {
        this.gameId = gameId;
        this.title = title;
        this.score = 0;
        this.isRunning = false;
        this.level = 1;
    }

    start() {
        this.isRunning = true;
        this.score = 0;
        this.level = 1;
        return this.generateContent();
    }

    stop() {
        this.isRunning = false;
        this.dispatchEvent('gameCompleted', {
            gameId: this.gameId,
            score: this.score,
            completed: true
        });
    }

    updateScore(points) {
        this.score += points;
        this.dispatchEvent('gameScoreUpdate', {
            gameId: this.gameId,
            score: this.score
        });
    }

    dispatchEvent(eventType, data) {
        document.dispatchEvent(new CustomEvent(eventType, {
            detail: data
        }));
    }

    generateContent() {
        // To be implemented by child classes
        return '<p>Game content not implemented</p>';
    }
}

/**
 * Password Builder Game
 */
class PasswordBuilderGame extends BaseGame {
    constructor() {
        super('password-builder', '🔨 Constructor de Contraseñas');
        this.targetStrength = 5;
        this.attempts = 0;
        this.maxAttempts = 5;
        this.hints = [
            'Usa al menos 8 caracteres',
            'Incluye mayúsculas y minúsculas',
            'Agrega algunos números',
            'Usa símbolos especiales (!@#$%)',
            'Evita palabras comunes'
        ];
    }

    generateContent() {
        return `
            <div class="password-builder-game">
                <div class="game-header">
                    <h3>🔨 Constructor de Contraseñas Seguras</h3>
                    <div class="game-stats">
                        <span class="badge badge-primary">Nivel ${this.level}</span>
                        <span class="badge badge-success">Puntuación: ${this.score}</span>
                        <span class="badge badge-warning">Intentos: ${this.attempts}/${this.maxAttempts}</span>
                    </div>
                </div>
                
                <div class="game-objective">
                    <p><strong>Objetivo:</strong> Construye una contraseña súper segura con puntuación máxima (100 puntos)</p>
                </div>
                
                <div class="password-builder-container">
                    <div class="password-input-section">
                        <label for="builder-password" class="game-label">Tu contraseña:</label>
                        <input 
                            type="password" 
                            id="builder-password" 
                            class="game-password-input" 
                            placeholder="Construye tu contraseña aquí..."
                            maxlength="50"
                        >
                        <button type="button" class="password-visibility-toggle" aria-label="Mostrar/ocultar contraseña">
                            <span class="eye-icon">👁️</span>
                        </button>
                    </div>
                    
                    <div class="strength-analyzer">
                        <div class="strength-meter">
                            <div class="strength-bar-container">
                                <div class="strength-bar-fill" data-strength="0"></div>
                            </div>
                            <div class="strength-percentage">0%</div>
                        </div>
                        <div class="strength-label">Fuerza: <span class="strength-text">Muy débil</span></div>
                    </div>
                    
                    <div class="password-requirements">
                        <h4>Requisitos de Seguridad:</h4>
                        <div class="requirements-grid">
                            <div class="requirement" data-requirement="length">
                                <span class="requirement-icon">❌</span>
                                <span class="requirement-text">Al menos 8 caracteres</span>
                            </div>
                            <div class="requirement" data-requirement="lowercase">
                                <span class="requirement-icon">❌</span>
                                <span class="requirement-text">Letras minúsculas (a-z)</span>
                            </div>
                            <div class="requirement" data-requirement="uppercase">
                                <span class="requirement-icon">❌</span>
                                <span class="requirement-text">Letras mayúsculas (A-Z)</span>
                            </div>
                            <div class="requirement" data-requirement="numbers">
                                <span class="requirement-icon">❌</span>
                                <span class="requirement-text">Números (0-9)</span>
                            </div>
                            <div class="requirement" data-requirement="symbols">
                                <span class="requirement-icon">❌</span>
                                <span class="requirement-text">Símbolos (!@#$%)</span>
                            </div>
                            <div class="requirement" data-requirement="no-common">
                                <span class="requirement-icon">❌</span>
                                <span class="requirement-text">No usar palabras comunes</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="hint-system">
                        <button class="btn btn-secondary hint-button" id="get-hint">
                            💡 Obtener Pista
                        </button>
                        <div class="hint-display" id="hint-display"></div>
                    </div>
                    
                    <div class="game-actions">
                        <button class="btn btn-primary test-password" id="test-password" disabled>
                            🧪 Probar Contraseña
                        </button>
                        <button class="btn btn-tertiary generate-example" id="generate-example">
                            ⚡ Ver Ejemplo
                        </button>
                        <button class="btn btn-success submit-password" id="submit-password" disabled>
                            ✅ Enviar Contraseña
                        </button>
                    </div>
                </div>
                
                <div class="game-feedback" id="game-feedback"></div>
            </div>
        `;
    }

    start() {
        const content = super.start();
        
        // Setup game-specific event listeners after content is added to DOM
        setTimeout(() => {
            this.setupGameEventListeners();
        }, 100);
        
        return content;
    }

    setupGameEventListeners() {
        const passwordInput = document.getElementById('builder-password');
        const testButton = document.getElementById('test-password');
        const submitButton = document.getElementById('submit-password');
        const hintButton = document.getElementById('get-hint');
        const generateButton = document.getElementById('generate-example');
        const toggleButton = document.querySelector('.password-visibility-toggle');

        if (passwordInput) {
            passwordInput.addEventListener('input', this.handlePasswordInput.bind(this));
            passwordInput.addEventListener('keyup', this.handlePasswordInput.bind(this));
        }

        if (testButton) {
            testButton.addEventListener('click', this.testPassword.bind(this));
        }

        if (submitButton) {
            submitButton.addEventListener('click', this.submitPassword.bind(this));
        }

        if (hintButton) {
            hintButton.addEventListener('click', this.showHint.bind(this));
        }

        if (generateButton) {
            generateButton.addEventListener('click', this.generateExample.bind(this));
        }

        if (toggleButton) {
            toggleButton.addEventListener('click', this.togglePasswordVisibility.bind(this));
        }
    }

    handlePasswordInput(event) {
        const password = event.target.value;
        this.analyzePassword(password);
        
        const testButton = document.getElementById('test-password');
        const submitButton = document.getElementById('submit-password');
        
        if (testButton) testButton.disabled = password.length === 0;
        if (submitButton) submitButton.disabled = password.length === 0;
    }

    analyzePassword(password) {
        const analysis = this.getPasswordAnalysis(password);
        this.updatePasswordStrengthDisplay(analysis);
        this.updateRequirements(analysis.requirements);
        
        return analysis;
    }

    getPasswordAnalysis(password) {
        const requirements = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            numbers: /\d/.test(password),
            symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            'no-common': !this.isCommonPassword(password)
        };

        const score = this.calculatePasswordScore(password, requirements);
        const strength = this.getStrengthLevel(score);

        return {
            score,
            strength,
            requirements,
            feedback: this.generateFeedback(password, requirements)
        };
    }

    calculatePasswordScore(password, requirements) {
        let score = 0;
        
        // Base score from requirements
        Object.values(requirements).forEach(met => {
            if (met) score += 16.67; // 100 / 6 requirements
        });
        
        // Length bonus
        if (password.length > 12) score += 10;
        if (password.length > 16) score += 10;
        
        // Diversity bonus
        const uniqueChars = new Set(password).size;
        if (uniqueChars > password.length * 0.7) score += 10;
        
        // Penalty for common patterns
        if (/(.)\1{2,}/.test(password)) score -= 10; // Repeated characters
        if (/123|abc|qwe/i.test(password)) score -= 15; // Sequential patterns
        
        return Math.max(0, Math.min(100, Math.round(score)));
    }

    getStrengthLevel(score) {
        if (score < 20) return { level: 0, text: 'Muy débil', class: 'very-weak' };
        if (score < 40) return { level: 1, text: 'Débil', class: 'weak' };
        if (score < 60) return { level: 2, text: 'Regular', class: 'fair' };
        if (score < 80) return { level: 3, text: 'Buena', class: 'good' };
        if (score < 95) return { level: 4, text: 'Fuerte', class: 'strong' };
        return { level: 5, text: 'Muy fuerte', class: 'very-strong' };
    }

    updatePasswordStrengthDisplay(analysis) {
        const strengthFill = document.querySelector('.strength-bar-fill');
        const strengthText = document.querySelector('.strength-text');
        const strengthPercentage = document.querySelector('.strength-percentage');

        if (strengthFill) {
            strengthFill.style.width = `${analysis.score}%`;
            strengthFill.setAttribute('data-strength', analysis.strength.level);
        }

        if (strengthText) {
            strengthText.textContent = analysis.strength.text;
            strengthText.className = `strength-text ${analysis.strength.class}`;
        }

        if (strengthPercentage) {
            strengthPercentage.textContent = `${analysis.score}%`;
        }
    }

    updateRequirements(requirements) {
        Object.entries(requirements).forEach(([requirement, met]) => {
            const element = document.querySelector(`[data-requirement="${requirement}"]`);
            if (element) {
                const icon = element.querySelector('.requirement-icon');
                if (icon) {
                    icon.textContent = met ? '✅' : '❌';
                }
                element.classList.toggle('met', met);
            }
        });
    }

    isCommonPassword(password) {
        const commonPasswords = [
            'password', 'contraseña', '123456', 'qwerty', 'abc123',
            'letmein', 'welcome', 'monkey', 'dragon', 'password123',
            '123456789', 'welcome123', 'admin', 'administrator'
        ];
        
        return commonPasswords.some(common => 
            password.toLowerCase().includes(common)
        );
    }

    generateFeedback(password, requirements) {
        const feedback = [];
        
        if (!requirements.length) {
            feedback.push('Usa al menos 8 caracteres');
        }
        if (!requirements.lowercase) {
            feedback.push('Incluye letras minúsculas');
        }
        if (!requirements.uppercase) {
            feedback.push('Incluye letras mayúsculas');
        }
        if (!requirements.numbers) {
            feedback.push('Incluye números');
        }
        if (!requirements.symbols) {
            feedback.push('Incluye símbolos especiales');
        }
        if (!requirements['no-common']) {
            feedback.push('Evita palabras comunes');
        }

        return feedback;
    }

    testPassword() {
        const password = document.getElementById('builder-password').value;
        const analysis = this.analyzePassword(password);
        
        this.showGameFeedback(
            `Contraseña analizada: ${analysis.strength.text} (${analysis.score}/100 puntos)`,
            analysis.score >= 80 ? 'success' : 'info'
        );
        
        this.attempts++;
        this.updateGameStats();
    }

    submitPassword() {
        const password = document.getElementById('builder-password').value;
        const analysis = this.analyzePassword(password);
        
        if (analysis.score >= 80) {
            this.updateScore(analysis.score);
            this.showGameFeedback(
                `¡Excelente! Tu contraseña tiene ${analysis.score} puntos. ¡Muy segura!`,
                'success'
            );
            
            setTimeout(() => {
                this.nextLevel();
            }, 2000);
        } else {
            this.showGameFeedback(
                `Necesitas al menos 80 puntos. Tu contraseña tiene ${analysis.score} puntos. ¡Inténtalo de nuevo!`,
                'warning'
            );
        }
        
        this.attempts++;
        this.updateGameStats();
        
        if (this.attempts >= this.maxAttempts && analysis.score < 80) {
            this.gameOver();
        }
    }

    showHint() {
        const hintsRemaining = this.hints.filter((_, index) => index < this.level);
        if (hintsRemaining.length === 0) {
            this.showGameFeedback('¡Ya no hay más pistas disponibles!', 'info');
            return;
        }
        
        const randomHint = hintsRemaining[Math.floor(Math.random() * hintsRemaining.length)];
        const hintDisplay = document.getElementById('hint-display');
        
        if (hintDisplay) {
            hintDisplay.innerHTML = `<div class="hint-card">💡 <strong>Pista:</strong> ${randomHint}</div>`;
            hintDisplay.style.display = 'block';
            
            setTimeout(() => {
                hintDisplay.style.display = 'none';
            }, 5000);
        }
    }

    generateExample() {
        const examples = [
            'MiGato2024!',
            'Casa#Verde89',
            'Libro&Sol456',
            'Pizza*Luna23',
            'Musica+Vida99'
        ];
        
        const example = examples[Math.floor(Math.random() * examples.length)];
        const passwordInput = document.getElementById('builder-password');
        
        if (passwordInput) {
            passwordInput.value = example;
            this.handlePasswordInput({ target: passwordInput });
        }
        
        this.showGameFeedback(
            `Ejemplo generado: "${example}". ¡Puedes usarlo como base y modificarlo!`,
            'info'
        );
    }

    togglePasswordVisibility() {
        const passwordInput = document.getElementById('builder-password');
        const eyeIcon = document.querySelector('.eye-icon');
        
        if (passwordInput && eyeIcon) {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            eyeIcon.textContent = isPassword ? '🙈' : '👁️';
        }
    }

    showGameFeedback(message, type = 'info') {
        const feedback = document.getElementById('game-feedback');
        if (feedback) {
            feedback.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
            feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    updateGameStats() {
        const statsElement = document.querySelector('.game-stats');
        if (statsElement) {
            statsElement.innerHTML = `
                <span class="badge badge-primary">Nivel ${this.level}</span>
                <span class="badge badge-success">Puntuación: ${this.score}</span>
                <span class="badge badge-warning">Intentos: ${this.attempts}/${this.maxAttempts}</span>
            `;
        }
    }

    nextLevel() {
        this.level++;
        this.attempts = 0;
        this.targetStrength = Math.min(5, this.targetStrength + 1);
        
        this.showGameFeedback(
            `¡Nivel ${this.level} desbloqueado! Ahora crea una contraseña aún más segura.`,
            'success'
        );
        
        // Reset form
        const passwordInput = document.getElementById('builder-password');
        if (passwordInput) {
            passwordInput.value = '';
            this.handlePasswordInput({ target: passwordInput });
        }
        
        this.updateGameStats();
    }

    gameOver() {
        this.stop();
        this.showGameFeedback(
            `¡Juego terminado! Puntuación final: ${this.score} puntos. ¡Buen trabajo!`,
            'success'
        );
    }
}

/**
 * Phishing Detective Game
 */
class PhishingDetectiveGame extends BaseGame {
    constructor() {
        super('phishing-detective', '🕵️ Detective Anti-Phishing');
        this.currentEmailIndex = 0;
        this.correctAnswers = 0;
        this.totalEmails = 0;
        this.emails = this.generateEmailDatabase();
    }

    generateEmailDatabase() {
        return [
            {
                legitimate: true,
                from: "servicio@banco-nacional.com",
                subject: "Estado de cuenta mensual",
                body: "Estimado cliente, su estado de cuenta del mes está disponible. Para consultarlo, ingrese a nuestra página oficial con sus credenciales habituales.",
                clues: ["Remitente oficial", "Sin urgencia", "No pide datos", "Gramática correcta"]
            },
            {
                legitimate: false,
                from: "urgente@banco-segur0.net",
                subject: "⚠️ CUENTA SUSPENDIDA - ACTÚE INMEDIATAMENTE",
                body: "Su cuenta ha sido suspendida por actividad sospechosa. Debe verificar sus datos AHORA haciendo clic aquí: banco-verificacion-urgente.com y proporcionar su contraseña completa.",
                clues: ["Dominio sospechoso", "Urgencia extrema", "Pide contraseña", "Enlace externo sospechoso"]
            },
            {
                legitimate: true,
                from: "notificaciones@escuela-madrid.edu",
                subject: "Reunión de padres - Próxima semana",
                body: "Les recordamos que la reunión de padres será el próximo viernes a las 18:00 en el aula magna. Por favor confirmen su asistencia respondiendo este correo.",
                clues: ["Institución educativa", "Información normal", "No pide datos", "Contexto apropiado"]
            },
            {
                legitimate: false,
                from: "premio@concurso-fantastico.org",
                subject: "¡¡¡GANASTE UN IPHONE!!! ¡¡¡RECLAMA YA!!!",
                body: "¡Felicidades! Has ganado un iPhone 15 Pro en nuestro concurso. Para reclamarlo, envía tu nombre completo, dirección y número de cuenta bancaria a este correo ANTES DE MEDIANOCHE.",
                clues: ["Premio no solicitado", "Exceso de exclamaciones", "Pide datos bancarios", "Presión temporal"]
            }
        ];
    }

    generateContent() {
        return `
            <div class="phishing-detective-game">
                <div class="game-header">
                    <h3>🕵️ Detective Anti-Phishing</h3>
                    <div class="detective-stats">
                        <span class="badge badge-primary">Email ${this.currentEmailIndex + 1}/${this.emails.length}</span>
                        <span class="badge badge-success">Aciertos: ${this.correctAnswers}</span>
                        <span class="badge badge-info">Puntuación: ${this.score}</span>
                    </div>
                </div>
                
                <div class="game-objective">
                    <p><strong>Misión:</strong> Analiza cada email y determina si es legítimo o phishing. ¡Usa tus conocimientos de detective!</p>
                </div>
                
                <div class="email-container">
                    <div class="email-viewer" id="email-viewer">
                        <!-- Email content will be loaded here -->
                    </div>
                    
                    <div class="analysis-tools">
                        <div class="clue-system">
                            <button class="btn btn-secondary" id="analyze-sender">🔍 Analizar Remitente</button>
                            <button class="btn btn-secondary" id="analyze-content">📝 Analizar Contenido</button>
                            <button class="btn btn-secondary" id="analyze-links">🔗 Verificar Enlaces</button>
                        </div>
                        <div class="clues-display" id="clues-display"></div>
                    </div>
                    
                    <div class="detective-controls">
                        <button class="btn btn-success detective-answer" id="legitimate-btn">
                            ✅ Legítimo
                        </button>
                        <button class="btn btn-danger detective-answer" id="phishing-btn">
                            ⚠️ Phishing
                        </button>
                    </div>
                </div>
                
                <div class="game-feedback" id="detective-feedback"></div>
            </div>
        `;
    }

    start() {
        const content = super.start();
        
        setTimeout(() => {
            this.setupGameEventListeners();
            this.loadCurrentEmail();
        }, 100);
        
        return content;
    }

    setupGameEventListeners() {
        const legitimateBtn = document.getElementById('legitimate-btn');
        const phishingBtn = document.getElementById('phishing-btn');
        const analyzeSender = document.getElementById('analyze-sender');
        const analyzeContent = document.getElementById('analyze-content');
        const analyzeLinks = document.getElementById('analyze-links');

        if (legitimateBtn) {
            legitimateBtn.addEventListener('click', () => this.checkAnswer(true));
        }

        if (phishingBtn) {
            phishingBtn.addEventListener('click', () => this.checkAnswer(false));
        }

        if (analyzeSender) {
            analyzeSender.addEventListener('click', () => this.analyzeSender());
        }

        if (analyzeContent) {
            analyzeContent.addEventListener('click', () => this.analyzeContent());
        }

        if (analyzeLinks) {
            analyzeLinks.addEventListener('click', () => this.analyzeLinks());
        }
    }

    loadCurrentEmail() {
        if (this.currentEmailIndex >= this.emails.length) {
            this.completeGame();
            return;
        }

        const email = this.emails[this.currentEmailIndex];
        const emailViewer = document.getElementById('email-viewer');
        
        if (emailViewer) {
            emailViewer.innerHTML = `
                <div class="email-header">
                    <div class="email-field">
                        <strong>De:</strong> <span class="email-sender">${email.from}</span>
                    </div>
                    <div class="email-field">
                        <strong>Asunto:</strong> <span class="email-subject">${email.subject}</span>
                    </div>
                    <div class="email-field">
                        <strong>Fecha:</strong> <span class="email-date">${this.generateRandomDate()}</span>
                    </div>
                </div>
                <div class="email-body">
                    <p>${email.body}</p>
                </div>
            `;
        }

        // Clear clues and feedback
        const cluesDisplay = document.getElementById('clues-display');
        if (cluesDisplay) {
            cluesDisplay.innerHTML = '';
        }

        const feedback = document.getElementById('detective-feedback');
        if (feedback) {
            feedback.innerHTML = '';
        }

        // Enable answer buttons
        this.toggleAnswerButtons(false);
    }

    analyzeSender() {
        const email = this.emails[this.currentEmailIndex];
        const cluesDisplay = document.getElementById('clues-display');
        
        let analysis = '';
        if (email.legitimate) {
            analysis = `✅ El remitente "${email.from}" parece ser de una organización legítima con dominio oficial.`;
        } else {
            analysis = `⚠️ El remitente "${email.from}" presenta señales sospechosas: dominio poco común, errores ortográficos o imitación.`;
        }
        
        this.showClue('Análisis del Remitente', analysis);
    }

    analyzeContent() {
        const email = this.emails[this.currentEmailIndex];
        
        let analysis = '';
        if (email.legitimate) {
            analysis = `✅ El contenido es profesional, sin presión excesiva y no solicita información sensible de forma inapropiada.`;
        } else {
            analysis = `⚠️ El contenido muestra signos de phishing: urgencia extrema, solicitud de datos personales o errores gramaticales.`;
        }
        
        this.showClue('Análisis del Contenido', analysis);
    }

    analyzeLinks() {
        const email = this.emails[this.currentEmailIndex];
        
        let analysis = '';
        if (email.legitimate) {
            analysis = `✅ Los enlaces (si los hay) parecen dirigir a sitios oficiales de la organización.`;
        } else {
            analysis = `⚠️ Los enlaces son sospechosos: dominios extraños, URLs acortadas o que no coinciden con el remitente oficial.`;
        }
        
        this.showClue('Verificación de Enlaces', analysis);
    }

    showClue(title, content) {
        const cluesDisplay = document.getElementById('clues-display');
        if (cluesDisplay) {
            const clueElement = document.createElement('div');
            clueElement.className = 'clue-card';
            clueElement.innerHTML = `
                <h4>${title}</h4>
                <p>${content}</p>
            `;
            cluesDisplay.appendChild(clueElement);
        }
    }

    checkAnswer(userAnswer) {
        const email = this.emails[this.currentEmailIndex];
        const correct = email.legitimate === userAnswer;
        
        this.totalEmails++;
        
        if (correct) {
            this.correctAnswers++;
            this.updateScore(25);
            this.showFeedback(
                `¡Correcto! 🎉 ${email.legitimate ? 'Este email es legítimo' : 'Este email es phishing'}.`,
                'success'
            );
        } else {
            this.showFeedback(
                `Incorrecto. ${email.legitimate ? 'Este email era legítimo' : 'Este email era phishing'}. ${this.getExplanation(email)}`,
                'error'
            );
        }

        // Show email clues
        this.showEmailClues(email);
        
        // Disable answer buttons
        this.toggleAnswerButtons(true);
        
        // Move to next email after delay
        setTimeout(() => {
            this.currentEmailIndex++;
            this.updateStats();
            this.loadCurrentEmail();
        }, 4000);
    }

    getExplanation(email) {
        if (email.clues && email.clues.length > 0) {
            return `Señales clave: ${email.clues.join(', ')}.`;
        }
        return '';
    }

    showEmailClues(email) {
        if (email.clues) {
            const cluesDisplay = document.getElementById('clues-display');
            if (cluesDisplay) {
                const cluesElement = document.createElement('div');
                cluesElement.className = 'email-clues';
                cluesElement.innerHTML = `
                    <h4>Señales de este email:</h4>
                    <ul>
                        ${email.clues.map(clue => `<li>${clue}</li>`).join('')}
                    </ul>
                `;
                cluesDisplay.appendChild(cluesElement);
            }
        }
    }

    showFeedback(message, type) {
        const feedback = document.getElementById('detective-feedback');
        if (feedback) {
            feedback.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
        }
    }

    toggleAnswerButtons(disabled) {
        const buttons = document.querySelectorAll('.detective-answer');
        buttons.forEach(button => {
            button.disabled = disabled;
        });
    }

    updateStats() {
        const statsElement = document.querySelector('.detective-stats');
        if (statsElement) {
            statsElement.innerHTML = `
                <span class="badge badge-primary">Email ${this.currentEmailIndex + 1}/${this.emails.length}</span>
                <span class="badge badge-success">Aciertos: ${this.correctAnswers}</span>
                <span class="badge badge-info">Puntuación: ${this.score}</span>
            `;
        }
    }

    completeGame() {
        const accuracy = Math.round((this.correctAnswers / this.totalEmails) * 100);
        const finalScore = this.score + (accuracy > 75 ? 50 : 0); // Bonus for high accuracy
        
        this.updateScore(finalScore - this.score);
        
        const feedback = document.getElementById('detective-feedback');
        if (feedback) {
            feedback.innerHTML = `
                <div class="game-completion">
                    <h3>🏆 ¡Misión Completada!</h3>
                    <div class="final-stats">
                        <p><strong>Emails analizados:</strong> ${this.totalEmails}</p>
                        <p><strong>Respuestas correctas:</strong> ${this.correctAnswers}</p>
                        <p><strong>Precisión:</strong> ${accuracy}%</p>
                        <p><strong>Puntuación final:</strong> ${this.score} puntos</p>
                    </div>
                    <div class="achievement">
                        ${accuracy >= 90 ? '🥇 ¡Detective Experto!' : 
                          accuracy >= 75 ? '🥈 ¡Buen Detective!' : 
                          '🥉 ¡Detective en Entrenamiento!'}
                    </div>
                </div>
            `;
        }
        
        this.stop();
    }

    generateRandomDate() {
        const now = new Date();
        const daysAgo = Math.floor(Math.random() * 7) + 1;
        const date = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
        
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

/**
 * Privacy Guardian Game
 */
class PrivacyGuardianGame extends BaseGame {
    constructor() {
        super('privacy-guardian', '🛡️ Guardián de la Privacidad');
        this.scenarios = this.generateScenarios();
        this.currentScenarioIndex = 0;
        this.correctDecisions = 0;
        this.dataProtected = 0;
    }

    generateScenarios() {
        return [
            {
                title: "Post en Redes Sociales",
                description: "Un niño quiere publicar una foto de su casa con la dirección visible en el fondo.",
                shouldAllow: false,
                reason: "Las direcciones son información privada que no debe compartirse públicamente.",
                risk: "Alto",
                type: "social-media"
            },
            {
                title: "Solicitud de Información",
                description: "Un sitio web educativo pide el nombre y edad para personalizar el contenido.",
                shouldAllow: true,
                reason: "La información es básica y apropiada para el contexto educativo.",
                risk: "Bajo",
                type: "website"
            },
            {
                title: "Descarga de Aplicación",
                description: "Una aplicación de juegos pide acceso a la cámara, micrófono y contactos.",
                shouldAllow: false,
                reason: "Los juegos no necesitan acceso a datos personales sensibles.",
                risk: "Alto",
                type: "app"
            },
            {
                title: "Formulario Escolar",
                description: "La escuela solicita información de contacto de emergencia de los padres.",
                shouldAllow: true,
                reason: "Es información necesaria para la seguridad del estudiante en contexto escolar.",
                risk: "Bajo",
                type: "school"
            }
        ];
    }

    generateContent() {
        return `
            <div class="privacy-guardian-game">
                <div class="game-header">
                    <h3>🛡️ Guardián de la Privacidad</h3>
                    <div class="guardian-stats">
                        <span class="badge badge-primary">Escenario ${this.currentScenarioIndex + 1}/${this.scenarios.length}</span>
                        <span class="badge badge-success">Decisiones correctas: ${this.correctDecisions}</span>
                        <span class="badge badge-info">Datos protegidos: ${this.dataProtected}</span>
                    </div>
                </div>
                
                <div class="game-objective">
                    <p><strong>Misión:</strong> Protege la información personal de los usuarios. Decide si permitir o bloquear cada solicitud.</p>
                </div>
                
                <div class="scenario-container">
                    <div class="scenario-display" id="scenario-display">
                        <!-- Scenario content will be loaded here -->
                    </div>
                    
                    <div class="risk-assessment">
                        <h4>Herramientas de Análisis:</h4>
                        <div class="assessment-tools">
                            <button class="btn btn-secondary" id="assess-necessity">❓ ¿Es necesario?</button>
                            <button class="btn btn-secondary" id="assess-context">🔍 Analizar contexto</button>
                            <button class="btn btn-secondary" id="assess-risks">⚠️ Evaluar riesgos</button>
                        </div>
                        <div class="assessment-results" id="assessment-results"></div>
                    </div>
                    
                    <div class="guardian-controls">
                        <button class="btn btn-success guardian-decision" id="allow-btn">
                            ✅ Permitir
                        </button>
                        <button class="btn btn-danger guardian-decision" id="block-btn">
                            🚫 Bloquear
                        </button>
                    </div>
                </div>
                
                <div class="game-feedback" id="guardian-feedback"></div>
            </div>
        `;
    }

    start() {
        const content = super.start();
        
        setTimeout(() => {
            this.setupGameEventListeners();
            this.loadCurrentScenario();
        }, 100);
        
        return content;
    }

    setupGameEventListeners() {
        const allowBtn = document.getElementById('allow-btn');
        const blockBtn = document.getElementById('block-btn');
        const assessNecessity = document.getElementById('assess-necessity');
        const assessContext = document.getElementById('assess-context');
        const assessRisks = document.getElementById('assess-risks');

        if (allowBtn) {
            allowBtn.addEventListener('click', () => this.makeDecision(true));
        }

        if (blockBtn) {
            blockBtn.addEventListener('click', () => this.makeDecision(false));
        }

        if (assessNecessity) {
            assessNecessity.addEventListener('click', () => this.assessNecessity());
        }

        if (assessContext) {
            assessContext.addEventListener('click', () => this.assessContext());
        }

        if (assessRisks) {
            assessRisks.addEventListener('click', () => this.assessRisks());
        }
    }

    loadCurrentScenario() {
        if (this.currentScenarioIndex >= this.scenarios.length) {
            this.completeGame();
            return;
        }

        const scenario = this.scenarios[this.currentScenarioIndex];
        const scenarioDisplay = document.getElementById('scenario-display');
        
        if (scenarioDisplay) {
            scenarioDisplay.innerHTML = `
                <div class="scenario-card">
                    <div class="scenario-header">
                        <h4>${scenario.title}</h4>
                        <span class="risk-badge risk-${scenario.risk.toLowerCase()}">${scenario.risk} Riesgo</span>
                    </div>
                    <div class="scenario-body">
                        <p>${scenario.description}</p>
                    </div>
                    <div class="scenario-metadata">
                        <span class="scenario-type">Tipo: ${this.getTypeDisplay(scenario.type)}</span>
                    </div>
                </div>
            `;
        }

        // Clear assessment results
        const assessmentResults = document.getElementById('assessment-results');
        if (assessmentResults) {
            assessmentResults.innerHTML = '';
        }

        // Enable decision buttons
        this.toggleDecisionButtons(false);
    }

    getTypeDisplay(type) {
        const types = {
            'social-media': '📱 Redes Sociales',
            'website': '🌐 Sitio Web',
            'app': '📱 Aplicación',
            'school': '🏫 Escuela'
        };
        return types[type] || type;
    }

    assessNecessity() {
        const scenario = this.scenarios[this.currentScenarioIndex];
        
        let assessment = '';
        if (scenario.shouldAllow) {
            assessment = '✅ Esta información parece necesaria para el propósito declarado.';
        } else {
            assessment = '❌ Esta información NO es necesaria para la función principal.';
        }
        
        this.showAssessment('Necesidad de la información', assessment);
    }

    assessContext() {
        const scenario = this.scenarios[this.currentScenarioIndex];
        
        const contexts = {
            'social-media': 'Redes sociales públicas donde la información puede ser vista por extraños',
            'website': 'Sitio web que puede almacenar y usar la información para diversos propósitos',
            'app': 'Aplicación que puede acceder a datos del dispositivo y compartirlos',
            'school': 'Contexto educativo oficial con protocolos de privacidad establecidos'
        };
        
        const contextInfo = contexts[scenario.type] || 'Contexto desconocido';
        this.showAssessment('Análisis del contexto', `📍 ${contextInfo}`);
    }

    assessRisks() {
        const scenario = this.scenarios[this.currentScenarioIndex];
        
        let riskAssessment = '';
        switch (scenario.risk) {
            case 'Alto':
                riskAssessment = '🔴 ALTO: La información puede ser usada para localizar, contactar o hacer daño al usuario.';
                break;
            case 'Medio':
                riskAssessment = '🟡 MEDIO: Existe algún riesgo pero es limitado y controlable.';
                break;
            case 'Bajo':
                riskAssessment = '🟢 BAJO: Los riesgos son mínimos y están dentro de límites aceptables.';
                break;
        }
        
        this.showAssessment('Evaluación de riesgos', riskAssessment);
    }

    showAssessment(title, content) {
        const assessmentResults = document.getElementById('assessment-results');
        if (assessmentResults) {
            const assessmentElement = document.createElement('div');
            assessmentElement.className = 'assessment-card';
            assessmentElement.innerHTML = `
                <h5>${title}</h5>
                <p>${content}</p>
            `;
            assessmentResults.appendChild(assessmentElement);
        }
    }

    makeDecision(allow) {
        const scenario = this.scenarios[this.currentScenarioIndex];
        const correct = scenario.shouldAllow === allow;
        
        if (correct) {
            this.correctDecisions++;
            this.updateScore(20);
            if (!allow) {
                this.dataProtected++;
            }
            
            this.showFeedback(
                `¡Decisión correcta! 🎉 ${scenario.reason}`,
                'success'
            );
        } else {
            this.showFeedback(
                `Decisión incorrecta. ${scenario.reason}`,
                'error'
            );
        }

        // Disable decision buttons
        this.toggleDecisionButtons(true);
        
        // Move to next scenario after delay
        setTimeout(() => {
            this.currentScenarioIndex++;
            this.updateStats();
            this.loadCurrentScenario();
        }, 4000);
    }

    showFeedback(message, type) {
        const feedback = document.getElementById('guardian-feedback');
        if (feedback) {
            feedback.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
        }
    }

    toggleDecisionButtons(disabled) {
        const buttons = document.querySelectorAll('.guardian-decision');
        buttons.forEach(button => {
            button.disabled = disabled;
        });
    }

    updateStats() {
        const statsElement = document.querySelector('.guardian-stats');
        if (statsElement) {
            statsElement.innerHTML = `
                <span class="badge badge-primary">Escenario ${this.currentScenarioIndex + 1}/${this.scenarios.length}</span>
                <span class="badge badge-success">Decisiones correctas: ${this.correctDecisions}</span>
                <span class="badge badge-info">Datos protegidos: ${this.dataProtected}</span>
            `;
        }
    }

    completeGame() {
        const accuracy = Math.round((this.correctDecisions / this.scenarios.length) * 100);
        const protectionRate = Math.round((this.dataProtected / this.scenarios.length) * 100);
        const finalScore = this.score + (accuracy > 75 ? 30 : 0) + (this.dataProtected * 10);
        
        this.updateScore(finalScore - this.score);
        
        const feedback = document.getElementById('guardian-feedback');
        if (feedback) {
            feedback.innerHTML = `
                <div class="game-completion">
                    <h3>🏆 ¡Misión de Protección Completada!</h3>
                    <div class="final-stats">
                        <p><strong>Escenarios evaluados:</strong> ${this.scenarios.length}</p>
                        <p><strong>Decisiones correctas:</strong> ${this.correctDecisions}</p>
                        <p><strong>Precisión:</strong> ${accuracy}%</p>
                        <p><strong>Datos protegidos:</strong> ${this.dataProtected}</p>
                        <p><strong>Puntuación final:</strong> ${this.score} puntos</p>
                    </div>
                    <div class="achievement">
                        ${accuracy >= 90 ? '🏅 ¡Guardián Supremo de la Privacidad!' : 
                          accuracy >= 75 ? '🛡️ ¡Buen Guardián de la Privacidad!' : 
                          '🔰 ¡Guardián en Entrenamiento!'}
                    </div>
                </div>
            `;
        }
        
        this.stop();
    }
}

// Initialize game manager when DOM is ready
let gameManager;

document.addEventListener('DOMContentLoaded', () => {
    gameManager = new GameManager();
});

// Export for global access
window.GameManager = GameManager;
window.getGameManager = () => gameManager;

console.log('🎮 Games system loaded successfully!');