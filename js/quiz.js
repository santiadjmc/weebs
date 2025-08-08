/**
 * Quiz system for CiberNiños application
 * Handles interactive quizzes and educational games
 */

// Quiz system state
const QuizManager = {
    activeQuiz: null,
    scores: {},
    statistics: {
        totalQuizzes: 0,
        totalCorrect: 0,
        totalQuestions: 0
    }
};

/**
 * Initialize all quiz systems
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeQuizSystems();
    loadQuizStatistics();
});

/**
 * Initialize all quiz systems
 */
function initializeQuizSystems() {
    initializePhishingQuiz();
    initializeSocialMediaQuiz();
    initializePasswordQuiz();
    initializeCyberQuiz();
    
    console.log('🧠 Quiz systems initialized');
}

/**
 * Initialize phishing detection quiz
 */
function initializePhishingQuiz() {
    const quizContainer = document.querySelector('#phishingGame');
    if (!quizContainer) return;
    
    const phishingData = {
        id: 'phishing',
        title: 'Detective de Phishing',
        questions: [
            {
                type: 'email',
                email: {
                    from: 'security@paypaI.com',
                    subject: '¡URGENTE! Verifica tu cuenta',
                    body: 'Tu cuenta será suspendida en 24 horas. Haz clic aquí: http://paypal-verify.suspicious.com',
                    headers: {
                        'Reply-To': 'noreply@suspicious.com',
                        'Sender': 'automated@phishing.net'
                    }
                },
                correct: 'phishing',
                explanation: '🚨 Este es PHISHING porque: 1) Usa urgencia para presionarte, 2) La dirección tiene "I" mayúscula en lugar de "l" en PayPal, 3) El enlace no va al dominio real, 4) El Reply-To es sospechoso.',
                tips: [
                    'Siempre verifica las direcciones de email cuidadosamente',
                    'Las empresas reales no te presionan con urgencia',
                    'Nunca hagas clic en enlaces sospechosos'
                ]
            },
            {
                type: 'email',
                email: {
                    from: 'pedidos@amazon.com',
                    subject: 'Confirmación de pedido #AMZ789456',
                    body: 'Gracias por tu compra. Tu pedido será entregado mañana. Puedes rastrearlo en tu cuenta de Amazon.',
                    headers: {
                        'Reply-To': 'pedidos@amazon.com',
                        'Sender': 'auto-confirm@amazon.com'
                    }
                },
                correct: 'real',
                explanation: '✅ Este parece REAL porque: 1) La dirección es del dominio correcto, 2) No pide información personal, 3) No usa lenguaje amenazante, 4) Los headers son consistentes.',
                tips: [
                    'Los emails legítimos no piden información personal',
                    'Las direcciones coinciden con la empresa real',
                    'No hay presión ni amenazas'
                ]
            },
            {
                type: 'email',
                email: {
                    from: 'winner@lottery-international.org',
                    subject: '¡Felicidades! Ganaste $1,000,000',
                    body: 'Has ganado la lotería internacional. Para reclamar tu premio, envía una tarifa de $500 y tus datos bancarios.',
                    headers: {
                        'Reply-To': 'claims@winner-fake.net',
                        'Sender': 'automated@scam.ru'
                    }
                },
                correct: 'phishing',
                explanation: '🚨 Este es PHISHING porque: 1) Promete dinero sin participar en lotería, 2) Pide dinero por adelantado, 3) Solicita información bancaria, 4) Los headers son inconsistentes.',
                tips: [
                    'Nunca pagues para recibir un "premio"',
                    'No des información bancaria por email',
                    'Las loterías reales no funcionan así'
                ]
            },
            {
                type: 'website',
                website: {
                    url: 'https://www.arnazon.com/login',
                    title: 'Amazon - Iniciar Sesión',
                    content: 'Inicia sesión en tu cuenta de Amazon para continuar',
                    certificate: 'Certificado SSL válido',
                    design: 'Idéntico a Amazon'
                },
                correct: 'phishing',
                explanation: '🚨 Este es PHISHING porque: 1) La URL tiene "arnazon" en lugar de "amazon", 2) Es una imitación perfecta, 3) Los phishers copian el diseño exacto.',
                tips: [
                    'Siempre verifica la URL cuidadosamente',
                    'Los phishers pueden copiar diseños perfectamente',
                    'Escribe las URLs importantes manualmente'
                ]
            }
        ]
    };
    
    new InteractiveQuiz(quizContainer, phishingData);
}

/**
 * Initialize social media safety quiz
 */
