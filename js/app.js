/**
 * CiberKids - Main Application Script
 * Interactive cybersecurity education web application for children
 */

// Application state
const AppState = {
    currentTheme: 'light',
    currentSection: 'inicio',
    gameScores: {
        passwordBuilder: 0,
        phishingDetective: 0,
        privacyGuardian: 0
    },
    timerState: {
        isRunning: false,
        isPaused: false,
        timeLeft: 30 * 60, // 30 minutes in seconds
        interval: null
    }
};

// DOM elements cache
const Elements = {
    themeToggle: null,
    mobileMenuBtn: null,
    navMenu: null,
    navLinks: null,
    passwordInput: null,
    passwordToggle: null,
    strengthBar: null,
    strengthText: null,
    gameModal: null,
    modalTitle: null,
    modalBody: null,
    modalClose: null,
    timerDisplay: null,
    timerControls: null,
    phishingGame: null,
    privacyQuiz: null
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('🚀 Initializing CiberKids application...');
    
    try {
        cacheElements();
        setupEventListeners();
        initializeTheme();
        initializeNavigation();
        initializePasswordTester();
        initializePhishingGame();
        initializePrivacyQuiz();
        initializeTimer();
        initializeGames();
        
        // Add smooth scrolling animation
        addScrollAnimations();
        
        console.log('✅ CiberKids application initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing application:', error);
    }
}

/**
 * Cache frequently used DOM elements
 */
function cacheElements() {
    Elements.themeToggle = document.querySelector('.theme-toggle');
    Elements.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    Elements.navMenu = document.querySelector('.nav-menu');
    Elements.navLinks = document.querySelectorAll('.nav-link');
    Elements.passwordInput = document.getElementById('password-input');
    Elements.passwordToggle = document.querySelector('.password-toggle');
    Elements.strengthBar = document.querySelector('.strength-fill');
    Elements.strengthText = document.querySelector('.strength-text');
    Elements.gameModal = document.getElementById('game-modal');
    Elements.modalTitle = document.getElementById('modal-title');
    Elements.modalBody = document.getElementById('modal-body');
    Elements.modalClose = document.querySelector('.modal-close');
    Elements.timerDisplay = document.querySelector('.timer-time');
    Elements.timerControls = document.querySelector('.timer-controls');
    Elements.phishingGame = document.querySelector('.phishing-game');
    Elements.privacyQuiz = document.getElementById('privacy-quiz');
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Theme toggle
    if (Elements.themeToggle) {
        Elements.themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu
    if (Elements.mobileMenuBtn) {
        Elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    Elements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Password tester
    if (Elements.passwordInput) {
        Elements.passwordInput.addEventListener('input', checkPasswordStrength);
        Elements.passwordInput.addEventListener('keyup', checkPasswordStrength);
    }
    
    if (Elements.passwordToggle) {
        Elements.passwordToggle.addEventListener('click', togglePasswordVisibility);
    }
    
    // Modal
    if (Elements.modalClose) {
        Elements.modalClose.addEventListener('click', closeModal);
    }
    
    if (Elements.gameModal) {
        Elements.gameModal.addEventListener('click', (e) => {
            if (e.target === Elements.gameModal) {
                closeModal();
            }
        });
    }
    
    // Game cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', handleGameCardClick);
    });
    
    // Timer controls
    document.getElementById('start-timer')?.addEventListener('click', startTimer);
    document.getElementById('pause-timer')?.addEventListener('click', pauseTimer);
    document.getElementById('reset-timer')?.addEventListener('click', resetTimer);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Window resize
    window.addEventListener('resize', handleResize);
    
    // Scroll events for animations
    window.addEventListener('scroll', handleScroll);
}

/**
 * Initialize theme system
 */
function initializeTheme() {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('ciberkids-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('ciberkids-theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const newTheme = AppState.currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('ciberkids-theme', newTheme);
    
    // Add haptic feedback if available
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

/**
 * Set theme
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
    AppState.currentTheme = theme;
    document.body.className = `${theme}-theme`;
    
    // Update theme toggle button state
    if (Elements.themeToggle) {
        const toggleIcon = Elements.themeToggle.querySelector('.toggle-icon');
        if (toggleIcon) {
            toggleIcon.style.transform = theme === 'dark' ? 'translateX(28px)' : 'translateX(0)';
        }
    }
    
    console.log(`🎨 Theme changed to: ${theme}`);
}

/**
 * Initialize navigation
 */
function initializeNavigation() {
    // Set active link based on current section
    updateActiveNavLink();
    
    // Add intersection observer for automatic nav updates
    const sections = document.querySelectorAll('section[id]');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                AppState.currentSection = entry.target.id;
                updateActiveNavLink();
            }
        });
    }, { threshold: 0.5, rootMargin: '-80px 0px -80px 0px' });
    
    sections.forEach(section => navObserver.observe(section));
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const isExpanded = Elements.mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    Elements.mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    Elements.navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';
}

