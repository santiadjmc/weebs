/**
 * CyberKids Animations JavaScript File
 * Advanced animations and visual effects
 */

// =================================
// ANIMATION CONSTANTS
// =================================

const ANIMATION_CONFIG = {
    duration: {
        fast: 200,
        normal: 400,
        slow: 600
    },
    easing: {
        easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
};

// =================================
// INTERSECTION OBSERVER ANIMATIONS
// =================================

/**
 * Advanced scroll animations using Intersection Observer
 */
class ScrollAnimationController {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
        this.init();
    }
    
    init() {
        this.setupMainObserver();
        this.setupStaggeredObserver();
        this.setupParallaxObserver();
        this.setupCounterObserver();
    }
    
    /**
     * Main scroll animation observer
     */
    setupMainObserver() {
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, options);
        
        // Observe elements with animation classes
        const elements = document.querySelectorAll(
            '.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale, .animate-fade-in'
        );
        
        elements.forEach(el => observer.observe(el));
        this.observers.set('main', observer);
    }
    
    /**
     * Staggered animation observer
     */
    setupStaggeredObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStaggeredChildren(entry.target);
                }
            });
        }, options);
        
        const staggerContainers = document.querySelectorAll('.stagger-container');
        staggerContainers.forEach(container => observer.observe(container));
        this.observers.set('stagger', observer);
    }
    
    /**
     * Parallax effect observer
     */
    setupParallaxObserver() {
        const options = {
            threshold: 0,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startParallax(entry.target);
                } else {
                    this.stopParallax(entry.target);
                }
            });
        }, options);
        
        const parallaxElements = document.querySelectorAll('.parallax-element');
        parallaxElements.forEach(el => observer.observe(el));
        this.observers.set('parallax', observer);
    }
    
    /**
     * Counter animation observer
     */
    setupCounterObserver() {
        const options = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, options);
        
        const counters = document.querySelectorAll('.animate-counter');
        counters.forEach(counter => observer.observe(counter));
        this.observers.set('counter', observer);
    }
    
    /**
     * Animate individual element based on its class
     */
    animateElement(element) {
        const animationType = this.getAnimationType(element);
        
        element.style.transition = `all 0.8s ${ANIMATION_CONFIG.easing.easeOut}`;
        
        switch (animationType) {
            case 'slide-left':
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
                break;
            case 'slide-right':
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
                break;
            case 'scale':
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
                break;
            case 'fade-in':
                element.style.opacity = '1';
                break;
            default: // animate-on-scroll
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
        }
        
        // Add completion class for CSS animations
        setTimeout(() => {
            element.classList.add('animation-complete');
        }, 800);
    }
    
    /**
     * Animate staggered children
     */
    animateStaggeredChildren(container) {
        const children = container.querySelectorAll('.stagger-item');
        
        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0) scale(1)';
                child.classList.add('stagger-animated');
            }, index * 150);
        });
    }
    
    /**
     * Start parallax effect
     */
    startParallax(element) {
        const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            // Calculate parallax offset
            const yPos = -(scrolled - elementTop) * speed;
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            
            if (rect.bottom >= 0 && rect.top <= windowHeight) {
                requestAnimationFrame(updateParallax);
            }
        };
        
        element.parallaxAnimation = updateParallax;
        updateParallax();
    }
    
    /**
     * Stop parallax effect
     */
    stopParallax(element) {
        if (element.parallaxAnimation) {
            cancelAnimationFrame(element.parallaxAnimation);
            element.parallaxAnimation = null;
        }
    }
    
    /**
     * Animate counter numbers
     */
    animateCounter(element) {
        const target = parseInt(element.dataset.count) || 100;
        const duration = parseInt(element.dataset.duration) || 2000;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth counting
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(target * easeOut);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.classList.add('counter-complete');
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    /**
     * Get animation type from element classes
     */
    getAnimationType(element) {
        if (element.classList.contains('animate-slide-left')) return 'slide-left';
        if (element.classList.contains('animate-slide-right')) return 'slide-right';
        if (element.classList.contains('animate-scale')) return 'scale';
        if (element.classList.contains('animate-fade-in')) return 'fade-in';
        return 'default';
    }
    
    /**
     * Disconnect all observers
     */
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.animatedElements.clear();
    }
}

