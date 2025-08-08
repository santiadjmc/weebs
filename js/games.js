/**
 * CiberKids - Interactive Games and Quizzes
 * Educational games for cybersecurity learning
 */

// Phishing Detection Game
let phishingGameData = {
    currentEmail: 0,
    score: 0,
    totalEmails: 10,
    emails: [
        {
            from: "admin@banco-popular.com",
            subject: "URGENTE: Confirma tu cuenta inmediatamente",
            body: "Tu cuenta será suspendida en 24 horas. Haz clic aquí para evitarlo: <span class='suspicious-link'>http://banco-falso.com/login</span>",
            isPhishing: true,
            explanation: "¡Correcto! Este es phishing porque usa urgencia, un enlace sospechoso y pide información personal."
        },
        {
            from: "netflix@netflix.com",
            subject: "Recomendaciones para ti esta semana",
            body: "Hola! Te traemos nuevas series que podrían gustarte basadas en tu historial de visualización.",
            isPhishing: false,
            explanation: "¡Correcto! Este email parece legítimo, no pide información personal ni usa enlaces sospechosos."
        },
        {
            from: "soporte@email-seguro.com",
            subject: "¡Has ganado $1,000,000!",
            body: "¡Felicitaciones! Has sido seleccionado para recibir un millón de dólares. Solo necesitamos tu número de cuenta bancaria.",
            isPhishing: true,
            explanation: "¡Correcto! Esto es phishing clásico - ofertas increíbles que piden información bancaria."
        },
        {
            from: "mama@gmail.com",
            subject: "No olvides tu almuerzo",
            body: "Hola mi amor, dejé tu almuerzo en la mesa de la cocina. ¡Que tengas un buen día en la escuela!",
            isPhishing: false,
            explanation: "¡Correcto! Este es un email familiar normal, sin solicitudes sospechosas."
        },
        {
            from: "admin@tu-escuela.edu",
            subject: "Tu contraseña expira HOY - Actualiza AHORA",
            body: "Tu contraseña del sistema escolar expira hoy. Actualízala aquí: <span class='suspicious-link'>http://escuela-fake.net</span>",
            isPhishing: true,
            explanation: "¡Correcto! Usa urgencia y un enlace falso para robar credenciales escolares."
        },
        {
            from: "biblioteca@ciudad.gov",
            subject: "Libros reservados disponibles",
            body: "Los libros que reservaste ya están disponibles para recoger en la biblioteca central.",
            isPhishing: false,
            explanation: "¡Correcto! Email informativo legítimo de un servicio público."
        },
        {
            from: "seguridad@amazon.com",
            subject: "Actividad sospechosa en tu cuenta",
            body: "Detectamos un intento de acceso no autorizado. Verifica tu identidad aquí: <span class='suspicious-link'>amazon-verificacion.net</span>",
            isPhishing: true,
            explanation: "¡Correcto! Aunque parece de Amazon, el enlace es falso y busca robar credenciales."
        },
        {
            from: "maestro@colegio.edu",
            subject: "Tarea para mañana",
            body: "Recuerden que mañana deben traer el proyecto de ciencias terminado. ¡Mucho éxito!",
            isPhishing: false,
            explanation: "¡Correcto! Email educativo normal de un maestro."
        },
        {
            from: "premio@concurso-falso.com",
            subject: "¡iPhone GRATIS! Solo por hoy",
            body: "¡Felicitaciones! Eres nuestro visitante número 1000. Reclama tu iPhone gratis proporcionando tus datos personales.",
            isPhishing: true,
            explanation: "¡Correcto! Típico phishing con premios falsos que piden datos personales."
        },
        {
            from: "notificaciones@youtube.com",
            subject: "Nuevo video de tu canal favorito",
            body: "Tu canal favorito 'CiberKids' ha subido un nuevo video sobre seguridad online. ¡Ve a verlo!",
            isPhishing: false,
            explanation: "¡Correcto! Notificación legítima de plataforma conocida."
        }
    ]
};

