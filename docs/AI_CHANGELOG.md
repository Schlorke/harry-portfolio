# AI Changelog - Registro de Alterações por Componente

> **📋 Propósito:** Este documento é a **memória coletiva** das IAs que trabalham neste projeto.
> Ele registra todas as alterações feitas em componentes, hooks e utilitários, fornecendo
> contexto histórico para futuras modificações.
>
> **⚠️ OBRIGATÓRIO:** Toda IA deve ler este documento ANTES de modificar código e atualizá-lo DEPOIS.

---

## 📖 Como Usar Este Documento

### Para IAs (Leitura)

1. **ANTES de modificar qualquer componente**, encontre a seção correspondente neste documento
2. Leia o histórico de alterações para entender o contexto
3. Observe as notas deixadas por IAs anteriores
4. Entenda o estado atual e as decisões tomadas

### Para IAs (Escrita)

Após fazer alterações, adicione uma nova entrada na seção do componente modificado:

```markdown
### [YYYY-MM-DD] Descrição breve da alteração

**Tipo:** `feat` | `fix` | `refactor` | `style` | `perf` | `docs`
**Arquivos:** Lista de arquivos modificados
**Contexto:** Por que a alteração foi feita
**Detalhes:**

- O que foi alterado
- Como funciona agora
- Impactos em outros componentes (se houver)

**Notas para IAs futuras:** Informações importantes para contexto
```

---

## 📂 Índice de Componentes

### Feature (Layout/Funcionalidades)