// =================================
// PARTICLE SYSTEM
// =================================

/**
 * Advanced particle system for visual effects
 */
class ParticleSystem {
    constructor(container, config = {}) {
        this.container = container;
        this.particles = [];
        this.config = {
            count: config.count || 20,
            colors: config.colors || ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
            speed: config.speed || 2,
            size: config.size || 4,
            life: config.life || 5000,
            ...config
        };
        
        this.isRunning = false;
        this.animationId = null;
    }
    
    /**
     * Create a single particle
     */
    createParticle() {
        const particle = {
            x: Math.random() * this.container.offsetWidth,
            y: this.container.offsetHeight + 10,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * this.config.speed - 1,
            size: Math.random() * this.config.size + 2,
            color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
            life: this.config.life,
            age: 0,
            element: null
        };
        
        // Create DOM element
        particle.element = document.createElement('div');
        particle.element.style.cssText = `
            position: absolute;
            width: ${particle.size}px;
            height: ${particle.size}px;
            background: ${particle.color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            opacity: 1;
        `;
        
        this.container.appendChild(particle.element);
        return particle;
    }
    
    /**
     * Update particle position and properties
     */
    updateParticle(particle, deltaTime) {
        particle.age += deltaTime;
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Apply gravity
        particle.vy += 0.1;
        
        // Fade out over time
        const lifeFraction = particle.age / particle.life;
        const opacity = Math.max(0, 1 - lifeFraction);
        
        // Update DOM element
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
        particle.element.style.opacity = opacity;
        
        // Return true if particle should be removed
        return particle.age >= particle.life || particle.y > this.container.offsetHeight;
    }
    
    /**
     * Animation loop
     */
    animate() {
        const now = performance.now();
        const deltaTime = now - (this.lastTime || now);
        this.lastTime = now;
        
        // Add new particles
        if (Math.random() < 0.3 && this.particles.length < this.config.count) {
            this.particles.push(this.createParticle());
        }
        
        // Update existing particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            const shouldRemove = this.updateParticle(particle, deltaTime);
            
            if (shouldRemove) {
                particle.element.remove();
                this.particles.splice(i, 1);
            }
        }
        
        if (this.isRunning) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }
    
    /**
     * Start particle system
     */
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }
    
    /**
     * Stop particle system
     */
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Clean up remaining particles
        this.particles.forEach(particle => {
            particle.element.remove();
        });
        this.particles = [];
    }
}

// =================================
// MORPHING SHAPES
// =================================

/**
 * SVG morphing animation controller
 */
class MorphingShapes {
    constructor(svgElement) {
        this.svg = svgElement;
        this.currentShape = 0;
        this.shapes = [];
        this.isAnimating = false;
        this.intervalId = null;
    }
    
    /**
     * Add shape path to morph between
     */
    addShape(pathData) {
        this.shapes.push(pathData);
    }
    
    /**
     * Start morphing animation
     */
    startMorphing(interval = 3000) {
        if (this.shapes.length < 2) return;
        
        this.intervalId = setInterval(() => {
            this.morphToNext();
        }, interval);
    }
    
    /**
     * Morph to next shape
     */
    morphToNext() {
        if (this.isAnimating) return;
        
        const nextShape = (this.currentShape + 1) % this.shapes.length;
        this.morphTo(nextShape);
        this.currentShape = nextShape;
    }
    
