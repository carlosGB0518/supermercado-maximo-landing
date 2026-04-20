import { useState } from 'react'
import '../estilos/SeccionPreguntasFrecuentes.css'

const preguntas = [
  {
    pregunta: '¿El registro es completamente gratuito?',
    respuesta: 'Sí, 100% gratis. No necesitas tarjeta de crédito ni ningún pago para crear tu cuenta. El registro es gratuito y siempre lo será. Solo pagas cuando haces un pedido, y puedes elegir pagar en efectivo contra entrega.',
  },
  {
    pregunta: '¿Cuánto cuesta el domicilio?',
    respuesta: 'El domicilio tiene un costo desde $3.000 dependiendo de tu barrio y el monto del pedido. Para pedidos superiores a $80.000, el domicilio es completamente gratis. Esto lo verás claro antes de confirmar tu compra.',
  },
  {
    pregunta: '¿En qué barrios hacen entregas?',
    respuesta: 'Actualmente cubrimos Kennedy, Bosa, Suba, Engativá, Fontibón y Usme. Estamos expandiendo nuestra cobertura cada mes. Si tu barrio no está en la lista, regístrate de todas formas y te notificamos cuando lleguemos a tu zona.',
  },
  {
    pregunta: '¿Qué tan frescos llegan los productos?',
    respuesta: 'Nuestros productos frescos (frutas, verduras, carnes, lácteos) se seleccionan a diario. Si recibes algún producto que no cumple con tus expectativas, te lo reemplazamos sin costo o te devolvemos el dinero. Nuestra garantía de frescura es total.',
  },
  {
    pregunta: '¿Puedo pagar contra entrega?',
    respuesta: 'Sí, aceptamos pago en efectivo contra entrega. También puedes pagar con tarjeta débito o crédito (Visa, Mastercard), transferencia PSE o Nequi. Elige el método que más te convenga al momento de finalizar tu pedido.',
  },
  {
    pregunta: '¿Qué pasa si me llega un producto equivocado?',
    respuesta: 'En ese caso nos escribes por WhatsApp o al correo con la foto del producto y el número de pedido. Te hacemos el cambio en el próximo domicilio sin ningún costo adicional, o si prefieres te devolvemos el dinero del artículo.',
  },
  {
    pregunta: '¿Mis datos están seguros?',
    respuesta: 'Absolutamente. Usamos cifrado SSL y jamás vendemos tu información a terceros. Tus datos se almacenan de forma segura en nuestra plataforma y solo se usan para gestionar tus pedidos y enviarte ofertas (puedes desactivar las notificaciones cuando quieras).',
  },
  {
    pregunta: '¿Cuánto tiempo tarda el domicilio?',
    respuesta: 'Nuestro tiempo de entrega estándar es entre 1 y 2 horas desde que confirmas el pedido. En horas pico (6-8pm) puede ser hasta 2.5 horas. Puedes también programar el pedido para que llegue en el horario que mejor te quede.',
  },
]

function enviarEvento(evento, datos = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: evento, ...datos })
}

export default function SeccionPreguntasFrecuentes() {
  const [preguntaActiva, setPreguntaActiva] = useState(null)

  const alternarPregunta = (indice) => {
    const abriendo = preguntaActiva !== indice
    if (abriendo) {
      // ✅ Tracking: Enviamos la pregunta exacta para saber qué le preocupa al cliente
      enviarEvento('clic_pregunta_faq', { 
        pregunta: preguntas[indice].pregunta,
        estado: 'abierto'
      })
    }
    setPreguntaActiva(prev => prev === indice ? null : indice)
  }

  return (
    <section id="preguntas" className="seccion-faq">
      <div className="container">
        <div className="faq-encabezado">
          <span className="etiqueta-seccion">Preguntas frecuentes</span>
          <h2 className="titulo-seccion">
            Resolvemos todas tus <span className="titulo-resaltado">dudas</span>
          </h2>
          <p className="subtitulo-faq">
            Si no encuentras respuesta aquí, escríbenos por WhatsApp y te respondemos
            en menos de 10 minutos.
          </p>
        </div>

        <div className="acordeon-faq">
          {preguntas.map((item, indice) => (
            <div
              key={indice}
              className={`faq-item ${preguntaActiva === indice ? 'activo' : ''}`}
            >
              <button
                className="faq-pregunta"
                onClick={() => alternarPregunta(indice)}
                aria-expanded={preguntaActiva === indice}
              >
                <span className="faq-pregunta-texto">{item.pregunta}</span>
                <span className="faq-icono">
                  <i className="bi bi-plus-lg"></i>
                </span>
              </button>
              <div className="faq-respuesta" role="region">
                <p className="faq-respuesta-texto">{item.respuesta}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-contacto">
          <h3 className="faq-contacto-titulo">¿Todavía tienes dudas?</h3>
          <p className="faq-contacto-subtitulo">
            Nuestro equipo responde en menos de 10 minutos por WhatsApp.
          </p>
          <div className="faq-contacto-botones">
            {/* CORREGIDO: Se restauró la etiqueta <a> */}
            <a 
              href="https://wa.me/573000000000?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20Supermercado%20M%C3%A1ximo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              onClick={() => enviarEvento('clic_whatsapp_faq', { ubicacion: 'faq_footer' })}
            >
              <i className="bi bi-whatsapp"></i>
              Escribir por WhatsApp
            </a>
            <a 
              href="mailto:hola@supermercadomaximo.co" 
              className="btn-verde"
              onClick={() => enviarEvento('clic_correo_faq', { ubicacion: 'faq_footer' })}
            >
              <i className="bi bi-envelope-fill"></i>
              Enviar correo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}