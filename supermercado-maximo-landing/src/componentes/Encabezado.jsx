import { useState, useEffect } from 'react'
import '../estilos/Encabezado.css'

const enlacesNav = [
  { etiqueta: 'Beneficios', href: '#beneficios' },
  { etiqueta: 'Cómo funciona', href: '#producto' },
  { etiqueta: 'Testimonios', href: '#testimonios' },
  { etiqueta: 'Preguntas', href: '#preguntas' },
]

export default function Encabezado() {
  const [desplazado, setDesplazado] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    const manejarScroll = () => setDesplazado(window.scrollY > 50)
    window.addEventListener('scroll', manejarScroll)
    return () => window.removeEventListener('scroll', manejarScroll)
  }, [])

  return (
    <header className={`encabezado ${desplazado ? 'desplazado' : ''}`}>
      <div className="container">
        <div className="encabezado-inner">
          {/* Logo */}
          <a href="#inicio" className="logo-marca">
            <span className="logo-marca-superior">🛒 El mercado de tu barrio</span>
            <span className="logo-marca-nombre">
              Supermercado <span>Máximo</span>
            </span>
            <span className="logo-marca-estrellas">★ ★ ★</span>
          </a>

          {/* Nav escritorio */}
          <nav className="nav-escritorio">
            <ul className="nav-lista">
              {enlacesNav.map(({ etiqueta, href }) => (
                <li key={href}>
                  <a href={href} className="nav-enlace">{etiqueta}</a>
                </li>
              ))}
              <li>
                <a href="#registro" className="nav-enlace nav-cta">
                  Registrarme gratis <i className="bi bi-arrow-right"></i>
                </a>
              </li>
            </ul>
          </nav>

          {/* Botón hamburguesa */}
          <button
            className="btn-menu"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            <i className={`bi ${menuAbierto ? 'bi-x-lg' : 'bi-list'}`}></i>
          </button>
        </div>
      </div>

      {/* Nav móvil */}
      <div className={`nav-movil ${menuAbierto ? 'abierto' : ''}`}>
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
            <a href="#registro" className="nav-enlace nav-cta" onClick={() => setMenuAbierto(false)}>
              Registrarme gratis <i className="bi bi-arrow-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
