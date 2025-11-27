# Exemplos de Uso - Wave Animation Component

Este documento contém exemplos práticos de como usar o componente de animação de ondinha em diferentes cenários.

## 📚 Índice

- [Uso Básico](#uso-básico)
- [Com Interação](#com-interação)
- [Versão Simplificada (Sem Leva)](#versão-simplificada-sem-leva)
- [Com Conteúdo Sobreposto](#com-conteúdo-sobreposto)
- [Full Screen Background](#full-screen-background)
- [Em Seção Específica](#em-seção-específica)
- [Com Múltiplas Instâncias](#com-múltiplas-instancias)

## 🎯 Uso Básico

### Exemplo 1: Página Simples

```tsx
// app/page.tsx
"use client";

import { GL } from "@/components/gl";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <GL hovering={false} />
    </div>
  );
}
```

## 🖱️ Com Interação

### Exemplo 2: Hover Effect

```tsx
// app/page.tsx
"use client";

import { useState } from "react";
import { GL } from "@/components/gl";

export default function Home() {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="h-screen w-full">
      <GL hovering={hovering} />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <button
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition"
        >
          Hover para efeito especial
        </button>
      </div>
    </div>
  );
}
```

## ⚡ Versão Simplificada (Sem Leva)

Para produção, você pode criar uma versão sem os controles do Leva:

```tsx
// components/gl/SimpleGL.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Particles } from "./particles";

interface SimpleGLProps {
  hovering?: boolean;
  className?: string;
}

export const SimpleGL = ({ hovering = false, className = "" }: SimpleGLProps) => {
  return (
    <div id="webgl" className={className}>
      <Canvas
        camera={{
          position: [1.2629783123314589, 2.664606471394044, -1.8178993743288914],
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

**Uso:**

```tsx
import { SimpleGL } from "@/components/gl/SimpleGL";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <SimpleGL hovering={false} />
    </div>
  );
}
```

## 🎨 Com Conteúdo Sobreposto

### Exemplo 3: Hero Section

```tsx
// components/Hero.tsx
"use client";

import { useState } from "react";
import { GL } from "@/components/gl";

export function Hero() {
  const [hovering, setHovering] = useState(false);

  return (
    <section className="relative h-screen w-full flex flex-col justify-between">
      <GL hovering={hovering} />

      <div className="relative z-10 pb-16 mt-auto text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
          Bem-vindo
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
          Descrição do seu projeto aqui
        </p>
        <button
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition"
        >
          Começar
        </button>
      </div>
    </section>
  );
}
```

## 🖥️ Full Screen Background

### Exemplo 4: Background Fixo

```tsx
// app/layout.tsx ou app/page.tsx
"use client";

import { GL } from "@/components/gl";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Background fixo */}
      <div className="fixed inset-0 -z-10">
        <GL hovering={false} />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
```

## 📐 Em Seção Específica

### Exemplo 5: Seção com Altura Definida

```tsx
// components/WaveSection.tsx
"use client";

import { GL } from "@/components/gl";

export function WaveSection() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      <GL hovering={false} />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Título da Seção</h2>
          <p className="text-xl">Conteúdo da seção</p>
        </div>
      </div>
    </section>
  );
}
```

## 🔄 Com Múltiplas Instâncias

### Exemplo 6: Diferentes Configurações

```tsx
// components/CustomGL.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Particles } from "@/components/gl/particles";

interface CustomGLProps {
  hovering?: boolean;
  speed?: number;
  opacity?: number;
  pointSize?: number;
}

export const CustomGL = ({
  hovering = false,
  speed = 1.0,
  opacity = 0.8,
  pointSize = 10.0
}: CustomGLProps) => {
  return (
    <div id="webgl" className="w-full h-full">
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
          speed={speed}
          aperture={1.79}
          focus={3.8}
          size={512}
          noiseScale={0.6}
          noiseIntensity={0.52}
          timeScale={1}
          pointSize={pointSize}
          opacity={opacity}
          planeScale={10.0}
          introspect={hovering}
        />
      </Canvas>
    </div>
  );
};
```

**Uso com diferentes configurações:**

```tsx
export default function Home() {
  return (
    <div>
      {/* Seção 1 - Mais rápido */}
      <section className="h-screen">
        <CustomGL speed={1.5} opacity={0.9} />
      </section>

      {/* Seção 2 - Mais lento */}
      <section className="h-screen">
        <CustomGL speed={0.5} opacity={0.6} pointSize={8.0} />
      </section>
    </div>
  );
}
```

## 🎭 Com Animações de Entrada

### Exemplo 7: Fade In

```tsx
"use client";

import { useState, useEffect } from "react";
import { GL } from "@/components/gl";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-screen w-full">
      <div className={`transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <GL hovering={false} />
      </div>
    </div>
  );
}
```

## 🎨 Customização de Estilos

### Exemplo 8: Com Classes Tailwind

```tsx
"use client";

import { GL } from "@/components/gl";

export default function Home() {
  return (
    <div className="relative h-screen w-full">
      {/* Background com overlay */}
      <div className="absolute inset-0">
        <GL hovering={false} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-6xl">Conteúdo</h1>
      </div>
    </div>
  );
}
```

## 📱 Responsivo

### Exemplo 9: Ajuste para Mobile

```tsx
"use client";

import { GL } from "@/components/gl";

export default function Home() {
  return (
    <div className="relative h-screen w-full">
      {/* Ocultar em mobile se necessário */}
      <div className="hidden md:block absolute inset-0">
        <GL hovering={false} />
      </div>

      {/* Background alternativo para mobile */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900" />

      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-4xl md:text-6xl">Conteúdo</h1>
      </div>
    </div>
  );
}
```

## 🔧 Com Props Customizáveis

### Exemplo 10: Wrapper Component

```tsx
// components/WaveBackground.tsx
"use client";

import { GL } from "@/components/gl";

interface WaveBackgroundProps {
  children?: React.ReactNode;
  hovering?: boolean;
  className?: string;
}

export function WaveBackground({
  children,
  hovering = false,
  className = ""
}: WaveBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0">
        <GL hovering={hovering} />
      </div>
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}
```

**Uso:**

```tsx
import { WaveBackground } from "@/components/WaveBackground";

export default function Home() {
  return (
    <WaveBackground hovering={false} className="h-screen">
      <div className="flex items-center justify-center h-full">
        <h1 className="text-white text-6xl">Meu Conteúdo</h1>
      </div>
    </WaveBackground>
  );
}
```

---

Estes exemplos cobrem os casos de uso mais comuns. Adapte conforme necessário para seu projeto específico.