// Social Media Quiz Data
let socialQuizData = {
    currentQuestion: 0,
    score: 0,
    questions: [
        {
            question: "¿Qué información NO deberías compartir en tus redes sociales?",
            options: [
                "Tu comida favorita",
                "La dirección exacta de tu casa",
                "Fotos de tus mascotas",
                "Tus hobbies favoritos"
            ],
            correct: 1,
            explanation: "¡Correcto! Nunca compartas tu dirección exacta, es información muy personal y peligrosa."
        },
        {
            question: "¿Cuál es la mejor configuración de privacidad para un niño?",
            options: [
                "Perfil completamente público",
                "Perfil privado solo para amigos conocidos",
                "Perfil semi-público",
                "No importa la configuración"
            ],
            correct: 1,
            explanation: "¡Perfecto! Un perfil privado te protege de extraños y personas malintencionadas."
        },
        {
            question: "Si alguien que no conoces te envía una solicitud de amistad, deberías:",
            options: [
                "Aceptarla inmediatamente",
                "Rechazarla sin preguntar a tus padres",
                "Hablar con tus padres antes de decidir",
                "Aceptarla pero no hablar con esa persona"
            ],
            correct: 2,
            explanation: "¡Excelente! Siempre consulta con tus padres antes de aceptar solicitudes de desconocidos."
        },
        {
            question: "¿Qué haces si alguien te molesta o te hace sentir incómodo online?",
            options: [
                "Lo ignoro y sigo navegando",
                "Le respondo de mala manera",
                "Se lo cuento inmediatamente a mis padres o maestros",
                "Cierro mi cuenta para siempre"
            ],
            correct: 2,
            explanation: "¡Muy bien! Siempre busca ayuda de adultos de confianza cuando algo te haga sentir mal."
        },
        {
            question: "¿Con qué frecuencia deberías revisar tu configuración de privacidad?",
            options: [
                "Nunca, se configura sola",
                "Solo cuando hay problemas",
                "Regularmente, cada pocos meses",
                "Una vez al año"
            ],
            correct: 2,
            explanation: "¡Perfecto! Revisar regularmente tu privacidad te mantiene seguro ante cambios en las plataformas."
        }
    ]
};

// Final Quiz Data
let finalQuizData = {
    currentQuestion: 0,
    score: 0,
    questions: [
        {
            question: "¿Cuántos caracteres mínimo debería tener una contraseña segura?",
            options: ["4 caracteres", "6 caracteres", "8 caracteres o más", "No importa la longitud"],
            correct: 2,
            explanation: "¡Correcto! Las contraseñas seguras deben tener al menos 8 caracteres, preferiblemente más."
        },
        {
            question: "¿Qué es el phishing?",
            options: [
                "Un tipo de pez",
                "Un intento de robar información haciéndose pasar por alguien de confianza",
                "Un juego online",
                "Un programa antivirus"
            ],
            correct: 1,
            explanation: "¡Excelente! El phishing es cuando los criminales se disfrazan para robarte información."
        },
        {
            question: "En redes sociales, ¿qué configuración es más segura?",
            options: [
                "Perfil público para que todos me conozcan",
                "Perfil privado solo para amigos conocidos",
                "Perfil semi-privado",
                "No usar redes sociales nunca"
            ],
            correct: 1,
            explanation: "¡Perfecto! Un perfil privado te protege de extraños con malas intenciones."
        },
        {
            question: "¿Qué significa HTTPS en una página web?",
            options: [
                "Que la página es muy rápida",
                "Que la conexión es segura y encriptada",
                "Que es una página de noticias",
                "No significa nada importante"
            ],
            correct: 1,
            explanation: "¡Correcto! HTTPS significa que tus datos viajan seguros entre tu dispositivo y el sitio web."
        },
        {
            question: "¿Qué debes hacer SIEMPRE antes de descargar una aplicación?",
            options: [
                "Descargarla de cualquier sitio web",
                "Verificar que sea de una fuente confiable como App Store o Google Play",
                "Pedirle a un amigo que la descargue primero",
                "Descargarla inmediatamente sin verificar"
            ],
            correct: 1,
            explanation: "¡Excelente! Solo descarga apps de tiendas oficiales para evitar virus y software malicioso."
        },
        {
            question: "Si recibes un email que dice 'URGENTE: actualiza tu contraseña HOY', deberías:",
            options: [
                "Hacer clic inmediatamente en el enlace",
                "Ignorarlo completamente",
                "Verificar la dirección del remitente y consultar con un adulto",
                "Reenviar el email a todos tus contactos"
            ],
            correct: 2,
            explanation: "¡Muy bien! Los emails urgentes suelen ser phishing. Siempre verifica antes de actuar."
        },
        {
            question: "¿Qué información personal NO debes compartir online?",
            options: [
                "Tu comida favorita",
                "Tu dirección de casa y número de teléfono",
                "Tu color favorito",
                "El nombre de tu mascota"
            ],
            correct: 1,
            explanation: "¡Correcto! Tu dirección y teléfono son información muy personal que puede ponerte en peligro."
        },
        {
            question: "¿Con quién debes hablar si algo te molesta o preocupa online?",
            options: [
                "Solo con mis amigos online",
                "Con nadie, es mejor guardarse los problemas",
                "Con mis padres, maestros o adultos de confianza",
                "Solo con desconocidos en internet"
            ],
            correct: 2,
            explanation: "¡Perfecto! Los adultos de confianza están ahí para ayudarte y protegerte."
        },
        {
            question: "¿Qué es lo MÁS importante para mantener seguros tus dispositivos?",
            options: [
                "Tener muchas aplicaciones instaladas",
                "Usar bloqueo de pantalla y mantener el software actualizado",
                "Compartir la contraseña con amigos",
                "Dejar el dispositivo siempre desbloqueado"
            ],
            correct: 1,
            explanation: "¡Excelente! El bloqueo de pantalla y las actualizaciones son fundamentales para la seguridad."
        },
        {
            question: "¿Cuál es la regla de oro de la ciberseguridad?",
            options: [
                "Confiar en cualquier persona online",
                "Pensar antes de hacer clic, compartir o descargar",
                "Hacer todo rápidamente sin pensar",
                "Solo usar internet por las noches"
            ],
            correct: 1,
            explanation: "¡Perfecto! Pensar antes de actuar es la clave para mantenerse seguro en internet. ¡Eres un verdadero CiberHéroe!"
        }
    ]
};

