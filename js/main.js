// Main JavaScript functionality for CyberNiños application

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    console.log('🚀 CyberNiños Application Initialized');
    
    // Initialize components
    initializeNavigation();
    initializeScrollEffects();
    initializeCardInteractions();
    initializeProgressTracking();
    initializeSmoothScrolling();
    initializeAccessibility();
    initializePerformanceOptimizations();
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            const isExpanded = navMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            mobileMenuToggle.setAttribute('aria-label', 
                isExpanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
            );
        });
    }

    // Active navigation link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.focus();
        }
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Navbar scroll effect
    const navbar = document.querySelector('.main-nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove navbar background on scroll
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        // Update for dark theme
        if (document.body.getAttribute('data-theme') === 'dark') {
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(26, 32, 44, 0.98)';
            } else {
                navbar.style.background = 'rgba(26, 32, 44, 0.95)';
            }
        }

        lastScrollTop = scrollTop;
    }, { passive: true });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.learning-card, .section-title, .overall-progress');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Card interactions and effects
function initializeCardInteractions() {
    const learningCards = document.querySelectorAll('.learning-card');
    
    learningCards.forEach((card, index) => {
        // Add stagger delay for entrance animations
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Card click handlers
        const cardButton = card.querySelector('.card-button');
        const section = card.getAttribute('data-section');
        
        if (cardButton) {
            cardButton.addEventListener('click', function() {
                handleCardClick(section, card);
            });
        }

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            
            // Add glow effect
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.animation = 'pulse 1.5s ease infinite';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Remove glow effect
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });

        // Keyboard interaction
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(section, card);
            }
        });
    });
}

// Handle card click actions
function handleCardClick(section, cardElement) {
    console.log(`📚 Opening section: ${section}`);
    
    // Add click animation
    cardElement.style.transform = 'scale(0.98)';
    setTimeout(() => {
        cardElement.style.transform = 'translateY(-12px) scale(1.02)';
    }, 100);

    // Show loading state
    const button = cardElement.querySelector('.card-button');
    const originalText = button.textContent;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
    button.disabled = true;

    // Simulate loading and navigation
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Here you would typically navigate to the specific section
        if (section === 'passwords') {
            showPasswordSection();
        } else if (section === 'phishing') {
            showPhishingSection();
        } else if (section === 'social-media') {
            showSocialMediaSection();
        } else if (section === 'privacy') {
            showPrivacySection();
        } else if (section === 'device-usage') {
            showDeviceUsageSection();
        } else if (section === 'games') {
            showGamesSection();
        }
        
        // Update progress
        updateProgress(section);
        
        // Show success feedback
        showNotification(`¡Has abierto la sección ${getSectionName(section)}!`, 'success');
    }, 1500);
}

// Get section display name
function getSectionName(section) {
    const sectionNames = {
        'passwords': 'Contraseñas Seguras',
        'phishing': 'Conciencia sobre Phishing',
        'social-media': 'Redes Sociales Seguras',
        'privacy': 'Privacidad en Línea',
        'device-usage': 'Uso Responsable de Dispositivos',
        'games': 'Juegos Divertidos'
    };
    return sectionNames[section] || section;
}

// Section display functions (placeholders for future implementation)
function showPasswordSection() {
    console.log('🔑 Showing Password Section');
    // Future: Navigate to passwords.html or show inline content
}

function showPhishingSection() {
    console.log('🎣 Showing Phishing Section');
    // Future: Navigate to phishing.html or show inline content
}

function showSocialMediaSection() {
    console.log('👥 Showing Social Media Section');
    // Future: Navigate to social-media.html or show inline content
}

function showPrivacySection() {
    console.log('🕵️ Showing Privacy Section');
    // Future: Navigate to privacy.html or show inline content
}

function showDeviceUsageSection() {
    console.log('📱 Showing Device Usage Section');
    // Future: Navigate to device-usage.html or show inline content
}

function showGamesSection() {
    console.log('🎮 Showing Games Section');
    // Future: Navigate to games section or show inline content
    showNotification('¡Los juegos estarán disponibles pronto! 🎮', 'info');
}

// Progress tracking system
function initializeProgressTracking() {
    const progress = getStoredProgress();
    updateProgressDisplay(progress);
    updateOverallProgress(progress);
}

function getStoredProgress() {
    return JSON.parse(localStorage.getItem('cyberNinosProgress')) || {
        passwords: 0,
        phishing: 0,
        socialMedia: 0,
        privacy: 0,
        deviceUsage: 0,
        overall: 0
    };
}