/**
 * Handle navigation link clicks
 */
function handleNavClick(e) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    const targetId = href.substring(1);
    
    // Close mobile menu if open
    if (Elements.navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    scrollToSection(targetId);
}

/**
 * Scroll to section smoothly
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = 80;
        const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        AppState.currentSection = sectionId;
        updateActiveNavLink();
    }
}

/**
 * Update active navigation link
 */
function updateActiveNavLink() {
    Elements.navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${AppState.currentSection}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialize password strength tester
 */
function initializePasswordTester() {
    if (!Elements.passwordInput) return;
    
    // Initial state
    updatePasswordStrength('');
}

/**
 * Check password strength
 */
function checkPasswordStrength() {
    const password = Elements.passwordInput.value;
    updatePasswordStrength(password);
}

/**
 * Update password strength display
 * @param {string} password - The password to check
 */
function updatePasswordStrength(password) {
    const strength = calculatePasswordStrength(password);
    
    if (Elements.strengthBar) {
        Elements.strengthBar.setAttribute('data-strength', strength.level);
    }
    
    if (Elements.strengthText) {
        Elements.strengthText.textContent = strength.text;
        Elements.strengthText.className = `strength-text ${strength.class}`;
    }
}

/**
 * Calculate password strength
 * @param {string} password - Password to analyze
 * @returns {Object} Strength information
 */
function calculatePasswordStrength(password) {
    if (!password) {
        return { level: 0, text: 'Ingresa una contraseña', class: '' };
    }
    
    let score = 0;
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        symbols: /[^A-Za-z0-9]/.test(password),
        noPersonal: !/\b(123|abc|password|contraseña)\b/i.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    const levels = [
        { level: 0, text: 'Muy débil', class: 'weak' },
        { level: 1, text: 'Débil', class: 'weak' },
        { level: 2, text: 'Regular', class: 'fair' },
        { level: 3, text: 'Buena', class: 'good' },
        { level: 4, text: 'Fuerte', class: 'strong' },
        { level: 5, text: 'Muy fuerte', class: 'very-strong' }
    ];
    
    return levels[Math.min(score, 5)];
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility() {
    const isPassword = Elements.passwordInput.type === 'password';
    Elements.passwordInput.type = isPassword ? 'text' : 'password';
    Elements.passwordToggle.textContent = isPassword ? '🙈' : '👁️';
    
    // Announce change for screen readers
    const announcement = isPassword ? 'Contraseña visible' : 'Contraseña oculta';
    announceToScreenReader(announcement);
}

/**
 * Initialize phishing detection game
 */
function initializePhishingGame() {
    if (!Elements.phishingGame) return;
    
    const emailDisplay = Elements.phishingGame.querySelector('#email-display');
    const safeBtn = Elements.phishingGame.querySelector('#safe-btn');
    const phishingBtn = Elements.phishingGame.querySelector('#phishing-btn');
    const feedback = Elements.phishingGame.querySelector('#game-feedback');
    
    if (!emailDisplay || !safeBtn || !phishingBtn || !feedback) return;
    
    let currentEmail = 0;
    const emails = [
        {
            safe: true,
            content: `
                <div class="email-header">
                    <div class="email-from"><strong>De:</strong> notificaciones@banco-seguro.com</div>
                    <div class="email-subject"><strong>Asunto:</strong> Resumen mensual de tu cuenta</div>
                </div>
                <div class="email-body">
                    <p>Hola,</p>
                    <p class="safe-text">Tu resumen mensual está disponible en tu cuenta. Para verlo, inicia sesión en nuestro sitio web oficial.</p>
                    <p>Gracias por confiar en nosotros.</p>
                    <p>Equipo de Banco Seguro</p>
                </div>
            `
        },
        {
            safe: false,
            content: `
                <div class="email-header">
                    <div class="email-from"><strong>De:</strong> urgente@banco-falso.net</div>
                    <div class="email-subject"><strong>Asunto:</strong> ⚠️ ¡¡¡CUENTA SUSPENDIDA!!! ¡¡¡ACTÚA YA!!!</div>
                </div>
                <div class="email-body">
                    <p>ALERTA URGENTE:</p>
                    <p class="suspicious-text">Tu cuenta sera CERRADA en 24 horas si no actuas INMEDIATAMENTE!!!</p>
                    <p class="suspicious-text">Haz clic aqui para actualizar tus datos: banco-verificacion-urgente.com/login</p>
                    <p>Proporciona tu contraseña y número de tarjeta AHORA.</p>
                </div>
            `
        }
    ];
    
    function showEmail() {
        emailDisplay.innerHTML = emails[currentEmail].content;
        feedback.classList.remove('show', 'correct', 'incorrect');
        safeBtn.disabled = false;
        phishingBtn.disabled = false;
    }
    
    function checkAnswer(userAnswer) {
        const correct = emails[currentEmail].safe === userAnswer;
        feedback.classList.add('show', correct ? 'correct' : 'incorrect');
        feedback.textContent = correct ? 
            '¡Correcto! 🎉' : 
            `Incorrecto. Este email es ${emails[currentEmail].safe ? 'seguro' : 'phishing'}.`;
        
        safeBtn.disabled = true;
        phishingBtn.disabled = true;
        
        setTimeout(() => {
            currentEmail = (currentEmail + 1) % emails.length;
            showEmail();
        }, 2000);
    }
    
    safeBtn.addEventListener('click', () => checkAnswer(true));
    phishingBtn.addEventListener('click', () => checkAnswer(false));
    
    // Initialize with first email
    showEmail();
}

/**
 * Initialize privacy quiz
 */
function initializePrivacyQuiz() {
    if (!Elements.privacyQuiz) return;
    
    const questions = [
        {
            question: "¿Cuál de estos datos NO deberías compartir en redes sociales?",
            options: [
                "Tu comida favorita",
                "Tu dirección completa",
                "Tus pasatiempos",
                "Tus colores favoritos"
            ],
            correct: 1,
            explanation: "Tu dirección es información privada que podría ponerte en riesgo."
        },
        {
            question: "¿Qué debes hacer antes de publicar una foto?",
            options: [
                "Preguntarme: ¿Estaría bien que cualquiera viera esto?",
                "Publicarla inmediatamente",
                "Etiquetas a todos mis amigos",
                "Usar muchos hashtags"
            ],
            correct: 0,
            explanation: "Siempre piensa antes de publicar. Una vez en internet, es difícil borrar completamente."
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    
    function showQuestion() {
        const q = questions[currentQuestion];
        Elements.privacyQuiz.innerHTML = `
            <div class="quiz-question">
                <div class="question-text">${q.question}</div>
                <div class="quiz-options">
                    ${q.options.map((option, index) => `
                        <button class="quiz-option" data-index="${index}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Add option click handlers
        Elements.privacyQuiz.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', handleQuizAnswer);
        });
    }
    
    function handleQuizAnswer(e) {
        const selectedIndex = parseInt(e.target.getAttribute('data-index'));
        const correct = selectedIndex === questions[currentQuestion].correct;
        
        if (correct) score++;
        
        // Show feedback
        Elements.privacyQuiz.querySelectorAll('.quiz-option').forEach((option, index) => {
            option.disabled = true;
            if (index === questions[currentQuestion].correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !correct) {
                option.classList.add('incorrect');
            }
        });
        
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showQuizResults();
            }
        }, 2000);
    }
    
    function showQuizResults() {
        const percentage = Math.round((score / questions.length) * 100);
        Elements.privacyQuiz.innerHTML = `
            <div class="quiz-results">
                <h3>¡Quiz completado!</h3>
                <p>Tu puntuación: ${score}/${questions.length} (${percentage}%)</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <button class="btn btn-primary" onclick="location.reload()">🔄 Volver a intentar</button>
            </div>
        `;
    }
    
    // Initialize with first question
    showQuestion();
}

