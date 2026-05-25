// src/App.jsx
import { lazy, Suspense } from 'react'
import Encabezado from './componentes/Encabezado.jsx'
import SeccionHero from './componentes/SeccionHero.jsx'
import BotonFeedback from './componentes/BotonFeedback.jsx'

const SeccionBeneficios          = lazy(() => import('./componentes/SeccionBeneficios.jsx'))
const CtaIntermedio              = lazy(() => import('./componentes/CtaIntermedio.jsx'))
const SeccionProducto            = lazy(() => import('./componentes/SeccionProducto.jsx'))
const SeccionTestimonios         = lazy(() => import('./componentes/SeccionTestimonios.jsx'))
const CtaSecundario              = lazy(() => import('./componentes/CtaSecundario.jsx'))
const SeccionPreguntasFrecuentes = lazy(() => import('./componentes/SeccionPreguntasFrecuentes.jsx'))
const PrePie                     = lazy(() => import('./componentes/PrePie.jsx'))
const PiePagina                  = lazy(() => import('./componentes/PiePagina.jsx'))

export default function App() {
  return (
    <>
      <Encabezado />
      <main>
        <SeccionHero />
        <Suspense fallback={null}>
          <SeccionBeneficios />
          <CtaIntermedio />
          <SeccionProducto />
          <SeccionTestimonios />
          <CtaSecundario />
          <SeccionPreguntasFrecuentes />
          <PrePie />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <PiePagina />
      </Suspense>
      <BotonFeedback />
    </>
  )
}