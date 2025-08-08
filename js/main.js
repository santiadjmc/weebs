/**
 * CyberKids Main JavaScript File
 * Interactive cybersecurity education application for children
 */

// =================================
// GLOBAL VARIABLES & CONSTANTS
// =================================

const APP_NAME = 'CyberKids';
let currentTheme = 'light';
let userScore = 0;
let isGameActive = false;

// =================================
// DOM ELEMENTS
// =================================

const themeToggleBtn = document.getElementById('theme-toggle-btn');
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;
const startLearningBtn = document.getElementById('start-learning');
const playGameBtn = document.getElementById('play-game');

// =================================
// THEME MANAGEMENT
// =================================

/**
 * Initialize theme based on user preference or system setting
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('cyberkids-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        currentTheme = savedTheme;
    } else {
        currentTheme = systemPrefersDark ? 'dark' : 'light';
    }
    
    applyTheme(currentTheme);
}

/**
 * Apply theme to the document
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        currentTheme = 'dark';
    } else {
        body.classList.remove('dark-theme');
        currentTheme = 'light';
    }
    
    localStorage.setItem('cyberkids-theme', currentTheme);
    
    // Add smooth transition for theme change
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    
    // Add a fun animation to the toggle button
    themeToggleBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggleBtn.style.transform = 'scale(1)';
    }, 150);
}

// =================================
// NAVIGATION MANAGEMENT
// =================================

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    
    // Update aria attributes for accessibility
    const isExpanded = navMenu.classList.contains('active');
    mobileToggle.setAttribute('aria-expanded', isExpanded);
    
    // Prevent body scrolling when menu is open
    if (isExpanded) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

/**
 * Close mobile menu when clicking on a nav link
 */
function closeMobileMenu() {
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
}

/**
 * Smooth scroll to target section
 * @param {string} targetId - ID of the target element
 */
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPos = window.scrollY + 100; // Offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// =================================
// SCROLL ANIMATIONS
// =================================

/**
 * Initialize Intersection Observer for scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation to children if they exist
                const staggerElements = entry.target.querySelectorAll('.stagger-animation');
                if (staggerElements.length > 0) {
                    staggerElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('show');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale');
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Update scroll progress indicator
 */
