# Guia de Implementação para Inteligência Artificial

Este documento fornece instruções detalhadas passo a passo para uma IA implementar corretamente o componente de animação de ondinha em um novo projeto Next.js.

## 🎯 Objetivo

Implementar um componente de animação de partículas com movimento ondulatório como background em um projeto Next.js, mantendo todas as funcionalidades e otimizações.

## 📋 Checklist de Pré-requisitos

Antes de começar, verifique:

- [ ] Projeto Next.js criado (versão 13+)
- [ ] TypeScript configurado (opcional mas recomendado)
- [ ] Acesso ao terminal/CLI do projeto

## 🔧 Passo 1: Instalar Dependências

Execute o comando apropriado para seu gerenciador de pacotes:

```bash
# npm
npm install @react-three/fiber @react-three/drei three leva

# pnpm
pnpm add @react-three/fiber @react-three/drei three leva

# yarn
yarn add @react-three/fiber @react-three/drei three leva
```

**Verificação:** Confirme que as dependências foram instaladas verificando `package.json` ou `node_modules`.

## 📁 Passo 2: Criar Estrutura de Diretórios

Crie a seguinte estrutura de pastas no projeto:

```
projeto/
└── components/
    └── gl/
        └── shaders/
```

**Comandos (PowerShell):**
```powershell
New-Item -ItemType Directory -Path "components\gl\shaders" -Force
```

**Comandos (Bash/Linux/Mac):**
```bash
mkdir -p components/gl/shaders
```

## 📄 Passo 3: Copiar Arquivos

Copie os seguintes arquivos mantendo a estrutura:

### 3.1. `components/gl/index.tsx`

**Localização:** `reusable-components/wave-animation/src/components/gl/index.tsx`

**Ações:**
1. Copiar o arquivo para `components/gl/index.tsx` no projeto destino
2. Verificar que a primeira linha contém `"use client";`
3. Verificar imports - ajustar paths se necessário:
   - Se o projeto usa `@/components`, manter como está
   - Se usa paths relativos, ajustar: `import { Particles } from "./particles";`

### 3.2. `components/gl/particles.tsx`

**Localização:** `reusable-components/wave-animation/src/components/gl/particles.tsx`

**Ações:**
1. Copiar o arquivo para `components/gl/particles.tsx`
2. Verificar `"use client";` no topo
3. Verificar imports dos shaders:
   ```tsx
   import { DofPointsMaterial } from "./shaders/pointMaterial";
   import { SimulationMaterial } from "./shaders/simulationMaterial";
   ```

### 3.3. `components/gl/shaders/utils.ts`

**Localização:** `reusable-components/wave-animation/src/components/gl/shaders/utils.ts`

**Ações:**
1. Copiar para `components/gl/shaders/utils.ts`
2. Este arquivo não precisa de `"use client"` (é apenas código TypeScript)

### 3.4. `components/gl/shaders/pointMaterial.ts`

**Localização:** `reusable-components/wave-animation/src/components/gl/shaders/pointMaterial.ts`

**Ações:**
1. Copiar para `components/gl/shaders/pointMaterial.ts`
2. Verificar import: `import { periodicNoiseGLSL } from './utils'`

### 3.5. `components/gl/shaders/simulationMaterial.ts`

**Localização:** `reusable-components/wave-animation/src/components/gl/shaders/simulationMaterial.ts`

**Ações:**
1. Copiar para `components/gl/shaders/simulationMaterial.ts`
2. Verificar import: `import { periodicNoiseGLSL } from './utils'`

### 3.6. `components/gl/shaders/vignetteShader.ts` (Opcional)

**Localização:** `reusable-components/wave-animation/src/components/gl/shaders/vignetteShader.ts`

**Nota:** Este arquivo não é usado atualmente, mas pode ser útil no futuro.

## ⚙️ Passo 4: Configurar Next.js

### 4.1. Localizar `next.config.ts` ou `next.config.js`

### 4.2. Adicionar Configuração do Webpack

**Para TypeScript (`next.config.ts`):**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... outras configurações existentes ...

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

  // Para Next.js 16+ (Turbopack)
  turbopack: {},
};

export default nextConfig;
```

**Para JavaScript (`next.config.js`):**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... outras configurações existentes ...

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

  // Para Next.js 16+ (Turbopack)
  turbopack: {},
};

module.exports = nextConfig;
```

**Importante:** Se já existir uma configuração `webpack`, mesclar com a existente, não substituir.

## 🧪 Passo 5: Criar Componente de Teste

Crie um arquivo de teste para verificar se tudo funciona:

**Arquivo:** `app/test-wave/page.tsx` (ou `pages/test-wave.tsx` para Pages Router)

```tsx
"use client";

import { GL } from "@/components/gl";

export default function TestWave() {
  return (
    <div className="h-screen w-full">
      <GL hovering={false} />
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <h1 className="text-4xl">Wave Animation Test</h1>
      </div>
    </div>
  );
}
```

## ✅ Passo 6: Verificações Finais

### 6.1. Verificar Estrutura de Arquivos

```
components/
└── gl/
    ├── index.tsx
    ├── particles.tsx
    └── shaders/
        ├── pointMaterial.ts
        ├── simulationMaterial.ts
        ├── utils.ts
        └── vignetteShader.ts
```

### 6.2. Verificar "use client"

Todos os arquivos `.tsx` devem ter `"use client";` na primeira linha:
- ✅ `components/gl/index.tsx`
- ✅ `components/gl/particles.tsx`

### 6.3. Verificar Imports

**Em `index.tsx`:**
```tsx
import { Particles } from "./particles";
```

**Em `particles.tsx`:**
```tsx
import { DofPointsMaterial } from "./shaders/pointMaterial";
import { SimulationMaterial } from "./shaders/simulationMaterial";
```

**Em `pointMaterial.ts` e `simulationMaterial.ts`:**
```tsx
import { periodicNoiseGLSL } from './utils'
```

### 6.4. Verificar TypeScript (se aplicável)

Se o projeto usa TypeScript, verificar `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "bundler"
  }
}
```

## 🚀 Passo 7: Testar

1. **Iniciar servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   pnpm dev
   # ou
   yarn dev
   ```

2. **Acessar página de teste:**
   - Navegar para `http://localhost:3000/test-wave`

3. **Verificar:**
   - [ ] Página carrega sem erros
   - [ ] Partículas aparecem (bolinhas brancas)
   - [ ] Animação funciona (movimento ondulatório)
   - [ ] Sem erros no console do navegador
   - [ ] Sem erros no terminal

## 🐛 Resolução de Problemas Comuns

### Erro: "Cannot find module '@react-three/fiber'"

**Causa:** Dependências não instaladas
**Solução:** Execute `npm install @react-three/fiber @react-three/drei three leva`

### Erro: "Cannot read properties of undefined (reading 'call')"

**Causa:** Configuração do webpack faltando ou incorreta
**Solução:**
1. Verificar `next.config.ts` tem a configuração do webpack
2. Limpar cache: `rm -rf .next` (ou `Remove-Item -Recurse -Force .next` no PowerShell)
3. Reiniciar servidor

### Erro: "use client" directive missing

**Causa:** Arquivos não têm a diretiva
**Solução:** Adicionar `"use client";` na primeira linha de `index.tsx` e `particles.tsx`

### Partículas não aparecem

**Causa:** Canvas sem dimensões ou configuração incorreta
**Solução:**
1. Verificar que o container tem `height` e `width` definidos
2. Verificar que `opacity` não está em 0
3. Verificar console do navegador por erros WebGL

### Performance baixa

**Solução:**
1. Reduzir `size` para 256 no componente GL
2. Remover controles Leva em produção
3. Verificar se há múltiplas instâncias do componente

## 📝 Notas Importantes para IA

### Ordem de Implementação

1. **SEMPRE** instalar dependências primeiro
2. **SEMPRE** criar estrutura de diretórios
3. **SEMPRE** copiar arquivos na ordem: utils.ts → outros shaders → particles.tsx → index.tsx
4. **SEMPRE** configurar next.config.ts após copiar arquivos
5. **SEMPRE** testar antes de considerar completo

### Validações Críticas

- ✅ Todos os arquivos `.tsx` têm `"use client";`
- ✅ Todos os imports estão corretos
- ✅ `next.config.ts` tem configuração do webpack
- ✅ Dependências instaladas
- ✅ Estrutura de pastas correta

### Adaptações Possíveis

- **Paths:** Se o projeto não usa `@/`, ajustar imports para paths relativos
- **Leva:** Pode ser removido em produção para melhor performance
- **Cores:** Pode ser customizado nos shaders
- **Performance:** Ajustar `size` conforme necessário

## 🎓 Exemplo Completo de Uso

```tsx
// app/page.tsx
"use client";

import { useState } from "react";
import { GL } from "@/components/gl";

export default function Home() {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="relative h-screen w-full">
      {/* Background animado */}
      <GL hovering={hovering} />

      {/* Conteúdo sobreposto */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <h1 className="text-6xl font-bold mb-4">Meu Projeto</h1>
        <button
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition"
        >
          Interagir
        </button>
      </div>
    </div>
  );
}
```

## ✅ Checklist Final de Implementação

- [ ] Dependências instaladas
- [ ] Estrutura de diretórios criada
- [ ] Todos os arquivos copiados
- [ ] `"use client"` adicionado onde necessário
- [ ] Imports verificados e ajustados
- [ ] `next.config.ts` configurado
- [ ] Testado em desenvolvimento
- [ ] Sem erros no console
- [ ] Animação funcionando corretamente

---

**Fim do Guia de Implementação**

Este guia deve ser seguido passo a passo para garantir implementação correta do componente.

