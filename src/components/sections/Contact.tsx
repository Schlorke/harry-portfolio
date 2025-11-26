import emailjs from '@emailjs/browser'
import { FormEvent, useState } from 'react'
import { usePhoneFormat } from '../../hooks/usePhoneFormat'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const Contact = () => {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    value: phone,
    handleChange: handlePhoneChange,
    handleKeyPress
  } = usePhoneFormat()
  useScrollReveal()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget

    // Adiciona a data e hora atual ao formulário
    const currentDateTime = new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    const timeInput = document.createElement('input')
    timeInput.type = 'hidden'
    timeInput.name = 'time'
    timeInput.value = currentDateTime
    form.appendChild(timeInput)

    try {
      await emailjs.sendForm(
        'service_dospcsd',
        'template_hcaqrvt',
        form,
        'nIWEWKf0WFuwX1tyU'
      )

      setMessage('Mensagem enviada com sucesso ✅')
      form.reset()

      // Remove o campo de data/hora
      if (form.contains(timeInput)) {
        form.removeChild(timeInput)
      }

      setIsSubmitting(false)

      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch {
      setMessage('Mensagem não enviada (erro no serviço) ❌')

      // Remove o campo de data/hora em caso de erro
      if (form.contains(timeInput)) {
        form.removeChild(timeInput)
      }

      setIsSubmitting(false)

      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  return (
    <section className='contact section' id='Contato'>
      <h2 className='section__title'>CONTATO</h2>

      <div className='contact__container container grid'>
        <form
          action=''
          className='contact__form grid'
          id='contact-form'
          onSubmit={handleSubmit}
        >
          <div className='contact__group grid'>
            <input
              type='text'
              name='user_name'
              placeholder='Nome'
              required
              className='contact__input'
              aria-label='Seu nome'
            />
            <input
              type='tel'
              name='user_phone'
              placeholder='Fone, ex: (51) 9 9815-8015'
              className='contact__input'
              aria-label='Seu telefone'
              id='phone-input'
              value={phone}
              onChange={handlePhoneChange}
              onKeyPress={handleKeyPress}
            />
          </div>

          <input
            type='email'
            name='user_email'
            placeholder='Email'
            required
            className='contact__input'
            aria-label='Seu e-mail'
          />

          <textarea
            name='user_message'
            placeholder='Mensagem'
            className='contact__input contact__area'
            aria-label='Sua mensagem'
          ></textarea>

          <button
            type='submit'
            disabled={isSubmitting}
            className='button contact__button'
            aria-label='Enviar mensagem'
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </button>

          {message && (
            <p className='contact__message' id='contact-message'>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
