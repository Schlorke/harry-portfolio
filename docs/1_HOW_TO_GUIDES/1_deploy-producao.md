# How-To: Deploy em Produção

Este guia explica como fazer o deploy do Harry Portfolio para diferentes plataformas.

---

## 📋 Pré-requisitos

Antes do deploy, certifique-se de que:

1. O build local funciona sem erros:

   ```bash
   pnpm build
   ```

2. Todos os testes passam:

   ```bash
   pnpm type-check
   pnpm lint
   ```

3. As variáveis de ambiente estão configuradas (EmailJS, etc.)

---

## 🚀 Opção 1: Vercel (Recomendado)

A Vercel é a plataforma oficial do Next.js e oferece a melhor experiência.

### Deploy Automático via Git

1. **Conecte seu repositório:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Import Project"
   - Selecione seu repositório GitHub

2. **Configure o projeto:**
   - Framework Preset: `Next.js` (detectado automaticamente)
   - Build Command: `pnpm build` (ou deixe o padrão)
   - Output Directory: `.next` (padrão do Next.js)

3. **Adicione variáveis de ambiente:**
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

4. **Deploy:**
   - Clique em "Deploy"
   - Cada push para `main` fará deploy automaticamente

### Deploy Manual via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (preview)
vercel

# Deploy para produção
vercel --prod
```

---

## 🌐 Opção 2: GitHub Pages (Estático)

Para deploy estático no GitHub Pages, é necessário exportar o projeto.

### Configurar Export Estático

1. **Atualize `next.config.mjs`:**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Habilita export estático
  trailingSlash: true,
  images: {
    unoptimized: true // Necessário para export estático
  },
  basePath: '/harry-portfolio', // Nome do repositório
  assetPrefix: '/harry-portfolio/'
}

export default nextConfig
```

1. **Build e Export:**

```bash
pnpm build
```

Os arquivos serão gerados em `out/`.

1. **Deploy para GitHub Pages:**

```bash
# Instalar gh-pages
pnpm add -D gh-pages

# Adicionar script ao package.json
# "deploy": "next build && touch out/.nojekyll && gh-pages -d out"

# Executar deploy
pnpm deploy
```

### Configurar GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

---

## ☁️ Opção 3: Netlify

### Deploy via Interface Web

1. Acesse [netlify.com](https://netlify.com)
2. Clique em "New site from Git"
3. Conecte seu repositório
4. Configure:
   - Build command: `pnpm build`
   - Publish directory: `.next`

### Deploy via CLI

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy para preview
netlify deploy

# Deploy para produção
netlify deploy --prod
```

### Configurar `netlify.toml`

```toml
[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## 🐳 Opção 4: Docker

### Criar Dockerfile

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Instalar dependências
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm build

# Produção
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build e Run

```bash
# Build da imagem
docker build -t harry-portfolio .

# Executar container
docker run -p 3000:3000 harry-portfolio
```

---

## 📊 Checklist Pré-Deploy

- [ ] `pnpm build` executa sem erros
- [ ] `pnpm type-check` passa
- [ ] `pnpm lint` passa
- [ ] Variáveis de ambiente configuradas
- [ ] Imagens otimizadas
- [ ] Meta tags de SEO configuradas
- [ ] Favicon e manifest configurados
- [ ] robots.txt e sitemap.xml presentes
- [ ] Testado em diferentes navegadores

---

## 🔧 Solução de Problemas

### Build Falha na Vercel

```bash
# Verificar logs de build na dashboard Vercel
# Comum: dependências faltando ou versão do Node incorreta
```

### Imagens Não Carregam no GitHub Pages

```javascript
// Verificar se basePath está configurado
// next.config.mjs
basePath: '/nome-do-repo'
```

### 404 em Rotas no Netlify

```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🔗 Links Úteis

- [Documentação Vercel + Next.js](https://vercel.com/docs/frameworks/nextjs)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Netlify + Next.js](https://docs.netlify.com/integrations/frameworks/next-js/overview/)

---

**Última atualização:** 26 de Novembro de 2025