    /**
     * Morph to specific shape
     */
    morphTo(shapeIndex) {
        if (shapeIndex >= this.shapes.length) return;
        
        const path = this.svg.querySelector('path');
        if (!path) return;
        
        this.isAnimating = true;
        
        // Animate path data change
        path.style.transition = 'all 1s ease-in-out';
        path.setAttribute('d', this.shapes[shapeIndex]);
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }
    
    /**
     * Stop morphing animation
     */
    stopMorphing() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// =================================
// ADVANCED BUTTON ANIMATIONS
// =================================

/**
 * Enhanced button interactions
 */
class ButtonAnimations {
    static init() {
        this.setupRippleEffect();
        this.setupMagneticEffect();
        this.setupHoverGlow();
    }
    
    /**
     * Material Design ripple effect
     */
    static setupRippleEffect() {
        const buttons = document.querySelectorAll('.btn-ripple, .btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
    
    /**
     * Magnetic hover effect
     */
    static setupMagneticEffect() {
        const magneticButtons = document.querySelectorAll('.btn-magnetic');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - centerX) * 0.2;
                const deltaY = (e.clientY - centerY) * 0.2;
                
                this.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    /**
     * Glowing hover effect
     */
    static setupHoverGlow() {
        const glowButtons = document.querySelectorAll('.btn-glow');
        
        glowButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.5)';
                this.style.transition = 'box-shadow 0.3s ease';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
            });
        });
    }
}

// =================================
// TEXT ANIMATIONS
// =================================

/**
 * Advanced text animation effects
 */
