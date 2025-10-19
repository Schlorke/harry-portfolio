import emailjs from '@emailjs/browser'
import ScrollReveal from 'scrollreveal'
import './styles.css'
emailjs.init('nIWEWKf0WFuwX1tyU')

/*===============================================
  HEADER ANIMATION - ANIMAÇÃO DE ENTRADA
  ===============================================

  Este script controla a animação de entrada do header.

  Funcionalidade:
  - Após 1500ms, o header reduz de tamanho
  - Após 1580ms adicionais, o menu de navegação aparece

  Dependência: jQuery
*/

$(document).ready(function () {
  // Atraso para a animação do header
  setTimeout(function () {
    $('header').addClass('animate_header')

    // Atraso adicional para a animação do nav
    setTimeout(function () {
      $('header nav ul').addClass('animate_nav') // Ativa a animação no nav
    }, 1580) // Atraso de 1580ms para o nav após o header
  }, 1500) // Tempo de 1500ms para ativar a animação do header
})

/*===============================================
HEADER MENU - TOGGLE DO MENU HAMBÚRGUER
===============================================

Este script controla o menu hambúrguer em dispositivos móveis.

Funcionalidade:
- Ao clicar no botão hambúrguer, o menu lateral abre/fecha
- Animação do ícone hambúrguer para "X"
*/

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger')
  const navMenu = document.querySelector('header nav ul')

  // Verifica se os elementos existem
  if (hamburger && navMenu) {
    // Adiciona o evento de clique no botão hambúrguer
    hamburger.addEventListener('click', function () {
      this.classList.toggle('active')
      navMenu.classList.toggle('active')
    })
  }
})

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
  contactMessage = document.getElementById('contact-message')

const sendEmail = e => {
  e.preventDefault()

  /*
      The code for sending emails is just an example.

      Create your account at https://www.emailjs.com/ and
      follow the instructions in the images for sending emails
      that are in the project folder.
   */

  // serviceID - templateID - #form - publicKey
  emailjs
    .sendForm(
      'service_dospcsd',
      'template_hcaqrvt',
      '#contact-form',
      'nIWEWKf0WFuwX1tyU'
    )

    .then(
      () => {
        // Show sent message
        contactMessage.textContent = 'Mensagem enviada com sucesso ✅'

        // Remove message after five seconds
        setTimeout(() => {
          contactMessage.textContent = ''
        }, 5000)

        // Clear input fields
        contactForm.reset()
      },
      () => {
        // Show error message
        contactMessage.textContent = 'Mensagem não enviada (erro no serviço) ❌'
      }
    )
}
if (contactForm) {
  contactForm.addEventListener('submit', sendEmail)
}

/*=============== BROWSER COMPATIBILITY ===============*/
// Aplica recursos modernos apenas em navegadores que suportam
document.addEventListener('DOMContentLoaded', function () {
  // Theme color para PWA (Chrome/Safari/Edge)
  const supportsThemeColor =
    !navigator.userAgent.includes('Firefox') &&
    !navigator.userAgent.includes('Opera/')
  if (supportsThemeColor) {
    const meta = document.createElement('meta')
    meta.name = 'theme-color'
    meta.content = 'hsl(358, 100%, 1%)'
    document.head.appendChild(meta)
  }

  // Playsinline para vídeos (iOS/Chrome/Safari)
  const videos = document.querySelectorAll('video[data-playsinline]')
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const supportsPlaysinline = 'playsInline' in document.createElement('video')

  if (isMobile || supportsPlaysinline) {
    videos.forEach(video => {
      video.setAttribute('playsinline', 'true')
      video.setAttribute('webkit-playsinline', 'true')
    })
  }
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400
  // reset: true, // Animations repeat
})

sr.reveal(`.perfil, .contact__form`)
sr.reveal(`.info`, { origin: 'left', delay: 800 })
sr.reveal(`.skills`, { origin: 'left', delay: 1000 })
sr.reveal(`.about`, { origin: 'right', delay: 1000 })
sr.reveal(`.projects__card, .services__card, .experience__card`, {
  interval: 100
})