/**
 * Initialize Phishing Detection Game
 */
function initializePhishingGame() {
    const gameContainer = document.getElementById('phishing-game');
    if (!gameContainer) return;
    
    const emailContainer = document.getElementById('email-container');
    const realEmailBtn = document.getElementById('real-email-btn');
    const phishingEmailBtn = document.getElementById('phishing-email-btn');
    const scoreDisplay = document.getElementById('score-value');
    const feedbackDisplay = document.getElementById('phishing-feedback');
    
    if (!emailContainer || !realEmailBtn || !phishingEmailBtn) return;
    
    // Shuffle emails for variety
    phishingGameData.emails = shuffleArray(phishingGameData.emails);
    
    realEmailBtn.addEventListener('click', () => handlePhishingChoice(false));
    phishingEmailBtn.addEventListener('click', () => handlePhishingChoice(true));
    
    displayCurrentEmail();
}

function displayCurrentEmail() {
    const emailContainer = document.getElementById('email-container');
    const currentEmailData = phishingGameData.emails[phishingGameData.currentEmail];
    
    emailContainer.innerHTML = `
        <div class="email-header">
            <div class="email-from"><strong>De:</strong> ${currentEmailData.from}</div>
            <div class="email-subject"><strong>Asunto:</strong> ${currentEmailData.subject}</div>
        </div>
        <div class="email-body">
            ${currentEmailData.body}
        </div>
    `;
    
    emailContainer.classList.add('animate-fade-in');
    setTimeout(() => {
        emailContainer.classList.remove('animate-fade-in');
    }, 600);
}

function handlePhishingChoice(userSaysPhishing) {
    const currentEmailData = phishingGameData.emails[phishingGameData.currentEmail];
    const feedbackDisplay = document.getElementById('phishing-feedback');
    const scoreDisplay = document.getElementById('score-value');
    
    const isCorrect = userSaysPhishing === currentEmailData.isPhishing;
    
    if (isCorrect) {
        phishingGameData.score++;
        showFeedback(feedbackDisplay, currentEmailData.explanation, 'correct');
        announceToScreenReader('¡Respuesta correcta!');
    } else {
        showFeedback(feedbackDisplay, currentEmailData.explanation, 'incorrect');
        announceToScreenReader('Respuesta incorrecta. ' + currentEmailData.explanation);
    }
    
    scoreDisplay.textContent = formatScore(phishingGameData.score, phishingGameData.currentEmail + 1);
    
    phishingGameData.currentEmail++;
    
    if (phishingGameData.currentEmail < phishingGameData.totalEmails) {
        setTimeout(() => {
            displayCurrentEmail();
        }, 3000);
    } else {
        setTimeout(() => {
            endPhishingGame();
        }, 3000);
    }
}

