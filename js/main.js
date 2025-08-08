/**
 * Main JavaScript file for CiberNiños application
 * Handles core functionality, animations, and user interactions
 */

// Global app state
const App = {
    isLoaded: false,
    currentSection: 'inicio',
    animations: {
        observers: new Map(),
        animatedElements: new Set()
    },
    accessibility: {
        reducedMotion: false,
        highContrast: false
    }
};

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Main initialization function
 */
function initializeApp() {
    console.log('🚀 Initializing CiberNiños Application...');
    
    // Check for accessibility preferences
    checkAccessibilityPreferences();
    
    // Initialize core features
    initializeScrollAnimations();
    initializePasswordTester();
    initializePhishingGame();
    initializeSocialQuiz();
    initializePrivacySimulator();
    initializeSecurityChecklist();
    initializeParticles();
    initializeBackToTop();
    initializeSmoothScrolling();
    
    // Mark app as loaded
    App.isLoaded = true;
    
    // Add loaded class for CSS animations
    document.body.classList.add('app-loaded');
    
    console.log('✅ CiberNiños Application initialized successfully!');
}

/**
 * Check for accessibility preferences
 */
function checkAccessibilityPreferences() {
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    App.accessibility.reducedMotion = reducedMotion.matches;
    
    // Check for high contrast preference
    const highContrast = window.matchMedia('(prefers-contrast: high)');
    App.accessibility.highContrast = highContrast.matches;
    
    // Listen for changes
    reducedMotion.addEventListener('change', (e) => {
        App.accessibility.reducedMotion = e.matches;
        if (e.matches) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    });
}

/**
 * Initialize scroll-triggered animations
 */
function initializeScrollAnimations() {
    if (!('IntersectionObserver' in window) || App.accessibility.reducedMotion) {
        return;
    }

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !App.animations.animatedElements.has(entry.target)) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fade-in-up';
                const delay = element.dataset.animationDelay || '0';
                
                setTimeout(() => {
                    element.classList.add('animate', `animate-${animationType}`);
                    App.animations.animatedElements.add(element);
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with animation data attributes
    const elementsToAnimate = document.querySelectorAll('[data-animation]');
    elementsToAnimate.forEach(element => {
        animationObserver.observe(element);
    });

    // Observe content cards
    const contentCards = document.querySelectorAll('.content-card, .game-card, .rule-card, .tip-card');
    contentCards.forEach((card, index) => {
        card.dataset.animation = 'fade-in-up';
        card.dataset.animationDelay = (index * 100).toString();
        animationObserver.observe(card);
    });

    App.animations.observers.set('scroll', animationObserver);
}

/**
 * Initialize password strength tester
 */
function initializePasswordTester() {
    const passwordInput = document.getElementById('passwordInput');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const feedback = document.getElementById('passwordFeedback');

    if (!passwordInput) return;

    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        updatePasswordStrengthUI(strength, strengthBar, strengthText, feedback);
    });
}

/**
 * Calculate password strength
 */
function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];

    if (password.length === 0) {
        return { score: 0, level: 'none', feedback: [] };
    }

    // Length check
    if (password.length >= 8) {
        score += 20;
    } else {
        feedback.push('Debe tener al menos 8 caracteres');
    }

    if (password.length >= 12) {
        score += 10;
    }

    // Uppercase letters
    if (/[A-Z]/.test(password)) {
        score += 20;
    } else {
        feedback.push('Incluye letras mayúsculas');
    }

    // Lowercase letters
    if (/[a-z]/.test(password)) {
        score += 20;
    } else {
        feedback.push('Incluye letras minúsculas');
    }

    // Numbers
    if (/\d/.test(password)) {
        score += 15;
    } else {
        feedback.push('Incluye números');
    }

    // Special characters
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
        score += 15;
    } else {
        feedback.push('Incluye símbolos especiales (!@#$)');
    }

    // Common patterns penalty
    if (/(.)\1{2,}/.test(password)) {
        score -= 10;
        feedback.push('Evita repetir el mismo carácter');
    }

    if (/123|abc|qwe/i.test(password)) {
        score -= 15;
        feedback.push('Evita secuencias obvias');
    }

    // Determine level
    let level;
    if (score < 30) level = 'weak';
    else if (score < 60) level = 'medium';
    else if (score < 80) level = 'strong';
    else level = 'excellent';

    return { score, level, feedback };
}

