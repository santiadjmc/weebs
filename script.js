// Global variables and state management
let currentTheme = localStorage.getItem('theme') || 'light';
let currentQuizIndex = 0;
let gameScore = 0;
let phishingGameScore = 0;
let phishingGameIndex = 0;

// Initialize the application when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    setupThemeToggle();
    setupMobileMenu();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupAccessibilityFeatures();
    loadInitialContent();
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
}

/**
 * Theme toggle functionality with smooth animations
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (!themeToggle) return;
    
    // Update toggle appearance based on current theme
    updateThemeToggleAppearance();
    
    themeToggle.addEventListener('click', function() {
        // Add animation class
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Toggle theme
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        
        // Update toggle appearance
        updateThemeToggleAppearance();
        
        // Add visual feedback
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
        
        // Announce theme change for screen readers
        announceToScreenReader(`Tema cambiado a ${currentTheme === 'light' ? 'modo claro' : 'modo oscuro'}`);
    });
    
    // Keyboard support for theme toggle
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            themeToggle.click();
        }
    });
}

/**
 * Update theme toggle button appearance
 */
function updateThemeToggleAppearance() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const sunIcon = themeToggle.querySelector('.theme-toggle-sun');
    const moonIcon = themeToggle.querySelector('.theme-toggle-moon');
    
    if (currentTheme === 'dark') {
        themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
        themeToggle.setAttribute('title', 'Cambiar a modo claro');
        if (sunIcon) sunIcon.style.opacity = '0.5';
        if (moonIcon) moonIcon.style.opacity = '1';
    } else {
        themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
        themeToggle.setAttribute('title', 'Cambiar a modo oscuro');
        if (sunIcon) sunIcon.style.opacity = '1';
        if (moonIcon) moonIcon.style.opacity = '0.5';
    }
}

/**
 * Mobile menu functionality
 */
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = navMenu.classList.contains('active');
        
        if (isOpen) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menú de navegación');
        } else {
            navMenu.classList.add('active');
            mobileMenuBtn.classList.add('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            mobileMenuBtn.setAttribute('aria-label', 'Cerrar menú de navegación');
        }
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menú de navegación');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without triggering scroll
                history.pushState(null, null, targetId);
                
                // Focus on the target section for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                targetElement.removeAttribute('tabindex');
            }
        });
    });
}

/**
 * Scroll to specific section (used by buttons)
 */
function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Add visual feedback
        targetElement.style.animation = 'highlightSection 2s ease-in-out';
        setTimeout(() => {
            targetElement.style.animation = '';
        }, 2000);
    }
}

/**
 * Setup scroll animations and effects
 */
function setupScrollAnimations() {
    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all content cards and sections
    const elementsToAnimate = document.querySelectorAll('.content-card, .game-card, .interactive-tool');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = currentTheme === 'dark' ? 
                'rgba(17, 24, 39, 0.98)' : 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = currentTheme === 'dark' ? 
                'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '';
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Accessibility features setup
 */
function setupAccessibilityFeatures() {
    // Skip to main content functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
                mainContent.removeAttribute('tabindex');
            }
        });
    }
    
    // Enhanced keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .game-card, .content-card');
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.onclick) {
                    e.preventDefault();
                    this.click();
                }
            }
        });
    });
    
    // Focus management for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeGame();
            closeAllInteractiveTools();
        }
    });
}

/**
 * Load initial content and setup interactive elements
 */
function loadInitialContent() {
    setupPasswordGenerator();
    setupPhishingGame();
    setupSocialMediaQuiz();
    setupPrivacySimulator();
    setupSecurityChecklist();
}

/**
 * Password generator functionality
 */
function setupPasswordGenerator() {
    // Password generator is set up through HTML onclick handlers
    // This function can be expanded for more complex password generation logic
}

/**
 * Show password generator tool
 */
function showPasswordGenerator() {
    const generator = document.getElementById('passwordGenerator');
    if (generator) {
        generator.style.display = 'block';
        generator.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Focus on input field
        const input = generator.querySelector('#phraseInput');
        if (input) {
            setTimeout(() => input.focus(), 500);
        }
        
        announceToScreenReader('Generador de contraseñas activado');
    }
}

/**
 * Generate password from user phrase
 */
