import { useSmoothScroll } from '../hooks/useSmoothScroll'

const Footer = () => {
  const { handleLinkClick } = useSmoothScroll()

  const navLinks = [
    { href: '#Home', label: 'Início' },
    { href: '#Projetos Recentes', label: 'Projetos' },
    { href: '#Serviços', label: 'Serviços' },
    { href: '#Experiência', label: 'Experiência' },
    { href: '#Contato', label: 'Contato' }
  ]

  return (
    <footer className='footer'>
      <div className='footer__container container grid'>
        <div className='footer__content grid'>
          <a href='#' className='footer__logo'>
            <img
              src='/assets/img/Harry-Schlorke.png'
              width={160}
              height={61}
              loading='lazy'
              alt='Logo com nome Harry Schlorke'
              title='Harry Schlorke - Desenvolvedor'
              className='logo__img'
            />
          </a>

          <ul className='footer__links'>
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={e => handleLinkClick(e, link.href)}
                  className='footer__link'
                  aria-label={`Ir para ${link.label}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className='footer__social'>
          <a
            href='https://wa.me/5551998158015?text=Olá! Estou entrando em contato pelo seu portfólio.'
            target='_blank'
            rel='noopener noreferrer'
            className='footer__social-link'
            aria-label='Abrir WhatsApp de Harry Schlorke'
          >
            <i className='ri-whatsapp-line'></i>
          </a>

          <a
            href='https://www.instagram.com/harryschlorke?igsh=NjNuY3JjNDhqam1v&utm_source=qr'
            target='_blank'
            rel='noopener noreferrer'
            className='footer__social-link'
            aria-label='Abrir Instagram de Harry Schlorke'
          >
            <i className='ri-instagram-line'></i>
          </a>

          <a
            href='https://github.com/Schlorke'
            target='_blank'
            rel='noopener noreferrer'
            className='footer__social-link'
            aria-label='Abrir GitHub de Harry Schlorke'
          >
            <i className='ri-github-line'></i>
          </a>
        </div>
      </div>

      <span className='footer__copy'>
        &#169; 2025 Harry Schlorke. Todos os direitos reservados.
      </span>
    </footer>
  )
}

export default Footer
