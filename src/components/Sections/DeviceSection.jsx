import React from 'react'

const DeviceSection = () => {
  return (
    <section id="dispositivos" className="section">
      <div className="container">
        <div className="text-center">
          <h2 className="section__title">
            💻 Uso Responsable de Dispositivos
          </h2>
          <p className="section__subtitle">
            Cuida tus dispositivos y úsalos de forma inteligente y segura
          </p>
          <div style={{ padding: '40px', background: 'var(--bg-secondary)', borderRadius: '20px', marginTop: '20px' }}>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
              🚧 Sección en construcción - Próximamente incluirá consejos sobre cuidado de dispositivos y hábitos saludables
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeviceSection