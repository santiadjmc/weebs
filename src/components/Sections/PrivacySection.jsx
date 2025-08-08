import React from 'react'

const PrivacySection = () => {
  return (
    <section id="privacidad" className="section">
      <div className="container">
        <div className="text-center">
          <h2 className="section__title">
            🔒 Tu Privacidad Online
          </h2>
          <p className="section__subtitle">
            Aprende a proteger tu información personal en internet
          </p>
          <div style={{ padding: '40px', background: 'var(--bg-secondary)', borderRadius: '20px', marginTop: '20px' }}>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
              🚧 Sección en construcción - Próximamente incluirá consejos sobre datos personales y configuraciones de privacidad
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrivacySection