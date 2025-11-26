# Tutorial: Criando um Novo Componente

Este tutorial guia você através da criação de um novo componente React seguindo as convenções do projeto Harry Portfolio.

---

## 📋 O que Você Vai Aprender

- Estrutura de um componente React com TypeScript
- Convenções de nomenclatura e organização
- Uso de tipos e interfaces
- Integração com o sistema de estilos

---

## 🎯 Objetivo

Vamos criar um componente `SkillBadge` que exibe uma badge com ícone e nome de uma habilidade.

---

## Passo 1: Definir o Tipo

Primeiro, adicione o tipo necessário em `src/types/index.ts`:

```typescript
// src/types/index.ts

// ... tipos existentes ...

export interface Skill {
  name: string
  icon: string
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}
```

---

## Passo 2: Criar o Componente

Crie o arquivo `src/components/SkillBadge.tsx`:

```tsx
// src/components/SkillBadge.tsx
'use client'

import Image from 'next/image'
import { Skill } from '../types'

interface SkillBadgeProps {
  skill: Skill
  size?: 'sm' | 'md' | 'lg'
  showLevel?: boolean
}

const SkillBadge = ({
  skill,
  size = 'md',
  showLevel = false
}: SkillBadgeProps) => {
  // Mapeamento de tamanhos
  const sizeMap = {
    sm: { icon: 20, container: 'skill-badge--sm' },
    md: { icon: 32, container: 'skill-badge--md' },
    lg: { icon: 48, container: 'skill-badge--lg' }
  }

  const { icon: iconSize, container: containerClass } = sizeMap[size]

  // Mapeamento de níveis para cores
  const levelColors = {
    beginner: 'var(--text-color)',
    intermediate: 'var(--first-color-alt)',
    advanced: 'var(--first-color)',
    expert: 'gold'
  }

  return (
    <div className={`skill-badge ${containerClass}`}>
      <Image
        src={skill.icon}
        alt={`Ícone de ${skill.name}`}
        width={iconSize}
        height={iconSize}
        className='skill-badge__icon'
      />
      <span className='skill-badge__name'>{skill.name}</span>

      {showLevel && skill.level && (
        <span
          className='skill-badge__level'
          style={{ color: levelColors[skill.level] }}
        >
          {skill.level}
        </span>
      )}
    </div>
  )
}

export default SkillBadge
```

---

## Passo 3: Adicionar Estilos

Adicione os estilos em `src/app/globals.css`:

```css
/* src/app/globals.css */

/*=============== SKILL BADGE ===============*/
.skill-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--container-color);
  border-radius: 0.5rem;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.skill-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px hsla(var(--hue), 80%, 49%, 0.2);
}

.skill-badge__icon {
  flex-shrink: 0;
}

.skill-badge__name {
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  color: var(--white-color);
}

.skill-badge__level {
  font-size: var(--smaller-font-size);
  text-transform: capitalize;
  margin-left: auto;
}

/* Variantes de tamanho */
.skill-badge--sm {
  padding: 0.25rem 0.5rem;
  gap: 0.25rem;
}

.skill-badge--sm .skill-badge__name {
  font-size: var(--smaller-font-size);
}

.skill-badge--lg {
  padding: 0.75rem 1.5rem;
  gap: 0.75rem;
}

.skill-badge--lg .skill-badge__name {
  font-size: var(--normal-font-size);
}
```

---

## Passo 4: Usar o Componente

Agora você pode usar o componente em qualquer lugar:

```tsx
// Exemplo de uso em uma seção
import SkillBadge from '../components/SkillBadge'

const MySection = () => {
  const skill = {
    name: 'React',
    icon: '/assets/img/skills-react.svg',
    level: 'expert' as const
  }

  return (
    <section>
      <h2>Minhas Habilidades</h2>

      {/* Uso básico */}
      <SkillBadge skill={skill} />

      {/* Com tamanho grande e nível visível */}
      <SkillBadge skill={skill} size='lg' showLevel />

      {/* Tamanho pequeno */}
      <SkillBadge skill={skill} size='sm' />
    </section>
  )
}
```

---

## 📝 Boas Práticas Seguidas

### 1. Tipagem Completa

```tsx
// ✅ Interface clara para props
interface SkillBadgeProps {
  skill: Skill
  size?: 'sm' | 'md' | 'lg' // Union type para valores específicos
  showLevel?: boolean // Prop opcional com ?
}
```

### 2. Valores Padrão

```tsx
// ✅ Desestruturação com valores padrão
const SkillBadge = ({
  skill,
  size = 'md',           // Valor padrão
  showLevel = false      // Valor padrão
}: SkillBadgeProps) => {
```

### 3. Uso de next/image

```tsx
// ✅ Componente Image otimizado
<Image
  src={skill.icon}
  alt={`Ícone de ${skill.name}`} // Alt descritivo
  width={iconSize}
  height={iconSize}
/>
```

### 4. Variáveis CSS

```css
/* ✅ Uso de variáveis CSS do design system */
background-color: var(--container-color);
color: var(--white-color);
font-size: var(--small-font-size);
```

### 5. Nomenclatura BEM

```css
/* ✅ Block Element Modifier */
.skill-badge {
} /* Block */
.skill-badge__icon {
} /* Element */
.skill-badge__name {
} /* Element */
.skill-badge--sm {
} /* Modifier */
.skill-badge--lg {
} /* Modifier */
```

---

## 🧪 Testando o Componente

### Verificar Tipos

```bash
pnpm type-check
```

### Verificar Lint

```bash
pnpm lint
```

### Testar Visualmente

1. Execute `pnpm dev`
2. Adicione o componente temporariamente em `src/app/page.tsx`
3. Visualize em `http://localhost:3000`

---

## 📁 Estrutura Final

Após seguir este tutorial, você terá:

```text
src/
├── types/
│   └── index.ts          # + interface Skill
├── components/
│   └── SkillBadge.tsx    # Novo componente
└── app/
    └── globals.css       # + estilos .skill-badge
```

---

## ✅ Checklist

Antes de finalizar, verifique:

- [ ] Tipos definidos em `src/types/index.ts`
- [ ] Componente usa `'use client'` se necessário
- [ ] Props tipadas com interface
- [ ] Valores padrão para props opcionais
- [ ] Estilos usando variáveis CSS do projeto
- [ ] Nomenclatura BEM para classes CSS
- [ ] `pnpm type-check` passa sem erros
- [ ] `pnpm lint` passa sem erros

---

## 🔗 Próximos Passos

- [Documentar o componente](../2_REFERENCE/3_componentes-ui.md)
- [Entender os hooks disponíveis](../2_REFERENCE/4_hooks.md)
- [Explorar o design system](../2_REFERENCE/5_design-system.md)

---

**Última atualização:** 26 de Novembro de 2025
