import '../estilos/SeccionHero.css'

const estadisticas = [
  { numero: '+12K', etiqueta: 'Familias registradas' },
  { numero: '98%', etiqueta: 'Satisfacción' },
  { numero: '4.9★', etiqueta: 'Calificación' },
]
const categorias = ['🥩 Carnes', '🥬 Verduras', '🥛 Lácteos', '🥫 Abarrotes', '🧼 Aseo']

function enviarEvento(evento, datos = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: evento, ...datos })
}

export default function SeccionHero() {
  return (
    <section id="inicio" className="hero">
      <div className="container">
        <div className="row align-items-center hero-contenido">
          <div className="col-lg-6">
            <div className="hero-badge animar-subir delay-1">
              <i className="bi bi-stars"></i> Nuevo · Ya disponible en tu barrio
            </div>
            <h1 className="hero-titulo animar-subir delay-2">
              El mercado de tu barrio,{' '}
              <span className="acento">ahora más fácil</span> que nunca
            </h1>
            <p className="hero-descripcion animar-subir delay-3">
              Registrate gratis y accede a precios exclusivos, domicilios rápidos
              y los mejores productos de la canasta familiar. Sin filas, sin esperas,
              con el trato cálido que mereces.
            </p>
            <div className="hero-botones animar-subir delay-4">
              <a href="#registro" className="btn-marca-primario">
                <i className="bi bi-person-plus-fill"></i> Registrarme gratis
              </a>
              
              {/* CORREGIDO: Se agregó la etiqueta <a */}
              <a 
                href="#producto"
                className="btn-marca-secundario"
                onClick={() => enviarEvento('clic_como_funciona_hero', { ubicacion: 'hero' })}
              >
                <i className="bi bi-play-circle"></i> Cómo funciona
              </a>
            </div>
            <div className="hero-stats animar-subir delay-5">
              {estadisticas.map((s, i) => (
                <div key={s.etiqueta} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  {i > 0 && <div className="hero-stat-sep" />}
                  <div className="hero-stat-item">
                    <span className="hero-stat-numero">{s.numero}</span>
                    <span className="hero-stat-etiqueta">{s.etiqueta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-visual animar-der delay-2">
              <div className="hero-circulo-fondo flotar" />
              <div className="hero-tarjeta-flotante">
                <span className="hero-emoji-principal">🛒</span>
                <div className="hero-tarjeta-titulo">Supermercado Máximo</div>
                <div className="hero-tarjeta-subtitulo">Canasta familiar · Domicilio · Ahorro</div>
                <div className="hero-chips">
                  {categorias.map(cat => (
                    <span key={cat} className="hero-chip">{cat}</span>
                  ))}
                </div>
                <div className="hero-badge-flotante">
                  <span className="hero-badge-flotante-icono">🌿</span>
                  <div>
                    <div className="hero-badge-flotante-texto">Productos frescos</div>
                    <div className="hero-badge-flotante-sub">Directo del productor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}