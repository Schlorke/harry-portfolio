import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Project } from '../types'
import { isMobile } from '../utils/isMobile'

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const previewRef = useRef<HTMLAnchorElement>(null)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const mobile = isMobile()

  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current

    if (mobile) {
      // Configurações para mobile
      video.setAttribute('muted', '')
      video.setAttribute('playsinline', '')
      video.setAttribute('preload', 'auto')
      video.removeAttribute('controls')

      // Intersection Observer para mobile
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

      // Desbloquear autoplay em iOS
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

  return (
    <article className='projects__card'>
      <a
        ref={previewRef}
        href={project.url}
        target='_blank'
        rel='noopener noreferrer'
        className={`projects__image video-preview ${isVideoVisible ? 'video-visible' : ''}`}
      >
        <Image
          src={project.image}
          width={320}
          height={210}
          loading='lazy'
          alt={project.name}
          title={`Projeto: ${project.name}`}
          className='projects__img'
        />

        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            className='projects__video'
            muted
            data-playsinline='true'
            preload='auto'
            loop
          />
        )}
      </a>

      <div className='projects__data'>
        <h3 className='projects__name'>{project.name}</h3>
        <p className='projects__description'>{project.description}</p>
        <div className='projects__skills'>
          {project.skills.map((skill, index) => (
            <Image
              key={index}
              src={skill}
              width={24}
              height={24}
              loading='lazy'
              alt={`Skill ${index}`}
              title={`Skill ${index}`}
              className='projects__skill'
            />
          ))}
        </div>

        <a
          href={project.url}
          target='_blank'
          rel='noopener noreferrer'
          className='projects__button'
        >
          <i className='ri-link'></i>
          <span>Visitar Site</span>
        </a>
      </div>
    </article>
  )
}

export default ProjectCard