function updateScrollProgress() {
    const scrollIndicator = document.querySelector('.scroll-progress');
    if (scrollIndicator) {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        
        scrollIndicator.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
}

// =================================
// PASSWORD GENERATOR FUNCTIONALITY
// =================================

/**
 * Generate a secure password from user input phrase
 * @param {string} phrase - User input phrase
 * @returns {string} - Generated secure password
 */
function generateSecurePassword(phrase) {
    if (!phrase || phrase.trim().length < 3) {
        return '';
    }
    
    // Transform the phrase into a secure password
    let password = phrase.trim();
    
    // Replace spaces with special characters
    password = password.replace(/\s+/g, '_');
    
    // Replace some letters with numbers (leetspeak style)
    const replacements = {
        'a': '@', 'A': '@',
        'e': '3', 'E': '3',
        'i': '1', 'I': '1',
        'o': '0', 'O': '0',
        's': '$', 'S': '$'
    };
    
    // Apply replacements randomly (not all letters)
    Object.entries(replacements).forEach(([letter, replacement]) => {
        password = password.replace(new RegExp(letter, 'g'), (match, offset) => {
            // Replace every other occurrence
            return offset % 2 === 0 ? replacement : match;
        });
    });
    
    // Add random numbers at the end
    const currentYear = new Date().getFullYear();
    password += currentYear;
    
    // Add a special character at the end
    const specialChars = ['!', '@', '#', '$', '%', '&', '*'];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
    
    return password;
}

/**
 * Display generated password with animation
 * @param {string} password - Generated password
 */
function displayGeneratedPassword(password) {
    const displayElement = document.getElementById('generated-password-display');
    if (displayElement) {
        displayElement.textContent = password;
        displayElement.classList.remove('show');
        
        setTimeout(() => {
            displayElement.classList.add('show');
        }, 100);
        
        // Add copy to clipboard functionality
        displayElement.style.cursor = 'pointer';
        displayElement.title = 'Clic para copiar';
        
        displayElement.onclick = () => {
            navigator.clipboard.writeText(password).then(() => {
                showNotification('¡Contraseña copiada!', 'success');
            });
        };
    }
}

// =================================
// NOTIFICATION SYSTEM
// =================================

/**
 * Show notification to user
 * @param {string} message - Notification message
 * @param {string} type - 'success', 'error', 'info', 'warning'
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--surface-color);
        color: var(--text-color);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: var(--shadow-large);
        border-left: 4px solid var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'primary'}-color);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Get appropriate icon for notification type
 * @param {string} type - Notification type
 * @returns {string} - Font Awesome icon class
 */
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// =================================
// CONFETTI ANIMATION
// =================================

/**
 * Create confetti animation for celebrations
 */
function createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            left: ${Math.random() * 100}vw;
            animation-delay: ${Math.random() * 3}s;
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
        `;
        document.body.appendChild(confetti);
        
        // Remove after animation completes
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// =================================
// UTILITY FUNCTIONS
// =================================

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
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
 * Check if device is mobile
 * @returns {boolean} - True if mobile device
 */
function isMobileDevice() {
    return window.innerWidth <= 768;
}

/**
 * Get random element from array
 * @param {Array} array - Input array
 * @returns {*} - Random element
 */
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// =================================
// KEYBOARD NAVIGATION
// =================================

/**
 * Handle keyboard navigation for accessibility
 * @param {Event} event - Keyboard event
 */
function handleKeyboardNavigation(event) {
    if (event.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
    
    if (event.key === 'Tab') {
        // Ensure focus is visible
        document.body.classList.add('keyboard-navigation');
    }
}

// =================================
// EVENT LISTENERS SETUP
// =================================

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Theme toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
            closeMobileMenu();
        });
    });
    
    // Hero buttons
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', () => {
            smoothScrollTo('contraseñas');
            showNotification('¡Comencemos a aprender!', 'success');
        });
    }
    
    if (playGameBtn) {
        playGameBtn.addEventListener('click', () => {
            smoothScrollTo('phishing');
            showNotification('¡Hora de jugar!', 'info');
        });
    }
    
    // Password generator
    const generatePasswordBtn = document.getElementById('generate-password');
    const passwordPhraseInput = document.getElementById('password-phrase');
    
    if (generatePasswordBtn && passwordPhraseInput) {
        generatePasswordBtn.addEventListener('click', () => {
            const phrase = passwordPhraseInput.value;
            if (!phrase.trim()) {
                showNotification('Por favor, escribe una frase primero', 'warning');
                passwordPhraseInput.focus();
                return;
            }
            
            const password = generateSecurePassword(phrase);
            if (password) {
                displayGeneratedPassword(password);
                showNotification('¡Contraseña generada exitosamente!', 'success');
            }
        });
        
        // Generate on Enter key
        passwordPhraseInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                generatePasswordBtn.click();
            }
        });
    }
    
    // Scroll events
    window.addEventListener('scroll', debounce(() => {
        updateActiveNavLink();
        updateScrollProgress();
    }, 100));
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Mouse events for keyboard navigation detection
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Window resize events
    window.addEventListener('resize', debounce(() => {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 250));
    
    // Handle focus events for better accessibility
    document.querySelectorAll('button, a, input, textarea, select').forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

// =================================
// PERFORMANCE OPTIMIZATION
// =================================

/**
 * Lazy load images when they come into viewport
 */
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// =================================
// INITIALIZATION
// =================================

/**
 * Initialize the application
 */
function initializeApp() {
    console.log(`🎮 ${APP_NAME} - Initializing...`);
    
    // Initialize theme
    initializeTheme();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Setup lazy loading
    setupLazyLoading();
    
    // Create scroll progress indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '<div class="scroll-progress"></div>';
    document.body.appendChild(scrollIndicator);
    
    console.log(`✅ ${APP_NAME} - Initialized successfully!`);
    
    // Show welcome message
    setTimeout(() => {
        showNotification('¡Bienvenido a CyberKids! 🎉', 'success');
    }, 1000);
}

// =================================
// START APPLICATION
// =================================

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('👋 CyberKids paused');
    } else {
        console.log('🎮 CyberKids resumed');
    }
});

// Export functions for external use (if needed)
window.CyberKids = {
    showNotification,
    createConfetti,
    toggleTheme,
    smoothScrollTo
};