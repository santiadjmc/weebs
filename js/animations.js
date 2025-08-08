/**
 * CiberKids - Advanced Animations and Interactions
 * Enhanced user experience with smooth animations and microinteractions
 */

/**
 * Initialize advanced animations when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeAdvancedAnimations();
    initializeParticleEffects();
    initializeMicrointeractions();
    initializeScrollEffects();
    initializeLoadingAnimations();
});

/**
 * Advanced animations initialization
 */
function initializeAdvancedAnimations() {
    // Stagger animation for navigation items
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-slide-in-up');
    });
    
    // Hero section elements animation
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroIllustration = document.querySelector('.hero-illustration');
    
    if (heroTitle) {
        heroTitle.classList.add('animate-slide-in-left');
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.animationDelay = '0.3s';
        heroSubtitle.classList.add('animate-slide-in-left');
    }
    
    if (heroButtons) {
        heroButtons.style.animationDelay = '0.6s';
        heroButtons.classList.add('animate-slide-in-up');
    }
    
    if (heroIllustration) {
        heroIllustration.classList.add('animate-slide-in-right');
    }
}

/**
 * Particle effects for enhanced visual appeal
 */
function initializeParticleEffects() {
    // Create floating particles for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        createFloatingParticles(heroSection, 8);
    }
    
    // Create particles for quiz sections
    const quizSection = document.querySelector('.quiz-section');
    if (quizSection) {
        createFloatingParticles(quizSection, 5);
    }
}

function createFloatingParticles(container, count) {
    const particles = [];
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (3 + Math.random() * 2) + 's';
        
        container.appendChild(particle);
        particles.push(particle);
    }
    
    return particles;
}

/**
 * Microinteractions for better user experience
 */
function initializeMicrointeractions() {
    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button, .game-button, .nav-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
        
        button.addEventListener('click', function() {
            this.classList.add('animate-pulse');
            setTimeout(() => {
                this.classList.remove('animate-pulse');
            }, 300);
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.content-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Interactive game elements
    const gameElements = document.querySelectorAll('.interactive-game');
    gameElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Answer options hover effects
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('answer-option')) {
            e.target.classList.add('animate-pulse');
            setTimeout(() => {
                e.target.classList.remove('animate-pulse');
            }, 300);
        }
    });
    
    // Checkbox and toggle interactions
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('label') || this.nextElementSibling;
            if (label) {
                if (this.checked) {
                    label.classList.add('animate-bounce');
                    setTimeout(() => {
                        label.classList.remove('animate-bounce');
                    }, 1000);
                }
            }
        });
    });
}

/**
 * Advanced scroll effects
 */
function initializeScrollEffects() {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Navbar background opacity on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const opacity = Math.min(scrolled / 100, 0.95);
            header.style.background = `rgba(255, 255, 255, ${opacity})`;
            
            // Add shadow on scroll
            if (scrolled > 50) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '';
            }
        });
    }
    
    // Section reveal animation
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                
                // Animate child elements with stagger
                const children = entry.target.querySelectorAll('.content-card, .feature-list li');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-slide-in-up');
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    const sections = document.querySelectorAll('.education-section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Progress bar animation on scroll
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.dataset.width || '0%';
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 500);
            }
        });
    });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

/**
 * Loading animations and states
 */
function initializeLoadingAnimations() {
    // Add loading animation to buttons that trigger async actions
    const asyncButtons = document.querySelectorAll('[data-async]');
    asyncButtons.forEach(button => {
        button.addEventListener('click', function() {
            showButtonLoading(this);
            
            // Remove loading after specified time or default 2 seconds
            const loadingTime = this.dataset.loadingTime || 2000;
            setTimeout(() => {
                hideButtonLoading(this);
            }, loadingTime);
        });
    });
}

function showButtonLoading(button) {
    const originalText = button.textContent;
    button.dataset.originalText = originalText;
    button.disabled = true;
    button.innerHTML = '<span class="loading-spinner"></span> Cargando...';
    button.classList.add('loading');
}

