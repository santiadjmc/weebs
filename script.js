// ===== Theme Management System =====
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupToggle();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        
        // Add visual feedback animation
        const toggle = document.querySelector('.theme-toggle');
        toggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            toggle.style.transform = 'scale(1)';
        }, 150);
    }

    setupToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
            themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
    }
}

// ===== Navigation Management =====
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveSection();
    }

    setupMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        if (menuBtn && navMenu) {
            menuBtn.addEventListener('click', () => {
                const isActive = navMenu.classList.contains('active');
                navMenu.classList.toggle('active');
                menuBtn.setAttribute('aria-expanded', !isActive);
                
                // Animate hamburger menu
                this.animateMenuButton(menuBtn, !isActive);
            });

            // Close menu when clicking on links
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                    this.animateMenuButton(menuBtn, false);
                });
            });
        }
    }

    animateMenuButton(button, isOpen) {
        const spans = button.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');

        window.addEventListener('scroll', () => {
            const current = this.getCurrentSection(sections);
            this.updateActiveLink(navLinks, current);
        });
    }

    getCurrentSection(sections) {
        const scrollPosition = window.scrollY + 100;
        
        for (let section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                return section.id;
            }
        }
        return null;
    }

    updateActiveLink(links, currentSection) {
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// ===== Password Strength Checker =====
class PasswordChecker {
    constructor() {
        this.criteria = [
            { test: (pwd) => pwd.length >= 8, message: 'Al menos 8 caracteres', points: 20 },
            { test: (pwd) => /[A-Z]/.test(pwd), message: 'Una letra mayúscula', points: 15 },
            { test: (pwd) => /[a-z]/.test(pwd), message: 'Una letra minúscula', points: 15 },
            { test: (pwd) => /[0-9]/.test(pwd), message: 'Un número', points: 15 },
            { test: (pwd) => /[^A-Za-z0-9]/.test(pwd), message: 'Un símbolo especial', points: 15 },
            { test: (pwd) => pwd.length >= 12, message: 'Más de 12 caracteres (extra seguro)', points: 10 },
            { test: (pwd) => !/(.)\1{2,}/.test(pwd), message: 'Sin caracteres repetidos', points: 10 }
        ];
        this.init();
    }

    init() {
        const input = document.getElementById('password-input');
        if (input) {
            input.addEventListener('input', (e) => this.checkPassword(e.target.value));
        }
    }

    checkPassword(password) {
        if (!password) {
            this.updateUI(0, [], 'Ingresa una contraseña para verificar su fuerza');
            return;
        }

        let score = 0;
        let feedback = [];

        this.criteria.forEach(criterion => {
            if (criterion.test(password)) {
                score += criterion.points;
                feedback.push({ message: criterion.message, status: 'good' });
            } else {
                feedback.push({ message: criterion.message, status: 'bad' });
            }
        });

        const strength = this.getStrengthLabel(score);
        this.updateUI(score, feedback, strength);
    }

    getStrengthLabel(score) {
        if (score < 40) return 'Muy débil - Fácil de adivinar';
        if (score < 60) return 'Débil - Necesita mejoras';
        if (score < 80) return 'Buena - Bastante segura';
        return '¡Excelente! - Súper segura';
    }

    updateUI(score, feedback, strengthText) {
        const strengthFill = document.querySelector('.strength-fill');
        const strengthText_el = document.querySelector('.strength-text');
        const tipsContainer = document.querySelector('.password-tips-live');

        // Update strength bar
        if (strengthFill) {
            strengthFill.style.width = `${Math.min(score, 100)}%`;
        }

        // Update strength text
        if (strengthText_el) {
            strengthText_el.textContent = strengthText;
            strengthText_el.className = `strength-text ${this.getStrengthClass(score)}`;
        }

        // Update feedback tips
        if (tipsContainer) {
            tipsContainer.style.display = 'block';
            tipsContainer.innerHTML = feedback.map(tip => 
                `<div class="tip-item ${tip.status}">
                    <i class="fas fa-${tip.status === 'good' ? 'check' : 'times'}" aria-hidden="true"></i>
                    <span>${tip.message}</span>
                </div>`
            ).join('');
        }
    }

    getStrengthClass(score) {
        if (score < 40) return 'very-weak';
        if (score < 60) return 'weak';
        if (score < 80) return 'good';
        return 'excellent';
    }
}

// ===== Phishing Quiz System =====
class PhishingQuiz {
    constructor() {
        this.questions = [
            {
                email: {
                    from: 'security@youbank.com',
                    subject: '¡URGENTE! Verifica tu cuenta AHORA',
                    content: 'Estimado cliente,\n\nHemos detectado actividad sospechosa en tu cuenta. Debes verificar tu información INMEDIATAMENTE o tu cuenta será cerrada.\n\nHaz clic aquí: www.youbank-verify.com/urgent\n\nGracias,\nEquipo de Seguridad'
                },
                isPhishing: true,
                explanation: '¡Correcto! Este es phishing porque: usa urgencia excesiva, pide información personal, tiene un enlace sospechoso, y presiona para actuar rápidamente.'
            },
            {
                email: {
                    from: 'noreply@steam-games.com',
                    subject: 'Tu compra ha sido procesada',
                    content: 'Hola,\n\nGracias por tu compra de "Juego Súper Genial" por $59.99.\n\nSi no realizaste esta compra, haz clic aquí para cancelar: secure-steam.net/cancel\n\nEquipo de Steam'
                },
                isPhishing: true,
                explanation: '¡Correcto! Es phishing porque: el dominio "secure-steam.net" no es oficial, usa miedo de compra no autorizada, y el enlace no va al sitio real de Steam.'
            },
            {
                email: {
                    from: 'info@escuela-sanmiguel.edu',
                    subject: 'Recordatorio: Reunión de padres mañana',
                    content: 'Estimados padres,\n\nLes recordamos que mañana a las 7:00 PM tendremos la reunión mensual en el aula 205.\n\nTemas a tratar:\n- Excursión próximo mes\n- Festival de ciencias\n\nSaludos,\nDirectora María González'
                },
                isPhishing: false,
                explanation: '¡Correcto! Este email es seguro porque: viene de un remitente conocido, no pide información personal, no tiene enlaces sospechosos, y el contenido es normal para una escuela.'
            }
        ];
        this.currentQuestion = 0;
        this.init();
    }

    init() {
        this.loadQuestion();
    }

    loadQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showCompletion();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const questionEl = document.getElementById('phishing-question');
        
        if (questionEl) {
            questionEl.innerHTML = `
                <p>¿Es este email seguro o es phishing? (Pregunta ${this.currentQuestion + 1} de ${this.questions.length})</p>
                <div class="email-example">
                    <div class="email-header">
                        <span><strong>De:</strong> ${question.email.from}</span>
                        <span><strong>Asunto:</strong> ${question.email.subject}</span>
                    </div>
                    <div class="email-content">
                        ${question.email.content.split('\n').map(line => `<p>${line}</p>`).join('')}
                    </div>
                </div>
                <div class="quiz-buttons">
                    <button class="quiz-btn safe-btn" onclick="phishingQuiz.answerQuestion(false)">Es Seguro ✅</button>
                    <button class="quiz-btn danger-btn" onclick="phishingQuiz.answerQuestion(true)">Es Phishing ⚠️</button>
                </div>
            `;
        }
    }

    answerQuestion(userAnswer) {
        const question = this.questions[this.currentQuestion];
        const resultEl = document.getElementById('phishing-result');
        const isCorrect = userAnswer === question.isPhishing;
        
        if (resultEl) {
            resultEl.className = `quiz-result ${isCorrect ? 'correct' : 'incorrect'}`;
            resultEl.style.display = 'block';
            resultEl.innerHTML = `
                <h4>${isCorrect ? '¡Muy bien!' : 'No exactamente...'}</h4>
                <p>${question.explanation}</p>
                <button class="quiz-btn" onclick="phishingQuiz.nextQuestion()" style="margin-top: 1rem; background: var(--primary-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer;">
                    ${this.currentQuestion < this.questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                </button>
            `;
        }
    }

    nextQuestion() {
        this.currentQuestion++;
        document.getElementById('phishing-result').style.display = 'none';
        this.loadQuestion();
    }

    showCompletion() {
        const questionEl = document.getElementById('phishing-question');
        if (questionEl) {
            questionEl.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <h3>🎉 ¡Completaste el quiz!</h3>
                    <p>¡Ahora eres un detective anti-phishing experto!</p>
                    <p>Recuerda siempre: <strong>piensa antes de hacer clic</strong></p>
                    <button class="quiz-btn" onclick="phishingQuiz.restart()" style="background: var(--primary-color); color: white; border: none; padding: 1rem 2rem; border-radius: 0.5rem; cursor: pointer; margin-top: 1rem;">
                        Reiniciar Quiz
                    </button>
                </div>
            `;
        }
    }

    restart() {
        this.currentQuestion = 0;
        document.getElementById('phishing-result').style.display = 'none';
        this.loadQuestion();
    }
}

// ===== Social Media Scenario Game =====
class SocialMediaGame {
    constructor() {
        this.scenarios = [
            {
                text: 'Un desconocido te envía una solicitud de amistad y te dice que es amigo de tu primo. Te pide tu número de teléfono para "conocerte mejor". ¿Qué haces?',
                options: [
                    'Le doy mi número, parece confiable',
                    'Primero pregunto a mi primo si lo conoce',
                    'No acepto la solicitud y no comparto información'
                ],
                correct: 2,
                explanations: [
                    'No es seguro. Nunca debes dar información personal a desconocidos, aunque digan conocer a alguien.',
                    'Está bien verificar, pero es mejor no aceptar solicitudes de desconocidos en absoluto.',
                    '¡Perfecto! Esta es la opción más segura. Nunca aceptes desconocidos ni compartas información personal.'
                ]
            },
            {
                text: 'Quieres subir una foto de tu cumpleaños donde se ve el número de tu casa en el fondo. ¿Qué haces?',
                options: [
                    'La subo tal como está, solo mis amigos la verán',
                    'Edito la foto para borrar el número de casa',
                    'Subo la foto pero la marco como privada'
                ],
                correct: 1,
                explanations: [
                    'No es seguro. Los números de casa son información personal que no debe compartirse en redes sociales.',
                    '¡Excelente! Siempre edita o recorta información personal antes de compartir fotos.',
                    'Mejor, pero siempre es recomendable quitar información personal de las fotos antes de subirlas.'
                ]
            },
            {
                text: 'Alguien comparte una foto tuya sin tu permiso y te etiqueta. ¿Qué haces?',
                options: [
                    'No hago nada, ya está publicada',
                    'Le pido que la borre y me desentiquete',
                    'Subo una foto suya para vengarme'
                ],
                correct: 1,
                explanations: [
                    'Siempre tienes derecho a pedir que borren contenido tuyo que no autorizaste.',
                    '¡Perfecto! Es tu derecho pedir que borren fotos tuyas sin permiso. La comunicación respetuosa es clave.',
                    'La venganza no es la respuesta. Es mejor hablar y solucionar el problema de manera madura.'
                ]
            }
        ];
        this.currentScenario = 0;
        this.init();
    }

    init() {
        this.loadScenario();
    }

    loadScenario() {
        if (this.currentScenario >= this.scenarios.length) {
            this.showCompletion();
            return;
        }

        const scenario = this.scenarios[this.currentScenario];
        const scenarioEl = document.getElementById('social-scenario');
        
        if (scenarioEl) {
            scenarioEl.innerHTML = `
                <p class="scenario-text">${scenario.text}</p>
                <p style="text-align: center; color: var(--text-secondary); margin-bottom: 1rem;">
                    Pregunta ${this.currentScenario + 1} de ${this.scenarios.length}
                </p>
                <div class="scenario-options">
                    ${scenario.options.map((option, index) => 
                        `<button class="option-btn" onclick="socialGame.answerScenario(${index})">${option}</button>`
                    ).join('')}
                </div>
            `;
        }
    }

    answerScenario(answerIndex) {
        const scenario = this.scenarios[this.currentScenario];
        const resultEl = document.getElementById('scenario-result');
        const isCorrect = answerIndex === scenario.correct;
        
        let resultClass = 'poor';
        let emoji = '😕';
        
        if (isCorrect) {
            resultClass = 'excellent';
            emoji = '🎉';
        } else if (Math.abs(answerIndex - scenario.correct) === 1) {
            resultClass = 'good';
            emoji = '👍';
        }
        
        if (resultEl) {
            resultEl.className = `scenario-result ${resultClass}`;
            resultEl.style.display = 'block';
            resultEl.innerHTML = `
                <h4>${emoji} ${isCorrect ? '¡Excelente elección!' : 'Veamos...'}</h4>
                <p>${scenario.explanations[answerIndex]}</p>
                <button class="quiz-btn" onclick="socialGame.nextScenario()" style="margin-top: 1rem; background: var(--primary-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer;">
                    ${this.currentScenario < this.scenarios.length - 1 ? 'Siguiente Situación' : 'Ver Resultados'}
                </button>
            `;
        }
    }

    nextScenario() {
        this.currentScenario++;
        document.getElementById('scenario-result').style.display = 'none';
        this.loadScenario();
    }

    showCompletion() {
        const scenarioEl = document.getElementById('social-scenario');
        if (scenarioEl) {
            scenarioEl.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <h3>🌟 ¡Felicitaciones!</h3>
                    <p>Ahora sabes cómo manejar situaciones difíciles en redes sociales</p>
                    <p><strong>Recuerda:</strong> Piensa antes de compartir, protege tu privacidad y trata a otros con respeto</p>
                    <button class="quiz-btn" onclick="socialGame.restart()" style="background: var(--primary-color); color: white; border: none; padding: 1rem 2rem; border-radius: 0.5rem; cursor: pointer; margin-top: 1rem;">
                        Reiniciar Juego
                    </button>
                </div>
            `;
        }
    }

    restart() {
        this.currentScenario = 0;
        document.getElementById('scenario-result').style.display = 'none';
        this.loadScenario();
    }
}

