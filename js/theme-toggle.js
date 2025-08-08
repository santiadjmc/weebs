// Theme Toggle Functionality for CyberNiños Application

class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        
        // Set initial theme
        this.applyTheme(this.currentTheme);
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup system theme change detection
        this.setupSystemThemeDetection();
        
        console.log('🎨 Theme Manager Initialized - Current theme:', this.currentTheme);
    }

    setupEventListeners() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });

            // Keyboard accessibility
            this.themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });

            // Add hover effects
            this.themeToggle.addEventListener('mouseenter', () => {
                this.addHoverEffect();
            });

            this.themeToggle.addEventListener('mouseleave', () => {
                this.removeHoverEffect();
            });
        }
    }

    setupSystemThemeDetection() {
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                // Only update if user hasn't manually set a preference
                if (!this.hasManualPreference()) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme(newTheme);
                    this.currentTheme = newTheme;
                }
            });
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        this.storeTheme(newTheme);
        this.currentTheme = newTheme;
        
        // Add toggle animation
        this.animateToggle();
        
        // Announce to screen readers
        const announcement = newTheme === 'dark' 
            ? 'Tema oscuro activado' 
            : 'Tema claro activado';
        
        if (window.announceToScreenReader) {
            window.announceToScreenReader(announcement);
        }

        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: newTheme }
        }));

        console.log('🎨 Theme switched to:', newTheme);
    }

    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        
        // Update toggle button appearance
        this.updateToggleAppearance(theme);
        
        // Update meta theme color for mobile browsers
        this.updateMetaThemeColor(theme);
        
        // Apply theme-specific animations
        this.applyThemeTransitions();
    }

    updateToggleAppearance(theme) {
        if (!this.themeToggle) return;

        const toggleButton = this.themeToggle.querySelector('.toggle-button');
        const sunIcon = this.themeToggle.querySelector('.sun-icon');
        const moonIcon = this.themeToggle.querySelector('.moon-icon');

        if (theme === 'dark') {
            this.themeToggle.setAttribute('aria-label', 'Cambiar a tema claro');
            this.themeToggle.setAttribute('title', 'Cambiar a tema claro');
        } else {
            this.themeToggle.setAttribute('aria-label', 'Cambiar a tema oscuro');
            this.themeToggle.setAttribute('title', 'Cambiar a tema oscuro');
        }
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }

        const colors = {
            light: '#4c6ef5',
            dark: '#2d3748'
        };

        metaThemeColor.content = colors[theme];
    }

    applyThemeTransitions() {
        // Add smooth transition class temporarily
        document.body.classList.add('theme-transition');
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }

    animateToggle() {
        if (!this.themeToggle) return;

        // Add click animation
        this.themeToggle.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.themeToggle.style.transform = 'scale(1)';
        }, 150);

        // Create ripple effect
        this.createRippleEffect();
    }

    createRippleEffect() {
        const ripple = document.createElement('div');
        ripple.className = 'theme-toggle-ripple';
        
        // Position the ripple
        const rect = this.themeToggle.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;

        this.themeToggle.style.position = 'relative';
        this.themeToggle.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    addHoverEffect() {
        if (!this.themeToggle) return;
        
        this.themeToggle.style.transform = 'scale(1.05)';
        this.themeToggle.style.filter = 'brightness(1.1)';
    }

    removeHoverEffect() {
        if (!this.themeToggle) return;
        
        this.themeToggle.style.transform = 'scale(1)';
        this.themeToggle.style.filter = 'brightness(1)';
    }

    getStoredTheme() {
        try {
            return localStorage.getItem('cyberNinosTheme');
        } catch (e) {
            console.warn('Could not access localStorage for theme preference');
            return null;
        }
    }

    storeTheme(theme) {
        try {
            localStorage.setItem('cyberNinosTheme', theme);
        } catch (e) {
            console.warn('Could not store theme preference in localStorage');
        }
    }

    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    hasManualPreference() {
        return this.getStoredTheme() !== null;
    }

    // Public method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Public method to set theme programmatically
    setTheme(theme) {
        if (theme !== 'light' && theme !== 'dark') {
            console.error('Invalid theme:', theme);
            return;
        }
        
        this.applyTheme(theme);
        this.storeTheme(theme);
        this.currentTheme = theme;
    }
}

// Advanced Theme Features
class AdvancedThemeFeatures {
    constructor(themeManager) {
        this.themeManager = themeManager;
        this.init();
    }

    init() {
        this.setupAutoThemeSchedule();
        this.setupBatteryAwareTheme();
        this.setupHighContrastSupport();
        this.setupCustomThemeEvents();
    }

    setupAutoThemeSchedule() {
        // Auto-switch theme based on time of day
        const schedulePreference = this.getSchedulePreference();
        
        if (schedulePreference.enabled) {
            this.checkTimeBasedTheme();
            
            // Check every hour
            setInterval(() => {
                this.checkTimeBasedTheme();
            }, 60000 * 60);
        }
    }

