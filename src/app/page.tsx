'use client'

import Header from '../components/Header'
import Home from '../components/sections/Home'
import Projects from '../components/sections/Projects'
import Services from '../components/sections/Services'
import Experience from '../components/sections/Experience'
import Contact from '../components/sections/Contact'
import Footer from '../components/Footer'
import FloatingActionButton from '../components/FloatingActionButton'

export default function Page() {
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
