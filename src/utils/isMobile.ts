export const isMobile = (): boolean => {
  if (typeof navigator === 'undefined') return false

  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  )
}
