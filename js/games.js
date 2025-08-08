/**
 * CyberKids Games JavaScript File
 * Interactive games and educational activities
 */

// =================================
// GAME CONSTANTS & DATA
// =================================

const PHISHING_EMAILS = [
    {
        id: 1,
        from: 'banco.seguro@email.com',
        subject: 'Urgente: Verifica tu cuenta',
        body: 'Estimado cliente, tu cuenta será suspendida en 24 horas. Haz clic aquí para verificarla inmediatamente.',
        isPhishing: true,
        explanation: 'Los bancos nunca piden verificar cuentas por email. ¡Es una trampa!'
    },
    {
        id: 2,
        from: 'maestra.ana@colegio.edu',
        subject: 'Tarea para mañana',
        body: 'Hola estudiantes, recuerden que mañana tenemos examen de matemáticas. Estudien los capítulos 3 y 4.',
        isPhishing: false,
        explanation: 'Este email es legítimo. Viene de tu maestra y no pide información personal.'
    },
    {
        id: 3,
        from: 'winner@premio.com',
        subject: '¡GANASTE $1,000,000!',
        body: 'Felicidades, has ganado nuestro premio mayor. Solo envía tu información personal para reclamarlo.',
        isPhishing: true,
        explanation: 'Los premios que no participaste para ganar siempre son falsos.'
    },
    {
        id: 4,
        from: 'abuela.maria@gmail.com',
        subject: 'Fotos de la familia',
        body: 'Hola mi nieto querido, aquí tienes las fotos de la reunión familiar del domingo pasado.',
        isPhishing: false,
        explanation: 'Email familiar legítimo que solo comparte fotos sin pedir información.'
    },
    {
        id: 5,
        from: 'admin@juego-gratuito.net',
        subject: 'Tu cuenta de juego expirará hoy',
        body: 'Tu cuenta premium expirará en 2 horas. Ingresa tu contraseña aquí para renovarla gratis.',
        isPhishing: true,
        explanation: 'Los sitios de juegos legítimos nunca piden contraseñas por email.'
    }
];

const SOCIAL_MEDIA_QUESTIONS = [
    {
        id: 1,
        question: '¿Qué información es seguro compartir en redes sociales?',
        options: [
            'Tu dirección completa',
            'Fotos divertidas con amigos',
            'Tu número de teléfono',
            'La ubicación de tu escuela'
        ],
        correctAnswer: 1,
        explanation: 'Las fotos con amigos son divertidas y seguras de compartir, pero nunca compartas información personal como direcciones o teléfonos.'
    },
    {
        id: 2,
        question: '¿Qué debes hacer si alguien desconocido te envía una solicitud de amistad?',
        options: [
            'Aceptarla inmediatamente',
            'Preguntarle a tus padres primero',
            'Enviarle tu información personal',
            'Rechazarla y bloquear al usuario'
        ],
        correctAnswer: 3,
        explanation: 'Siempre rechaza solicitudes de personas que no conoces y bloquéalas para mantenerte seguro.'
    },
    {
        id: 3,
        question: '¿Cuál es la mejor configuración de privacidad?',
        options: [
            'Perfil completamente público',
            'Solo amigos pueden ver tu perfil',
            'Cualquiera puede enviar mensajes',
            'Mostrar tu ubicación siempre'
        ],
        correctAnswer: 1,
        explanation: 'Mantener tu perfil privado significa que solo tus amigos de confianza pueden ver lo que compartes.'
    },
    {
        id: 4,
        question: '¿Qué hacer si ves contenido que te hace sentir incómodo?',
        options: [
            'Ignorarlo y continuar',
            'Contárselo a tus padres o maestros',
            'Compartirlo con más personas',
            'Responder con algo similar'
        ],
        correctAnswer: 1,
        explanation: 'Siempre habla con un adulto de confianza cuando veas algo que te haga sentir mal o incómodo.'
    }
];

// =================================
// GAME STATE MANAGEMENT
// =================================

let gameStates = {
    phishing: {
        score: 0,
        currentQuestion: 0,
        isActive: false
    },
    socialQuiz: {
        score: 0,
        currentQuestion: 0,
        isActive: false,
        answered: false
    },
    timeTracker: {
        isRunning: false,
        startTime: null,
        totalTime: 0,
        goalHours: 2
    }
};