function initializeSocialMediaQuiz() {
    const quizContainer = document.querySelector('#socialQuiz');
    if (!quizContainer) return;
    
    const socialData = {
        id: 'social',
        title: 'Seguridad en Redes Sociales',
        questions: [
            {
                type: 'scenario',
                scenario: 'Un extraño con una foto atractiva te envía una solicitud de amistad y te dice que te conoce de la escuela.',
                question: '¿Qué debes hacer?',
                options: [
                    {
                        text: 'Acepto porque dice conocerme',
                        correct: false,
                        explanation: '❌ Los extraños pueden mentir sobre conocerte. Solo acepta a personas que realmente conoces.'
                    },
                    {
                        text: 'Pregunto a mis padres primero',
                        correct: true,
                        explanation: '✅ ¡Excelente! Siempre consulta con adultos de confianza sobre solicitudes sospechosas.'
                    },
                    {
                        text: 'Acepto pero no comparto información',
                        correct: false,
                        explanation: '❌ Una vez que aceptas, esa persona puede ver tu información y la de tus amigos.'
                    }
                ],
                tips: [
                    'Solo acepta solicitudes de personas que conoces en la vida real',
                    'Consulta con adultos sobre solicitudes sospechosas',
                    'Los extraños pueden usar fotos falsas'
                ]
            },
            {
                type: 'scenario',
                scenario: 'Tus amigos publican fotos de la fiesta de tu cumpleaños en tu casa y etiquetan la ubicación.',
                question: '¿Qué problema puede causar esto?',
                options: [
                    {
                        text: 'Ningún problema, es mi cumpleaños',
                        correct: false,
                        explanation: '❌ Compartir tu ubicación puede ser peligroso, incluso en ocasiones especiales.'
                    },
                    {
                        text: 'Los extraños pueden saber dónde vivo',
                        correct: true,
                        explanation: '✅ ¡Correcto! Compartir ubicaciones puede revelar información personal peligrosa.'
                    },
                    {
                        text: 'Solo mis amigos pueden verlo',
                        correct: false,
                        explanation: '❌ Los amigos de tus amigos también pueden ver las publicaciones, incluyendo extraños.'
                    }
                ],
                tips: [
                    'Pide a tus amigos que no etiqueten ubicaciones',
                    'Configura tu perfil como privado',
                    'Piensa antes de compartir información personal'
                ]
            }
        ]
    };
    
    new InteractiveQuiz(quizContainer, socialData);
}

/**
 * Interactive Quiz Class
 */
class InteractiveQuiz {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.startTime = Date.now();
        
