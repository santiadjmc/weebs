// Interactive Games and Quizzes for CiberKids
// All code and comments in English, game content in Spanish

class CiberGames {
    constructor() {
        this.phishingExamples = [];
        this.passwordQuestions = [];
        this.socialScenarios = [];
        this.finalQuizQuestions = [];
        this.currentPhishingIndex = 0;
        this.phishingScore = 0;
        this.currentQuestionIndex = 0;
        this.currentScenarioIndex = 0;
        this.init();
    }

    init() {
        this.initializeGameData();
        this.setupGameMethods();
    }

    setupGameMethods() {
        // Make game methods available to main app after a short delay
        setTimeout(() => {
            if (typeof window.ciberKidsApp !== 'undefined') {
                window.ciberKidsApp.loadPasswordQuiz = () => this.loadPasswordQuiz();
                window.ciberKidsApp.loadPhishingGame = () => this.loadPhishingGame();
                window.ciberKidsApp.loadSocialScenarios = () => this.loadSocialScenarios();
                window.ciberKidsApp.loadFinalQuiz = () => this.loadFinalQuiz();
            }
        }, 50);
    }

    initializeGameData() {
        // Phishing email examples (mix of safe and malicious)
        this.phishingExamples = [
            {
                subject: "¡Felicidades! Has ganado un iPhone 15 Pro!",
                sender: "sorteos@premio-falso.com",
                content: "¡INCREÍBLE! Has sido seleccionado para ganar un iPhone 15 Pro GRATIS. Haz clic AHORA para reclamar tu premio antes de que expire.",
                isPhishing: true,
                explanation: "Este es phishing porque: promete premios imposibles, usa urgencia falsa, y el remitente no es oficial."
            },
            {
                subject: "Confirmación de tu pedido #12345",
                sender: "noreply@amazon.com",
                content: "Hola, confirmamos que tu pedido ha sido procesado correctamente. Puedes seguir el estado en tu cuenta.",
                isPhishing: false,
                explanation: "Este parece seguro: viene de una dirección oficial, no pide información personal, y es informativo."
            },
            {
                subject: "URGENTE: Tu cuenta será cerrada",
                sender: "seguridad@banco-falso.net",
                content: "Su cuenta bancaria será bloqueada en 24 horas. Ingrese INMEDIATAMENTE sus datos aquí para evitarlo.",
                isPhishing: true,
                explanation: "¡PHISHING! Usa miedo y urgencia, pide datos personales, y el remitente es sospechoso."
            },
            {
                subject: "Recordatorio: Reunión de mañana",
                sender: "maria.gonzalez@escuela.edu",
                content: "Te recuerdo que mañana tenemos reunión a las 3 PM en el aula 205. No olvides traer tus materiales.",
                isPhishing: false,
                explanation: "Es seguro: remitente conocido de la escuela, contenido normal, no pide información sensitiva."
            },
            {
                subject: "Oferta especial solo para ti",
                sender: "ofertas@tienda-sospechosa.xyz",
                content: "¡Descuento del 90% en todo! Ingresa tu número de tarjeta de crédito ahora para aprovechar esta oferta única.",
                isPhishing: true,
                explanation: "PHISHING: descuentos imposibles, pide información financiera, dominio sospechoso (.xyz)."
            },
            {
                subject: "Actualización de la aplicación móvil",
                sender: "updates@whatsapp.com",
                content: "Una nueva versión de WhatsApp está disponible. Actualiza desde la tienda oficial de aplicaciones.",
                isPhishing: false,
                explanation: "Seguro: viene del remitente oficial, no pide datos, recomienda tienda oficial."
            },
            {
                subject: "¡Tu video se ha vuelto viral!",
                sender: "viral@youtube-fake.com",
                content: "¡Tu video tiene 1 millón de vistas! Haz clic aquí para ver las estadísticas y cobrar tus ganancias.",
                isPhishing: true,
                explanation: "PHISHING: promesa falsa de fama, dominio falso (youtube-fake), busca hacer clic en enlaces."
            },
            {
                subject: "Invitación a evento escolar",
                sender: "eventos@mischool.edu",
                content: "Estás invitado al festival de ciencias el próximo viernes. Más detalles en el sitio web de la escuela.",
                isPhishing: false,
                explanation: "Seguro: remitente escolar oficial, evento real, no pide información personal."
            }
        ];

        // Password strength quiz questions
        this.passwordQuestions = [
            {
                password: "123456",
                isStrong: false,
                explanation: "¡Muy débil! Es una secuencia simple y muy común. Los hackers la pueden adivinar fácilmente."
            },
            {
                password: "MiPerro2024!",
                isStrong: true,
                explanation: "¡Fuerte! Tiene mayúsculas, minúsculas, números y símbolos. Además es fácil de recordar."
            },
            {
                password: "password",
                isStrong: false,
                explanation: "¡Terrible! Es la contraseña más común del mundo. Nunca uses palabras obvias."
            },
            {
                password: "Sup3rS3cr3t@2024",
                isStrong: true,
                explanation: "¡Excelente! Combina todo: letras, números, símbolos, y es larga."
            },
            {
                password: "amigas123",
                isStrong: false,
                explanation: "Débil: aunque tiene números, es muy común y predecible."
            },
            {
                password: "JuegosVideo!89",
                isStrong: true,
                explanation: "¡Fuerte! Buena combinación de caracteres y longitud adecuada."
            }
        ];

        // Social media scenarios
        this.socialScenarios = [
            {
                situation: "Un desconocido te envía una solicitud de amistad y te dice que es de tu escuela. No lo reconoces.",
                options: [
                    { text: "Lo acepto inmediatamente", isCorrect: false },
                    { text: "Pregunto a mis padres primero", isCorrect: true },
                    { text: "Le envío mi número de teléfono", isCorrect: false }
                ],
                explanation: "¡Correcto! Siempre pregunta a un adulto antes de aceptar desconocidos. Tu seguridad es lo primero."
            },
            {
                situation: "Ves un comentario ofensivo en tu publicación. ¿Qué haces?",
                options: [
                    { text: "Respondo con otro comentario ofensivo", isCorrect: false },
                    { text: "Lo bloqueo y reporto", isCorrect: true },
                    { text: "Lo ignoro completamente", isCorrect: false }
                ],
                explanation: "¡Perfecto! Bloquear y reportar protege a otros usuarios y mantiene un ambiente seguro."
            },
            {
                situation: "Alguien te pide compartir tu ubicación en tiempo real para 'conocerte mejor'.",
                options: [
                    { text: "Comparto mi ubicación", isCorrect: false },
                    { text: "Le digo que no y lo bloqueo", isCorrect: true },
                    { text: "Solo comparto el nombre de mi ciudad", isCorrect: false }
                ],
                explanation: "¡Excelente! Nunca compartas tu ubicación con desconocidos. Es información muy privada."
            },
            {
                situation: "Quieres subir una foto con tus amigos en tu escuela. ¿Qué verificas antes?",
                options: [
                    { text: "Que no se vea el nombre de la escuela", isCorrect: true },
                    { text: "Que todos salgan bien en la foto", isCorrect: false },
                    { text: "Que tenga muchos likes", isCorrect: false }
                ],
                explanation: "¡Muy bien! No mostrar información de ubicación como nombres de escuelas te protege."
            }
        ];

        // Final quiz questions covering all topics
        this.finalQuizQuestions = [
            {
                question: "¿Cuál es la característica MÁS importante de una contraseña segura?",
                options: [
                    "Que sea corta y fácil de recordar",
                    "Que contenga al menos 8 caracteres con mayúsculas, minúsculas, números y símbolos",
                    "Que sea tu fecha de nacimiento",
                    "Que sea la misma para todas tus cuentas"
                ],
                correct: 1,
                explanation: "¡Correcto! Una contraseña fuerte debe ser larga y combinar diferentes tipos de caracteres."
            },
            {
                question: "Si recibes un email pidiendo tu contraseña de forma urgente, ¿qué debes hacer?",
                options: [
                    "Enviar mi contraseña inmediatamente",
                    "Ignorarlo porque es phishing",
                    "Reenviar el email a mis amigos",
                    "Cambiar mi contraseña y luego enviarla"
                ],
                correct: 1,
                explanation: "¡Exacto! Los servicios legítimos NUNCA piden tu contraseña por email."
            },
            {
                question: "¿Qué información NO debes compartir en redes sociales?",
                options: [
                    "Tus hobbies favoritos",
                    "Fotos con tus amigos",
                    "Tu dirección de casa y número de teléfono",
                    "Tus comidas favoritas"
                ],
                correct: 2,
                explanation: "¡Perfecto! Tu dirección y teléfono son información muy privada que nunca debes compartir."
            },
            {
                question: "¿Con qué frecuencia debes actualizar las aplicaciones de tu dispositivo?",
                options: [
                    "Una vez al año",
                    "Nunca, funcionan bien así",
                    "Regularmente cuando hay actualizaciones disponibles",
                    "Solo cuando se rompen"
                ],
                correct: 2,
                explanation: "¡Correcto! Las actualizaciones incluyen parches de seguridad importantes."
            },
            {
                question: "Si alguien que no conoces te pide encontrarte en persona, ¿qué debes hacer?",
                options: [
                    "Aceptar inmediatamente",
                    "Decir que no y contarle a un adulto de confianza",
                    "Pedirle una foto primero",
                    "Proponerle un lugar público"
                ],
                correct: 1,
                explanation: "¡Excelente! Siempre di no a desconocidos y habla con adultos de confianza."
            }
        ];
    }

