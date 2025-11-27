import { useEffect } from 'react'

/**
 * Delay antes de inicializar o ScrollReveal após o page-ready.
 * Sincronizado com a animação do header:
 * - Header começa a animar: 1500ms após page-ready
 * - Transição CSS do header: 1000ms
 * - Total da animação: ~2500ms
 *
 * Iniciamos o ScrollReveal ~500ms ANTES do header terminar,
 * para que as animações estejam prontas quando o conteúdo aparecer.
 */
const SCROLL_REVEAL_DELAY = 2000 // 2000ms após page-ready

export const useScrollReveal = () => {
  useEffect(() => {
    type ScrollRevealInstance = {
      reveal: (target: string, config?: unknown) => void
      destroy: () => void
    }

    type ScrollRevealFn = (options?: unknown) => ScrollRevealInstance

    let sr: ScrollRevealInstance | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const initScrollReveal = async () => {
      if (typeof window === 'undefined') return

      const ScrollRevealLib = (await import('scrollreveal'))
        .default as unknown as ScrollRevealFn
      sr = ScrollRevealLib({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400
      })

      sr.reveal('.perfil, .contact__form')
      sr.reveal('.info', { origin: 'left', delay: 800 })
      sr.reveal('.skills', { origin: 'left', delay: 1000 })
      sr.reveal('.about', { origin: 'right', delay: 1000 })
      sr.reveal('.projects__card, .services__card, .experience__card', {
        interval: 100
      })
    }

    const handlePageReady = () => {
      // Aguardar o delay sincronizado com a animação do header
      timeoutId = setTimeout(() => {
        initScrollReveal()
      }, SCROLL_REVEAL_DELAY)
    }

    // Verificar se page-ready já aconteceu
    if (typeof document !== 'undefined') {
      if (document.body?.classList.contains('page-ready')) {
        // Page já está ready, iniciar com delay
        handlePageReady()
      } else {
        // Aguardar evento page-ready
        window.addEventListener('page-ready', handlePageReady)
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      window.removeEventListener('page-ready', handlePageReady)
      sr?.destroy()
    }
  }, [])
}
