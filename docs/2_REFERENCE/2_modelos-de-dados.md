# Referência: Modelos de Dados

Este documento lista todas as interfaces TypeScript e estruturas de dados utilizadas no projeto.

---

## 📦 Interfaces Principais

### Project

Representa um projeto no portfólio.

```typescript
// src/types/index.ts

interface Project {
  name: string // Nome do projeto (ex: "MON APART")
  description: string // Descrição curta do projeto
  image: string // Caminho da imagem de capa (ex: "/assets/img/MON-APART.webp")
  video?: string // Caminho do vídeo de demonstração (opcional)
  url: string // URL do projeto live
  skills: string[] // Array de caminhos para ícones de skills
}
```

**Exemplo de uso:**

```typescript
const project: Project = {
  name: 'MON APART',
  description: 'Plataforma desenvolvida para gerenciar reservas...',
  image: '/assets/img/MON-APART.webp',
  video: '/assets/videos/MON-APART.mp4',
  url: 'https://monapart.com.br',
  skills: [
    '/assets/img/skills-typescript.svg',
    '/assets/img/skills-tailwind-css.svg',
    '/assets/img/skills-react.svg'
  ]
}
```

---

### Service

Representa um serviço oferecido.

```typescript
// src/types/index.ts

interface Service {
  name: string // Nome do serviço (ex: "Web Development")
  description: string // Descrição do serviço
  icon: string // Classe do ícone RemixIcon (ex: "ri-code-box-line")
}
```

**Exemplo de uso:**

```typescript
const service: Service = {
  name: 'Web Development',
  description: 'Soluções para web sites com foco em performance...',
  icon: 'ri-code-box-line'
}
```

---

### Experience

Representa uma experiência profissional.

```typescript
// src/types/index.ts

interface Experience {
  company: string // Nome da empresa (ex: "Adobe")
  profession: string // Cargo/função (ex: "Website Development")
  date: string // Período (ex: "08/22 - Presente")
  description: string // Descrição das atividades
}
```

**Exemplo de uso:**

```typescript
const experience: Experience = {
  company: 'Adobe',
  profession: 'Website Development',
  date: '08/22 - Presente',
  description: 'Desenvolvo soluções visuais que se transformam...'
}
```

---

### SocialLink

Representa um link de rede social.

```typescript
// src/types/index.ts

interface SocialLink {
  url: string // URL completa do perfil
  icon: string // Classe do ícone RemixIcon
  label: string // Texto para acessibilidade (aria-label)
}
```

**Exemplo de uso:**

```typescript
const socialLink: SocialLink = {
  url: 'https://github.com/Schlorke',
  icon: 'ri-github-line',
  label: 'Abrir GitHub de Harry Schlorke'
}
```

---

### NavLink

Representa um link de navegação.

```typescript
// src/types/index.ts

interface NavLink {
  href: string // Âncora ou rota (ex: "#Projetos Recentes")
  label: string // Texto do link (ex: "Projetos")
}
```

**Exemplo de uso:**

```typescript
const navLinks: NavLink[] = [
  { href: '#Home', label: 'Início' },
  { href: '#Projetos Recentes', label: 'Projetos' },
  { href: '#Serviços', label: 'Serviços' },
  { href: '#Experiência', label: 'Experiência' },
  { href: '#Contato', label: 'Contato' }
]
```

---

## 📊 Dados Estáticos

Os dados estáticos do projeto estão em `src/data/index.ts`:

### projects

```typescript
// src/data/index.ts

export const projects: Project[] = [
  {
    name: 'MON APART',
    description: 'Plataforma desenvolvida para gerenciar reservas...',
    image: '/assets/img/MON-APART.webp',
    video: '/assets/videos/MON-APART.mp4',
    url: 'https://monapart.com.br',
    skills: [
      '/assets/img/skills-typescript.svg',
      '/assets/img/skills-tailwind-css.svg',
      '/assets/img/skills-react.svg'
    ]
  }
  // ... mais projetos
]
```

### services

```typescript
// src/data/index.ts

export const services: Service[] = [
  {
    name: 'Web Development',
    description: 'Soluções para web sites com foco em performance...',
    icon: 'ri-code-box-line'
  },
  {
    name: 'Web Design',
    description: 'Interfaces digitais que unem estética refinada...',
    icon: 'ri-pen-nib-line'
  },
  {
    name: 'Seo (Web Pages)',
    description: 'Otimização de páginas web visando posicionamento...',
    icon: 'ri-seo-line'
  }
]
```

### experiences

```typescript
// src/data/index.ts

export const experiences: Experience[] = [
  {
    company: 'Adobe',
    profession: 'Website Development',
    date: '08/22 - Presente',
    description: 'Desenvolvo soluções visuais...'
  }
  // ... mais experiências
]
```

### skills

```typescript
// src/data/index.ts

export const skills: string[] = [
  '/assets/img/skills-html.svg',
  '/assets/img/skills-css.svg',
  '/assets/img/skills-javascript.svg',
  '/assets/img/skills-typescript.svg',
  '/assets/img/skills-tailwind-css.svg',
  '/assets/img/skills-react.svg',
  '/assets/img/skills-git.svg',
  '/assets/img/skills-github.svg',
  '/assets/img/skills-figma.svg',
  '/assets/img/skills-photoshop.svg'
]
```

---

## 🔄 Tipos de Props de Componentes

### ProjectCardProps

```typescript
// src/components/ProjectCard.tsx

interface ProjectCardProps {
  project: Project
}
```

### ContactFormData (interno)

```typescript
// Usado internamente em Contact.tsx

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}
```

---

## 📝 Tipos de Retorno de Hooks

### usePhoneFormat

```typescript
// src/hooks/usePhoneFormat.ts

interface UsePhoneFormatReturn {
  value: string
  setValue: (value: string) => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
```

### useSmoothScroll

```typescript
// src/hooks/useSmoothScroll.ts

interface UseSmoothScrollReturn {
  handleLinkClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => void
}
```

---

## 🔧 Tipos Utilitários

### ScrollReveal Types

```typescript
// Tipos internos usados em useScrollReveal.ts

type ScrollRevealInstance = {
  reveal: (target: string, config?: unknown) => void
  destroy: () => void
}

type ScrollRevealFn = (options?: unknown) => ScrollRevealInstance
```

---

## 📁 Estrutura de Assets

### Imagens

| Caminho              | Formato | Uso                 |
| -------------------- | ------- | ------------------- |
| `/assets/img/*.webp` | WebP    | Imagens de projetos |
| `/assets/img/*.svg`  | SVG     | Ícones de skills    |
| `/assets/img/*.png`  | PNG     | Logo, favicons      |

### Vídeos

| Caminho                | Formato     | Uso                       |
| ---------------------- | ----------- | ------------------------- |
| `/assets/videos/*.mp4` | MP4 (H.264) | Demonstrações de projetos |

### Documentos

| Caminho             | Formato | Uso                     |
| ------------------- | ------- | ----------------------- |
| `/assets/pdf/*.pdf` | PDF     | Currículo para download |

---

## ✅ Validação de Dados

### Exemplo de Validação

```typescript
// Função auxiliar para validar Project
const isValidProject = (data: unknown): data is Project => {
  if (typeof data !== 'object' || data === null) return false

  const obj = data as Record<string, unknown>

  return (
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.image === 'string' &&
    typeof obj.url === 'string' &&
    Array.isArray(obj.skills) &&
    obj.skills.every(s => typeof s === 'string')
  )
}
```

---

**Última atualização:** 26 de Novembro de 2025