    // Password Quiz Implementation
    loadPasswordQuiz() {
        const container = document.getElementById('password-quiz');
        if (!container) return;

        this.currentQuestionIndex = 0;
        this.shuffleArray(this.passwordQuestions);
        this.showPasswordQuestion();
    }

    showPasswordQuestion() {
        const container = document.getElementById('password-quiz');
        if (!container || this.currentQuestionIndex >= this.passwordQuestions.length) {
            this.showPasswordResults();
            return;
        }

        const question = this.passwordQuestions[this.currentQuestionIndex];
        
        container.innerHTML = `
            <div class="quiz-question">
                <h4>Pregunta ${this.currentQuestionIndex + 1} de ${this.passwordQuestions.length}</h4>
                <p>¿Es esta una contraseña segura?</p>
                <div class="password-display">${question.password}</div>
                <div class="quiz-options">
                    <button class="quiz-btn secure" onclick="checkPasswordAnswer(true)">
                        🛡️ Sí, es segura
                    </button>
                    <button class="quiz-btn insecure" onclick="checkPasswordAnswer(false)">
                        ⚠️ No, es insegura
                    </button>
                </div>
                <div id="password-feedback" class="quiz-feedback"></div>
            </div>
        `;
    }

    checkPasswordAnswer(userAnswer) {
        const question = this.passwordQuestions[this.currentQuestionIndex];
        const feedback = document.getElementById('password-feedback');
        const isCorrect = userAnswer === question.isStrong;
        
        if (isCorrect) {
            this.passwordScore = (this.passwordScore || 0) + 1;
        }

        feedback.innerHTML = `
            <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>${isCorrect ? '¡Correcto!' : '¡Incorrecto!'}</strong></p>
                <p>${question.explanation}</p>
                <button class="next-btn" onclick="nextPasswordQuestion()">
                    ${this.currentQuestionIndex < this.passwordQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'} ➡️
                </button>
            </div>
        `;
    }

