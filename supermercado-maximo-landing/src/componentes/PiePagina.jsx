import '../estilos/PiePagina.css'

const enlacesEmpresa = [
  { etiqueta: 'Sobre nosotros', href: '#' },
  { etiqueta: 'Cómo funciona', href: '#producto' },
  { etiqueta: 'Trabaja con nosotros', href: '#' },
  { etiqueta: 'Blog de recetas', href: '#' },
  { etiqueta: 'Prensa', href: '#' },
]

const enlacesAyuda = [
  { etiqueta: 'Preguntas frecuentes', href: '#preguntas' },
  { etiqueta: 'Seguimiento de pedido', href: '#' },
  { etiqueta: 'Política de devoluciones', href: '#' },
  { etiqueta: 'Zonas de cobertura', href: '#' },
  { etiqueta: 'Reportar un problema', href: '#' },
]

const redesSociales = [
  { icono: 'bi-facebook', href: '#', titulo: 'Facebook' },
  { icono: 'bi-instagram', href: '#', titulo: 'Instagram' },
  { icono: 'bi-tiktok', href: '#', titulo: 'TikTok' },
  { icono: 'bi-whatsapp', href: 'https://wa.me/573000000000', titulo: 'WhatsApp' },
]

export default function PiePagina() {
  const anioActual = new Date().getFullYear()

  return (
    <footer className="pie-pagina">
      <div className="container">
        <div className="row g-5">

          {/* Columna 1 — Logo e info */}
          <div className="col-lg-4 col-md-6">
            <a href="#inicio" className="pie-logo">
              <span className="pie-logo-nombre">
                Supermercado <span>Máximo</span>
              </span>
              <span className="pie-logo-estrellas">★ ★ ★</span>
            </a>

            <p className="pie-descripcion">
              El mercado de tu barrio, ahora más cerca que nunca. Productos frescos,
              precios justos y el trato cálido que mereces.
            </p>

            {/* Redes */}
            <div className="pie-redes">
              {redesSociales.map(r => (
                <a
                  key={r.titulo}
                  href={r.href}
                  className="pie-red"
                  title={r.titulo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`bi ${r.icono}`}></i>
                </a>
              ))}
            </div>

            {/* Badge HubSpot */}
            <div className="pie-hubspot-badge">
              <i className="bi bi-circle-fill"></i>
              Integrado con HubSpot CRM
            </div>
          </div>

          {/* Columna 2 — Empresa */}
          <div className="col-lg-2 col-md-6 col-6">
            <h4 className="pie-columna-titulo">Empresa</h4>
            <ul className="pie-lista">
              {enlacesEmpresa.map(e => (
                <li key={e.etiqueta}>
                  <a href={e.href} className="pie-enlace">{e.etiqueta}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Ayuda */}
          <div className="col-lg-2 col-md-6 col-6">
            <h4 className="pie-columna-titulo">Ayuda</h4>
            <ul className="pie-lista">
              {enlacesAyuda.map(e => (
                <li key={e.etiqueta}>
                  <a href={e.href} className="pie-enlace">{e.etiqueta}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 — Contacto */}
          <div className="col-lg-4 col-md-6">
            <h4 className="pie-columna-titulo">Contáctanos</h4>

            <div className="pie-contacto-item">
              <i className="bi bi-whatsapp"></i>
              <span>+57 300 000 0000<br />
                <small>Lun–Dom 7am–9pm</small>
              </span>
            </div>

            <div className="pie-contacto-item">
              <i className="bi bi-envelope-fill"></i>
              <span>hola@supermercadomaximo.co</span>
            </div>

            <div className="pie-contacto-item">
              <i className="bi bi-geo-alt-fill"></i>
              <span>Bogotá D.C., Colombia<br />
                <small>Kennedy · Bosa · Suba · Engativá · Fontibón · Usme</small>
              </span>
            </div>

            <div className="pie-contacto-item" style={{ marginTop: '1rem' }}>
              <i className="bi bi-clock-fill"></i>
              <span>Domicilios: 7am – 9pm todos los días</span>
            </div>
          </div>

        </div>

        {/* Barra inferior */}
        <div className="pie-barra-inferior">
          <p className="pie-copyright">
            © {anioActual} <span>Supermercado Máximo</span>. Todos los derechos reservados.
            Hecho con ❤️ en Bogotá.
          </p>

          <nav className="pie-legal">
            <a href="#" className="pie-enlace-legal">Términos y condiciones</a>
            <a href="#" className="pie-enlace-legal">Política de privacidad</a>
            <a href="#" className="pie-enlace-legal">Cookies</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
