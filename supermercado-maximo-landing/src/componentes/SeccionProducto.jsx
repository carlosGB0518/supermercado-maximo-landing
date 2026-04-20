import { useState } from 'react'
import '../estilos/SeccionProducto.css'

// ── Configuración HubSpot ──────────────────────────────────────────────
const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID
const HUBSPOT_FORM_ID   = import.meta.env.VITE_HUBSPOT_FORM_ID

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

// ── Función de tracking para Google Tag Manager ────────────────────────
function enviarEvento(evento, datos = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: evento, ...datos })
}

function FormularioNativo({ alEnviar }) {
  const [campos, setCampos] = useState({
  nombres: '',
  correo: '',
  telefono: '',
  direccion: '',
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

    const cuerpo = {
      fields: [
        { objectTypeId: '0-1', name: 'nombre_completo', value: campos.nombres },
        { objectTypeId: '0-1', name: 'email',     value: campos.correo },
        { objectTypeId: '0-1', name: 'phone',     value: campos.telefono },
        { objectTypeId: '0-1', name: 'address', value: campos.direccion }, // Ajustar según campo en HubSpot
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

      if (respuesta.ok || HUBSPOT_PORTAL_ID === 'TU_PORTAL_ID') {
        // ✅ EVENTO DE ANALYTICS: Registro exitoso
        enviarEvento('formulario_registro_enviado', { 
          barrio: campos.barrio || 'no_indicado',
          metodo: 'formulario_nativo' 
        })
        alEnviar()
      } else {
        setError('Ocurrió un error. Por favor intenta de nuevo.')
      }
    } catch {
      setError('Ocurrió un error de red. Por favor intenta de nuevo.')
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
        <label className="campo-etiqueta" htmlFor="telefono">Celular / WhatsApp</label>
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
            <label className="campo-etiqueta" htmlFor="direccion">
              Dirección de residencia
            </label>
            <input
              id="direccion"
              name="direccion"
              type="text"
              className="campo-input"
              placeholder="Ej: Cra 45 # 12-30, Kennedy"
              value={campos.direccion}
              onChange={manejarCambio}
            />
          </div>
      {error && (
        <p style={{ color: 'var(--color-rojo)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          <i className="bi bi-exclamation-circle-fill"></i> {error}
        </p>
      )}
      <button type="submit" className="btn-enviar-formulario" disabled={enviando}>
        {enviando 
          ? <><i className="bi bi-arrow-repeat spin"></i> Enviando...</> 
          : <><i className="bi bi-gift-fill"></i> Registrarme y reclamar $10.000</>
        }
      </button>
    </form>
  )
}

function MensajeExito() {
  return (
    <div className="mensaje-exito">
      <span className="mensaje-exito-icono">🎉</span>
      <h3 className="mensaje-exito-titulo">¡Bienvenido a Supermercado Máximo!</h3>
      <p className="mensaje-exito-texto">
        Revisa tu correo. Te enviamos tu cupón de{' '}
        <strong style={{ color: 'var(--color-verde)' }}>$10.000 de descuento</strong>.
      </p>
    </div>
  )
}

export default function SeccionProducto() {
  const [enviado, setEnviado] = useState(false)

  return (
    <section id="producto" className="seccion-producto">
      <div className="container">
        <div className="row align-items-start g-5">
          <div className="col-lg-6">
            <div className="producto-encabezado">
              <span className="etiqueta-seccion">Cómo funciona</span>
              <h2 className="titulo-seccion">
                De tu lista al domicilio en <span className="titulo-resaltado">4 pasos simples</span>
              </h2>
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

          <div className="col-lg-6">
            <div className="producto-panel-visual">
              <div className="tarjeta-registro-demo" id="registro">
                <div className="tarjeta-registro-header">
                  <h3>Crea tu cuenta ahora</h3>
                </div>
                <div className="tarjeta-registro-body">
                  {enviado ? <MensajeExito /> : <FormularioNativo alEnviar={() => setEnviado(true)} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}