    nextPasswordQuestion() {
        this.currentQuestionIndex++;
        this.showPasswordQuestion();
    }

    showPasswordResults() {
        const container = document.getElementById('password-quiz');
        const score = this.passwordScore || 0;
        const total = this.passwordQuestions.length;
        const percentage = (score / total) * 100;

        let message = '';
        let emoji = '';

        if (percentage >= 80) {
            message = '¡Excelente! Eres un experto en contraseñas seguras.';
            emoji = '🏆';
        } else if (percentage >= 60) {
            message = '¡Bien! Sabes bastante sobre contraseñas seguras.';
            emoji = '👍';
        } else {
            message = 'Necesitas practicar más. ¡Sigue aprendiendo!';
            emoji = '📚';
        }

        container.innerHTML = `
            <div class="quiz-results">
                <div class="results-icon">${emoji}</div>
                <h4>Resultados del Quiz de Contraseñas</h4>
                <div class="score-display">
                    <span class="score-number">${score}/${total}</span>
                    <span class="score-percentage">(${percentage.toFixed(0)}%)</span>
                </div>
                <p>${message}</p>
                <button class="retry-btn" onclick="window.ciberGames.loadPasswordQuiz()">
                    🔄 Intentar de Nuevo
                </button>
            </div>
        `;
    }

