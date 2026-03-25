import Encabezado from './componentes/Encabezado.jsx'
import SeccionHero from './componentes/SeccionHero.jsx'
import SeccionBeneficios from './componentes/SeccionBeneficios.jsx'
import CtaIntermedio from './componentes/CtaIntermedio.jsx'
import SeccionProducto from './componentes/SeccionProducto.jsx'
import SeccionTestimonios from './componentes/SeccionTestimonios.jsx'
import CtaSecundario from './componentes/CtaSecundario.jsx'
import SeccionPreguntasFrecuentes from './componentes/SeccionPreguntasFrecuentes.jsx'
import PrePie from './componentes/PrePie.jsx'
import PiePagina from './componentes/PiePagina.jsx'

export default function App() {
  return (
    <>
      <Encabezado />
      <main>
        <SeccionHero />
        <SeccionBeneficios />
        <CtaIntermedio />
        <SeccionProducto />
        <SeccionTestimonios />
        <CtaSecundario />
        <SeccionPreguntasFrecuentes />
        <PrePie />
      </main>
      <PiePagina />
    </>
  )
}
