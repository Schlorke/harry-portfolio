# How-To: Troubleshooting - Erros Comuns

Este guia lista os erros mais comuns durante o desenvolvimento e suas soluções.

---

## 🔴 Erros de Build

### "Module not found: Can't resolve..."

**Causa:** Dependência não instalada ou caminho incorreto.

**Solução:**

```bash
# Reinstalar dependências
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Verificar se o módulo existe
pnpm list <nome-do-modulo>
```

**Se for um import local:**

```tsx
// ❌ Errado
import { Project } from 'types'

// ✅ Correto
import { Project } from '../types'
// ou
import { Project } from '@/types'
```

---

### "Type error: Property 'X' does not exist..."

**Causa:** Tipagem incorreta ou propriedade ausente.

**Solução:**

```tsx
// Verificar a interface
interface Project {
  name: string
  description: string
  // Falta a propriedade que você está tentando acessar?
}

// Adicionar verificação de existência
if (project.optionalProp) {
  // usar project.optionalProp
}
```

---

### "SyntaxError: Unexpected token '<'"

**Causa:** Arquivo JSX/TSX sendo interpretado como JS/TS.

**Solução:**

1. Verifique a extensão do arquivo (deve ser `.tsx` para JSX)
2. Verifique se o `tsconfig.json` está correto:

   ```json
   {
     "compilerOptions": {
       "jsx": "preserve"
     }
   }
   ```

---

## 🟡 Erros de Runtime

### "Hydration failed because the initial UI does not match..."

**Causa:** Diferença entre o HTML renderizado no servidor e no cliente.

**Soluções:**

1. **Mover lógica de client para useEffect:**

```tsx
// ❌ Causa hydration mismatch
const Component = () => {
  const isMobile = window.innerWidth < 768 // window não existe no servidor
  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>
}

// ✅ Correto
const Component = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>
}
```

1. **Usar dynamic import com ssr: false:**

```tsx
import dynamic from 'next/dynamic'

const ClientOnlyComponent = dynamic(() => import('../components/ClientOnly'), {
  ssr: false
})
```

1. **Verificar datas/horários:**

```tsx
// ❌ Gera timestamps diferentes
const time = new Date().toLocaleString()

// ✅ Renderizar apenas no cliente
const [time, setTime] = useState('')
useEffect(() => {
  setTime(new Date().toLocaleString())
}, [])
```

---

### "useEffect is called conditionally..."

**Causa:** Hook chamado dentro de condição ou loop.

**Solução:**

```tsx
// ❌ Errado
const Component = ({ show }) => {
  if (show) {
    useEffect(() => {
      /* ... */
    }, []) // Hook condicional
  }
}

// ✅ Correto
const Component = ({ show }) => {
  useEffect(() => {
    if (show) {
      // Lógica condicional DENTRO do hook
    }
  }, [show])
}
```

---

### "Cannot read properties of undefined (reading 'map')"

**Causa:** Tentando iterar sobre undefined/null.

**Solução:**

```tsx
// ❌ Pode falhar
{
  projects.map(p => <Card key={p.id} project={p} />)
}

// ✅ Com verificação
{
  projects?.map(p => <Card key={p.id} project={p} />)
}

// ✅ Com fallback
{
  ;(projects || []).map(p => <Card key={p.id} project={p} />)
}

// ✅ Com early return
if (!projects || projects.length === 0) {
  return <div>Nenhum projeto encontrado</div>
}
```

---

## 🟠 Erros de Estilo

### Tailwind classes não funcionam

**Causa:** Prefixo não utilizado ou classe não existe.

**Solução:**

```tsx
// ❌ Sem prefixo (não funciona neste projeto)
<div className="flex items-center">

// ✅ Com prefixo tw-
<div className="tw-flex tw-items-center">
```

**Verificar se o arquivo está no content do Tailwind:**

```javascript
// tailwind.config.js
content: [
  './src/app/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}'
]
```

---

### Variáveis CSS não aplicadas

**Causa:** Variável não definida ou escopo incorreto.

**Solução:**

```css
/* Verificar se a variável existe em :root */
:root {
  --first-color: hsl(358, 80%, 49%);
}

/* Usar corretamente */
.element {
  color: var(--first-color);
  /* Com fallback */
  color: var(--first-color, red);
}
```

---

### Estilos não atualizam (cache)

**Solução:**

```bash
# Limpar cache do Next.js
rm -rf .next

# Reiniciar servidor
pnpm dev
```

**No navegador:**

- `Ctrl + Shift + R` (hard refresh)
- Ou abra DevTools > Network > "Disable cache"

---

## 🔵 Erros de Next.js

### "Error: Image with src 'X' must use 'width' and 'height' properties..."

**Causa:** Componente Image requer dimensões.

**Solução:**

```tsx
// ❌ Sem dimensões
<Image src="/image.png" alt="..." />

// ✅ Com dimensões explícitas
<Image src="/image.png" alt="..." width={300} height={200} />

// ✅ Ou com fill (precisa de container posicionado)
<div style={{ position: 'relative', width: '100%', height: 200 }}>
  <Image src="/image.png" alt="..." fill style={{ objectFit: 'cover' }} />
</div>
```

---

### "Error: Invalid src prop on `next/image`..."

**Causa:** Imagem externa não configurada.

**Solução:**

```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'exemplo.com',
        pathname: '/images/**'
      }
    ]
  }
}
```

---

### 404 em rotas dinâmicas após build

**Causa:** Rotas não geradas estaticamente.

**Solução:**

```tsx
// Gerar parâmetros estáticos
export async function generateStaticParams() {
  return [{ slug: 'project-1' }, { slug: 'project-2' }]
}
```

---

## 🟣 Erros de TypeScript

### "Argument of type 'X' is not assignable to parameter of type 'Y'"

**Solução:**

```tsx
// Verificar tipos esperados
interface Props {
  onClick: (id: number) => void  // Espera number
}

// ❌ Passando string
<Component onClick={(id: string) => {}} />

// ✅ Tipo correto
<Component onClick={(id: number) => {}} />
```

---

### "'X' is possibly 'undefined'"

**Solução:**

```tsx
// ❌ TypeScript reclama
const value = obj.prop.nested // obj.prop pode ser undefined

// ✅ Optional chaining
const value = obj?.prop?.nested

// ✅ Asserção (quando você tem certeza)
const value = obj!.prop!.nested

// ✅ Verificação explícita
if (obj.prop) {
  const value = obj.prop.nested
}
```

---

## 🧹 Comandos de Limpeza

Quando nada mais funciona, tente limpar completamente:

```bash
# Limpar tudo
rm -rf node_modules .next pnpm-lock.yaml

# Reinstalar
pnpm install

# Rebuild
pnpm build

# Testar
pnpm dev
```

---

## 📝 Checklist de Debug

- [ ] O erro aparece no terminal ou no console do navegador?
- [ ] O erro ocorre em dev ou apenas em build?
- [ ] Você verificou o arquivo correto?
- [ ] As dependências estão instaladas?
- [ ] Você reiniciou o servidor após mudanças em config?
- [ ] O cache foi limpo?

---

## 🔗 Recursos Adicionais

- [Next.js Error Reference](https://nextjs.org/docs/messages)
- [TypeScript Error Messages](https://typescript.tv/errors/)
- [React Hydration Errors](https://react.dev/link/hydration-mismatch)

---

**Última atualização:** 26 de Novembro de 2025
