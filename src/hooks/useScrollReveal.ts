import { useEffect } from 'react'

export const useScrollReveal = () => {
  useEffect(() => {
    type ScrollRevealInstance = {
      reveal: (target: string, config?: unknown) => void
      destroy: () => void
    }

    type ScrollRevealFn = (options?: unknown) => ScrollRevealInstance

    let sr: ScrollRevealInstance | null = null

    const init = async () => {
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

    init()

    return () => {
      sr?.destroy()
    }
  }, [])
}

