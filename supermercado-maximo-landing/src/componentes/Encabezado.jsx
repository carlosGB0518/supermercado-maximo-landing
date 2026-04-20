import { useState, useEffect } from 'react'
import '../estilos/Encabezado.css'

const enlacesNav = [
  { etiqueta: 'Beneficios', href: '#beneficios' },
  { etiqueta: 'Cómo funciona', href: '#producto' },
  { etiqueta: 'Testimonios', href: '#testimonios' },
  { etiqueta: 'Preguntas', href: '#preguntas' },
]

function enviarEvento(evento, datos = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: evento, ...datos })
}

export default function Encabezado() {
  const [desplazado, setDesplazado] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    const manejarScroll = () => setDesplazado(window.scrollY > 50)
    window.addEventListener('scroll', manejarScroll)
    return () => window.removeEventListener('scroll', manejarScroll)
  }, [])

  return (
    <header className={desplazado ? 'encabezado desplazado' : 'encabezado'}>
      <div className="container">
        <div className="encabezado-inner">
          <a href="#inicio" className="logo-marca">
            <span className="logo-marca-superior">El mercado de tu barrio</span>
            <span className="logo-marca-nombre">Supermercado <span>Máximo</span></span>
            <span className="logo-marca-estrellas">★ ★ ★</span>
          </a>

          <nav className="nav-escritorio">
            <ul className="nav-lista">
              {enlacesNav.map(({ etiqueta, href }) => (
                <li key={href}>
                  <a href={href} className="nav-enlace">{etiqueta}</a>
                </li>
              ))}
              <li>
                <a
                  href="#registro"
                  className="nav-enlace nav-cta"
                  onClick={() => enviarEvento('clic_registrarme_navbar', { ubicacion: 'navbar' })}
                >
                  Registrarme gratis <i className="bi bi-arrow-right"></i>
                </a>
              </li>
            </ul>
          </nav>

          <button
            className="btn-menu"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            <i className={menuAbierto ? 'bi bi-x-lg' : 'bi bi-list'}></i>
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      <div className={menuAbierto ? 'nav-movil abierto' : 'nav-movil'}>
        <ul className="nav-lista">
          {enlacesNav.map(({ etiqueta, href }) => (
            <li key={href} style={{ width: '100%' }}>
              <a
                href={href}
                className="nav-enlace"
                onClick={() => setMenuAbierto(false)}
              >
                {etiqueta}
              </a>
            </li>
          ))}
          <li style={{ width: '100%' }}>
            <a
              href="#registro"
              className="nav-enlace nav-cta"
              onClick={() => {
                setMenuAbierto(false)
                enviarEvento('clic_registrarme_navbar', { ubicacion: 'navbar_movil' })
              }}
            >
              Registrarme gratis <i className="bi bi-arrow-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}