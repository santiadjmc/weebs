/**
 * CiberKids - Theme System
 * Handles light/dark mode toggle with smooth animations
 */

class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        this.themeKey = 'ciberkids-theme';
        
        this.initialize();
    }

    /**
     * Initialize the theme system
     */
    initialize() {
        // Load saved theme or use system preference
        this.loadTheme();
        
        // Listen for system theme changes
        this.prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem(this.themeKey)) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
        
        // Setup theme toggle animations
        this.setupAnimations();
        
        console.log('🎨 Theme system initialized');
    }

    /**
     * Load theme from localStorage or system preference
     */
    loadTheme() {
        const savedTheme = localStorage.getItem(this.themeKey);
        const systemTheme = this.prefersDarkScheme.matches ? 'dark' : 'light';
        const initialTheme = savedTheme || systemTheme;
        
        this.setTheme(initialTheme, false);
    }

    /**
     * Set the theme
     * @param {string} theme - 'light' or 'dark'
     * @param {boolean} animate - Whether to animate the transition
     */
    setTheme(theme, animate = true) {
        if (theme === this.currentTheme) return;

        this.currentTheme = theme;
        
        if (animate) {
            this.animateThemeTransition(theme);
        } else {
            this.applyTheme(theme);
        }
        
        // Save preference
        localStorage.setItem(this.themeKey, theme);
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme, previous: this.currentTheme }
        }));
        
        console.log(`🎨 Theme changed to: ${theme}`);
    }

    /**
     * Toggle between light and dark theme
     */
    toggle() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add haptic feedback if supported
        this.addHapticFeedback();
        
        return newTheme;
    }

    /**
     * Apply theme without animation
     * @param {string} theme - Theme to apply
     */
    applyTheme(theme) {
        document.body.className = `${theme}-theme`;
        this.updateThemeToggleButton(theme);
        this.updateMetaThemeColor(theme);
    }

    /**
     * Animate theme transition
     * @param {string} theme - New theme to transition to
     */
    animateThemeTransition(theme) {
        // Create overlay for smooth transition
        const overlay = document.createElement('div');
        overlay.className = 'theme-transition-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${theme === 'dark' ? '#0f172a' : '#ffffff'};
            opacity: 0;
            z-index: 9999;
            pointer-events: none;
            transition: opacity 0.3s ease-in-out;
        `;
        
        document.body.appendChild(overlay);
        
        // Start transition
        requestAnimationFrame(() => {
            overlay.style.opacity = '0.8';
            
            setTimeout(() => {
                this.applyTheme(theme);
                
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                    }, 300);
                }, 50);
            }, 150);
        });
    }

    /**
     * Update theme toggle button state
     * @param {string} theme - Current theme
     */
    updateThemeToggleButton(theme) {
        const themeToggle = document.querySelector('.theme-toggle');
        const toggleIcon = themeToggle?.querySelector('.toggle-icon');
        
        if (toggleIcon) {
            const translateX = theme === 'dark' ? '28px' : '0px';
            toggleIcon.style.transform = `translateX(${translateX})`;
            
            // Update button aria-label
            const label = theme === 'dark' ? 
                'Cambiar a modo claro' : 
                'Cambiar a modo oscuro';
            themeToggle.setAttribute('aria-label', label);
        }
    }

    /**
     * Update meta theme color for mobile browsers
     * @param {string} theme - Current theme
     */
    updateMetaThemeColor(theme) {
        let themeColorMeta = document.querySelector('meta[name="theme-color"]');
        
        if (!themeColorMeta) {
            themeColorMeta = document.createElement('meta');
            themeColorMeta.name = 'theme-color';
            document.head.appendChild(themeColorMeta);
        }
        
        const colors = {
            light: '#4f46e5',
            dark: '#1e293b'
        };
        
        themeColorMeta.content = colors[theme];
    }

    /**
     * Setup theme-related animations
     */
    setupAnimations() {
        // Add CSS for theme transitions
        const style = document.createElement('style');
        style.textContent = `
            /* Smooth transitions for theme changes */
            * {
                transition: background-color 0.3s ease, 
                           color 0.3s ease, 
                           border-color 0.3s ease,
                           box-shadow 0.3s ease !important;
            }
            
            /* Disable transitions during theme switch for performance */
            .theme-switching * {
                transition: none !important;
            }
            
            /* Theme toggle button animations */
            .theme-toggle {
                position: relative;
                overflow: hidden;
            }
            
            .theme-toggle::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transition: width 0.6s ease, height 0.6s ease;
                pointer-events: none;
            }
            
            .theme-toggle.clicked::after {
                width: 200px;
                height: 200px;
            }
            
            /* Floating elements animation on theme change */
            .floating-icon {
                transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .theme-changed .floating-icon {
                transform: scale(1.2) rotate(360deg);
            }
        `;
        document.head.appendChild(style);
        
        // Add click animation to theme toggle
        this.addThemeToggleAnimation();
    }

    /**
     * Add click animation to theme toggle button
     */
    addThemeToggleAnimation() {
        const themeToggle = document.querySelector('.theme-toggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                // Add clicked class for animation
                themeToggle.classList.add('clicked');
                
                // Remove class after animation
                setTimeout(() => {
                    themeToggle.classList.remove('clicked');
                }, 600);
                
                // Add theme changed animation to floating elements
                const floatingIcons = document.querySelectorAll('.floating-icon');
                document.body.classList.add('theme-changed');
                
                setTimeout(() => {
                    document.body.classList.remove('theme-changed');
                }, 500);
            });
        }
    }

    /**
     * Add haptic feedback if supported
     */
    addHapticFeedback() {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    /**
     * Get current theme
     * @returns {string} Current theme
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Check if dark mode is active
     * @returns {boolean} True if dark mode is active
     */
    isDarkMode() {
        return this.currentTheme === 'dark';
    }

    /**
     * Get theme colors for current theme
     * @returns {Object} Theme colors
     */
    getThemeColors() {
        const themes = {
            light: {
                primary: '#4f46e5',
                secondary: '#06b6d4',
                background: '#ffffff',
                surface: '#f8fafc',
                text: '#1e293b',
                textSecondary: '#475569'
            },
            dark: {
                primary: '#6366f1',
                secondary: '#22d3ee',
                background: '#0f172a',
                surface: '#1e293b',
                text: '#f1f5f9',
                textSecondary: '#cbd5e1'
            }
        };
        
        return themes[this.currentTheme];
    }
}

// Initialize theme manager
let themeManager;

document.addEventListener('DOMContentLoaded', () => {
    themeManager = new ThemeManager();
    
    // Setup theme toggle button event listener
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            themeManager.toggle();
        });
    }
});

// Export theme manager for global access
window.ThemeManager = ThemeManager;
window.getThemeManager = () => themeManager;

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    console.log(`🎨 System theme changed to: ${e.matches ? 'dark' : 'light'}`);
    
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('systemThemeChanged', {
        detail: { prefersDark: e.matches }
    }));
});

// Theme utilities
const ThemeUtils = {
    /**
     * Get CSS custom property value
     * @param {string} property - CSS custom property name
     * @returns {string} Property value
     */
    getCSSProperty: (property) => {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(property)
            .trim();
    },
    
    /**
     * Set CSS custom property value
     * @param {string} property - CSS custom property name
     * @param {string} value - Property value
     */
    setCSSProperty: (property, value) => {
        document.documentElement.style.setProperty(property, value);
    },
    
    /**
     * Apply custom theme colors
     * @param {Object} colors - Custom color scheme
     */
    applyCustomColors: (colors) => {
        Object.entries(colors).forEach(([key, value]) => {
            ThemeUtils.setCSSProperty(`--${key}`, value);
        });
    },
    
    /**
     * Reset to default theme colors
     */
    resetToDefault: () => {
        if (themeManager) {
            themeManager.applyTheme(themeManager.getCurrentTheme());
        }
    }
};

// Export utilities
window.ThemeUtils = ThemeUtils;

console.log('🎨 Theme system loaded successfully!');