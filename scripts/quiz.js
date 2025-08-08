/**
 * Quiz functionality for the cybersecurity education app
 * Handles quiz questions, scoring, and progress tracking
 */

// Quiz data structure
const quizData = [
  {
    question: "¿Cuál de estas es una contraseña fuerte?",
    options: [
      "123456",
      "password", 
      "MiGato7VuelaPorLaCasa!",
      "abc123"
    ],
    correctAnswer: 2,
    explanation: "¡Correcto! Una contraseña fuerte debe tener al menos 8 caracteres, mayúsculas, minúsculas, números y símbolos."
  },
  {
    question: "¿Qué debes hacer si recibes un email que dice 'Tu cuenta será cerrada en 24 horas'?",
    options: [
      "Hacer clic en el enlace inmediatamente",
      "Darle tu contraseña al remitente",
      "Ignorarlo y verificar directamente en el sitio oficial",
      "Reenviarlo a todos tus amigos"
    ],
    correctAnswer: 2,
    explanation: "¡Exacto! Siempre verifica directamente en el sitio oficial. Los emails urgentes suelen ser phishing."
  },
  {
    question: "¿Qué información NO deberías compartir en redes sociales?",
    options: [
      "Tus comidas favoritas",
      "Tu dirección de casa",
      "Fotos de tu mascota",
      "Tus hobbies"
    ],
    correctAnswer: 1,
    explanation: "¡Correcto! Tu dirección es información privada que podría ponerte en peligro."
  },
  {
    question: "¿Cuál es una buena práctica para el uso de dispositivos?",
    options: [
      "Dejarlos sin bloqueo de pantalla",
      "Nunca actualizarlos",
      "Usar bloqueo de pantalla siempre",
      "Prestarlos a desconocidos"
    ],
    correctAnswer: 2,
    explanation: "¡Perfecto! El bloqueo de pantalla protege tu información si pierdes el dispositivo."
  },
  {
    question: "¿Qué son las cookies en internet?",
    options: [
      "Galletas digitales que puedes comer",
      "Virus que dañan tu computadora",
      "Pequeños archivos que recuerdan información",
      "Juegos online"
    ],
    correctAnswer: 2,
    explanation: "¡Bien! Las cookies son archivos que los sitios web usan para recordar información sobre ti."
  }
];

// Quiz state
let currentQuestionIndex = 0;
let userAnswers = [];
let quizScore = 0;
let quizActive = false;

/**
 * Initialize the quiz system
 */
function initializeQuiz() {
  resetQuiz();
  setupQuizEventListeners();
}

/**
 * Setup event listeners for quiz elements
 */
function setupQuizEventListeners() {
  const nextButton = document.querySelector('.quiz-next');
  if (nextButton) {
    nextButton.addEventListener('click', nextQuestion);
  }

  // Initialize quiz options click handlers
  setupQuestionEventListeners();
}

/**
 * Setup event listeners for current question options
 */
function setupQuestionEventListeners() {
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((option, index) => {
    option.addEventListener('click', () => selectAnswer(index));
    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectAnswer(index);
      }
    });
  });
}

/**
 * Start or restart the quiz
 */
function startQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  quizScore = 0;
  quizActive = true;
  
  showQuestion();
  updateProgress();
  
  // Hide results and show quiz
  document.querySelector('.quiz-results').style.display = 'none';
  document.querySelector('.quiz-container').style.display = 'block';
}

/**
 * Reset quiz to initial state
 */
function resetQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  quizScore = 0;
  quizActive = false;
  
  updateProgress();
  showQuestion();
}

/**
 * Display the current question
 */
function showQuestion() {
  if (currentQuestionIndex >= quizData.length) {
    showResults();
    return;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const questionElement = document.querySelector('.quiz-question h3');
  const optionsContainer = document.querySelector('.quiz-options');
  const feedbackElement = document.querySelector('.quiz-feedback');
  const nextButton = document.querySelector('.quiz-next');

  // Update question text
  if (questionElement) {
    questionElement.textContent = currentQuestion.question;
  }

  // Update options
  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
      const optionButton = document.createElement('button');
      optionButton.className = 'quiz-option';
      optionButton.textContent = option;
      optionButton.setAttribute('data-index', index);
      optionButton.setAttribute('tabindex', '0');
      optionButton.addEventListener('click', () => selectAnswer(index));
      optionButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectAnswer(index);
        }
      });
      optionsContainer.appendChild(optionButton);
    });
  }

  // Hide feedback and next button
  if (feedbackElement) {
    feedbackElement.style.display = 'none';
    feedbackElement.className = 'quiz-feedback';
  }
  
  if (nextButton) {
    nextButton.style.display = 'none';
  }

  updateProgress();
}

/**
 * Handle answer selection
 */
