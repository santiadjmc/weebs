/**
 * Navigation functionality for CiberNiños application
 * Handles mobile menu, smooth scrolling, and navigation state
 */

// Navigation state
const NavigationManager = {
    isMobileMenuOpen: false,
    activeSection: 'inicio',
    scrollPosition: 0,
    isScrolling: false
};

/**
 * Initialize navigation system
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeActiveNavigation();
    initializeScrollEffects();
    initializeKeyboardNavigation();
    updateNavigationAccessibility();
});

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuToggle || !navMenu) return;
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        toggleMobileMenu();
    });
    
    // Close menu when clicking on links
    navMenu.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (NavigationManager.isMobileMenuOpen && 
            !navMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle escape key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && NavigationManager.isMobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Handle resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && NavigationManager.isMobileMenuOpen) {
            closeMobileMenu();
        }
    });
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    if (NavigationManager.isMobileMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

/**
 * Open mobile menu
 */
function openMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuToggle || !navMenu) return;
    
    NavigationManager.isMobileMenuOpen = true;
    
    // Update classes
    mobileMenuToggle.classList.add('active');
    navMenu.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Update ARIA attributes
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    mobileMenuToggle.setAttribute('aria-label', 'cerrar menú');
    
    // Focus first menu item
    const firstLink = navMenu.querySelector('.nav-link');
    if (firstLink) {
        setTimeout(() => firstLink.focus(), 300);
    }
    
    // Add animation class
    navMenu.style.animation = 'slideInRight 0.3s ease-out';
    
    console.log('📱 Mobile menu opened');
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuToggle || !navMenu) return;
    
    NavigationManager.isMobileMenuOpen = false;
    
    // Update classes
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Update ARIA attributes
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', 'abrir menú');
    
    // Add animation class
    navMenu.style.animation = 'slideOutRight 0.3s ease-out';
    
    console.log('📱 Mobile menu closed');
}

/**
 * Initialize active navigation highlighting
 */
function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0) return;
    
    // Create intersection observer for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                updateActiveNavLink(entry.target.id);
            }
        });
    }, {
        threshold: [0.3, 0.7],
        rootMargin: '-80px 0px -200px 0px'
    });
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Handle direct navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                navigateToSection(targetId);
                updateActiveNavLink(targetId);
                
                // Close mobile menu if open
                if (NavigationManager.isMobileMenuOpen) {
                    closeMobileMenu();
                }
            }
        });
    });
}

/**
 * Update active navigation link
 */
function updateActiveNavLink(sectionId) {
    if (NavigationManager.activeSection === sectionId) return;
    
    NavigationManager.activeSection = sectionId;
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${sectionId}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
            
            // Add subtle animation
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                link.style.animation = 'pulse 0.3s ease';
                setTimeout(() => {
                    link.style.animation = '';
                }, 300);
            }
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
    
    // Update page title
    updatePageTitle(sectionId);
    
    // Update URL without triggering page reload
    updateURL(sectionId);
    
    console.log(`🧭 Active section: ${sectionId}`);
}

/**
 * Navigate to a specific section with smooth scrolling
 */
function navigateToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;
    
    const navbar = document.querySelector('.navbar');
    const offset = navbar ? navbar.offsetHeight + 20 : 80;
    const targetPosition = targetSection.offsetTop - offset;
    
    // Use reduced motion if preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo(0, targetPosition);
    } else {
        smoothScrollTo(targetPosition, 800);
    }
}

/**
 * Smooth scroll to position with custom easing
 */
function smoothScrollTo(targetPosition, duration = 800) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();
    
    NavigationManager.isScrolling = true;
    
    function animation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (ease-out-quart)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const currentPosition = startPosition + (distance * easeOutQuart);
        window.scrollTo(0, currentPosition);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            NavigationManager.isScrolling = false;
        }
    }
    
    requestAnimationFrame(animation);
}

/**
 * Initialize scroll effects for navbar
 */