    checkTimeBasedTheme() {
        const now = new Date();
        const hour = now.getHours();
        const schedulePreference = this.getSchedulePreference();
        
        // Default schedule: dark theme from 7 PM to 7 AM
        const darkStart = schedulePreference.darkStart || 19;
        const darkEnd = schedulePreference.darkEnd || 7;
        
        let shouldBeDark = false;
        
        if (darkStart > darkEnd) {
            // Overnight period (e.g., 19:00 to 07:00)
            shouldBeDark = hour >= darkStart || hour < darkEnd;
        } else {
            // Same day period (e.g., 07:00 to 19:00)
            shouldBeDark = hour >= darkStart && hour < darkEnd;
        }
        
        const expectedTheme = shouldBeDark ? 'dark' : 'light';
        
        if (this.themeManager.getCurrentTheme() !== expectedTheme && 
            !this.hasRecentManualChange()) {
            this.themeManager.setTheme(expectedTheme);
            console.log('🕒 Auto theme change:', expectedTheme);
        }
    }

    setupBatteryAwareTheme() {
        // Switch to dark theme on low battery to save power
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                const checkBattery = () => {
                    if (battery.level < 0.15 && !battery.charging) {
                        if (this.themeManager.getCurrentTheme() === 'light') {
                            this.themeManager.setTheme('dark');
                            this.showBatteryThemeNotification();
                        }
                    }
                };

                battery.addEventListener('levelchange', checkBattery);
                battery.addEventListener('chargingchange', checkBattery);
                checkBattery(); // Initial check
            });
        }
    }

    setupHighContrastSupport() {
        // Support for high contrast mode
        if (window.matchMedia) {
            const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
            
            const updateHighContrast = (e) => {
                if (e.matches) {
                    document.body.classList.add('high-contrast');
                } else {
                    document.body.classList.remove('high-contrast');
                }
            };

            highContrastQuery.addEventListener('change', updateHighContrast);
            updateHighContrast(highContrastQuery); // Initial check
        }
    }

    setupCustomThemeEvents() {
        // Listen for custom theme events
        window.addEventListener('themeChanged', (e) => {
            this.recordManualChange();
            this.updateThemeDependentFeatures(e.detail.theme);
        });
    }

    updateThemeDependentFeatures(theme) {
        // Update charts colors, maps themes, etc.
        this.updateProgressRingColors(theme);
        this.updateNotificationStyles(theme);
    }

    updateProgressRingColors(theme) {
        const progressRing = document.querySelector('.progress-ring-circle');
        if (progressRing) {
            const colors = {
                light: '#4c6ef5',
                dark: '#7c3aed'
            };
            progressRing.setAttribute('stroke', colors[theme]);
        }
    }

    updateNotificationStyles(theme) {
        // Update existing notifications to match theme
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            if (theme === 'dark') {
                notification.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.4)';
            } else {
                notification.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            }
        });
    }

    getSchedulePreference() {
        try {
            const stored = localStorage.getItem('cyberNinosThemeSchedule');
            return stored ? JSON.parse(stored) : { enabled: false };
        } catch (e) {
            return { enabled: false };
        }
    }

    recordManualChange() {
        try {
            localStorage.setItem('cyberNinosLastManualThemeChange', Date.now());
        } catch (e) {
            console.warn('Could not record manual theme change');
        }
    }

    hasRecentManualChange() {
        try {
            const lastChange = localStorage.getItem('cyberNinosLastManualThemeChange');
            if (!lastChange) return false;
            
            // Consider manual change recent if within last 30 minutes
            const thirtyMinutes = 30 * 60 * 1000;
            return Date.now() - parseInt(lastChange) < thirtyMinutes;
        } catch (e) {
            return false;
        }
    }

    showBatteryThemeNotification() {
        if (window.showNotification) {
            window.showNotification(
                'Cambiando a tema oscuro para ahorrar batería 🔋',
                'info'
            );
        }
    }
}

// CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    .theme-transition * {
        transition: background-color 0.3s ease, 
                   color 0.3s ease, 
                   border-color 0.3s ease,
                   box-shadow 0.3s ease !important;
    }
    
    .high-contrast {
        --border-color: #000 !important;
        --shadow-light: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
        --shadow-medium: 0 4px 8px rgba(0, 0, 0, 0.5) !important;
        --shadow-heavy: 0 8px 16px rgba(0, 0, 0, 0.5) !important;
    }
    
    .high-contrast * {
        border-width: 2px !important;
    }
`;
document.head.appendChild(style);

// Initialize theme management when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create global theme manager instance
    window.themeManager = new ThemeManager();
    
    // Initialize advanced theme features
    window.advancedThemeFeatures = new AdvancedThemeFeatures(window.themeManager);
    
    console.log('✨ Advanced Theme System Initialized');
});

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        AdvancedThemeFeatures
    };
}