function endPhishingGame() {
    const emailContainer = document.getElementById('email-container');
    const gameControls = document.querySelector('#phishing-game .game-controls');
    const feedbackDisplay = document.getElementById('phishing-feedback');
    
    const finalScore = phishingGameData.score;
    const percentage = calculatePercentage(finalScore, phishingGameData.totalEmails);
    
    let message = '';
    let messageType = 'correct';
    
    if (percentage >= 80) {
        message = `¡Excelente! Obtuviste ${finalScore}/${phishingGameData.totalEmails} (${percentage}%). ¡Eres un experto detectando phishing! 🕵️‍♂️`;
        createConfetti();
    } else if (percentage >= 60) {
        message = `¡Bien hecho! Obtuviste ${finalScore}/${phishingGameData.totalEmails} (${percentage}%). Sigue practicando para mejorar. 👍`;
        messageType = 'correct';
    } else {
        message = `Obtuviste ${finalScore}/${phishingGameData.totalEmails} (${percentage}%). ¡No te preocupes! La práctica hace al maestro. 💪`;
        messageType = 'incorrect';
    }
    
    emailContainer.innerHTML = `
        <div class="game-complete">
            <h3>🏆 ¡Juego Completado!</h3>
            <p>Has completado el desafío de detección de phishing.</p>
        </div>
    `;
    
    gameControls.style.display = 'none';
    showFeedback(feedbackDisplay, message, messageType);
    
    announceToScreenReader('Juego completado. ' + message);
}

/**
 * Initialize Social Media Quiz
 */
function initializeSocialQuiz() {
    const quizContainer = document.getElementById('social-quiz');
    if (!quizContainer) return;
    
    displaySocialQuestion();
}

function displaySocialQuestion() {
    const questionContainer = document.getElementById('social-question-container');
    const progressFill = document.getElementById('social-progress-fill');
    const questionCounter = document.getElementById('social-question-counter');
    
    if (!questionContainer) return;
    
    const currentQ = socialQuizData.questions[socialQuizData.currentQuestion];
    const progress = ((socialQuizData.currentQuestion + 1) / socialQuizData.questions.length) * 100;
    
    updateProgressBar(progressFill, progress);
    questionCounter.textContent = `Pregunta ${socialQuizData.currentQuestion + 1} de ${socialQuizData.questions.length}`;
    
    questionContainer.innerHTML = `
        <div class="question-text">${currentQ.question}</div>
        <div class="answer-options">
            ${currentQ.options.map((option, index) => `
                <div class="answer-option" data-index="${index}" onclick="selectSocialAnswer(${index})">
                    ${option}
                </div>
            `).join('')}
        </div>
    `;
    
    questionContainer.classList.add('animate-slide-in-up');
    setTimeout(() => {
        questionContainer.classList.remove('animate-slide-in-up');
    }, 600);
}

