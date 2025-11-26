import { useEffect, useState } from 'react'

const FloatingActionButton = () => {
  const [isActive, setIsActive] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  const socialLinks = [
    {
      url: 'https://github.com/Schlorke',
      icon: 'ri-github-line',
      label: 'Abrir GitHub de Harry Schlorke'
    },
    {
      url: 'https://www.instagram.com/harryschlorke?igsh=NjNuY3JjNDhqam1v&utm_source=qr',
      icon: 'ri-instagram-line',
      label: 'Abrir Instagram de Harry Schlorke'
    },
    {
      url: 'https://wa.me/5551998158015?text=Olá! Estou entrando em contato pelo seu portfólio.',
      icon: 'ri-whatsapp-line',
      label: 'Abrir WhatsApp de Harry Schlorke'
    }
  ]

  const handleToggle = () => {
    setIsActive(!isActive)
    setAnimationComplete(false)
  }

  // Remove delay após animação de entrada terminar
  useEffect(() => {
    if (isActive) {
      const maxDelay = (socialLinks.length - 1) * 100 + 300 // delay máximo + duração
      const timer = setTimeout(() => {
        setAnimationComplete(true)
      }, maxDelay)
      return () => clearTimeout(timer)
    } else {
      setAnimationComplete(false)
    }
  }, [isActive])

  return (
    <>
      <div
        className='overlay'
        onClick={handleToggle}
        style={{
          opacity: isActive ? 1 : 0,
          visibility: isActive ? 'visible' : 'hidden'
        }}
      />

      <div className='fab-container'>
        <button
          className={`fab ${isActive ? 'ativo' : ''}`}
          id='fab-btn'
          onClick={handleToggle}
          aria-label='Abrir opções de redes sociais'
          type='button'
        >
          <span className='fab-icon'></span>
        </button>

        <div
          className='fab-options'
          style={{
            opacity: isActive ? 1 : 0,
            visibility: isActive ? 'visible' : 'hidden',
            transform: isActive ? 'scale(1)' : 'scale(0.9)'
          }}
        >
          {socialLinks.map((link, index) => {
            const delay = isActive
              ? index * 100
              : (socialLinks.length - 1 - index) * 50
            return (
              <a
                key={index}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className={`fab-option footer__social-link ${animationComplete ? 'fab-visible' : ''}`}
                aria-label={link.label}
                data-index={index}
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                  /* Delay apenas durante animação, removido completamente após animação */
                  transitionDelay: animationComplete
                    ? '0s, 0s, 0s, 0s'
                    : `${delay}ms, ${delay}ms, 0s, 0s`
                }}
              >
                <i className={link.icon}></i>
              </a>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default FloatingActionButton
