'use client'

import { useEffect, useRef, useState } from 'react'
import { isMobile } from '../utils/isMobile'

/**
 * Hook para controlar reprodução de vídeo com comportamento diferente para desktop e mobile.
 *
 * - Desktop: Vídeo inicia no hover do elemento preview
 * - Mobile: Vídeo inicia quando 50% do elemento está visível (Intersection Observer)
 * - iOS: Inclui desbloqueio de autoplay no primeiro touch/click
 *
 * @returns Objeto com refs para vídeo e preview, estado de visibilidade e flag mobile
 *
 * @example
 * ```tsx
 * const { videoRef, previewRef, isVideoVisible, mobile } = useVideoPlayer()
 *
 * return (
 *   <a ref={previewRef} className={isVideoVisible ? 'video-visible' : ''}>
 *     <video ref={videoRef} src="/video.mp4" muted loop />
 *   </a>
 * )
 * ```
 */
export const useVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const previewRef = useRef<HTMLAnchorElement>(null)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const mobile = isMobile()

  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    video.preload = 'auto'
    video.load()

    if (mobile) {
      // Configurações para mobile
      video.setAttribute('muted', '')
      video.setAttribute('playsinline', '')
      video.setAttribute('preload', 'auto')
      video.removeAttribute('controls')

      // Intersection Observer para mobile - inicia vídeo quando 50% visível
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              video
                .play()
                .then(() => {
                  setIsVideoVisible(true)
                })
                .catch(err => {
                  console.warn('Erro ao reproduzir vídeo no scroll:', err)
                })
            } else {
              video.pause()
              video.currentTime = 0
              setIsVideoVisible(false)
            }
          })
        },
        {
          threshold: 0.5
        }
      )

      observer.observe(video)

      // Desbloquear autoplay em iOS Safari
      // iOS requer interação do usuário antes de permitir autoplay
      const unlockAutoplay = () => {
        video
          .play()
          .then(() => {
            video.pause()
            video.currentTime = 0
          })
          .catch(() => {})

        document.removeEventListener('touchstart', unlockAutoplay)
        document.removeEventListener('click', unlockAutoplay)
      }

      document.addEventListener('touchstart', unlockAutoplay)
      document.addEventListener('click', unlockAutoplay)

      return () => {
        observer.disconnect()
        document.removeEventListener('touchstart', unlockAutoplay)
        document.removeEventListener('click', unlockAutoplay)
      }
    } else {
      // Lógica para desktop (hover)
      const previewEl = previewRef.current

      const handleMouseEnter = () => {
        if (video) {
          video.play()
          setIsVideoVisible(true)
        }
      }

      const handleMouseLeave = () => {
        if (video) {
          video.pause()
          video.currentTime = 0
          setIsVideoVisible(false)
        }
      }

      if (previewEl) {
        previewEl.addEventListener('mouseenter', handleMouseEnter)
        previewEl.addEventListener('mouseleave', handleMouseLeave)
      }

      return () => {
        if (previewEl) {
          previewEl.removeEventListener('mouseenter', handleMouseEnter)
          previewEl.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }
  }, [mobile])

  return {
    videoRef,
    previewRef,
    isVideoVisible,
    mobile
  }
}

export default useVideoPlayer
