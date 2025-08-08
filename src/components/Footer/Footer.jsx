import React from 'react'

const Footer = () => {
  return (
    <footer className="footer" style={{ 
      background: 'var(--bg-secondary)', 
      padding: '40px 0', 
      textAlign: 'center',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="container">
        <div style={{ fontSize: '24px', marginBottom: '16px' }}>
          🛡️ <strong>CiberNiños</strong>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Aprendiendo ciberseguridad de forma divertida y segura
        </p>
        <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
          © 2024 CiberNiños. Hecho con ❤️ para la educación digital infantil.
        </div>
      </div>
    </footer>
  )
}

export default Footer