import '../estilos/SeccionTestimonios.css'

const testimonios = [
  {
    avatar: '👩',
    nombre: 'Sandra Milena Torres',
    barrio: 'Kennedy, Bogotá',
    estrellas: 5,
    texto: 'Desde que me registré no he vuelto a hacer fila en ningún supermercado. El domicilio llega súper rápido y los productos siempre frescos. ¡La leche, las verduras, todo perfecto!',
  },
  {
    avatar: '👨',
    nombre: 'Carlos Andrés Gómez',
    barrio: 'Suba, Bogotá',
    estrellas: 5,
    texto: 'Al principio dudaba, pero el primer pedido me convenció. Los precios son mejores que en la tienda de la esquina y el servicio es excelente. Ya llevo 3 meses usando Máximo.',
  },
  {
    avatar: '👩‍🦱',
    nombre: 'Yolanda Herrera Paz',
    barrio: 'Bosa, Bogotá',
    estrellas: 5,
    texto: 'Mi mamá y yo pedimos juntas y ahorramos un montón. El cupón de bienvenida sí funcionó, nos dieron el descuento sin problema. Muy recomendado para familias grandes.',
  },
  {
    avatar: '🧑',
    nombre: 'Jhon Edisson Vargas',
    barrio: 'Engativá, Bogotá',
    estrellas: 5,
    texto: 'Me encanta que puedo pagar contra entrega. No necesito tarjeta ni nada raro. El muchacho del domicilio es muy amable y siempre llega en el tiempo prometido.',
  },
  {
    avatar: '👩‍🦳',
    nombre: 'Patricia Londoño',
    barrio: 'Fontibón, Bogotá',
    estrellas: 5,
    texto: 'Pensé que era complicado pero es muy fácil. Mi hija me ayudó a registrarme y ahora yo misma hago mis pedidos. Las carnes son de muy buena calidad.',
  },
  {
    avatar: '👨‍💼',
    nombre: 'Mauricio Rincón',
    barrio: 'Usme, Bogotá',
    estrellas: 4,
    texto: 'Muy buen servicio en general. Una vez tuve un inconveniente con un producto y me lo cambiaron sin problema al día siguiente. Eso dice mucho de la empresa.',
  },
]

const plataformas = [
  { icono: 'bi-google', nombre: '4.9 en Google' },
  { icono: 'bi-facebook', nombre: '4.8 en Facebook' },
  { icono: 'bi-chat-dots-fill', nombre: '4.9 en Trustpilot' },
]

export default function SeccionTestimonios() {
  return (
    <section id="testimonios" className="seccion-testimonios">
      <div className="container">

        {/* Encabezado */}
        <div className="testimonios-encabezado">
          <span className="etiqueta-seccion">Lo que dicen nuestros clientes</span>

          <div className="puntuacion-general">
            <span className="puntuacion-numero">4.9</span>
            <div className="puntuacion-detalles">
              <span className="puntuacion-estrellas">★★★★★</span>
              <span className="puntuacion-reseñas">Basado en +1.200 reseñas verificadas</span>
            </div>
          </div>

          <h2 className="titulo-seccion titulo-seccion-blanco">
            Familias reales,{' '}
            <span style={{ color: 'var(--color-amarillo)' }}>resultados reales</span>
          </h2>
        </div>

        {/* Grid de testimonios */}
        <div className="row g-4" style={{ position: 'relative', zIndex: 2 }}>
          {testimonios.map((t, i) => (
            <div key={t.nombre} className={`col-md-6 col-lg-4 animar-subir delay-${(i % 5) + 1}`}>
              <div className="tarjeta-testimonio">
                <span className="testimonio-verificado">
                  <i className="bi bi-patch-check-fill"></i> Verificado
                </span>

                <span className="testimonio-comillas">"</span>
                <span className="testimonio-estrellas">
                  {'★'.repeat(t.estrellas)}{'☆'.repeat(5 - t.estrellas)}
                </span>

                <p className="testimonio-texto">{t.texto}</p>

                <div className="testimonio-autor">
                  <div className="testimonio-avatar">{t.avatar}</div>
                  <div>
                    <span className="testimonio-nombre">{t.nombre}</span>
                    <span className="testimonio-barrio">
                      <i className="bi bi-geo-alt-fill" style={{ fontSize: '0.7rem' }}></i>{' '}
                      {t.barrio}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Plataformas */}
        <div className="barra-plataformas">
          <p className="plataformas-titulo">Calificaciones en plataformas externas</p>
          <div className="plataformas-items">
            {plataformas.map(p => (
              <div key={p.nombre} className="plataforma-item">
                <i className={`bi ${p.icono}`}></i>
                {p.nombre}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
