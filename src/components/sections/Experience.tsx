import { experiences } from '../../data'

const Experience = () => {
  return (
    <section className='experience section' id='Experiência'>
      <h2 className='section__title'>EXPERIÊNCIA</h2>

      <div className='experience__container container grid'>
        {experiences.map((experience, index) => (
          <article key={index} className='experience__card'>
            <h2 className='experience__company'>{experience.company}</h2>

            <div className='experience__data'>
              <h3 className='experience__profession'>
                {experience.profession}
              </h3>
              <span className='experience__date'>{experience.date}</span>
              <p className='experience__description'>
                {experience.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Experience
