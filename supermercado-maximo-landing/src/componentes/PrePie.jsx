import '../estilos/PrePie.css'

const estadisticasFinales = [
  { numero: '+12K', etiqueta: 'Familias felices' },
  { numero: '+3K', etiqueta: 'Productos disponibles' },
  { numero: '2h', etiqueta: 'Tiempo máx. de entrega' },
  { numero: '98%', etiqueta: 'Tasa de satisfacción' },
]

export default function PrePie() {
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

          <div className="pre-pie-botones">
            <a href="#registro" className="btn-marca-primario">
              <i className="bi bi-person-plus-fill"></i>
              Empezar ahora — Es gratis
            </a>
          </div>

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
