// Main JavaScript for CiberKids application
// All code and comments in English, UI text in Spanish

class CiberKidsApp {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.screenTimeMinutes = parseInt(localStorage.getItem('screenTime')) || 0;
        this.phishingScore = 0;
        this.currentTipIndex = 0;
        this.currentQuestionIndex = 0;
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupProgressBar();
        this.setupPasswordGenerator();
        this.initializeGames();
        this.setupScreenTimeTracker();
        this.setupEventListeners();
        this.loadContent();
    }

    // Theme Management
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeToggle = document.getElementById('theme-toggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        
        // Animate theme transition
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // Navigation
    setupNavigation() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
                mobileToggle.setAttribute('aria-expanded', !isExpanded);
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    navMenu?.classList.remove('active');
                    mobileToggle?.classList.remove('active');
                    mobileToggle?.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Scroll Animations and Progress Bar
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe sections for animations
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease';
            observer.observe(section);
        });
    }

    setupProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            if (progressBar) {
                progressBar.style.width = scrolled + '%';
            }
        });
    }

    // Password Generator
    setupPasswordGenerator() {
        const lengthSlider = document.getElementById('password-length');
        const lengthDisplay = document.getElementById('length-display');
        
        if (lengthSlider && lengthDisplay) {
            lengthSlider.addEventListener('input', (e) => {
                lengthDisplay.textContent = e.target.value;
                this.generatePassword(); // Auto-generate on settings change
            });
        }

        // Auto-generate on checkbox changes
        document.querySelectorAll('#include-uppercase, #include-lowercase, #include-numbers, #include-symbols').forEach(checkbox => {
            checkbox?.addEventListener('change', () => this.generatePassword());
        });
    }

    generatePassword() {
        const length = parseInt(document.getElementById('password-length')?.value || 12);
        const includeUpper = document.getElementById('include-uppercase')?.checked;
        const includeLower = document.getElementById('include-lowercase')?.checked;
        const includeNumbers = document.getElementById('include-numbers')?.checked;
        const includeSymbols = document.getElementById('include-symbols')?.checked;

        let charset = '';
        if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (!charset) {
            charset = 'abcdefghijklmnopqrstuvwxyz'; // Fallback
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        const passwordDisplay = document.getElementById('password-display');
        if (passwordDisplay) {
            passwordDisplay.value = password;
            this.updatePasswordStrength(password);
        }
    }

    updatePasswordStrength(password) {
        const strengthBar = document.getElementById('strength-bar');
        const strengthText = document.getElementById('strength-text');
        
        if (!strengthBar || !strengthText) return;

        let score = 0;
        const checks = {
            length: password.length >= 8,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };

        score = Object.values(checks).filter(Boolean).length;

        // Remove previous classes
        strengthBar.className = 'strength-bar';
        
        if (score <= 2) {
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Fortaleza: Débil 😟';
            strengthText.style.color = 'var(--accent-color)';
        } else if (score === 3) {
            strengthBar.classList.add('fair');
            strengthText.textContent = 'Fortaleza: Aceptable 😐';
            strengthText.style.color = 'var(--warning-color)';
        } else if (score === 4) {
            strengthBar.classList.add('good');
            strengthText.textContent = 'Fortaleza: Buena 😊';
            strengthText.style.color = 'var(--kid-orange)';
        } else {
            strengthBar.classList.add('strong');
            strengthText.textContent = 'Fortaleza: ¡Súper Fuerte! 🛡️';
            strengthText.style.color = 'var(--success-color)';
        }
    }

    // Screen Time Tracker
    setupScreenTimeTracker() {
        this.updateScreenTimeDisplay();
    }

    addScreenTime(activity, minutes) {
        this.screenTimeMinutes += minutes;
        localStorage.setItem('screenTime', this.screenTimeMinutes.toString());
        this.updateScreenTimeDisplay();
        this.showScreenTimeRecommendation();
    }

    updateScreenTimeDisplay() {
        const display = document.getElementById('screen-time');
        if (display) {
            const hours = Math.floor(this.screenTimeMinutes / 60);
            const minutes = this.screenTimeMinutes % 60;
            display.textContent = `${hours}h ${minutes}m`;
        }
    }

    showScreenTimeRecommendation() {
        const recommendations = document.getElementById('time-recommendations');
        if (!recommendations) return;

        let message = '';
        const totalHours = this.screenTimeMinutes / 60;

        if (totalHours < 2) {
            message = '¡Excelente! Tienes un uso muy equilibrado de la pantalla. 😊';
        } else if (totalHours < 4) {
            message = 'Buen trabajo, pero considera tomar un descanso pronto. 👍';
        } else if (totalHours < 6) {
            message = 'Has usado mucho tiempo de pantalla hoy. ¿Qué tal si haces otra actividad? 🌳';
        } else {
            message = '¡Es hora de un descanso largo! Ve a jugar afuera o lee un libro. 📚';
        }

        recommendations.innerHTML = `<p>${message}</p>`;
        
        // Add visual feedback
        if (totalHours > 4) {
            recommendations.style.background = 'rgba(231, 76, 60, 0.2)';
            recommendations.style.color = 'var(--accent-color)';
        } else {
            recommendations.style.background = 'rgba(39, 174, 96, 0.2)';
            recommendations.style.color = 'var(--success-color)';
        }
    }

    resetScreenTime() {
        this.screenTimeMinutes = 0;
        localStorage.setItem('screenTime', '0');
        this.updateScreenTimeDisplay();
        
        const recommendations = document.getElementById('time-recommendations');
        if (recommendations) {
            recommendations.innerHTML = '<p>¡Nuevo día, nuevas oportunidades para un uso equilibrado! 🌅</p>';
            recommendations.style.background = 'rgba(74, 144, 226, 0.2)';
            recommendations.style.color = 'var(--primary-color)';
        }
    }

    // Privacy Meter
    updatePrivacyMeter() {
        const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const totalCount = checkboxes.length;
        const percentage = (checkedCount / totalCount) * 100;

        const meterBar = document.getElementById('privacy-meter-bar');
        const meterText = document.getElementById('privacy-level');

        if (meterBar) {
            meterBar.style.width = percentage + '%';
        }

        if (meterText) {
            if (percentage < 40) {
                meterText.textContent = 'Nivel Básico - ¡Necesitas mejorar!';
                meterText.style.color = 'var(--accent-color)';
            } else if (percentage < 70) {
                meterText.textContent = 'Nivel Intermedio - ¡Vas por buen camino!';
                meterText.style.color = 'var(--warning-color)';
            } else if (percentage < 90) {
                meterText.textContent = 'Nivel Avanzado - ¡Muy bien!';
                meterText.style.color = 'var(--kid-orange)';
            } else {
                meterText.textContent = '¡Nivel Experto! - ¡Eres un ninja digital!';
                meterText.style.color = 'var(--success-color)';
            }
        }
    }

    // Tab Management
    showTab(tabId) {
        // Hide all tab panels
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        // Remove active class from all tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab panel
        const targetPanel = document.getElementById(tabId);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }

        // Add active class to clicked tab button
        const targetBtn = document.querySelector(`[onclick="showTab('${tabId}')"]`);
        if (targetBtn) {
            targetBtn.classList.add('active');
        }
    }

    // Tips Carousel
    initTipsCarousel() {
        this.tipSlides = document.querySelectorAll('.tip-slide');
        this.showCurrentTip();
    }

    showCurrentTip() {
        if (!this.tipSlides.length) return;
        
        this.tipSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentTipIndex);
        });
    }

    nextTip() {
        if (!this.tipSlides.length) return;
        
        this.currentTipIndex = (this.currentTipIndex + 1) % this.tipSlides.length;
        this.showCurrentTip();
    }

    previousTip() {
        if (!this.tipSlides.length) return;
        
        this.currentTipIndex = (this.currentTipIndex - 1 + this.tipSlides.length) % this.tipSlides.length;
        this.showCurrentTip();
    }

    // Modal Management
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            
            // Focus management for accessibility
            const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    }

    closeModal() {
        const activeModal = document.querySelector('.modal.show');
        if (activeModal) {
            activeModal.classList.remove('show');
            activeModal.setAttribute('aria-hidden', 'true');
        }
    }

    showQuickTips() {
        this.showModal('quick-tips-modal');
    }

    showHelp() {
        alert('Centro de Ayuda - Aquí encontrarás recursos adicionales para aprender más sobre ciberseguridad.');
    }

    showParentGuide() {
        alert('Guía para Padres - Consejos para que los padres apoyen el aprendizaje de ciberseguridad de sus hijos.');
    }

    showGlossary() {
        alert('Glosario - Definiciones de términos importantes de ciberseguridad para niños.');
    }

    // Game Initialization
    initializeGames() {
        // Wait for games to be loaded before initializing
        if (window.ciberGames) {
            window.ciberGames.loadPasswordQuiz();
            window.ciberGames.loadPhishingGame();
            window.ciberGames.loadSocialScenarios();
            window.ciberGames.loadFinalQuiz();
        } else {
            // Retry after a short delay if games aren't loaded yet
            setTimeout(() => this.initializeGames(), 100);
        }
        this.initTipsCarousel();
    }

    // Load dynamic content
    loadContent() {
        // This method can be extended to load content from external sources
        console.log('Content loaded successfully');
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Keyboard navigation for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle any form submissions here
        });
    }

    // Utility Functions
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerOffset = 80;
            const elementPosition = section.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Accessibility helpers
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.classList.add('sr-only');
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Global functions for HTML onclick events
function generatePassword() {
    window.ciberKidsApp.generatePassword();
}

function updatePrivacyMeter() {
    window.ciberKidsApp.updatePrivacyMeter();
}

function showTab(tabId) {
    window.ciberKidsApp.showTab(tabId);
}

function nextTip() {
    window.ciberKidsApp.nextTip();
}

function previousTip() {
    window.ciberKidsApp.previousTip();
}

function addScreenTime(activity, minutes) {
    window.ciberKidsApp.addScreenTime(activity, minutes);
}

function resetScreenTime() {
    window.ciberKidsApp.resetScreenTime();
}

function scrollToSection(sectionId) {
    window.ciberKidsApp.scrollToSection(sectionId);
}

function showQuickTips() {
    window.ciberKidsApp.showQuickTips();
}

function showHelp() {
    window.ciberKidsApp.showHelp();
}

function showParentGuide() {
    window.ciberKidsApp.showParentGuide();
}

function showGlossary() {
    window.ciberKidsApp.showGlossary();
}

function closeModal() {
    window.ciberKidsApp.closeModal();
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ciberKidsApp = new CiberKidsApp();
    
    // Add some fun loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Service Worker registration for offline support (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}