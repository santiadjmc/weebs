/**
 * CiberKids - Main JavaScript File
 * Interactive cybersecurity education for children
 */

// DOM Content Loaded - Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the main application
 */
function initializeApp() {
    initializeTheme();
    initializeMobileMenu();
    initializeNavigation();
    initializeScrollAnimations();
    initializePasswordGenerator();
    initializePhishingGame();
    initializeSocialQuiz();
    initializePrivacySimulator();
    initializeSecurityChecklist();
    initializeFinalQuiz();
    
    console.log('CiberKids app initialized successfully! 🛡️');
}

/**
 * Theme Management
 */
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add animation class for smooth transition
            themeToggle.classList.add('animate-pulse');
            setTimeout(() => {
                themeToggle.classList.remove('animate-pulse');
            }, 300);
        });
    }
}

/**
 * Mobile Menu Management
 */
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            } else {
                navMenu.classList.add('active');
                mobileMenuToggle.classList.add('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/**
 * Navigation and Smooth Scrolling
 */
function initializeNavigation() {
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('.education-section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
}

/**
 * Smooth scrolling for navigation links and buttons
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Scroll animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Add scroll reveal class to elements
    const elementsToAnimate = document.querySelectorAll('.content-card, .interactive-game, .section-header');
    elementsToAnimate.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

/**
 * Password Generator Game
 */
function initializePasswordGenerator() {
    const generateBtn = document.getElementById('generate-password');
    const passwordResult = document.getElementById('generated-password');
    const strengthIndicator = document.getElementById('password-strength');
    
    if (generateBtn && passwordResult && strengthIndicator) {
        generateBtn.addEventListener('click', function() {
            generatePassword();
            generateBtn.classList.add('animate-pulse');
            setTimeout(() => {
                generateBtn.classList.remove('animate-pulse');
            }, 300);
        });
    }
    
    function generatePassword() {
        const wordInput = document.getElementById('password-word');
        const numberInput = document.getElementById('password-number');
        const symbolSelect = document.getElementById('password-symbol');
        
        const word = wordInput.value.trim() || 'Seguro';
        const number = numberInput.value || '2023';
        const symbol = symbolSelect.value || '$';
        
        // Create password with proper capitalization
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        const generatedPassword = capitalizedWord + number + symbol;
        
        // Display password
        passwordResult.textContent = generatedPassword;
        passwordResult.classList.add('animate-slide-in-up');
        
        // Calculate and display strength
        const strength = calculatePasswordStrength(generatedPassword);
        displayPasswordStrength(strength);
        
        setTimeout(() => {
            passwordResult.classList.remove('animate-slide-in-up');
        }, 600);
    }
    
    function calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score += 2;
        if (password.length >= 12) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 2;
        
        if (score <= 3) return 'weak';
        if (score <= 5) return 'medium';
        return 'strong';
    }
    
    function displayPasswordStrength(strength) {
        strengthIndicator.className = 'strength-indicator';
        
        switch (strength) {
            case 'weak':
                strengthIndicator.classList.add('strength-weak');
                strengthIndicator.textContent = '⚠️ Contraseña Débil - Agrega más caracteres';
                break;
            case 'medium':
                strengthIndicator.classList.add('strength-medium');
                strengthIndicator.textContent = '✅ Contraseña Media - ¡Bastante buena!';
                break;
            case 'strong':
                strengthIndicator.classList.add('strength-strong');
                strengthIndicator.textContent = '🔒 ¡Contraseña Fuerte! - Excelente seguridad';
                break;
        }
        
        strengthIndicator.classList.add('animate-fade-in');
        setTimeout(() => {
            strengthIndicator.classList.remove('animate-fade-in');
        }, 600);
    }
}

/**
 * Utility functions
 */

// Add click animation to buttons
function addClickAnimation(element) {
    element.classList.add('button-click');
    setTimeout(() => {
        element.classList.remove('button-click');
    }, 300);
}

// Show feedback message
function showFeedback(element, message, type) {
    element.textContent = message;
    element.className = 'game-feedback';
    element.classList.add(`feedback-${type}`);
    element.classList.add('animate-slide-in-up');
    
    setTimeout(() => {
        element.classList.remove('animate-slide-in-up');
    }, 600);
}

// Create confetti effect
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = getRandomColor();
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

function getRandomColor() {
    const colors = ['#4f46e5', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Format score display
function formatScore(current, total) {
    return `${current}/${total}`;
}

// Calculate percentage
function calculatePercentage(current, total) {
    return Math.round((current / total) * 100);
}

// Update progress bar
function updateProgressBar(progressBar, percentage) {
    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Debounce function for performance
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

// Accessibility: Announce to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Export functions to global scope for HTML onclick handlers
window.scrollToSection = scrollToSection;
window.addClickAnimation = addClickAnimation;