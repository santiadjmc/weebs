/**
 * Enhanced animations and visual effects for the cybersecurity education app
 * Includes parallax effects, particle systems, and advanced animations
 */

// Animation state management
const AnimationState = {
  isScrolling: false,
  lastScrollY: 0,
  ticking: false,
  parallaxElements: [],
  particles: []
};

/**
 * Initialize advanced animations
 */
function initializeAdvancedAnimations() {
  initializeParallaxEffects();
  initializeScrollAnimations();
  initializeHoverEffects();
  initializeLoadingAnimations();
  initializeIntersectionObserver();
  initializeTypewriterEffect();
  initializeFloatingElements();
}

/**
 * Parallax scroll effects
 */
function initializeParallaxEffects() {
  // Find elements with parallax data attributes
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach(element => {
    const speed = parseFloat(element.dataset.parallax) || 0.5;
    AnimationState.parallaxElements.push({
      element,
      speed,
      offset: element.getBoundingClientRect().top + window.pageYOffset
    });
  });
  
  // Throttled scroll handler for parallax
  window.addEventListener('scroll', throttle(updateParallax, 10));
}

function updateParallax() {
  const scrollY = window.pageYOffset;
  
  AnimationState.parallaxElements.forEach(({ element, speed, offset }) => {
    const yPos = -(scrollY - offset) * speed;
    element.style.setProperty('--parallax-y', `${yPos}px`);
  });
}

/**
 * Enhanced scroll animations with stagger effects
 */
function initializeScrollAnimations() {
  // Add scroll-triggered animations to sections
  const sections = document.querySelectorAll('.content-section');
  
  sections.forEach((section, index) => {
    section.style.setProperty('--stagger-delay', `${index * 100}ms`);
    section.classList.add('scroll-reveal');
  });
  
  // Animate navigation on scroll
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.classList.add('header-hidden');
    } else {
      // Scrolling up
      header.classList.remove('header-hidden');
    }
    
    lastScrollTop = scrollTop;
  });
}

/**
 * Advanced hover effects with morphing
 */
function initializeHoverEffects() {
  const cards = document.querySelectorAll('.content-card, .interactive-card, .tip-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', createRippleEffect);
    card.addEventListener('mouseleave', removeRippleEffect);
  });
  
  // Button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', enhanceButtonHover);
    button.addEventListener('mouseleave', resetButtonHover);
  });
}

function createRippleEffect(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const ripple = document.createElement('div');
  
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.classList.add('ripple-effect');
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(99, 102, 241, 0.1)';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'rippleAnimation 0.6s linear';
  ripple.style.pointerEvents = 'none';
  
  card.style.position = 'relative';
  card.style.overflow = 'hidden';
  card.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

function removeRippleEffect(e) {
  const ripples = e.currentTarget.querySelectorAll('.ripple-effect');
  ripples.forEach(ripple => {
    ripple.style.animation = 'rippleOut 0.3s linear forwards';
  });
}

function enhanceButtonHover(e) {
  const button = e.currentTarget;
  button.style.transform = 'translateY(-2px) scale(1.02)';
  button.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
}

function resetButtonHover(e) {
  const button = e.currentTarget;
  button.style.transform = '';
  button.style.boxShadow = '';
}

/**
 * Loading animations and micro-interactions
 */
function initializeLoadingAnimations() {
  // Animate elements as they load
  const elementsToAnimate = document.querySelectorAll('h1, h2, h3, .btn, .content-card');
  
  elementsToAnimate.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100 + (index * 50));
  });
}

/**
 * Enhanced intersection observer for complex animations
 */
function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: [0.1, 0.5, 0.9],
    rootMargin: '-10% 0px -10% 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const element = entry.target;
      
      if (entry.isIntersecting) {
        if (entry.intersectionRatio > 0.5) {
          element.classList.add('fully-visible');
          triggerElementAnimation(element);
        } else {
          element.classList.add('partially-visible');
        }
      } else {
        element.classList.remove('fully-visible', 'partially-visible');
      }
    });
  }, observerOptions);
  
  // Observe key elements
  document.querySelectorAll('.section-title, .hero-title, .quiz-container').forEach(el => {
    observer.observe(el);
  });
}

function triggerElementAnimation(element) {
  if (element.classList.contains('section-title')) {
    element.style.animation = 'titleReveal 0.8s ease-out forwards';
  } else if (element.classList.contains('quiz-container')) {
    element.style.animation = 'scaleIn 0.5s ease-out forwards';
  }
}

/**
 * Typewriter effect for dynamic text
 */
function initializeTypewriterEffect() {
  const typewriterElements = document.querySelectorAll('[data-typewriter]');
  
  typewriterElements.forEach(element => {
    const text = element.textContent;
    const speed = parseInt(element.dataset.typewriterSpeed) || 50;
    
    element.textContent = '';
    element.style.borderRight = '2px solid var(--color-primary)';
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        // Remove cursor after completion
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 1000);
      }
    }, speed);
  });
}

/**
 * Floating elements animation
 */
function initializeFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating-shield, .floating-lock, .floating-key');
  
  floatingElements.forEach((element, index) => {
    // Create unique floating animation for each element
    const duration = 3 + (index * 0.5);
    const delay = index * 0.5;
    
    element.style.animationDuration = `${duration}s`;
    element.style.animationDelay = `${delay}s`;
    
    // Add random gentle movement
    setInterval(() => {
      if (!document.hidden) {
        const randomX = (Math.random() - 0.5) * 10;
        const randomY = (Math.random() - 0.5) * 10;
        
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }
    }, 2000 + (index * 500));
  });
}

/**
 * Advanced particle system
 */
class ParticleSystem {
  constructor(container, options = {}) {
    this.container = container;
    this.particles = [];
    this.options = {
      particleCount: options.particleCount || 50,
      colors: options.colors || ['#6366f1', '#f59e0b', '#10b981'],
      speed: options.speed || 1,
      size: options.size || { min: 2, max: 6 }
    };
    
    this.init();
  }
  
  init() {
    this.createParticles();
    this.animate();
  }
  
  createParticles() {
    for (let i = 0; i < this.options.particleCount; i++) {
      const particle = {
        x: Math.random() * this.container.offsetWidth,
        y: Math.random() * this.container.offsetHeight,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        size: Math.random() * (this.options.size.max - this.options.size.min) + this.options.size.min,
        color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
        element: this.createParticleElement()
      };
      
      this.particles.push(particle);
      this.container.appendChild(particle.element);
    }
  }
  
  createParticleElement() {
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.borderRadius = '50%';
    element.style.pointerEvents = 'none';
    element.style.opacity = '0.7';
    return element;
  }
  
  animate() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x <= 0 || particle.x >= this.container.offsetWidth) {
        particle.vx *= -1;
      }
      if (particle.y <= 0 || particle.y >= this.container.offsetHeight) {
        particle.vy *= -1;
      }
      
      // Update element position and style
      particle.element.style.left = particle.x + 'px';
      particle.element.style.top = particle.y + 'px';
      particle.element.style.width = particle.size + 'px';
      particle.element.style.height = particle.size + 'px';
      particle.element.style.backgroundColor = particle.color;
    });
    
    requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    this.particles.forEach(particle => {
      particle.element.remove();
    });
    this.particles = [];
  }
}

/**
 * Create particle effects for special interactions
 */
function createCelebrationParticles(element) {
  const rect = element.getBoundingClientRect();
  const particleContainer = document.createElement('div');
  particleContainer.style.position = 'fixed';
  particleContainer.style.top = rect.top + 'px';
  particleContainer.style.left = rect.left + 'px';
  particleContainer.style.width = rect.width + 'px';
  particleContainer.style.height = rect.height + 'px';
  particleContainer.style.pointerEvents = 'none';
  particleContainer.style.zIndex = '9999';
  
  document.body.appendChild(particleContainer);
  
  // Create celebration particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.backgroundColor = ['#6366f1', '#f59e0b', '#10b981'][i % 3];
    particle.style.borderRadius = '50%';
    particle.style.left = '50%';
    particle.style.top = '50%';
    
    const angle = (i / 20) * Math.PI * 2;
    const velocity = 100 + Math.random() * 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    particle.style.animation = `celebrationParticle 1s ease-out forwards`;
    particle.style.setProperty('--vx', vx + 'px');
    particle.style.setProperty('--vy', vy + 'px');
    
    particleContainer.appendChild(particle);
  }
  
  // Clean up after animation
  setTimeout(() => {
    particleContainer.remove();
  }, 1000);
}

/**
 * Morphing backgrounds
 */
function initializeMorphingBackgrounds() {
  const sections = document.querySelectorAll('.content-section');
  
  sections.forEach((section, index) => {
    if (index % 2 === 0) {
      section.style.background = `linear-gradient(135deg, 
        var(--bg-secondary) 0%, 
        var(--bg-tertiary) 50%, 
        var(--bg-secondary) 100%)`;
      section.style.backgroundSize = '400% 400%';
      section.style.animation = 'gradientShift 8s ease-in-out infinite';
    }
  });
}

/**
 * Custom CSS animations via JavaScript
 */
function addCustomAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleAnimation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    @keyframes rippleOut {
      to {
        transform: scale(0);
        opacity: 0;
      }
    }
    
    @keyframes titleReveal {
      from {
        opacity: 0;
        transform: translateY(30px) rotateX(90deg);
      }
      to {
        opacity: 1;
        transform: translateY(0) rotateX(0deg);
      }
    }
    
    @keyframes celebrationParticle {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
      }
      100% {
        transform: translate(calc(-50% + var(--vx)), calc(-50% + var(--vy))) scale(1);
        opacity: 0;
      }
    }
    
    @keyframes gradientShift {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }
    
    .header-hidden {
      transform: translateY(-100%);
      transition: transform 0.3s ease-in-out;
    }
    
    .fully-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .partially-visible {
      opacity: 0.8;
    }
  `;
  
  document.head.appendChild(style);
}

/**
 * Initialize all advanced animations when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add small delay to ensure all styles are loaded
  setTimeout(() => {
    initializeAdvancedAnimations();
    addCustomAnimations();
    initializeMorphingBackgrounds();
  }, 100);
});

/**
 * Utility function to throttle expensive operations
 */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Make celebration particles available globally
 */
window.createCelebrationParticles = createCelebrationParticles;
window.ParticleSystem = ParticleSystem;