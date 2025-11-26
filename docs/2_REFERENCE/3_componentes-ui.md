# Referência: Componentes UI

Este documento descreve os componentes React do projeto, suas props, estados e exemplos de uso.

---

## 📋 Índice de Componentes

### Layout

- [Header](#header)
- [Footer](#footer)

### Seções

- [Home](#home)
- [Projects](#projects)
- [Services](#services)
- [Experience](#experience)
- [Contact](#contact)

### Componentes Reutilizáveis

- [ProjectCard](#projectcard)
- [FloatingActionButton](#floatingactionbutton)

---

## Header

**Arquivo:** `src/components/Header.tsx`

**Descrição:** Componente de cabeçalho com navegação, logo e menu hamburger para mobile.

### Props

Nenhuma (componente auto-contido).

### Estado Interno

| Estado             | Tipo      | Descrição                                    |
| ------------------ | --------- | -------------------------------------------- |
| `isReady`          | `boolean` | Indica se a página está pronta para animação |
| `isAnimated`       | `boolean` | Controla animação do header                  |
| `isNavVisible`     | `boolean` | Controla visibilidade da navegação           |
| `isMobileMenuOpen` | `boolean` | Estado do menu mobile                        |

### Hooks Utilizados

- `useSmoothScroll` - Para navegação suave entre seções

### Animações

1. **Header Slide:** Animação de entrada do header
2. **Nav Fade In:** Aparecimento gradual dos links de navegação
3. **Hamburger Transform:** Transformação do ícone em X quando aberto

### Exemplo de Uso

```tsx
// src/app/page.tsx
import Header from '../components/Header'

export default function Page() {
  return (
    <>
      <Header />
      {/* ... resto da página */}
    </>
  )
}
```

### Classes CSS Principais

- `.header-preload` - Estado inicial (oculto)
- `.header-ready` - Pronto para animar
- `.animate_header` - Animação ativa
- `.animate_nav` - Animação dos links de navegação
- `.hamburger` - Botão do menu mobile
- `.hamburger.active` - Menu aberto

---

## Footer

**Arquivo:** `src/components/Footer.tsx`

**Descrição:** Rodapé com links sociais, copyright e informações de contato.

### Props

Nenhuma (componente auto-contido).

### Hooks Utilizados

- `useSmoothScroll` - Para link de "voltar ao topo"

### Exemplo de Uso

```tsx
import Footer from '../components/Footer'

export default function Page() {
  return (
    <>
      {/* ... conteúdo */}
      <Footer />
    </>
  )
}
```

### Classes CSS Principais

- `.footer` - Container principal
- `.footer__social-link` - Links de redes sociais
- `.footer__copy` - Texto de copyright

---

## Home

**Arquivo:** `src/components/sections/Home.tsx`

**Descrição:** Seção hero com foto de perfil, informações pessoais e skills.

### Props

Nenhuma (componente de seção).

### Dados Utilizados

- `skills` de `src/data/index.ts`

### Hooks Utilizados

- `useScrollReveal` - Animações de entrada
- `useSmoothScroll` - Links de navegação

### Estrutura

```text
Home Section
├── Perfil (foto + animação)
├── Info (nome, título, localização)
├── Skills (carrossel de ícones)
├── About (texto de apresentação)
└── CTAs (download CV, contato)
```

### Classes CSS Principais

- `.perfil` - Container da foto de perfil
- `.info` - Informações básicas
- `.skills` - Lista de habilidades
- `.about` - Texto sobre mim

---

## Projects

**Arquivo:** `src/components/sections/Projects.tsx`

**Descrição:** Galeria de projetos em grid responsivo.

### Props

Nenhuma (componente de seção).

### Dados Utilizados

- `projects` de `src/data/index.ts`

### Hooks Utilizados

- `useScrollReveal` - Animações de entrada dos cards

### Exemplo de Renderização

```tsx
{
  projects.map(project => <ProjectCard key={project.name} project={project} />)
}
```

### Classes CSS Principais

- `.projects` - Container da seção
- `.projects__container` - Grid de projetos

---

## Services

**Arquivo:** `src/components/sections/Services.tsx`

**Descrição:** Seção de serviços oferecidos em cards.

### Props

Nenhuma (componente de seção).

### Dados Utilizados

- `services` de `src/data/index.ts`

### Classes CSS Principais

- `.services` - Container da seção
- `.services__card` - Card de serviço individual
- `.services__icon` - Ícone do serviço
- `.services__name` - Nome do serviço
- `.services__description` - Descrição

---

## Experience

**Arquivo:** `src/components/sections/Experience.tsx`

**Descrição:** Timeline de experiências profissionais.

### Props

Nenhuma (componente de seção).

### Dados Utilizados

- `experiences` de `src/data/index.ts`

### Classes CSS Principais

- `.experience` - Container da seção
- `.experience__card` - Card de experiência
- `.experience__company` - Nome da empresa
- `.experience__profession` - Cargo
- `.experience__date` - Período
- `.experience__description` - Descrição das atividades

---

## Contact

**Arquivo:** `src/components/sections/Contact.tsx`

**Descrição:** Formulário de contato com integração EmailJS.

### Props

Nenhuma (componente de seção).

### Estado Interno

| Estado     | Tipo                                          | Descrição           |
| ---------- | --------------------------------------------- | ------------------- |
| `formData` | `object`                                      | Dados do formulário |
| `status`   | `'idle' \| 'loading' \| 'success' \| 'error'` | Estado do envio     |

### Hooks Utilizados

- `usePhoneFormat` - Formatação do campo de telefone
- `useScrollReveal` - Animações de entrada

### Campos do Formulário

| Campo     | Tipo     | Validação              |
| --------- | -------- | ---------------------- |
| `name`    | text     | required               |
| `email`   | email    | required, email format |
| `phone`   | tel      | required, BR format    |
| `subject` | text     | required               |
| `message` | textarea | required               |

### Integração EmailJS

```tsx
await emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  {
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    subject: formData.subject,
    message: formData.message
  },
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
)
```

### Classes CSS Principais

- `.contact` - Container da seção
- `.contact__form` - Formulário
- `.contact__input` - Campos de input
- `.contact__textarea` - Campo de mensagem
- `.contact__button` - Botão de enviar

---

## ProjectCard

**Arquivo:** `src/components/ProjectCard.tsx`

**Descrição:** Card de projeto com imagem, vídeo on hover/scroll e informações.

### Props

```typescript
interface ProjectCardProps {
  project: Project
}
```

| Prop      | Tipo      | Obrigatório | Descrição        |
| --------- | --------- | ----------- | ---------------- |
| `project` | `Project` | Sim         | Dados do projeto |

### Estado Interno

| Estado           | Tipo      | Descrição                      |
| ---------------- | --------- | ------------------------------ |
| `isVideoVisible` | `boolean` | Controla visibilidade do vídeo |

### Comportamento

**Desktop:**

- Vídeo inicia no hover
- Pausa ao sair do hover

**Mobile:**

- Vídeo inicia quando o card entra na viewport (50%)
- Usa Intersection Observer
- Desbloqueio automático de autoplay em iOS

### Exemplo de Uso

```tsx
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data'

const Projects = () => (
  <section>
    {projects.map(project => (
      <ProjectCard key={project.name} project={project} />
    ))}
  </section>
)
```

### Classes CSS Principais

- `.projects__card` - Container do card
- `.projects__image` - Container da imagem/vídeo
- `.projects__img` - Imagem de capa
- `.projects__video` - Elemento de vídeo
- `.video-visible` - Quando vídeo está visível
- `.projects__data` - Informações do projeto
- `.projects__name` - Nome do projeto
- `.projects__description` - Descrição
- `.projects__skills` - Lista de skills
- `.projects__button` - Botão de visitar

---

## FloatingActionButton

**Arquivo:** `src/components/FloatingActionButton.tsx`

**Descrição:** Botão de ação flutuante (FAB) que expande para mostrar links de redes sociais.

### Props

Nenhuma (componente auto-contido).

### Estado Interno

| Estado              | Tipo      | Descrição                      |
| ------------------- | --------- | ------------------------------ |
| `isActive`          | `boolean` | FAB expandido/recolhido        |
| `animationComplete` | `boolean` | Animação de entrada finalizada |

### Redes Sociais

Definidas internamente no componente:

```typescript
const socialLinks = [
  { url: 'https://github.com/...', icon: 'ri-github-line', label: '...' },
  { url: 'https://instagram.com/...', icon: 'ri-instagram-line', label: '...' },
  { url: 'https://wa.me/...', icon: 'ri-whatsapp-line', label: '...' }
]
```

### Animação

- Links aparecem em sequência (staggered) ao abrir
- Animação reversa ao fechar
- Overlay escurece o fundo

### Exemplo de Uso

```tsx
import FloatingActionButton from '../components/FloatingActionButton'

export default function Page() {
  return (
    <>
      {/* ... conteúdo */}
      <FloatingActionButton />
    </>
  )
}
```

### Classes CSS Principais

- `.fab-container` - Container do FAB
- `.fab` - Botão principal
- `.fab.ativo` - Estado expandido
- `.fab-icon` - Ícone do botão (+ que vira ×)
- `.fab-options` - Container dos links
- `.fab-option` - Link individual
- `.fab-visible` - Após animação de entrada
- `.overlay` - Overlay de fundo

---

## 🎨 Padrões de Design

### Nomenclatura BEM

Todos os componentes seguem a convenção BEM (Block Element Modifier):

```css
.block {
}
.block__element {
}
.block--modifier {
}
```

### Acessibilidade

- Todos os botões têm `aria-label`
- Links externos têm `rel="noopener noreferrer"`
- Imagens têm `alt` descritivo
- Formulários têm labels associados

### Responsividade

- Mobile-first approach
- Breakpoints definidos no design system
- Media queries em `globals.css`

---

**Última atualização:** 26 de Novembro de 2025
