import React from 'react'

const PhishingSection = () => {
  return (
    <section id="phishing" className="section">
      <div className="container">
        <div className="text-center">
          <h2 className="section__title">
            🎣 Detecta el Phishing
          </h2>
          <p className="section__subtitle">
            Aprende a identificar mensajes peligrosos y protégete de los estafadores
          </p>
          <div style={{ padding: '40px', background: 'var(--bg-secondary)', borderRadius: '20px', marginTop: '20px' }}>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
              🚧 Sección en construcción - Próximamente incluirá ejemplos interactivos de phishing y juegos de detección
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PhishingSection