    // Phishing Detection Game
    loadPhishingGame() {
        this.currentPhishingIndex = 0;
        this.phishingScore = 0;
        this.shuffleArray(this.phishingExamples);
        this.showPhishingExample();
    }

    showPhishingExample() {
        const container = document.getElementById('email-preview');
        if (!container || this.currentPhishingIndex >= this.phishingExamples.length) {
            this.showPhishingResults();
            return;
        }

        const example = this.phishingExamples[this.currentPhishingIndex];
        
        container.innerHTML = `
            <div class="email-container">
                <div class="email-header">
                    <div class="email-from"><strong>De:</strong> ${example.sender}</div>
                    <div class="email-subject"><strong>Asunto:</strong> ${example.subject}</div>
                </div>
                <div class="email-body">
                    <p>${example.content}</p>
                </div>
                <div class="email-counter">
                    Email ${this.currentPhishingIndex + 1} de ${this.phishingExamples.length}
                </div>
            </div>
        `;

        // Update score display
        const scoreDisplay = document.getElementById('phishing-score');
        if (scoreDisplay) {
            scoreDisplay.textContent = `${this.phishingScore}/${this.phishingExamples.length}`;
        }
    }

    checkPhishing(userThinks) {
        const example = this.phishingExamples[this.currentPhishingIndex];
        const isCorrect = userThinks === example.isPhishing;
        
        if (isCorrect) {
            this.phishingScore++;
        }

        // Show immediate feedback
        const container = document.getElementById('email-preview');
        const resultClass = isCorrect ? 'correct-answer' : 'wrong-answer';
        const resultIcon = isCorrect ? '✅' : '❌';
        const resultText = isCorrect ? '¡Correcto!' : '¡Incorrecto!';
        
        container.innerHTML += `
            <div class="phishing-feedback ${resultClass}">
                <div class="feedback-header">
                    <span class="feedback-icon">${resultIcon}</span>
                    <span class="feedback-text">${resultText}</span>
                </div>
                <p><strong>Explicación:</strong> ${example.explanation}</p>
                <button class="next-email-btn" onclick="nextPhishingExample()">
                    ${this.currentPhishingIndex < this.phishingExamples.length - 1 ? 'Siguiente Email' : 'Ver Resultados'} ➡️
                </button>
            </div>
        `;

        // Disable buttons
        document.querySelectorAll('.detect-btn').forEach(btn => {
            btn.disabled = true;
        });
    }

    nextPhishingExample() {
        this.currentPhishingIndex++;
        
        // Re-enable buttons
        document.querySelectorAll('.detect-btn').forEach(btn => {
            btn.disabled = false;
        });
        
        this.showPhishingExample();
    }

    showPhishingResults() {
        const container = document.getElementById('email-preview');
        const percentage = (this.phishingScore / this.phishingExamples.length) * 100;

        let message = '';
        let emoji = '';
        let title = '';

        if (percentage >= 90) {
            title = '🕵️ ¡Detective Experto!';
            message = 'Eres increíble detectando phishing. ¡Estás súper protegido!';
            emoji = '🏆';
        } else if (percentage >= 70) {
            title = '👮 ¡Buen Detective!';
            message = 'Tienes buenos instintos. Con un poco más de práctica serás perfecto.';
            emoji = '👍';
        } else if (percentage >= 50) {
            title = '🤔 Detective en Entrenamiento';
            message = 'Vas por buen camino, pero necesitas más práctica para estar seguro.';
            emoji = '📚';
        } else {
            title = '😓 Necesitas Más Entrenamiento';
            message = 'No te preocupes, ¡todos empezamos así! Sigue practicando y mejorarás.';
            emoji = '💪';
        }

        container.innerHTML = `
            <div class="phishing-results">
                <div class="results-header">
                    <div class="results-emoji">${emoji}</div>
                    <h4>${title}</h4>
                </div>
                <div class="score-circle">
                    <div class="score-inner">
                        <span class="final-score">${this.phishingScore}/${this.phishingExamples.length}</span>
                        <span class="score-percent">${percentage.toFixed(0)}%</span>
                    </div>
                </div>
                <p class="results-message">${message}</p>
                <div class="results-actions">
                    <button class="retry-btn" onclick="window.ciberGames.loadPhishingGame()">
                        🔄 Jugar de Nuevo
                    </button>
                </div>
            </div>
        `;

        // Update final score in the main display
        const scoreDisplay = document.getElementById('phishing-score');
        if (scoreDisplay) {
            scoreDisplay.textContent = `${this.phishingScore}/${this.phishingExamples.length}`;
        }
    }

