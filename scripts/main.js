/**
 * Main JavaScript file for CiberSeguridad Kids application
 * Handles theme toggling, navigation, scroll animations, and core interactions
 */

// Global state management
const AppState = {
  currentTheme: localStorage.getItem('theme') || 'light',
  isMenuOpen: false,
  scrollPosition: 0
};

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
  initializeTheme();
  initializeNavigation();
  initializeScrollAnimations();
  initializeMobileMenu();
  initializePasswordStrength();
  initializePhishingGame();
  initializeSocialMediaSimulator();
  initializePrivacyControls();
  initializeScreenTimeTracker();
  initializeParticleEffects();
  initializeSmoothScrolling();
}

/**
 * Theme Management
 */
function initializeTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  // Set initial theme
  if (AppState.currentTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
  }
  
  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const newTheme = AppState.currentTheme === 'light' ? 'dark' : 'light';
  
  AppState.currentTheme = newTheme;
  
  if (newTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
  }
  
  localStorage.setItem('theme', newTheme);
  
  // Add animation class for smooth transition
  html.classList.add('theme-transitioning');
  setTimeout(() => {
    html.classList.remove('theme-transitioning');
  }, 300);
}

/**
 * Navigation Management
 */
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('[id]');
  
  // Add click event listeners to navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });
  
  // Update active navigation on scroll
  window.addEventListener('scroll', updateActiveNavigation);
}

function handleNavClick(e) {
  e.preventDefault();
  const targetId = e.target.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  if (targetSection) {
    scrollToSection(targetId.substring(1));
    closeMobileMenu();
  }
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll('[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollPosition = window.scrollY + 100; // Offset for fixed header
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach(link => link.classList.remove('active'));
      
      // Add active class to current section link
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

/**
 * Mobile Menu Management
 */
function initializeMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && AppState.isMenuOpen) {
        closeMobileMenu();
      }
    });
  }
}

function toggleMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  AppState.isMenuOpen = !AppState.isMenuOpen;
  
  if (AppState.isMenuOpen) {
    navMenu.classList.add('active');
    menuBtn.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
  } else {
    closeMobileMenu();
  }
}

function closeMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  AppState.isMenuOpen = false;
  navMenu.classList.remove('active');
  menuBtn.classList.remove('active');
  menuBtn.setAttribute('aria-expanded', 'false');
}

/**
 * Scroll Animations
 */
function initializeScrollAnimations() {
  // Create intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(handleScrollAnimation, observerOptions);
  
  // Observe elements with scroll animation classes
  const animatedElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Add stagger animation to certain containers
  const staggerContainers = document.querySelectorAll('.tips-grid, .red-flags-grid, .cyberbullying-grid, .wellness-grid');
  staggerContainers.forEach(container => {
    container.classList.add('stagger-children');
  });
}

function handleScrollAnimation(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}

/**
 * Password Strength Checker
 */
function initializePasswordStrength() {
  const passwordInput = document.querySelector('#password-input');
  const togglePassword = document.querySelector('.toggle-password');
  
  if (passwordInput) {
    passwordInput.addEventListener('input', checkPasswordStrength);
  }
  
  if (togglePassword) {
    togglePassword.addEventListener('click', togglePasswordVisibility);
  }
}

function checkPasswordStrength() {
  const password = document.querySelector('#password-input').value;
  const strengthBar = document.querySelector('.strength-fill');
  const strengthText = document.querySelector('.strength-text');
  
  if (!password) {
    strengthBar.className = 'strength-fill';
    strengthText.textContent = 'Escribe una contraseña para evaluarla';
    return;
  }
  
  let score = 0;
  let feedback = [];
  
  // Length check
  if (password.length >= 8) {
    score += 25;
  } else {
    feedback.push('al menos 8 caracteres');
  }
  
  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 25;
  } else {
    feedback.push('una letra mayúscula');
  }
  
  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 25;
  } else {
    feedback.push('una letra minúscula');
  }
  
  // Number or symbol check
  if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 25;
  } else {
    feedback.push('un número o símbolo');
  }
  
  // Update UI based on score
  let strengthClass = '';
  let strengthLabel = '';
  
  if (score <= 25) {
    strengthClass = 'weak';
    strengthLabel = '❌ Muy débil';
  } else if (score <= 50) {
    strengthClass = 'fair';
    strengthLabel = '⚠️ Débil';
  } else if (score <= 75) {
    strengthClass = 'good';
    strengthLabel = '✅ Buena';
  } else {
    strengthClass = 'strong';
    strengthLabel = '🛡️ Súper fuerte';
  }
  
  strengthBar.className = `strength-fill ${strengthClass}`;
  
  if (feedback.length > 0) {
    strengthText.textContent = `${strengthLabel} - Necesita: ${feedback.join(', ')}`;
  } else {
    strengthText.textContent = `${strengthLabel} - ¡Perfecta!`;
  }
}

