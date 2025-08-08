/**
 * CiberKids - Interactive Quizzes System
 * Educational quizzes for cybersecurity learning
 */

class QuizManager {
    constructor() {
        this.quizzes = new Map();
        this.currentQuiz = null;
        this.initialize();
    }

    initialize() {
        this.registerQuizzes();
        console.log('📝 Quiz system initialized');
    }

    registerQuizzes() {
        this.quizzes.set('privacy-quiz', new PrivacyQuiz());
        this.quizzes.set('password-quiz', new PasswordQuiz());
        this.quizzes.set('phishing-quiz', new PhishingQuiz());
        this.quizzes.set('social-media-quiz', new SocialMediaQuiz());
        this.quizzes.set('device-safety-quiz', new DeviceSafetyQuiz());
    }

    startQuiz(quizId) {
        const quiz = this.quizzes.get(quizId);
        if (quiz) {
            this.currentQuiz = quiz;
            return quiz.start();
        }
        return null;
    }

    getQuizResults(quizId) {
        const quiz = this.quizzes.get(quizId);
        return quiz ? quiz.getResults() : null;
    }
}

/**
 * Base Quiz Class
 */
class BaseQuiz {
    constructor(quizId, title, questions) {
        this.quizId = quizId;
        this.title = title;
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.score = 0;
        this.isCompleted = false;
        this.timeLimit = 0; // 0 means no time limit
        this.startTime = null;
    }