    // Social Media Scenarios
    loadSocialScenarios() {
        const container = document.getElementById('social-scenario');
        if (!container) return;

        this.currentScenarioIndex = 0;
        this.socialScore = 0;
        this.showSocialScenario();
    }

    showSocialScenario() {
        const container = document.getElementById('social-scenario');
        if (!container || this.currentScenarioIndex >= this.socialScenarios.length) {
            this.showSocialResults();
            return;
        }

        const scenario = this.socialScenarios[this.currentScenarioIndex];
        
        container.innerHTML = `
            <div class="scenario-card">
                <div class="scenario-header">
                    <h4>Situación ${this.currentScenarioIndex + 1} de ${this.socialScenarios.length}</h4>
                </div>
                <div class="scenario-situation">
                    <p>${scenario.situation}</p>
                </div>
                <div class="scenario-options">
                    ${scenario.options.map((option, index) => `
                        <button class="scenario-btn" onclick="checkSocialAnswer(${index})">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
                <div id="social-feedback" class="scenario-feedback"></div>
            </div>
        `;
    }

    checkSocialAnswer(optionIndex) {
        const scenario = this.socialScenarios[this.currentScenarioIndex];
        const selectedOption = scenario.options[optionIndex];
        const feedback = document.getElementById('social-feedback');
        
        if (selectedOption.isCorrect) {
            this.socialScore = (this.socialScore || 0) + 1;
        }

        feedback.innerHTML = `
            <div class="feedback ${selectedOption.isCorrect ? 'correct' : 'incorrect'}">
                <div class="feedback-header">
                    <span class="feedback-icon">${selectedOption.isCorrect ? '🎉' : '😅'}</span>
                    <span class="feedback-text">${selectedOption.isCorrect ? '¡Excelente elección!' : '¡Ups! Esa no era la mejor opción.'}</span>
                </div>
                <p>${scenario.explanation}</p>
                <button class="next-scenario-btn" onclick="nextSocialScenario()">
                    ${this.currentScenarioIndex < this.socialScenarios.length - 1 ? 'Siguiente Situación' : 'Ver Resultados'} ➡️
                </button>
            </div>
        `;

        // Disable all option buttons
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.disabled = true;
        });
    }

    nextSocialScenario() {
        this.currentScenarioIndex++;
        this.showSocialScenario();
    }

    showSocialResults() {
        const container = document.getElementById('social-scenario');
        const score = this.socialScore || 0;
        const total = this.socialScenarios.length;
        const percentage = (score / total) * 100;

        let message = '';
        let emoji = '';

        if (percentage >= 75) {
            message = '¡Eres un experto en seguridad en redes sociales! 🌟';
            emoji = '🛡️';
        } else if (percentage >= 50) {
            message = '¡Buen trabajo! Sabes cómo mantenerte seguro. 👏';
            emoji = '😊';
        } else {
            message = 'Sigue aprendiendo para estar más seguro online. 💪';
            emoji = '📖';
        }

        container.innerHTML = `
            <div class="social-results">
                <div class="results-icon">${emoji}</div>
                <h4>Resultados: Seguridad en Redes Sociales</h4>
                <div class="score-display">
                    <span class="score-number">${score}/${total}</span>
                    <span class="score-percentage">(${percentage.toFixed(0)}%)</span>
                </div>
                <p>${message}</p>
                <button class="retry-btn" onclick="window.ciberGames.loadSocialScenarios()">
                    🔄 Probar Otras Situaciones
                </button>
            </div>
        `;
    }

    // Final Comprehensive Quiz
    loadFinalQuiz() {
        const container = document.getElementById('final-quiz');
        if (!container) return;

        this.finalQuizIndex = 0;
        this.finalQuizScore = 0;
        this.shuffleArray(this.finalQuizQuestions);
        this.showFinalQuestion();
    }

    showFinalQuestion() {
        const container = document.getElementById('final-quiz');
        if (!container || this.finalQuizIndex >= this.finalQuizQuestions.length) {
            this.showFinalResults();
            return;
        }

        const question = this.finalQuizQuestions[this.finalQuizIndex];
        
        container.innerHTML = `
            <div class="final-quiz-question">
                <div class="question-header">
                    <h4>Pregunta ${this.finalQuizIndex + 1} de ${this.finalQuizQuestions.length}</h4>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(this.finalQuizIndex / this.finalQuizQuestions.length) * 100}%"></div>
                    </div>
                </div>
                <div class="question-text">
                    <p>${question.question}</p>
                </div>
                <div class="question-options">
                    ${question.options.map((option, index) => `
                        <button class="quiz-option" onclick="checkFinalAnswer(${index})">
                            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                            <span class="option-text">${option}</span>
                        </button>
                    `).join('')}
                </div>
                <div id="final-feedback" class="final-quiz-feedback"></div>
            </div>
        `;
    }

    checkFinalAnswer(optionIndex) {
        const question = this.finalQuizQuestions[this.finalQuizIndex];
        const isCorrect = optionIndex === question.correct;
        const feedback = document.getElementById('final-feedback');
        
        if (isCorrect) {
            this.finalQuizScore++;
        }

        feedback.innerHTML = `
            <div class="final-feedback ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="feedback-header">
                    <span class="feedback-icon">${isCorrect ? '🎯' : '🤔'}</span>
                    <span class="feedback-text">${isCorrect ? '¡Perfecto!' : 'No exactamente...'}</span>
                </div>
                <p><strong>Explicación:</strong> ${question.explanation}</p>
                <button class="next-final-btn" onclick="nextFinalQuestion()">
                    ${this.finalQuizIndex < this.finalQuizQuestions.length - 1 ? 'Siguiente Pregunta' : '🏆 Ver Resultados Finales'} ➡️
                </button>
            </div>
        `;

        // Disable all option buttons and highlight correct answer
        document.querySelectorAll('.quiz-option').forEach((btn, index) => {
            btn.disabled = true;
            if (index === question.correct) {
                btn.classList.add('correct-answer');
            } else if (index === optionIndex && !isCorrect) {
                btn.classList.add('wrong-answer');
            }
        });
    }

    nextFinalQuestion() {
        this.finalQuizIndex++;
        this.showFinalQuestion();
    }

    showFinalResults() {
        const container = document.getElementById('final-quiz');
        const score = this.finalQuizScore;
        const total = this.finalQuizQuestions.length;
        const percentage = (score / total) * 100;

        let title = '';
        let message = '';
        let emoji = '';
        let certificate = '';

        if (percentage >= 90) {
            title = '🏆 ¡CIBERSEGURIDAD MASTER!';
            message = 'Eres increíble. Has demostrado conocimientos expertos en ciberseguridad.';
            emoji = '🛡️';
            certificate = 'Certificado: Experto en Ciberseguridad Infantil';
        } else if (percentage >= 75) {
            title = '🎖️ ¡GUARDIÁN DIGITAL!';
            message = 'Excelente trabajo. Tienes muy buenos conocimientos para mantenerte seguro.';
            emoji = '🌟';
            certificate = 'Certificado: Guardián Digital Competente';
        } else if (percentage >= 60) {
            title = '🎯 ¡EXPLORADOR DIGITAL!';
            message = 'Buen trabajo. Sabes lo básico, pero puedes seguir mejorando.';
            emoji = '🚀';
            certificate = 'Certificado: Explorador Digital en Progreso';
        } else {
            title = '📚 ¡APRENDIZ DIGITAL!';
            message = 'Estás empezando tu viaje. Sigue estudiando y practicando.';
            emoji = '💪';
            certificate = 'Certificado: Aprendiz Digital Motivado';
        }

        container.innerHTML = `
            <div class="final-results">
                <div class="results-celebration">
                    <div class="celebration-emoji">${emoji}</div>
                    <h3>${title}</h3>
                </div>
                
