# Referência: Design System

Este documento descreve o sistema de design do projeto, incluindo cores, tipografia, espaçamento e componentes visuais.

---

## 🎨 Cores

### Variáveis CSS

As cores são definidas usando variáveis CSS com valores HSL para fácil customização:

```css
:root {
  --hue: 358; /* Matiz base - Vermelho */

  /* Cores principais */
  --first-color: hsl(var(--hue), 80%, 49%); /* #E51E24 */
  --first-color-alt: hsl(var(--hue), 76%, 45%); /* #CA1B21 */

  /* Cores neutras */
  --white-color: hsl(0, 0%, 98%); /* #FAFAFA */
  --black-color: hsl(0, 0%, 1%); /* #030303 */
  --text-color: hsl(var(--hue), 2%, 66%); /* #A8A7A7 */
  --body-color: hsl(var(--hue), 100%, 1%); /* #050000 */
  --container-color: hsl(var(--hue), 2%, 10%); /* #1A1919 */
}
```

### Paleta de Cores

| Nome        | Variável            | Valor HSL          | Hex     | Uso                    |
| ----------- | ------------------- | ------------------ | ------- | ---------------------- |
| Primary     | `--first-color`     | hsl(358, 80%, 49%) | #E51E24 | CTAs, links, destaques |
| Primary Alt | `--first-color-alt` | hsl(358, 76%, 45%) | #CA1B21 | Hover, estados ativos  |
| White       | `--white-color`     | hsl(0, 0%, 98%)    | #FAFAFA | Texto principal        |
| Black       | `--black-color`     | hsl(0, 0%, 1%)     | #030303 | Background base        |
| Text        | `--text-color`      | hsl(358, 2%, 66%)  | #A8A7A7 | Texto secundário       |
| Body        | `--body-color`      | hsl(358, 100%, 1%) | #050000 | Background do body     |
| Container   | `--container-color` | hsl(358, 2%, 10%)  | #1A1919 | Cards, containers      |

### Personalizando a Cor Principal

Para mudar a cor principal, altere apenas o valor de `--hue`:

```css
:root {
  /* Vermelho (padrão) */
  --hue: 358;

  /* Alternativas */
  /* Roxo: --hue: 265; */
  /* Azul: --hue: 220; */
  /* Rosa: --hue: 330; */
  /* Verde: --hue: 162; */
  /* Laranja: --hue: 14; */
}
```

### Gradiente Cônico

```css
:root {
  --conic-gradient: conic-gradient(
    from 150deg at 50% 45%,
    hsl(var(--hue), 80%, 20%) 0deg,
    hsl(var(--hue), 80%, 48%) 140deg,
    hsl(var(--hue), 80%, 20%) 360deg
  );
}
```

Usado no efeito de brilho da foto de perfil.

---

## 📝 Tipografia

### Fontes

| Fonte                | Uso               | Pesos              |
| -------------------- | ----------------- | ------------------ |
| **Poppins**          | Texto principal   | 400, 500, 600, 700 |
| **Alegreya Sans SC** | Títulos especiais | 400, 500, 600, 700 |

### Carregamento (Next.js)

```typescript
// src/app/layout.tsx
import { Poppins, Alegreya_Sans_SC } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins'
})

const alegreyaSansSC = Alegreya_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-alegreya-sans-sc'
})
```

### Escala Tipográfica

```css
:root {
  --biggest-font-size: 2.5rem; /* 40px */
  --h1-font-size: 1.5rem; /* 24px */
  --h2-font-size: 1.25rem; /* 20px */
  --h3-font-size: 1rem; /* 16px */
  --normal-font-size: 0.9375rem; /* 15px */
  --small-font-size: 0.813rem; /* 13px */
  --smaller-font-size: 0.75rem; /* 12px */
}
```

### Font Weights

```css
:root {
  --font-regular: 450;
  --font-medium: 500;
  --font-semi-bold: 600;
}
```

### Escala Responsiva

Para telas maiores (1024px+):

```css
@media (min-width: 1024px) {
  :root {
    --biggest-font-size: 4.5rem; /* 72px */
    --h1-font-size: 2.25rem; /* 36px */
    --h2-font-size: 1.5rem; /* 24px */
    --h3-font-size: 1.25rem; /* 20px */
    --normal-font-size: 1rem; /* 16px */
    --small-font-size: 0.875rem; /* 14px */
    --smaller-font-size: 0.813rem; /* 13px */
  }
}
```

---

## 📏 Espaçamento

### Sistema de Grid

O projeto usa um sistema de container centralizado:

```css
.container {
  max-width: 1168px;
  margin-inline: auto;
  padding-inline: 1rem;
}
```

### Z-Index

```css
:root {
  --z-tooltip: 10;
  --z-fixed: 100;
}
```

| Valor | Uso                 |
| ----- | ------------------- |
| 10    | Tooltips, dropdowns |
| 100   | Header fixo, modals |

---

## 📐 Breakpoints

### Definição

```javascript
// tailwind.config.js
screens: {
  xs: '320px',   // Smartphones pequenos
  sm: '540px',   // Smartphones
  md: '768px',   // Tablets
  lg: '1200px',  // Desktops
  xl: '1500px'   // Monitores grandes
}
```

### Uso em CSS

