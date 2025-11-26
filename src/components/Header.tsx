import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

const Header = () => {
  const [isReady, setIsReady] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { handleLinkClick } = useSmoothScroll()

  useEffect(() => {
    const readyFrame = requestAnimationFrame(() => setIsReady(true))

    const timer1 = setTimeout(() => {
      setIsAnimated(true)
    }, 1500)

    const timer2 = setTimeout(() => {
      setIsNavVisible(true)
    }, 3080)

    return () => {
      cancelAnimationFrame(readyFrame)
      clearTimeout(timer1)
      clearTimeout(timer2)
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
      {/* Background Image */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          src='/assets/img/Background.png'
          className='background'
          alt='Imagem de fundo'
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Logo */}
      <a href='' className='logo'>
        <Image
          src='/assets/img/Harry-Schlorke.png'
          alt='Logo'
          width={160}
          height={61}
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