function hideButtonLoading(button) {
    const originalText = button.dataset.originalText;
    button.disabled = false;
    button.textContent = originalText;
    button.classList.remove('loading');
    delete button.dataset.originalText;
}

/**
 * Enhanced confetti effect
 */
function createEnhancedConfetti(duration = 3000) {
    const colors = ['#4f46e5', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6'];
    const shapes = ['square', 'circle', 'triangle'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.className = `confetti confetti-${shape}`;
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = color;
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (duration / 1000) + 's';
        
        // Different shapes
        if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
            confetti.style.width = '0';
            confetti.style.height = '0';
            confetti.style.backgroundColor = 'transparent';
            confetti.style.borderLeft = '5px solid transparent';
            confetti.style.borderRight = '5px solid transparent';
            confetti.style.borderBottom = `10px solid ${color}`;
        }
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, duration);
    }
}

/**
 * Typewriter effect for text
 */
function typewriterEffect(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        
        if (i > text.length) {
            clearInterval(timer);
        }
    }, speed);
}

/**
 * Number counting animation
 */
function animateNumber(element, start, end, duration = 2000) {
    const startTime = performance.now();
    const startValue = parseInt(start);
    const endValue = parseInt(end);
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.round(startValue + (endValue - startValue) * easeOutQuart);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Advanced scroll to section with offset
 */
function smoothScrollToSection(sectionId, offset = 80) {
    const section = document.getElementById(sectionId);
    if (section) {
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

/**
 * Page transition effects
 */
function initializePageTransitions() {
    // Fade in page on load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
    // Add page transition for navigation
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Add transition effect
            document.body.style.transition = 'opacity 0.3s ease-in-out';
            document.body.style.opacity = '0.7';
            
            setTimeout(() => {
                smoothScrollToSection(targetId);
                document.body.style.opacity = '1';
            }, 150);
        });
    });
}

/**
 * Enhanced theme transition
 */
function enhanceThemeTransition() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Smooth transition for all elements
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                if (!el.style.transition) {
                    el.style.transition = 'all 0.3s ease-in-out';
                }
            });
        });
    }
}

/**
 * Interactive background effects
 */
function initializeInteractiveBackground() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            this.style.backgroundPosition = `${x * 20}px ${y * 20}px`;
        });
    }
}

/**
 * Sound effects (optional - can be enabled with sound files)
 */
function initializeSoundEffects() {
    // Success sound for correct answers
    function playSuccessSound() {
        // Placeholder for success sound
        console.log('🔊 Success sound would play here');
    }
    
    // Error sound for incorrect answers
    function playErrorSound() {
        // Placeholder for error sound
        console.log('🔊 Error sound would play here');
    }
    
    // Click sound for buttons
    function playClickSound() {
        // Placeholder for click sound
        console.log('🔊 Click sound would play here');
    }
    
    // Export to global scope
    window.playSuccessSound = playSuccessSound;
    window.playErrorSound = playErrorSound;
    window.playClickSound = playClickSound;
}

/**
 * Performance optimized animation frame
 */
let animationFrameId;
function optimizedAnimation(callback) {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    animationFrameId = requestAnimationFrame(callback);
}

/**
 * Reduced motion detection and handling
 */
function handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
        
        console.log('♿ Reduced motion preferences detected - animations disabled');
    }
}

/**
 * Initialize all advanced animations
 */
function initializeAllAdvancedAnimations() {
    handleReducedMotion();
    initializePageTransitions();
    enhanceThemeTransition();
    initializeInteractiveBackground();
    initializeSoundEffects();
}

// Initialize advanced animations on DOM content loaded
document.addEventListener('DOMContentLoaded', initializeAllAdvancedAnimations);

// Export functions to global scope
window.createEnhancedConfetti = createEnhancedConfetti;
window.typewriterEffect = typewriterEffect;
window.animateNumber = animateNumber;
window.smoothScrollToSection = smoothScrollToSection;
window.showButtonLoading = showButtonLoading;
window.hideButtonLoading = hideButtonLoading;