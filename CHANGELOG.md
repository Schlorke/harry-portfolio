# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added

- ✨ **Wave Animation Background** - Substituição do background estático por animação WebGL de partículas
  - Novo componente `WaveAnimation` em `src/components/gl/`
  - Animação de ondas com partículas brancas usando Three.js e @react-three/fiber
  - Efeito de reveal animado na inicialização
  - Transição suave para header após loading completo
- 🔄 **Sistema de Loading Screen** - Tela de loading que aguarda carregamento completo
  - Novo hook `usePageLoading` para detectar quando recursos estão carregados
  - Tempo mínimo de loading para garantir visualização da animação
  - Fallback com timeout máximo para evitar travamentos
- 📦 Novas dependências: `@react-three/fiber`, `@react-three/drei`, `three`, `leva`

### Changed

- 🔄 **Header.tsx** - Background substituído de imagem estática para animação WebGL
- ⚙️ **next.config.mjs** - Adicionada configuração webpack para Three.js
- 🎨 **globals.css** - Novos estilos para `.header-background` e `.wave-animation`
- 🎯 **globals.css** - Header reduzido com logo e navegação alinhados
  simetricamente às margens do conteúdo central usando variáveis reutilizáveis
  e ajuste fino responsivo
- 📱 **globals.css** - Breakpoint mobile restaurado para manter a posição original da logo durante a animação
- 📝 **layout.tsx** - Removido preload do Background.png (não mais necessário)
- 🔧 **page.tsx** - Integração com hook `usePageLoading`
- ⏱️ **useScrollReveal** - Sincronizado com animação do header (delay de 2000ms após page-ready)
- 🔄 **Reorganização de componentes:** Nova estrutura `components/ui/` e `components/feature/`
  - `ProjectCard` movido para `components/ui/`
  - `Header`, `Footer`, `FloatingActionButton` movidos para `components/feature/`
- ♻️ **Refatoração do ProjectCard:** Lógica de vídeo extraída para hook `useVideoPlayer`
  - Código do componente reduzido de ~176 para ~80 linhas
  - Melhor separação de responsabilidades
- 📦 Imports atualizados em `page.tsx` e `Projects.tsx` para usar barrel files

### Fixed

- 🐛 **Tela preta inicial** - CSS de loading agora só oculta `.main`, `footer` e FAB (header/wave sempre visíveis)
- 🐛 **ScrollReveal timing** - Animações agora iniciam sincronizadas com fim da animação do header

### Technical

- Configuração webpack para polyfills (fs, path, crypto, etc.)
- Shaders GLSL para simulação de partículas e efeitos visuais
- Sistema de FBO (Frame Buffer Object) para renderização eficiente

---

- 📚 Estrutura de documentação completa baseada no Framework Diátaxis
- 🤖 Arquivo `AGENTS.md` com instruções para agentes de IA
- 📖 Documentação de referência (arquitetura, componentes, hooks, design system)
- 📝 Tutoriais de setup e criação de componentes
- 🔧 Guias how-to para deploy e troubleshooting
- 🧠 **Protocolo de Leitura Obrigatória (PRO)** para IAs no `AGENTS.md`
- 📝 **Protocolo de Registro de Alterações (PRA)** para IAs no `AGENTS.md`
- 🔄 **Fluxo de Trabalho Obrigatório** para IAs com 6 fases definidas
- 📋 Arquivo `docs/AI_CHANGELOG.md` - registro de alterações por componente para contexto de IAs
- 📝 Regra para atualizar `README.md` quando houver mudanças na estrutura do projeto
- 🤖 Arquivo `.cursor/rules/harry-portfolio.mdc` - regras e contexto para IAs do Cursor IDE
- ✨ Hook `useVideoPlayer` - encapsula lógica de reprodução de vídeo com suporte a desktop (hover) e mobile (scroll)

### Planned

- Service Worker para funcionalidade offline
- Toggle de tema Dark/Light
- Suporte multi-idioma (EN/PT-BR)
- Seção de blog integrada
- Animações avançadas com GSAP

---

## [1.1.0] - 2025-11-26

### Added

- ✨ Migração completa para **Next.js 14** com App Router
- 🔷 Adoção de **TypeScript** com tipagem estrita
- 📱 Componentes React funcionais com hooks customizados
- 🖼️ Otimização de imagens com `next/image`
- 🔤 Otimização de fontes com `next/font`
- 🎨 Integração do Tailwind CSS com prefixo `tw-`
- 🔒 Headers de segurança configurados

### Changed

- 🏗️ Estrutura de projeto reorganizada para App Router
- 📦 Migração de Vite para Next.js build system
- 🎯 CSS refatorado com variáveis CSS modernas
- ⚡ Melhoria significativa em performance e SEO

### Technical Implementation

- **Framework**: Next.js 14.2.15 (App Router)
- **UI Library**: React 18.2.0 com TypeScript 5.3.3
- **Styling**: CSS customizado + Tailwind CSS 3.4.1
- **Build**: SWC Minifier para otimização
- **Images**: AVIF/WebP com lazy loading automático

