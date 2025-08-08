/**
 * Theme management for CiberNiños application
 * Handles dark/light mode toggle with smooth animations
 */

// Theme state
const ThemeManager = {
    current: 'light',
    prefersDark: false,
    isTransitioning: false
};

/**
 * Initialize theme system
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeThemeToggle();
});

/**
 * Initialize theme based on user preference or system setting
 */
function initializeTheme() {
    // Check for stored preference
    const storedTheme = localStorage.getItem('theme');
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    ThemeManager.prefersDark = prefersDark;
    
    // Set initial theme
    let initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme, false); // false = no animation on initial load
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        ThemeManager.prefersDark = e.matches;
        
        // Auto switch if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light', true);
        }
    });
}

/**
 * Initialize theme toggle button
 */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Add click event listener
    themeToggle.addEventListener('click', function() {
        if (ThemeManager.isTransitioning) return;
        
        const newTheme = ThemeManager.current === 'light' ? 'dark' : 'light';
        setTheme(newTheme, true);
        
        // Add fun animation to the toggle button
        addToggleAnimation();
        
        // Haptic feedback on supported devices
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    });
    
    // Add keyboard support
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Update ARIA label
    updateThemeToggleLabel();
}

/**
 * Set the theme
 */
function setTheme(theme, animate = true) {
    if (ThemeManager.isTransitioning) return;
    
    // Validate theme
    if (!['light', 'dark'].includes(theme)) {
        console.warn('Invalid theme:', theme);
        return;
    }
    
    const oldTheme = ThemeManager.current;
    ThemeManager.current = theme;
    
    // Apply theme
    if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animateThemeTransition(oldTheme, theme);
    } else {
        applyTheme(theme);
    }
    
    // Save preference
    localStorage.setItem('theme', theme);
    
    // Update toggle button
    updateThemeToggleLabel();
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('themechange', {
        detail: { oldTheme, newTheme: theme }
    }));
    
    console.log(`🎨 Theme changed to: ${theme}`);
}

/**
 * Apply theme to document
 */
function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.content = theme === 'dark' ? '#0f172a' : '#ffffff';
    }
}

/**
 * Animate theme transition
 */
function animateThemeTransition(oldTheme, newTheme) {
    ThemeManager.isTransitioning = true;
    
    // Create overlay for smooth transition
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${newTheme === 'dark' ? '#0f172a' : '#ffffff'};
        opacity: 0;
        z-index: 9999;
        pointer-events: none;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    // Start animation
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        
        setTimeout(() => {
            // Apply new theme
            applyTheme(newTheme);
            
            // Add sparkle effect
            createThemeSparkles();
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                
                setTimeout(() => {
                    document.body.removeChild(overlay);
                    ThemeManager.isTransitioning = false;
                }, 300);
            }, 100);
        }, 150);
    });
}

/**
 * Create sparkle effect during theme transition
 */
function createThemeSparkles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const sparkleContainer = document.createElement('div');
    sparkleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10000;
    `;
    
    document.body.appendChild(sparkleContainer);
    
    // Create sparkles
    for (let i = 0; i < 12; i++) {
        createSparkle(sparkleContainer);
    }
    
    // Remove sparkle container after animation
    setTimeout(() => {
        if (sparkleContainer.parentNode) {
            sparkleContainer.parentNode.removeChild(sparkleContainer);
        }
    }, 2000);
}

/**
 * Create individual sparkle
 */
function createSparkle(container) {
    const sparkle = document.createElement('div');
    const size = Math.random() * 6 + 4; // 4-10px
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        font-size: ${size}px;
        opacity: 0;
        transform: scale(0) rotate(0deg);
        animation: sparkleAnimation 1.5s ease-out forwards;
        animation-delay: ${Math.random() * 0.5}s;
    `;
    
    container.appendChild(sparkle);
}

/**
 * Add toggle button animation
 */
function addToggleAnimation() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    
    toggle.style.transform = 'scale(1.1) rotate(180deg)';
    
    setTimeout(() => {
        toggle.style.transform = '';
    }, 300);
}

/**
 * Update theme toggle button ARIA label
 */
function updateThemeToggleLabel() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const labels = {
        light: 'Cambiar a modo oscuro',
        dark: 'Cambiar a modo claro'
    };
    
    themeToggle.setAttribute('aria-label', labels[ThemeManager.current]);
    themeToggle.setAttribute('title', labels[ThemeManager.current]);
}

/**
 * Get current theme
 */
function getCurrentTheme() {
    return ThemeManager.current;
}

/**
 * Check if dark theme is active
 */
function isDarkTheme() {
    return ThemeManager.current === 'dark';
}

/**
 * Auto-adjust theme based on time (optional feature)
 */
function autoAdjustTheme() {
    const hour = new Date().getHours();
    const shouldBeDark = hour < 7 || hour > 19; // Dark between 7 PM and 7 AM
    
    if (shouldBeDark && ThemeManager.current === 'light') {
        setTheme('dark', true);
    } else if (!shouldBeDark && ThemeManager.current === 'dark') {
        setTheme('light', true);
    }
}

/**
 * Add custom CSS for theme animations
 */
function addThemeAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleAnimation {
            0% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0.5) rotate(360deg);
            }
        }
        
        .theme-transition-overlay {
            transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* Smooth transitions for theme changes */
        * {
            transition: 
                background-color 0.3s ease,
                color 0.3s ease,
                border-color 0.3s ease,
                box-shadow 0.3s ease !important;
        }
        
        /* Disable transitions during theme change to prevent flicker */
        .theme-changing * {
            transition: none !important;
        }
        
        /* Fun hover effects for theme toggle */
        .theme-toggle:hover .toggle-track {
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        }
        
        .theme-toggle:hover .toggle-thumb {
            transform: scale(1.1) ${ThemeManager.current === 'dark' ? 'translateX(30px)' : ''};
        }
        
        /* Focus styles for accessibility */
        .theme-toggle:focus-visible {
            outline: 2px solid var(--primary-color);
            outline-offset: 4px;
            border-radius: 20px;
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Handle theme preference sync across tabs
 */
function initializeThemeSync() {
    // Listen for storage changes (theme changes in other tabs)
    window.addEventListener('storage', function(e) {
        if (e.key === 'theme' && e.newValue !== ThemeManager.current) {
            setTheme(e.newValue, true);
        }
    });
    
    // Sync theme on window focus (in case it changed elsewhere)
    window.addEventListener('focus', function() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme && storedTheme !== ThemeManager.current) {
            setTheme(storedTheme, false);
        }
    });
}

/**
 * Theme-aware image loading
 */
function updateThemeAwareImages() {
    const images = document.querySelectorAll('[data-src-light][data-src-dark]');
    
    images.forEach(img => {
        const lightSrc = img.dataset.srcLight;
        const darkSrc = img.dataset.srcDark;
        
        if (ThemeManager.current === 'dark' && darkSrc) {
            img.src = darkSrc;
        } else if (lightSrc) {
            img.src = lightSrc;
        }
    });
}

/**
 * Initialize all theme-related functionality
 */
function initializeThemeSystem() {
    addThemeAnimationStyles();
    initializeThemeSync();
    
    // Update theme-aware images when theme changes
    document.addEventListener('themechange', updateThemeAwareImages);
    updateThemeAwareImages(); // Initial update
}

// Initialize theme system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeThemeSystem);
} else {
    initializeThemeSystem();
}

// Export functions for global use
window.ThemeManager = {
    setTheme,
    getCurrentTheme,
    isDarkTheme,
    autoAdjustTheme
};