'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { WaveAnimation } from '../gl'

const Header = () => {
  const [isReady, setIsReady] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { handleLinkClick } = useSmoothScroll()

  useEffect(() => {
    let readyFrame: number | null = null
    let timer1: ReturnType<typeof setTimeout> | null = null
    let timer2: ReturnType<typeof setTimeout> | null = null

    const startHeaderSequence = () => {
      if (readyFrame !== null) return
      readyFrame = requestAnimationFrame(() => setIsReady(true))

      timer1 = setTimeout(() => {
        setIsAnimated(true)
      }, 1500)

      timer2 = setTimeout(() => {
        setIsNavVisible(true)
      }, 3080)
    }

    const handlePageReady = () => {
      startHeaderSequence()
      window.removeEventListener('page-ready', handlePageReady)
    }

    if (typeof document !== 'undefined') {
      if (document.body?.classList.contains('page-ready')) {
        startHeaderSequence()
      } else {
        window.addEventListener('page-ready', handlePageReady)
      }
    }

    return () => {
      if (readyFrame !== null) {
        cancelAnimationFrame(readyFrame)
      }
      if (timer1) clearTimeout(timer1)
      if (timer2) clearTimeout(timer2)
      window.removeEventListener('page-ready', handlePageReady)
    }
  }, [])

  const navLinks = [
    { href: '#Home', label: 'Início' },
    { href: '#Projetos Recentes', label: 'Projetos' },
    { href: '#Serviços', label: 'Serviços' },
    { href: '#Experiência', label: 'Experiência' },
    { href: '#Contato', label: 'Contato' }
  ]

  const headerClasses =
    `${isAnimated ? 'animate_header' : ''} ${isReady ? 'header-ready' : 'header-preload'}`.trim()

  return (
    <header className={headerClasses}>
      {/* Wave Animation Background - substitui Background.png */}
      <div className='header-background'>
        <WaveAnimation hovering={false} />
      </div>

      {/* Logo */}
      <a href='' className='logo'>
        <Image
          src='/assets/img/Harry-Schlorke.png'
          alt='Logo'
          width={160}
          height={61}
          priority
          fetchPriority='high'
        />
      </a>

      {/* Navigation */}
      <nav>
        <ul
          hidden={!isReady && !isMobileMenuOpen && !isNavVisible}
          className={`${isNavVisible ? 'animate_nav' : ''} ${isMobileMenuOpen ? 'active' : ''}`}
        >
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => {
                  handleLinkClick(e, link.href)
                  setIsMobileMenuOpen(false)
                }}
                aria-label={`Ir para ${link.label}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hamburger Menu (Mobile) */}
      <button
        className={`hamburger ${isNavVisible ? 'nav-ready' : ''} ${isMobileMenuOpen ? 'active' : ''}`}
        hidden={!isReady}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label='Abrir menu'
        aria-expanded={isMobileMenuOpen}
        type='button'
        id='hamburger'
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  )
}

export default Header
