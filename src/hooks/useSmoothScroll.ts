export const smoothScrollTo = (targetId: string, offset = 100) => {
  const target = document.getElementById(targetId)
  if (target) {
    const headerHeight = 0
    const targetPosition = target.offsetTop - headerHeight - offset

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }
}

export const useSmoothScroll = () => {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    if (href.startsWith('#')) {
      const targetId = href.substring(1)
      smoothScrollTo(targetId)
    }
  }

  return { handleLinkClick }
}
