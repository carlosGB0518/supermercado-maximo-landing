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
  const [status, setStatus] = useState('') // '' | 'loading' | 'success' | 'error'

  const handleSuscribir = async () => {
    // Validación básica de email
    if (!email || !email.includes('@')) {
      alert("Por favor, ingresa un correo válido");
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('https://api.mailersend.com/v1/email', {
        method: 'POST',
        headers: {
          // CORRECCIÓN: Se agregaron los backticks ``
          'Authorization': `Bearer ${import.meta.env.VITE_MAILERSEND_KEY}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', 
        },
        body: JSON.stringify({
          from: {
            email: import.meta.env.VITE_FROM_EMAIL,
            name: 'Supermercado Máximo'
          },
          to: [{ email: email }], // CORRECCIÓN: mejor ser explícito
          template_id: import.meta.env.VITE_MAILERSEND_TEMPLATE
        })
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        const errorData = await res.json();
        console.error("Error API:", errorData);
        setStatus('error')
      }
    } catch (error) {
      console.error("Error de red:", error);
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