'use client'

import { Header, Footer, FloatingActionButton } from '../components/feature'
import Home from '../components/sections/Home'
import Projects from '../components/sections/Projects'
import Services from '../components/sections/Services'
import Experience from '../components/sections/Experience'
import Contact from '../components/sections/Contact'
import { usePageLoading } from '../hooks/usePageLoading'

export default function Page() {
  // Hook de loading - aguarda recursos carregarem antes de iniciar animação
  // minLoadingTime: tempo mínimo para garantir que a animação seja vista
  // maxLoadingTime: timeout máximo para não travar se algo falhar
  usePageLoading({
    minLoadingTime: 3000, // 3 segundos mínimo para ver a animação
    maxLoadingTime: 10000 // 10 segundos máximo
  })

  return (
    <>
      <Header />
      <main className='main'>
        <Home />
        <Projects />
        <Services />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <FloatingActionButton />
    </>
  )
}
