import '../estilos/SeccionBeneficios.css'

const beneficios = [
  {
    emoji: '💰',
    colorIcono: 'icono-amarillo',
    titulo: 'Precios que sí alcanza el bolsillo',
    descripcion: 'Negociamos directo con proveedores para darte los mejores precios del barrio. Sin intermediarios, sin sorpresas en la caja.',
    tag: '✓ Hasta 30% de ahorro',
  },
  {
    emoji: '🚀',
    colorIcono: 'icono-verde',
    titulo: 'Domicilio en menos de 2 horas',
    descripcion: 'Hacemos tu pedido llegar rápido y fresco. Nuestros mensajeros conocen el barrio y llegan cuando los necesitas.',
    tag: '✓ Envío desde $3.000',
  },
  {
    emoji: '🌿',
    colorIcono: 'icono-verde',
    titulo: 'Productos frescos garantizados',
    descripcion: 'Frutas, verduras y carnes seleccionadas a diario. Si no estás satisfecho, te devolvemos tu dinero sin preguntas.',
    tag: '✓ Garantía de frescura',
  },
  {
    emoji: '❤️',
    colorIcono: 'icono-rojo',
    titulo: 'El trato cálido de un vecino',
    descripcion: 'No somos una cadena fría. Somos el supermercado de tu barrio que te conoce por nombre y cuida de tu familia.',
    tag: '✓ Atención personalizada',
  },
  {
    emoji: '📲',
    colorIcono: 'icono-amarillo',
    titulo: 'Pide desde donde estés',
    descripcion: 'Regístrate una vez y accede a tu historial de compras, listas de mercado y ofertas exclusivas para miembros.',
    tag: '✓ 100% en línea',
  },
  {
    emoji: '🏆',
    colorIcono: 'icono-verde',
    titulo: 'Programa de puntos y beneficios',
    descripcion: 'Cada compra acumula puntos que puedes canjear por descuentos, productos gratis y sorpresas del mes.',
    tag: '✓ Exclusivo miembros',
  },
]

const marcasConfianza = [
  { icono: 'bi-shield-check', texto: 'Pago seguro' },
  { icono: 'bi-truck', texto: 'Envío rápido' },
  { icono: 'bi-arrow-repeat', texto: 'Devoluciones fáciles' },
  { icono: 'bi-headset', texto: 'Soporte 24/7' },
  { icono: 'bi-star-fill', texto: '4.9 en Google' },
]

export default function SeccionBeneficios() {
  return (
    <section id="beneficios" className="beneficios">
      <div className="container">

        {/* Encabezado */}
        <div className="beneficios-encabezado">
          <span className="etiqueta-seccion">Por qué elegirnos</span>
          <h2 className="titulo-seccion">
            No solo vendemos comida,<br />
            <span className="titulo-resaltado">cuidamos a tu familia</span>
          </h2>
          <p className="subtitulo">
            Más de 12.000 familias ya confían en Supermercado Máximo para su mercado semanal.
            Descubre lo que nos hace diferentes.
          </p>
        </div>

        {/* Grid de beneficios */}
        <div className="row g-4">
          {beneficios.map((b, i) => (
            <div key={b.titulo} className={`col-md-6 col-lg-4 animar-subir delay-${(i % 5) + 1}`}>
              <div className="tarjeta-beneficio">
                <div className={`beneficio-icono-contenedor ${b.colorIcono}`}>
                  {b.emoji}
                </div>
                <h3 className="beneficio-titulo">{b.titulo}</h3>
                <p className="beneficio-descripcion">{b.descripcion}</p>
                <span className="beneficio-tag">{b.tag}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Barra de confianza */}
        <div className="barra-confianza">
          <p className="barra-confianza-titulo">Lo que nos respalda</p>
          <div className="barra-confianza-items">
            {marcasConfianza.map(m => (
              <div key={m.texto} className="confianza-item">
                <i className={`bi ${m.icono}`}></i>
                {m.texto}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
