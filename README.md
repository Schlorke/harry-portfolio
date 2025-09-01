# Harry Schlorke - Portfolio

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://semver.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/Schlorke/harry-portfolio)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> **Portfólio profissional moderno e responsivo desenvolvido com as mais recentes tecnologias web, focado em performance, acessibilidade e experiência do usuário.**

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Demonstração](#demonstração)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Uso](#uso)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração](#configuração)
- [Deploy](#deploy)
- [Contribuindo](#contribuindo)
- [Suporte](#suporte)
- [Licença](#licença)
- [Contato](#contato)

## 🎯 Sobre o Projeto

Este portfólio foi desenvolvido com o objetivo de apresentar minhas habilidades técnicas, criatividade e capacidade de entregar soluções web robustas e escaláveis. Toda a aplicação é responsiva, com foco em performance, usabilidade e acessibilidade.

### Principais Características

- ✨ **Design Moderno**: Interface limpa e minimalista
- 📱 **Totalmente Responsivo**: Adaptado para todos os dispositivos
- ⚡ **Alta Performance**: Otimizado para velocidade e SEO
- 🎨 **Animações Suaves**: Experiência visual envolvente
- 🔧 **PWA Ready**: Configurado como Progressive Web App
- 🌐 **Cross-browser**: Compatível com todos os navegadores modernos
- ♿ **Acessível**: Seguindo diretrizes WCAG 2.1

## 🚀 Demonstração

**🔗 [Ver Portfolio Online](https://schlorke.github.io/harry-portfolio/)**

### Screenshots

<div align="center">

![Portfolio Preview](public/assets/img/harry-meta.jpg)

</div>

## 🛠️ Tecnologias

### Core Technologies

- **[Vite 7.1.3](https://vitejs.dev/)** - Build tool e desenvolvimento
- **[Vanilla JavaScript ES6+](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - Lógica da aplicação
- **[HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)** - Estrutura semântica
- **[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)** - Estilização avançada

### Libraries & APIs

- **[ScrollReveal 4.0.9](https://scrollrevealjs.org/)** - Animações on scroll
- **[EmailJS](https://www.emailjs.com/)** - Envio de emails via frontend
- **[RemixIcon](https://remixicon.com/)** - Ícones vetoriais

### Development Tools

- **[ESLint 9.34.0](https://eslint.org/)** - Linting de código
- **[Prettier 3.6.2](https://prettier.io/)** - Formatação de código
- **[CSpell](https://streetsidesoftware.github.io/cspell/)** - Verificação ortográfica
- **[GitHub Pages](https://pages.github.com/)** - Deploy automático

### Fonts & Assets

- **[Google Fonts](https://fonts.google.com/)** - Tipografia (Poppins, Alegreya Sans SC)
- **Otimização de imagens** - WebP, lazy loading
- **Vídeos otimizados** - MP4 comprimidos para demonstrações

## ✨ Funcionalidades

### Interface

- [x] Design responsivo mobile-first
- [x] Animações fluidas com ScrollReveal
- [x] Tema escuro otimizado
- [x] Navegação suave entre seções
- [x] Loading states e feedback visual

### Progressive Web App

- [x] Manifest configurado
- [x] Service Worker (futuro)
- [x] Ícones para todas as plataformas
- [x] Otimização offline (planejado)

### Performance

- [x] Lazy loading de imagens e vídeos
- [x] Compressão de assets
- [x] CSS e JS minificados
- [x] Preload de recursos críticos
- [x] Otimização de Core Web Vitals

### Funcionalidades Interativas

- [x] Formulário de contato funcional
- [x] Validação client-side
- [x] Integração com EmailJS
- [x] Feedback de sucesso/erro
- [x] Botões de ação flutuantes

## 🚀 Instalação

### Pré-requisitos

```bash
Node.js >= 18.0.0
npm >= 9.0.0 ou pnpm >= 8.0.0
```

### Clone o repositório

```bash
git clone https://github.com/Schlorke/harry-portfolio.git
cd harry-portfolio
```

### Instale as dependências

```bash
# Usando pnpm (recomendado)
pnpm install

# Usando npm
npm install

# Usando yarn
yarn install
```

## 💻 Uso

### Desenvolvimento

```bash
# Inicia servidor de desenvolvimento
pnpm dev

# Servidor será executado em http://localhost:5173
```

### Build de Produção

```bash
# Gera build otimizado
pnpm build

# Preview do build
pnpm preview
```

## 📜 Scripts Disponíveis

| Comando             | Descrição                          |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | Inicia servidor de desenvolvimento |
| `pnpm build`        | Gera build de produção             |
| `pnpm preview`      | Preview do build local             |
| `pnpm lint`         | Executa ESLint com correção        |
| `pnpm lint:check`   | Verifica problemas sem corrigir    |
| `pnpm format`       | Formata código com Prettier        |
| `pnpm format:check` | Verifica formatação                |
| `pnpm spell-check`  | Verificação ortográfica            |
| `pnpm deploy`       | Deploy para GitHub Pages           |

### Scripts Específicos

```bash
# Formatação por tipo de arquivo
pnpm format:js    # Apenas JavaScript
pnpm format:css   # Apenas CSS
pnpm format:html  # Apenas HTML
pnpm format:md    # Apenas Markdown
```

## 📁 Estrutura do Projeto

```text
harry-portfolio/
├── 📁 public/                    # Assets estáticos
│   ├── 📁 assets/
│   │   ├── 📁 img/              # Imagens, ícones, favicons
│   │   ├── 📁 videos/           # Vídeos de demonstração
│   │   └── 📁 pdf/              # Documentos (currículo)
│   ├── robots.txt               # SEO crawlers
│   └── sitemap.xml              # Mapa do site
├── 📁 src/                      # Código fonte
│   ├── index.html               # HTML principal
│   ├── main.js                  # JavaScript principal
│   └── styles.css               # Estilos globais
├── 📁 docs/                     # Documentação
├── 📁 .vscode/                  # Configurações VS Code
├── 📄 package.json              # Dependências e scripts
├── 📄 vite.config.js            # Configuração Vite
├── 📄 eslint.config.js          # Configuração ESLint
├── 📄 cspell.json               # Configuração spell check
├── 📄 CHANGELOG.md              # Histórico de mudanças
├── 📄 CONTRIBUTING.md           # Guia de contribuição
└── 📄 README.md                 # Documentação principal
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Google Analytics (opcional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Configuração do EmailJS

1. Crie uma conta em [EmailJS](https://www.emailjs.com/)
2. Configure um serviço de email
3. Crie um template de email
4. Adicione as credenciais no arquivo `.env`

### PWA Configuration

O manifest está configurado em `public/assets/img/site.webmanifest`:

```json
{
  "name": "Harry Schlorke",
  "short_name": "H.Schlorke",
  "theme_color": "#ff0303",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

## 🚀 Deploy

### GitHub Pages (Automático)

```bash
# Deploy para GitHub Pages
pnpm deploy
```

### Outros Provedores

#### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify

```bash
# Build
pnpm build

# Deploy manual via Netlify Dashboard
# Ou usar Netlify CLI
netlify deploy --prod --dir=dist
```

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Veja [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes.

### Quick Start para Contribuidores

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Code Quality

```bash
# Antes de commitar, execute:
pnpm lint          # Verificar código
pnpm format        # Formatar código
pnpm spell-check   # Verificar ortografia
pnpm build         # Testar build
```

## 📊 Performance

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Métricas de Build

- **Bundle Size**: ~30KB (gzipped)
- **Images**: Otimizadas WebP
- **Videos**: Comprimidos H.264
- **CSS**: Minificado e purificado

## 🛡️ Suporte

### Navegadores Suportados

| Browser | Versão |
| ------- | ------ |
| Chrome  | >= 88  |
| Firefox | >= 85  |
| Safari  | >= 14  |
| Edge    | >= 88  |

### Resolução de Problemas

#### Build Falha

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
pnpm install
```

#### Problemas de CORS (EmailJS)

- Verifique as configurações de domínio no painel EmailJS
- Certifique-se que o domínio está autorizado

#### Permissions Policy Violations

Se você vir erros como `[Violation] Permissions policy violation: unload is not allowed`:

```bash
# Esses erros são causados por extensões do navegador
# Para resolvê-los:

# 1. Desabilite extensões desnecessárias
# 2. Use modo incógnito para testes
# 3. Ou ignore - não afetam a funcionalidade do site
```

**Nota**: Esses erros são normais em desenvolvimento e não afetam o site em produção.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

```text
MIT License

Copyright (c) 2024 Harry Schlorke

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 📞 Contato

**Harry Schlorke** - Desenvolvedor Full-Stack

- 🌐 **Portfolio**: [schlorke.github.io/harry-portfolio](https://schlorke.github.io/harry-portfolio/)
- 📧 **Email**: [harryschlorke@gmail.com](mailto:harryschlorke@gmail.com)
- 💼 **LinkedIn**: [linkedin.com/in/harryschlorke](https://linkedin.com/in/harryschlorke)
- 🐱 **GitHub**: [@Schlorke](https://github.com/Schlorke)
- 📱 **WhatsApp**: [+55 51 99815-8015](https://wa.me/5551998158015?text=Olá!%20Vim%20através%20do%20seu%20portfólio%20no%20GitHub.)

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

Desenvolvido com ❤️ em Porto Alegre, Brasil

</div>
