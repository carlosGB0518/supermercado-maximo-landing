import { useState } from 'react'
import '../estilos/PrePie.css'

const estadisticasFinales = [
  { numero: '+12K', etiqueta: 'Familias felices' },
  { numero: '+3K', etiqueta: 'Productos disponibles' },
  { numero: '2h', etiqueta: 'Tiempo máx. de entrega' },
  { numero: '98%', etiqueta: 'Tasa de satisfacción' },
]

export default function PrePie() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSuscribir = async () => {
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('https://api.mailersend.com/v1/email', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer mlsn.bad747fbaaa140e3573a30f0773d9f93ccc9de74d3c3a0f63c7680318aed4de7',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: {
            email: 'noreply@test-zxk54v85qm6ljy6v.mlsender.net',
            name: 'Supermercado Máximo'
          },
          to: [{ email }],
          template_id: '3zxk54v0edpgjy6v'
        })
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="pre-pie">
      <div className="container">
        <div className="pre-pie-contenido">
          <h2 className="pre-pie-titulo">
            Haz parte del mercado<br />
            <span>que te cuida</span>
          </h2>

          <p className="pre-pie-subtitulo">
            Regístrate gratis hoy y descubre por qué miles de familias
            en Bogotá eligen Supermercado Máximo como su mercado de confianza.
          </p>

          {/* Formulario de suscripción */}
          <div className="pre-pie-form">
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="pre-pie-input"
              disabled={status === 'loading'}
            />
            <button
              onClick={handleSuscribir}
              className="btn-marca-primario"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Enviando...' : '✉️ Suscribirme'}
            </button>
          </div>

          {status === 'success' && (
            <p className="pre-pie-msg-ok">✅ ¡Listo! Revisa tu correo.</p>
          )}
          {status === 'error' && (
            <p className="pre-pie-msg-error">❌ Algo salió mal, intenta de nuevo.</p>
          )}

          {/* Stats finales */}
          <div className="pre-pie-stats">
            {estadisticasFinales.map(s => (
              <div key={s.etiqueta} className="pre-pie-stat">
                <span className="pre-pie-stat-numero">{s.numero}</span>
                <span className="pre-pie-stat-etiqueta">{s.etiqueta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}