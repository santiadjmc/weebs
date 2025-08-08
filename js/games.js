// Interactive Games and Quizzes for CyberNiños Application

class CyberGamesManager {
    constructor() {
        this.currentGame = null;
        this.gameState = {};
        this.scores = this.loadScores();
        this.init();
    }

    init() {
        console.log('🎮 Games Manager Initialized');
        this.setupGameEventListeners();
    }

    setupGameEventListeners() {
        document.addEventListener('click', (e) => {
            // Listen for game trigger buttons
            if (e.target.matches('[data-game]')) {
                const gameType = e.target.getAttribute('data-game');
                this.startGame(gameType);
            }
        });
    }

    startGame(gameType) {
        console.log(`🎮 Starting game: ${gameType}`);
        
        switch (gameType) {
            case 'password-strength':
                this.startPasswordStrengthGame();
                break;
            case 'phishing-detective':
                this.startPhishingDetectiveGame();
                break;
            case 'privacy-guardian':
                this.startPrivacyGuardianGame();
                break;
            case 'social-media-quiz':
                this.startSocialMediaQuiz();
                break;
            case 'cyber-hero-challenge':
                this.startCyberHeroChallenge();
                break;
            default:
                console.warn('Unknown game type:', gameType);
        }
    }

    // Password Strength Game
    startPasswordStrengthGame() {
        const gameModal = this.createGameModal('password-strength', 'Fortaleza de Contraseñas');
        
        gameModal.innerHTML = `
            <div class="game-header">
                <h3>🔐 Juego de Fortaleza de Contraseñas</h3>
                <button class="close-game" aria-label="Cerrar juego">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="game-content">
                <div class="game-instructions">
                    <p>¡Crea la contraseña más fuerte posible! Usa diferentes tipos de caracteres para ganar puntos.</p>
                </div>
                <div class="password-game">
                    <div class="password-input-group">
                        <input type="text" id="passwordInput" placeholder="Escribe tu contraseña aquí..." 
                               class="password-game-input" autocomplete="off">
                        <button id="revealPassword" class="reveal-btn" aria-label="Mostrar/ocultar contraseña">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    <div class="password-strength-meter">
                        <div class="strength-bar">
                            <div class="strength-fill" id="strengthFill"></div>
                        </div>
                        <div class="strength-text" id="strengthText">Muy débil</div>
                    </div>
                    <div class="password-criteria">
                        <div class="criterion" data-criterion="length">
                            <i class="fas fa-times criterion-icon"></i>
                            <span>Al menos 8 caracteres</span>
                        </div>
                        <div class="criterion" data-criterion="lowercase">
                            <i class="fas fa-times criterion-icon"></i>
                            <span>Letras minúsculas</span>
                        </div>
                        <div class="criterion" data-criterion="uppercase">
                            <i class="fas fa-times criterion-icon"></i>
                            <span>Letras mayúsculas</span>
                        </div>
                        <div class="criterion" data-criterion="numbers">
                            <i class="fas fa-times criterion-icon"></i>
                            <span>Números</span>
                        </div>
                        <div class="criterion" data-criterion="special">
                            <i class="fas fa-times criterion-icon"></i>
                            <span>Símbolos especiales</span>
                        </div>
                    </div>
                    <div class="password-score">
                        <h4>Puntuación: <span id="passwordScore">0</span>/100</h4>
                    </div>
                    <div class="password-tips">
                        <h4>💡 Consejos:</h4>
                        <ul>
                            <li>Usa una frase que solo tú conozcas</li>
                            <li>Combina letras, números y símbolos</li>
                            <li>Evita información personal obvia</li>
                            <li>Haz que sea larga pero memorable</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        this.setupPasswordStrengthGame(gameModal);
        this.showGameModal(gameModal);
    }

    setupPasswordStrengthGame(modal) {
        const passwordInput = modal.querySelector('#passwordInput');
        const revealButton = modal.querySelector('#revealPassword');
        const strengthFill = modal.querySelector('#strengthFill');
        const strengthText = modal.querySelector('#strengthText');
        const scoreElement = modal.querySelector('#passwordScore');
        const criteria = modal.querySelectorAll('.criterion');

        let isRevealed = false;

        // Password reveal toggle
        revealButton.addEventListener('click', () => {
            isRevealed = !isRevealed;
            passwordInput.type = isRevealed ? 'text' : 'password';
            revealButton.innerHTML = `<i class="fas fa-${isRevealed ? 'eye-slash' : 'eye'}"></i>`;
        });

        // Password input listener
        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const strength = this.calculatePasswordStrength(password);
            this.updatePasswordStrengthDisplay(strength, strengthFill, strengthText, scoreElement, criteria);
        });

        // Focus on input
        passwordInput.focus();
    }

    calculatePasswordStrength(password) {
        let score = 0;
        const criteria = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            numbers: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        // Base scoring
        if (criteria.length) score += 20;
        if (criteria.lowercase) score += 15;
        if (criteria.uppercase) score += 15;
        if (criteria.numbers) score += 15;
        if (criteria.special) score += 15;

        // Bonus points for longer passwords
        if (password.length >= 12) score += 10;
        if (password.length >= 16) score += 10;

        // Check for common patterns (deduct points)
        if (/123456|password|qwerty|abc|111/i.test(password)) score -= 30;

        score = Math.max(0, Math.min(100, score));

        return { score, criteria };
    }

    updatePasswordStrengthDisplay(strength, fillElement, textElement, scoreElement, criteriaElements) {
        const { score, criteria } = strength;
        
        // Update progress bar
        fillElement.style.width = `${score}%`;
        
        // Update colors and text based on strength
        let strengthLevel, color;
        if (score < 30) {
            strengthLevel = 'Muy débil';
            color = '#ff006e';
        } else if (score < 50) {
            strengthLevel = 'Débil';
            color = '#ffd60a';
        } else if (score < 70) {
            strengthLevel = 'Regular';
            color = '#06d6a0';
        } else if (score < 90) {
            strengthLevel = 'Fuerte';
            color = '#4c6ef5';
        } else {
            strengthLevel = '¡Excelente!';
            color = '#06ffa5';
        }

        fillElement.style.background = color;
        textElement.textContent = strengthLevel;
        textElement.style.color = color;
        scoreElement.textContent = score;

        // Update criteria checkmarks
        criteriaElements.forEach(criterion => {
            const criterionType = criterion.getAttribute('data-criterion');
            const icon = criterion.querySelector('.criterion-icon');
            
            if (criteria[criterionType]) {
                icon.className = 'fas fa-check criterion-icon';
                criterion.style.color = '#06d6a0';
            } else {
                icon.className = 'fas fa-times criterion-icon';
                criterion.style.color = '#ff006e';
            }
        });

        // Award achievements
        if (score >= 80) {
            this.awardAchievement('password-master', '¡Maestro de Contraseñas!');
        }
    }

    // Phishing Detective Game
    startPhishingDetectiveGame() {
        const gameModal = this.createGameModal('phishing-detective', 'Detective Anti-Phishing');
        
        const phishingEmails = [
            {
                sender: 'banco.seguro@correo-oficial.com',
                subject: 'URGENTE: Verificar tu cuenta inmediatamente',
                content: 'Tu cuenta será suspendida en 24 horas. Haz clic aquí para verificar: http://banco-falso.com/verificar',
                isPhishing: true,
                clues: ['URL sospechosa', 'Urgencia artificial', 'Dominio incorrecto']
            },
            {
                sender: 'soporte@netflix.com',
                subject: 'Confirmación de nueva suscripción',
                content: 'Gracias por suscribirte a Netflix Premium. Tu suscripción comenzará el próximo mes.',
                isPhishing: false,
                clues: ['Dominio oficial', 'Sin urgencia', 'Información clara']
            },
            {
                sender: 'premio@loteriafalsa.net',
                subject: '¡GANASTE $1,000,000! Reclama tu premio',
                content: 'Felicidades, has ganado nuestra lotería internacional. Envía tus datos bancarios para reclamar.',
                isPhishing: true,
                clues: ['Premio no solicitado', 'Solicita datos bancarios', 'Dominio sospechoso']
            }
        ];

        gameModal.innerHTML = `
            <div class="game-header">
                <h3>🕵️ Detective Anti-Phishing</h3>
                <button class="close-game" aria-label="Cerrar juego">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="game-content">
                <div class="game-instructions">
                    <p>¡Ayuda a identificar los correos de phishing! Lee cada email y decide si es real o falso.</p>
                    <div class="game-stats">
                        <span>Puntuación: <strong id="phishingScore">0</strong></span>
                        <span>Email <strong id="emailCounter">1</strong> de ${phishingEmails.length}</span>
                    </div>
                </div>
                <div class="phishing-game">
                    <div class="email-viewer" id="emailViewer">
                        <!-- Email content will be populated here -->
                    </div>
                    <div class="game-controls">
                        <button class="game-btn legitimate-btn" id="legitimateBtn">
                            <i class="fas fa-check-circle"></i>
                            Es Legítimo
                        </button>
                        <button class="game-btn phishing-btn" id="phishingBtn">
                            <i class="fas fa-exclamation-triangle"></i>
                            Es Phishing
                        </button>
                    </div>
                    <div class="feedback-area" id="feedbackArea"></div>
                </div>
            </div>
        `;

        this.setupPhishingDetectiveGame(gameModal, phishingEmails);
        this.showGameModal(gameModal);
    }

    setupPhishingDetectiveGame(modal, emails) {
        let currentEmailIndex = 0;
        let score = 0;
        
        const emailViewer = modal.querySelector('#emailViewer');
        const scoreElement = modal.querySelector('#phishingScore');
        const counterElement = modal.querySelector('#emailCounter');
        const legitimateBtn = modal.querySelector('#legitimateBtn');
        const phishingBtn = modal.querySelector('#phishingBtn');
        const feedbackArea = modal.querySelector('#feedbackArea');

        const showCurrentEmail = () => {
            const email = emails[currentEmailIndex];
            emailViewer.innerHTML = `
                <div class="email-header">
                    <div class="email-from">
                        <strong>De:</strong> ${email.sender}
                    </div>
                    <div class="email-subject">
                        <strong>Asunto:</strong> ${email.subject}
                    </div>
                </div>
                <div class="email-body">
                    <p>${email.content}</p>
                </div>
            `;
            counterElement.textContent = currentEmailIndex + 1;
        };

        const handleAnswer = (userAnswer) => {
            const email = emails[currentEmailIndex];
            const isCorrect = (userAnswer === 'phishing' && email.isPhishing) || 
                             (userAnswer === 'legitimate' && !email.isPhishing);
            
            if (isCorrect) {
                score += 10;
                scoreElement.textContent = score;
            }

            // Show feedback
            feedbackArea.innerHTML = `
                <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
                    <h4>${isCorrect ? '¡Correcto!' : 'Incorrecto'}</h4>
                    <p>Este email ${email.isPhishing ? 'ES' : 'NO ES'} phishing.</p>
                    <div class="clues">
                        <strong>Pistas clave:</strong>
                        <ul>
                            ${email.clues.map(clue => `<li>${clue}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;

            // Disable buttons temporarily
            legitimateBtn.disabled = true;
            phishingBtn.disabled = true;

            setTimeout(() => {
                currentEmailIndex++;
                if (currentEmailIndex < emails.length) {
                    showCurrentEmail();
                    feedbackArea.innerHTML = '';
                    legitimateBtn.disabled = false;
                    phishingBtn.disabled = false;
                } else {
                    this.showPhishingGameResults(modal, score, emails.length);
                }
            }, 3000);
        };

        legitimateBtn.addEventListener('click', () => handleAnswer('legitimate'));
        phishingBtn.addEventListener('click', () => handleAnswer('phishing'));

        showCurrentEmail();
    }

    showPhishingGameResults(modal, score, totalEmails) {
        const maxScore = totalEmails * 10;
        const percentage = Math.round((score / maxScore) * 100);
        
        modal.querySelector('.game-content').innerHTML = `
            <div class="game-results">
                <h3>🏆 ¡Juego Completado!</h3>
                <div class="results-stats">
                    <div class="stat-item">
                        <span class="stat-number">${score}</span>
                        <span class="stat-label">Puntos Totales</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${percentage}%</span>
                        <span class="stat-label">Precisión</span>
                    </div>
                </div>
                <div class="results-message">
                    ${this.getPhishingResultsMessage(percentage)}
                </div>
                <button class="game-btn play-again-btn" onclick="location.reload()">
                    <i class="fas fa-redo"></i>
                    Jugar de Nuevo
                </button>
            </div>
        `;

        if (percentage >= 80) {
            this.awardAchievement('phishing-detective', '¡Detective Anti-Phishing Experto!');
        }
    }

    getPhishingResultsMessage(percentage) {
        if (percentage === 100) {
            return '🌟 ¡Perfecto! Eres un verdadero detective anti-phishing.';
        } else if (percentage >= 80) {
            return '👏 ¡Excelente trabajo! Tienes muy buen ojo para detectar phishing.';
        } else if (percentage >= 60) {
            return '👍 ¡Bien hecho! Con un poco más de práctica serás un experto.';
        } else {
            return '🤔 ¡Sigue practicando! Recuerda revisar las pistas clave.';
        }
    }

    // Social Media Quiz
    startSocialMediaQuiz() {
        const questions = [
            {
                question: '¿Qué información NO debes compartir públicamente en redes sociales?',
                options: [
                    'Tu comida favorita',
                    'Tu dirección de casa',
                    'Tus hobbies',
                    'Tus películas favoritas'
                ],
                correct: 1,
                explanation: 'Nunca compartas información personal como tu dirección, ya que puede ponerte en peligro.'
            },
            {
                question: '¿Cuál es la mejor práctica para las configuraciones de privacidad?',
                options: [
                    'Dejar todo público',
                    'Configurar como privado y revisar regularmente',
                    'Solo ocultar fotos',
                    'No importa la configuración'
                ],
                correct: 1,
                explanation: 'Mantener perfiles privados y revisar configuraciones regularmente te protege mejor.'
            }
        ];

        this.startQuiz('social-media-quiz', '📱 Quiz de Redes Sociales', questions);
    }

    // Privacy Guardian Game
    startPrivacyGuardianGame() {
        const scenarios = [
            {
                title: 'Navegador Web',
                question: '¿Qué debes hacer antes de ingresar información personal en un sitio web?',
                options: [
                    'Verificar que la URL comience con https://',
                    'Verificar que el sitio tenga buena apariencia',
                    'Asegurarse de que cargue rápido',
                    'Solo revisar el nombre del sitio'
                ],
                correct: 0,
                explanation: 'HTTPS indica que la conexión está cifrada y es más segura.'
            },
            {
                title: 'Cookies',
                question: '¿Qué son las cookies y por qué debes tener cuidado con ellas?',
                options: [
                    'Son virus peligrosos',
                    'Son pequeños archivos que pueden rastrear tu actividad',
                    'Son solo para recordar contraseñas',
                    'No representan ningún riesgo'
                ],
                correct: 1,
                explanation: 'Las cookies pueden usarse para rastrearte en internet, por eso es importante gestionarlas.'
            }
        ];

        this.startQuiz('privacy-guardian', '🛡️ Guardián de la Privacidad', scenarios);
    }

    // Generic Quiz Framework
    startQuiz(gameId, title, questions) {
        const gameModal = this.createGameModal(gameId, title);
        
        gameModal.innerHTML = `
            <div class="game-header">
                <h3>${title}</h3>
                <button class="close-game" aria-label="Cerrar juego">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="game-content">
                <div class="quiz-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" id="quizProgress"></div>
                    </div>
                    <span>Pregunta <span id="currentQuestion">1</span> de ${questions.length}</span>
                </div>
                <div class="quiz-container" id="quizContainer">
                    <!-- Quiz content will be populated here -->
                </div>
            </div>
        `;

        this.setupQuiz(gameModal, questions);
        this.showGameModal(gameModal);
    }

    setupQuiz(modal, questions) {
        let currentQuestionIndex = 0;
        let score = 0;
        
        const quizContainer = modal.querySelector('#quizContainer');
        const progressFill = modal.querySelector('#quizProgress');
        const currentQuestionSpan = modal.querySelector('#currentQuestion');

        const showQuestion = () => {
            const question = questions[currentQuestionIndex];
            
            quizContainer.innerHTML = `
                <div class="question-card">
                    <h4 class="question-title">${question.question}</h4>
                    <div class="options-container">
                        ${question.options.map((option, index) => `
                            <button class="option-btn" data-index="${index}">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;

            // Update progress
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            progressFill.style.width = `${progress}%`;
            currentQuestionSpan.textContent = currentQuestionIndex + 1;

            // Add click handlers for options
            const optionBtns = quizContainer.querySelectorAll('.option-btn');
            optionBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const selectedIndex = parseInt(e.target.dataset.index);
                    this.handleQuizAnswer(question, selectedIndex, optionBtns);
                });
            });
        };

        this.handleQuizAnswer = (question, selectedIndex, optionBtns) => {
            const isCorrect = selectedIndex === question.correct;
            if (isCorrect) score++;

            // Show feedback
            optionBtns.forEach((btn, index) => {
                btn.disabled = true;
                if (index === question.correct) {
                    btn.classList.add('correct');
                } else if (index === selectedIndex && !isCorrect) {
                    btn.classList.add('incorrect');
                }
            });

            // Show explanation
            const explanation = document.createElement('div');
            explanation.className = 'explanation';
            explanation.innerHTML = `
                <p><strong>${isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}</strong></p>
                <p>${question.explanation}</p>
            `;
            quizContainer.appendChild(explanation);

            // Move to next question
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion();
                } else {
                    this.showQuizResults(modal, score, questions.length);
                }
            }, 3000);
        };

        showQuestion();
    }

    showQuizResults(modal, score, total) {
        const percentage = Math.round((score / total) * 100);
        
        modal.querySelector('.game-content').innerHTML = `
            <div class="game-results">
                <h3>🎉 ¡Quiz Completado!</h3>
                <div class="results-circle">
                    <div class="circle-progress">
                        <svg class="progress-ring" width="120" height="120">
                            <circle class="progress-ring-circle" stroke="#4c6ef5" stroke-width="8" 
                                    fill="transparent" r="52" cx="60" cy="60"
                                    style="stroke-dashoffset: ${327 - (percentage / 100) * 327}"/>
                        </svg>
                        <div class="circle-text">
                            <span class="percentage">${percentage}%</span>
                            <span class="label">Completado</span>
                        </div>
                    </div>
                </div>
                <div class="results-stats">
                    <p>Respondiste correctamente <strong>${score}</strong> de <strong>${total}</strong> preguntas.</p>
                    <p class="results-message">${this.getQuizMessage(percentage)}</p>
                </div>
                <button class="game-btn primary-btn" onclick="location.reload()">
                    <i class="fas fa-redo"></i>
                    Jugar de Nuevo
                </button>
            </div>
        `;

        if (percentage >= 80) {
            this.awardAchievement('quiz-master', '¡Maestro de Quizzes!');
        }

        this.saveScore('quiz', percentage);
    }

    getQuizMessage(percentage) {
        if (percentage === 100) {
            return '🌟 ¡Perfecto! Eres un verdadero experto en ciberseguridad.';
        } else if (percentage >= 80) {
            return '🎯 ¡Excelente! Tienes muy buenos conocimientos.';
        } else if (percentage >= 60) {
            return '📚 ¡Bien hecho! Sigue aprendiendo para mejorar.';
        } else {
            return '💪 ¡No te rindas! La práctica hace al maestro.';
        }
    }

    // Utility Methods
    createGameModal(gameId, title) {
        const modal = document.createElement('div');
        modal.className = 'game-modal';
        modal.id = `game-${gameId}`;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'game-title');
        modal.setAttribute('aria-modal', 'true');
        
        // Add game-specific styles
        const style = document.createElement('style');
        style.textContent = this.getGameStyles();
        document.head.appendChild(style);

        return modal;
    }

    showGameModal(modal) {
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Focus trap
        const focusableElements = modal.querySelectorAll(
            'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Focus first element
        if (firstElement) firstElement.focus();

        // Handle tab key for focus trap
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
            
            if (e.key === 'Escape') {
                this.closeGameModal(modal);
            }
        });

        // Close button handler
        const closeBtn = modal.querySelector('.close-game');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeGameModal(modal);
            });
        }

        // Background click to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeGameModal(modal);
            }
        });

        // Animate in
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    closeGameModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    }

    awardAchievement(achievementId, message) {
        if (window.showNotification) {
            window.showNotification(message, 'success');
        }
        
        // Store achievement
        let achievements = JSON.parse(localStorage.getItem('cyberNinosAchievements') || '[]');
        if (!achievements.includes(achievementId)) {
            achievements.push(achievementId);
            localStorage.setItem('cyberNinosAchievements', JSON.stringify(achievements));
        }
    }

    saveScore(gameType, score) {
        this.scores[gameType] = Math.max(this.scores[gameType] || 0, score);
        localStorage.setItem('cyberNinosScores', JSON.stringify(this.scores));
    }

    loadScores() {
        return JSON.parse(localStorage.getItem('cyberNinosScores') || '{}');
    }

    getGameStyles() {
        return `
            .game-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                padding: 1rem;
            }

            .game-modal.show {
                opacity: 1;
                visibility: visible;
            }

            .game-modal .game-content {
                background: var(--bg-card);
                border-radius: 20px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: var(--shadow-heavy);
                transform: scale(0.9) translateY(20px);
                transition: all 0.3s ease;
            }

            .game-modal.show .game-content {
                transform: scale(1) translateY(0);
            }

            .game-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1.5rem 2rem 1rem;
                border-bottom: 1px solid var(--border-color);
            }

            .game-header h3 {
                margin: 0;
                color: var(--text-primary);
                font-family: var(--font-display);
            }

            .close-game {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-muted);
                cursor: pointer;
                padding: 0.5rem;
                transition: color 0.3s ease;
            }

            .close-game:hover {
                color: var(--primary-color);
            }

            .game-content > div:not(.game-header) {
                padding: 2rem;
            }

            .password-game-input {
                width: 100%;
                padding: 1rem;
                border: 2px solid var(--border-color);
                border-radius: 12px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }

            .password-game-input:focus {
                border-color: var(--primary-color);
                outline: none;
            }

            .strength-bar {
                width: 100%;
                height: 8px;
                background: var(--bg-secondary);
                border-radius: 4px;
                margin: 1rem 0 0.5rem;
                overflow: hidden;
            }

            .strength-fill {
                height: 100%;
                background: #ff006e;
                transition: all 0.3s ease;
                border-radius: 4px;
            }

            .criterion {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin: 0.5rem 0;
                transition: color 0.3s ease;
            }

            .game-btn {
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 12px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 600;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            }

            .game-btn:hover:not(:disabled) {
                background: var(--secondary-color);
                transform: translateY(-2px);
            }

            .game-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            .option-btn {
                display: block;
                width: 100%;
                margin: 0.5rem 0;
                padding: 1rem;
                background: var(--bg-secondary);
                border: 2px solid var(--border-color);
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: left;
            }

            .option-btn:hover:not(:disabled) {
                background: var(--primary-color);
                color: white;
                transform: translateX(5px);
            }

            .option-btn.correct {
                background: var(--success-color);
                border-color: var(--success-color);
                color: white;
            }

            .option-btn.incorrect {
                background: var(--danger-color);
                border-color: var(--danger-color);
                color: white;
            }

            .explanation {
                background: var(--bg-tertiary);
                padding: 1rem;
                border-radius: 12px;
                margin-top: 1rem;
                border-left: 4px solid var(--accent-color);
            }

            .game-results {
                text-align: center;
            }

            .results-circle {
                margin: 2rem 0;
            }

            .circle-progress {
                position: relative;
                width: 120px;
                height: 120px;
                margin: 0 auto;
            }

            .progress-ring {
                transform: rotate(-90deg);
            }

            .progress-ring-circle {
                stroke-dasharray: 327;
                stroke-dashoffset: 327;
                transition: stroke-dashoffset 1s ease;
            }

            .circle-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
            }

            .percentage {
                display: block;
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--primary-color);
            }

            .label {
                font-size: 0.875rem;
                color: var(--text-muted);
            }

            @media (max-width: 768px) {
                .game-modal {
                    padding: 0.5rem;
                }

                .game-content > div:not(.game-header) {
                    padding: 1.5rem;
                }

                .game-header {
                    padding: 1rem 1.5rem 0.5rem;
                }
            }
        `;
    }
}

// Initialize Games Manager
document.addEventListener('DOMContentLoaded', function() {
    window.cyberGamesManager = new CyberGamesManager();
    console.log('🎮 Games system initialized');

    // Add game triggers to existing buttons
    const gameButtons = document.querySelectorAll('.card-button');
    gameButtons.forEach((button, index) => {
        const gameTypes = ['password-strength', 'phishing-detective', 'social-media-quiz', 'privacy-guardian', 'cyber-hero-challenge'];
        if (gameTypes[index]) {
            button.setAttribute('data-game', gameTypes[index]);
        }
    });
});

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CyberGamesManager };
}