/**
 * Update password strength UI
 */
function updatePasswordStrengthUI(strength, strengthBar, strengthText, feedbackElement) {
    const colors = {
        none: '#e2e8f0',
        weak: '#ef4444',
        medium: '#f59e0b',
        strong: '#10b981',
        excellent: '#3b82f6'
    };

    const texts = {
        none: 'Escribe una contraseña',
        weak: '🔴 Débil',
        medium: '🟡 Media',
        strong: '🟢 Fuerte',
        excellent: '🔵 ¡Excelente!'
    };

    // Update strength bar
    strengthBar.style.setProperty('--strength-width', `${Math.max(strength.score, 5)}%`);
    strengthBar.style.setProperty('--strength-color', colors[strength.level]);

    // Update strength text
    strengthText.textContent = texts[strength.level];
    strengthText.style.color = colors[strength.level];

    // Update feedback
    if (strength.feedback.length > 0) {
        feedbackElement.innerHTML = `
            <div class="feedback-title">💡 Para mejorar tu contraseña:</div>
            <ul>
                ${strength.feedback.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        `;
    } else if (strength.level === 'excellent') {
        feedbackElement.innerHTML = `
            <div class="feedback-success">🎉 ¡Fantástica contraseña! Está muy segura.</div>
        `;
    } else {
        feedbackElement.innerHTML = '';
    }
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const toggleButton = document.querySelector('.toggle-password i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleButton.className = 'fas fa-eye';
    }
}

/**
 * Initialize phishing detection game
 */