function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    let scrollDirection = 'up';
    
    // Throttled scroll handler
    const handleScroll = throttle(() => {
        const currentScrollY = window.scrollY;
        
        // Determine scroll direction
        if (currentScrollY > lastScrollY) {
            scrollDirection = 'down';
        } else {
            scrollDirection = 'up';
        }
        
        // Update scroll position
        NavigationManager.scrollPosition = currentScrollY;
        
        // Add/remove scrolled class for styling
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Auto-hide navbar on scroll down (mobile only)
        if (window.innerWidth <= 768) {
            if (scrollDirection === 'down' && currentScrollY > 100) {
                navbar.classList.add('nav-hidden');
            } else if (scrollDirection === 'up' || currentScrollY < 50) {
                navbar.classList.remove('nav-hidden');
            }
        }
        
        lastScrollY = currentScrollY;
    }, 16); // ~60fps
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Initialize keyboard navigation
 */
function initializeKeyboardNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
        link.addEventListener('keydown', function(e) {
            let targetIndex = index;
            
            switch(e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    targetIndex = (index + 1) % navLinks.length;
                    break;
                    
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    targetIndex = (index - 1 + navLinks.length) % navLinks.length;
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    targetIndex = 0;
                    break;
                    
                case 'End':
                    e.preventDefault();
                    targetIndex = navLinks.length - 1;
                    break;
                    
                default:
                    return;
            }
            
            navLinks[targetIndex].focus();
        });
    });
}

/**
 * Update page title based on current section
 */
function updatePageTitle(sectionId) {
    const sectionTitles = {
        'inicio': 'CiberNiños - Aprende Ciberseguridad Divertida',
        'contraseñas': 'Contraseñas Súper Fuertes - CiberNiños',
        'phishing': 'Cuidado con el Phishing - CiberNiños',
        'redes-sociales': 'Redes Sociales Seguras - CiberNiños',
        'privacidad': 'Tu Privacidad es Importante - CiberNiños',
        'dispositivos': 'Uso Responsable de Dispositivos - CiberNiños',
        'juegos': 'Juegos Educativos - CiberNiños'
    };
    
    const title = sectionTitles[sectionId] || 'CiberNiños - Aprende Ciberseguridad Divertida';
    document.title = title;
}

/**
 * Update URL without page reload
 */
function updateURL(sectionId) {
    if ('history' in window && 'pushState' in window.history) {
        const url = sectionId === 'inicio' ? '/' : `/#${sectionId}`;
        window.history.replaceState({ section: sectionId }, '', url);
    }
}

/**
 * Handle browser back/forward navigation
 */
function initializeBrowserNavigation() {
    window.addEventListener('popstate', function(e) {
        const state = e.state;
        if (state && state.section) {
            navigateToSection(state.section);
            updateActiveNavLink(state.section);
        } else {
            // Handle hash-based navigation
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                navigateToSection(hash);
                updateActiveNavLink(hash);
            }
        }
    });
    
    // Handle initial load with hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        setTimeout(() => {
            navigateToSection(initialHash);
            updateActiveNavLink(initialHash);
        }, 100);
    }
}

/**
 * Update navigation accessibility
 */
function updateNavigationAccessibility() {
    const nav = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Navegación principal');
    }
    
    if (navMenu) {
        navMenu.setAttribute('role', 'menubar');
        
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            link.setAttribute('role', 'menuitem');
            link.setAttribute('tabindex', index === 0 ? '0' : '-1');
        });
    }
}

/**
 * Add navigation animations
 */
function addNavigationAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
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
        
        /* Navbar scroll effects */
        .navbar {
            transition: 
                transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                background-color 0.3s ease,
                backdrop-filter 0.3s ease,
                box-shadow 0.3s ease;
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            box-shadow: var(--shadow-lg);
        }
        
        [data-theme="dark"] .navbar.scrolled {
            background: rgba(15, 23, 42, 0.98);
        }
        
        .navbar.nav-hidden {
            transform: translateY(-100%);
        }
        
        /* Mobile menu animations */
        @media (max-width: 768px) {
            .nav-menu {
                transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .mobile-menu-toggle span {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
        }
        
        /* Link focus animations */
        .nav-link {
            position: relative;
            transition: all 0.2s ease;
        }
        
        .nav-link:focus-visible {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Utility function to throttle scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize browser navigation and animations
document.addEventListener('DOMContentLoaded', function() {
    initializeBrowserNavigation();
    addNavigationAnimations();
});

// Export navigation functions for global use
window.NavigationManager = {
    navigateToSection,
    toggleMobileMenu,
    closeMobileMenu,
    getCurrentSection: () => NavigationManager.activeSection,
    isScrolling: () => NavigationManager.isScrolling
};