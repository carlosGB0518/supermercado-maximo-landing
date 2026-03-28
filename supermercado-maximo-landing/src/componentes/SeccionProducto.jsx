import { useState, useEffect } from 'react'
import '../estilos/SeccionProducto.css'

// ── Configuración HubSpot ──────────────────────────────────────────────

const HUBSPOT_PORTAL_ID  = '51259749'    // Ej: '12345678'
const HUBSPOT_FORM_ID    = 'ad43dbf7-fcba-4ea8-82a8-7a97d60677f4'      // Ej: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'

const pasos = [
  {
    numero: '1',
    titulo: 'Crea tu cuenta gratis',
    descripcion: 'Llena el formulario con tu nombre, correo y barrio. Solo toma 30 segundos y es completamente gratuito.',
  },
  {
    numero: '2',
    titulo: 'Explora nuestro catálogo',
    descripcion: 'Accede a más de 3.000 productos de canasta familiar organizados por categoría. Filtra por precio, marca o novedad.',
  },
  {
    numero: '3',
    titulo: 'Arma tu pedido',
    descripcion: 'Agrega lo que necesitas al carrito. Revisa tu lista y personaliza cantidades. Sin mínimo de compra.',
  },
  {
    numero: '4',
    titulo: 'Recibe en tu puerta',
    descripcion: 'Paga en línea o contra entrega. Tu pedido llega en menos de 2 horas, fresco y completo, garantizado.',
  },
]

