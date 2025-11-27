# Wave Animation Component

Um componente reutilizável de animação de ondinha com sistema de partículas para projetos Next.js. Este componente cria uma animação de fundo elegante com partículas brancas que se movem em padrões ondulatórios.

## 📋 Índice

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Uso Básico](#uso-básico)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Configuração](#configuração)
- [Props e Parâmetros](#props-e-parâmetros)
- [Customização](#customização)
- [Troubleshooting](#troubleshooting)
- [Arquitetura Técnica](#arquitetura-técnica)

## ✨ Características

- 🎨 Animação de partículas com movimento ondulatório suave
- ⚡ Renderização WebGL otimizada usando Three.js
- 🎛️ Controles interativos via Leva (opcional)
- 🎭 Efeito de reveal animado na inicialização
- ✨ Efeito de brilho (sparkle) nas partículas
- 🎥 Depth of Field (DOF) para efeito de profundidade
- 📱 Responsivo e performático
- 🔧 Altamente customizável

## 📦 Requisitos

### Dependências Obrigatórias

```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "next": "^13.0.0 || ^14.0.0 || ^15.0.0 || ^16.0.0",
  "@react-three/fiber": "^8.0.0 || ^9.0.0",
  "@react-three/drei": "^9.0.0",
  "three": "^0.150.0",
  "leva": "^0.9.0 || ^0.10.0"
}
```

### Instalação das Dependências

```bash
npm install @react-three/fiber @react-three/drei three leva
# ou
pnpm add @react-three/fiber @react-three/drei three leva
# ou
yarn add @react-three/fiber @react-three/drei three leva
```

## 🚀 Instalação

### Passo 1: Copiar Arquivos

Copie a pasta `src/components/gl` para o seu projeto:

```
seu-projeto/
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

### Passo 2: Configurar TypeScript (se aplicável)

Certifique-se de que seu `tsconfig.json` tem as seguintes configurações:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Passo 3: Configurar Next.js

No seu `next.config.ts` ou `next.config.js`, adicione:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  // Turbopack configuration (Next.js 16+)
  turbopack: {},
};

export default nextConfig;
```

## 📖 Uso Básico

### Exemplo 1: Uso Simples

```tsx
// app/page.tsx ou components/YourComponent.tsx
"use client";

import { GL } from "@/components/gl";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <GL hovering={false} />
      {/* Seu conteúdo aqui */}
    </div>
  );
}
```

### Exemplo 2: Com Interação de Hover

```tsx
"use client";

import { useState } from "react";
import { GL } from "@/components/gl";

export default function Hero() {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="h-screen w-full">
      <GL hovering={hovering} />

      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="px-6 py-3 bg-white text-black rounded"
        >
          Hover me
        </button>
      </div>
    </div>
  );
}
```

### Exemplo 3: Sem Controles Leva (Produção)

Se você não quiser os controles do Leva em produção, crie uma versão simplificada:

```tsx
// components/gl/SimpleGL.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Particles } from "./particles";

export const SimpleGL = ({ hovering = false }: { hovering?: boolean }) => {
  return (
    <div id="webgl" className="fixed inset-0 -z-10">
      <Canvas
        camera={{
          position: [1.26, 2.66, -1.82],
          fov: 50,
          near: 0.01,
          far: 300,
        }}
      >
        <color attach="background" args={["#000"]} />
        <Particles
          speed={1.0}
          aperture={1.79}
          focus={3.8}
          size={512}
          noiseScale={0.6}
          noiseIntensity={0.52}
          timeScale={1}
          pointSize={10.0}
          opacity={0.8}
          planeScale={10.0}
          introspect={hovering}
        />
      </Canvas>
    </div>
  );
};
```

## 📁 Estrutura de Arquivos

```
components/gl/
├── index.tsx                 # Componente principal GL (Canvas + Leva controls)
├── particles.tsx             # Componente de partículas (lógica principal)
└── shaders/
    ├── pointMaterial.ts      # Shader para renderização das partículas
    ├── simulationMaterial.ts # Shader para simulação do movimento ondulatório
    ├── utils.ts              # Funções utilitárias de shader (periodicNoise)
    └── vignetteShader.ts     # Shader de vignette (opcional, não usado atualmente)
```

## ⚙️ Configuração

### Props do Componente GL

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `hovering` | `boolean` | `false` | Ativa efeito de introspect quando true |

### Parâmetros do Particles (via Leva Controls)

| Parâmetro | Tipo | Padrão | Range | Descrição |
|-----------|------|--------|-------|-----------|
| `speed` | `number` | `1.0` | 0-2 | Velocidade da animação |
| `noiseScale` | `number` | `0.6` | 0.1-5 | Escala do ruído (tamanho das ondas) |
| `noiseIntensity` | `number` | `0.52` | 0-2 | Intensidade do movimento |
| `timeScale` | `number` | `1` | 0-2 | Escala de tempo |
| `focus` | `number` | `3.8` | 0.1-20 | Distância de foco (DOF) |
| `aperture` | `number` | `1.79` | 0-2 | Abertura (blur) |
| `pointSize` | `number` | `10.0` | 0.1-10 | Tamanho das partículas |
| `opacity` | `number` | `0.8` | 0-1 | Opacidade das partículas |
| `planeScale` | `number` | `10.0` | 0.1-10 | Escala do plano de partículas |
| `size` | `number` | `512` | 256/512/1024 | Resolução da textura (mais = mais partículas) |

## 🎨 Customização

### Alterar Cor de Fundo

No arquivo `components/gl/index.tsx`, altere:

```tsx
<color attach="background" args={["#000"]} /> // Preto
// Para:
<color attach="background" args={["#1a1a1a"]} /> // Cinza escuro
```

### Alterar Cor das Partículas

No arquivo `components/gl/shaders/pointMaterial.ts`, linha 118:

```glsl
// Branco
gl_FragColor = vec4(vec3(1.0), mix(alpha, sparkleBrightness - 1.1, uTransition));

// Azul
gl_FragColor = vec4(vec3(0.2, 0.5, 1.0), mix(alpha, sparkleBrightness - 1.1, uTransition));

// Gradiente baseado na posição
vec3 color = vec3(0.2, 0.5, 1.0) * (1.0 + vWorldPosition.y * 0.5);
gl_FragColor = vec4(color, mix(alpha, sparkleBrightness - 1.1, uTransition));
```

### Remover Controles Leva

Para produção, remova o `useControls` e use valores fixos:

```tsx
export const GL = ({ hovering }: { hovering: boolean }) => {
  // Remova useControls e use valores fixos
  return (
    <div id="webgl">
      <Canvas camera={{...}}>
        <Particles
          speed={1.0}
          aperture={1.79}
          focus={3.8}
          // ... outros valores fixos
        />
      </Canvas>
    </div>
  );
};
```

### Ajustar Animação de Reveal

No arquivo `components/gl/particles.tsx`, linha 52:

```tsx
const revealDuration = 3.5; // Duração em segundos
const revealFactor = easedProgress * 4.0; // Raio de expansão
```

## 🔧 Troubleshooting

### Erro: "Cannot read properties of undefined (reading 'call')"

**Solução:**
1. Certifique-se de que todos os arquivos têm `"use client"` no topo
2. Verifique se o `next.config.ts` tem a configuração do webpack
3. Limpe o cache: `rm -rf .next` e reinicie o servidor

### Erro: "Module not found: @react-three/fiber"

**Solução:**
```bash
npm install @react-three/fiber @react-three/drei three
```

### Performance Baixa

**Soluções:**
1. Reduza o `size` para 256 (menos partículas)
2. Reduza `pointSize`
3. Desabilite o Leva em produção
4. Use `React.memo` no componente GL

### Partículas Não Aparecem

**Verificações:**
1. Certifique-se de que o Canvas tem altura/largura definida
2. Verifique se `opacity` não está em 0
3. Verifique o console do navegador por erros WebGL

## 🏗️ Arquitetura Técnica

### Fluxo de Renderização

1. **SimulationMaterial**: Calcula as posições das partículas usando ruído periódico
2. **FBO (Frame Buffer Object)**: Armazena as posições calculadas em uma textura
3. **DofPointsMaterial**: Renderiza as partículas usando a textura de posições
4. **Reveal Animation**: Animação de entrada que expande do centro

### Shaders

- **periodicNoise**: Função GLSL que cria movimento ondulatório usando seno/cosseno
- **sparkleNoise**: Adiciona variação de brilho às partículas
- **DOF (Depth of Field)**: Efeito de desfoque baseado na distância da câmera

### Otimizações

- Uso de `useMemo` para materiais e geometrias
- Renderização em FBO para simulação eficiente
- Partículas renderizadas como pontos (não meshes individuais)
- Transparência otimizada com `depthWrite: false`

## 📝 Notas para IA/Desenvolvedores

### Para Implementação Automática

1. **Copiar todos os arquivos** da estrutura `components/gl/` mantendo a hierarquia
2. **Instalar dependências** listadas em Requisitos
3. **Configurar next.config.ts** com fallbacks do webpack
4. **Adicionar "use client"** em todos os componentes que usam hooks do React
5. **Verificar paths** - ajustar imports se necessário (`@/components` vs caminhos relativos)
6. **Testar em desenvolvimento** antes de produção
7. **Remover Leva** em produção se não necessário (melhor performance)

### Checklist de Implementação

- [ ] Dependências instaladas
- [ ] Arquivos copiados mantendo estrutura
- [ ] `next.config.ts` configurado
- [ ] `"use client"` adicionado nos componentes
- [ ] Imports ajustados (paths)
- [ ] Testado em desenvolvimento
- [ ] Performance verificada
- [ ] Leva removido/oculto em produção (opcional)

## 📄 Licença

MIT

## 🤝 Contribuindo

Este é um componente reutilizável. Sinta-se livre para adaptar e modificar conforme necessário para seus projetos.

---

**Versão:** 1.0.0
**Última Atualização:** 2025

