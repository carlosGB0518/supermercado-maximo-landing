import '../estilos/CtaIntermedio.css'

function enviarEvento(evento, datos = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: evento, ...datos })
}

export default function CtaIntermedio() {
  return (
    <section className="cta-intermedio">
      <div className="container">
        <div className="cta-intermedio-contenido">
          <span className="cta-intermedio-icono">🛒</span>
          <h2 className="cta-intermedio-titulo">
            ¿Listo para hacer tu{' '}
            <span>primer mercado sin filas?</span>
          </h2>
          <p className="cta-intermedio-subtitulo">
            Regístrate gratis hoy y recibe un cupón de{' '}
            <strong style={{ color: 'var(--color-amarillo)' }}>$10.000 de descuento</strong>{' '}
            en tu primera compra. Solo por tiempo limitado.
          </p>
          <div className="cta-intermedio-botones">
            {/* CORREGIDO: Se agregó la etiqueta <a que faltaba */}
            <a 
              href="#registro"
              className="btn-marca-primario"
              onClick={() => enviarEvento('clic_reclamar_descuento', { ubicacion: 'cta_intermedio' })}
            >
              <i className="bi bi-gift-fill"></i> Reclamar mi descuento
            </a>
            
            <a href="#testimonios" className="btn-marca-secundario">
              <i className="bi bi-chat-quote"></i> Ver testimonios
            </a>
          </div>
          <div className="cta-urgencia">
            <i className="bi bi-clock-fill"></i>
            Oferta válida solo por las próximas 48 horas · Quedan 87 cupones
          </div>
        </div>
      </div>
    </section>
  )
}