function updateProgress(section) {
    const progress = getStoredProgress();
    
    // Increment progress for the section
    if (progress[section] < 100) {
        progress[section] = Math.min(progress[section] + 20, 100);
    }
    
    // Calculate overall progress
    const sections = ['passwords', 'phishing', 'socialMedia', 'privacy', 'deviceUsage'];
    const totalProgress = sections.reduce((sum, sec) => sum + progress[sec], 0);
    progress.overall = Math.round(totalProgress / sections.length);
    
    // Store updated progress
    localStorage.setItem('cyberNinosProgress', JSON.stringify(progress));
    
    // Update display
    updateProgressDisplay(progress);
    updateOverallProgress(progress);
    
    // Check for achievements
    checkAchievements(progress);
}

function updateProgressDisplay(progress) {
    const cards = document.querySelectorAll('.learning-card');
    
    cards.forEach(card => {
        const section = card.getAttribute('data-section');
        const progressFill = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.progress-text');
        
        if (progressFill && progressText && progress[section] !== undefined) {
            progressFill.style.width = `${progress[section]}%`;
            progressText.textContent = `${progress[section]}% completado`;
            
            // Add completion effects
            if (progress[section] === 100) {
                card.classList.add('completed');
                progressText.innerHTML = '<i class="fas fa-check"></i> ¡Completado!';
            }
        }
    });
}

function updateOverallProgress(progress) {
    const progressRing = document.querySelector('.progress-ring-circle');
    const progressPercentage = document.querySelector('.progress-percentage');
    const progressInfo = document.querySelector('.progress-info h3');
    
    if (progressRing && progressPercentage) {
        const circumference = 2 * Math.PI * 52; // radius = 52
        const offset = circumference - (progress.overall / 100) * circumference;
        
        progressRing.style.strokeDashoffset = offset;
        progressPercentage.textContent = `${progress.overall}%`;
        
        // Update progress message
        if (progressInfo) {
            if (progress.overall === 0) {
                progressInfo.textContent = '¡Estás empezando tu aventura!';
            } else if (progress.overall < 25) {
                progressInfo.textContent = '¡Gran comienzo, sigue así!';
            } else if (progress.overall < 50) {
                progressInfo.textContent = '¡Vas por buen camino!';
            } else if (progress.overall < 75) {
                progressInfo.textContent = '¡Excelente progreso!';
            } else if (progress.overall < 100) {
                progressInfo.textContent = '¡Casi eres un experto!';
            } else {
                progressInfo.textContent = '¡Eres un Cyber-Héroe!';
            }
        }
    }
}

function checkAchievements(progress) {
    const achievements = document.querySelectorAll('.achievement');
    
    achievements.forEach((achievement, index) => {
        const achievementThresholds = [25, 50, 75]; // Progress thresholds for achievements
        
        if (progress.overall >= achievementThresholds[index] && achievement.classList.contains('locked')) {
            achievement.classList.remove('locked');
            achievement.style.animation = 'scaleIn 0.5s ease forwards';
            
            // Show achievement notification
            const achievementNames = ['Explorador Digital', 'Guardián de Contraseñas', 'Detective Anti-Phishing'];
            showNotification(`¡Logro desbloqueado: ${achievementNames[index]}! 🏆`, 'success');
        }
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const startLearningBtn = document.getElementById('startLearning');
    
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            const learningSection = document.querySelector('.learning-sections');
            if (learningSection) {
                learningSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Accessibility enhancements
function initializeAccessibility() {
    // Keyboard navigation for cards
    const cards = document.querySelectorAll('.learning-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Explorar sección: ${card.querySelector('.card-title').textContent}`);
    });

    // Focus management
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const activeMenu = document.querySelector('.nav-menu.active');
            if (activeMenu) {
                activeMenu.classList.remove('active');
                document.querySelector('.mobile-menu-toggle').classList.remove('active');
            }
        }
        
        // Tab key navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Screen reader announcements
    const announcer = createScreenReaderAnnouncer();
    
    function announceToScreenReader(message) {
        announcer.textContent = message;
    }
    
    // Make announcer globally available
    window.announceToScreenReader = announceToScreenReader;
}

function createScreenReaderAnnouncer() {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);
    return announcer;
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Lazy loading for images (when implemented)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Throttled scroll event handler
    let ticking = false;
    function updateOnScroll() {
        // Perform scroll-based updates here
        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });

    // Prefetch important resources
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Prefetch critical resources when browser is idle
            const criticalResources = [
                'css/styles.css',
                'css/animations.css',
                'css/responsive.css'
            ];

            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = resource;
                document.head.appendChild(link);
            });
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Cerrar notificación">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#06d6a0' : type === 'error' ? '#ff006e' : '#4c6ef5',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        maxWidth: '400px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            closeNotification(notification);
        }
    }, 5000);

    // Screen reader announcement
    if (window.announceToScreenReader) {
        window.announceToScreenReader(message);
    }
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Ha ocurrido un error inesperado. Por favor, recarga la página.', 'error');
});

// Service Worker registration (for future PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for testing (if in test environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        handleCardClick,
        updateProgress,
        showNotification
    };
}