function selectSocialAnswer(selectedIndex) {
    const currentQ = socialQuizData.questions[socialQuizData.currentQuestion];
    const options = document.querySelectorAll('#social-quiz .answer-option');
    const quizResult = document.getElementById('social-quiz-result');
    
    // Disable further clicks
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Show correct/incorrect
    options.forEach((option, index) => {
        if (index === currentQ.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== currentQ.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Update score
    if (selectedIndex === currentQ.correct) {
        socialQuizData.score++;
        announceToScreenReader('¡Respuesta correcta! ' + currentQ.explanation);
    } else {
        announceToScreenReader('Respuesta incorrecta. ' + currentQ.explanation);
    }
    
    // Show explanation
    if (!quizResult) {
        const resultDiv = document.createElement('div');
        resultDiv.id = 'social-quiz-result';
        resultDiv.className = 'quiz-result';
        document.getElementById('social-quiz').appendChild(resultDiv);
    }
    
    const resultDisplay = document.getElementById('social-quiz-result');
    resultDisplay.textContent = currentQ.explanation;
    resultDisplay.classList.add('animate-fade-in');
    
    socialQuizData.currentQuestion++;
    
    setTimeout(() => {
        if (socialQuizData.currentQuestion < socialQuizData.questions.length) {
            displaySocialQuestion();
            resultDisplay.textContent = '';
            resultDisplay.classList.remove('animate-fade-in');
        } else {
            endSocialQuiz();
        }
    }, 3000);
}

function endSocialQuiz() {
    const questionContainer = document.getElementById('social-question-container');
    const resultDisplay = document.getElementById('social-quiz-result');
    const progressSection = document.querySelector('#social-quiz .quiz-progress');
    
    const finalScore = socialQuizData.score;
    const percentage = calculatePercentage(finalScore, socialQuizData.questions.length);
    
    let message = '';
    if (percentage >= 80) {
        message = `¡Increíble! Obtuviste ${finalScore}/${socialQuizData.questions.length} (${percentage}%). ¡Eres un experto en seguridad de redes sociales! 🌟`;
        createConfetti();
    } else if (percentage >= 60) {
        message = `¡Buen trabajo! Obtuviste ${finalScore}/${socialQuizData.questions.length} (${percentage}%). Continúa aprendiendo sobre seguridad online. 📱`;
    } else {
        message = `Obtuviste ${finalScore}/${socialQuizData.questions.length} (${percentage}%). ¡Sigue practicando! La seguridad online es muy importante. 💪`;
    }
    
    questionContainer.innerHTML = `
        <div class="quiz-complete">
            <h3>📱 ¡Quiz de Redes Sociales Completado!</h3>
            <div class="final-score-display">
                <div class="score-circle">
                    <span class="score-number">${percentage}%</span>
                </div>
            </div>
        </div>
    `;
    
    resultDisplay.textContent = message;
    resultDisplay.classList.add('animate-pulse');
    progressSection.style.display = 'none';
    
    announceToScreenReader('Quiz completado. ' + message);
}

/**
 * Initialize Privacy Settings Simulator
 */
function initializePrivacySimulator() {
    const checkBtn = document.getElementById('check-privacy-settings');
    if (!checkBtn) return;
    
    checkBtn.addEventListener('click', function() {
        checkPrivacySettings();
        addClickAnimation(this);
    });
}

function checkPrivacySettings() {
    const publicProfile = document.getElementById('public-profile').checked;
    const showLocation = document.getElementById('show-location').checked;
    const strangerMessages = document.getElementById('stranger-messages').checked;
    const publicInfo = document.getElementById('public-info').checked;
    const feedbackDisplay = document.getElementById('privacy-feedback');
    
    let unsafeSettings = 0;
    let warnings = [];
    
    if (publicProfile) {
        unsafeSettings++;
        warnings.push('Perfil público permite que extraños vean tu información');
    }
    
    if (showLocation) {
        unsafeSettings++;
        warnings.push('Compartir ubicación puede ser peligroso');
    }
    
    if (strangerMessages) {
        unsafeSettings++;
        warnings.push('Permitir mensajes de extraños es riesgoso');
    }
    
    if (publicInfo) {
        unsafeSettings++;
        warnings.push('Información personal pública es insegura');
    }
    
    let message = '';
    let className = '';
    
    if (unsafeSettings === 0) {
        message = '🛡️ ¡Excelente! Tus configuraciones de privacidad son muy seguras. ¡Manténlas así!';
        className = 'privacy-good';
        createConfetti();
        announceToScreenReader('¡Excelente! Configuración de privacidad muy segura.');
    } else if (unsafeSettings <= 2) {
        message = `⚠️ Configuración parcialmente segura. Te recomendamos desactivar: ${warnings.join(', ')}.`;
        className = 'privacy-warning';
        announceToScreenReader('Configuración parcialmente segura. Revisa las recomendaciones.');
    } else {
        message = `🚨 Configuración insegura. Riesgos detectados: ${warnings.join(', ')}. ¡Ajusta estos settings para protegerte!`;
        className = 'privacy-danger';
        announceToScreenReader('Configuración insegura detectada. Es importante hacer ajustes.');
    }
    
    feedbackDisplay.textContent = message;
    feedbackDisplay.className = `privacy-feedback ${className}`;
    feedbackDisplay.classList.add('animate-slide-in-up');
    
    setTimeout(() => {
        feedbackDisplay.classList.remove('animate-slide-in-up');
    }, 600);
}

/**
 * Initialize Security Checklist
 */
function initializeSecurityChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const scoreDisplay = document.getElementById('security-score');
    const feedbackDisplay = document.getElementById('security-feedback');
    
    if (!checkboxes.length) return;
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSecurityScore);
    });
    
    function updateSecurityScore() {
        const checkedCount = document.querySelectorAll('.checklist-checkbox:checked').length;
        const totalCount = checkboxes.length;
        const percentage = calculatePercentage(checkedCount, totalCount);
        
        if (scoreDisplay) {
            scoreDisplay.textContent = formatScore(checkedCount, totalCount);
            scoreDisplay.classList.add('score-update');
            setTimeout(() => {
                scoreDisplay.classList.remove('score-update');
            }, 500);
        }
        
        if (feedbackDisplay) {
            let message = '';
            let className = '';
            
            if (percentage === 100) {
                message = '🔒 ¡Perfecto! Tu dispositivo está súper seguro. ¡Excelente trabajo!';
                className = 'security-feedback privacy-good';
                if (checkedCount === totalCount) {
                    setTimeout(createConfetti, 300);
                }
            } else if (percentage >= 80) {
                message = '✅ ¡Muy bien! Tu dispositivo está bastante seguro. Solo faltan algunos detalles.';
                className = 'security-feedback privacy-good';
            } else if (percentage >= 60) {
                message = '⚠️ Tu dispositivo tiene seguridad básica. Te recomendamos completar más elementos.';
                className = 'security-feedback privacy-warning';
            } else {
                message = '🚨 Tu dispositivo necesita más seguridad. ¡Es importante implementar estas medidas!';
                className = 'security-feedback privacy-danger';
            }
            
            feedbackDisplay.textContent = message;
            feedbackDisplay.className = className;
            feedbackDisplay.classList.add('animate-fade-in');
            
            setTimeout(() => {
                feedbackDisplay.classList.remove('animate-fade-in');
            }, 600);
        }
    }
    
    // Initial score calculation
    updateSecurityScore();
}

