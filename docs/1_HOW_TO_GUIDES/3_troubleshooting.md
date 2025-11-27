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

### Site mostra versão antiga após transferência de domínio (Cache DNS)

**Causa:** Após transferir um domínio de um servidor para outro (ex: Hostinger → Vercel),
o cache DNS e do navegador pode manter a versão antiga.

**Sintomas:**

- Site mostra versão antiga em um dispositivo, mas versão nova em outro
- Acessando pelo celular funciona, mas no computador não
- DNS ainda apontando para o IP antigo

**Soluções (em ordem de prioridade):**

#### 1. Limpar Cache DNS do Sistema Operacional

**Windows:**

```powershell
# Abrir PowerShell como Administrador
ipconfig /flushdns
```

**macOS:**

```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

**Linux:**

```bash
sudo systemd-resolve --flush-caches
# ou
sudo service network-manager restart
```

#### 2. Limpar Cache do Navegador

**Chrome/Edge:**

- `Ctrl + Shift + Delete` → Marcar "Imagens e arquivos em cache" → Limpar
- Ou `Ctrl + Shift + R` (hard refresh)
- Ou DevTools (F12) → Network → Marcar "Disable cache"

**Firefox:**

- `Ctrl + Shift + Delete` → Marcar "Cache" → Limpar
- Ou `Ctrl + F5` (hard refresh)

#### 3. Verificar Propagação DNS

Use ferramentas online para verificar se o DNS já propagou:

- [DNS Checker](https://dnschecker.org/) - Verifica propagação global
- [WhatsMyDNS](https://www.whatsmydns.net/) - Verifica DNS em múltiplos locais

**Comando no terminal:**

```powershell
# Windows PowerShell
nslookup harryschlorke.com
```

**Como interpretar o resultado:**

**✅ Correto (DNS propagado):**

```text
Nome:    harryschlorke.com
Addresses:  216.198.79.1
```

Ou qualquer IP da Vercel (não `212.85.6.183`)

**❌ Problema (DNS ainda não propagou):**

```text
Nome:    harryschlorke.com
Addresses:  212.85.6.183
```

Este é o IP antigo da Hostinger. Significa que o DNS do seu provedor ainda está em cache.

**O que verificar:**

- Se o IP retornado é da Vercel (não da Hostinger)
- Se os nameservers estão corretos (ex: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
- Se o registro A ou ALIAS aponta para o IP correto da Vercel

**Nota:** Se você vê o IP antigo (`212.85.6.183`), use DNS público (passo 6) para contornar o cache do seu provedor.

#### 4. Aguardar Propagação DNS

A propagação DNS pode levar de **alguns minutos até 48 horas**, dependendo do TTL
(Time To Live) configurado.

**TTL típicos:**

- 60 segundos (rápido, mas mais requisições DNS)
- 3600 segundos (1 hora, balanceado)
- 86400 segundos (24 horas, comum)

**Dica:** Se você acabou de transferir o domínio, aguarde algumas horas antes de se preocupar.

#### 5. Verificar Configuração na Vercel

1. Acesse o dashboard da Vercel
2. Vá em **Settings** → **Domains**
3. Verifique se o domínio está configurado corretamente
4. Verifique se o projeto está deployado e ativo

##### ⚠️ IMPORTANTE: Verificar Registros DNS Conflitantes

Se você copiou registros DNS da Hostinger para a Vercel, pode haver conflitos:

1. **Na Vercel, vá em Settings → Domains → DNS**
2. **Verifique se há algum registro A apontando para IP da Hostinger:**
   - ❌ **REMOVER:** Qualquer registro A com valor `212.85.6.183` ou outro IP da Hostinger
   - ✅ **MANTER:** Apenas registros ALIAS/CNAME gerenciados pela Vercel
3. **Verifique registros duplicados:**
   - Não deve haver múltiplos registros A ou ALIAS para o domínio raiz
   - A Vercel geralmente cria automaticamente um ALIAS record
4. **Registros de email (se ainda usar Hostinger para email):**
   - ✅ **MANTER:** MX records apontando para `mx1.hostinger.com` e `mx2.hostinger.com`
   - ✅ **MANTER:** TXT records (SPF, DMARC) relacionados a email
   - ❌ **REMOVER:** Qualquer registro A ou CNAME que aponte para IP/servidor da Hostinger

**Registros corretos na Vercel devem ser:**

- ALIAS record (domínio raiz) → Gerenciado automaticamente pela Vercel
- CNAME `www` → `cname.vercel-dns.com.` ou similar
- Registros de email (se necessário): MX, TXT (SPF, DMARC), CNAME (DKIM)

#### 6. Usar DNS Público (Solução Rápida)

Se o `nslookup` ainda mostra o IP antigo (ex: `212.85.6.183` da Hostinger),
seu provedor de internet ainda está usando cache antigo.

##### Solução: Alterar DNS do Windows temporariamente

1. Abrir Configurações de Rede:
   - `Win + R` → Digite `ncpa.cpl` → Enter
   - Ou: Configurações → Rede e Internet → Status → Alterar opções do adaptador

2. **Alterar DNS:**
   - Clique com botão direito na sua conexão ativa (Wi-Fi ou Ethernet)
   - Propriedades → Protocolo IP Versão 4 (TCP/IPv4) → Propriedades
   - Marque "Usar os seguintes endereços de servidor DNS"
   - DNS preferencial: `8.8.8.8` (Google)
   - DNS alternativo: `1.1.1.1` (Cloudflare)
   - OK → Fechar

3. **Limpar cache novamente:**

   ```powershell
   ipconfig /flushdns
   ```

4. **Testar novamente:**

   ```powershell
   nslookup harryschlorke.com
   ```

   Agora deve mostrar o IP da Vercel (`216.198.79.1` ou similar)

5. **Reverter depois (opcional):**
   - Volte para "Obter endereço do servidor DNS automaticamente" quando o DNS propagar

**DNS públicos recomendados:**

- Google: `8.8.8.8` e `8.8.4.4`
- Cloudflare: `1.1.1.1` e `1.0.0.1` (recomendado - mais rápido e privado)
- Quad9: `9.9.9.9` e `149.112.112.112`

##### ⚠️ Problema comum: Windows usando DNS IPv6 do provedor

Se após configurar DNS público o `nslookup` ainda mostra IP antigo:

1. Verifique se está usando IPv6:

   ```powershell
   nslookup -type=A harryschlorke.com 1.1.1.1
   ```

   Se este comando retorna IP correto, o problema é IPv6.

2. Solução: Desabilitar IPv6 temporariamente:
   - Propriedades da conexão → Desmarque "Protocolo IP Versão 6 (TCP/IPv6)"
   - Reinicie a conexão (Desabilitar → Habilitar)
   - Teste novamente: `nslookup harryschlorke.com`

3. Alternativa: Configurar DNS IPv6 também:
   - Propriedades da conexão → Protocolo IP Versão 6 (TCP/IPv6) → Propriedades
   - DNS preferencial: `2606:4700:4700::1111` (Cloudflare IPv6)
   - DNS alternativo: `2606:4700:4700::1001` (Cloudflare IPv6 secundário)

#### 7. Limpar Cache do ISP (Provedor de Internet)

Se nada funcionar, pode ser cache do seu provedor de internet:

- Reiniciar o roteador/modem
- Aguardar algumas horas para o cache expirar (TTL de 60 segundos ajuda)

#### 8. Testar em Modo Anônimo/Privado

Abra o site em uma janela anônima/privada para verificar se é cache do navegador:

- Chrome/Edge: `Ctrl + Shift + N`
- Firefox: `Ctrl + Shift + P`

**Se funcionar em modo anônimo:** É cache do navegador → Limpar cache (passo 2)

**Se não funcionar:** É cache DNS → Seguir passos 1, 3 e 4

---

### Checklist para Problemas de Cache DNS

- [ ] Limpei o cache DNS do sistema operacional
- [ ] Limpei o cache do navegador
- [ ] Verifiquei a propagação DNS com ferramentas online
- [ ] Verifiquei os nameservers na Vercel
- [ ] Testei em modo anônimo/privado
- [ ] Aguardei pelo menos 1 hora após a transferência
- [ ] Reiniciei o roteador/modem
- [ ] Verifiquei se o projeto está deployado na Vercel

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