/*=============== VIDEO ANIMATION ===============*/
function isMobile() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  )
}

// Desktop (hover)
if (!isMobile()) {
  document.querySelectorAll('.video-preview').forEach(preview => {
    const video = preview.querySelector('.projects__video')

    preview.addEventListener('mouseenter', () => {
      video.play()
      preview.classList.add('video-visible')
    })

    preview.addEventListener('mouseleave', () => {
      video.pause()
      video.currentTime = 0 // Reinicia vídeo ao início
      preview.classList.remove('video-visible')
    })
  })
}

// Mobile (scroll - Intersection Observer otimizado)
if (isMobile()) {
  const videos = document.querySelectorAll('.projects__video')

  // Configurações obrigatórias para autoplay silencioso
  videos.forEach(video => {
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('preload', 'auto')
    video.removeAttribute('controls')
  })

  // Observer para tocar/pause com base na visibilidade
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const video = entry.target
        const preview = video.closest('.video-preview')

        if (entry.isIntersecting) {
          video
            .play()
            .then(() => {
              if (preview) preview.classList.add('video-visible')
            })
            .catch(err => {
              console.warn('Erro ao reproduzir vídeo no scroll:', err)
            })
        } else {
          video.pause()
          video.currentTime = 0
          if (preview) preview.classList.remove('video-visible')
        }
      })
    },
    {
      threshold: 0.5 // Sensibilidade do scroll
    }
  )

  videos.forEach(video => observer.observe(video))

  // 🔓 Desbloqueia autoplay em iOS após primeiro toque
  const desbloquearAutoplay = () => {
    videos.forEach(video => {
      video
        .play()
        .then(() => {
          video.pause()
          video.currentTime = 0
        })
        .catch(() => {})
    })

    document.removeEventListener('touchstart', desbloquearAutoplay)
    document.removeEventListener('click', desbloquearAutoplay)
  }

  document.addEventListener('touchstart', desbloquearAutoplay)
  document.addEventListener('click', desbloquearAutoplay)
}

/*=============== SMOOTH SCROLL WITH HEADER OFFSET ===============*/
// Função para scroll suave considerando a altura do header fixo
function smoothScrollTo(targetId, offset = 100) {
  const target = document.getElementById(targetId)
  if (target) {
    const headerHeight = 0 // Altura do header após animação
    const targetPosition = target.offsetTop - headerHeight - offset

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }
}

// Adiciona evento de clique nos links de navegação
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona todos os links de navegação
  const navLinks = document.querySelectorAll('header nav ul li a')

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault() // Previne o comportamento padrão

      const href = this.getAttribute('href')
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1) // Remove o # do início
        smoothScrollTo(targetId)
      }
    })
  })
})

/*=============== FLOATIN ACTION BUTTTON ===============*/
document.addEventListener('DOMContentLoaded', () => {
  const fabButton = document.getElementById('fab-btn')
  const fabIcon = document.querySelector('.fab-icon')
  const fabOptions = document.querySelector('.fab-options')
  const overlay = document.querySelector('.overlay')
  const options = document.querySelectorAll('.fab-option')

  fabButton.addEventListener('click', () => {
    const isActive = fabButton.classList.contains('active')
    fabButton.classList.toggle('active')
    overlay.style.opacity = isActive ? '0' : '1'
    overlay.style.visibility = isActive ? 'hidden' : 'visible'
    fabOptions.style.opacity = isActive ? '0' : '1'
    fabOptions.style.visibility = isActive ? 'hidden' : 'visible'
    fabOptions.style.transform = isActive ? 'scale(0.9)' : 'scale(1)'
    fabIcon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(45deg)'
    options.forEach((option, index) => {
      setTimeout(() => {
        option.style.opacity = isActive ? '0' : '1'
        option.style.transform = isActive ? 'translateY(10px)' : 'translateY(0)'
      }, index * 100)
    })
  })

  overlay.addEventListener('click', () => {
    fabButton.click()
  })
})

const fabTrigger = document.getElementById('fab-btn')
if (fabTrigger) {
  fabTrigger.addEventListener('click', function () {
    this.classList.toggle('ativo')
  })
}