// =================================
// PHISHING DETECTION GAME
// =================================

/**
 * Initialize the phishing detection game
 */
function initPhishingGame() {
    const gameContainer = document.getElementById('phishing-game');
    const emailExample = document.getElementById('email-example');
    const scoreDisplay = document.getElementById('phishing-score');
    const phishingBtn = document.getElementById('phishing-btn');
    const safeBtn = document.getElementById('safe-btn');
    
    if (!gameContainer || !emailExample) return;
    
    // Reset game state
    gameStates.phishing = {
        score: 0,
        currentQuestion: 0,
        isActive: true
    };
    
    // Display first email
    displayPhishingEmail();
    
    // Set up button event listeners
    if (phishingBtn) {
        phishingBtn.addEventListener('click', () => checkPhishingAnswer(true));
    }
    
    if (safeBtn) {
        safeBtn.addEventListener('click', () => checkPhishingAnswer(false));
    }
}

/**
 * Display current phishing email
 */
function displayPhishingEmail() {
    const emailExample = document.getElementById('email-example');
    const scoreDisplay = document.getElementById('phishing-score');
    
    if (!emailExample) return;
    
    const currentEmail = PHISHING_EMAILS[gameStates.phishing.currentQuestion];
    
    emailExample.innerHTML = `
        <div class="email-header">
            <div class="email-from"><strong>De:</strong> ${currentEmail.from}</div>
            <div class="email-subject"><strong>Asunto:</strong> ${currentEmail.subject}</div>
        </div>
        <div class="email-body">
            ${currentEmail.body}
        </div>
    `;
    
    // Update score display
    if (scoreDisplay) {
        scoreDisplay.textContent = gameStates.phishing.score;
    }
    
    // Add animation
    emailExample.style.opacity = '0';
    emailExample.style.transform = 'translateY(20px)';
    setTimeout(() => {
        emailExample.style.transition = 'all 0.5s ease';
        emailExample.style.opacity = '1';
        emailExample.style.transform = 'translateY(0)';
    }, 100);
}

/**
 * Check if the user's phishing answer is correct
 * @param {boolean} userAnswer - User's answer (true for phishing, false for safe)
 */
function checkPhishingAnswer(userAnswer) {
    if (!gameStates.phishing.isActive) return;
    
    const currentEmail = PHISHING_EMAILS[gameStates.phishing.currentQuestion];
    const isCorrect = userAnswer === currentEmail.isPhishing;
    
    // Update score
    if (isCorrect) {
        gameStates.phishing.score += 10;
        showNotification('¡Correcto! +10 puntos', 'success');
        createConfetti();
    } else {
        showNotification('Incorrecto. ' + currentEmail.explanation, 'error');
    }
    
    // Show explanation with animation
    showPhishingExplanation(currentEmail, isCorrect);
    
    // Move to next question after delay
    setTimeout(() => {
        gameStates.phishing.currentQuestion++;
        
        if (gameStates.phishing.currentQuestion < PHISHING_EMAILS.length) {
            displayPhishingEmail();
        } else {
            endPhishingGame();
        }
    }, 3000);
}

/**
 * Show explanation for the current phishing email
 * @param {Object} email - Current email object
 * @param {boolean} isCorrect - Whether the answer was correct
 */
