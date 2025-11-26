import { memo } from 'react'
import { services } from '../../data'

const Services = memo(() => {
  return (
    <section className='services section' id='Serviços'>
      <h2 className='section__title'>SERVIÇOS</h2>

      <div className='services__container container grid'>
        {services.map((service, index) => (
          <article key={index} className='services__card'>
            <div className='services__icon'>
              <div className='services__circle'></div>
              <i className={service.icon}></i>
            </div>

            <h3 className='services__name'>{service.name}</h3>
            <p className='services__description'>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
})

Services.displayName = 'Services'
export default Services
