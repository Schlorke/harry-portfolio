'use client'

import { memo } from 'react'
import { projects } from '../../data'
import { ProjectCard } from '../ui'

const Projects = memo(() => {
  return (
    <section className='projects section' id='Projetos Recentes'>
      <h2 className='section__title'>PROJETOS RECENTES</h2>

      <div className='projects__container container grid'>
        {projects.map(project => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
})

Projects.displayName = 'Projects'
export default Projects
