# Referência: Arquitetura do Sistema

Este documento descreve a arquitetura técnica do projeto Harry Portfolio.

---

## 📊 Visão Geral

O Harry Portfolio é uma aplicação web **Single Page Application (SPA)** construída com o framework **Next.js 14**
usando o **App Router**. O projeto foi migrado de uma stack Vite/Vanilla JavaScript para React/TypeScript com foco
em performance, SEO e manutenibilidade.

```text
┌─────────────────────────────────────────────────────────┐
│                      CLIENTE                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Browser (Chrome, Firefox, etc.)     │   │
│  │  ┌───────────────────────────────────────────┐  │   │
│  │  │           React 18 + TypeScript           │  │   │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────────┐ │  │   │
│  │  │  │  Header │ │ Sections│ │   Footer    │ │  │   │
│  │  │  └─────────┘ └─────────┘ └─────────────┘ │  │   │
│  │  └───────────────────────────────────────────┘  │   │
│  │                      │                          │   │
│  │  ┌───────────────────▼───────────────────────┐  │   │
│  │  │           Next.js App Router              │  │   │
│  │  │  • Server Components (RSC)                │  │   │
│  │  │  • Client Components ("use client")       │  │   │
│  │  │  • Image Optimization                     │  │   │
│  │  │  • Font Optimization                      │  │   │
│  │  └───────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  SERVIÇOS EXTERNOS                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │   EmailJS   │  │   Google    │  │     CDN         │ │
│  │  (Contato)  │  │   Fonts     │  │ (Assets/Videos) │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 🏗️ Stack Tecnológica

### Core

| Tecnologia   | Versão  | Função                      |
| ------------ | ------- | --------------------------- |
| Next.js      | 14.2.15 | Framework React com SSR/SSG |
| React        | 18.2.0  | Biblioteca de UI            |
| TypeScript   | 5.3.3   | Tipagem estática            |
| Tailwind CSS | 3.4.1   | Framework CSS utilitário    |

### Bibliotecas

| Biblioteca      | Versão | Função                       |
| --------------- | ------ | ---------------------------- |
| ScrollReveal    | 4.0.9  | Animações baseadas em scroll |
| EmailJS Browser | 4.4.1  | Envio de emails client-side  |

### Ferramentas de Desenvolvimento

| Ferramenta | Versão | Função                  |
| ---------- | ------ | ----------------------- |
| ESLint     | 8.57.1 | Linting de código       |
| Prettier   | 3.5.3  | Formatação de código    |
| CSpell     | 9.2.1  | Verificação ortográfica |

---

## 📁 Estrutura de Diretórios

```text
harry-portfolio/
├── docs/                      # 📚 Documentação do projeto
│   ├── 0_TUTORIALS/          # Tutoriais passo a passo
│   ├── 1_HOW_TO_GUIDES/      # Guias para tarefas específicas
│   ├── 2_REFERENCE/          # Documentação técnica (este arquivo)
│   └── 3_EXPLANATION/        # Explicações e decisões
│
├── public/                    # 📦 Assets estáticos
│   ├── assets/
│   │   ├── img/              # Imagens e ícones
│   │   ├── videos/           # Vídeos de demonstração
│   │   └── pdf/              # Documentos (currículo)
│   ├── robots.txt            # SEO - Diretivas para crawlers
│   └── sitemap.xml           # SEO - Mapa do site
│
├── src/                       # 🔧 Código fonte
│   ├── app/                  # Next.js App Router
│   │   ├── globals.css       # Estilos globais + variáveis CSS
│   │   ├── layout.tsx        # Layout raiz (metadata, fonts)
│   │   └── page.tsx          # Página principal
│   │
│   ├── components/           # Componentes React
│   │   ├── sections/         # Seções da página
│   │   │   ├── Home.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   ├── Header.tsx        # Navegação e logo
│   │   ├── Footer.tsx        # Rodapé
│   │   ├── ProjectCard.tsx   # Card de projeto com vídeo
│   │   └── FloatingActionButton.tsx  # FAB de redes sociais
│   │
│   ├── hooks/                # Hooks customizados
│   │   ├── useScrollReveal.ts
│   │   ├── useSmoothScroll.ts
│   │   └── usePhoneFormat.ts
│   │
│   ├── data/                 # Dados estáticos
│   │   └── index.ts          # Projetos, serviços, experiências
│   │
│   ├── types/                # Tipos TypeScript
│   │   └── index.ts
│   │
│   └── utils/                # Funções utilitárias
│       └── isMobile.ts
│
├── AGENTS.md                  # 🤖 Instruções para IAs
├── CHANGELOG.md               # 📝 Histórico de mudanças
├── package.json               # 📦 Dependências e scripts
├── next.config.mjs            # ⚙️ Configuração Next.js
├── tailwind.config.js         # 🎨 Configuração Tailwind
└── tsconfig.json              # 📘 Configuração TypeScript
```

---

## 🔄 Fluxo de Dados

### Renderização de Página

```text
┌──────────────┐
│ Requisição   │
│ HTTP GET /   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  layout.tsx  │  ← Metadata, Fonts, Estrutura base
│  (Server)    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   page.tsx   │  ← Composição de seções
│  (Server)    │
└──────┬───────┘
       │
       ├────────────────────┬────────────────────┐
       ▼                    ▼                    ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   Header     │   │   Sections   │   │   Footer     │