```css
/* Mobile first - base */
.element {
  width: 100%;
}

/* Tablet */
@media (min-width: 768px) {
  .element {
    width: 50%;
  }
}

/* Desktop */
@media (min-width: 1200px) {
  .element {
    width: 33.33%;
  }
}
```

### Uso com Tailwind (prefixo tw-)

```html
<div class="tw-w-full md:tw-w-1/2 lg:tw-w-1/3"></div>
```

---

## 🎭 Componentes Visuais

### Botões

```css
/* Botão primário */
.button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background-color: var(--first-color);
  color: var(--white-color);
  border-radius: 0.5rem;
  font-weight: var(--font-semi-bold);
  transition: background-color 0.3s;
}

.button:hover {
  background-color: var(--first-color-alt);
}

/* Botão outline */
.button--outline {
  background-color: transparent;
  border: 2px solid var(--first-color);
  color: var(--first-color);
}

.button--outline:hover {
  background-color: var(--first-color);
  color: var(--white-color);
}
```

### Cards

```css
.card {
  background-color: var(--container-color);
  border-radius: 1rem;
  padding: 1.5rem;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px hsla(var(--hue), 80%, 49%, 0.15);
}
```

### Inputs

```css
.input {
  width: 100%;
  padding: 1rem;
  background-color: var(--container-color);
  border: 2px solid transparent;
  border-radius: 0.5rem;
  color: var(--white-color);
  font-size: var(--normal-font-size);
  transition: border-color 0.3s;
}

.input:focus {
  border-color: var(--first-color);
  outline: none;
}

.input::placeholder {
  color: var(--text-color);
}
```

---

## 🌀 Animações

### Transições Padrão

```css
/* Transição suave para propriedades comuns */
.element {
  transition: all 0.3s ease;
}

/* Transições específicas */
.button {
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
```

### Keyframes Definidos

```css
/* Animação de fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animação do header */
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Rotação da borda da foto de perfil */
@keyframes rotate-gradient {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

### ScrollReveal Defaults

```javascript
{
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  easing: 'ease-out'
}
```

---

## 🎨 Tailwind CSS

### Prefixo

Todas as classes Tailwind usam o prefixo `tw-`:

```html
<!-- Correto -->
<div class="tw-flex tw-items-center tw-gap-4">
  <!-- Incorreto (não funcionará) -->
  <div class="flex items-center gap-4"></div>
</div>
```

### Configuração Custom

```javascript
// tailwind.config.js
module.exports = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false // Desabilitado - usando CSS customizado
  },
  theme: {
    extend: {
      colors: {
        first: {
          DEFAULT: 'hsl(358, 80%, 49%)',
          alt: 'hsl(358, 76%, 45%)'
        },
        white: 'hsl(0, 0%, 98%)',
        black: 'hsl(0, 0%, 1%)',
        text: 'hsl(358, 2%, 66%)',
        body: 'hsl(358, 100%, 1%)',
        container: 'hsl(358, 2%, 10%)'
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
        second: ['Alegreya Sans SC', 'sans-serif']
      }
    }
  }
}
```

---

## 🖼️ Ícones

### RemixIcon

O projeto usa [RemixIcon](https://remixicon.com/) via CDN:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/remixicon@4.7.0/fonts/remixicon.css"
/>
```

### Uso

```html
<!-- Ícone de código -->
<i class="ri-code-box-line"></i>

<!-- Ícone de GitHub -->
<i class="ri-github-line"></i>

<!-- Ícone com tamanho customizado -->
<i class="ri-code-box-line" style="font-size: 1.5rem;"></i>
```

### Ícones Comuns no Projeto

| Classe                 | Uso             |
| ---------------------- | --------------- |
| `ri-code-box-line`     | Web Development |
| `ri-pen-nib-line`      | Web Design      |
| `ri-seo-line`          | SEO             |
| `ri-github-line`       | GitHub          |
| `ri-instagram-line`    | Instagram       |
| `ri-whatsapp-line`     | WhatsApp        |
| `ri-linkedin-box-line` | LinkedIn        |
| `ri-link`              | Link externo    |
| `ri-download-line`     | Download        |
| `ri-mail-line`         | Email           |

---

## 📱 Responsividade

### Mobile First

O CSS base é para mobile, com media queries para telas maiores:

```css
/* Base: Mobile (< 768px) */
.grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Tablet (>= 768px) */
@media (min-width: 768px) {
  .grid {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .grid > * {
    width: calc(50% - 0.5rem);
  }
}

/* Desktop (>= 1200px) */
@media (min-width: 1200px) {
  .grid > * {
    width: calc(33.33% - 0.67rem);
  }
}
```

### Container Responsivo

```css
.section {
  padding-block: 4rem 2rem;
}

@media (min-width: 1024px) {
  .section {
    padding-block: 7rem 3rem;
  }
}
```

---

## ✅ Checklist de Implementação

Ao criar novos componentes visuais, verifique:

- [ ] Usa variáveis CSS para cores
- [ ] Usa escala tipográfica definida
- [ ] Segue convenção BEM para classes
- [ ] Tem estados hover/focus definidos
- [ ] É responsivo (mobile-first)
- [ ] Tem transições suaves
- [ ] Usa prefixo `tw-` se usar Tailwind

---

**Última atualização:** 26 de Novembro de 2025
