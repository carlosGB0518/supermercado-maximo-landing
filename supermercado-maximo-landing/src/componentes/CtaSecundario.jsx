import '../estilos/CtaSecundario.css'

const garantias = [
  { icono: 'bi-check-circle-fill', texto: 'Sin tarjeta requerida' },
  { icono: 'bi-check-circle-fill', texto: 'Cancela cuando quieras' },
  { icono: 'bi-check-circle-fill', texto: 'Soporte en WhatsApp' },
  { icono: 'bi-check-circle-fill', texto: 'Devolución garantizada' },
]

export default function CtaSecundario() {
  return (
    <section className="cta-secundario">
      <div className="container">
        <div className="cta-secundario-contenido">
          <span className="cta-secundario-emoji">🎁</span>

          <h2 className="cta-secundario-titulo">
            Tu primer mercado con $10.000 de descuento.
            <br />
            <span style={{ color: 'var(--color-verde-oscuro)' }}>¿Qué esperas?</span>
          </h2>

          <p className="cta-secundario-subtitulo">
            Más de 12.000 familias ya hacen su mercado más fácil, más económico y sin
            complicaciones. Únete hoy.
          </p>

          <div className="cta-secundario-botones">
            <a href="#registro" className="btn-oscuro">
              <i className="bi bi-person-plus-fill"></i>
              Crear mi cuenta gratis
            </a>
            <a href="#preguntas" className="btn-transparente-oscuro">
              <i className="bi bi-question-circle"></i>
              Tengo preguntas
            </a>
          </div>

          <div className="cta-garantias">
            {garantias.map(g => (
              <div key={g.texto} className="garantia-item">
                <i className={`bi ${g.icono}`}></i>
                {g.texto}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