function showPhishingExplanation(email, isCorrect) {
    const emailExample = document.getElementById('email-example');
    
    if (!emailExample) return;
    
    const explanationDiv = document.createElement('div');
    explanationDiv.className = `explanation ${isCorrect ? 'correct' : 'incorrect'}`;
    explanationDiv.innerHTML = `
        <div class="explanation-header">
            <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
            <strong>${isCorrect ? '¡Correcto!' : 'Incorrecto'}</strong>
        </div>
        <p>${email.explanation}</p>
    `;
    
    explanationDiv.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${isCorrect ? 'rgba(150, 206, 180, 0.95)' : 'rgba(253, 121, 168, 0.95)'};
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 1rem;
        border-radius: var(--radius-medium);
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.3s ease;
    `;
    
    emailExample.style.position = 'relative';
    emailExample.appendChild(explanationDiv);
    
    setTimeout(() => {
        explanationDiv.style.opacity = '1';
        explanationDiv.style.transform = 'scale(1)';
    }, 100);
}

/**
 * End the phishing detection game
 */
function endPhishingGame() {
    gameStates.phishing.isActive = false;
    const finalScore = gameStates.phishing.score;
    const maxScore = PHISHING_EMAILS.length * 10;
    const percentage = Math.round((finalScore / maxScore) * 100);
    
    let message = '';
    if (percentage >= 80) {
        message = '¡Excelente! Eres un experto detector de phishing. 🏆';
        createConfetti();
    } else if (percentage >= 60) {
        message = '¡Bien hecho! Sigues aprendiendo. 👍';
    } else {
        message = 'Sigue practicando para mejorar. ¡Tú puedes! 💪';
    }
    
    showNotification(`Juego terminado: ${finalScore}/${maxScore} puntos. ${message}`, 'info');
    
    // Reset game after a delay
    setTimeout(() => {
        gameStates.phishing.currentQuestion = 0;
        gameStates.phishing.score = 0;
        displayPhishingEmail();
        gameStates.phishing.isActive = true;
    }, 5000);
}

// =================================
// SOCIAL MEDIA QUIZ
// =================================

/**
 * Initialize the social media quiz
 */
function initSocialQuiz() {
    const quizContainer = document.getElementById('social-quiz');
    if (!quizContainer) return;
    
    gameStates.socialQuiz = {
        score: 0,
        currentQuestion: 0,
        isActive: true,
        answered: false
    };
    
    displaySocialQuestion();
}

/**
 * Display current social media question
 */
function displaySocialQuestion() {
    const questionContainer = document.getElementById('question-container');
    if (!questionContainer) return;
    
    const currentQ = SOCIAL_MEDIA_QUESTIONS[gameStates.socialQuiz.currentQuestion];
    gameStates.socialQuiz.answered = false;
    
    questionContainer.innerHTML = `
        <div class="quiz-header">
            <span class="question-number">Pregunta ${gameStates.socialQuiz.currentQuestion + 1}/${SOCIAL_MEDIA_QUESTIONS.length}</span>
            <span class="quiz-score">Puntos: ${gameStates.socialQuiz.score}</span>
        </div>
        <div class="question-text">${currentQ.question}</div>
        <div class="quiz-options">
            ${currentQ.options.map((option, index) => `
                <button class="quiz-option" data-index="${index}">
                    ${option}
                </button>
            `).join('')}
        </div>
        <div class="quiz-explanation" style="display: none;"></div>
    `;
    
    // Add event listeners to options
    questionContainer.querySelectorAll('.quiz-option').forEach(button => {
        button.addEventListener('click', () => {
            if (!gameStates.socialQuiz.answered) {
                checkSocialAnswer(parseInt(button.dataset.index));
            }
        });
    });
    
    // Add animation
    questionContainer.style.opacity = '0';
    questionContainer.style.transform = 'translateY(20px)';
    setTimeout(() => {
        questionContainer.style.transition = 'all 0.5s ease';
        questionContainer.style.opacity = '1';
        questionContainer.style.transform = 'translateY(0)';
    }, 100);
}

/**
 * Check social media quiz answer
 * @param {number} selectedIndex - Index of selected answer
 */
function checkSocialAnswer(selectedIndex) {
    if (gameStates.socialQuiz.answered) return;
    
    gameStates.socialQuiz.answered = true;
    const currentQ = SOCIAL_MEDIA_QUESTIONS[gameStates.socialQuiz.currentQuestion];
    const isCorrect = selectedIndex === currentQ.correctAnswer;
    
    // Update UI
    const options = document.querySelectorAll('.quiz-option');
    const explanationDiv = document.querySelector('.quiz-explanation');
    
    options.forEach((option, index) => {
        if (index === currentQ.correctAnswer) {
            option.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
        option.disabled = true;
    });
    
    // Show explanation
    if (explanationDiv) {
        explanationDiv.innerHTML = `
            <div class="explanation-content ${isCorrect ? 'correct-explanation' : 'incorrect-explanation'}">
                <i class="fas fa-${isCorrect ? 'check-circle' : 'info-circle'}"></i>
                <p>${currentQ.explanation}</p>
            </div>
        `;
        explanationDiv.style.display = 'block';
        explanationDiv.style.opacity = '0';
        setTimeout(() => {
            explanationDiv.style.opacity = '1';
        }, 200);
    }
    
    // Update score
    if (isCorrect) {
        gameStates.socialQuiz.score += 10;
        showNotification('¡Correcto! +10 puntos', 'success');
    } else {
        showNotification('Incorrecto, pero sigue aprendiendo', 'warning');
    }
    
    // Move to next question
    setTimeout(() => {
        gameStates.socialQuiz.currentQuestion++;
        
        if (gameStates.socialQuiz.currentQuestion < SOCIAL_MEDIA_QUESTIONS.length) {
            displaySocialQuestion();
        } else {
            endSocialQuiz();
        }
    }, 3000);
}

/**
 * End the social media quiz
 */
function endSocialQuiz() {
    const finalScore = gameStates.socialQuiz.score;
    const maxScore = SOCIAL_MEDIA_QUESTIONS.length * 10;
    const percentage = Math.round((finalScore / maxScore) * 100);
    
    let message = '';
    if (percentage >= 80) {
        message = '¡Eres un experto en redes sociales seguras! 🌟';
        createConfetti();
    } else if (percentage >= 60) {
        message = '¡Buen trabajo! Conoces lo básico de seguridad. 👏';
    } else {
        message = 'Sigue aprendiendo sobre seguridad en redes sociales. 📚';
    }
    
    const questionContainer = document.getElementById('question-container');
    if (questionContainer) {
        questionContainer.innerHTML = `
            <div class="quiz-results">
                <div class="results-header">
                    <i class="fas fa-trophy"></i>
                    <h3>¡Quiz Completado!</h3>
                </div>
                <div class="score-display">
                    <span class="final-score">${finalScore}/${maxScore}</span>
                    <span class="percentage">${percentage}%</span>
                </div>
                <p class="results-message">${message}</p>
                <button class="btn btn-primary" onclick="initSocialQuiz()">
                    <i class="fas fa-refresh"></i>
                    Jugar de Nuevo
                </button>
            </div>
        `;
    }
    
    showNotification(message, 'success');
}

// =================================
// TIME TRACKER
// =================================

/**
 * Initialize the screen time tracker
 */
function initTimeTracker() {
    const startButton = document.getElementById('start-timer');
    const goalInput = document.getElementById('daily-goal-input');
    const canvas = document.getElementById('time-chart');
    
    if (!canvas) return;
    
    // Set up goal input
    if (goalInput) {
        goalInput.addEventListener('change', (e) => {
            gameStates.timeTracker.goalHours = parseInt(e.target.value) || 2;
            updateTimeDisplay();
        });
    }
    
    // Set up start button
    if (startButton) {
        startButton.addEventListener('click', toggleTimeTracker);
    }
    
    // Initialize display
    updateTimeDisplay();
    
    // Load saved time data
    const savedTime = localStorage.getItem('cyberkids-screen-time');
    if (savedTime) {
        gameStates.timeTracker.totalTime = parseInt(savedTime) || 0;
        updateTimeDisplay();
    }
}

/**
 * Toggle time tracker on/off
 */
function toggleTimeTracker() {
    const startButton = document.getElementById('start-timer');
    
    if (gameStates.timeTracker.isRunning) {
        // Stop tracking
        gameStates.timeTracker.isRunning = false;
        gameStates.timeTracker.startTime = null;
        
        if (startButton) {
            startButton.innerHTML = '<i class="fas fa-play"></i> Empezar Actividad';
            startButton.classList.remove('btn-danger');
            startButton.classList.add('btn-primary');
        }
        
        showNotification('¡Tiempo pausado! Recuerda tomar descansos', 'info');
    } else {
        // Start tracking
        gameStates.timeTracker.isRunning = true;
        gameStates.timeTracker.startTime = Date.now();
        
        if (startButton) {
            startButton.innerHTML = '<i class="fas fa-pause"></i> Pausar Actividad';
            startButton.classList.remove('btn-primary');
            startButton.classList.add('btn-danger');
        }
        
        showNotification('¡Seguimiento iniciado! ⏰', 'success');
        
        // Start the timer
        updateTimeTracker();
    }
}

/**
 * Update time tracker every second
 */
function updateTimeTracker() {
    if (!gameStates.timeTracker.isRunning) return;
    
    const now = Date.now();
    const sessionTime = now - gameStates.timeTracker.startTime;
    gameStates.timeTracker.totalTime += 1000; // Add 1 second
    
    updateTimeDisplay();
    
    // Save time data
    localStorage.setItem('cyberkids-screen-time', gameStates.timeTracker.totalTime.toString());
    
    // Check if goal exceeded
    const goalMs = gameStates.timeTracker.goalHours * 60 * 60 * 1000;
    if (gameStates.timeTracker.totalTime >= goalMs) {
        showNotification('¡Has alcanzado tu meta de tiempo! Considera tomar un descanso', 'warning');
    }
    
    // Continue tracking
    setTimeout(updateTimeTracker, 1000);
}

/**
 * Update time display and chart
 */
function updateTimeDisplay() {
    const timeText = document.getElementById('current-time');
    const canvas = document.getElementById('time-chart');
    
    if (!timeText || !canvas) return;
    
    // Convert milliseconds to hours and minutes
    const totalMinutes = Math.floor(gameStates.timeTracker.totalTime / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    timeText.textContent = `${hours}h ${minutes}m`;
    
    // Draw circular progress chart
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate progress
    const goalMs = gameStates.timeTracker.goalHours * 60 * 60 * 1000;
    const progress = Math.min(gameStates.timeTracker.totalTime / goalMs, 1);
    const progressAngle = progress * 2 * Math.PI - Math.PI / 2;
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#E9ECEF';
    ctx.lineWidth = 8;
    ctx.stroke();
    
    // Draw progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, progressAngle);
    ctx.strokeStyle = progress >= 1 ? '#FD79A8' : '#FF6B6B';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Add center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#FF6B6B';
    ctx.fill();
}

// =================================
// MINI GAMES UTILITIES
// =================================

/**
 * Create a simple memory card game
 */
function createMemoryGame() {
    const symbols = ['🔐', '🛡️', '🔑', '👤', '🖥️', '📱'];
    const cards = [...symbols, ...symbols]; // Duplicate for pairs
    
    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    // Create game container
    const gameContainer = document.createElement('div');
    gameContainer.className = 'memory-game';
    gameContainer.style.cssText = `
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        max-width: 400px;
        margin: 2rem auto;
        padding: 1rem;
        background: var(--surface-color);
        border-radius: var(--radius-large);
        box-shadow: var(--shadow-medium);
    `;
    
    let flippedCards = [];
    let matches = 0;
    
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.style.cssText = `
            aspect-ratio: 1;
            background: var(--gradient-primary);
            border-radius: var(--radius-medium);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            color: transparent;
        `;
        
        card.addEventListener('click', () => {
            if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
                card.style.color = 'white';
                card.classList.add('flipped');
                flippedCards.push(card);
                
                if (flippedCards.length === 2) {
                    setTimeout(() => {
                        if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
                            flippedCards.forEach(c => c.classList.add('matched'));
                            matches++;
                            if (matches === symbols.length) {
                                showNotification('¡Ganaste el juego de memoria!', 'success');
                                createConfetti();
                            }
                        } else {
                            flippedCards.forEach(c => {
                                c.style.color = 'transparent';
                                c.classList.remove('flipped');
                            });
                        }
                        flippedCards = [];
                    }, 1000);
                }
            }
        });
        
        card.textContent = symbol;
        gameContainer.appendChild(card);
    });
    
    return gameContainer;
}

// =================================
// GAME INITIALIZATION
// =================================

/**
 * Initialize all games when page loads
 */
function initializeGames() {
    // Initialize phishing game
    setTimeout(() => initPhishingGame(), 1000);
    
    // Initialize social quiz
    setTimeout(() => initSocialQuiz(), 1500);
    
    // Initialize time tracker
    setTimeout(() => initTimeTracker(), 2000);
    
    console.log('🎮 All games initialized');
}

// =================================
// EXPORT FOR MAIN APP
// =================================

window.CyberKidsGames = {
    initPhishingGame,
    initSocialQuiz,
    initTimeTracker,
    createMemoryGame,
    gameStates
};

// Initialize games when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGames);
} else {
    initializeGames();
}