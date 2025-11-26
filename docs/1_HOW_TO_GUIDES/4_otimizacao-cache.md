# How-To: Otimização de Performance com Cache

Este guia explica as estratégias de cache implementadas e como melhorar ainda mais a performance do projeto.

---

## 📊 Cache Atual

### O que já está implementado

1. **Cache de Assets Estáticos**

   ```js
   // next.config.mjs
   source: '/assets/:path*',
   Cache-Control: 'public, max-age=31536000, immutable' // 1 ano
   ```

2. **Otimização de Imagens Next.js**
   - Cache TTL: 60 segundos (pode ser aumentado)
   - Formatos modernos (AVIF, WebP)
   - Lazy loading automático

3. **Static Site Generation (SSG)**
   - Next.js gera HTML estático no build
   - Páginas servidas instantaneamente

---

## 🚀 Melhorias Propostas

### 1. Aumentar Cache de Imagens Otimizadas

**Ganho Estimado:** Reduz requisições ao servidor de imagens

```js
// next.config.mjs
images: {
  minimumCacheTTL: 31536000, // 1 ano (em vez de 60s)
  // ... resto da config
}
```

**Quando fazer:** Se suas imagens não mudam frequentemente.

---

### 2. Adicionar Cache Headers para CSS/JS

**Ganho Estimado:** Reduz re-downloads de assets em visitas subsequentes

```js
// next.config.mjs
async headers() {
  return [
    // ... headers existentes
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    },
    {
      source: '/_next/image',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ]
}
```

---

### 3. Memoização de Componentes

**Ganho Estimado:** Evita re-renders desnecessários

Para componentes que renderizam dados estáticos:

```tsx
// src/components/sections/Projects.tsx
import { memo } from 'react'
import { projects } from '../../data'
import ProjectCard from '../ProjectCard'

const Projects = memo(() => {
  return (
    <section className='projects section' id='Projetos Recentes'>
      <h2 className='section__title'>PROJETOS RECENTES</h2>
      <div className='projects__container container grid'>
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
})

Projects.displayName = 'Projects'
export default Projects
```

**Benefícios:**

- Componente só re-renderiza se props mudarem
- Como não há props, nunca re-renderiza desnecessariamente

---

### 4. Memoização de Arrays Mapeados

**Ganho Estimado:** Evita recriação de arrays em cada render

```tsx
// src/components/sections/Services.tsx
import { useMemo } from 'react'
import { services } from '../../data'

const Services = () => {
  const servicesList = useMemo(
    () =>
      services.map((service, index) => (
        <article key={index} className='services__card'>
          {/* ... */}
        </article>
      )),
    [] // Array vazio = nunca recria
  )

  return (
    <section className='services section' id='Serviços'>
      <h2 className='section__title'>SERVIÇOS</h2>
      <div className='services__container container grid'>{servicesList}</div>
    </section>
  )
}
```

---

### 5. Cache de Fontes Externas

**Ganho Estimado:** Reduz tempo de carregamento de fontes do Google

As fontes já usam `next/font` (otimizado), mas podemos adicionar cache headers:

```js
// next.config.mjs
{
  source: '/fonts/:path*',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable'
    }
  ]
}
```

---

### 6. Service Worker (Futuro)

**Ganho Estimado:** Funcionalidade offline + cache agressivo

Esta funcionalidade está no [ROADMAP.md](../ROADMAP.md). Quando implementada:

- Cache de assets estáticos
- Cache de API calls (se houver)
- Funcionalidade offline básica

---

## 📈 Ganhos Esperados

### Antes vs Depois (Estimado)

| Métrica            | Antes        | Depois              | Melhoria   |
| ------------------ | ------------ | ------------------- | ---------- |
| **Repeat Visits**  | ~2-3s        | ~0.5-1s             | ⬇️ 70%     |
| **Asset Requests** | Todas sempre | Cache hit           | ⬇️ 90%     |
| **LCP (Cached)**   | ~1.5s        | ~0.3s               | ⬇️ 80%     |
| **Bundle Size**    | Mesmo        | -5-10% (memoização) | ⬇️ Pequeno |

---

## ⚠️ Trade-offs

### Cache Agressivo

**Prós:**

- Performance excelente em visitas repetidas
- Menos carga no servidor
- Melhor experiência do usuário

**Contras:**

- Mudanças em assets podem não aparecer imediatamente
- Precisa invalidar cache manualmente ou usar versionamento

### Memoização

**Prós:**

- Menos re-renders
- Melhor performance React

**Contras:**

- Mais complexidade de código
- Pode mascarar problemas de performance reais

---

## 🎯 Recomendações por Prioridade

### Alta Prioridade (Implementar Agora)

1. ✅ **Aumentar `minimumCacheTTL` de imagens**
   - Impacto: Alto
   - Esforço: Baixo
   - Risco: Baixo

2. ✅ **Cache headers para `/_next/static`**
   - Impacto: Alto
   - Esforço: Baixo
   - Risco: Baixo

### Média Prioridade

1. **React.memo em componentes de seção**
   - Impacto: Médio
   - Esforço: Baixo
   - Risco: Baixo

1. **useMemo para arrays mapeados**
   - Impacto: Médio
   - Esforço: Médio
   - Risco: Baixo

### Baixa Prioridade (Quando necessário)

1. **Service Worker**
   - Impacto: Alto (offline)
   - Esforço: Alto
   - Risco: Médio

---

## 🔧 Implementação Passo a Passo

### Passo 1: Atualizar next.config.mjs

```js
// next.config.mjs
const nextConfig = {
  // ... config existente

  images: {
    // ... config existente
    minimumCacheTTL: 31536000 // 1 ano (era 60)
  },

  async headers() {
    return [
      // ... headers existentes
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}
```

### Passo 2: Aplicar React.memo (Opcional)

Aplicar apenas em componentes que renderizam dados estáticos e não recebem props.

---

## 📊 Monitoramento

### Ferramentas para Medir Ganhos

1. **Lighthouse** (Chrome DevTools)
   - Aba "Performance"
   - Compare antes/depois

2. **Network Tab** (DevTools)
   - Veja tamanho dos requests
   - Status 304 (Not Modified) = cache funcionando

3. **Next.js Analytics** (se implementar)
   - Métricas reais de performance

---

## ✅ Checklist

- [ ] Aumentar `minimumCacheTTL` de imagens
- [ ] Adicionar cache headers para `/_next/static`
- [ ] Adicionar cache headers para `/_next/image`
- [ ] Testar em modo produção (`pnpm build && pnpm start`)
- [ ] Verificar cache hit no Network tab
- [ ] Medir ganhos com Lighthouse

---

## 🔗 Referências

- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)
- [Cache-Control Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [React.memo](https://react.dev/reference/react/memo)
- [useMemo Hook](https://react.dev/reference/react/useMemo)

---

**Última atualização:** 26 de Novembro de 2025
