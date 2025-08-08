import React, { useState, useEffect } from 'react'
import { useTheme } from '../../utils/ThemeContext'
import ThemeToggle from './ThemeToggle'
import './Navigation.css'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'contraseñas', label: 'Contraseñas' },
    { id: 'phishing', label: 'Phishing' },
    { id: 'redes-sociales', label: 'Redes Sociales' },
    { id: 'privacidad', label: 'Privacidad' },
    { id: 'dispositivos', label: 'Dispositivos' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className={`navigation ${isScrolled ? 'navigation--scrolled' : ''}`} role="navigation" aria-label="Navegación principal">
      <div className="container">
        <div className="navigation__content">
          <div className="navigation__logo">
            <button 
              className="logo-btn"
              onClick={() => scrollToSection('hero')}
              aria-label="Ir al inicio"
            >
              🛡️ <span>CiberNiños</span>
            </button>
          </div>

          <div className="navigation__desktop">
            <ul className="navigation__menu" role="menubar">
              {navItems.map((item) => (
                <li key={item.id} role="none">
                  <button
                    className="navigation__link"
                    onClick={() => scrollToSection(item.id)}
                    role="menuitem"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          <div className="navigation__mobile">
            <ThemeToggle />
            <button
              className="navigation__hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Abrir menú de navegación"
            >
              <span className={`hamburger-line ${isMenuOpen ? 'hamburger-line--active' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'hamburger-line--active' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'hamburger-line--active' : ''}`}></span>
            </button>
          </div>
        </div>

        <div 
          id="mobile-menu"
          className={`navigation__mobile-menu ${isMenuOpen ? 'navigation__mobile-menu--open' : ''}`}
          role="menu"
        >
          <ul className="navigation__mobile-list">
            {navItems.map((item) => (
              <li key={item.id} role="none">
                <button
                  className="navigation__mobile-link"
                  onClick={() => scrollToSection(item.id)}
                  role="menuitem"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation