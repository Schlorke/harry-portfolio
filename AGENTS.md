# AGENTS.md: Instruções para Agentes de IA

> Este documento é a fonte única da verdade para guiar agentes de IA que trabalham neste codebase.
> Seguir estas regras é **mandatório** para garantir consistência, qualidade e eficiência.

---

## 📋 Sobre o Projeto

**Harry Portfolio** é um portfólio profissional moderno desenvolvido com **Next.js 14**, **React 18**, **TypeScript** e
**Tailwind CSS**. O projeto foi migrado de uma stack Vite/Vanilla JS para Next.js App Router, mantendo foco em
performance, acessibilidade e experiência do usuário.

**Stack Principal:**

- Next.js 14.2.15 (App Router)
- React 18.2.0
- TypeScript 5.3.3
- Tailwind CSS 3.4.1 (prefixo: `tw-`)
- ScrollReveal 4.0.9
- EmailJS Browser 4.4.1

---

## ✅ Do / ❌ Don't (Faça / Não Faça)

### ✅ Do (Faça)

- **Use o App Router do Next.js:** Todos os componentes de página e layouts devem estar dentro do diretório
  `src/app/`.

- **Use TypeScript para tudo:** Todos os novos arquivos (`.ts`, `.tsx`) devem ter tipagem estrita. Evite o uso de
  `any` a menos que seja absolutamente inevitável e justificado.

- **Componentes Funcionais e Hooks:** Use exclusivamente componentes funcionais e React Hooks. Componentes de classe
  são **proibidos**.

- **CSS Customizado + Tailwind:** O projeto usa CSS customizado em `globals.css` com variáveis CSS. Tailwind CSS é
  usado com prefixo `tw-` para utilitários específicos. Mantenha essa convenção.

- **Server Components por Padrão:** Prefira React Server Components (RSC) sempre que possível. Use `"use client";`
  apenas quando interatividade for necessária (Hooks como `useState`, `useEffect`).

- **Estrutura de Componentes:**
  - Componentes de seção: `src/components/sections/`
  - Componentes reutilizáveis: `src/components/`
  - Hooks customizados: `src/hooks/`
  - Tipos TypeScript: `src/types/`
  - Dados estáticos: `src/data/`

- **Imagens com next/image:** Use sempre o componente `Image` do Next.js para otimização automática.

- **Formatação e Lint:** Execute `pnpm format` e `pnpm lint` antes de finalizar alterações.

### ❌ Don't (Não Faça)

- **Não use o `pages/` Router:** O projeto usa App Router. Não crie arquivos no diretório `pages/`.

- **Não instale dependências sem aprovação:** Qualquer nova dependência deve ser discutida. Peça permissão antes de
  adicionar ao `package.json`.

- **Não remova classes CSS existentes:** O projeto tem estilos customizados extensivos em `globals.css`. Não remova ou
  altere classes sem entender seu impacto.

- **Não use CSS-in-JS:** O projeto não usa styled-components, Emotion ou similares. Mantenha a estilização em
  CSS/Tailwind.

- **Não faça hard-code de URLs de assets:** Use caminhos relativos a partir de `/public/assets/`.

- **Não misture lógica de negócio com UI:** Use hooks customizados em `src/hooks/` para abstrair lógica.

---

## 📂 Estrutura do Projeto

```text
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Estilos globais e variáveis CSS
│   ├── layout.tsx          # Layout raiz com metadados
│   └── page.tsx            # Página principal
│
├── components/             # Componentes React
│   ├── sections/           # Seções da página
│   │   ├── Home.tsx        # Hero section
│   │   ├── Projects.tsx    # Galeria de projetos
│   │   ├── Services.tsx    # Serviços oferecidos
│   │   ├── Experience.tsx  # Timeline de experiência
│   │   └── Contact.tsx     # Formulário de contato
│   │
│   ├── Header.tsx          # Cabeçalho e navegação
│   ├── Footer.tsx          # Rodapé
│   ├── ProjectCard.tsx     # Card de projeto com vídeo
│   └── FloatingActionButton.tsx  # FAB de redes sociais
│
├── hooks/                  # Hooks customizados
│   ├── useScrollReveal.ts  # Animações ScrollReveal
│   ├── useSmoothScroll.ts  # Scroll suave para âncoras
│   └── usePhoneFormat.ts   # Formatação de telefone BR
│
├── data/                   # Dados estáticos
│   └── index.ts            # Projetos, serviços, experiências
│
├── types/                  # Tipos TypeScript
│   └── index.ts            # Interfaces (Project, Service, etc.)
│
└── utils/                  # Utilitários
    └── isMobile.ts         # Detecção de dispositivo móvel

public/
├── assets/
│   ├── img/               # Imagens, ícones, favicons
│   ├── videos/            # Vídeos de demonstração
│   └── pdf/               # Documentos (currículo)
├── robots.txt             # SEO crawlers
└── sitemap.xml            # Mapa do site
```

---

## ⚙️ Comandos

Use estes comandos para desenvolvimento e verificação:

```bash
# Desenvolvimento
pnpm dev                    # Servidor de desenvolvimento (http://localhost:3000)

# Build
pnpm build                  # Build de produção
pnpm start                  # Executar build de produção

# Verificações
pnpm type-check             # Verificação de tipos TypeScript
pnpm lint                   # ESLint (verificar problemas)
pnpm lint:fix               # ESLint (corrigir automaticamente)
pnpm format                 # Prettier (formatar código)
pnpm format:check           # Prettier (verificar formatação)

# Qualidade
pnpm spell-check            # Verificação ortográfica (PT-BR/EN)
pnpm lint:md                # Lint de arquivos Markdown
```

**Nota:** Use verificações focadas em arquivos individuais quando possível:

```bash
npx eslint --fix src/components/NomeDoArquivo.tsx
npx prettier --write src/components/NomeDoArquivo.tsx
```

---

## 🎨 Convenções de Estilo

### Variáveis CSS

O projeto usa variáveis CSS customizadas definidas em `globals.css`:

```css
:root {
  --hue: 358; /* Cor principal (vermelho) */
  --first-color: hsl(var(--hue), 80%, 49%);
  --first-color-alt: hsl(var(--hue), 76%, 45%);
  --white-color: hsl(0, 0%, 98%);
  --black-color: hsl(0, 0%, 1%);
  --text-color: hsl(var(--hue), 2%, 66%);
  --body-color: hsl(var(--hue), 100%, 1%);
  --container-color: hsl(var(--hue), 2%, 10%);
}
```

### Tailwind CSS

- **Prefixo:** Todas as classes Tailwind usam prefixo `tw-`
- **Exemplo:** `tw-flex`, `tw-items-center`, `tw-bg-white`
- **Uso:** Complementar ao CSS customizado, não substituí-lo

### Fontes

- **Poppins:** Fonte principal (body)
- **Alegreya Sans SC:** Fonte secundária (títulos especiais)
- Ambas carregadas via `next/font/google` no `layout.tsx`

---

## 🔧 Padrões de Código

### Componentes React

```tsx
// ✅ Correto: Componente funcional com tipos
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <button className={`button button--${variant}`} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
```

### Hooks Customizados

```tsx
// ✅ Correto: Hook com tipagem e cleanup
export const useCustomHook = () => {
  const [state, setState] = useState<string>('')

  useEffect(() => {
    // Setup
    const handler = () => {
      /* ... */
    }
    window.addEventListener('event', handler)

    // Cleanup
    return () => {
      window.removeEventListener('event', handler)
    }
  }, [])

  return { state, setState }
}
```

### Imports

```tsx
// ✅ Ordem correta de imports
import Image from 'next/image' // 1. Next.js
import { useEffect, useState } from 'react' // 2. React
import { Project } from '../types' // 3. Tipos locais
import { useSmoothScroll } from '../hooks/useSmoothScroll' // 4. Hooks locais
import { isMobile } from '../utils/isMobile' // 5. Utils locais
```

---

## 📝 Checklist de Pull Request

Antes de submeter um PR, certifique-se de que todos os itens foram cumpridos:

- [ ] **Título do PR:** Segue o padrão `feat(escopo): descrição` ou `fix:`, `docs:`, `refactor:`
- [ ] **Type Check:** `pnpm type-check` passa sem erros
- [ ] **Lint:** `pnpm lint` passa sem erros
- [ ] **Formatação:** `pnpm format:check` passa sem erros
- [ ] **Build:** `pnpm build` completa sem erros
- [ ] **Documentação:** Arquivos em `/docs` foram atualizados se necessário
- [ ] **Changelog:** Entrada adicionada em `CHANGELOG.md` na seção `[Unreleased]`

---

## 🤔 Quando Estiver em Dúvida

- **Pergunte, não adivinhe:** Se uma instrução não for clara ou encontrar ambiguidade, peça esclarecimentos.

- **Proponha um plano:** Para tarefas complexas, proponha um plano passo a passo antes de codificar.

- **Consulte a documentação:** Verifique os arquivos em `/docs` para contexto adicional:
  - `/docs/2_REFERENCE/` - Documentação técnica detalhada
  - `/docs/3_EXPLANATION/` - Decisões de arquitetura e princípios

- **Mantenha a consistência:** Siga os padrões existentes no código. Se um componente similar existe, use-o como referência.

---

## 📚 Documentação Relacionada

- [Arquitetura do Sistema](docs/2_REFERENCE/1_arquitetura.md)
- [Modelos de Dados](docs/2_REFERENCE/2_modelos-de-dados.md)
- [Componentes UI](docs/2_REFERENCE/3_componentes-ui.md)
- [Hooks Customizados](docs/2_REFERENCE/4_hooks.md)
- [Design System](docs/2_REFERENCE/5_design-system.md)
- [Decisões de Arquitetura](docs/3_EXPLANATION/1_decisoes-arquitetura.md)

---

**Última atualização:** 26 de Novembro de 2025