function generatePassword() {
    const phraseInput = document.getElementById('phraseInput');
    const passwordResult = document.getElementById('generatedPassword');
    
    if (!phraseInput || !passwordResult) return;
    
    const phrase = phraseInput.value.trim();
    if (phrase.length < 5) {
        passwordResult.innerHTML = '<span style="color: var(--danger-color);">⚠️ La frase debe tener al menos 5 caracteres</span>';
        return;
    }
    
    // Generate password from phrase
    let password = '';
    const words = phrase.split(' ');
    
    words.forEach(word => {
        if (word.length > 0) {
            password += word.charAt(0);
        }
    });
    
    // Add numbers and special characters
    const numbers = Math.floor(Math.random() * 100);
    const specialChars = ['!', '@', '#', '$', '%', '&', '*'];
    const randomSpecial = specialChars[Math.floor(Math.random() * specialChars.length)];
    
    password += numbers + randomSpecial;
    
    // Mix case
    password = password.split('').map((char, index) => {
        if (index % 2 === 0 && char.match(/[a-zA-Z]/)) {
            return char.toUpperCase();
        }
        return char.toLowerCase();
    }).join('');
    
    // Display result with animation
    passwordResult.style.opacity = '0';
    setTimeout(() => {
        passwordResult.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <span>🔐 ${password}</span>
                <button onclick="copyToClipboard('${password}')" class="btn btn-sm" title="Copiar contraseña">
                    📋 Copiar
                </button>
            </div>
            <div style="margin-top: 10px; font-size: 14px; color: var(--text-secondary);">
                Fortaleza: <span style="color: var(--success-color); font-weight: bold;">🔥 Muy Fuerte</span>
            </div>
        `;
        passwordResult.style.opacity = '1';
        
        announceToScreenReader(`Contraseña generada: ${password}`);
    }, 200);
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('¡Contraseña copiada al portapapeles!', 'success');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('¡Contraseña copiada al portapapeles!', 'success');
        } catch (err) {
            showNotification('No se pudo copiar la contraseña', 'error');
        }
        document.body.removeChild(textArea);
    }
}

/**
 * Setup social media quiz
 */
function setupSocialMediaQuiz() {
    // Social media quiz is set up through HTML onclick handlers
    // This function can be expanded for more complex quiz logic
}

/**
 * Setup phishing detection game
 */
function setupPhishingGame() {
    // Phishing email examples
    window.phishingEmails = [
        {
            safe: true,
            content: `
                <div style="font-family: Arial, sans-serif;">
                    <h4>📧 Confirmación de Pedido - Amazon</h4>
                    <p><strong>De:</strong> pedidos@amazon.com</p>
                    <p><strong>Para:</strong> tu-email@gmail.com</p>
                    <hr>
                    <p>Hola,</p>
                    <p>Tu pedido #12345 ha sido confirmado y será enviado pronto.</p>
                    <p>Puedes revisar los detalles en tu cuenta.</p>
                    <p>Gracias por tu compra.</p>
                    <p>Equipo Amazon</p>
                </div>
            `,
            explanation: '✅ Este email es SEGURO porque viene de un dominio oficial, no pide información personal y tiene un tono profesional normal.'
        },
        {
            safe: false,
            content: `
                <div style="font-family: Arial, sans-serif;">
                    <h4>🚨 ¡URGENTE! Tu cuenta será suspendida</h4>
                    <p><strong>De:</strong> seguridad@gmai1.com</p>
                    <p><strong>Para:</strong> tu-email@gmail.com</p>
                    <hr>
                    <p>¡ATENCIÓN!</p>
                    <p>Tu cuenta de Google será SUSPENDIDA en 24 horas si no actúas ahora.</p>
                    <p><strong>Haz clic aquí INMEDIATAMENTE:</strong> <a href="#" style="color: red;">http://bit.ly/cuenta-google</a></p>
                    <p>Proporciona tu contraseña para verificar tu identidad.</p>
                    <p>Google Security Team</p>
                </div>
            `,
            explanation: '❌ Este email es PELIGROSO porque: usa urgencia extrema, el dominio es falso (gmai1.com), usa enlaces cortos sospechosos y pide contraseñas.'
        },
        {
            safe: true,
            content: `
                <div style="font-family: Arial, sans-serif;">
                    <h4>🎂 ¡Feliz Cumpleaños!</h4>
                    <p><strong>De:</strong> maria.garcia@gmail.com</p>
                    <p><strong>Para:</strong> tu-email@gmail.com</p>
                    <hr>
                    <p>¡Hola!</p>
                    <p>¡Espero que tengas un día fantástico en tu cumpleaños!</p>
                    <p>Te mando un abrazo enorme.</p>
                    <p>Con cariño,</p>
                    <p>María</p>
                </div>
            `,
            explanation: '✅ Este email es SEGURO porque es un mensaje personal normal de alguien conocido, sin enlaces sospechosos ni solicitudes de información.'
        },
        {
            safe: false,
            content: `
                <div style="font-family: Arial, sans-serif;">
                    <h4>💰 ¡Ganaste $1,000,000!</h4>
                    <p><strong>De:</strong> loteria.oficial@yahoo.com</p>
                    <p><strong>Para:</strong> tu-email@gmail.com</p>
                    <hr>
                    <p>¡FELICIDADES!</p>
                    <p>Has sido seleccionado para recibir $1,000,000 en nuestra lotería internacional.</p>
                    <p>Para reclamar tu premio, envía tu información bancaria completa.</p>
                    <p>¡Solo tienes 48 horas!</p>
                    <p>Lotería Internacional</p>
                </div>
            `,
            explanation: '❌ Este email es PELIGROSO porque: promete dinero fácil, pide información bancaria, usa presión de tiempo y es de una fuente no confiable.'
        }
    ];
}

/**
 * Start phishing detection game
 */
function startPhishingGame() {
    const gameContainer = document.getElementById('phishingGame');
    if (!gameContainer) return;
    
    gameContainer.style.display = 'block';
    gameContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    phishingGameIndex = 0;
    phishingGameScore = 0;
    
    loadPhishingEmail();
    updateGameScore();
    
    announceToScreenReader('Juego de detección de phishing iniciado');
}

/**
 * Load next phishing email
 */
function loadPhishingEmail() {
    const emailSample = document.getElementById('emailSample');
    const gameFeedback = document.getElementById('gameFeedback');
    
    if (!emailSample || phishingGameIndex >= window.phishingEmails.length) {
        endPhishingGame();
        return;
    }
    
    const currentEmail = window.phishingEmails[phishingGameIndex];
    emailSample.innerHTML = currentEmail.content;
    gameFeedback.innerHTML = '';
    gameFeedback.className = 'game-feedback';
}

/**
 * Check phishing email answer
 */
function checkEmail(userAnswerSafe) {
    const currentEmail = window.phishingEmails[phishingGameIndex];
    const gameFeedback = document.getElementById('gameFeedback');
    
    if (!gameFeedback) return;
    
    const isCorrect = userAnswerSafe === currentEmail.safe;
    
    if (isCorrect) {
        phishingGameScore++;
        gameFeedback.innerHTML = `
            <div class="feedback-content">
                <strong>¡Correcto! 🎉</strong><br>
                ${currentEmail.explanation}
            </div>
        `;
        gameFeedback.className = 'game-feedback correct';
    } else {
        gameFeedback.innerHTML = `
            <div class="feedback-content">
                <strong>Incorrecto 😔</strong><br>
                ${currentEmail.explanation}
            </div>
        `;
        gameFeedback.className = 'game-feedback incorrect';
    }
    
    updateGameScore();
    
    // Auto-advance to next email after 3 seconds
    setTimeout(() => {
        phishingGameIndex++;
        loadPhishingEmail();
    }, 3000);
}

/**
 * End phishing game and show results
 */
function endPhishingGame() {
    const gameContainer = document.getElementById('phishingGame');
    const emailSample = document.getElementById('emailSample');
    
    if (!gameContainer || !emailSample) return;
    
    const percentage = Math.round((phishingGameScore / window.phishingEmails.length) * 100);
    let message = '';
    let emoji = '';
    
    if (percentage >= 80) {
        message = '¡Excelente! Eres un verdadero detective anti-phishing.';
        emoji = '🕵️‍♀️';
    } else if (percentage >= 60) {
        message = '¡Bien hecho! Tienes buenas habilidades de detección.';
        emoji = '👍';
    } else {
        message = 'Sigue practicando. ¡Puedes mejorar!';
        emoji = '💪';
    }
    
    emailSample.innerHTML = `
        <div class="game-results">
            <h3>${emoji} Juego Completado</h3>
            <div class="score-display">
                <div class="score-circle">
                    <span class="score-number">${percentage}%</span>
                    <span class="score-label">Precisión</span>
                </div>
            </div>
            <p><strong>Puntuación:</strong> ${phishingGameScore} de ${window.phishingEmails.length}</p>
            <p>${message}</p>
            <button class="btn btn-primary" onclick="startPhishingGame()">
                🔄 Jugar de Nuevo
            </button>
        </div>
    `;
    
    announceToScreenReader(`Juego completado. Puntuación: ${percentage} por ciento`);
}

/**
 * Update game score display
 */
function updateGameScore() {
    const scoreElement = document.getElementById('gameScore');
    if (scoreElement) {
        scoreElement.textContent = phishingGameScore;
    }
}

/**
 * Setup social media quiz
 */
function startSocialMediaQuiz() {
    const quizContainer = document.getElementById('socialMediaQuiz');
    if (!quizContainer) return;
    
    quizContainer.style.display = 'block';
    quizContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    const questions = [
        {
            question: '¿Deberías compartir una foto de tu nueva tarjeta de identificación escolar?',
            options: ['Sí, es solo una foto', 'No, contiene información personal'],
            correct: 1,
            explanation: 'Las tarjetas de identificación contienen información personal que podría ser mal utilizada.'
        },
        {
            question: '¿Es seguro aceptar solicitudes de amistad de personas que no conoces?',
            options: ['Sí, así conozco más gente', 'No, podrían ser personas peligrosas'],
            correct: 1,
            explanation: 'Los extraños en línea pueden no ser quienes dicen ser. Es mejor solo aceptar amigos conocidos.'
        },
        {
            question: '¿Deberías compartir que te vas de vacaciones por una semana?',
            options: ['Sí, mis amigos quieren saberlo', 'No, indica que mi casa estará vacía'],
            correct: 1,
            explanation: 'Compartir planes de viaje puede indicar a los delincuentes que tu casa estará vacía.'
        }
    ];
    
    let currentQuestion = 0;
    let quizScore = 0;
    
    function loadQuestion() {
        if (currentQuestion >= questions.length) {
            showQuizResults();
            return;
        }
        
        const q = questions[currentQuestion];
        quizContainer.innerHTML = `
            <div class="quiz-question">
                <h4>Pregunta ${currentQuestion + 1} de ${questions.length}</h4>
                <p class="question-text">${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((option, index) => `
                        <button class="btn quiz-option" onclick="selectQuizAnswer(${index})">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <div id="quizFeedback" class="quiz-feedback"></div>
            </div>
        `;
    }
    
    window.selectQuizAnswer = function(selectedIndex) {
        const q = questions[currentQuestion];
        const isCorrect = selectedIndex === q.correct;
        const feedback = document.getElementById('quizFeedback');
        
        if (isCorrect) {
            quizScore++;
            feedback.innerHTML = `<div class="correct">✅ ¡Correcto! ${q.explanation}</div>`;
        } else {
            feedback.innerHTML = `<div class="incorrect">❌ Incorrecto. ${q.explanation}</div>`;
        }
        
        // Disable buttons
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(btn => btn.disabled = true);
        
        setTimeout(() => {
            currentQuestion++;
            loadQuestion();
        }, 3000);
    };
    
    function showQuizResults() {
        const percentage = Math.round((quizScore / questions.length) * 100);
        let message = '';
        
        if (percentage >= 80) {
            message = '¡Excelente! Sabes cómo usar las redes sociales de forma segura.';
        } else if (percentage >= 60) {
            message = '¡Bien! Tienes una buena base, sigue aprendiendo.';
        } else {
            message = 'Necesitas practicar más sobre seguridad en redes sociales.';
        }
        
        quizContainer.innerHTML = `
            <div class="quiz-results">
                <h3>🎉 Quiz Completado</h3>
                <div class="score-display">
                    <div class="score-circle">
                        <span class="score-number">${percentage}%</span>
                    </div>
                </div>
                <p><strong>Puntuación:</strong> ${quizScore} de ${questions.length}</p>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="startSocialMediaQuiz()">
                    🔄 Repetir Quiz
                </button>
            </div>
        `;
    }
    
    loadQuestion();
}

/**
 * Open privacy simulator
 */
function openPrivacySimulator() {
    const simulator = document.getElementById('privacySimulator');
    if (!simulator) return;
    
    simulator.style.display = 'block';
    simulator.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    simulator.innerHTML = `
        <div class="privacy-sim-content">
            <h4>📱 Configuración de Privacidad - Simulador</h4>
            <p>Practica configurando la privacidad de una cuenta de redes sociales ficticia:</p>
            
            <div class="sim-setting">
                <label class="sim-label">
                    <span>¿Quién puede ver tu perfil?</span>
                    <select class="sim-select" onchange="checkPrivacySetting(this, 'friends')">
                        <option value="">Selecciona...</option>
                        <option value="everyone">Todos</option>
                        <option value="friends">Solo amigos</option>
                        <option value="me">Solo yo</option>
                    </select>
                </label>
                <div class="sim-feedback" id="profile-feedback"></div>
            </div>
            
            <div class="sim-setting">
                <label class="sim-label">
                    <span>¿Quién puede enviarte mensajes?</span>
                    <select class="sim-select" onchange="checkPrivacySetting(this, 'friends')">
                        <option value="">Selecciona...</option>
                        <option value="everyone">Todos</option>
                        <option value="friends">Solo amigos</option>
                        <option value="nobody">Nadie</option>
                    </select>
                </label>
                <div class="sim-feedback" id="messages-feedback"></div>
            </div>
            
            <div class="sim-setting">
                <label class="sim-label">
                    <span>¿Mostrar tu ubicación en las publicaciones?</span>
                    <select class="sim-select" onchange="checkPrivacySetting(this, 'off')">
                        <option value="">Selecciona...</option>
                        <option value="on">Sí, siempre</option>
                        <option value="friends">Solo a amigos</option>
                        <option value="off">No, nunca</option>
                    </select>
                </label>
                <div class="sim-feedback" id="location-feedback"></div>
            </div>
            
            <div class="privacy-score-container">
                <h5>Puntuación de Privacidad: <span id="privacyScore">0</span>/3</h5>
                <div class="privacy-score-bar">
                    <div class="privacy-score-fill" id="privacyScoreBar"></div>
                </div>
            </div>
        </div>
    `;
    
    window.checkPrivacySetting = function(select, correctAnswer) {
        const value = select.value;
        const settingDiv = select.closest('.sim-setting');
        const feedback = settingDiv.querySelector('.sim-feedback');
        
        if (value === correctAnswer) {
            feedback.innerHTML = '<span class="correct">✅ ¡Configuración segura!</span>';
            feedback.className = 'sim-feedback correct';
            select.dataset.correct = 'true';
        } else if (value) {
            feedback.innerHTML = '<span class="incorrect">⚠️ Esta configuración podría no ser segura</span>';
            feedback.className = 'sim-feedback incorrect';
            select.dataset.correct = 'false';
        }
        
        updatePrivacyScore();
    };
    
    function updatePrivacyScore() {
        const selects = simulator.querySelectorAll('.sim-select');
        let correct = 0;
        let total = 0;
        
        selects.forEach(select => {
            if (select.dataset.correct === 'true') correct++;
            if (select.dataset.correct) total++;
        });
        
        const scoreElement = document.getElementById('privacyScore');
        const scoreBar = document.getElementById('privacyScoreBar');
        
        if (scoreElement) scoreElement.textContent = correct;
        if (scoreBar) {
            const percentage = total > 0 ? (correct / 3) * 100 : 0;
            scoreBar.style.width = percentage + '%';
        }
    }
    
    announceToScreenReader('Simulador de configuración de privacidad activado');
}

/**
 * Setup privacy simulator
 */
function setupPrivacySimulator() {
    // Privacy simulator is set up through HTML onclick handlers
    // This function can be expanded for more complex simulation logic
}

/**
 * Setup security checklist
 */
function setupSecurityChecklist() {
    // Security score is updated through HTML onchange handlers
}

/**
 * Update security score based on checklist
 */
function updateSecurityScore() {
    const checkboxes = document.querySelectorAll('.security-checklist input[type="checkbox"]');
    const scoreElement = document.getElementById('securityScore');
    const scoreBar = document.getElementById('scoreBar');
    
    if (!checkboxes.length || !scoreElement || !scoreBar) return;
    
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percentage = Math.round((checkedCount / checkboxes.length) * 100);
    
    scoreElement.textContent = percentage;
    scoreBar.style.width = percentage + '%';
    
    // Update score bar color based on percentage
    if (percentage >= 80) {
        scoreBar.style.background = 'var(--success-color)';
    } else if (percentage >= 50) {
        scoreBar.style.background = 'var(--warning-color)';
    } else {
        scoreBar.style.background = 'var(--danger-color)';
    }
    
    announceToScreenReader(`Puntuación de seguridad actualizada: ${percentage} por ciento`);
}

/**
 * Start games
 */
function startGame(gameType) {
    const gameModal = document.getElementById('gameModal');
    const gameContent = document.getElementById('gameContent');
    
    if (!gameModal || !gameContent) return;
    
    gameModal.style.display = 'flex';
    
    switch(gameType) {
        case 'password-strength':
            loadPasswordStrengthGame();
            break;
        case 'phishing-detective':
            loadPhishingDetectiveGame();
            break;
        case 'privacy-hero':
            loadPrivacyHeroGame();
            break;
        case 'safe-surfer':
            loadSafeSurferGame();
            break;
    }
    
    // Focus management for accessibility
    setTimeout(() => {
        const firstButton = gameContent.querySelector('button, input, select');
        if (firstButton) firstButton.focus();
    }, 100);
    
    announceToScreenReader(`Juego ${gameType} iniciado`);
}

/**
 * Load password strength game
 */
function loadPasswordStrengthGame() {
    const gameContent = document.getElementById('gameContent');
    
    gameContent.innerHTML = `
        <div class="password-game">
            <h3>🔐 Creador de Contraseñas Súper Fuertes</h3>
            <p>¡Crea la contraseña más fuerte posible y gana puntos!</p>
            
            <div class="password-builder">
                <input type="text" id="gamePassword" class="password-input" 
                       placeholder="Escribe tu contraseña aquí..." 
                       oninput="checkPasswordStrength()">
                
                <div class="strength-meter">
                    <div class="strength-bar" id="strengthBar"></div>
                </div>
                
                <div class="strength-info" id="strengthInfo">
                    <div class="strength-text">Fortaleza: <span id="strengthLabel">Muy Débil</span></div>
                    <div class="strength-score">Puntuación: <span id="strengthScore">0</span>/100</div>
                </div>
                
                <div class="password-tips">
                    <h4>Consejos para una contraseña fuerte:</h4>
                    <ul class="tips-checklist">
                        <li id="tip-length">❌ Al menos 12 caracteres</li>
                        <li id="tip-uppercase">❌ Letras mayúsculas</li>
                        <li id="tip-lowercase">❌ Letras minúsculas</li>
                        <li id="tip-numbers">❌ Números</li>
                        <li id="tip-special">❌ Caracteres especiales</li>
                        <li id="tip-common">❌ No usar palabras comunes</li>
                    </ul>
                </div>
                
                <button class="btn btn-primary" onclick="submitPassword()">
                    🏆 Enviar Contraseña
                </button>
            </div>
        </div>
    `;
    
    window.checkPasswordStrength = function() {
        const password = document.getElementById('gamePassword').value;
        const strengthBar = document.getElementById('strengthBar');
        const strengthLabel = document.getElementById('strengthLabel');
        const strengthScore = document.getElementById('strengthScore');
        
        if (!password) {
            strengthBar.style.width = '0%';
            strengthLabel.textContent = 'Muy Débil';
            strengthScore.textContent = '0';
            return;
        }
        
        let score = 0;
        let feedback = [];
        
        // Check length
        if (password.length >= 12) {
            score += 25;
            document.getElementById('tip-length').innerHTML = '✅ Al menos 12 caracteres';
        } else {
            document.getElementById('tip-length').innerHTML = '❌ Al menos 12 caracteres';
        }
        
        // Check uppercase
        if (/[A-Z]/.test(password)) {
            score += 15;
            document.getElementById('tip-uppercase').innerHTML = '✅ Letras mayúsculas';
        } else {
            document.getElementById('tip-uppercase').innerHTML = '❌ Letras mayúsculas';
        }
        
        // Check lowercase
        if (/[a-z]/.test(password)) {
            score += 15;
            document.getElementById('tip-lowercase').innerHTML = '✅ Letras minúsculas';
        } else {
            document.getElementById('tip-lowercase').innerHTML = '❌ Letras minúsculas';
        }
        
        // Check numbers
        if (/[0-9]/.test(password)) {
            score += 15;
            document.getElementById('tip-numbers').innerHTML = '✅ Números';
        } else {
            document.getElementById('tip-numbers').innerHTML = '❌ Números';
        }
        
        // Check special characters
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            score += 20;
            document.getElementById('tip-special').innerHTML = '✅ Caracteres especiales';
        } else {
            document.getElementById('tip-special').innerHTML = '❌ Caracteres especiales';
        }
        
        // Check for common passwords
        const commonPasswords = ['password', 'contraseña', '123456', 'admin', 'qwerty'];
        const isCommon = commonPasswords.some(common => 
            password.toLowerCase().includes(common.toLowerCase()));
        
        if (!isCommon) {
            score += 10;
            document.getElementById('tip-common').innerHTML = '✅ No usar palabras comunes';
        } else {
            score -= 20;
            document.getElementById('tip-common').innerHTML = '❌ No usar palabras comunes';
        }
        
        // Update display
        strengthBar.style.width = Math.min(score, 100) + '%';
        strengthScore.textContent = Math.max(0, score);
        
        if (score >= 90) {
            strengthLabel.textContent = 'Súper Fuerte';
            strengthBar.style.backgroundColor = '#10B981';
        } else if (score >= 70) {
            strengthLabel.textContent = 'Fuerte';
            strengthBar.style.backgroundColor = '#F59E0B';
        } else if (score >= 50) {
            strengthLabel.textContent = 'Media';
            strengthBar.style.backgroundColor = '#EF4444';
        } else {
            strengthLabel.textContent = 'Débil';
            strengthBar.style.backgroundColor = '#DC2626';
        }
    };
    
    window.submitPassword = function() {
        const password = document.getElementById('gamePassword').value;
        const score = parseInt(document.getElementById('strengthScore').textContent);
        
        let message = '';
        let emoji = '';
        
        if (score >= 90) {
            message = '¡Increíble! Tu contraseña es súper fuerte. ¡Eres un maestro de la seguridad!';
            emoji = '🏆';
        } else if (score >= 70) {
            message = '¡Muy bien! Tu contraseña es fuerte, pero puedes mejorarla un poco más.';
            emoji = '🥈';
        } else if (score >= 50) {
            message = 'Tu contraseña tiene fuerza media. ¡Sigue los consejos para mejorarla!';
            emoji = '🥉';
        } else {
            message = 'Tu contraseña necesita ser más fuerte. ¡Sigue intentándolo!';
            emoji = '💪';
        }
        
        showNotification(`${emoji} ${message}`, score >= 70 ? 'success' : 'warning');
    };
}

/**
 * Load other games (simplified versions for demo)
 */
function loadPhishingDetectiveGame() {
    const gameContent = document.getElementById('gameContent');
    gameContent.innerHTML = `
        <div class="simple-game">
            <h3>🕵️ Detective Anti-Phishing</h3>
            <p>¡Este es el mismo juego que ya jugaste en la sección principal!</p>
            <button class="btn btn-primary" onclick="closeGame(); startPhishingGame()">
                Ir al Juego Principal
            </button>
        </div>
    `;
}

function loadPrivacyHeroGame() {
    const gameContent = document.getElementById('gameContent');
    gameContent.innerHTML = `
        <div class="simple-game">
            <h3>🦸 Héroe de la Privacidad</h3>
            <p>¡Protege la información personal de los ciudadanos!</p>
            <div class="game-scenario">
                <p>Ves a alguien compartiendo su dirección completa en redes sociales. ¿Qué haces?</p>
                <button class="btn btn-primary" onclick="heroAction('warn')">
                    Advertir sobre los riesgos
                </button>
                <button class="btn btn-secondary" onclick="heroAction('ignore')">
                    Ignorar la situación
                </button>
            </div>
            <div id="heroResult"></div>
        </div>
    `;
    
    window.heroAction = function(action) {
        const result = document.getElementById('heroResult');
        if (action === 'warn') {
            result.innerHTML = `
                <div class="hero-success">
                    <h4>🎉 ¡Excelente decisión!</h4>
                    <p>Advertir sobre los riesgos de privacidad ayuda a proteger a otros. ¡Eres un verdadero héroe de la privacidad!</p>
                    <p><strong>+100 puntos de héroe</strong></p>
                </div>
            `;
        } else {
            result.innerHTML = `
                <div class="hero-advice">
                    <h4>🤔 Puedes hacerlo mejor</h4>
                    <p>Un héroe de la privacidad siempre ayuda a otros a mantenerse seguros. ¡Inténtalo de nuevo!</p>
                </div>
            `;
        }
    };
}

function loadSafeSurferGame() {
    const gameContent = document.getElementById('gameContent');
    gameContent.innerHTML = `
        <div class="simple-game">
            <h3>🏄 Navegador Seguro</h3>
            <p>¡Navega por internet evitando los peligros!</p>
            <div class="surf-game">
                <p>Encuentras un sitio web que te pide descargar un "antivirus gratuito". ¿Qué haces?</p>
                <button class="btn btn-primary" onclick="surfAction('avoid')">
                    🚫 Evitar y cerrar la página
                </button>
                <button class="btn btn-danger" onclick="surfAction('download')">
                    📥 Descargar el antivirus
                </button>
            </div>
            <div id="surfResult"></div>
        </div>
    `;
    
    window.surfAction = function(action) {
        const result = document.getElementById('surfResult');
        if (action === 'avoid') {
            result.innerHTML = `
                <div class="surf-success">
                    <h4>🏄‍♀️ ¡Navegación segura!</h4>
                    <p>¡Excelente! Los antivirus "gratuitos" de sitios desconocidos suelen ser malware. ¡Navegaste como un pro!</p>
                    <p><strong>+50 puntos de navegación segura</strong></p>
                </div>
            `;
        } else {
            result.innerHTML = `
                <div class="surf-warning">
                    <h4>⚠️ ¡Peligro!</h4>
                    <p>¡Oh no! Descargaste malware. Los antivirus reales se descargan de sitios oficiales. ¡Aprende de este error!</p>
                    <p><strong>-25 puntos</strong></p>
                </div>
            `;
        }
    };
}

/**
 * Close game modal
 */
function closeGame() {
    const gameModal = document.getElementById('gameModal');
    if (gameModal) {
        gameModal.style.display = 'none';
        
        // Return focus to the game card that opened the modal
        const gameCards = document.querySelectorAll('.game-card');
        if (gameCards.length > 0) {
            gameCards[0].focus();
        }
    }
}

/**
 * Close all interactive tools
 */
function closeAllInteractiveTools() {
    const tools = document.querySelectorAll('.interactive-tool[style*="block"]');
    tools.forEach(tool => {
        tool.style.display = 'none';
    });
}

/**
 * Download certificate (mock functionality)
 */
function downloadCertificate() {
    // Create a simple certificate
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#4f46e5';
    ctx.lineWidth = 5;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // Title
    ctx.fillStyle = '#4f46e5';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificado CyberHéroe', canvas.width / 2, 120);
    
    // Content
    ctx.fillStyle = '#1f2937';
    ctx.font = '24px Arial';
    ctx.fillText('Este certificado se otorga a', canvas.width / 2, 200);
    
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#7c3aed';
    ctx.fillText('Un Valiente CyberHéroe', canvas.width / 2, 260);
    
    ctx.font = '20px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('Por completar exitosamente el curso de', canvas.width / 2, 320);
    ctx.fillText('Ciberseguridad para Niños', canvas.width / 2, 350);
    
    ctx.fillText('Fecha: ' + new Date().toLocaleDateString('es-ES'), canvas.width / 2, 420);
    
    // Convert to image and download
    const link = document.createElement('a');
    link.download = 'certificado-cyberheroe.png';
    link.href = canvas.toDataURL();
    link.click();
    
    showNotification('¡Certificado descargado! 🎉', 'success');
}

/**
 * Show notification to user
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 8px;
                padding: 16px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 1001;
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
            }
            .notification.success {
                border-left: 4px solid #10B981;
            }
            .notification.warning {
                border-left: 4px solid #F59E0B;
            }
            .notification.error {
                border-left: 4px solid #EF4444;
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 10px;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #6b7280;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

/**
 * Announce to screen reader
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Highlight section animation (called from CSS)
 */
const highlightSectionCSS = `
@keyframes highlightSection {
    0% { background-color: transparent; }
    25% { background-color: rgba(79, 70, 229, 0.1); }
    75% { background-color: rgba(79, 70, 229, 0.1); }
    100% { background-color: transparent; }
}
`;

// Add the CSS animation if not already added
if (!document.getElementById('highlightSectionCSS')) {
    const style = document.createElement('style');
    style.id = 'highlightSectionCSS';
    style.textContent = highlightSectionCSS;
    document.head.appendChild(style);
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Error handling for the application
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('Ha ocurrido un error. Por favor recarga la página.', 'error');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});