/**
 * Initialize usage timer
 */
function initializeTimer() {
    if (!Elements.timerDisplay) return;
    
    updateTimerDisplay();
}

/**
 * Start the usage timer
 */
function startTimer() {
    if (AppState.timerState.isRunning) return;
    
    AppState.timerState.isRunning = true;
    AppState.timerState.isPaused = false;
    
    document.querySelector('.usage-timer').classList.add('timer-active');
    document.querySelector('.usage-timer').classList.remove('timer-paused', 'timer-finished');
    
    AppState.timerState.interval = setInterval(() => {
        if (AppState.timerState.timeLeft > 0) {
            AppState.timerState.timeLeft--;
            updateTimerDisplay();
        } else {
            finishTimer();
        }
    }, 1000);
    
    announceToScreenReader('Cronómetro iniciado');
}

/**
 * Pause the usage timer
 */
function pauseTimer() {
    if (!AppState.timerState.isRunning) return;
    
    AppState.timerState.isPaused = true;
    clearInterval(AppState.timerState.interval);
    
    document.querySelector('.usage-timer').classList.add('timer-paused');
    document.querySelector('.usage-timer').classList.remove('timer-active');
    
    announceToScreenReader('Cronómetro pausado');
}

/**
 * Reset the usage timer
 */
function resetTimer() {
    AppState.timerState.isRunning = false;
    AppState.timerState.isPaused = false;
    AppState.timerState.timeLeft = 30 * 60; // Reset to 30 minutes
    clearInterval(AppState.timerState.interval);
    
    document.querySelector('.usage-timer').classList.remove('timer-active', 'timer-paused', 'timer-finished');
    
    updateTimerDisplay();
    announceToScreenReader('Cronómetro reiniciado');
}

