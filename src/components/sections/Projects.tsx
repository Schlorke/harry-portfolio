import { projects } from '../../data'
import ProjectCard from '../ProjectCard'

const Projects = () => {
  return (
    <section className='projects section' id='Projetos Recentes'>
      <h2 className='section__title'>PROJETOS RECENTES</h2>

      <div className='projects__container container grid'>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
