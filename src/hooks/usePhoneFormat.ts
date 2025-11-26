import { ChangeEvent, useState } from 'react'

export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '')
  const limitedNumbers = numbers.slice(0, 11)

  if (limitedNumbers.length <= 2) {
    return limitedNumbers
  } else if (limitedNumbers.length <= 7) {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`
  } else if (limitedNumbers.length <= 11) {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 3)} ${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`
  }

  return limitedNumbers
}

export const usePhoneFormat = () => {
  const [value, setValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValue(formatted)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const char = String.fromCharCode(e.which)
    if (!/[0-9]/.test(char)) {
      e.preventDefault()
    }
  }

  return {
    value,
    setValue,
    handleChange,
    handleKeyPress
  }
}