/**
 * Finish the usage timer
 */
function finishTimer() {
    AppState.timerState.isRunning = false;
    clearInterval(AppState.timerState.interval);
    
    document.querySelector('.usage-timer').classList.add('timer-finished');
    document.querySelector('.usage-timer').classList.remove('timer-active', 'timer-paused');
    
    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('CiberKids - Tiempo recomendado completado', {
            body: '¡Es hora de tomar un descanso!',
            icon: 'assets/images/logo.svg'
        });
    }
    
    announceToScreenReader('Tiempo recomendado completado. Es hora de tomar un descanso.');
}

/**
 * Update timer display
 */
function updateTimerDisplay() {
    const minutes = Math.floor(AppState.timerState.timeLeft / 60);
    const seconds = AppState.timerState.timeLeft % 60;
    const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:00`;
    
    if (Elements.timerDisplay) {
        Elements.timerDisplay.textContent = displayTime;
    }
}

/**
 * Initialize games system
 */
function initializeGames() {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

/**
 * Handle game card clicks
 */
function handleGameCardClick(e) {
    const gameCard = e.currentTarget;
    const gameType = gameCard.getAttribute('data-game');
    
    // Add click animation
    gameCard.style.transform = 'scale(0.95)';
    setTimeout(() => {
        gameCard.style.transform = '';
    }, 150);
    
    openGameModal(gameType);
}

/**
 * Open game modal
 */
function openGameModal(gameType) {
    if (!Elements.gameModal) return;
    
    const games = {
        'password-builder': {
            title: '🔨 Constructor de Contraseñas',
            content: createPasswordBuilderGame()
        },
        'phishing-detective': {
            title: '🕵️ Detective Anti-Phishing',
            content: createPhishingDetectiveGame()
        },
        'privacy-guardian': {
            title: '🛡️ Guardián de la Privacidad',
            content: createPrivacyGuardianGame()
        }
    };
    
    const game = games[gameType];
    if (game) {
        Elements.modalTitle.textContent = game.title;
        Elements.modalBody.innerHTML = game.content;
        Elements.gameModal.classList.add('active');
        
        // Initialize game-specific functionality
        initializeModalGame(gameType);
    }
}

/**
 * Close game modal
 */
function closeModal() {
    if (Elements.gameModal) {
        Elements.gameModal.classList.remove('active');
        // Clean up any game-specific intervals or event listeners
        Elements.modalBody.innerHTML = '';
    }
}

/**
 * Create password builder game content
 */
function createPasswordBuilderGame() {
    return `
        <div class="password-builder-game">
            <p>¡Construye la contraseña más segura posible!</p>
            <div class="game-input">
                <input type="text" id="game-password" placeholder="Construye tu contraseña aquí..." class="password-input">
                <div class="strength-indicator">
                    <div class="strength-bar">
                        <div class="strength-fill" data-strength="0"></div>
                    </div>
                    <div class="strength-text">Comienza a escribir...</div>
                </div>
            </div>
            <div class="password-tips">
                <h4>Consejos:</h4>
                <ul>
                    <li>✅ Usa al menos 8 caracteres</li>
                    <li>✅ Incluye mayúsculas y minúsculas</li>
                    <li>✅ Agrega números</li>
                    <li>✅ Usa símbolos especiales</li>
                    <li>✅ Evita información personal</li>
                </ul>
            </div>
            <div class="game-score">
                <span>Puntuación: </span><span id="password-score">0</span>/100
            </div>
        </div>
    `;
}

/**
 * Create phishing detective game content
 */
function createPhishingDetectiveGame() {
    return `
        <div class="phishing-detective-game">
            <p>¡Identifica todos los correos de phishing!</p>
            <div class="detective-score">
                <span>Correos analizados: </span><span id="emails-checked">0</span>
                <span> | Aciertos: </span><span id="correct-answers">0</span>
            </div>
            <div class="detective-email" id="detective-email-display">
                <!-- Email will be loaded here -->
            </div>
            <div class="detective-controls">
                <button class="btn btn-success" id="detective-safe">✅ Legítimo</button>
                <button class="btn btn-danger" id="detective-phishing">⚠️ Phishing</button>
            </div>
            <div class="detective-feedback" id="detective-feedback"></div>
        </div>
    `;
}

/**
 * Create privacy guardian game content
 */
function createPrivacyGuardianGame() {
    return `
        <div class="privacy-guardian-game">
            <p>¡Protege la información personal de los usuarios!</p>
            <div class="guardian-scenario" id="guardian-scenario">
                <!-- Scenarios will be loaded here -->
            </div>
            <div class="guardian-controls">
                <button class="btn btn-success" id="guardian-allow">✅ Permitir</button>
                <button class="btn btn-danger" id="guardian-block">🚫 Bloquear</button>
            </div>
            <div class="guardian-score">
                <span>Datos protegidos: </span><span id="guardian-score">0</span>
            </div>
        </div>
    `;
}

/**
 * Initialize modal game functionality
 */
function initializeModalGame(gameType) {
    switch (gameType) {
        case 'password-builder':
            initializePasswordBuilderGame();
            break;
        case 'phishing-detective':
            initializePhishingDetectiveGame();
            break;
        case 'privacy-guardian':
            initializePrivacyGuardianGame();
            break;
    }
}

/**
 * Initialize password builder game
 */
function initializePasswordBuilderGame() {
    const gamePassword = document.getElementById('game-password');
    const passwordScore = document.getElementById('password-score');
    
    if (gamePassword) {
        gamePassword.addEventListener('input', (e) => {
            const strength = calculatePasswordStrength(e.target.value);
            const strengthBar = document.querySelector('#game-modal .strength-fill');
            const strengthText = document.querySelector('#game-modal .strength-text');
            
            if (strengthBar) strengthBar.setAttribute('data-strength', strength.level);
            if (strengthText) strengthText.textContent = strength.text;
            if (passwordScore) passwordScore.textContent = strength.level * 20;
        });
    }
}

/**
 * Initialize phishing detective game
 */
function initializePhishingDetectiveGame() {
    // Implementation would be similar to the main phishing game but expanded
    console.log('Initializing Phishing Detective game...');
}

/**
 * Initialize privacy guardian game
 */
function initializePrivacyGuardianGame() {
    // Implementation for privacy scenarios
    console.log('Initializing Privacy Guardian game...');
}

/**
 * Handle keyboard navigation
 */
function handleKeyboardNavigation(e) {
    // ESC to close modal
    if (e.key === 'Escape' && Elements.gameModal?.classList.contains('active')) {
        closeModal();
    }
    
    // Tab navigation improvements
    if (e.key === 'Tab') {
        // Add visual focus indicators
        document.body.classList.add('keyboard-nav');
    }
}

/**
 * Handle window resize
 */
function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && Elements.navMenu?.classList.contains('active')) {
        toggleMobileMenu();
    }
}

/**
 * Handle scroll events for animations
 */
function handleScroll() {
    // Add scroll-based animations or effects here
    const scrolled = window.pageYOffset > 100;
    const header = document.querySelector('.header');
    
    if (header) {
        header.classList.toggle('scrolled', scrolled);
    }
}

/**
 * Add scroll animations to elements
 */
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements for animation
    document.querySelectorAll('.content-card, .game-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Announce text to screen readers
 */
function announceToScreenReader(text) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = text;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Utility functions
 */
const Utils = {
    // Format time in MM:SS format
    formatTime: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    
    // Generate random ID
    generateId: () => {
        return Math.random().toString(36).substr(2, 9);
    },
    
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for global access
window.CiberKids = {
    scrollToSection,
    toggleTheme,
    openGameModal,
    closeModal,
    AppState,
    Elements,
    Utils
};

// Service worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered successfully');
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed');
            });
    });
}

console.log('📱 CiberKids application loaded successfully!');