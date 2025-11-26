# Roadmap do Projeto

Este documento delineia a visão de futuro do projeto Harry Portfolio, incluindo funcionalidades planejadas,
melhorias de arquitetura e gerenciamento de débito técnico.

---

## 🎯 Visão Geral

O objetivo é evoluir o portfólio para uma plataforma mais robusta e feature-rich, mantendo o foco em performance,
acessibilidade e experiência do usuário.

---

## 📅 Próximas Releases

### v2.0.0 - "Enhanced Experience" (Q1 2026)

#### Novas Funcionalidades

- [ ] **🌙 Dark/Light Theme Toggle**
  - Implementar toggle de tema com persistência em localStorage
  - Usar CSS custom properties para transições suaves
  - Respeitar preferência do sistema (`prefers-color-scheme`)

- [ ] **🌐 Internacionalização (i18n)**
  - Suporte para Português (BR) e Inglês (US)
  - Usar `next-intl` ou solução similar
  - Seletor de idioma no header

- [ ] **📝 Blog Section**
  - Sistema de blog com MDX
  - Categorias e tags
  - Syntax highlighting para código
  - SEO otimizado para artigos

- [ ] **🔄 Service Worker**
  - Funcionalidade offline completa
  - Cache de assets estáticos
  - Background sync para formulário de contato

#### Melhorias Técnicas

- [ ] Migração para React 19 (quando estável)
- [ ] Implementar testes E2E com Playwright
- [ ] Adicionar analytics com Plausible ou similar (privacy-first)

---

### v2.1.0 - "Animations Plus" (Q2 2026)

#### Novas Funcionalidades

- [ ] **🎬 Animações Avançadas com GSAP**
  - Substituir/complementar ScrollReveal
  - Animações de entrada mais sofisticadas
  - Micro-interações em botões e cards

- [ ] **📊 Dashboard de Métricas**
  - Visualização de projetos mais acessados
  - Contador de visitas (privacy-compliant)
  - Heatmap de interações (opcional)

- [ ] **💬 Sistema de Comentários**
  - Integração com Giscus (GitHub Discussions)
  - Comentários em posts do blog
  - Moderação automática

---

## 🔧 Débito Técnico

### Prioridade Alta

- [ ] **Adicionar Testes Unitários**
  - Configurar Jest/Vitest
  - Cobertura mínima de 80% para hooks
  - Testes de snapshot para componentes

- [ ] **Refatorar CSS Global**
  - Modularizar `globals.css` em arquivos menores
  - Documentar todas as variáveis CSS
  - Criar sistema de tokens de design

- [ ] **Melhorar Tipagem TypeScript**
  - Remover qualquer uso de `any` implícito
  - Adicionar tipos para eventos customizados
  - Documentar interfaces com JSDoc

### Prioridade Média

- [ ] **Implementar Error Boundaries**
  - Criar componente de fallback para erros
  - Logging de erros para monitoramento
  - Página de erro customizada

- [ ] **Otimizar Bundle Size**
  - Analisar com `@next/bundle-analyzer`
  - Lazy loading de componentes pesados
  - Tree shaking de dependências

- [ ] **Melhorar Acessibilidade**
  - Auditoria completa com axe-core
  - Skip links para navegação por teclado
  - Melhorar contraste em alguns elementos

### Prioridade Baixa

- [ ] **Adicionar Storybook**
  - Documentação visual de componentes
  - Playground interativo
  - Testes visuais automatizados

- [ ] **Configurar CI/CD Completo**
  - GitHub Actions para build/test
  - Preview deployments para PRs
  - Lighthouse CI para performance

---

## 💡 Ideias Futuras (Backlog)

Estas são ideias que podem ser exploradas no futuro, mas ainda não estão priorizadas:

### Funcionalidades

- **Modo de Apresentação:** Versão simplificada para apresentações em reuniões
- **Exportar Currículo em PDF:** Gerar currículo dinamicamente com dados do portfólio
- **Integração com LinkedIn:** Sincronizar experiências automaticamente
- **Testimonials Section:** Seção de depoimentos de clientes
- **Case Studies:** Páginas detalhadas para cada projeto

### Técnicas

- **Edge Runtime:** Migrar para Edge Functions onde aplicável
- **Streaming SSR:** Implementar Suspense boundaries
- **Image CDN:** Usar Cloudinary ou similar para otimização de imagens
- **WebGL Background:** Efeitos visuais avançados no hero

---

## 📊 Métricas de Sucesso

### Performance (Core Web Vitals)

| Métrica | Atual   | Meta v2.0 |
| ------- | ------- | --------- |
| LCP     | < 2.5s  | < 1.5s    |
| FID     | < 100ms | < 50ms    |
| CLS     | < 0.1   | < 0.05    |
| INP     | < 200ms | < 100ms   |

### Cobertura de Testes

| Tipo       | Atual | Meta v2.0 |
| ---------- | ----- | --------- |
| Unitários  | 0%    | 80%       |
| Integração | 0%    | 50%       |
| E2E        | 0%    | 30%       |

### Acessibilidade

| Métrica         | Atual | Meta v2.0 |
| --------------- | ----- | --------- |
| Lighthouse A11y | ~90   | 100       |
| WCAG Level      | AA    | AAA       |

---

## 🗓️ Histórico de Releases

| Versão | Data       | Descrição                         |
| ------ | ---------- | --------------------------------- |
| 1.0.0  | 2024-12-19 | Release inicial (Vite/Vanilla JS) |
| 1.1.0  | 2025-11-26 | Migração para Next.js 14          |

---

## 📝 Como Contribuir

1. Escolha um item do roadmap ou débito técnico
2. Crie uma issue no GitHub com a tag `enhancement` ou `tech-debt`
3. Discuta a abordagem antes de implementar
4. Siga o guia em [CONTRIBUTING.md](../CONTRIBUTING.md)

---

**Última atualização:** 26 de Novembro de 2025