/**
 * Initialize Final Quiz
 */
function initializeFinalQuiz() {
    const startBtn = document.getElementById('start-final-quiz');
    if (!startBtn) return;
    
    startBtn.addEventListener('click', function() {
        startFinalQuiz();
        addClickAnimation(this);
    });
}

function startFinalQuiz() {
    const startSection = document.getElementById('quiz-start');
    const contentSection = document.getElementById('quiz-content');
    
    if (startSection && contentSection) {
        startSection.style.display = 'none';
        contentSection.style.display = 'block';
        
        // Reset quiz data
        finalQuizData.currentQuestion = 0;
        finalQuizData.score = 0;
        finalQuizData.questions = shuffleArray(finalQuizData.questions);
        
        displayFinalQuestion();
        announceToScreenReader('Quiz final iniciado. Primera pregunta mostrada.');
    }
}

function displayFinalQuestion() {
    const questionContainer = document.getElementById('final-question-container');
    const progressFill = document.getElementById('final-progress-fill');
    const questionCounter = document.getElementById('final-question-counter');
    
    if (!questionContainer) return;
    
    const currentQ = finalQuizData.questions[finalQuizData.currentQuestion];
    const progress = ((finalQuizData.currentQuestion + 1) / finalQuizData.questions.length) * 100;
    
    updateProgressBar(progressFill, progress);
    questionCounter.textContent = `Pregunta ${finalQuizData.currentQuestion + 1} de ${finalQuizData.questions.length}`;
    
    questionContainer.innerHTML = `
        <div class="question-text">${currentQ.question}</div>
        <div class="answer-options">
            ${currentQ.options.map((option, index) => `
                <div class="answer-option" data-index="${index}" onclick="selectFinalAnswer(${index})">
                    ${option}
                </div>
            `).join('')}
        </div>
        <div class="question-explanation" id="final-explanation" style="display: none;"></div>
    `;
    
    questionContainer.classList.add('animate-slide-in-up');
    setTimeout(() => {
        questionContainer.classList.remove('animate-slide-in-up');
    }, 600);
}

