# Explicação: Princípios de Design

Este documento explica os princípios de design visual e UX que guiam o desenvolvimento do Harry Portfolio.

---

## 🎯 Filosofia Central

O design do portfólio é guiado por três princípios fundamentais:

1. **Clareza:** Informação facilmente acessível e hierarquizada
2. **Elegância:** Estética sofisticada sem excessos
3. **Impacto:** Primeira impressão memorável e profissional

---

## 🎨 Identidade Visual

### Cor Principal: Vermelho

A escolha do vermelho (#E51E24) como cor principal foi intencional:

| Associação         | Aplicação                                    |
| ------------------ | -------------------------------------------- |
| **Energia**        | Transmite dinamismo e proatividade           |
| **Paixão**         | Reflete dedicação ao trabalho                |
| **Atenção**        | Destaca elementos importantes                |
| **Memorabilidade** | Diferencia de portfólios típicos (azul/roxo) |

### Tema Escuro

O tema escuro foi escolhido por:

1. **Conforto Visual:** Reduz fadiga em longas sessões
2. **Destaque de Conteúdo:** Imagens e vídeos se destacam mais
3. **Sofisticação:** Transmite profissionalismo técnico
4. **Tendência:** Alinhado com preferências atuais de UI

### Contraste

Mantemos um contraste mínimo de **4.5:1** para acessibilidade:

```css
/* Texto principal sobre fundo escuro */
--white-color: hsl(0, 0%, 98%); /* #FAFAFA */
--body-color: hsl(358, 100%, 1%); /* #050000 */
/* Contraste: ~18:1 ✅ */

/* Texto secundário */
--text-color: hsl(358, 2%, 66%); /* #A8A7A7 */
--body-color: hsl(358, 100%, 1%); /* #050000 */
/* Contraste: ~9:1 ✅ */
```

---

## 📐 Layout e Composição

### Grid System

Usamos um sistema de 12 colunas implícito com container centralizado:

```text
┌─────────────────────────────────────────────────────────────┐
│  Margem   │        Container (max 1168px)        │  Margem  │
│           │                                       │          │
│   auto    │   Conteúdo organizado em grid        │   auto   │
│           │                                       │          │
└─────────────────────────────────────────────────────────────┘
```

### Hierarquia Visual

A hierarquia é estabelecida por:

1. **Tamanho:** Elementos maiores = mais importantes
2. **Posição:** Topo e esquerda = primeiro a ser visto
3. **Cor:** Vermelho = ação, Branco = informação, Cinza = contexto
4. **Espaçamento:** Mais espaço = mais destaque

### Seções da Página

```text
┌─────────────────────────────────────┐
│           HEADER (fixo)             │  Logo + Navegação
├─────────────────────────────────────┤
│                                     │
│           HOME / HERO               │  Impacto máximo
│         (100vh inicial)             │  Foto + Nome + Skills
│                                     │
├─────────────────────────────────────┤
│           PROJETOS                  │  Prova de competência
│         (Grid de cards)             │
├─────────────────────────────────────┤
│           SERVIÇOS                  │  O que ofereço
│         (3 cards)                   │
├─────────────────────────────────────┤
│           EXPERIÊNCIA               │  Credibilidade
│         (Timeline)                  │
├─────────────────────────────────────┤
│           CONTATO                   │  Call to action
│         (Formulário)                │
├─────────────────────────────────────┤
│           FOOTER                    │  Links + Copyright
└─────────────────────────────────────┘
```

---

## ✨ Micro-interações

### Princípio

> "Cada interação deve ter feedback imediato e satisfatório."

### Exemplos Implementados

**1. Hover em Cards:**

```css
.projects__card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px hsla(358, 80%, 49%, 0.15);
}
```

**Efeito:** Levitação sutil que convida ao clique

**2. Vídeo on Hover:**

- Desktop: Vídeo inicia ao passar o mouse
- Mobile: Vídeo inicia ao entrar na viewport

**Efeito:** "Preview" do projeto sem sair da página

**3. FAB (Floating Action Button):**

```css
.fab:hover {
  transform: scale(1.1);
}

.fab-option {
  transition-delay: calc(var(--index) * 100ms);
}
```

**Efeito:** Expansão sequencial dos ícones sociais

**4. Scroll Reveal:**

- Elementos aparecem gradualmente
- Direções diferentes criam dinamismo
- Stagger effect em listas

---

## 📱 Design Responsivo

### Mobile First

O design começa pelo mobile e **adiciona complexidade** para telas maiores:

```css
/* Base: Mobile */
.projects__grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Tablet: 2 colunas */
@media (min-width: 768px) {
  .projects__grid {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .projects__card {
    width: calc(50% - 0.75rem);
  }
}

/* Desktop: 3 colunas */
@media (min-width: 1200px) {
  .projects__card {
    width: calc(33.33% - 1rem);
  }
}
```

### Adaptações por Dispositivo

| Elemento | Mobile                     | Desktop          |
| -------- | -------------------------- | ---------------- |
| Header   | Menu hamburger             | Links expandidos |
| Hero     | Foto menor, stack vertical | Lado a lado      |
| Projetos | 1 coluna                   | 2-3 colunas      |
| Vídeos   | Autoplay on scroll         | Play on hover    |
| FAB      | Maior (touch-friendly)     | Tamanho padrão   |

### Touch Targets

Todos os elementos interativos têm área mínima de **44x44px**:

```css
.button,
.hamburger,
.fab-option {
  min-width: 44px;
  min-height: 44px;
}
```

---

## ♿ Acessibilidade

### Princípios WCAG Seguidos

1. **Perceptível:** Contraste adequado, texto alternativo
2. **Operável:** Navegação por teclado, skip links
3. **Compreensível:** Linguagem clara, feedback de formulário
4. **Robusto:** Semântica HTML, ARIA quando necessário

### Implementações

**Textos Alternativos:**

```tsx
<Image src={project.image} alt={`Screenshot do projeto ${project.name}`} />
```

**ARIA Labels:**

```tsx
<button
  aria-label="Abrir menu de navegação"
  aria-expanded={isMenuOpen}
>
```

**Semântica HTML:**

```tsx
<main>
  <section id="Home" aria-label="Início">
    <article class="projects__card">
```

**Focus Visible:**

```css
:focus-visible {
  outline: 2px solid var(--first-color);
  outline-offset: 2px;
}
```

---

## 🚀 Performance Visual

### Perceived Performance

Técnicas para o site **parecer** rápido:

1. **Skeleton Loading:** Não implementado (conteúdo estático)
2. **Progressive Images:** WebP com blur placeholder
3. **Animações de Entrada:** Distrai enquanto carrega

### Loading Strategy

```text
1. HTML básico renderiza (SSR)
2. Fontes carregam (font-display: swap)
3. CSS carrega (crítico inline)
4. Imagens lazy load
5. Vídeos preload on hover/scroll
6. ScrollReveal inicializa
```

### Prevenção de Layout Shift

```tsx
// Sempre especificar dimensões
<Image
  src='/image.webp'
  width={320} // Reserva espaço
  height={210}
  // ...
/>
```

---

## 🎭 Personalidade da Marca

### Tom de Voz

| Aspecto          | Característica                        |
| ---------------- | ------------------------------------- |
| **Profissional** | Vocabulário técnico quando apropriado |
| **Acessível**    | Explicações claras, não intimidador   |
| **Confiante**    | Afirmativo, mas não arrogante         |
| **Pessoal**      | Primeira pessoa, cria conexão         |

### Elementos de Personalidade

1. **Foto Profissional:** Transmite seriedade e approachability
2. **Projetos Reais:** Demonstra capacidade concreta
3. **Vídeos:** Mostra trabalho em ação
4. **Formulário Amigável:** Convida à conversa

---

## 📊 Decisões de Design Documentadas

### Por que não usar gradientes em todo lugar?

Gradientes são usados com **moderação**:

- Apenas na foto de perfil (destaque principal)
- Sutis em hovers

**Razão:** Excesso de gradientes pode parecer datado ou amador.

### Por que cards com bordas suaves?

```css
border-radius: 1rem; /* 16px */
```

**Razão:** Bordas arredondadas transmitem modernidade e são mais amigáveis visualmente que bordas retas.

### Por que animações lentas (2500ms)?

**Razão:** Animações mais lentas parecem mais elegantes e profissionais. Animações rápidas podem parecer "jumpy" ou baratas.

---

## 🔮 Evolução Futura

### Considerações para Próximas Versões

1. **Dark/Light Toggle:** Oferecer escolha ao usuário
2. **Animações Mais Complexas:** GSAP para transições de página
3. **Modo de Alto Contraste:** Para acessibilidade aprimorada
4. **Temas Sazonais:** Variações de cor para datas especiais

---

**Última atualização:** 26 de Novembro de 2025