class TextAnimations {
    /**
     * Typewriter effect
     */
    static typewriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }
    
    /**
     * Letter by letter fade in
     */
    static fadeInLetters(element, delay = 50) {
        const text = element.textContent;
        element.innerHTML = '';
        
        [...text].forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s ease ${index * delay}ms`;
            element.appendChild(span);
            
            requestAnimationFrame(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        });
    }
    
    /**
     * Glitch effect
     */
    static glitch(element, duration = 1000) {
        const originalText = element.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        
        let iterations = 0;
        const maxIterations = duration / 50;
        
        const glitchInterval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            if (iterations >= originalText.length) {
                clearInterval(glitchInterval);
                element.textContent = originalText;
            }
            
            iterations += 1/3;
        }, 50);
    }
}

// =================================
// LOADING ANIMATIONS
// =================================

/**
 * Advanced loading indicators
 */
class LoadingAnimations {
    /**
     * Create DNA helix loader
     */
    static createDNALoader(container) {
        const loader = document.createElement('div');
        loader.className = 'dna-loader';
        loader.innerHTML = `
            <div class="dna-strand">
                <div class="dna-segment"></div>
                <div class="dna-segment"></div>
                <div class="dna-segment"></div>
            </div>
        `;
        
        loader.style.cssText = `
            width: 60px;
            height: 60px;
            position: relative;
            animation: dna-rotate 2s linear infinite;
        `;
        
        container.appendChild(loader);
        return loader;
    }
    
    /**
     * Create morphing cube loader
     */
    static createCubeLoader(container) {
        const loader = document.createElement('div');
        loader.className = 'cube-loader';
        
        for (let i = 0; i < 9; i++) {
            const cube = document.createElement('div');
            cube.style.cssText = `
                width: 10px;
                height: 10px;
                background: var(--primary-color);
                float: left;
                margin: 2px;
                animation: cube-scale 1.5s ease-in-out infinite;
                animation-delay: ${i * 0.1}s;
            `;
            loader.appendChild(cube);
        }
        
        container.appendChild(loader);
        return loader;
    }
}

// =================================
// GESTURE ANIMATIONS
// =================================

/**
 * Touch gesture animations
 */
class GestureAnimations {
    constructor() {
        this.setupSwipeAnimations();
        this.setupPinchAnimations();
    }
    
    /**
     * Setup swipe animations
     */
    setupSwipeAnimations() {
        let startX, startY, currentX, currentY;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
            
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            // Horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 50) {
                    this.triggerSwipeAnimation('left');
                } else if (diffX < -50) {
                    this.triggerSwipeAnimation('right');
                }
            }
        });
        
        document.addEventListener('touchend', () => {
            startX = startY = null;
        });
    }
    
    /**
     * Trigger swipe animation
     */
    triggerSwipeAnimation(direction) {
        const body = document.body;
        body.classList.add(`swipe-${direction}`);
        
        setTimeout(() => {
            body.classList.remove(`swipe-${direction}`);
        }, 300);
    }
    
    /**
     * Setup pinch animations
     */
    setupPinchAnimations() {
        let initialDistance = 0;
        
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                initialDistance = this.getDistance(e.touches[0], e.touches[1]);
            }
        });
        
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                const currentDistance = this.getDistance(e.touches[0], e.touches[1]);
                const scale = currentDistance / initialDistance;
                
                if (scale > 1.2) {
                    this.triggerZoomAnimation('in');
                } else if (scale < 0.8) {
                    this.triggerZoomAnimation('out');
                }
            }
        });
    }
    
    /**
     * Get distance between two touch points
     */
    getDistance(touch1, touch2) {
        return Math.sqrt(
            Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );
    }
    
    /**
     * Trigger zoom animation
     */
    triggerZoomAnimation(type) {
        const body = document.body;
        body.classList.add(`zoom-${type}`);
        
        setTimeout(() => {
            body.classList.remove(`zoom-${type}`);
        }, 300);
    }
}

// =================================
// ANIMATION INITIALIZATION
// =================================

let scrollAnimationController;
let gestureAnimations;

/**
 * Initialize all animations
 */
function initializeAnimations() {
    // Initialize scroll animations
    scrollAnimationController = new ScrollAnimationController();
    
    // Initialize button animations
    ButtonAnimations.init();
    
    // Initialize gesture animations on mobile
    if ('ontouchstart' in window) {
        gestureAnimations = new GestureAnimations();
    }
    
    // Add custom CSS animations
    addCustomAnimationStyles();
    
    console.log('🎭 Advanced animations initialized');
}

/**
 * Add custom CSS animations to the document
 */
function addCustomAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes dna-rotate {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
        }
        
        @keyframes cube-scale {
            0%, 70%, 100% { transform: scale3D(1, 1, 1); }
            35% { transform: scale3D(0, 0, 1); }
        }
        
        .swipe-left { transform: translateX(-20px); transition: transform 0.3s ease; }
        .swipe-right { transform: translateX(20px); transition: transform 0.3s ease; }
        .zoom-in { transform: scale(1.05); transition: transform 0.3s ease; }
        .zoom-out { transform: scale(0.95); transition: transform 0.3s ease; }
        
        .stagger-item {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stagger-animated {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
        }
    `;
    
    document.head.appendChild(style);
}

// =================================
// PERFORMANCE MONITORING
// =================================

/**
 * Monitor animation performance
 */
function monitorAnimationPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkFPS() {
        frameCount++;
        const now = performance.now();
        
        if (now >= lastTime + 1000) {
            const fps = Math.round((frameCount * 1000) / (now - lastTime));
            
            if (fps < 30) {
                console.warn('⚠️ Low FPS detected:', fps);
                // Reduce animation quality on low-end devices
                document.body.classList.add('reduce-motion');
            }
            
            frameCount = 0;
            lastTime = now;
        }
        
        requestAnimationFrame(checkFPS);
    }
    
    requestAnimationFrame(checkFPS);
}

// =================================
// EXPORT FOR MAIN APP
// =================================

window.CyberKidsAnimations = {
    ScrollAnimationController,
    ParticleSystem,
    MorphingShapes,
    ButtonAnimations,
    TextAnimations,
    LoadingAnimations,
    GestureAnimations,
    initializeAnimations,
    monitorAnimationPerformance
};

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
    initializeAnimations();
}

// Start performance monitoring
monitorAnimationPerformance();