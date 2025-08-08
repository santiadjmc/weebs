// Advanced Animations and Microinteractions for CiberKids
// All code and comments in English, using GSAP-style animations without external dependencies

class CiberAnimations {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        if (this.isReducedMotion) {
            console.log('Reduced motion preference detected - minimal animations enabled');
            return;
        }

        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupButtonAnimations();
        this.setupLoadingAnimations();
        this.setupParallaxEffects();
        this.setupCountUpAnimations();
        this.setupTypewriterEffects();
        this.setupFloatingElements();
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerElementAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe various elements for scroll animations
        document.querySelectorAll('.content-card, .safety-card, .care-card, .interactive-card').forEach(card => {
            animateOnScroll.observe(card);
        });

        document.querySelectorAll('.section-title, .hero-title').forEach(title => {
            animateOnScroll.observe(title);
        });
    }

    triggerElementAnimation(element) {
        const animationType = element.dataset.animation || 'slideUp';
        
        switch(animationType) {
            case 'slideUp':
                this.slideUpAnimation(element);
                break;
            case 'slideLeft':
                this.slideFromLeft(element);
                break;
            case 'slideRight':
                this.slideFromRight(element);
                break;
            case 'scaleIn':
                this.scaleInAnimation(element);
                break;
            case 'fadeIn':
                this.fadeInAnimation(element);
                break;
            default:
                this.slideUpAnimation(element);
        }
    }

    slideUpAnimation(element) {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
        element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    slideFromLeft(element) {
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    slideFromRight(element) {
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    scaleInAnimation(element) {
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
        element.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }

    fadeInAnimation(element) {
        element.style.opacity = '1';
        element.style.transition = 'opacity 1s ease-in-out';
    }

    // Hover effects and microinteractions
    setupHoverEffects() {
        // Card hover effects
        document.querySelectorAll('.content-card, .safety-card, .care-card').forEach(card => {
            this.addCardHoverEffect(card);
        });

        // Button hover effects
        document.querySelectorAll('.cta-button, .generate-btn, .activity-btn').forEach(button => {
            this.addButtonHoverEffect(button);
        });

        // Navigation link effects
        document.querySelectorAll('.nav-link').forEach(link => {
            this.addNavHoverEffect(link);
        });

        // Interactive element effects
        document.querySelectorAll('.quiz-btn, .scenario-btn, .quiz-option').forEach(btn => {
            this.addInteractiveHoverEffect(btn);
        });
    }

    addCardHoverEffect(card) {
        let hoverTimeout;
        
        card.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            this.animateCardHover(card, true);
        });

        card.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                this.animateCardHover(card, false);
            }, 100);
        });

        // Add subtle breathing animation
        this.addBreathingEffect(card);
    }

    animateCardHover(card, isHovering) {
        if (isHovering) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // Add glow effect
            card.style.setProperty('--glow', '0 0 20px rgba(74, 144, 226, 0.3)');
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 4px 20px var(--shadow-color)';
            card.style.setProperty('--glow', 'none');
        }
    }

    addBreathingEffect(element) {
        let breathingInterval;
        
        const startBreathing = () => {
            let scale = 1;
            let growing = true;
            
            breathingInterval = setInterval(() => {
                if (growing) {
                    scale += 0.001;
                    if (scale >= 1.005) growing = false;
                } else {
                    scale -= 0.001;
                    if (scale <= 1) growing = true;
                }
                
                if (!element.matches(':hover')) {
                    element.style.transform = `scale(${scale})`;
                }
            }, 50);
        };

        const stopBreathing = () => {
            clearInterval(breathingInterval);
            element.style.transform = 'scale(1)';
        };

        // Start breathing when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startBreathing();
                } else {
                    stopBreathing();
                }
            });
        });

        observer.observe(element);
    }

    addButtonHoverEffect(button) {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
            button.style.transition = 'all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });

        // Click effect
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(-1px) scale(0.98)';
        });

        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
    }

    addNavHoverEffect(link) {
        link.addEventListener('mouseenter', () => {
            this.createRippleEffect(link);
        });
    }

    addInteractiveHoverEffect(element) {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05)';
            element.style.transition = 'all 0.2s ease';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    }

    // Button click animations
    setupButtonAnimations() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .btn, .cta-button')) {
                this.createClickRipple(e);
                this.addButtonClickAnimation(e.target);
            }
        });
    }

    createClickRipple(event) {
        const button = event.target;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            pointer-events: none;
            z-index: 1;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        // Animate ripple
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(2)', opacity: 0 }
        ], {
            duration: 500,
            easing: 'ease-out'
        }).onfinish = () => {
            ripple.remove();
        };
    }

    addButtonClickAnimation(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    // Loading animations
    setupLoadingAnimations() {
        const loadingElements = document.querySelectorAll('.loading-spinner, .progress-bar');
        loadingElements.forEach(element => {
            this.addLoadingAnimation(element);
        });
    }

    addLoadingAnimation(element) {
        if (element.classList.contains('progress-bar')) {
            this.animateProgressBar(element);
        } else {
            this.addSpinnerAnimation(element);
        }
    }

    animateProgressBar(progressBar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBar.style.animation = 'progressGlow 2s ease-in-out infinite alternate';
                }
            });
        });

        observer.observe(progressBar);
    }

    // Parallax effects for hero section
    setupParallaxEffects() {
        const heroSection = document.querySelector('.hero-section');
        const floatingIcons = document.querySelectorAll('.floating-icons .icon');

        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                heroSection.style.transform = `translateY(${rate}px)`;
                
                floatingIcons.forEach((icon, index) => {
                    const speed = 0.3 + (index * 0.1);
                    icon.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
                });
            });
        }
    }

    // Count-up animations for statistics
    setupCountUpAnimations() {
        document.querySelectorAll('[data-count-up]').forEach(counter => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCountUp(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    }

    animateCountUp(element) {
        const target = parseInt(element.dataset.countUp);
        const duration = 2000;
        const start = Date.now();
        const startValue = 0;

        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    // Typewriter effects for dynamic text
    setupTypewriterEffects() {
        document.querySelectorAll('[data-typewriter]').forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.typewriterEffect(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(element);
        });
    }

    typewriterEffect(element) {
        const text = element.dataset.typewriter || element.textContent;
        const speed = parseInt(element.dataset.typewriterSpeed) || 50;
        
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 500);
            }
        }, speed);
    }

    // Floating elements animation
    setupFloatingElements() {
        document.querySelectorAll('.floating-element, .icon').forEach((element, index) => {
            this.addFloatingAnimation(element, index);
        });
    }

    addFloatingAnimation(element, index) {
        const duration = 3000 + (index * 500); // Stagger animations
        const amplitude = 10 + (index * 5);
        
        let startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = (elapsed % duration) / duration;
            const y = Math.sin(progress * Math.PI * 2) * amplitude;
            
            element.style.transform = `translateY(${y}px) rotate(${progress * 360}deg)`;
            
            requestAnimationFrame(animate);
        };

        animate();
    }

    // Particle system for special effects
    createParticleEffect(container, particleCount = 20) {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: var(--primary-color);
                border-radius: 50%;
                opacity: ${Math.random() * 0.8 + 0.2};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: -1;
            `;

            container.appendChild(particle);
            this.animateParticle(particle);
        }
    }

    animateParticle(particle) {
        const duration = Math.random() * 3000 + 2000;
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        const endX = startX + (Math.random() - 0.5) * 200;
        const endY = startY + (Math.random() - 0.5) * 200;
        
        particle.animate([
            { 
                left: startX + '%', 
                top: startY + '%', 
                opacity: parseFloat(particle.style.opacity),
                transform: 'scale(1)'
            },
            { 
                left: endX + '%', 
                top: endY + '%', 
                opacity: 0,
                transform: 'scale(0)'
            }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => {
            particle.remove();
        };
    }

    // Success animation for correct answers
    celebrationAnimation(element) {
        // Create confetti effect
        this.createParticleEffect(element, 30);
        
        // Scale and glow animation
        element.animate([
            { transform: 'scale(1)', filter: 'brightness(1)' },
            { transform: 'scale(1.1)', filter: 'brightness(1.2)' },
            { transform: 'scale(1)', filter: 'brightness(1)' }
        ], {
            duration: 600,
            easing: 'ease-in-out'
        });
    }

    // Error shake animation
    errorShakeAnimation(element) {
        element.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 500,
            easing: 'ease-in-out'
        });
    }

    // Utility methods
    createRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: rippleAnimation 0.6s linear;
            background-color: rgba(255, 255, 255, 0.3);
            left: 50%;
            top: 50%;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Theme transition animation
    themeTransitionAnimation() {
        document.body.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Add temporary overlay for smooth transition
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--background-color);
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;

        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
                document.body.style.transition = '';
            }, 300);
        }, 200);
    }
}

// CSS Animations (added dynamically)
const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        @keyframes progressGlow {
            from {
                box-shadow: 0 0 5px var(--primary-color);
            }
            to {
                box-shadow: 0 0 20px var(--primary-color), 0 0 30px var(--primary-color);
            }
        }

        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                transform: translateY(0);
            }
            40%, 43% {
                transform: translateY(-30px);
            }
            70% {
                transform: translateY(-15px);
            }
            90% {
                transform: translateY(-4px);
            }
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }

        @keyframes wobble {
            0% {
                transform: translateX(0%);
            }
            15% {
                transform: translateX(-25px) rotate(-5deg);
            }
            30% {
                transform: translateX(20px) rotate(3deg);
            }
            45% {
                transform: translateX(-15px) rotate(-3deg);
            }
            60% {
                transform: translateX(10px) rotate(2deg);
            }
            75% {
                transform: translateX(-5px) rotate(-1deg);
            }
            100% {
                transform: translateX(0%);
            }
        }

        .celebrate {
            animation: bounce 1s ease-in-out;
        }

        .error {
            animation: wobble 0.8s ease-in-out;
        }

        .pulse {
            animation: pulse 2s ease-in-out infinite;
        }
    `;

    document.head.appendChild(style);
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    window.ciberAnimations = new CiberAnimations();
});

// Export utility functions for use in other scripts
window.triggerCelebration = (element) => {
    if (window.ciberAnimations) {
        window.ciberAnimations.celebrationAnimation(element);
    }
};

window.triggerErrorShake = (element) => {
    if (window.ciberAnimations) {
        window.ciberAnimations.errorShakeAnimation(element);
    }
};

window.triggerThemeTransition = () => {
    if (window.ciberAnimations) {
        window.ciberAnimations.themeTransitionAnimation();
    }
};