# Explicação: Decisões de Arquitetura

Este documento explica o raciocínio por trás das principais decisões de arquitetura do projeto Harry Portfolio.

---

## 📋 Índice

- [Por que Next.js?](#por-que-nextjs)
- [Por que TypeScript?](#por-que-typescript)
- [CSS Customizado vs Tailwind](#css-customizado-vs-tailwind)
- [Estrutura de Componentes](#estrutura-de-componentes)
- [Gerenciamento de Estado](#gerenciamento-de-estado)
- [Otimização de Assets](#otimização-de-assets)

---

## Por que Next.js?

### Contexto

O projeto originalmente foi construído com **Vite + Vanilla JavaScript**. A decisão de migrar para **Next.js 14** foi
tomada considerando os seguintes fatores:

### Benefícios da Migração

| Aspecto     | Vite (antes)                               | Next.js (depois)                      |
| ----------- | ------------------------------------------ | ------------------------------------- |
| SEO         | Client-side rendering, meta tags limitadas | SSR/SSG, metadata API nativa          |
| Performance | Manual                                     | Otimização automática (images, fonts) |
| Roteamento  | Manual ou biblioteca externa               | App Router integrado                  |
| Tipagem     | JavaScript com JSDoc                       | TypeScript nativo                     |
| Build       | Configuração manual                        | Zero-config com otimizações           |

### Por que App Router?

Escolhemos o **App Router** (Next.js 13+) em vez do Pages Router por:

1. **React Server Components (RSC):** Reduz JavaScript enviado ao cliente
2. **Layouts Aninhados:** Melhor organização e reuso de código
3. **Streaming:** Carregamento progressivo de conteúdo
4. **Metadata API:** SEO declarativo e type-safe

### Alternativas Consideradas

| Framework | Por que não?                                               |
| --------- | ---------------------------------------------------------- |
| Gatsby    | Mais complexo para projeto simples, GraphQL desnecessário  |
| Astro     | Excelente, mas equipe mais familiarizada com React         |
| Remix     | Overkill para um portfólio sem muita interação com backend |

### Conclusão

Next.js oferece o melhor equilíbrio entre **simplicidade de desenvolvimento**, **performance** e **SEO** para um
projeto de portfólio profissional.

---

## Por que TypeScript?

### Motivação

A migração de JavaScript para TypeScript foi motivada por:

1. **Segurança de Tipos:** Detectar erros em tempo de desenvolvimento
2. **IntelliSense:** Melhor autocompletar e documentação inline
3. **Refatoração:** Facilita mudanças com confiança
4. **Documentação:** Tipos servem como documentação viva

### Estratégia de Migração

```typescript
// Antes (JavaScript)
const project = {
  name: 'MON APART',
  description: '...',
  image: '/assets/img/MON-APART.webp'
}

// Depois (TypeScript)
interface Project {
  name: string
  description: string
  image: string
  video?: string // Tipo opcional explícito
  url: string
  skills: string[]
}

const project: Project = {
  name: 'MON APART',
  description: '...',
  image: '/assets/img/MON-APART.webp',
  url: 'https://monapart.com.br',
  skills: ['/assets/img/skills-react.svg']
}
```

### Configuração Strict

Usamos `strict: true` no `tsconfig.json` para máxima segurança:

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true
  }
}
```

### Trade-offs

| Prós                    | Contras                                   |
| ----------------------- | ----------------------------------------- |
| Menos bugs em runtime   | Curva de aprendizado inicial              |
| Melhor IDE support      | Alguns tipos de bibliotecas são complexos |
| Documentação automática | Build ligeiramente mais lento             |

---

## CSS Customizado vs Tailwind

### A Decisão Híbrida

O projeto usa uma **abordagem híbrida**: CSS customizado como base com Tailwind CSS disponível para utilitários.

### Por que não 100% Tailwind?

1. **Migração Gradual:** O CSS original era bem estruturado
2. **Complexidade de Animações:** Mais fácil em CSS puro
3. **Manutenibilidade:** CSS customizado com variáveis é muito legível

### Por que manter Tailwind?

1. **Utilitários Rápidos:** Flexbox, spacing, responsive helpers
2. **Consistência:** Garante valores padronizados
3. **Prototipagem:** Útil para ajustes rápidos

### O Prefixo `tw-`

Adicionamos o prefixo para **evitar conflitos** com classes CSS existentes:

```javascript
// tailwind.config.js
module.exports = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false // Não resetar CSS base
  }
}
```

### Exemplo de Uso Combinado

```html
<!-- CSS customizado para layout principal -->
<section class="projects">
  <div class="container">
    <!-- Tailwind para ajustes de espaçamento -->
    <div class="projects__grid tw-gap-6 lg:tw-gap-8">
      <article class="projects__card">
        <!-- CSS customizado para estilos do card -->
      </article>
    </div>
  </div>
</section>
```

---

## Estrutura de Componentes

### Filosofia

Seguimos o princípio de **Separação de Responsabilidades**:

```text
src/components/
├── sections/          # Seções da página (auto-contidas)
│   ├── Home.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
│
├── Header.tsx         # Componentes de layout
├── Footer.tsx
│
├── ProjectCard.tsx    # Componentes reutilizáveis
└── FloatingActionButton.tsx
```

### Por que Seções como Componentes?

1. **Isolamento:** Cada seção gerencia seu próprio estado e efeitos
2. **Lazy Loading:** Possibilidade de carregar seções sob demanda
3. **Testabilidade:** Mais fácil testar seções isoladamente
4. **Manutenção:** Localiza mudanças em arquivos específicos

### Server vs Client Components

**Server Components** (padrão):

- `page.tsx` - Página principal
- `layout.tsx` - Layout raiz

**Client Components** (`"use client"`):

- `Header.tsx` - Interações de navegação
- `Contact.tsx` - Formulário com estado
- `ProjectCard.tsx` - Interações de hover/scroll

### Decisão de Quando Usar Client

```tsx
// ✅ Server Component (padrão)
// - Não usa hooks (useState, useEffect)
// - Não usa event handlers
// - Não acessa browser APIs

// ❌ Precisa ser Client Component
// - Usa useState, useEffect
// - Usa onClick, onChange
// - Usa window, document
```

---

## Gerenciamento de Estado

### Por que Não Usar Redux/Zustand?

O projeto é relativamente simples e não possui:

- Estado global complexo
- Múltiplas fontes de dados
- Cache de dados do servidor

### Estratégia Atual

| Tipo de Estado  | Solução                 |
| --------------- | ----------------------- |
| Estado de UI    | `useState` local        |
| Dados estáticos | Arquivos em `src/data/` |
| Formulários     | Estado local + EmailJS  |
| Navegação       | URL + scroll position   |

### Exemplo de Estado Local

```tsx
// Contact.tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
  'idle'
)
```

### Quando Adicionar State Management Global?

Consideraria Redux/Zustand se:

- Adicionasse autenticação de usuário
- Implementasse um CMS client-side
- Tivesse múltiplas páginas compartilhando estado

---

## Otimização de Assets

### Imagens

**Decisão:** Usar `next/image` para todas as imagens.

**Benefícios:**

- Otimização automática (WebP, AVIF)
- Lazy loading nativo
- Responsive images
- Prevenção de CLS

```tsx
// ✅ Correto
<Image
  src="/assets/img/project.webp"
  alt="Projeto"
  width={320}
  height={210}
  loading="lazy"
/>

// ❌ Evitar (apenas para ícones externos)
<img src="/icon.svg" alt="..." />
```

### Vídeos

**Decisão:** Manter vídeos MP4 em vez de converter para WebM.

**Razão:**

- MP4 H.264 tem suporte universal
- WebM economiza ~20% mas Safari precisa de fallback
- Complexidade de manter dois formatos

### Fontes

**Decisão:** Usar `next/font` em vez de Google Fonts CDN.

**Benefícios:**

- Zero layout shift
- Self-hosted (sem requisição externa)
- Otimização automática

```typescript
// layout.tsx
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap', // Evita FOIT
  variable: '--font-poppins'
})
```

---

## 📊 Resumo de Decisões

| Área        | Decisão                | Justificativa             |
| ----------- | ---------------------- | ------------------------- |
| Framework   | Next.js 14             | SSR, otimizações, DX      |
| Linguagem   | TypeScript             | Segurança de tipos        |
| Estilização | CSS + Tailwind híbrido | Flexibilidade + utilidade |
| Estado      | Local (useState)       | Simplicidade              |
| Imagens     | next/image             | Otimização automática     |
| Fontes      | next/font              | Performance               |
| Email       | EmailJS                | Sem backend necessário    |
| Animações   | ScrollReveal           | Simplicidade, performance |

---

## 🔮 Decisões Futuras

Algumas decisões foram **adiadas** propositalmente:

1. **Internacionalização:** Aguardando necessidade real
2. **CMS:** Por enquanto, dados em arquivos são suficientes
3. **Analytics:** Avaliar opções privacy-first quando necessário
4. **Testes E2E:** Implementar quando houver mais interações complexas

---

**Última atualização:** 26 de Novembro de 2025