// ===== Security Checklist Manager =====
class SecurityChecklist {
    constructor() {
        this.init();
    }

    init() {
        const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateProgress());
        });
    }

    updateProgress() {
        const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        const checked = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked');
        const progress = (checked.length / checkboxes.length) * 100;
        
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (progressText) {
            if (progress === 100) {
                progressText.innerHTML = '🎉 ¡Felicitaciones! Eres un experto en seguridad digital';
                progressText.style.color = 'var(--success-color)';
                this.celebrateCompletion();
            } else {
                const remaining = checkboxes.length - checked.length;
                progressText.innerHTML = `Te faltan ${remaining} elementos para ser un experto en seguridad`;
                progressText.style.color = 'var(--text-secondary)';
            }
        }
    }

    celebrateCompletion() {
        // Add celebration animation
        setTimeout(() => {
            const checklist = document.querySelector('.security-checklist');
            if (checklist) {
                checklist.style.transform = 'scale(1.02)';
                checklist.style.boxShadow = '0 0 20px rgba(46, 204, 113, 0.3)';
                
                setTimeout(() => {
                    checklist.style.transform = 'scale(1)';
                    checklist.style.boxShadow = 'none';
                }, 500);
            }
        }, 100);
    }
}

// ===== Scroll Animation Manager =====
class ScrollAnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.addFadeInClasses();
    }

    addFadeInClasses() {
        const elementsToAnimate = document.querySelectorAll('.content-card, .game-container, .section-header');
        elementsToAnimate.forEach(el => {
            el.classList.add('fade-in');
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
}

// ===== Utility Functions =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function checkPassword() {
    // This is called by the global password checker instance
    const input = document.getElementById('password-input');
    if (input && passwordChecker) {
        passwordChecker.checkPassword(input.value);
    }
}

// ===== Initialize Application =====
let themeManager;
let navigationManager;
let passwordChecker;
let phishingQuiz;
let socialGame;
let securityChecklist;
let scrollAnimationManager;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    themeManager = new ThemeManager();
    navigationManager = new NavigationManager();
    passwordChecker = new PasswordChecker();
    phishingQuiz = new PhishingQuiz();
    socialGame = new SocialMediaGame();
    securityChecklist = new SecurityChecklist();
    scrollAnimationManager = new ScrollAnimationManager();
    
    // Add loading states
    document.body.classList.add('loaded');
    
    // Preload critical resources
    preloadResources();
    
    // Setup error handling
    setupErrorHandling();
    
    console.log('🛡️ CiberNiños - Aplicación iniciada correctamente');
});

// ===== Resource Preloading =====
function preloadResources() {
    // Preload Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'style';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(fontLink);
    
    // Preload Font Awesome
    const faLink = document.createElement('link');
    faLink.rel = 'preload';
    faLink.as = 'style';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(faLink);
}

// ===== Error Handling =====
function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('Error en la aplicación:', e.error);
        // Optionally show user-friendly error message
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Promise rechazado:', e.reason);
        e.preventDefault();
    });
}

// ===== Performance Monitoring =====
window.addEventListener('load', () => {
    // Monitor loading performance
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`⚡ Aplicación cargada en ${Math.round(loadTime)}ms`);
    }
});

// ===== Accessibility Enhancements =====
document.addEventListener('keydown', (e) => {
    // Handle escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            navigationManager.animateMenuButton(menuBtn, false);
        }
    }
});

// ===== Export for global access =====
window.scrollToSection = scrollToSection;
window.checkPassword = checkPassword;