'use client'

import { useEffect, useState, useCallback } from 'react'

interface UsePageLoadingOptions {
  /** Tempo mínimo de loading em ms (para garantir que a animação seja vista) */
  minLoadingTime?: number
  /** Timeout máximo de loading em ms (fallback se algo travar) */
  maxLoadingTime?: number
}

/**
 * Hook para detectar quando a página terminou de carregar completamente.
 * Verifica imagens, vídeos e fontes antes de disparar o evento page-ready.
 */
export function usePageLoading(options: UsePageLoadingOptions = {}) {
  const { minLoadingTime = 2000, maxLoadingTime = 8000 } = options

  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const checkAllResourcesLoaded = useCallback(() => {
    // Verificar imagens
    const images = Array.from(document.querySelectorAll('img'))
    const loadedImages = images.filter(img => img.complete && img.naturalHeight !== 0)

    // Verificar vídeos (apenas se têm preload)
    const videos = Array.from(document.querySelectorAll('video[preload="auto"], video[preload="metadata"]'))
    const loadedVideos = videos.filter(video => video.readyState >= 2) // HAVE_CURRENT_DATA

    const totalResources = images.length + videos.length
    const loadedResources = loadedImages.length + loadedVideos.length

    // Calcular progresso
    const progress = totalResources > 0 ? (loadedResources / totalResources) * 100 : 100

    return {
      isComplete: loadedResources >= totalResources,
      progress,
      details: {
        images: { loaded: loadedImages.length, total: images.length },
        videos: { loaded: loadedVideos.length, total: videos.length }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const startTime = Date.now()
    let checkInterval: ReturnType<typeof setInterval> | null = null
    let minTimeoutId: ReturnType<typeof setTimeout> | null = null
    let maxTimeoutId: ReturnType<typeof setTimeout> | null = null
    let minTimePassed = false
    let resourcesLoaded = false

    const finishLoading = () => {
      if (checkInterval) {
        clearInterval(checkInterval)
        checkInterval = null
      }
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId)
        maxTimeoutId = null
      }

      setIsLoading(false)
      setLoadingProgress(100)

      // Disparar evento page-ready
      document.body.classList.remove('page-loading')
      document.body.classList.add('page-ready')
      window.dispatchEvent(new CustomEvent('page-ready'))
    }

    const tryFinishLoading = () => {
      if (minTimePassed && resourcesLoaded) {
        finishLoading()
      }
    }

    // Verificar recursos periodicamente
    const checkResources = () => {
      const status = checkAllResourcesLoaded()
      setLoadingProgress(status.progress)

      if (status.isComplete) {
        resourcesLoaded = true
        tryFinishLoading()
      }
    }

    // Garantir tempo mínimo de loading
    minTimeoutId = setTimeout(() => {
      minTimePassed = true
      tryFinishLoading()
    }, minLoadingTime)

    // Timeout máximo (fallback)
    maxTimeoutId = setTimeout(() => {
      console.warn('[usePageLoading] Timeout máximo atingido, forçando fim do loading')
      finishLoading()
    }, maxLoadingTime)

    // Marcar body como loading
    document.body.classList.add('page-loading')

    // Verificar recursos a cada 100ms
    checkInterval = setInterval(checkResources, 100)

    // Verificação inicial
    checkResources()

    // Listener para window.load (backup)
    const handleWindowLoad = () => {
      const elapsed = Date.now() - startTime
      if (elapsed >= minLoadingTime) {
        resourcesLoaded = true
        tryFinishLoading()
      } else {
        // Aguardar o tempo mínimo
        setTimeout(() => {
          resourcesLoaded = true
          tryFinishLoading()
        }, minLoadingTime - elapsed)
      }
    }

    window.addEventListener('load', handleWindowLoad)

    return () => {
      if (checkInterval) clearInterval(checkInterval)
      if (minTimeoutId) clearTimeout(minTimeoutId)
      if (maxTimeoutId) clearTimeout(maxTimeoutId)
      window.removeEventListener('load', handleWindowLoad)
    }
  }, [checkAllResourcesLoaded, minLoadingTime, maxLoadingTime])

  return {
    isLoading,
    loadingProgress
  }
}

