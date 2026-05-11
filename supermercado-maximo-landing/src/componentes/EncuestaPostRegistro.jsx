// src/componentes/EncuestaPostRegistro.jsx
import { useState, useEffect } from 'react'
import { csEvento, csDispararEncuesta } from '../utilidades/contentsquare'
import '../estilos/EncuestaPostRegistro.css'

const preguntas = [
  {
    id: 'como_conociste',
    texto: '¿Cómo conociste Supermercado Máximo?',
    opciones: [
      { valor: 'redes_sociales', etiqueta: '📱 Redes sociales' },
      { valor: 'recomendacion', etiqueta: '👥 Me lo recomendaron' },
      { valor: 'google', etiqueta: '🔍 Lo busqué en Google' },
      { valor: 'publicidad', etiqueta: '📢 Vi un anuncio' },
      { valor: 'otro', etiqueta: '✨ Otro medio' },
    ],
  },
  {
    id: 'motivo_registro',
    texto: '¿Cuál es tu principal motivo para registrarte?',
    opciones: [
      { valor: 'precios', etiqueta: '💰 Los precios me parecen buenos' },
      { valor: 'comodidad', etiqueta: '🛋️ Quiero recibir el mercado en casa' },
      { valor: 'descuento', etiqueta: '🎁 El descuento de bienvenida' },
      { valor: 'curiosidad', etiqueta: '🤔 Quiero conocer el servicio' },
    ],
  },
  {
    id: 'frecuencia_mercado',
    texto: '¿Con qué frecuencia haces el mercado?',
    opciones: [
      { valor: 'semanal', etiqueta: '📅 Una vez a la semana' },
      { valor: 'quincenal', etiqueta: '📅 Cada quince días' },
      { valor: 'mensual', etiqueta: '📅 Una vez al mes' },
      { valor: 'variable', etiqueta: '🔄 Varía según necesidad' },
    ],
  },
]

export default function EncuestaPostRegistro({ alCerrar }) {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas]         = useState({})
  const [finalizada, setFinalizada]         = useState(false)

  // Disparar encuesta en Contentsquare cuando el componente se monta
  useEffect(() => {
    csEvento('encuesta_post_registro_iniciada')
    // Si tienes un ID de encuesta en CS, dispárala también:
    // csDispararEncuesta('ID_ENCUESTA_EN_CONTENTSQUARE')
  }, [])

  const pregunta = preguntas[preguntaActual]
  const totalPreguntas = preguntas.length
  const progreso = ((preguntaActual) / totalPreguntas) * 100
  const respuestaActual = respuestas[pregunta.id]

  const seleccionarOpcion = (valor) => {
    setRespuestas(prev => ({ ...prev, [pregunta.id]: valor }))
  }

  const irSiguiente = () => {
    if (preguntaActual < totalPreguntas - 1) {
      setPreguntaActual(prev => prev + 1)
    } else {
      finalizarEncuesta()
    }
  }

  const irAnterior = () => {
    if (preguntaActual > 0) setPreguntaActual(prev => prev - 1)
  }

  const finalizarEncuesta = () => {
    // Enviar todas las respuestas a Contentsquare
    csEvento('encuesta_post_registro_completada', {
      como_conociste:    respuestas.como_conociste    || 'omitido',
      motivo_registro:   respuestas.motivo_registro   || 'omitido',
      frecuencia_mercado: respuestas.frecuencia_mercado || 'omitido',
    })
    setFinalizada(true)
    setTimeout(() => alCerrar(), 3000)
  }

  const omitirEncuesta = () => {
    csEvento('encuesta_post_registro_omitida', { en_pregunta: preguntaActual + 1 })
    alCerrar()
  }

  return (
    <div className="encuesta-overlay" onClick={e => e.target === e.currentTarget && omitirEncuesta()}>
      <div className="encuesta-modal" role="dialog" aria-modal="true">

        {/* Header */}
        <div className="encuesta-header">
          <span className="encuesta-header-emoji">🎉</span>
          <h3>¡Ya eres parte de Máximo!</h3>
          <p>Cuéntanos un poco más sobre ti — solo 3 preguntas rápidas</p>
        </div>

        {/* Barra de progreso */}
        <div className="encuesta-progreso">
          <div
            className="encuesta-progreso-barra"
            style={{ width: finalizada ? '100%' : `${progreso}%` }}
          />
        </div>

        <div className="encuesta-body">
          {finalizada ? (
            // Pantalla de agradecimiento
            <div className="encuesta-final">
              <span className="encuesta-final-emoji">🌿</span>
              <h4 className="encuesta-final-titulo">¡Muchas gracias!</h4>
              <p className="encuesta-final-texto">
                Tus respuestas nos ayudan a mejorar la experiencia para ti
                y para todas las familias de Máximo.
              </p>
              <button className="encuesta-btn-siguiente" onClick={alCerrar}>
                <i className="bi bi-check-circle-fill"></i>
                Ir al inicio
              </button>
            </div>
          ) : (
            <>
              {/* Pregunta */}
              <span className="encuesta-pregunta-numero">
                Pregunta {preguntaActual + 1} de {totalPreguntas}
              </span>
              <p className="encuesta-pregunta-texto">{pregunta.texto}</p>

              {/* Opciones */}
              <div className="encuesta-opciones">
                {pregunta.opciones.map(opcion => (
                  <button
                    key={opcion.valor}
                    className={`encuesta-opcion ${respuestaActual === opcion.valor ? 'seleccionada' : ''}`}
                    onClick={() => seleccionarOpcion(opcion.valor)}
                  >
                    <span className="encuesta-opcion-indicador" />
                    {opcion.etiqueta}
                  </button>
                ))}
              </div>

              {/* Navegación */}
              <div className="encuesta-navegacion">
                {preguntaActual > 0 && (
                  <button className="encuesta-btn-anterior" onClick={irAnterior}>
                    <i className="bi bi-arrow-left"></i>
                    Anterior
                  </button>
                )}
                <button
                  className="encuesta-btn-siguiente"
                  onClick={irSiguiente}
                  disabled={!respuestaActual}
                >
                  {preguntaActual === totalPreguntas - 1
                    ? <><i className="bi bi-send-fill"></i> Enviar</>
                    : <>Siguiente <i className="bi bi-arrow-right"></i></>
                  }
                </button>
              </div>

              <div className="encuesta-omitir">
                <button className="encuesta-btn-omitir" onClick={omitirEncuesta}>
                  Omitir encuesta
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  )
}