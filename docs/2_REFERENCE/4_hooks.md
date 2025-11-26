# Referência: Hooks Customizados

Este documento descreve os hooks React customizados do projeto, seus parâmetros, retornos e exemplos de uso.

---

## 📋 Índice de Hooks

- [useScrollReveal](#usescrollreveal)
- [useSmoothScroll](#usesmoothscroll)
- [usePhoneFormat](#usephoneformat)

---

## useScrollReveal

**Arquivo:** `src/hooks/useScrollReveal.ts`

**Descrição:** Hook que inicializa a biblioteca ScrollReveal para animar elementos quando entram na viewport.

### Assinatura

```typescript
const useScrollReveal = () => void
```

### Parâmetros

Nenhum.

### Retorno

Nenhum (hook de efeito colateral).

### Configuração Padrão

```typescript
{
  origin: 'top',     // Direção de onde o elemento vem
  distance: '60px',  // Distância da animação
  duration: 2500,    // Duração em ms
  delay: 400         // Delay inicial em ms
}
```

### Elementos Animados

| Seletor             | Configuração Especial        |
| ------------------- | ---------------------------- |
| `.perfil`           | Padrão (top)                 |
| `.contact__form`    | Padrão (top)                 |
| `.info`             | origin: 'left', delay: 800   |
| `.skills`           | origin: 'left', delay: 1000  |
| `.about`            | origin: 'right', delay: 1000 |
| `.projects__card`   | interval: 100 (staggered)    |
| `.services__card`   | interval: 100 (staggered)    |
| `.experience__card` | interval: 100 (staggered)    |

### Exemplo de Uso

```tsx
// Em um componente de seção
import { useScrollReveal } from '../../hooks/useScrollReveal'

const MySection = () => {
  useScrollReveal()

  return (
    <section>
      {/* Elementos com classes como .perfil, .info, etc. serão animados */}
      <div className='perfil'>...</div>
      <div className='info'>...</div>
    </section>
  )
}
```

### Notas Importantes

1. **SSR Safe:** O hook verifica `typeof window` antes de inicializar
2. **Cleanup:** Implementa `sr.destroy()` no cleanup do useEffect
3. **Import Dinâmico:** Usa `await import('scrollreveal')` para evitar erros SSR
4. **Strict Mode:** Em desenvolvimento, pode executar duas vezes - isso é normal

### Código Fonte

```typescript
import { useEffect } from 'react'

export const useScrollReveal = () => {
  useEffect(() => {
    type ScrollRevealInstance = {
      reveal: (target: string, config?: unknown) => void
      destroy: () => void
    }

    type ScrollRevealFn = (options?: unknown) => ScrollRevealInstance

    let sr: ScrollRevealInstance | null = null

    const init = async () => {
      if (typeof window === 'undefined') return

      const ScrollRevealLib = (await import('scrollreveal'))
        .default as unknown as ScrollRevealFn
      sr = ScrollRevealLib({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400
      })

      sr.reveal('.perfil, .contact__form')
      sr.reveal('.info', { origin: 'left', delay: 800 })
      sr.reveal('.skills', { origin: 'left', delay: 1000 })
      sr.reveal('.about', { origin: 'right', delay: 1000 })
      sr.reveal('.projects__card, .services__card, .experience__card', {
        interval: 100
      })
    }

    init()

    return () => {
      sr?.destroy()
    }
  }, [])
}
```

---

## useSmoothScroll

**Arquivo:** `src/hooks/useSmoothScroll.ts`

**Descrição:** Hook e função utilitária para navegação suave (smooth scroll) entre seções da página.

### Assinatura

```typescript
// Hook
const useSmoothScroll = () => {
  handleLinkClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => void
}

// Função utilitária (exportada separadamente)
const smoothScrollTo = (targetId: string, offset?: number) => void
```

### Parâmetros

**useSmoothScroll:**

- Nenhum

**smoothScrollTo:**

| Parâmetro  | Tipo     | Padrão | Descrição                   |
| ---------- | -------- | ------ | --------------------------- |
| `targetId` | `string` | -      | ID do elemento alvo (sem #) |
| `offset`   | `number` | `100`  | Offset em pixels do topo    |

### Retorno

**useSmoothScroll:**

| Propriedade       | Tipo       | Descrição                                 |
| ----------------- | ---------- | ----------------------------------------- |
| `handleLinkClick` | `function` | Handler para eventos de clique em âncoras |

### Exemplo de Uso

```tsx
import { useSmoothScroll } from '../hooks/useSmoothScroll'

const Navigation = () => {
  const { handleLinkClick } = useSmoothScroll()

  const links = [
    { href: '#Home', label: 'Início' },
    { href: '#Projetos', label: 'Projetos' }
  ]

  return (
    <nav>
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          onClick={e => handleLinkClick(e, link.href)}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
```

### Uso da Função Utilitária

```tsx
import { smoothScrollTo } from '../hooks/useSmoothScroll'

// Scroll para elemento com ID "Contato" com offset de 150px
const handleClick = () => {
  smoothScrollTo('Contato', 150)
}
```

### Código Fonte

```typescript
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
```

---

## usePhoneFormat

**Arquivo:** `src/hooks/usePhoneFormat.ts`

**Descrição:** Hook para formatação de números de telefone no formato brasileiro.

### Assinatura

```typescript
const usePhoneFormat = () => {
  value: string
  setValue: (value: string) => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

// Função utilitária (exportada separadamente)
const formatPhoneNumber = (value: string) => string
```

### Parâmetros

Nenhum.

### Retorno

| Propriedade      | Tipo       | Descrição                                      |
| ---------------- | ---------- | ---------------------------------------------- |
| `value`          | `string`   | Valor atual formatado                          |
| `setValue`       | `function` | Setter para o valor                            |
| `handleChange`   | `function` | Handler para onChange do input                 |
| `handleKeyPress` | `function` | Handler para onKeyPress (bloqueia não-números) |

### Formato de Saída

| Entrada       | Saída              |
| ------------- | ------------------ |
| `51`          | `51`               |
| `5199`        | `(51) 99`          |
| `51998158`    | `(51) 9 9815-8`    |
| `51998158015` | `(51) 9 9815-8015` |

### Exemplo de Uso

```tsx
import { usePhoneFormat } from '../../hooks/usePhoneFormat'

const ContactForm = () => {
  const {
    value: phone,
    handleChange: handlePhoneChange,
    handleKeyPress
  } = usePhoneFormat()

  return (
    <input
      type='tel'
      value={phone}
      onChange={handlePhoneChange}
      onKeyPress={handleKeyPress}
      placeholder='(51) 9 9999-9999'
    />
  )
}
```

### Uso da Função Utilitária

```typescript
import { formatPhoneNumber } from '../hooks/usePhoneFormat'

// Formatar um número qualquer
const formatted = formatPhoneNumber('51998158015')
// Resultado: "(51) 9 9815-8015"
```

### Código Fonte

```typescript
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
```

---

## 🎯 Boas Práticas

### 1. Sempre Implemente Cleanup

```typescript
useEffect(() => {
  // Setup
  const handler = () => {
    /* ... */
  }
  window.addEventListener('event', handler)

  // Cleanup
  return () => {
    window.removeEventListener('event', handler)
  }
}, [])
```

### 2. Verifique SSR

```typescript
useEffect(() => {
  if (typeof window === 'undefined') return
  // Código que depende de window/document
}, [])
```

### 3. Use Tipos Explícitos

```typescript
// ✅ Bom
const [value, setValue] = useState<string>('')

// ❌ Evite
const [value, setValue] = useState('')
```

### 4. Exporte Funções Utilitárias Separadamente

```typescript
// Permite uso fora de componentes React
export const formatPhoneNumber = (value: string): string => {
  /* ... */
}

// Hook para uso em componentes
export const usePhoneFormat = () => {
  /* ... */
}
```

---

## 📊 Resumo de Dependências

| Hook              | Dependências React | Bibliotecas Externas |
| ----------------- | ------------------ | -------------------- |
| `useScrollReveal` | `useEffect`        | `scrollreveal`       |
| `useSmoothScroll` | -                  | -                    |
| `usePhoneFormat`  | `useState`         | -                    |

---

**Última atualização:** 26 de Novembro de 2025
