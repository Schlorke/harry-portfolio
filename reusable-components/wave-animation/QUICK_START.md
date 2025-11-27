# Quick Start Guide - Wave Animation Component

Guia rápido para começar a usar o componente em 5 minutos.

## ⚡ Instalação Rápida

### 1. Instalar Dependências

```bash
npm install @react-three/fiber @react-three/drei three leva
```

### 2. Copiar Arquivos

Copie a pasta `src/components/gl` para `components/gl` no seu projeto.

### 3. Configurar Next.js

Adicione ao `next.config.ts`:

```typescript
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, path: false, crypto: false,
      stream: false, buffer: false, util: false, url: false,
    };
  }
  return config;
},
turbopack: {},
```

### 4. Usar

```tsx
"use client";
import { GL } from "@/components/gl";

export default function Page() {
  return (
    <div className="h-screen">
      <GL hovering={false} />
    </div>
  );
}
```

## ✅ Pronto!

Para mais detalhes, consulte:
- `README.md` - Documentação completa
- `IMPLEMENTATION_GUIDE.md` - Guia passo a passo
- `EXAMPLES.md` - Exemplos de uso
- `AI_INSTRUCTIONS.md` - Instruções para IA