                <div class="final-score-display">
                    <div class="score-circle-large">
                        <div class="score-inner-large">
                            <span class="final-score-number">${score}</span>
                            <span class="final-score-total">/${total}</span>
                        </div>
                        <div class="score-percentage-large">${percentage.toFixed(0)}%</div>
                    </div>
                </div>
                
                <div class="results-message">
                    <p>${message}</p>
                </div>
                
                <div class="certificate-section">
                    <div class="certificate-card">
                        <div class="certificate-header">🏅 ${certificate}</div>
                        <div class="certificate-body">
                            <p>Este certificado se otorga a:</p>
                            <div class="certificate-name">Futuro Experto en Ciberseguridad</div>
                            <p>Por completar exitosamente el entrenamiento de CiberKids</p>
                            <div class="certificate-date">Fecha: ${new Date().toLocaleDateString('es-ES')}</div>
                        </div>
                    </div>
                </div>
                
                <div class="final-actions">
                    <button class="retry-final-btn" onclick="window.ciberGames.loadFinalQuiz()">
                        🔄 Tomar Quiz de Nuevo
                    </button>
                    <button class="share-btn" onclick="shareResults(${percentage})">
                        📱 Compartir Logro
                    </button>
                </div>
                
                <div class="next-steps">
                    <h4>🚀 Próximos Pasos:</h4>
                    <ul>
                        <li>Practica creando contraseñas fuertes</li>
                        <li>Enseña a tus amigos sobre phishing</li>
                        <li>Revisa tu configuración de privacidad</li>
                        <li>Habla con tus padres sobre seguridad digital</li>
                    </ul>
                </div>
            </div>
        `;
    }

    // Utility methods
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    shareResults(percentage) {
        if (navigator.share) {
            navigator.share({
                title: 'CiberKids - Mi Certificado',
                text: `¡Completé el entrenamiento de ciberseguridad con ${percentage.toFixed(0)}% de aciertos!`,
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const text = `¡Completé el entrenamiento de ciberseguridad en CiberKids con ${percentage.toFixed(0)}% de aciertos! 🛡️`;
            navigator.clipboard.writeText(text).then(() => {
                alert('¡Texto copiado al portapapeles! Puedes pegarlo donde quieras compartirlo.');
            });
        }
    }
}

// Global functions for HTML onclick events
function checkPasswordAnswer(answer) {
    window.ciberGames.checkPasswordAnswer(answer);
}

function nextPasswordQuestion() {
    window.ciberGames.nextPasswordQuestion();
}

function checkPhishing(isPhishing) {
    window.ciberGames.checkPhishing(isPhishing);
}

function nextPhishingExample() {
    window.ciberGames.nextPhishingExample();
}

function checkSocialAnswer(index) {
    window.ciberGames.checkSocialAnswer(index);
}

function nextSocialScenario() {
    window.ciberGames.nextSocialScenario();
}

function checkFinalAnswer(index) {
    window.ciberGames.checkFinalAnswer(index);
}

function nextFinalQuestion() {
    window.ciberGames.nextFinalQuestion();
}

function shareResults(percentage) {
    window.ciberGames.shareResults(percentage);
}

// Extension methods for the main app
if (typeof CiberKidsApp !== 'undefined') {
    CiberKidsApp.prototype.loadPasswordQuiz = function() {
        if (window.ciberGames) {
            window.ciberGames.loadPasswordQuiz();
        }
    };

    CiberKidsApp.prototype.loadPhishingGame = function() {
        if (window.ciberGames) {
            window.ciberGames.loadPhishingGame();
        }
    };

    CiberKidsApp.prototype.loadSocialScenarios = function() {
        if (window.ciberGames) {
            window.ciberGames.loadSocialScenarios();
        }
    };

    CiberKidsApp.prototype.loadFinalQuiz = function() {
        if (window.ciberGames) {
            window.ciberGames.loadFinalQuiz();
        }
    };
}

// Initialize games when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ciberGames = new CiberGames();
});