function togglePasswordVisibility() {
  const passwordInput = document.querySelector('#password-input');
  const toggleButton = document.querySelector('.toggle-password');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleButton.textContent = '🙈';
    toggleButton.setAttribute('aria-label', 'Ocultar contraseña');
  } else {
    passwordInput.type = 'password';
    toggleButton.textContent = '👁️';
    toggleButton.setAttribute('aria-label', 'Mostrar contraseña');
  }
}

function generateRandomPassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const length = 12;
  let password = '';
  
  // Ensure at least one of each required type
  password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
  password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
  password += '0123456789'[Math.floor(Math.random() * 10)];
  password += '!@#$%^&*()'[Math.floor(Math.random() * 10)];
  
  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  
  // Shuffle the password
  password = password.split('').sort(() => Math.random() - 0.5).join('');
  
  const passwordInput = document.querySelector('#password-input');
  passwordInput.value = password;
  checkPasswordStrength();
  
  // Add success animation
  passwordInput.classList.add('success-state');
  setTimeout(() => {
    passwordInput.classList.remove('success-state');
  }, 1000);
}

/**
 * Phishing Detection Game
 */
function initializePhishingGame() {
  const emailCards = document.querySelectorAll('.email-card');
  
  emailCards.forEach(card => {
    card.addEventListener('click', handleEmailClick);
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEmailClick.call(this);
      }
    });
    // Make cards focusable
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
  });
}