function initializePhishingGame() {
    const gameContainer = document.getElementById('phishingGame');
    if (!gameContainer) return;

    const phishingExamples = [
        {
            subject: "¡URGENTE! Verifica tu cuenta de PayPal",
            from: "security@paypaI.com",
            content: "Tu cuenta será suspendida en 24 horas. Haz clic aquí para verificar: http://paypal-verify.suspicious.com",
            isPhishing: true,
            explanation: "Este es phishing porque: 1) Usa urgencia para presionarte, 2) La dirección tiene una 'I' mayúscula en lugar de 'l' minúscula, 3) El enlace no va al dominio real de PayPal."
        },
        {
            subject: "Resumen de tu pedido - Amazon",
            from: "pedidos@amazon.com",
            content: "Gracias por tu compra. Tu pedido #AMZ123456 será entregado mañana. Puedes rastrearlo en tu cuenta.",
            isPhishing: false,
            explanation: "Este email parece legítimo porque: 1) No pide información personal, 2) La dirección es del dominio correcto, 3) No usa lenguaje urgente o amenazante."
        },
        {
            subject: "¡Felicidades! Ganaste $1,000,000!",
            from: "lottery@winner-international.com",
            content: "¡Has ganado la lotería internacional! Para reclamar tu premio, envía tus datos bancarios y una tarifa de procesamiento de $500.",
            isPhishing: true,
            explanation: "Este es phishing porque: 1) Promete dinero sin haber participado en una lotería, 2) Pide información bancaria, 3) Solicita dinero por adelantado."
        },
        {
            subject: "Confirmación de cita médica",
            from: "citas@clinicasalud.com",
            content: "Tu cita con Dr. González está confirmada para mañana a las 10:00 AM. Si necesitas cambiarla, llama al (555) 123-4567.",
            isPhishing: false,
            explanation: "Este email es legítimo porque: 1) Proporciona información específica, 2) Ofrece un número de teléfono real para contacto, 3) No solicita información personal."
        },
        {
            subject: "Tu cuenta de banco fue comprometida",
            from: "seguridad@mi-banco.net",
            content: "Detectamos actividad sospechosa. URGENTE: Ingresa aquí tu usuario y contraseña para verificar: www.banco-seguro-falso.com",
            isPhishing: true,
            explanation: "Este es phishing porque: 1) Crea pánico sobre seguridad, 2) Pide credenciales directamente, 3) El enlace no va al dominio oficial del banco."
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function loadQuestion() {
        if (currentQuestion >= phishingExamples.length) {
            showGameResults();
            return;
        }

        const example = phishingExamples[currentQuestion];
        const emailContainer = document.getElementById('emailExample');
        const questionNumber = document.getElementById('questionNumber');
        const feedbackDiv = document.getElementById('phishingFeedback');

        questionNumber.textContent = currentQuestion + 1;
        feedbackDiv.innerHTML = '';

        emailContainer.innerHTML = `
            <div class="email-mockup">
                <div class="email-header">
                    <div class="email-field"><strong>De:</strong> ${example.from}</div>
                    <div class="email-field"><strong>Asunto:</strong> ${example.subject}</div>
                </div>
                <div class="email-body">
                    ${example.content}
                </div>
            </div>
        `;
    }

    function showGameResults() {
        const percentage = Math.round((score / phishingExamples.length) * 100);
        const emailContainer = document.getElementById('emailExample');
        const buttonsContainer = document.querySelector('.game-buttons');
        const feedbackDiv = document.getElementById('phishingFeedback');

        let resultMessage = '';
        let resultClass = '';

        if (percentage >= 80) {
            resultMessage = '🎉 ¡Excelente! Eres un experto detectando phishing.';
            resultClass = 'success';
        } else if (percentage >= 60) {
            resultMessage = '👍 Bien hecho. Con un poco más de práctica serás experto.';
            resultClass = 'good';
        } else {
            resultMessage = '📚 Sigue practicando. Recuerda las señales de alerta.';
            resultClass = 'needs-practice';
        }

        emailContainer.innerHTML = `
            <div class="game-results ${resultClass}">
                <h4>¡Juego Completado!</h4>
                <div class="score-display">
                    <div class="score-number">${score}/${phishingExamples.length}</div>
                    <div class="score-percentage">${percentage}%</div>
                </div>
                <p>${resultMessage}</p>
            </div>
        `;

        buttonsContainer.innerHTML = `
            <button class="btn btn-primary" onclick="restartPhishingGame()">
                <i class="fas fa-redo"></i> Jugar de Nuevo
            </button>
        `;
    }

    // Make functions globally available
    window.checkPhishing = function(userAnswer) {
        const example = phishingExamples[currentQuestion];
        const isCorrect = userAnswer !== example.isPhishing; // User says "real" (true) but it's phishing (true) = incorrect
        const feedbackDiv = document.getElementById('phishingFeedback');

        if (isCorrect) {
            score++;
            feedbackDiv.innerHTML = `
                <div class="feedback correct">
                    <i class="fas fa-check-circle"></i>
                    <strong>¡Correcto!</strong> ${example.explanation}
                </div>
            `;
        } else {
            feedbackDiv.innerHTML = `
                <div class="feedback incorrect">
                    <i class="fas fa-times-circle"></i>
                    <strong>No es correcto.</strong> ${example.explanation}
                </div>
            `;
        }

        // Update score display
        document.getElementById('phishingScore').textContent = score;

        // Move to next question after delay
        setTimeout(() => {
            currentQuestion++;
            loadQuestion();
        }, 3000);
    };

    window.restartPhishingGame = function() {
        currentQuestion = 0;
        score = 0;
        document.getElementById('phishingScore').textContent = '0';
        
        // Restore original buttons
        const buttonsContainer = document.querySelector('.game-buttons');
        buttonsContainer.innerHTML = `
            <button class="btn btn-success" onclick="checkPhishing(true)">
                <i class="fas fa-check"></i> Es Real
            </button>
            <button class="btn btn-danger" onclick="checkPhishing(false)">
                <i class="fas fa-times"></i> Es Phishing
            </button>
        `;
        
        loadQuestion();
    };

    // Initialize the first question
    loadQuestion();
}

/**
 * Initialize social media quiz
 */
function initializeSocialQuiz() {
    const quizContainer = document.getElementById('socialQuiz');
    if (!quizContainer) return;

    const socialQuestions = [
        {
            question: "Un extraño te envía una solicitud de amistad con una foto atractiva. ¿Qué haces?",
            options: [
                { text: "Acepto inmediatamente", correct: false, explanation: "Nunca aceptes solicitudes de extraños, incluso si su foto es atractiva." },
                { text: "Ignoro la solicitud", correct: true, explanation: "¡Perfecto! Solo acepta solicitudes de personas que realmente conoces." },
                { text: "Le pregunto información personal primero", correct: false, explanation: "Esto podría darte información falsa. Es mejor no interactuar." }
            ]
        },
        {
            question: "Tus amigos publican fotos de una fiesta en tu casa. ¿Qué debes hacer?",
            options: [
                { text: "Nada, está bien así", correct: false, explanation: "Esto puede revelar tu ubicación a extraños." },
                { text: "Pedirles que no etiqueten la ubicación", correct: true, explanation: "¡Excelente! Siempre protege tu ubicación privada." },
                { text: "Compartir más fotos yo mismo", correct: false, explanation: "Esto empeoraría el problema de privacidad de ubicación." }
            ]
        }
    ];

    let currentQuestionIndex = 0;

    function loadSocialQuestion() {
        if (currentQuestionIndex >= socialQuestions.length) {
            showSocialQuizComplete();
            return;
        }

        const question = socialQuestions[currentQuestionIndex];
        const questionDiv = document.getElementById('socialQuestion');
        const optionsDiv = document.getElementById('socialOptions');
        const feedbackDiv = document.getElementById('socialFeedback');

        questionDiv.innerHTML = `<h4>${question.question}</h4>`;
        
        optionsDiv.innerHTML = question.options.map((option, index) => `
            <button class="btn btn-secondary quiz-option" onclick="selectSocialOption(${index})">
                ${option.text}
            </button>
        `).join('');

        feedbackDiv.innerHTML = '';
    }

    function showSocialQuizComplete() {
        const questionDiv = document.getElementById('socialQuestion');
        const optionsDiv = document.getElementById('socialOptions');
        
        questionDiv.innerHTML = '<h4>🎉 ¡Quiz Completado!</h4><p>Has aprendido sobre seguridad en redes sociales.</p>';
        optionsDiv.innerHTML = `
            <button class="btn btn-primary" onclick="restartSocialQuiz()">
                <i class="fas fa-redo"></i> Repetir Quiz
            </button>
        `;
    }

    // Make functions globally available
    window.selectSocialOption = function(optionIndex) {
        const question = socialQuestions[currentQuestionIndex];
        const option = question.options[optionIndex];
        const feedbackDiv = document.getElementById('socialFeedback');
        
        const feedbackClass = option.correct ? 'correct' : 'incorrect';
        const icon = option.correct ? 'check-circle' : 'times-circle';
        
        feedbackDiv.innerHTML = `
            <div class="feedback ${feedbackClass}">
                <i class="fas fa-${icon}"></i>
                ${option.explanation}
            </div>
        `;

        setTimeout(() => {
            currentQuestionIndex++;
            loadSocialQuestion();
        }, 3000);
    };

    window.restartSocialQuiz = function() {
        currentQuestionIndex = 0;
        loadSocialQuestion();
    };

    // Initialize first question
    loadSocialQuestion();
}

/**
 * Initialize privacy simulator
 */
function initializePrivacySimulator() {
    const simulator = document.querySelector('.privacy-simulator');
    if (!simulator) return;

    const settings = {
        publicProfile: document.getElementById('publicProfile'),
        showLocation: document.getElementById('showLocation'),
        allowMessages: document.getElementById('allowMessages'),
        shareData: document.getElementById('shareData')
    };

    const scoreDisplay = document.getElementById('privacyScore');
    const feedbackDisplay = document.getElementById('privacyFeedback');

    function updatePrivacyScore() {
        let score = 100;
        let issues = [];

        // Check each setting
        if (settings.publicProfile?.checked) {
            score -= 25;
            issues.push('Perfil público permite que extraños vean tu información');
        }

        if (settings.showLocation?.checked) {
            score -= 30;
            issues.push('Mostrar ubicación puede ser peligroso');
        }

        if (settings.allowMessages?.checked) {
            score -= 25;
            issues.push('Permitir mensajes de extraños puede ser riesgoso');
        }

        if (settings.shareData?.checked) {
            score -= 20;
            issues.push('Compartir datos con apps reduce tu privacidad');
        }

        // Update score display
        if (scoreDisplay) {
            scoreDisplay.querySelector('.score-number').textContent = score;
            
            // Update circle color based on score
            const circle = scoreDisplay.querySelector('.score-circle');
            if (score >= 80) {
                circle.style.background = 'conic-gradient(var(--success-color) ' + (score * 3.6) + 'deg, var(--border-color) 0deg)';
            } else if (score >= 60) {
                circle.style.background = 'conic-gradient(var(--warning-color) ' + (score * 3.6) + 'deg, var(--border-color) 0deg)';
            } else {
                circle.style.background = 'conic-gradient(var(--danger-color) ' + (score * 3.6) + 'deg, var(--border-color) 0deg)';
            }
        }

        // Update feedback
        if (feedbackDisplay) {
            if (score === 100) {
                feedbackDisplay.innerHTML = '🎉 ¡Perfecto! Tu privacidad está muy bien protegida.';
                feedbackDisplay.className = 'score-feedback success';
            } else if (score >= 75) {
                feedbackDisplay.innerHTML = '👍 Bien hecho. Tu privacidad está bastante protegida.';
                feedbackDisplay.className = 'score-feedback good';
            } else {
                feedbackDisplay.innerHTML = `⚠️ Puedes mejorar tu privacidad:<br>${issues.join('<br>')}`;
                feedbackDisplay.className = 'score-feedback warning';
            }
        }
    }

    // Add event listeners to all settings
    Object.values(settings).forEach(setting => {
        if (setting) {
            setting.addEventListener('change', updatePrivacyScore);
        }
    });

    // Initialize score
    updatePrivacyScore();
}

/**
 * Initialize security checklist
 */
function initializeSecurityChecklist() {
    const checklist = document.querySelector('.security-checklist');
    if (!checklist) return;

    window.updateSecurityScore = function() {
        const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
        let totalScore = 0;
        let maxScore = 0;

        checkboxes.forEach(checkbox => {
            const points = parseInt(checkbox.closest('.checklist-item').dataset.points) || 0;
            maxScore += points;
            if (checkbox.checked) {
                totalScore += points;
            }
        });

        // Update score display
        const currentScoreElement = document.getElementById('currentScore');
        const scoreFillElement = document.getElementById('scoreFill');
        const scoreMessageElement = document.getElementById('scoreMessage');

        if (currentScoreElement) {
            currentScoreElement.textContent = totalScore;
        }

        if (scoreFillElement) {
            const percentage = (totalScore / maxScore) * 100;
            scoreFillElement.style.width = `${percentage}%`;
            
            // Change color based on score
            if (percentage >= 80) {
                scoreFillElement.style.backgroundColor = 'var(--success-color)';
            } else if (percentage >= 60) {
                scoreFillElement.style.backgroundColor = 'var(--warning-color)';
            } else {
                scoreFillElement.style.backgroundColor = 'var(--danger-color)';
            }
        }

        if (scoreMessageElement) {
            if (totalScore === maxScore) {
                scoreMessageElement.textContent = '🎉 ¡Excelente! Tu dispositivo está muy seguro.';
                scoreMessageElement.className = 'score-message success';
            } else if (totalScore >= maxScore * 0.8) {
                scoreMessageElement.textContent = '👍 Buen trabajo. Tu dispositivo está bastante seguro.';
                scoreMessageElement.className = 'score-message good';
            } else if (totalScore >= maxScore * 0.6) {
                scoreMessageElement.textContent = '⚠️ Tu dispositivo necesita mejoras de seguridad.';
                scoreMessageElement.className = 'score-message warning';
            } else {
                scoreMessageElement.textContent = '🚨 Tu dispositivo necesita atención urgente de seguridad.';
                scoreMessageElement.className = 'score-message danger';
            }
        }
    };

    // Initialize score calculation
    window.updateSecurityScore();
}

/**
 * Initialize floating particles
 */
function initializeParticles() {
    if (App.accessibility.reducedMotion) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

    const particles = ['🔒', '🛡️', '🔐', '👁️', '📱'];
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particles[i % particles.length];
        particle.style.cssText = `
            position: absolute;
            font-size: 1.5rem;
            opacity: 0.1;
            animation: particle-float 6s ease-in-out infinite;
            animation-delay: ${i * 1.2}s;
        `;
        
        // Random position
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        
        particleContainer.appendChild(particle);
    }

    document.body.appendChild(particleContainer);
}

/**
 * Initialize back to top functionality
 */
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
}

/**
 * Scroll to top smoothly
 */
function scrollToTop() {
    if (App.accessibility.reducedMotion) {
        window.scrollTo(0, 0);
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - (document.querySelector('.navbar').offsetHeight + 20);
                
                if (App.accessibility.reducedMotion) {
                    window.scrollTo(0, offsetTop);
                } else {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Scroll to a specific section
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - (document.querySelector('.navbar').offsetHeight + 20);
        
        if (App.accessibility.reducedMotion) {
            window.scrollTo(0, offsetTop);
        } else {
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

/**
 * Utility function to debounce events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility function to throttle events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Make key functions globally available
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.togglePasswordVisibility = togglePasswordVisibility;