        this.init();
    }
    
    init() {
        this.render();
        this.bindEvents();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="quiz-header">
                <h3>${this.data.title}</h3>
                <div class="quiz-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(this.currentQuestion / this.data.questions.length) * 100}%"></div>
                    </div>
                    <span class="progress-text">${this.currentQuestion + 1} / ${this.data.questions.length}</span>
                </div>
                <div class="quiz-score">
                    <span>Puntuación: <span class="score-value">${this.score}</span></span>
                </div>
            </div>
            <div class="quiz-body">
                ${this.renderQuestion()}
            </div>
            <div class="quiz-footer">
                ${this.renderNavigation()}
            </div>
        `;
    }
    
    renderQuestion() {
        if (this.currentQuestion >= this.data.questions.length) {
            return this.renderResults();
        }
        
        const question = this.data.questions[this.currentQuestion];
        
        switch (question.type) {
            case 'email':
                return this.renderEmailQuestion(question);
            case 'website':
                return this.renderWebsiteQuestion(question);
            case 'scenario':
                return this.renderScenarioQuestion(question);
            default:
                return this.renderDefaultQuestion(question);
        }
    }
    
    renderEmailQuestion(question) {
        return `
            <div class="email-question">
                <div class="question-prompt">
                    <h4>📧 ¿Este email es real o phishing?</h4>
                    <p>Examina cuidadosamente todos los detalles del email.</p>
                </div>
                <div class="email-mockup">
                    <div class="email-headers">
                        <div class="header-row">
                            <span class="header-label">De:</span>
                            <span class="header-value">${question.email.from}</span>
                        </div>
                        <div class="header-row">
                            <span class="header-label">Asunto:</span>
                            <span class="header-value">${question.email.subject}</span>
                        </div>
                        ${question.email.headers ? Object.entries(question.email.headers).map(([key, value]) => `
                            <div class="header-row technical">
                                <span class="header-label">${key}:</span>
                                <span class="header-value">${value}</span>
                            </div>
                        `).join('') : ''}
                    </div>
                    <div class="email-body">
                        ${question.email.body}
                    </div>
                </div>
                <div class="quiz-options">
                    <button class="btn btn-success quiz-option" data-answer="real">
                        <i class="fas fa-check"></i>
                        Es Real
                    </button>
                    <button class="btn btn-danger quiz-option" data-answer="phishing">
                        <i class="fas fa-exclamation-triangle"></i>
                        Es Phishing
                    </button>
                </div>
            </div>
        `;
    }
    
    renderWebsiteQuestion(question) {
        return `
            <div class="website-question">
                <div class="question-prompt">
                    <h4>🌐 ¿Este sitio web es seguro?</h4>
                    <p>Revisa la URL y los detalles del sitio.</p>
                </div>
                <div class="browser-mockup">
                    <div class="browser-bar">
                        <div class="browser-controls">
                            <span class="control"></span>
                            <span class="control"></span>
                            <span class="control"></span>
                        </div>
                        <div class="address-bar">
                            <i class="fas fa-lock"></i>
                            <span class="url">${question.website.url}</span>
                        </div>
                    </div>
                    <div class="website-content">
                        <h3>${question.website.title}</h3>
                        <p>${question.website.content}</p>
                        <div class="website-info">
                            <small>🔒 ${question.website.certificate}</small>
                        </div>
                    </div>
                </div>
                <div class="quiz-options">
                    <button class="btn btn-success quiz-option" data-answer="real">
                        <i class="fas fa-shield-alt"></i>
                        Es Seguro
                    </button>
                    <button class="btn btn-danger quiz-option" data-answer="phishing">
                        <i class="fas fa-exclamation-triangle"></i>
                        Es Falso
                    </button>
                </div>
            </div>
        `;
    }
    
    renderScenarioQuestion(question) {
        return `
            <div class="scenario-question">
                <div class="question-prompt">
                    <h4>🎭 Situación:</h4>
                    <div class="scenario-box">
                        ${question.scenario}
                    </div>
                    <h5>${question.question}</h5>
                </div>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <button class="btn btn-secondary quiz-option" data-answer="${index}">
                            ${String.fromCharCode(65 + index)}. ${option.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    renderNavigation() {
        if (this.currentQuestion >= this.data.questions.length) {
            return `
                <button class="btn btn-primary" onclick="restartQuiz('${this.data.id}')">
                    <i class="fas fa-redo"></i>
                    Reintentar
                </button>
            `;
        }
        
        return `
            <div class="quiz-navigation">
                ${this.currentQuestion > 0 ? `
                    <button class="btn btn-secondary" onclick="previousQuestion()">
                        <i class="fas fa-arrow-left"></i>
                        Anterior
                    </button>
                ` : ''}
                <div class="question-indicator">
                    ${this.data.questions.map((_, index) => `
                        <span class="indicator ${index === this.currentQuestion ? 'active' : ''} ${index < this.currentQuestion ? 'completed' : ''}"></span>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    renderResults() {
        const percentage = Math.round((this.score / this.data.questions.length) * 100);
        const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
        
        let performance = '';
        let performanceClass = '';
        let emoji = '';
        
        if (percentage >= 90) {
            performance = '¡Excepcional! Eres un experto en ciberseguridad.';
            performanceClass = 'excellent';
            emoji = '🏆';
        } else if (percentage >= 75) {
            performance = '¡Muy bien! Tienes buen conocimiento de seguridad.';
            performanceClass = 'good';
            emoji = '🎯';
        } else if (percentage >= 60) {
            performance = 'Bien hecho. Sigue practicando para mejorar.';
            performanceClass = 'ok';
            emoji = '👍';
        } else {
            performance = 'Necesitas más práctica. ¡Sigue aprendiendo!';
            performanceClass = 'needs-work';
            emoji = '📚';
        }
        
        // Update statistics
        this.updateStatistics();
        
        return `
            <div class="quiz-results ${performanceClass}">
                <div class="results-header">
                    <div class="results-emoji">${emoji}</div>
                    <h4>¡Quiz Completado!</h4>
                </div>
                <div class="results-stats">
                    <div class="stat-item">
                        <div class="stat-number">${this.score}</div>
                        <div class="stat-label">Correctas</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${percentage}%</div>
                        <div class="stat-label">Puntuación</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${timeSpent}s</div>
                        <div class="stat-label">Tiempo</div>
                    </div>
                </div>
                <div class="results-message">
                    <p>${performance}</p>
                </div>
                <div class="results-review">
                    <h5>📝 Resumen de Respuestas:</h5>
                    ${this.renderAnswerReview()}
                </div>
                <div class="results-tips">
                    <h5>💡 Consejos para recordar:</h5>
                    <ul>
                        ${this.getRandomTips().map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
    
    renderAnswerReview() {
        return this.answers.map((answer, index) => {
            const question = this.data.questions[index];
            const isCorrect = this.checkAnswer(answer, question);
            
            return `
                <div class="answer-review-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="review-question">
                        <i class="fas fa-${isCorrect ? 'check' : 'times'}"></i>
                        Pregunta ${index + 1}: ${isCorrect ? 'Correcta' : 'Incorrecta'}
                    </div>
                    <div class="review-explanation">
                        ${question.explanation}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    bindEvents() {
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('quiz-option')) {
                this.handleAnswer(e.target.dataset.answer);
            }
        });
    }
    
    handleAnswer(answer) {
        const question = this.data.questions[this.currentQuestion];
        const isCorrect = this.checkAnswer(answer, question);
        
        this.answers.push(answer);
        
        if (isCorrect) {
            this.score++;
            this.showFeedback(true, question.explanation, question.tips);
        } else {
            this.showFeedback(false, question.explanation, question.tips);
        }
        
        // Auto-advance after showing feedback
        setTimeout(() => {
            this.currentQuestion++;
            this.render();
        }, 3000);
    }
    
    checkAnswer(answer, question) {
        if (question.type === 'scenario') {
            return question.options[parseInt(answer)].correct;
        }
        return answer === question.correct;
    }
    
    showFeedback(isCorrect, explanation, tips) {
        const feedbackContainer = document.createElement('div');
        feedbackContainer.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackContainer.innerHTML = `
            <div class="feedback-content">
                <div class="feedback-result">
                    <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
                    <span>${isCorrect ? '¡Correcto!' : 'Incorrecto'}</span>
                </div>
                <div class="feedback-explanation">
                    ${explanation}
                </div>
                ${tips ? `
                    <div class="feedback-tips">
                        <strong>💡 Recuerda:</strong>
                        <ul>
                            ${tips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
        
        this.container.querySelector('.quiz-body').appendChild(feedbackContainer);
        
        // Animate feedback appearance
        setTimeout(() => {
            feedbackContainer.classList.add('show');
        }, 100);
    }
    
    updateStatistics() {
        QuizManager.statistics.totalQuizzes++;
        QuizManager.statistics.totalCorrect += this.score;
        QuizManager.statistics.totalQuestions += this.data.questions.length;
        
        QuizManager.scores[this.data.id] = {
            score: this.score,
            total: this.data.questions.length,
            percentage: Math.round((this.score / this.data.questions.length) * 100),
            timestamp: Date.now()
        };
        
        this.saveStatistics();
    }
    
    saveStatistics() {
        localStorage.setItem('ciberninos-quiz-stats', JSON.stringify(QuizManager.statistics));
        localStorage.setItem('ciberninos-quiz-scores', JSON.stringify(QuizManager.scores));
    }
    
    getRandomTips() {
        const allTips = [
            'Siempre verifica las direcciones de email cuidadosamente',
            'No hagas clic en enlaces sospechosos',
            'Consulta con adultos sobre situaciones dudosas',
            'Mantén tu información personal privada',
            'Usa contraseñas fuertes y únicas',
            'Actualiza tus dispositivos regularmente',
            'Sé cuidadoso con lo que compartes en redes sociales',
            'Aprende a reconocer las señales de phishing'
        ];
        
        return allTips.sort(() => 0.5 - Math.random()).slice(0, 3);
    }
}

/**
 * Load quiz statistics from storage
 */
function loadQuizStatistics() {
    const stats = localStorage.getItem('ciberninos-quiz-stats');
    const scores = localStorage.getItem('ciberninos-quiz-scores');
    
    if (stats) {
        QuizManager.statistics = JSON.parse(stats);
    }
    
    if (scores) {
        QuizManager.scores = JSON.parse(scores);
    }
}

/**
 * Get overall quiz performance
 */
function getOverallPerformance() {
    const { totalCorrect, totalQuestions } = QuizManager.statistics;
    
    if (totalQuestions === 0) return { percentage: 0, level: 'beginner' };
    
    const percentage = Math.round((totalCorrect / totalQuestions) * 100);
    
    let level = 'beginner';
    if (percentage >= 90) level = 'expert';
    else if (percentage >= 75) level = 'advanced';
    else if (percentage >= 60) level = 'intermediate';
    
    return { percentage, level };
}

/**
 * Export quiz results
 */
function exportQuizResults() {
    const data = {
        statistics: QuizManager.statistics,
        scores: QuizManager.scores,
        performance: getOverallPerformance(),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ciberninos-quiz-results.json';
    a.click();
    
    URL.revokeObjectURL(url);
}

// Make functions globally available
window.restartQuiz = function(quizId) {
    // Find and restart the specific quiz
    location.reload(); // Simple restart for now
};

window.exportQuizResults = exportQuizResults;
window.QuizManager = QuizManager;