// src/componentes/BotonFeedback.jsx
import { useState } from 'react'
import { csEvento, csConversion } from '../utilidades/contentsquare'
import '../estilos/BotonFeedback.css'

const etiquetasEstrellas = {
  1: 'Muy mala experiencia 😞',
  2: 'Mala experiencia 😕',
  3: 'Experiencia regular 😐',
  4: 'Buena experiencia 😊',
  5: 'Excelente experiencia 🎉',
}

export default function BotonFeedback() {
  const [panelAbierto, setPanelAbierto]   = useState(false)
  const [calificacion, setCalificacion]   = useState(0)
  const [hover, setHover]                 = useState(0)
  const [comentario, setComentario]       = useState('')
  const [enviando, setEnviando]           = useState(false)
  const [enviado, setEnviado]             = useState(false)

  const abrirPanel = () => {
    setPanelAbierto(true)
    csEvento('feedback_panel_abierto')
  }

  const cerrarPanel = () => {
    setPanelAbierto(false)
    setCalificacion(0)
    setComentario('')
    setEnviado(false)
  }

  const manejarEnvio = async () => {
    if (!calificacion) return
    setEnviando(true)

    // Enviar a Contentsquare como evento
    csEvento('feedback_enviado', {
      calificacion,
      etiqueta: etiquetasEstrellas[calificacion],
      comentario: comentario || 'sin comentario',
      pagina: window.location.href,
    })

    // También puedes enviar a tu propio backend o HubSpot aquí
    // Por ahora simulamos el envío
    await new Promise(r => setTimeout(r, 800))

    setEnviando(false)
    setEnviado(true)

    // Cerrar automáticamente después de 3 segundos
    setTimeout(() => cerrarPanel(), 3000)
  }

  const estrellaActiva = hover || calificacion

  return (
    <>
      {/* Tab lateral */}
      <div className="feedback-flotante">
        <button className="feedback-tab" onClick={abrirPanel} aria-label="Dar feedback">
          <i className="bi bi-chat-heart-fill"></i>
          Feedback
        </button>
      </div>

      {/* Panel */}
      <div   className={`feedback-panel ${panelAbierto ? 'abierto' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Panel de feedback">
        <div className="feedback-panel-header">
          <button className="feedback-cerrar" onClick={cerrarPanel} aria-label="Cerrar">
            <i className="bi bi-x-lg"></i>
          </button>
          <h3>¿Cómo va tu experiencia?</h3>
          <p>Tu opinión nos ayuda a mejorar</p>
        </div>

        <div className="feedback-panel-body">
          {enviado ? (
            <div className="feedback-exito">
              <span className="feedback-exito-icono">🙌</span>
              <h4 className="feedback-exito-titulo">¡Gracias por tu feedback!</h4>
              <p className="feedback-exito-texto">
                Tu opinión es muy valiosa para seguir mejorando Supermercado Máximo.
              </p>
            </div>
          ) : (
            <>
              {/* Estrellas */}
              <div className="feedback-estrellas">
                {[1, 2, 3, 4, 5].map(estrella => (
                  <button
                    key={estrella}
                    className={`feedback-estrella ${estrella <= estrellaActiva ? 'activa' : ''}`}
                    onClick={() => setCalificacion(estrella)}
                    onMouseEnter={() => setHover(estrella)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`${estrella} estrella${estrella > 1 ? 's' : ''}`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <span className="feedback-etiqueta-calificacion">
                {estrellaActiva ? etiquetasEstrellas[estrellaActiva] : 'Selecciona una calificación'}
              </span>

              {/* Comentario */}
              <textarea
                className="feedback-textarea"
                placeholder="¿Qué podemos mejorar? (opcional)"
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                maxLength={300}
              />

              <button
                className="feedback-btn-enviar"
                onClick={manejarEnvio}
                disabled={!calificacion || enviando}
              >
                {enviando
                  ? <><i className="bi bi-arrow-repeat"></i> Enviando...</>
                  : <><i className="bi bi-send-fill"></i> Enviar feedback</>
                }
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}