│  (Client)    │   │  (Misto)     │   │  (Client)    │
└──────────────┘   └──────────────┘   └──────────────┘
```

### Formulário de Contato

```text
┌──────────────┐
│   Usuário    │
│  preenche    │
│  formulário  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Contact.tsx │  ← Validação client-side
│  (Client)    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   EmailJS    │  ← API externa
│   Service    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Email     │  ← Entrega na caixa de entrada
│   Enviado    │
└──────────────┘
```

---

## ⚡ Otimizações de Performance

### 1. Otimização de Imagens

```js
// next.config.mjs
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  minimumCacheTTL: 60,
}
```

- **AVIF/WebP:** Formatos modernos com melhor compressão
- **Responsive:** Tamanhos adaptados ao dispositivo
- **Lazy Loading:** Carregamento sob demanda

### 2. Otimização de Fontes

```typescript
// layout.tsx
import { Poppins, Alegreya_Sans_SC } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins'
})
```

- **Font Display Swap:** Evita FOIT (Flash of Invisible Text)
- **Subset:** Apenas caracteres necessários
- **Preload:** Carregamento prioritário

### 3. Cache de Assets

```js
// next.config.mjs
async headers() {
  return [{
    source: '/assets/:path*',
    headers: [{
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable'
    }]
  }]
}
```

### 4. Compressão

- **SWC Minify:** Minificação de JavaScript
- **CSS Purge:** Remoção de CSS não utilizado (Tailwind)
- **Gzip/Brotli:** Compressão de resposta HTTP

---

## 🔒 Segurança

### Headers HTTP

```js
// next.config.mjs
headers: [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
]
```

### Content Security Policy

```js
images: {
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
}
```

---

## 📱 Responsividade

### Breakpoints

| Nome | Largura | Dispositivo          |
| ---- | ------- | -------------------- |
| xs   | 320px   | Smartphones pequenos |
| sm   | 540px   | Smartphones          |
| md   | 768px   | Tablets              |
| lg   | 1200px  | Desktops             |
| xl   | 1500px  | Monitores grandes    |

### Mobile-First

O CSS é escrito seguindo a abordagem mobile-first:

```css
/* Base: Mobile */
.container {
  padding: 0 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}

/* Desktop */
@media (min-width: 1200px) {
  .container {
    max-width: 1168px;
    margin: 0 auto;
  }
}
```

---

## 🔗 Integrações Externas

### EmailJS

- **Função:** Envio de emails do formulário de contato
- **Autenticação:** Public Key (client-side seguro)
- **Limite:** 200 emails/mês (plano gratuito)

### Google Fonts

- **Fontes:** Poppins, Alegreya Sans SC
- **Carregamento:** Via next/font (otimizado)
- **Fallback:** system-ui, sans-serif

### RemixIcon

- **Função:** Ícones vetoriais
- **Carregamento:** CDN via link no layout
- **Uso:** Classes `ri-*` nos elementos

---

## 📈 Métricas Alvo

### Core Web Vitals

| Métrica | Alvo    | Descrição                 |
| ------- | ------- | ------------------------- |
| LCP     | < 2.5s  | Largest Contentful Paint  |
| FID     | < 100ms | First Input Delay         |
| CLS     | < 0.1   | Cumulative Layout Shift   |
| INP     | < 200ms | Interaction to Next Paint |

### Lighthouse

| Categoria      | Alvo |
| -------------- | ---- |
| Performance    | > 90 |
| Accessibility  | > 95 |
| Best Practices | > 95 |
| SEO            | > 95 |

---

**Última atualização:** 26 de Novembro de 2025