function selectAnswer(selectedIndex) {
  if (!quizActive || userAnswers[currentQuestionIndex] !== undefined) {
    return; // Already answered this question
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const options = document.querySelectorAll('.quiz-option');
  const feedbackElement = document.querySelector('.quiz-feedback');
  const nextButton = document.querySelector('.quiz-next');
  
  // Store the answer
  userAnswers[currentQuestionIndex] = selectedIndex;
  
  // Disable all options and show correct/incorrect states
  options.forEach((option, index) => {
    option.style.pointerEvents = 'none';
    
    if (index === selectedIndex) {
      option.classList.add('selected');
    }
    
    if (index === currentQuestion.correctAnswer) {
      option.classList.add('correct');
    } else if (index === selectedIndex && index !== currentQuestion.correctAnswer) {
      option.classList.add('incorrect');
    }
  });
  
  // Show feedback
  const isCorrect = selectedIndex === currentQuestion.correctAnswer;
  if (isCorrect) {
    quizScore++;
    feedbackElement.className = 'quiz-feedback correct';
    feedbackElement.textContent = `✅ ${currentQuestion.explanation}`;
  } else {
    feedbackElement.className = 'quiz-feedback incorrect';
    feedbackElement.textContent = `❌ Respuesta incorrecta. ${currentQuestion.explanation}`;
  }
  
  feedbackElement.style.display = 'block';
  
  // Show next button or results
  if (currentQuestionIndex < quizData.length - 1) {
    nextButton.textContent = 'Siguiente Pregunta';
    nextButton.style.display = 'block';
  } else {
    nextButton.textContent = 'Ver Resultados';
    nextButton.style.display = 'block';
  }
  
  // Add animation to feedback
  setTimeout(() => {
    feedbackElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 300);
}

/**
 * Move to the next question
 */
function nextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showResults();
  }
}

/**
 * Update the progress indicator
 */
function updateProgress() {
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
  
  if (progressFill) {
    progressFill.style.width = `${Math.min(progress, 100)}%`;
  }
  
  if (progressText) {
    progressText.textContent = `Pregunta ${currentQuestionIndex + 1} de ${quizData.length}`;
  }
}

/**
 * Show quiz results
 */
function showResults() {
  quizActive = false;
  
  const quizContainer = document.querySelector('.quiz-container');
  const resultsContainer = document.querySelector('.quiz-results');
  const scoreNumber = document.querySelector('.results-score .score-number');
  const resultsMessage = document.querySelector('.results-message');
  const resultsIcon = document.querySelector('.results-icon');
  
  // Hide quiz, show results
  if (quizContainer) quizContainer.style.display = 'none';
  if (resultsContainer) resultsContainer.style.display = 'block';
  
  // Update score
  if (scoreNumber) {
    scoreNumber.textContent = quizScore;
  }
  
  // Generate results message and icon based on score
  const percentage = (quizScore / quizData.length) * 100;
  let message = '';
  let icon = '';
  
  if (percentage >= 90) {
    icon = '🏆';
    message = '¡Increíble! Eres un experto en ciberseguridad. ¡Sigue así y mantén tus conocimientos actualizados!';
  } else if (percentage >= 70) {
    icon = '🎉';
    message = '¡Muy bien! Tienes buenos conocimientos sobre ciberseguridad. Repasa los temas que fallaste para ser aún mejor.';
  } else if (percentage >= 50) {
    icon = '📚';
    message = 'Buen intento. Tienes una base sólida, pero deberías repasar algunos conceptos importantes de ciberseguridad.';
  } else {
    icon = '🤔';
    message = 'No te preocupes, todos aprendemos paso a paso. Te recomendamos revisar todo el contenido y volver a intentarlo.';
  }
  
  if (resultsIcon) resultsIcon.textContent = icon;
  if (resultsMessage) resultsMessage.textContent = message;
  
  // Add celebration animation for good scores
  if (percentage >= 70) {
    resultsContainer.classList.add('animate-bounce');
    setTimeout(() => {
      resultsContainer.classList.remove('animate-bounce');
    }, 2000);
  }
  
  // Scroll to results
  setTimeout(() => {
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);
  
  // Track completion (in a real app, this would go to analytics)
  console.log('Quiz completed:', {
    score: quizScore,
    total: quizData.length,
    percentage: percentage,
    answers: userAnswers
  });
}

/**
 * Restart the quiz
 */
function restartQuiz() {
  // Reset all state
  currentQuestionIndex = 0;
  userAnswers = [];
  quizScore = 0;
  quizActive = false;
  
  // Show quiz container, hide results
  document.querySelector('.quiz-container').style.display = 'block';
  document.querySelector('.quiz-results').style.display = 'none';
  
  // Start fresh
  startQuiz();
  
  // Scroll to quiz
  setTimeout(() => {
    document.querySelector('.quiz-section').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

/**
 * Get quiz statistics (for potential future features)
 */
function getQuizStats() {
  return {
    currentQuestion: currentQuestionIndex + 1,
    totalQuestions: quizData.length,
    score: quizScore,
    percentage: quizData.length > 0 ? (quizScore / quizData.length) * 100 : 0,
    isActive: quizActive,
    answers: [...userAnswers]
  };
}

/**
 * Add new question to quiz (for potential admin features)
 */
function addQuestion(questionData) {
  if (questionData && questionData.question && questionData.options && 
      questionData.correctAnswer !== undefined && questionData.explanation) {
    quizData.push(questionData);
    return true;
  }
  return false;
}

/**
 * Shuffle quiz questions for variety
 */
function shuffleQuiz() {
  // Fisher-Yates shuffle algorithm
  for (let i = quizData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
  }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeQuiz();
  
  // Auto-start quiz when user scrolls to it (optional)
  const quizSection = document.querySelector('.quiz-section');
  if (quizSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !quizActive && userAnswers.length === 0) {
          // Optional: Auto-start quiz when it comes into view
          // startQuiz();
        }
      });
    }, {
      threshold: 0.5
    });
    
    observer.observe(quizSection);
  }
});

// Make functions globally available
window.restartQuiz = restartQuiz;
window.startQuiz = startQuiz;
window.shuffleQuiz = shuffleQuiz;