import Image from 'next/image'
import { skills } from '../../data'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'

const Home = () => {
  useScrollReveal()
  const { handleLinkClick } = useSmoothScroll()

  return (
    <section className='home section' id='Home'>
      <div className='home__container container grid'>
        {/* Perfil */}
        <div className='perfil'>
          <Image
            src='/assets/img/Home-Harry.webp'
            width={304}
            height={415}
            loading='eager'
            alt='Foto de Harry Schlorke com fundo transparente, desenvolvedor full-stack'
            title='Harry Schlorke - Desenvolvedor Full-Stack'
            className='perfil__img'
            style={{ height: 'auto' }}
          />

          <div className='perfil__data'>
            <Image
              src='/assets/img/Harry-Schlorke.png'
              width={160}
              height={61}
              loading='lazy'
              alt='Logotipo com nome Harry Schlorke'
              title='Harry Schlorke'
              className='perfil__logo'
              style={{ height: 'auto' }}
            />
            <span className='perfil__subtitle'>FULL-STACK DEVELOPER</span>

            <div className='perfil__buttons'>
              <a
                href='#Projetos Recentes'
                onClick={e => handleLinkClick(e, '#Projetos Recentes')}
                className='button'
                aria-label='Ir para a seção de projetos'
              >
                Projetos
              </a>
              <a
                href='#Serviços'
                onClick={e => handleLinkClick(e, '#Serviços')}
                className='button button__black'
                aria-label='Ir para a seção de serviços'
              >
                Serviços
              </a>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className='info' id='Localização'>
          <div className='info__data'>
            <i className='material-icons info__location'>location_on</i>
            <h2 className='info__name'>LOCALIZAÇÃO</h2>
          </div>

          <div className='info__image'>
            <iframe
              className='info__img'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.6449128455434!2d-51.1843939!3d-30.0556926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197802e385ef0f%3A0xa321dc30c5624125!2sR.%20Cervantes%2C%2039%20-%20Jardim%20Bot%C3%A2nico%2C%20Porto%20Alegre%20-%20RS%2C%2090690-020!5e0!3m2!1spt-BR!2sbr!4v1713627371993!5m2!1spt-BR!2sbr'
              allowFullScreen
              loading='lazy'
              referrerPolicy='strict-origin'
              title='Mapa mostrando a localização de Harry Schlorke em Porto Alegre, RS'
            />
          </div>
          <p className='info__description'>
            Rua Cervantes nº 39, Jardim Botânico, Porto Alegre - RS.
          </p>
          <a
            href='#Contato'
            onClick={e => handleLinkClick(e, '#Contato')}
            className='button'
            aria-label='Ir para a seção de contato'
          >
            CONTATO
          </a>
        </div>

        {/* About */}
        <div className='about'>
          <h1 className='about__name'>Harry Schlorke</h1>
          <span className='about__role'>FULL-STACK DEVELOPER</span>

          <p className='about__description'>
            Criador de sistemas com interfaces refinadas e escaláveis. Soluções
            para negócios com design moderno, alta performance, acessibilidade e
            inovação.
          </p>

          <div className='about__social'>
            <a
              href='https://www.linkedin.com/in/harry-schlorke/'
              target='_blank'
              rel='noopener noreferrer'
              className='about__link'
              aria-label='Abrir LinkedIn de Harry Schlorke'
            >
              <i className='ri-linkedin-box-line'></i>
            </a>

            <a
              href='https://github.com/Schlorke'
              target='_blank'
              rel='noopener noreferrer'
              className='about__link'
              aria-label='Abrir GitHub de Harry Schlorke'
            >
              <i className='ri-github-line'></i>
            </a>

            <a
              href='https://www.behance.net/harryschlorke'
              target='_blank'
              rel='noopener noreferrer'
              className='about__link'
              aria-label='Abrir Behance de Harry Schlorke'
            >
              <i className='ri-behance-line'></i>
            </a>
          </div>

          <div className='about__image'>
            <Image
              src='/assets/img/about-Harry.webp'
              width={443}
              height={538}
              loading='lazy'
              alt='Harry Schlorke sorrindo em ambiente de trabalho'
              title='Harry Schlorke - Designer e Desenvolvedor'
              className='about__img'
            />
          </div>

          <p className='about__note'>
            Acesse meu portfólio e explore os certificados que comprovam minha
            formação e expertise via QR code.
          </p>

          <a
            href='/assets/pdf/harry-schlorke-curriculo.pdf'
            download
            target='_blank'
            className='button button__black'
            aria-label='Baixar currículo em PDF'
          >
            Download CV
          </a>
        </div>

        {/* Skills */}
        <div className='skills'>
          <h2 className='skills__title'>Habilidades</h2>

          <div className='skills__items'>
            {skills.map((skill, index) => (
              <img
                key={index}
                src={skill}
                width={48}
                height={48}
                alt={`Skill ${index}`}
                className='skills__item'
                loading='lazy'
              />
            ))}
          </div>

          <p className='skills__description'>
            Visite a seção de projetos para ver os trabalhos realizados com
            essas tecnologias web.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Home