function handleEmailClick() {
  const feedbackDiv = document.querySelector('.game-feedback');
  const isSafe = this.dataset.safe === 'true';
  
  // Remove previous selections
  document.querySelectorAll('.email-card').forEach(card => {
    card.classList.remove('selected', 'correct', 'incorrect');
  });
  
  this.classList.add('selected');
  
  setTimeout(() => {
    if (isSafe) {
      this.classList.add('correct');
      feedbackDiv.className = 'game-feedback correct';
      feedbackDiv.textContent = '🎉 ¡Correcto! Este email parece legítimo. Viene de una fuente confiable y no pide información personal.';
    } else {
      this.classList.add('incorrect');
      feedbackDiv.className = 'game-feedback incorrect';
      feedbackDiv.textContent = '⚠️ ¡Cuidado! Este email es sospechoso. Fíjate en la dirección falsa (gmai1.com en lugar de gmail.com) y el tono urgente pidiendo acción inmediata.';
    }
    
    feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 500);
}

/**
 * Social Media Post Analyzer
 */
function initializeSocialMediaSimulator() {
  // Implementation would go here
  // For brevity, focusing on core functionality first
}

function analyzePost() {
  const postInput = document.querySelector('.post-input');
  const privacyOptions = document.querySelectorAll('input[name="privacy"]');
  const resultDiv = document.querySelector('.analysis-result');
  
  const postText = postInput.value.trim();
  const selectedPrivacy = Array.from(privacyOptions).find(option => option.checked)?.value;
  
  if (!postText) {
    resultDiv.className = 'analysis-result warning';
    resultDiv.textContent = '📝 Escribe algo para analizar tu publicación.';
    return;
  }
  
  // Simple analysis logic
  const dangerousKeywords = ['casa', 'dirección', 'escuela', 'teléfono', 'celular', 'sola', 'solo', 'padres no están'];
  const personalInfo = dangerousKeywords.some(keyword => postText.toLowerCase().includes(keyword));
  
  if (personalInfo) {
    resultDiv.className = 'analysis-result danger';
    resultDiv.textContent = '🚨 ¡Cuidado! Tu publicación contiene información personal que podría ser peligrosa. Considera no compartir detalles sobre ubicación, contacto o cuándo estás solo.';
  } else if (selectedPrivacy === 'public') {
    resultDiv.className = 'analysis-result warning';
    resultDiv.textContent = '⚠️ Tu publicación será pública. ¿Estás seguro de que quieres que todos la vean? Considera cambiar la configuración a "Solo Amigos".';
  } else {
    resultDiv.className = 'analysis-result safe';
    resultDiv.textContent = '✅ ¡Excelente! Tu publicación parece segura y tienes buena configuración de privacidad.';
  }
}

/**
 * Privacy Controls
 */
function initializePrivacyControls() {
  const toggles = document.querySelectorAll('.toggle-input');
  
  toggles.forEach(toggle => {
    toggle.addEventListener('change', updatePrivacyScore);
  });
  
  updatePrivacyScore(); // Initial calculation
}

function updatePrivacyScore() {
  const toggles = document.querySelectorAll('.toggle-input');
  const scoreElement = document.querySelector('.score-number');
  const scoreText = document.querySelector('.privacy-score p');
  
  const checkedToggles = Array.from(toggles).filter(toggle => toggle.checked);
  const score = Math.round((checkedToggles.length / toggles.length) * 100);
  
  scoreElement.textContent = score;
  
  if (score >= 90) {
    scoreText.textContent = '¡Excelente! Tu configuración de privacidad es súper segura 🎉';
    scoreText.className = 'text-success';
  } else if (score >= 70) {
    scoreText.textContent = '¡Bien! Tu privacidad está bastante protegida 👍';
    scoreText.className = 'text-info';
  } else {
    scoreText.textContent = '⚠️ Considera mejorar tu configuración de privacidad';
    scoreText.className = 'text-warning';
  }
}

/**
 * Screen Time Tracker
 */
function initializeScreenTimeTracker() {
  updateScreenTimeDisplay();
  setInterval(updateScreenTimeDisplay, 60000); // Update every minute
}

function updateScreenTimeDisplay() {
  const canvas = document.getElementById('timeCanvas');
  const timeElement = document.getElementById('screenTime');
  
  if (!canvas || !timeElement) return;
  
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 60;
  
  // Simulate screen time (in a real app, this would come from actual usage data)
  const currentHour = new Date().getHours();
  const screenTimeMinutes = (currentHour * 15) + Math.floor(Math.random() * 60); // Simulated
  const hours = Math.floor(screenTimeMinutes / 60);
  const minutes = screenTimeMinutes % 60;
  
  timeElement.textContent = `${hours}h ${minutes}m`;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw background circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-primary').trim();
  ctx.lineWidth = 8;
  ctx.stroke();
  
  // Draw progress arc
  const maxRecommendedMinutes = 120; // 2 hours
  const progressAngle = (screenTimeMinutes / maxRecommendedMinutes) * 2 * Math.PI;
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + progressAngle);
  
  // Color based on usage
  if (screenTimeMinutes <= 60) {
    ctx.strokeStyle = '#10b981'; // Green
  } else if (screenTimeMinutes <= 120) {
    ctx.strokeStyle = '#f59e0b'; // Yellow
  } else {
    ctx.strokeStyle = '#ef4444'; // Red
  }
  
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.stroke();
}

/**
 * Particle Effects
 */
function initializeParticleEffects() {
  const buttons = document.querySelectorAll('.btn-primary');
  
  buttons.forEach(button => {
    button.addEventListener('click', createParticleEffect);
  });
}

function createParticleEffect(e) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const particles = 6;
  
  for (let i = 0; i < particles; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.animationDelay = (i * 0.1) + 's';
    
    button.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 3000);
  }
}

/**
 * Smooth Scrolling
 */
function initializeSmoothScrolling() {
  // Add smooth scrolling behavior
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        scrollToSection(href.substring(1));
      }
    });
  });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = section.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Utility Functions
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

// Make functions available globally for HTML onclick handlers
window.scrollToSection = scrollToSection;
window.generateRandomPassword = generateRandomPassword;
window.analyzePost = analyzePost;
window.toggleTheme = toggleTheme;