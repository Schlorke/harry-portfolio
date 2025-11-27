# Instruções para Inteligência Artificial

Este documento fornece instruções específicas para uma IA implementar este componente em um novo projeto.

## 🎯 Tarefa

Implementar o componente de animação de ondinha (wave animation) em um projeto Next.js, copiando todos os arquivos necessários e configurando o ambiente corretamente.

## 📋 Processo Passo a Passo

### FASE 1: Preparação

1. **Identificar o projeto destino:**

   - Localizar a pasta raiz do projeto Next.js
   - Verificar se é Next.js 13+ (App Router ou Pages Router)
   - Verificar se usa TypeScript ou JavaScript

2. **Verificar estrutura atual:**
   - Verificar se existe pasta `components/`
   - Se não existir, criar

### FASE 2: Instalação de Dependências

**Comando a executar:**

```bash
npm install @react-three/fiber @react-three/drei three leva
```

**OU se usar pnpm:**

```bash
pnpm add @react-three/fiber @react-three/drei three leva
```

**OU se usar yarn:**

```bash
yarn add @react-three/fiber @react-three/drei three leva
```

**Verificação:** Confirmar que as dependências foram adicionadas ao `package.json`

### FASE 3: Criação de Estrutura

**Criar a seguinte estrutura:**

```
projeto/
└── components/
    └── gl/
        ├── index.tsx
        ├── particles.tsx
        └── shaders/
            ├── pointMaterial.ts
            ├── simulationMaterial.ts
            ├── utils.ts
            └── vignetteShader.ts
```

**Comandos (PowerShell):**

```powershell
New-Item -ItemType Directory -Path "components\gl\shaders" -Force
```

**Comandos (Bash):**

```bash
mkdir -p components/gl/shaders
```

### FASE 4: Cópia de Arquivos

**Ordem de cópia (importante para evitar erros de dependência):**

1. **`components/gl/shaders/utils.ts`** (primeiro - usado por outros)
2. **`components/gl/shaders/pointMaterial.ts`**
3. **`components/gl/shaders/simulationMaterial.ts`**
4. **`components/gl/shaders/vignetteShader.ts`**
5. **`components/gl/particles.tsx`**
6. **`components/gl/index.tsx`** (último - usa particles)

**Para cada arquivo:**

- Copiar conteúdo exato do arquivo fonte
- Manter estrutura de pastas
- Verificar que `"use client";` está presente nos arquivos `.tsx`

### FASE 5: Verificação de Imports

**Verificar e ajustar imports se necessário:**

**Em `components/gl/index.tsx`:**

```tsx
import { Particles } from "./particles";
```

- Se projeto usa `@/components`, manter
- Se não, verificar se path relativo está correto

**Em `components/gl/particles.tsx`:**

```tsx
import { DofPointsMaterial } from "./shaders/pointMaterial";
import { SimulationMaterial } from "./shaders/simulationMaterial";
```

**Em `components/gl/shaders/pointMaterial.ts` e `simulationMaterial.ts`:**

```tsx
import { periodicNoiseGLSL } from "./utils";
```

### FASE 6: Configuração do Next.js

**Localizar `next.config.ts` ou `next.config.js`**

**Adicionar configuração do webpack:**

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... configurações existentes ...

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        buffer: false,
        util: false,
        url: false,
      };
    }
    return config;
  },

  // Para Next.js 16+
  turbopack: {},
};

export default nextConfig;
```

**IMPORTANTE:** Se já existir configuração `webpack`, MESCLAR, não substituir.

### FASE 7: Validação

**Checklist de validação:**

- [ ] Todos os 6 arquivos foram copiados
- [ ] Estrutura de pastas está correta
- [ ] `"use client";` presente em `index.tsx` e `particles.tsx`
- [ ] Todos os imports estão corretos
- [ ] `next.config.ts` tem configuração do webpack
- [ ] Dependências instaladas

### FASE 8: Teste

**Criar arquivo de teste:**

```tsx
// app/test-wave/page.tsx (App Router)
// OU pages/test-wave.tsx (Pages Router)

"use client";

import { GL } from "@/components/gl";
// OU import { GL } from "../components/gl"; (se não usar @/)

export default function TestWave() {
  return (
    <div className="h-screen w-full">
      <GL hovering={false} />
    </div>
  );
}
```

**Executar:**

```bash
npm run dev
```

**Verificar:**

- Navegar para `/test-wave`
- Verificar se partículas aparecem
- Verificar console por erros

## 🚨 Tratamento de Erros Comuns

### Erro: "Cannot find module"

**Ação:** Verificar se dependências foram instaladas corretamente

### Erro: "Cannot read properties of undefined (reading 'call')"

**Ações:**

1. Verificar `next.config.ts` tem configuração do webpack
2. Limpar cache: `rm -rf .next` (ou `Remove-Item -Recurse -Force .next`)
3. Reiniciar servidor

### Erro: "'use client' directive is missing"

**Ação:** Adicionar `"use client";` na primeira linha de `index.tsx` e `particles.tsx`

### Partículas não aparecem

**Ações:**

1. Verificar que container tem altura definida (`h-screen` ou altura específica)
2. Verificar console do navegador
3. Verificar se WebGL está habilitado

## 📝 Notas Importantes

1. **Ordem importa:** Copiar arquivos na ordem especificada
2. **"use client" obrigatório:** Todos os componentes React que usam hooks precisam
3. **Webpack config obrigatória:** Sem isso, o projeto não compila
4. **Paths:** Ajustar imports conforme estrutura do projeto
5. **TypeScript:** Se projeto não usa TS, arquivos `.ts` podem ser renomeados para `.js` (mas manter `.tsx`)

## ✅ Critérios de Sucesso

A implementação é bem-sucedida quando:

1. ✅ Todos os arquivos foram copiados
2. ✅ Dependências instaladas
3. ✅ `next.config.ts` configurado
4. ✅ Projeto compila sem erros
5. ✅ Página de teste mostra animação funcionando
6. ✅ Sem erros no console do navegador
7. ✅ Partículas aparecem e se movem

## 🔄 Adaptações Possíveis

- **Remover Leva:** Se não quiser controles, criar versão simplificada
- **Ajustar paths:** Conforme estrutura do projeto
- **Customizar cores:** Modificar shaders conforme necessário
- **Performance:** Ajustar `size` para menos partículas se necessário

## 📚 Referências

- README.md - Documentação completa
- IMPLEMENTATION_GUIDE.md - Guia detalhado passo a passo
- EXAMPLES.md - Exemplos de uso

---

**Fim das Instruções para IA**

Seguir estas instruções garante implementação correta e funcional do componente.