    start() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.score = 0;
        this.isCompleted = false;
        this.startTime = Date.now();
        return this.generateQuizHTML();
    }

    generateQuizHTML() {
        return `
            <div class="quiz-container" id="${this.quizId}-container">
                <div class="quiz-header">
                    <h3>${this.title}</h3>
                    <div class="quiz-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                        <span class="progress-text">Pregunta 1 de ${this.questions.length}</span>
                    </div>
                    ${this.timeLimit > 0 ? '<div class="quiz-timer" id="quiz-timer">⏱️ <span class="time-remaining"></span></div>' : ''}
                </div>
                
                <div class="quiz-content">
                    <div class="question-container" id="question-container">
                        ${this.generateQuestionHTML(0)}
                    </div>
                    
                    <div class="quiz-navigation">
                        <button class="btn btn-secondary" id="prev-question" disabled>⬅️ Anterior</button>
                        <button class="btn btn-primary" id="next-question" disabled>Siguiente ➡️</button>
                        <button class="btn btn-success quiz-submit" id="submit-quiz" style="display: none;">✅ Finalizar Quiz</button>
                    </div>
                </div>
                
                <div class="quiz-results" id="quiz-results" style="display: none;">
                    <!-- Results will be shown here -->
                </div>
            </div>
        `;
    }

    generateQuestionHTML(index) {
        const question = this.questions[index];
        const isLastQuestion = index === this.questions.length - 1;
        
        let optionsHTML = '';
        
        switch (question.type) {
            case 'multiple-choice':
                optionsHTML = question.options.map((option, optIndex) => `
                    <label class="quiz-option">
                        <input type="radio" name="question-${index}" value="${optIndex}" class="option-input">
                        <span class="option-text">${option}</span>
                        <span class="option-indicator"></span>
                    </label>
                `).join('');
                break;
                
            case 'multiple-select':
                optionsHTML = question.options.map((option, optIndex) => `
                    <label class="quiz-option checkbox-option">
                        <input type="checkbox" name="question-${index}" value="${optIndex}" class="option-input">
                        <span class="option-text">${option}</span>
                        <span class="option-indicator"></span>
                    </label>
                `).join('');
                break;
                
            case 'true-false':
                optionsHTML = `
                    <label class="quiz-option">
                        <input type="radio" name="question-${index}" value="true" class="option-input">
                        <span class="option-text">✅ Verdadero</span>
                        <span class="option-indicator"></span>
                    </label>
                    <label class="quiz-option">
                        <input type="radio" name="question-${index}" value="false" class="option-input">
                        <span class="option-text">❌ Falso</span>
                        <span class="option-indicator"></span>
                    </label>
                `;
                break;
        }

        return `
            <div class="question-card" data-question-index="${index}">
                <div class="question-header">
                    <span class="question-number">Pregunta ${index + 1}</span>
                    ${question.difficulty ? `<span class="difficulty-badge difficulty-${question.difficulty}">${this.getDifficultyText(question.difficulty)}</span>` : ''}
                </div>
                
                <div class="question-content">
                    <h4 class="question-text">${question.question}</h4>
                    ${question.image ? `<img src="${question.image}" alt="Imagen de la pregunta" class="question-image">` : ''}
                    ${question.hint ? `<div class="question-hint" id="hint-${index}" style="display: none;">💡 <strong>Pista:</strong> ${question.hint}</div>` : ''}
                </div>
                
                <div class="question-options" data-question-type="${question.type}">
                    ${optionsHTML}
                </div>
                
                <div class="question-actions">
                    ${question.hint ? `<button class="btn btn-secondary hint-btn" onclick="toggleHint(${index})">💡 Ver Pista</button>` : ''}
                    <button class="btn btn-info explain-btn" onclick="showExplanation(${index})" style="display: none;">📖 Ver Explicación</button>
                </div>
                
                <div class="question-feedback" id="feedback-${index}" style="display: none;">
                    <!-- Feedback will be shown here -->
                </div>
            </div>
        `;
    }

    getDifficultyText(difficulty) {
        const difficulties = {
            'easy': '⭐ Fácil',
            'medium': '⭐⭐ Medio',
            'hard': '⭐⭐⭐ Difícil'
        };
        return difficulties[difficulty] || difficulty;
    }

    setupEventListeners() {
        const container = document.getElementById(`${this.quizId}-container`);
        if (!container) return;

        // Question navigation
        const prevBtn = container.querySelector('#prev-question');
        const nextBtn = container.querySelector('#next-question');
        const submitBtn = container.querySelector('#submit-quiz');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousQuestion());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitQuiz());
        }

        // Option selection
        container.addEventListener('change', (e) => {
            if (e.target.classList.contains('option-input')) {
                this.handleAnswerSelection(e);
            }
        });

        // Start timer if needed
        if (this.timeLimit > 0) {
            this.startTimer();
        }
    }

    handleAnswerSelection(event) {
        const questionIndex = this.currentQuestionIndex;
        const question = this.questions[questionIndex];
        const selectedInput = event.target;
        
        // Handle different question types
        let answer = null;
        
        if (question.type === 'multiple-select') {
            // Multiple selection - collect all checked values
            const checkedInputs = document.querySelectorAll(`input[name="question-${questionIndex}"]:checked`);
            answer = Array.from(checkedInputs).map(input => parseInt(input.value));
        } else if (question.type === 'true-false') {
            // True/false question
            answer = selectedInput.value === 'true';
        } else {
            // Single selection
            answer = parseInt(selectedInput.value);
        }
        
        // Store the answer
        this.answers[questionIndex] = answer;
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Add visual feedback
        this.addSelectionFeedback(selectedInput);
    }

    addSelectionFeedback(selectedInput) {
        // Remove previous selections visual feedback in the same question
        const questionContainer = selectedInput.closest('.question-options');
        questionContainer.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add visual feedback for current selection
        const selectedOption = selectedInput.closest('.quiz-option');
        if (selectedInput.type === 'radio') {
            selectedOption.classList.add('selected');
        } else if (selectedInput.type === 'checkbox') {
            selectedOption.classList.toggle('selected', selectedInput.checked);
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-question');
        const nextBtn = document.getElementById('next-question');
        const submitBtn = document.getElementById('submit-quiz');
        
        // Enable/disable previous button
        if (prevBtn) {
            prevBtn.disabled = this.currentQuestionIndex === 0;
        }
        
        // Handle next/submit button
        const hasAnswer = this.answers[this.currentQuestionIndex] !== undefined;
        const isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;
        
        if (isLastQuestion) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (submitBtn) {
                submitBtn.style.display = 'inline-block';
                submitBtn.disabled = !hasAnswer;
            }
        } else {
            if (nextBtn) {
                nextBtn.style.display = 'inline-block';
                nextBtn.disabled = !hasAnswer;
            }
            if (submitBtn) submitBtn.style.display = 'none';
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.updateQuestionDisplay();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.updateQuestionDisplay();
        }
    }

    updateQuestionDisplay() {
        const questionContainer = document.getElementById('question-container');
        if (questionContainer) {
            questionContainer.innerHTML = this.generateQuestionHTML(this.currentQuestionIndex);
            
            // Restore previous answer if exists
            this.restorePreviousAnswer();
            
            // Update progress
            this.updateProgress();
            
            // Update navigation buttons
            this.updateNavigationButtons();
        }
    }

    restorePreviousAnswer() {
        const answer = this.answers[this.currentQuestionIndex];
        if (answer === undefined) return;
        
        const question = this.questions[this.currentQuestionIndex];
        
        if (question.type === 'multiple-select' && Array.isArray(answer)) {
            // Restore multiple selections
            answer.forEach(value => {
                const input = document.querySelector(`input[name="question-${this.currentQuestionIndex}"][value="${value}"]`);
                if (input) {
                    input.checked = true;
                    this.addSelectionFeedback(input);
                }
            });
        } else if (question.type === 'true-false') {
            // Restore true/false selection
            const input = document.querySelector(`input[name="question-${this.currentQuestionIndex}"][value="${answer}"]`);
            if (input) {
                input.checked = true;
                this.addSelectionFeedback(input);
            }
        } else {
            // Restore single selection
            const input = document.querySelector(`input[name="question-${this.currentQuestionIndex}"][value="${answer}"]`);
            if (input) {
                input.checked = true;
                this.addSelectionFeedback(input);
            }
        }
    }

    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `Pregunta ${this.currentQuestionIndex + 1} de ${this.questions.length}`;
        }
    }

    submitQuiz() {
        this.calculateScore();
        this.isCompleted = true;
        this.showResults();
        
        // Save results to localStorage
        const results = this.getResults();
        const savedQuizzes = JSON.parse(localStorage.getItem('ciberkids-quiz-results') || '{}');
        savedQuizzes[this.quizId] = results;
        localStorage.setItem('ciberkids-quiz-results', JSON.stringify(savedQuizzes));
        
        // Dispatch completion event
        document.dispatchEvent(new CustomEvent('quizCompleted', {
            detail: { quizId: this.quizId, results }
        }));
    }

    calculateScore() {
        this.score = 0;
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.answers[index];
            const isCorrect = this.checkAnswer(question, userAnswer);
            
            if (isCorrect) {
                // Base score for correct answer
                let points = 10;
                
                // Difficulty bonus
                if (question.difficulty === 'medium') points += 5;
                else if (question.difficulty === 'hard') points += 10;
                
                this.score += points;
            }
        });
    }

    checkAnswer(question, userAnswer) {
        if (userAnswer === undefined) return false;
        
        if (question.type === 'multiple-select') {
            // For multiple selection, check if arrays match
            const correctAnswers = question.correctAnswer.sort();
            const userAnswers = Array.isArray(userAnswer) ? userAnswer.sort() : [];
            return JSON.stringify(correctAnswers) === JSON.stringify(userAnswers);
        } else {
            // For single selection and true/false
            return question.correctAnswer === userAnswer;
        }
    }

    showResults() {
        const resultsContainer = document.getElementById('quiz-results');
        const quizContent = document.querySelector('.quiz-content');
        
        if (resultsContainer && quizContent) {
            quizContent.style.display = 'none';
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = this.generateResultsHTML();
        }
    }

    generateResultsHTML() {
        const totalQuestions = this.questions.length;
        const correctAnswers = this.questions.filter((question, index) => 
            this.checkAnswer(question, this.answers[index])
        ).length;
        
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        const timeTaken = this.startTime ? Math.round((Date.now() - this.startTime) / 1000) : 0;
        
        const performanceLevel = this.getPerformanceLevel(percentage);
        
        return `
            <div class="quiz-results-content">
                <div class="results-header">
                    <h3>🏆 ¡Quiz Completado!</h3>
                    <div class="performance-badge ${performanceLevel.class}">
                        ${performanceLevel.emoji} ${performanceLevel.title}
                    </div>
                </div>
                
                <div class="results-stats">
                    <div class="stat-card">
                        <div class="stat-value">${correctAnswers}/${totalQuestions}</div>
                        <div class="stat-label">Respuestas Correctas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${percentage}%</div>
                        <div class="stat-label">Puntuación</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.score}</div>
                        <div class="stat-label">Puntos Totales</div>
                    </div>
                    ${timeTaken > 0 ? `
                        <div class="stat-card">
                            <div class="stat-value">${this.formatTime(timeTaken)}</div>
                            <div class="stat-label">Tiempo</div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="results-feedback">
                    <h4>Retroalimentación</h4>
                    <p>${this.getPersonalizedFeedback(percentage, correctAnswers)}</p>
                </div>
                
                <div class="question-review">
                    <h4>Revisión de Respuestas</h4>
                    <div class="review-questions">
                        ${this.generateQuestionReviewHTML()}
                    </div>
                </div>
                
                <div class="results-actions">
                    <button class="btn btn-primary" onclick="location.reload()">🔄 Repetir Quiz</button>
                    <button class="btn btn-secondary" onclick="window.scrollTo(0, 0)">⬆️ Volver al Inicio</button>
                </div>
            </div>
        `;
    }

    generateQuestionReviewHTML() {
        return this.questions.map((question, index) => {
            const userAnswer = this.answers[index];
            const isCorrect = this.checkAnswer(question, userAnswer);
            
            return `
                <div class="review-question ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="review-header">
                        <span class="question-number">Pregunta ${index + 1}</span>
                        <span class="result-indicator">
                            ${isCorrect ? '✅ Correcta' : '❌ Incorrecta'}
                        </span>
                    </div>
                    <div class="review-content">
                        <p class="review-question-text">${question.question}</p>
                        <div class="answer-comparison">
                            <div class="user-answer">
                                <strong>Tu respuesta:</strong> ${this.formatAnswer(question, userAnswer)}
                            </div>
                            <div class="correct-answer">
                                <strong>Respuesta correcta:</strong> ${this.formatAnswer(question, question.correctAnswer)}
                            </div>
                        </div>
                        ${question.explanation ? `
                            <div class="answer-explanation">
                                <strong>Explicación:</strong> ${question.explanation}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    formatAnswer(question, answer) {
        if (answer === undefined) return 'Sin respuesta';
        
        if (question.type === 'multiple-select') {
            if (!Array.isArray(answer) || answer.length === 0) return 'Sin respuesta';
            return answer.map(index => question.options[index]).join(', ');
        } else if (question.type === 'true-false') {
            return answer ? 'Verdadero' : 'Falso';
        } else {
            return question.options[answer] || 'Respuesta inválida';
        }
    }

    getPerformanceLevel(percentage) {
        if (percentage >= 90) {
            return { class: 'excellent', title: 'Excelente', emoji: '🌟' };
        } else if (percentage >= 80) {
            return { class: 'very-good', title: 'Muy Bien', emoji: '🎉' };
        } else if (percentage >= 70) {
            return { class: 'good', title: 'Bien', emoji: '👍' };
        } else if (percentage >= 60) {
            return { class: 'fair', title: 'Regular', emoji: '👌' };
        } else {
            return { class: 'needs-improvement', title: 'Necesita Mejorar', emoji: '📚' };
        }
    }

    getPersonalizedFeedback(percentage, correctAnswers) {
        if (percentage >= 90) {
            return '¡Excelente trabajo! Tienes un dominio excepcional de los conceptos de ciberseguridad. ¡Eres todo un experto!';
        } else if (percentage >= 80) {
            return '¡Muy bien! Demuestras un buen entendimiento de la ciberseguridad. Solo algunos pequeños detalles por pulir.';
        } else if (percentage >= 70) {
            return 'Buen trabajo. Tienes una base sólida, pero hay algunas áreas donde puedes mejorar. ¡Sigue practicando!';
        } else if (percentage >= 60) {
            return 'Has hecho un esfuerzo razonable, pero necesitas repasar algunos conceptos. Te recomendamos revisar el material y volver a intentarlo.';
        } else {
            return 'No te desanimes. La ciberseguridad es un tema complejo. Te sugerimos revisar el material educativo y practicar más antes de volver a intentarlo.';
        }
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    startTimer() {
        const timerElement = document.querySelector('.time-remaining');
        if (!timerElement) return;
        
        let timeLeft = this.timeLimit;
        
        const updateTimer = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                this.submitQuiz();
                return;
            }
            
            timeLeft--;
        };
        
        updateTimer();
        this.timerInterval = setInterval(updateTimer, 1000);
    }

    getResults() {
        const totalQuestions = this.questions.length;
        const correctAnswers = this.questions.filter((question, index) => 
            this.checkAnswer(question, this.answers[index])
        ).length;
        
        return {
            quizId: this.quizId,
            title: this.title,
            score: this.score,
            correctAnswers,
            totalQuestions,
            percentage: Math.round((correctAnswers / totalQuestions) * 100),
            timeTaken: this.startTime ? Math.round((Date.now() - this.startTime) / 1000) : 0,
            completedAt: new Date().toISOString(),
            answers: this.answers
        };
    }
}

/**
 * Privacy Quiz
 */
class PrivacyQuiz extends BaseQuiz {
    constructor() {
        const questions = [
            {
                question: "¿Cuál de estos datos personales NO deberías compartir en redes sociales?",
                type: "multiple-choice",
                options: [
                    "Tu comida favorita",
                    "Tu dirección completa de casa",
                    "Tus hobbies",
                    "Tu color favorito"
                ],
                correctAnswer: 1,
                difficulty: "easy",
                explanation: "Tu dirección es información privada que puede ser usada por personas malintencionadas para encontrarte.",
                hint: "Piensa en qué información podría ayudar a un extraño a encontrarte físicamente."
            },
            {
                question: "¿Qué configuración de privacidad es más segura para tu perfil?",
                type: "multiple-choice",
                options: [
                    "Completamente público",
                    "Solo amigos pueden ver mi perfil",
                    "Amigos de amigos pueden ver todo",
                    "Cualquiera puede encontrarme en búsquedas"
                ],
                correctAnswer: 1,
                difficulty: "medium",
                explanation: "Limitar la visibilidad de tu perfil solo a amigos reduce el riesgo de que extraños accedan a tu información.",
                hint: "¿Quiénes son las personas en las que más confías?"
            },
            {
                question: "¿Es seguro publicar fotos de tus vacaciones mientras estás de viaje?",
                type: "true-false",
                correctAnswer: false,
                difficulty: "medium",
                explanation: "Publicar en tiempo real que no estás en casa puede ser una invitación para ladrones.",
                hint: "Piensa en quién podría estar viendo que tu casa está vacía."
            },
            {
                question: "¿Cuáles de estas acciones protegen tu privacidad online? (Selecciona todas las correctas)",
                type: "multiple-select",
                options: [
                    "Revisar configuraciones de privacidad regularmente",
                    "Aceptar solicitudes de amistad de desconocidos",
                    "Usar contraseñas diferentes para cada cuenta",
                    "Publicar tu ubicación en tiempo real",
                    "Cerrar sesión en dispositivos compartidos"
                ],
                correctAnswer: [0, 2, 4],
                difficulty: "hard",
                explanation: "Las buenas prácticas incluyen revisar privacidad, usar contraseñas únicas y cerrar sesión en dispositivos compartidos.",
                hint: "Piensa en acciones que te den más control sobre tu información personal."
            },
            {
                question: "¿Qué debes hacer antes de descargar una aplicación?",
                type: "multiple-choice",
                options: [
                    "Descargarla inmediatamente si es gratis",
                    "Leer los permisos y política de privacidad",
                    "Solo mirar cuántas estrellas tiene",
                    "Preguntarle a un amigo si la usa"
                ],
                correctAnswer: 1,
                difficulty: "medium",
                explanation: "Siempre debes revisar qué permisos pide una aplicación y cómo usará tu información antes de instalarla.",
                hint: "¿Qué información necesita realmente una aplicación para funcionar?"
            }
        ];
        
        super('privacy-quiz', '🛡️ Quiz de Privacidad Online', questions);
    }
}

/**
 * Password Quiz
 */
class PasswordQuiz extends BaseQuiz {
    constructor() {
        const questions = [
            {
                question: "¿Cuál de estas contraseñas es más segura?",
                type: "multiple-choice",
                options: [
                    "123456",
                    "password",
                    "MiGato2024!",
                    "qwerty"
                ],
                correctAnswer: 2,
                difficulty: "easy",
                explanation: "Una contraseña fuerte combina letras mayúsculas, minúsculas, números y símbolos, y no usa palabras comunes.",
                hint: "Busca la que tenga más variedad de caracteres y no sea una palabra común."
            },
            {
                question: "¿Es buena idea usar la misma contraseña para todas tus cuentas?",
                type: "true-false",
                correctAnswer: false,
                difficulty: "easy",
                explanation: "Si usas la misma contraseña en todas partes, un hacker que la descubra puede acceder a todas tus cuentas.",
                hint: "Piensa qué pasaría si alguien descubre tu contraseña única."
            },
            {
                question: "¿Qué características debe tener una contraseña fuerte? (Selecciona todas las correctas)",
                type: "multiple-select",
                options: [
                    "Al menos 8 caracteres de longitud",
                    "Incluir tu nombre completo",
                    "Combinar mayúsculas y minúsculas",
                    "Incluir números",
                    "Usar símbolos especiales",
                    "Ser tu fecha de nacimiento"
                ],
                correctAnswer: [0, 2, 3, 4],
                difficulty: "medium",
                explanation: "Una contraseña fuerte debe ser larga, variada y no contener información personal fácil de adivinar.",
                hint: "Piensa en características que hagan la contraseña difícil de adivinar pero fácil de recordar para ti."
            },
            {
                question: "¿Dónde es más seguro guardar tus contraseñas?",
                type: "multiple-choice",
                options: [
                    "En un papel pegado en el monitor",
                    "En un archivo de texto en el escritorio",
                    "En un gestor de contraseñas seguro",
                    "En las notas del teléfono"
                ],
                correctAnswer: 2,
                difficulty: "medium",
                explanation: "Los gestores de contraseñas están diseñados específicamente para guardar contraseñas de forma segura y cifrada.",
                hint: "¿Cuál opción está diseñada específicamente para proteger contraseñas?"
            },
            {
                question: "¿Con qué frecuencia deberías cambiar tus contraseñas importantes?",
                type: "multiple-choice",
                options: [
                    "Nunca",
                    "Cada día",
                    "Solo si sospechas que fueron comprometidas",
                    "Cada semana"
                ],
                correctAnswer: 2,
                difficulty: "hard",
                explanation: "Los expertos recomiendan cambiar contraseñas solo cuando hay razones para creer que fueron comprometidas, ya que cambiarlas muy frecuentemente puede llevar a usar contraseñas más débiles.",
                hint: "Piensa en cuándo realmente sería necesario cambiar una contraseña."
            }
        ];
        
        super('password-quiz', '🔐 Quiz de Contraseñas Seguras', questions);
    }
}

/**
 * Phishing Quiz
 */
class PhishingQuiz extends BaseQuiz {
    constructor() {
        const questions = [
            {
                question: "¿Cuál de estas es una señal de que un email podría ser phishing?",
                type: "multiple-choice",
                options: [
                    "Viene de tu banco conocido",
                    "Te pide que actualices tu contraseña urgentemente",
                    "Está bien escrito sin errores",
                    "No tiene enlaces sospechosos"
                ],
                correctAnswer: 1,
                difficulty: "easy",
                explanation: "Los emails de phishing frecuentemente crean falsa urgencia para que actúes sin pensar.",
                hint: "¿Qué táctica usan los estafadores para hacer que actúes rápidamente?"
            },
            {
                question: "¿Es seguro hacer clic en enlaces de emails que no esperabas?",
                type: "true-false",
                correctAnswer: false,
                difficulty: "easy",
                explanation: "Los enlaces en emails inesperados pueden llevarte a sitios maliciosos que roben tu información.",
                hint: "Si no esperabas recibir un email, ¿qué tan confiable puede ser?"
            },
            {
                question: "¿Qué deberías hacer si recibes un email sospechoso? (Selecciona todas las correctas)",
                type: "multiple-select",
                options: [
                    "Hacer clic en todos los enlaces para verificar",
                    "Borrar el email inmediatamente",
                    "Verificar la información contactando directamente a la empresa",
                    "Reenviar el email a tus amigos como advertencia",
                    "Reportar el email como spam o phishing"
                ],
                correctAnswer: [1, 2, 4],
                difficulty: "medium",
                explanation: "Lo mejor es borrar emails sospechosos, verificar información por canales oficiales y reportar intentos de phishing.",
                hint: "Piensa en acciones que no pongan en riesgo tu información o la de otros."
            },
            {
                question: "¿Cómo puedes verificar si un enlace es legítimo antes de hacer clic?",
                type: "multiple-choice",
                options: [
                    "Hacer clic para ver a dónde lleva",
                    "Pasar el ratón sobre el enlace para ver la URL real",
                    "Confiar en el texto del enlace",
                    "Solo los enlaces en negritas son seguros"
                ],
                correctAnswer: 1,
                difficulty: "medium",
                explanation: "Al pasar el ratón sobre un enlace puedes ver la URL real a la que lleva, sin hacer clic en él.",
                hint: "¿Cómo puedes 'espiar' un enlace sin activarlo?"
            },
            {
                question: "¿Qué sitios web son más seguros para ingresar información personal?",
                type: "multiple-choice",
                options: [
                    "Cualquier sitio que se vea profesional",
                    "Solo sitios que empiecen con 'https://' y tengan un candado",
                    "Sitios que llegaste siguiendo enlaces en emails",
                    "Sitios que no piden contraseña"
                ],
                correctAnswer: 1,
                difficulty: "medium",
                explanation: "HTTPS y el candado indican que la conexión está cifrada y es más segura para datos sensibles.",
                hint: "Busca las señales técnicas que indican una conexión segura."
            }
        ];
        
        super('phishing-quiz', '🎣 Quiz Anti-Phishing', questions);
    }
}

/**
 * Social Media Quiz
 */
class SocialMediaQuiz extends BaseQuiz {
    constructor() {
        const questions = [
            {
                question: "¿Qué debes hacer antes de publicar una foto en redes sociales?",
                type: "multiple-choice",
                options: [
                    "Publicarla inmediatamente",
                    "Preguntarte: ¿estaría bien que cualquiera viera esto?",
                    "Etiquetas a todos tus amigos",
                    "Usar muchos hashtags populares"
                ],
                correctAnswer: 1,
                difficulty: "easy",
                explanation: "Siempre debes pensar si te sentirías cómodo que cualquier persona viera esa publicación.",
                hint: "¿Qué pregunta te ayudaría a decidir si algo es apropiado para compartir públicamente?"
            },
            {
                question: "¿Es seguro aceptar solicitudes de amistad de personas que no conoces?",
                type: "true-false",
                correctAnswer: false,
                difficulty: "easy",
                explanation: "Aceptar extraños puede darte acceso a personas con malas intenciones a tu información personal.",
                hint: "¿Confiarías en un extraño en la vida real con tu información personal?"
            },
            {
                question: "¿Cuáles de estas configuraciones de privacidad son recomendables? (Selecciona todas las correctas)",
                type: "multiple-select",
                options: [
                    "Que solo tus amigos vean tus publicaciones",
                    "Permitir que cualquiera te etiquete en fotos",
                    "Revisar publicaciones antes de que aparezcan en tu perfil",
                    "Permitir que cualquiera te encuentre por tu email",
                    "Desactivar la ubicación en tus fotos"
                ],
                correctAnswer: [0, 2, 4],
                difficulty: "medium",
                explanation: "Es mejor limitar quien ve tu contenido, revisar etiquetas y desactivar datos de ubicación.",
                hint: "Piensa en configuraciones que te den más control sobre tu privacidad."
            },
            {
                question: "¿Qué tipo de información NO deberías incluir en tu biografía pública?",
                type: "multiple-choice",
                options: [
                    "Tus hobbies favoritos",
                    "Tu número de teléfono personal",
                    "Tus géneros musicales favoritos",
                    "Frases inspiradoras"
                ],
                correctAnswer: 1,
                difficulty: "easy",
                explanation: "El número de teléfono es información de contacto privada que puede ser mal utilizada.",
                hint: "¿Qué información podría usar un extraño para contactarte directamente?"
            },
            {
                question: "¿Cuándo es apropiado reportar a alguien en redes sociales?",
                type: "multiple-choice",
                options: [
                    "Cuando no te gusta su opinión",
                    "Cuando publican contenido ofensivo o inapropiado",
                    "Cuando tienen más seguidores que tú",
                    "Nunca, no es necesario"
                ],
                correctAnswer: 1,
                difficulty: "medium",
                explanation: "Debes reportar contenido que viole las normas de la plataforma o que sea dañino.",
                hint: "¿Cuándo el contenido de alguien podría hacer daño a otros usuarios?"
            }
        ];
        
        super('social-media-quiz', '📱 Quiz de Redes Sociales Seguras', questions);
    }
}

/**
 * Device Safety Quiz
 */
class DeviceSafetyQuiz extends BaseQuiz {
    constructor() {
        const questions = [
            {
                question: "¿Cuál es la forma más segura de proteger tu teléfono?",
                type: "multiple-choice",
                options: [
                    "No ponerle ninguna protección para acceder más rápido",
                    "Usar un PIN, patrón o huella dactilar",
                    "Solo dejarlo boca abajo",
                    "Esconderlo siempre"
                ],
                correctAnswer: 1,
                difficulty: "easy",
                explanation: "Un método de bloqueo impide que otros accedan a tu información si pierdes el dispositivo.",
                hint: "¿Qué evitaría que un extraño use tu teléfono si lo encuentra?"
            },
            {
                question: "¿Es importante mantener actualizado el software de tus dispositivos?",
                type: "true-false",
                correctAnswer: true,
                difficulty: "easy",
                explanation: "Las actualizaciones incluyen parches de seguridad que protegen contra nuevas amenazas.",
                hint: "¿Por qué las empresas lanzan actualizaciones regularmente?"
            },
            {
                question: "¿Qué debes hacer antes de deshacerte de un dispositivo viejo? (Selecciona todas las correctas)",
                type: "multiple-select",
                options: [
                    "Borrar todos tus datos personales",
                    "Regresarlo a configuración de fábrica",
                    "Solo apagarlo",
                    "Retirar o destruir el disco duro/memoria",
                    "Cerrar sesión en todas las cuentas"
                ],
                correctAnswer: [0, 1, 3, 4],
                difficulty: "hard",
                explanation: "Debes asegurar completamente que ningún dato personal pueda ser recuperado del dispositivo.",
                hint: "¿Qué pasos garantizarían que tu información no pueda ser recuperada?"
            },
            {
                question: "¿Cuándo es seguro conectarte a una red WiFi pública?",
                type: "multiple-choice",
                options: [
                    "Siempre que sea gratis",
                    "Solo para actividades que no requieran información sensible",
                    "Nunca es seguro",
                    "Solo si tiene muchos usuarios conectados"
                ],
                correctAnswer: 1,
                difficulty: "medium",
                explanation: "Las redes públicas son menos seguras, pero pueden usarse para navegación básica, evitando actividades sensibles como banca online.",
                hint: "¿Qué tipo de actividades no pondrían en riesgo información importante?"
            },
            {
                question: "¿Qué aplicación de estas es más importante tener en tu dispositivo?",
                type: "multiple-choice",
                options: [
                    "Juegos populares",
                    "Aplicación antivirus actualizada",
                    "Todas las redes sociales posibles",
                    "Aplicaciones de descarga gratuita"
                ],
                correctAnswer: 1,
                difficulty: "medium",
                explanation: "Un antivirus ayuda a proteger tu dispositivo contra malware y otras amenazas de seguridad.",
                hint: "¿Qué aplicación está diseñada específicamente para proteger tu dispositivo?"
            }
        ];
        
        super('device-safety-quiz', '💻 Quiz de Seguridad de Dispositivos', questions);
    }
}

// Global functions for quiz interactions
window.toggleHint = function(questionIndex) {
    const hint = document.getElementById(`hint-${questionIndex}`);
    if (hint) {
        hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
    }
};

window.showExplanation = function(questionIndex) {
    // This would show additional explanation - implementation depends on quiz structure
    console.log(`Showing explanation for question ${questionIndex}`);
};

// Initialize quiz manager
let quizManager;

document.addEventListener('DOMContentLoaded', () => {
    quizManager = new QuizManager();
    
    // Initialize privacy quiz automatically if container exists
    const privacyQuizContainer = document.getElementById('privacy-quiz');
    if (privacyQuizContainer) {
        const privacyQuiz = quizManager.startQuiz('privacy-quiz');
        if (privacyQuiz) {
            privacyQuizContainer.innerHTML = privacyQuiz;
            
            // Setup event listeners after a short delay to ensure DOM is ready
            setTimeout(() => {
                quizManager.quizzes.get('privacy-quiz').setupEventListeners();
            }, 100);
        }
    }
});

// Export for global access
window.QuizManager = QuizManager;
window.getQuizManager = () => quizManager;

console.log('📝 Quiz system loaded successfully!');