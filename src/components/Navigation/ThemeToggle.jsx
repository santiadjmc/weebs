import React from 'react'
import { useTheme } from '../../utils/ThemeContext'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <div className="theme-toggle__track">
        <div className={`theme-toggle__thumb ${isDark ? 'theme-toggle__thumb--dark' : ''}`}>
          <span className="theme-toggle__icon">
            {isDark ? '🌙' : '☀️'}
          </span>
        </div>
      </div>
      <span className="visually-hidden">
        {isDark ? 'Modo oscuro activado' : 'Modo claro activado'}
      </span>
    </button>
  )
}

export default ThemeToggle