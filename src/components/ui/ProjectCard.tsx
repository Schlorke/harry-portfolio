'use client'

import Image from 'next/image'
import { Project } from '../../types'
import { useVideoPlayer } from '../../hooks/useVideoPlayer'

interface ProjectCardProps {
  project: Project
}

/**
 * Card de projeto com preview de vídeo.
 *
 * - Desktop: Vídeo inicia no hover
 * - Mobile: Vídeo inicia quando 50% do card está visível
 *
 * @param project - Dados do projeto (nome, descrição, imagem, vídeo, url, skills)
 */
const ProjectCard = ({ project }: ProjectCardProps) => {
  const { videoRef, previewRef, isVideoVisible } = useVideoPlayer()

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
            <img
              key={index}
              src={skill}
              width={24}
              height={24}
              alt={`Skill ${index}`}
              className='projects__skill'
              loading='lazy'
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