function selectFinalAnswer(selectedIndex) {
    const currentQ = finalQuizData.questions[finalQuizData.currentQuestion];
    const options = document.querySelectorAll('#final-question-container .answer-option');
    const explanationDiv = document.getElementById('final-explanation');
    
    // Disable further clicks
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Show correct/incorrect
    options.forEach((option, index) => {
        if (index === currentQ.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== currentQ.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Update score
    if (selectedIndex === currentQ.correct) {
        finalQuizData.score++;
        announceToScreenReader('¡Respuesta correcta! ' + currentQ.explanation);
    } else {
        announceToScreenReader('Respuesta incorrecta. ' + currentQ.explanation);
    }
    
    // Show explanation
    explanationDiv.textContent = currentQ.explanation;
    explanationDiv.style.display = 'block';
    explanationDiv.classList.add('animate-fade-in');
    
    finalQuizData.currentQuestion++;
    
    setTimeout(() => {
        if (finalQuizData.currentQuestion < finalQuizData.questions.length) {
            displayFinalQuestion();
        } else {
            endFinalQuiz();
        }
    }, 3500);
}

function endFinalQuiz() {
    const contentSection = document.getElementById('quiz-content');
    const resultsSection = document.getElementById('quiz-results');
    
    const finalScore = finalQuizData.score;
    const totalQuestions = finalQuizData.questions.length;
    const percentage = calculatePercentage(finalScore, totalQuestions);
    
    let title = '';
    let message = '';
    let badge = '';
    
    if (percentage >= 90) {
        title = '🏆 ¡CIBERHÉROE MAESTRO!';
        message = `¡Increíble! Obtuviste ${finalScore}/${totalQuestions} (${percentage}%). Eres un verdadero experto en ciberseguridad. ¡Felicitaciones, CiberHéroe!`;
        badge = '🛡️👑';
        createConfetti();
    } else if (percentage >= 80) {
        title = '🌟 ¡CIBERHÉROE AVANZADO!';
        message = `¡Excelente! Obtuviste ${finalScore}/${totalQuestions} (${percentage}%). Tienes un gran conocimiento en ciberseguridad. ¡Sigue así!`;
        badge = '🛡️⭐';
        createConfetti();
    } else if (percentage >= 70) {
        title = '✅ ¡CIBERHÉROE EN ENTRENAMIENTO!';
        message = `¡Bien hecho! Obtuviste ${finalScore}/${totalQuestions} (${percentage}%). Estás en el camino correcto para ser un experto en ciberseguridad.`;
        badge = '🛡️📚';
    } else if (percentage >= 50) {
        title = '📖 ¡APRENDIZ DE CIBERHÉROE!';
        message = `Obtuviste ${finalScore}/${totalQuestions} (${percentage}%). ¡No te desanimes! Sigue estudiando y practicando. ¡Puedes mejorar!`;
        badge = '🛡️🌱';
    } else {
        title = '💪 ¡FUTURO CIBERHÉROE!';
        message = `Obtuviste ${finalScore}/${totalQuestions} (${percentage}%). ¡Todos empezamos aprendiendo! Te recomendamos repasar los temas y volver a intentarlo.`;
        badge = '🛡️💪';
    }
    
    if (contentSection && resultsSection) {
        contentSection.style.display = 'none';
        resultsSection.style.display = 'block';
        
        resultsSection.innerHTML = `
            <div class="quiz-complete-final">
                <div class="badge-container">
                    <div class="badge animate-bounce">${badge}</div>
                </div>
                <h2>${title}</h2>
                <div class="final-score-display">
                    <div class="score-circle animate-pulse">
                        <span class="score-number">${percentage}%</span>
                        <span class="score-label">Puntuación Final</span>
                    </div>
                </div>
                <p class="final-message">${message}</p>
                <div class="final-actions">
                    <button class="cta-button primary" onclick="restartFinalQuiz()">
                        🔄 Tomar Quiz Nuevamente
                    </button>
                    <button class="cta-button secondary" onclick="scrollToSection('inicio')">
                        🏠 Volver al Inicio
                    </button>
                </div>
            </div>
        `;
        
        announceToScreenReader('Quiz final completado. ' + message);
    }
}

function restartFinalQuiz() {
    const startSection = document.getElementById('quiz-start');
    const contentSection = document.getElementById('quiz-content');
    const resultsSection = document.getElementById('quiz-results');
    
    if (startSection && contentSection && resultsSection) {
        resultsSection.style.display = 'none';
        startSection.style.display = 'block';
        
        // Reset quiz data
        finalQuizData.currentQuestion = 0;
        finalQuizData.score = 0;
        
        announceToScreenReader('Quiz reiniciado. Puedes comenzar de nuevo.');
    }
}

// Export functions to global scope
window.selectSocialAnswer = selectSocialAnswer;
window.selectFinalAnswer = selectFinalAnswer;
window.restartFinalQuiz = restartFinalQuiz;