- [Header](#header)
- [Footer](#footer)
- [FloatingActionButton](#floatingactionbutton)

### Seções

- [Home](#home)
- [Projects](#projects)
- [Services](#services)
- [Experience](#experience)
- [Contact](#contact)

### UI (Componentes Reutilizáveis)

- [ProjectCard](#projectcard)

### Hooks

- [useScrollReveal](#usescrollreveal)
- [useSmoothScroll](#usesmoothscroll)
- [usePhoneFormat](#usephoneformat)
- [useVideoPlayer](#usevideoplayer)

### Utilitários

- [isMobile](#ismobile)

### Dados

- [data/index.ts](#dataindexts)

### Tipos

- [types/index.ts](#typesindexts)

### Configuração

- [layout.tsx](#layouttsx)
- [page.tsx](#pagetsx)
- [globals.css](#globalscss)

---

## Feature (Layout/Funcionalidades)

---

### Header

**Arquivo:** `src/components/feature/Header.tsx`

**Estado Atual:**

- Componente Client (`"use client"`)
- Navegação principal com links para seções
- Menu hamburger para mobile
- **Background animado com WebGL (wave animation)**
- Animações de entrada com CSS
- Sistema de loading screen integrado

**Dependências:**

- `useSmoothScroll` hook
- `WaveAnimation` componente de `../gl`
- Classes CSS em `globals.css`

**Histórico de Alterações:**

#### [2025-11-27] Transicoes da logo desativadas apos animacao

**Tipo:** `fix`
**Arquivos:** `src/components/feature/Header.tsx`, `src/app/globals.css`
**Contexto:**
A logo deslizava durante o resize porque as transicoes de `left/transform` continuavam ativas apos a animação inicial.
**Detalhes:**

- Adicionado estado `isHeaderStable` para aplicar a classe `header-stable` quando a animacao termina
- Transicoes da logo/imagem sao removidas apos 1.2s, evitando o efeito de "flutuacao" ao redimensionar
- Mantida a animacao original de entrada (centro para canto) antes de desativar as transicoes

**Notas para IAs futuras:**

- Se ajustar a duracao da animacao, revise o timeout de estabilidade para nao cortar a transicao inicial
- A classe `header-stable` serve apenas para evitar reativacoes de transicoes em resizes

#### [2025-11-27] Implementação Wave Animation Background

**Tipo:** `feat`
**Arquivos:** `src/components/feature/Header.tsx`, `src/components/gl/*`, `src/hooks/usePageLoading.ts`, `src/app/globals.css`
**Contexto:** Substituição do background estático (Background.png) por animação WebGL de partículas

**Detalhes:**

- Substituído `<Image>` do Background.png pelo componente `<WaveAnimation>`
- Criado componente `WaveAnimation` em `src/components/gl/` usando Three.js
- Animação de partículas brancas com movimento ondulatório
- Efeito de reveal animado na inicialização
- Transição suave para header após loading completo
- Animação funciona como "loading screen" até página carregar
- **O componente usa `position: fixed` com `100vw x 100vh` para ocupar toda a tela**
- **A transição usa `opacity: 0` e `transform: translateY(-100%)` para desaparecer**

**Notas para IAs futuras:**

- O componente WaveAnimation usa WebGL via @react-three/fiber
- **IMPORTANTE:** O Canvas do Three.js precisa de container com dimensões explícitas (100vw/100vh)
- Configurações de performance em `src/components/gl/index.tsx`
- Shaders GLSL em `src/components/gl/shaders/`
- O hook `usePageLoading` controla quando a animação de transição inicia (minLoadingTime: 3000ms)
- A animação wave desaparece junto com a transição para header (via CSS com transition 1s)
- CSS relevante: `.header-background` em `globals.css` - usa `position: fixed` e `inset: 0`

#### [2025-11-26] Reorganização para components/feature/

**Tipo:** `refactor`
**Arquivos:** `src/components/feature/Header.tsx`
**Contexto:** Reorganização da estrutura de componentes seguindo padrão ui/feature
**Detalhes:**

- Movido de `src/components/Header.tsx` para `src/components/feature/Header.tsx`
- Import atualizado em `page.tsx` para usar exportação do barrel file
- Nenhuma mudança funcional

**Notas para IAs futuras:**

- Importar via `import { Header } from '../components/feature'`

#### [2025-11-26] Migração para Next.js

**Tipo:** `refactor`
**Arquivos:** `src/components/Header.tsx`
**Contexto:** Migração do projeto de Vite/Vanilla JS para Next.js 14
**Detalhes:**

- Convertido de JavaScript vanilla para React/TypeScript
- Adicionado `"use client"` para interatividade
- Implementado estados com `useState` para controle de menu e animações
- Integrado hook `useSmoothScroll` para navegação suave
- Mantidas todas as animações CSS originais

**Notas para IAs futuras:**

- O header tem animação de entrada que depende de timing específico
- Estados `isReady`, `isAnimated`, `isNavVisible` controlam a sequência de animação
- Menu mobile usa estado `isMobileMenuOpen`

---

### Footer

**Arquivo:** `src/components/feature/Footer.tsx`

**Estado Atual:**

- Componente Client (`"use client"`)
- Links para redes sociais
- Copyright e informações de contato
- Link para voltar ao topo

**Dependências:**

- `useSmoothScroll` hook
- RemixIcon (CDN)

**Histórico de Alterações:**

#### [2025-11-26] Reorganização para components/feature/

**Tipo:** `refactor`
**Arquivos:** `src/components/feature/Footer.tsx`
**Contexto:** Reorganização da estrutura de componentes seguindo padrão ui/feature
**Detalhes:**

- Movido de `src/components/Footer.tsx` para `src/components/feature/Footer.tsx`
- Import atualizado em `page.tsx` para usar exportação do barrel file
- Nenhuma mudança funcional

**Notas para IAs futuras:**

- Importar via `import { Footer } from '../components/feature'`

#### [2025-11-26] Migração para Next.js

**Tipo:** `refactor`
**Arquivos:** `src/components/Footer.tsx`
**Contexto:** Migração do projeto de Vite/Vanilla JS para Next.js 14
**Detalhes:**

- Convertido para componente React funcional com TypeScript
- Integrado hook `useSmoothScroll` para link de voltar ao topo
- Mantida estrutura visual e links sociais

**Notas para IAs futuras:**

- Links sociais são hardcoded no componente
- Ícones usam RemixIcon via CDN (carregado no layout)

---

## Seções

---

### Home

**Arquivo:** `src/components/sections/Home.tsx`

**Estado Atual:**

- Componente Client (`"use client"`)
- Seção hero com foto de perfil
- Informações pessoais e skills
- CTAs para download de currículo e contato

**Dependências:**

- `useScrollReveal` hook
- `useSmoothScroll` hook
- `next/image` para imagens
- Dados de `skills` em `src/data/index.ts`

**Histórico de Alterações:**

#### [2025-11-26] Migração para Next.js

**Tipo:** `refactor`
**Arquivos:** `src/components/sections/Home.tsx`
**Contexto:** Migração do projeto de Vite/Vanilla JS para Next.js 14
**Detalhes:**

- Convertido para componente React funcional com TypeScript
- Imagens migradas para `next/image` com otimização
- Skills movidos para `src/data/index.ts`
- Integrados hooks `useScrollReveal` e `useSmoothScroll`
- Adicionado `style={{ height: 'auto' }}` para manter aspect ratio das imagens

**Notas para IAs futuras:**

- A foto de perfil tem animação CSS circular
- Skills são renderizados dinamicamente do arquivo de dados
- O botão de download abre o currículo em nova aba

---

### Projects

**Arquivo:** `src/components/sections/Projects.tsx`

**Estado Atual:**

- Componente Client (`"use client"`)
- Grid de projetos usando `ProjectCard`
- Animações ScrollReveal nos cards

**Dependências:**

- `useScrollReveal` hook
- `ProjectCard` componente
- Dados de `projects` em `src/data/index.ts`

**Histórico de Alterações:**

#### [2025-11-26] Migração para Next.js

**Tipo:** `refactor`
**Arquivos:** `src/components/sections/Projects.tsx`
**Contexto:** Migração do projeto de Vite/Vanilla JS para Next.js 14
**Detalhes:**

- Convertido para componente React funcional
- Projetos movidos para arquivo de dados centralizado
- Cada projeto usa o componente `ProjectCard`

**Notas para IAs futuras:**

- Projetos são definidos em `src/data/index.ts`
- Para adicionar novo projeto, editar apenas o arquivo de dados
- A ordem no array define a ordem de exibição

---

### Services

**Arquivo:** `src/components/sections/Services.tsx`

**Estado Atual:**

- Componente Client (`"use client"`)
- Cards de serviços oferecidos
- Animações ScrollReveal

**Dependências:**

- `useScrollReveal` hook
- Dados de `services` em `src/data/index.ts`

**Histórico de Alterações:**

#### [2025-11-26] Migração para Next.js

**Tipo:** `refactor`
**Arquivos:** `src/components/sections/Services.tsx`
**Contexto:** Migração do projeto de Vite/Vanilla JS para Next.js 14
**Detalhes:**

- Convertido para componente React funcional
- Serviços movidos para arquivo de dados

**Notas para IAs futuras:**

- Ícones usam RemixIcon (classes `ri-*`)
- Cada serviço tem: name, icon, description

---

### Experience

**Arquivo:** `src/components/sections/Experience.tsx`

**Estado Atual:**

- Componente Client (`"use client"`)
- Timeline de experiências profissionais
- Animações ScrollReveal

**Dependências:**

- `useScrollReveal` hook
- Dados de `experiences` em `src/data/index.ts`

**Histórico de Alterações:**

#### [2025-11-26] Migração para Next.js

**Tipo:** `refactor`
**Arquivos:** `src/components/sections/Experience.tsx`
**Contexto:** Migração do projeto de Vite/Vanilla JS para Next.js 14
**Detalhes:**

- Convertido para componente React funcional
- Experiências movidas para arquivo de dados

**Notas para IAs futuras:**

- Timeline usa CSS customizado para linha conectora
- Experiências devem estar em ordem cronológica reversa (mais recente primeiro)

---

### Contact

**Arquivo:** `src/components/sections/Contact.tsx`

**Estado Atual:**

- Componente Client (`"use client"`)
- Formulário de contato com validação
- Integração com EmailJS
- Estados de loading, success, error

**Dependências:**

- `useScrollReveal` hook
- `usePhoneFormat` hook
- `emailjs-com` biblioteca

**Histórico de Alterações:**

#### [2025-11-26] Migração para Next.js

**Tipo:** `refactor`
**Arquivos:** `src/components/sections/Contact.tsx`
**Contexto:** Migração do projeto de Vite/Vanilla JS para Next.js 14
**Detalhes:**

- Convertido para componente React funcional com TypeScript
- Implementado estado de formulário com `useState`
- Integrado hook `usePhoneFormat` para formatação de telefone
- Variáveis de ambiente movidas para `NEXT_PUBLIC_*`

**Notas para IAs futuras:**

- Credenciais EmailJS em variáveis de ambiente
- Campo de telefone tem formatação automática BR
- Estados do formulário: 'idle', 'loading', 'success', 'error'
- Ver `docs/1_HOW_TO_GUIDES/2_configurar-emailjs.md` para configuração

---

## UI (Componentes Reutilizáveis)

---

### ProjectCard

**Arquivo:** `src/components/ui/ProjectCard.tsx`

**Estado Atual:**

- Componente Client (`"use client"`)
- Card com imagem estática e vídeo on hover/scroll
- Comportamento diferente para desktop (hover) e mobile (scroll)
- Usa hook `useVideoPlayer` para controle de vídeo
- Desbloqueio de autoplay para iOS (via hook)

**Dependências:**

- `next/image` para imagens
- `useVideoPlayer` hook
- Tipo `Project` de `src/types/index.ts`

**Histórico de Alterações:**

#### [2025-11-26] Refatoração: Extração de lógica para useVideoPlayer

**Tipo:** `refactor`
**Arquivos:** `src/components/ui/ProjectCard.tsx`, `src/hooks/useVideoPlayer.ts`
**Contexto:** Seguindo boas práticas, extraída lógica de vídeo para hook reutilizável
**Detalhes:**

- Criado hook `useVideoPlayer` em `src/hooks/useVideoPlayer.ts`
- Movida toda lógica de Intersection Observer e eventos de hover para o hook
- Movida lógica de desbloqueio de autoplay iOS para o hook
- Componente agora consome apenas `{ videoRef, previewRef, isVideoVisible }` do hook
- Código do componente reduzido de ~176 linhas para ~80 linhas
- Movido de `src/components/ProjectCard.tsx` para `src/components/ui/ProjectCard.tsx`

**Notas para IAs futuras:**

- Importar via `import { ProjectCard } from '../components/ui'`
- Lógica de vídeo está no hook `useVideoPlayer`
- Para modificar comportamento do vídeo, editar o hook, não o componente

#### [2025-11-26] Migração para Next.js

**Tipo:** `refactor`
**Arquivos:** `src/components/ProjectCard.tsx`
**Contexto:** Migração do projeto de Vite/Vanilla JS para Next.js 14
**Detalhes:**

- Convertido para componente React funcional com TypeScript
- Implementado Intersection Observer para mobile
- Adicionado desbloqueio de autoplay para iOS Safari
- Props tipadas com interface `Project`
- Imagens usando `next/image`

**Notas para IAs futuras:**

- **IMPORTANTE:** iOS Safari tem política restritiva de autoplay
- O desbloqueio de autoplay acontece no primeiro touch/click da página
- Desktop: vídeo inicia no hover
- Mobile: vídeo inicia quando 50% do card está visível
- Ver `docs/KNOWN_ISSUES.md` para detalhes sobre autoplay em iOS

---

### FloatingActionButton

**Arquivo:** `src/components/feature/FloatingActionButton.tsx`

**Estado Atual:**

- Componente Client (`"use client"`)
- FAB que expande para mostrar links sociais
- Animação staggered nos links
- Overlay de fundo quando aberto

**Dependências:**

- Nenhuma externa (auto-contido)

**Histórico de Alterações:**

#### [2025-11-26] Reorganização para components/feature/

**Tipo:** `refactor`
**Arquivos:** `src/components/feature/FloatingActionButton.tsx`
**Contexto:** Reorganização da estrutura de componentes seguindo padrão ui/feature
**Detalhes:**

- Movido de `src/components/FloatingActionButton.tsx` para `src/components/feature/FloatingActionButton.tsx`
- Import atualizado em `page.tsx` para usar exportação do barrel file
- Nenhuma mudança funcional

**Notas para IAs futuras:**

- Importar via `import { FloatingActionButton } from '../components/feature'`

#### [2025-11-26] Migração para Next.js

**Tipo:** `refactor`
**Arquivos:** `src/components/FloatingActionButton.tsx`
**Contexto:** Migração do projeto de Vite/Vanilla JS para Next.js 14
**Detalhes:**

- Convertido para componente React funcional com TypeScript
- Estados `isActive` e `animationComplete` para controle de UI
- Links sociais definidos internamente como array

**Notas para IAs futuras:**

- Links sociais estão hardcoded no componente
- Animação de entrada usa setTimeout para sequência
- Overlay fecha o FAB ao ser clicado

---

## Componentes WebGL

---

### WaveAnimation

**Arquivo:** `src/components/gl/index.tsx`

**Estado Atual:**

- Componente Client (`"use client"`)
- Animação WebGL de partículas com movimento ondulatório
- Renderização via Three.js e @react-three/fiber
- Efeito de reveal animado na inicialização
- Efeito de sparkle nas partículas
- Depth of Field (DOF) para efeito de profundidade

**Dependências:**

- `@react-three/fiber` - Canvas React para Three.js
- `@react-three/drei` - Helpers (useFBO)
- `three` - Three.js core
- Shaders GLSL em `src/components/gl/shaders/`

**Estrutura:**

```text
src/components/gl/
├── index.tsx              # Componente principal WaveAnimation
├── particles.tsx          # Lógica de partículas e animação
└── shaders/
    ├── utils.ts           # Funções GLSL compartilhadas
    ├── pointMaterial.ts   # Shader de renderização das partículas
    └── simulationMaterial.ts # Shader de simulação do movimento
```

**Props:**

| Prop        | Tipo      | Padrão  | Descrição                  |
| ----------- | --------- | ------- | -------------------------- |
| `hovering`  | `boolean` | `false` | Ativa efeito de introspect |
| `className` | `string`  | `''`    | Classes CSS adicionais     |

**Histórico de Alterações:**

#### [2025-11-27] Criação do componente

**Tipo:** `feat`
**Arquivos:** `src/components/gl/*`
**Contexto:** Implementação de animação de ondas como background do header

**Detalhes:**

- Portado de projeto externo (`reusable-components/wave-animation`)
- Removidos controles Leva (valores fixos para produção)
- Configurações otimizadas para performance
- Integrado com CSS do header para transições

**Notas para IAs futuras:**

- Para alterar cor das partículas: editar `pointMaterial.ts` (fragmentShader)
- Para alterar intensidade/velocidade: editar config em `index.tsx`
- Requer configuração webpack em `next.config.mjs` para Three.js
- Canvas usa `dpr={[1, 1.5]}` para balancear qualidade/performance

---

## Hooks

---

### usePageLoading

**Arquivo:** `src/hooks/usePageLoading.ts`

**Estado Atual:**

- Hook Client (`"use client"`)
- Detecta quando a página carregou completamente
- Verifica imagens, vídeos e fontes
- Dispara evento `page-ready` quando pronto
- Tempo mínimo de loading configurável
- Timeout máximo como fallback

**Dependências:**

- Nenhuma externa

**Parâmetros:**

| Opção            | Tipo     | Padrão | Descrição                    |
| ---------------- | -------- | ------ | ---------------------------- |
| `minLoadingTime` | `number` | `2000` | Tempo mínimo de loading (ms) |
| `maxLoadingTime` | `number` | `8000` | Timeout máximo (ms)          |

**Retorno:**

```typescript
{
  isLoading: boolean // Se ainda está carregando
  loadingProgress: number // Progresso de 0-100
}
```

**Histórico de Alterações:**

#### [2025-11-27] Criação do hook

**Tipo:** `feat`
**Arquivos:** `src/hooks/usePageLoading.ts`
**Contexto:** Gerenciar loading screen com wave animation

**Detalhes:**

- Verifica `img.complete` para imagens
- Verifica `video.readyState >= 2` para vídeos
- Adiciona/remove classes `page-loading`/`page-ready` no body
- Dispara evento customizado `page-ready`
- Intervalo de verificação: 100ms

**Notas para IAs futuras:**

- O Header.tsx escuta o evento `page-ready` para iniciar transição
- `minLoadingTime` garante que a animação seja vista
- `maxLoadingTime` evita travamento se algo falhar
- Usado em `page.tsx` para controlar loading global

---

### useScrollReveal

**Arquivo:** `src/hooks/useScrollReveal.ts`

**Estado Atual:**

- Hook de efeito colateral (void return)
- Inicializa ScrollReveal para elementos específicos
- **Sincronizado com animação do header** (delay de 2000ms após page-ready)
- SSR-safe com verificação de `window`
- Cleanup implementado

**Dependências:**

- `scrollreveal` biblioteca (import dinâmico)

**Histórico de Alterações:**

#### [2025-11-27] Sincronização com animação do header

**Tipo:** `fix`
**Arquivos:** `src/hooks/useScrollReveal.ts`
**Contexto:** ScrollReveal estava iniciando antes da animação do header terminar

**Detalhes:**

- Adicionado listener para evento `page-ready`
- Adicionado delay de 2000ms após page-ready antes de inicializar ScrollReveal
- Isso faz o ScrollReveal iniciar ~500ms ANTES do header terminar de animar
- Resultado: animações do conteúdo começam exatamente quando o header se recolhe

**Timeline sincronizado:**

- 0ms: page-ready dispara
- 1500ms: header começa a animar
- 2000ms: **ScrollReveal inicia** (500ms antes do header terminar)
- 2500ms: header termina de animar
- 2400ms+: animações do ScrollReveal aparecem

**Notas para IAs futuras:**

- Constante `SCROLL_REVEAL_DELAY = 2000` controla o timing
- Ajustar se os timers do header mudarem
- ScrollReveal não tem tipos oficiais TypeScript
- Tipos são definidos inline no hook

#### [2025-11-26] Criação do hook

**Tipo:** `feat`
**Arquivos:** `src/hooks/useScrollReveal.ts`
**Contexto:** Encapsular lógica de ScrollReveal em hook reutilizável
**Detalhes:**

- Import dinâmico para evitar erros SSR
- Tipagem customizada para ScrollReveal (biblioteca sem tipos)
- Configurações padrão: origin 'top', distance '60px', duration 2500ms
- Elementos animados: `.perfil`, `.info`, `.skills`, `.about`, `.contact__form`, cards

**Notas para IAs futuras:**

- Em Strict Mode do React, pode executar 2x em dev (normal)
- Ver `docs/KNOWN_ISSUES.md` para comportamento em Strict Mode

---

### useSmoothScroll

**Arquivo:** `src/hooks/useSmoothScroll.ts`

**Estado Atual:**

- Hook que retorna `handleLinkClick`
- Função utilitária `smoothScrollTo` exportada separadamente
- Offset padrão de 100px do topo

**Dependências:**

- Nenhuma externa

**Histórico de Alterações:**

#### [2025-11-26] Criação do hook

**Tipo:** `feat`
**Arquivos:** `src/hooks/useSmoothScroll.ts`
**Contexto:** Abstrair lógica de scroll suave para reutilização
**Detalhes:**

- `smoothScrollTo(targetId, offset)` - função utilitária
- `useSmoothScroll()` - hook que retorna handler para onClick
- Offset padrão considera espaço para o header

**Notas para IAs futuras:**

- O offset de 100px foi calibrado para o header atual
- Se o header mudar de altura, pode ser necessário ajustar
- A função `smoothScrollTo` pode ser usada fora de componentes React

---

### usePhoneFormat

**Arquivo:** `src/hooks/usePhoneFormat.ts`

**Estado Atual:**

- Hook com estado interno para valor formatado
- Formatação automática para telefone brasileiro
- Bloqueia entrada de não-números
- Limite de 11 dígitos

**Dependências:**

- Nenhuma externa

**Histórico de Alterações:**

#### [2025-11-26] Criação do hook

**Tipo:** `feat`
**Arquivos:** `src/hooks/usePhoneFormat.ts`
**Contexto:** Abstrair formatação de telefone para formulário de contato
**Detalhes:**

- Formato: `(XX) X XXXX-XXXX`
- Função `formatPhoneNumber` exportada para uso standalone
- `handleKeyPress` previne entrada de caracteres não numéricos

**Notas para IAs futuras:**

- Formato específico para telefones brasileiros
- Se precisar de outros formatos, considerar biblioteca internacional
- O hook gerencia seu próprio estado, ideal para forms controlados

---

### useVideoPlayer

**Arquivo:** `src/hooks/useVideoPlayer.ts`

**Estado Atual:**

- Hook Client (`"use client"`)
- Controla reprodução de vídeo com comportamento adaptativo
- Desktop: vídeo inicia no hover
- Mobile: vídeo inicia quando 50% visível (Intersection Observer)
- Inclui desbloqueio de autoplay para iOS Safari

**Dependências:**

- `isMobile` util de `src/utils/isMobile.ts`

**Retorno:**

```typescript
{
  videoRef: RefObject<HTMLVideoElement> // Ref para o elemento video
  previewRef: RefObject<HTMLAnchorElement> // Ref para o container do preview
  isVideoVisible: boolean // Estado de visibilidade do vídeo
  mobile: boolean // Se é dispositivo móvel
}
```

**Histórico de Alterações:**

#### [2025-11-26] Criação do hook

**Tipo:** `feat`
**Arquivos:** `src/hooks/useVideoPlayer.ts`
**Contexto:** Extração de lógica do ProjectCard para hook reutilizável
**Detalhes:**

- Criado para encapsular lógica complexa de reprodução de vídeo
- Implementa Intersection Observer para mobile (threshold 0.5)
- Implementa eventos mouseenter/mouseleave para desktop
- Inclui desbloqueio de autoplay iOS via touchstart/click
- Cleanup adequado de observers e event listeners

**Notas para IAs futuras:**

- Este hook é específico para vídeos em cards com preview
- Para outros casos de vídeo, considere criar hooks específicos
- O threshold de 0.5 significa que o vídeo inicia quando 50% está visível
- O desbloqueio de iOS precisa de interação do usuário (touch/click)

---

## Utilitários

---

### isMobile

**Arquivo:** `src/utils/isMobile.ts`

**Estado Atual:**

- Função utilitária que detecta dispositivo móvel
- Baseado em User Agent
- SSR-safe

**Dependências:**

- Nenhuma

**Histórico de Alterações:**

#### [2025-11-26] Criação do utilitário

**Tipo:** `feat`
**Arquivos:** `src/utils/isMobile.ts`
**Contexto:** Detectar dispositivo para comportamentos diferentes em ProjectCard
**Detalhes:**

- Verifica `navigator.userAgent` para padrões mobile
- Retorna `false` se `window` não existe (SSR)
- Usado para decidir entre hover (desktop) e scroll (mobile)

**Notas para IAs futuras:**

- Detecção por User Agent não é 100% confiável
- Para casos críticos, considerar media queries ou touch events
- Atualmente usado apenas em `ProjectCard`

---

## Dados

---

### data/index.ts

**Arquivo:** `src/data/index.ts`

**Estado Atual:**

- Arrays de dados estáticos
- `projects`: Projetos do portfólio
- `services`: Serviços oferecidos
- `experiences`: Experiências profissionais
- `skills`: Habilidades técnicas

**Dependências:**

- Tipos de `src/types/index.ts`

**Histórico de Alterações:**

#### [2025-11-26] Criação do arquivo de dados

**Tipo:** `feat`
**Arquivos:** `src/data/index.ts`
**Contexto:** Centralizar dados estáticos do portfólio
**Detalhes:**

- Migrados dados que estavam inline nos componentes
- Tipagem com interfaces de `src/types/index.ts`
- Facilita manutenção e adição de novos itens

**Notas para IAs futuras:**

- Para adicionar projeto: adicionar objeto ao array `projects`
- Para adicionar serviço: adicionar objeto ao array `services`
- Manter consistência com tipos definidos
- Imagens devem existir em `/public/assets/`

---

## Tipos

---

### types/index.ts

**Arquivo:** `src/types/index.ts`

**Estado Atual:**

- Interfaces TypeScript para dados do projeto
- `Project`, `Service`, `Experience`, `Skill`

**Dependências:**

- Nenhuma

**Histórico de Alterações:**

#### [2025-11-26] Criação dos tipos

**Tipo:** `feat`
**Arquivos:** `src/types/index.ts`
**Contexto:** Definir contratos de tipos para dados do projeto
**Detalhes:**

- `Project`: name, description, image, video?, url, skills
- `Service`: name, icon, description
- `Experience`: company, profession, date, description
- `Skill`: name, icon

**Notas para IAs futuras:**

- Manter tipos sincronizados com dados em `src/data/index.ts`
- Campos opcionais marcados com `?`
- Usar estas interfaces em props de componentes

---

## Configuração

---

### next.config.mjs

**Arquivo:** `next.config.mjs`

**Estado Atual:**

- Configuração do Next.js 16
- Headers de segurança e performance
- Cache agressivo para assets estáticos
- Cache revalidável para páginas HTML
- Configuração webpack para Three.js

**Histórico de Alterações:**

#### [2025-12-XX] Headers de cache para páginas HTML

**Tipo:** `fix`
**Arquivos:** `next.config.mjs`
**Contexto:** Resolver problemas de cache após transferência de domínio (Hostinger → Vercel)
**Detalhes:**

- Adicionado header `Cache-Control: public, max-age=0, must-revalidate` para todas as rotas (`/:path*`)
- Adicionado header específico para página inicial (`/`)
- Páginas HTML agora podem ser revalidadas imediatamente, enquanto assets estáticos mantêm cache longo
- Isso ajuda a resolver problemas onde usuários veem versão antiga após mudanças de DNS

**Notas para IAs futuras:**

- Assets estáticos (`/assets/:path*`, `/_next/static/:path*`) mantêm cache de 1 ano (imutáveis)
- Páginas HTML (`/:path*`) têm cache de 0 segundos com `must-revalidate` (sempre verificam servidor)
- Se precisar invalidar cache de assets, considere versionamento ou query strings
- Para problemas de cache DNS, ver `docs/1_HOW_TO_GUIDES/3_troubleshooting.md`

---

### layout.tsx

**Arquivo:** `src/app/layout.tsx`

**Estado Atual:**

- Layout raiz do Next.js
- Metadata para SEO
- Carregamento de fontes (Poppins, Alegreya Sans SC)
- Link para RemixIcon CDN

**Dependências:**

- `next/font/google`

**Histórico de Alterações:**

#### [2025-11-26] Criação do layout

**Tipo:** `feat`
**Arquivos:** `src/app/layout.tsx`
**Contexto:** Configurar layout raiz com metadados e fontes
**Detalhes:**

- Fontes carregadas via `next/font` para otimização
- Metadata inclui Open Graph e Twitter Cards
- RemixIcon via CDN (link externo)

**Notas para IAs futuras:**

- Fontes usam variáveis CSS (`--font-poppins`, `--font-alegreya`)
- Metadata é estática (não dinâmica)
- RemixIcon pode ser internalizado futuramente para melhor performance

---

### page.tsx

**Arquivo:** `src/app/page.tsx`

**Estado Atual:**

- Página principal do portfólio
- Client Component (`"use client"`)
- Composição de Header, Sections, Footer e FAB
- Imports organizados via barrel files

**Dependências:**

- `src/components/feature` (Header, Footer, FloatingActionButton)
- `src/components/sections` (Home, Projects, Services, Experience, Contact)

**Histórico de Alterações:**

#### [2025-11-26] Atualização de imports para nova estrutura

**Tipo:** `refactor`
**Arquivos:** `src/app/page.tsx`
**Contexto:** Atualização para usar nova estrutura de componentes ui/feature
**Detalhes:**

- Imports atualizados para usar barrel files
- `import { Header, Footer, FloatingActionButton } from '../components/feature'`
- Imports de seções mantidos como estavam
- Nenhuma mudança funcional

**Notas para IAs futuras:**

- Usar importações via barrel files quando disponíveis
- Feature components: `../components/feature`
- UI components: `../components/ui`

#### [2025-11-26] Criação da página

**Tipo:** `feat`
**Arquivos:** `src/app/page.tsx`
**Contexto:** Página principal que compõe todas as seções
**Detalhes:**

- Estrutura: Header → main (seções) → Footer → FAB
- Seções: Home, Projects, Services, Experience, Contact

**Notas para IAs futuras:**

- Ordem das seções importa para navegação
- IDs das seções são usados para scroll suave
- FAB fica fora do main para posicionamento fixo

---

### globals.css

**Arquivo:** `src/app/globals.css`

**Estado Atual:**

- Estilos globais do projeto
- Variáveis CSS customizadas
- Classes BEM para componentes
- Media queries responsivas
- Animações CSS

**Dependências:**

- Nenhuma

**Histórico de Alterações:**

#### [2025-11-27] Remocao de transicoes da logo apos animacao

**Tipo:** `fix`
**Arquivos:** `src/app/globals.css`
**Contexto:** As transicoes da logo ficavam ativas durante o resize por dependerem de calculos com `vw`.
**Detalhes:**

- Transicao da logo restrita a propriedades relevantes e classe `header-stable` para desligar o efeito apos a animacao
- Logo e imagem nao animam em resizes; a animacao inicial de entrada permanece intacta

**Notas para IAs futuras:**

- Se ajustar tempos no Header, mantenha coerencia com a remocao de transicoes nessa classe auxiliar

#### [2025-11-27] Header/nav alinhados às margens do conteúdo

**Tipo:** `style`
**Arquivos:** `src/app/globals.css`
**Contexto:** Garantir que logo e navegação compartilhem as mesmas margens do conteúdo principal (container de 1168px)
**Detalhes:**

- Criadas variáveis `--layout-max-width`, `--layout-inline-padding` e
  `--layout-inline-start` para reutilizar as margens do container
- `.container` agora consome as novas variáveis, garantindo consistência global
- Logo e navegação (desktop) usam as novas variáveis e um ajuste fino
  (`--header-align-offset`) para iniciar/terminar exatamente nas mesmas
  linhas-guia do conteúdo, tanto na margem esquerda quanto na direita
  (`--header-align-end`)
- Navegação permanece absoluta (para não quebrar animações) mas ocupa toda a
  largura útil, com itens alinhados à borda direita do container virtual
- Breakpoint mobile restaurado para o comportamento anterior (logo deslocada à
  esquerda para manter coerência com o layout compacto)

**Notas para IAs futuras:**

- Prefira ajustar offsets com `--layout-inline-start` ao invés de mexer em
  `position`
- Para novos componentes que precisem seguir o mesmo alinhamento, reutilize as
  variáveis globais ou ajuste `--header-align-offset` caso o design mude

#### [2025-11-26] Migração de estilos

**Tipo:** `refactor`
**Arquivos:** `src/app/globals.css`
**Contexto:** Migrar estilos do projeto Vite para Next.js
**Detalhes:**

- Mantidos todos os estilos originais
- Variáveis CSS em `:root`
- Cor principal: hue 358 (vermelho)
- Breakpoints: 320px, 540px, 768px, 1200px, 1500px

**Notas para IAs futuras:**

- **CUIDADO:** Este arquivo tem ~1500 linhas
- Não remover classes sem entender impacto
- Variáveis CSS são a fonte de verdade para cores
- Tailwind usa prefixo `tw-` para evitar conflitos
- Ver `docs/2_REFERENCE/5_design-system.md` para detalhes

---

## 📊 Estatísticas

| Categoria           | Quantidade | Última Atualização |
| ------------------- | ---------- | ------------------ |
| Componentes Feature | 3          | 2025-11-27         |
| Componentes UI      | 1          | 2025-11-26         |
| Componentes WebGL   | 1          | 2025-11-27         |
| Seções              | 5          | 2025-11-26         |
| Hooks               | 5          | 2025-11-27         |
| Utilitários         | 1          | 2025-11-26         |
| Tipos               | 4          | 2025-11-26         |

---

## 📝 Notas Gerais para IAs

1. **Padrão de nomenclatura:** BEM para CSS, camelCase para JS/TS
2. **Componentes Client:** Usar `"use client"` apenas quando necessário
3. **Imagens:** Sempre usar `next/image` com dimensões explícitas
4. **Dados:** Centralizar em `src/data/index.ts`, nunca inline
5. **Tipos:** Definir em `src/types/index.ts`, usar em props
6. **CSS:** Preferir classes existentes, Tailwind com prefixo `tw-`
7. **Hooks:** Implementar cleanup em useEffect, verificar SSR

---

**Última atualização:** 27 de Novembro de 2025

### [2025-12-XX] Atualização do guia de troubleshooting - Cache DNS e IPv6

**Tipo:** `docs`
**Arquivos:** `docs/1_HOW_TO_GUIDES/3_troubleshooting.md`
**Contexto:** Resolver problema de cache DNS após transferência de domínio (Hostinger → Vercel)
**Detalhes:**

- Adicionada seção completa sobre problemas de cache DNS após transferência de domínio
- Instruções detalhadas para limpar cache DNS em Windows, macOS e Linux
- Guia para interpretar resultados do `nslookup` e identificar problemas
- Instruções passo a passo para usar DNS públicos (Google, Cloudflare)
- Solução para problema comum: Windows usando DNS IPv6 do provedor
- Instruções para desabilitar IPv6 temporariamente ou configurar DNS IPv6
- Checklist completo para diagnóstico de problemas de propagação DNS

**Notas para IAs futuras:**

- Problema comum: Windows pode usar DNS IPv6 do provedor mesmo com DNS IPv4 configurado
- Solução: Desabilitar IPv6 temporariamente ou configurar DNS IPv6 também
- DNS público (Cloudflare `1.1.1.1`) é mais confiável que DNS do provedor para resolver problemas de cache
- Sempre verificar com `nslookup -type=A dominio.com 1.1.1.1` para testar DNS IPv4 especificamente