---

## [1.0.0] - 2024-12-19

### Added

- ✨ Lançamento inicial do portfólio com design moderno
- 📱 Layout totalmente responsivo para todos os dispositivos
- 🎨 Animações ScrollReveal para experiência suave
- 📧 Formulário de contato funcional com integração EmailJS
- 🚀 Configuração PWA com web manifest
- ⚡ Sistema de build Vite para performance otimizada
- 🎯 Otimização SEO com metadados estruturados
- ♿ Melhorias de acessibilidade seguindo WCAG
- 🔧 Ferramentas de desenvolvimento com ESLint e Prettier
- 📊 Documentação abrangente do projeto

### Technical Implementation

- **Frontend**: Vanilla JavaScript ES6+, HTML5, CSS3
- **Build Tool**: Vite 7.1.3 para builds de desenvolvimento e produção
- **Performance**: Lazy loading, otimização de imagens, minificação CSS
- **Browser Compatibility**: Suporte cross-browser para navegadores modernos
- **Code Quality**: Configuração ESLint com correção automática
- **Formatting**: Integração Prettier para estilo de código consistente
- **Spell Check**: CSpell para validação de conteúdo multilíngue

### Project Structure

- 🏗️ Arquitetura CSS modular com propriedades customizadas
- 📁 Gerenciamento organizado de assets (imagens, vídeos, documentos)
- 🔄 Pipeline de deploy automatizado para GitHub Pages
- 📝 Documentação seguindo padrões da indústria

### Features

- **Hero Section**: Introdução profissional com elementos animados
- **About Section**: Background pessoal e jornada profissional
- **Projects Showcase**: Galeria interativa com previews em vídeo
  - DI PRIMIO ADVOCACIA - Site de serviços jurídicos
  - HENRY VENTURA - Plataforma de campanha política
  - EASY RENT - Plataforma de locação de veículos
  - MON APART - Sistema de reserva de apartamentos
  - DASHBOARD CRM - Gerenciamento de relacionamento com clientes
  - GB LOCAÇÕES - Locação de equipamentos de construção
  - DASHBOARD EXECUTIVO - Métricas e relatórios em tempo real
- **Services Section**: Ofertas de serviços detalhadas
- **Experience Timeline**: Visualização de background profissional
- **Contact Form**: Funcionalidade de email integrada
- **Social Links**: Conexões de rede profissional

### Performance Optimizations

- 🖼️ Formato de imagem WebP para carregamento rápido
- 📹 Assets de vídeo otimizados com compressão adequada
- 🎯 CSS crítico inline para LCP melhorado
- 🔄 Bundling e splitting eficiente de JavaScript
- 💾 Estratégias de cache de assets

### Browser Compatibility

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+
- ⚠️ Degradação graciosa para navegadores antigos

### Security

- 🔒 Implementação de Content Security Policy
- 🛡️ Headers de proteção XSS
- 🔐 Carregamento seguro de recursos externos

---

## [0.9.0] - 2024-12-18

### Added - Core Implementation

- 🎨 Implementação do sistema de design principal
- 📱 Fundação responsiva mobile-first
- 🏗️ Setup básico da estrutura do projeto
- 📄 Estrutura semântica HTML inicial

### Changed

- 🔧 Migração de Create React App para Vite
- 📦 Configuração de build atualizada para melhor performance

---

## [0.8.0] - 2024-12-17

### Added - Project Foundation

- 🎯 Concepção e planejamento do projeto
- 📋 Levantamento e análise de requisitos
- 🎨 Mockups de design e wireframes
- 🔧 Setup do ambiente de desenvolvimento

### Technical Decisions

- **Build Tool**: Vite escolhido para experiência de desenvolvimento mais rápida
- **Styling**: CSS3 com propriedades customizadas para manutenibilidade
- **JavaScript**: Vanilla JS para implementação leve
- **Animations**: ScrollReveal para animações de scroll performáticas
- **Email Service**: EmailJS para funcionalidade de email client-side

---

## Esquema de Versão

Este projeto segue [Semantic Versioning](https://semver.org/lang/pt-BR/):

- **MAJOR**: Mudanças incompatíveis com versões anteriores
- **MINOR**: Novas funcionalidades compatíveis com versões anteriores
- **PATCH**: Correções de bugs compatíveis com versões anteriores

## Tipos de Mudanças

- **Added**: Novas funcionalidades
- **Changed**: Mudanças em funcionalidades existentes
- **Deprecated**: Funcionalidades que serão removidas em breve
- **Removed**: Funcionalidades removidas
- **Fixed**: Correções de bugs
- **Security**: Correções de vulnerabilidades

---

## Links

- [Homepage](https://schlorke.github.io/harry-portfolio/)
- [Repository](https://github.com/Schlorke/harry-portfolio)
- [Issues](https://github.com/Schlorke/harry-portfolio/issues)
- [Releases](https://github.com/Schlorke/harry-portfolio/releases)
