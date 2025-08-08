import { createContext, useContext, useState, useEffect } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('ciberninos-theme');
    return saved === 'dark';
  });

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      localStorage.setItem('ciberninos-theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const value = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};