// ── Componente formulario nativo (mientras cargas HubSpot) ─────────────
function FormularioNativo({ alEnviar }) {
  const [campos, setCampos] = useState({
    nombres: '',
    correo: '',
    telefono: '',
    barrio: '',
  })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  const manejarCambio = e => {
    setCampos(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const manejarEnvio = async e => {
    e.preventDefault()
    if (!campos.nombres || !campos.correo) {
      setError('Por favor completa los campos obligatorios.')
      return
    }

    setEnviando(true)

    // ── Envío a HubSpot API v3 ──────────────────────────────────────────
    const cuerpo = {
      fields: [
        { objectTypeId: '0-1', name: 'firstname',   value: campos.nombres },
        { objectTypeId: '0-1', name: 'email',        value: campos.correo },
        { objectTypeId: '0-1', name: 'phone',        value: campos.telefono },
        { objectTypeId: '0-1', name: 'city',         value: campos.barrio },
      ],
      context: {
        pageUri:  window.location.href,
        pageName: 'Landing Page — Supermercado Máximo',
      },
    }

    try {
      const respuesta = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(cuerpo),
        }
      )

      if (respuesta.ok) {
        alEnviar()
      } else {
        // En desarrollo (IDs de prueba) mostramos el mensaje de éxito igual
        if (HUBSPOT_PORTAL_ID === 'TU_PORTAL_ID') {
          alEnviar()
        } else {
          setError('Ocurrió un error. Por favor intenta de nuevo.')
        }
      }
    } catch {
      // Sin conexión o IDs no configurados → mostramos éxito en dev
      if (HUBSPOT_PORTAL_ID === 'TU_PORTAL_ID') {
        alEnviar()
      } else {
        setError('Ocurrió un error de red. Por favor intenta de nuevo.')
      }
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <div className="campo-grupo">
        <label className="campo-etiqueta" htmlFor="nombres">
          Nombre completo <span style={{ color: 'var(--color-rojo)' }}>*</span>
        </label>
        <input
          id="nombres"
          name="nombres"
          type="text"
          className="campo-input"
          placeholder="Ej: María Rodríguez"
          value={campos.nombres}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="campo-grupo">
        <label className="campo-etiqueta" htmlFor="correo">
          Correo electrónico <span style={{ color: 'var(--color-rojo)' }}>*</span>
        </label>
        <input
          id="correo"
          name="correo"
          type="email"
          className="campo-input"
          placeholder="Ej: maria@correo.com"
          value={campos.correo}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="campo-grupo">
        <label className="campo-etiqueta" htmlFor="telefono">
          Celular / WhatsApp
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          className="campo-input"
          placeholder="Ej: 310 123 4567"
          value={campos.telefono}
          onChange={manejarCambio}
        />
      </div>

      <div className="campo-grupo">
        <label className="campo-etiqueta" htmlFor="barrio">
          ¿En qué barrio vives?
        </label>
        <select
          id="barrio"
          name="barrio"
          className="campo-input campo-select"
          value={campos.barrio}
          onChange={manejarCambio}
        >
          <option value="">Selecciona tu barrio</option>
          <option value="kennedy">Kennedy</option>
          <option value="bosa">Bosa</option>
          <option value="suba">Suba</option>
          <option value="engativa">Engativá</option>
          <option value="usme">Usme</option>
          <option value="fontibon">Fontibón</option>
          <option value="otro">Otro barrio</option>
        </select>
      </div>

      {error && (
        <p style={{ color: 'var(--color-rojo)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          <i className="bi bi-exclamation-circle-fill"></i> {error}
        </p>
      )}

      <button type="submit" className="btn-enviar-formulario" disabled={enviando}>
        {enviando
          ? <><i className="bi bi-arrow-repeat" style={{ animation: 'rotarLento 0.8s linear infinite' }}></i> Enviando...</>
          : <><i className="bi bi-gift-fill"></i> Registrarme y reclamar $10.000</>
        }
      </button>

      <p className="formulario-privacidad">
        <i className="bi bi-shield-lock-fill"></i>
        Tus datos están protegidos. Sin spam, prometido.
      </p>
    </form>
  )
}

// ── Mensaje de éxito ───────────────────────────────────────────────────
function MensajeExito() {
  return (
    <div className="mensaje-exito">
      <span className="mensaje-exito-icono">🎉</span>
      <h3 className="mensaje-exito-titulo">¡Bienvenido a Supermercado Máximo!</h3>
      <p className="mensaje-exito-texto">
        Revisa tu correo. Te enviamos tu cupón de{' '}
        <strong style={{ color: 'var(--color-verde)' }}>$10.000 de descuento</strong>{' '}
        y los pasos para hacer tu primer pedido.
      </p>
    </div>
  )
}

// ── Componente principal ───────────────────────────────────────────────
export default function SeccionProducto() {
  const [enviado, setEnviado] = useState(false)

  // Carga del script embed de HubSpot (alternativa al formulario nativo)
  // Si prefieres usar el embed oficial de HubSpot, descomenta esto:
  /*
  useEffect(() => {
    if (HUBSPOT_PORTAL_ID === 'TU_PORTAL_ID') return
    const script = document.createElement('script')
    script.src = '//js.hsforms.net/forms/embed/v2.js'
    script.charset = 'utf-8'
    script.type = 'text/javascript'
    script.onload = () => {
      window.hbspt.forms.create({
        region:   'na1',
        portalId: HUBSPOT_PORTAL_ID,
        formId:   HUBSPOT_FORM_ID,
        target:   '#hubspot-form-contenedor',
      })
    }
    document.body.appendChild(script)
  }, [])
  */

  return (
    <section id="producto" className="seccion-producto">
      <div className="container">
        <div className="row align-items-start g-5">

          {/* Columna izquierda — pasos */}
          <div className="col-lg-6">
            <div className="producto-encabezado">
              <span className="etiqueta-seccion">Cómo funciona</span>
              <h2 className="titulo-seccion">
                De tu lista al domicilio en{' '}
                <span className="titulo-resaltado">4 pasos simples</span>
              </h2>
              <p style={{ color: 'var(--color-texto-suave)', marginTop: '1rem' }}>
                Diseñamos el proceso para que sea tan fácil como llamar al tendero de siempre,
                pero desde la comodidad de tu hogar.
              </p>
            </div>

            <div className="lista-pasos">
              {pasos.map(paso => (
                <div key={paso.numero} className="paso-item">
                  <div className="paso-numero">{paso.numero}</div>
                  <div className="paso-contenido">
                    <h3 className="paso-titulo">{paso.titulo}</h3>
                    <p className="paso-descripcion">{paso.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha — formulario */}
          <div className="col-lg-6">
            <div className="producto-panel-visual">
              <div className="tarjeta-registro-demo" id="registro">
                <span className="badge-gratis">✨ 100% Gratis</span>

                <div className="tarjeta-registro-header">
                  <h3>Crea tu cuenta ahora</h3>
                  <p>Únete a +12.000 familias que ya ahorran con Máximo</p>
                </div>

                <div className="tarjeta-registro-body">
                  {/* Si HubSpot embed está habilitado, usa: */}
                  {/* <div id="hubspot-form-contenedor" className="formulario-hubspot-contenedor" /> */}

                  {/* Formulario nativo con envío a HubSpot API */}
                  {enviado
                    ? <MensajeExito />
                    : <FormularioNativo alEnviar={() => setEnviado(true)} />
                  }
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
