# Tutorial: Configuração do Ambiente de Desenvolvimento

Este tutorial guia você através da configuração completa do ambiente de desenvolvimento para o projeto Harry Portfolio.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recomendado) ou npm >= 9.0.0
- **Git** >= 2.30
- **VS Code** (recomendado) ou editor de sua preferência

### Verificar Instalações

```bash
# Verificar Node.js
node --version
# Esperado: v18.x.x ou superior

# Verificar pnpm
pnpm --version
# Esperado: 8.x.x ou superior

# Verificar Git
git --version
# Esperado: git version 2.30 ou superior
```

---

## 🚀 Passo 1: Clonar o Repositório

```bash
# Clone o repositório
git clone https://github.com/Schlorke/harry-portfolio.git

# Entre no diretório
cd harry-portfolio
```

---

## 📦 Passo 2: Instalar Dependências

O projeto usa **pnpm** como gerenciador de pacotes (recomendado):

```bash
# Instalar dependências com pnpm
pnpm install
```

Alternativamente, você pode usar npm:

```bash
# Se preferir npm
npm install
```

### O que é instalado

Após a instalação, você terá:

- **Next.js 14** - Framework React
- **React 18** - Biblioteca de UI
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 3** - Framework de estilização
- **ESLint & Prettier** - Ferramentas de qualidade de código
- **ScrollReveal** - Animações de scroll
- **EmailJS** - Envio de emails

---

## ⚙️ Passo 3: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# Criar arquivo de ambiente
touch .env.local
```

Adicione as seguintes variáveis (substitua pelos seus valores):

```env
# EmailJS Configuration (opcional para desenvolvimento)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key
```

> **Nota:** O formulário de contato funcionará sem essas variáveis, mas os emails não serão enviados.

---

## 🖥️ Passo 4: Executar o Servidor de Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
pnpm dev
```

O servidor estará disponível em: **<http://localhost:3000>**

### O que você deve ver

1. O terminal mostrará:

   ```text
   ▲ Next.js 14.2.15
   - Local:        http://localhost:3000
   - Environments: .env.local

   ✓ Ready in XXms
   ```

2. Abrindo o navegador em `http://localhost:3000`, você verá o portfólio com:
   - Header animado
   - Hero section com foto e informações
   - Galeria de projetos com vídeos
   - Formulário de contato

---

## 🧪 Passo 5: Verificar a Instalação

Execute os comandos de verificação para garantir que tudo está funcionando:

```bash
# Verificação de tipos TypeScript
pnpm type-check

# Lint do código
pnpm lint

# Verificar formatação
pnpm format:check
```

Se todos os comandos passarem sem erros, seu ambiente está configurado corretamente! ✅

---

## 📝 Passo 6: Configurar o Editor (VS Code)

### Extensões Recomendadas

Instale as seguintes extensões no VS Code:

1. **ESLint** - `dbaeumer.vscode-eslint`
2. **Prettier** - `esbenp.prettier-vscode`
3. **Tailwind CSS IntelliSense** - `bradlc.vscode-tailwindcss`
4. **Code Spell Checker** - `streetsidesoftware.code-spell-checker`
5. **Portuguese - Code Spell Checker** - `streetsidesoftware.code-spell-checker-portuguese-brazilian`

### Configurações Recomendadas

Adicione ao seu `settings.json` (VS Code):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [["tw-([\\w-]+)", ""]]
}
```

---

## 🔧 Comandos Úteis

| Comando            | Descrição                          |
| ------------------ | ---------------------------------- |
| `pnpm dev`         | Servidor de desenvolvimento        |
| `pnpm build`       | Build de produção                  |
| `pnpm start`       | Executar build de produção         |
| `pnpm type-check`  | Verificar tipos TypeScript         |
| `pnpm lint`        | Verificar problemas com ESLint     |
| `pnpm lint:fix`    | Corrigir problemas automaticamente |
| `pnpm format`      | Formatar código com Prettier       |
| `pnpm spell-check` | Verificação ortográfica            |

---

## ❓ Solução de Problemas

### Erro: "Module not found"

```bash
# Limpar cache e reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Erro: "Port 3000 is already in use"

```bash
# Encontrar processo usando a porta (Windows)
netstat -ano | findstr :3000

# Matar o processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F

# Ou simplesmente use outra porta
pnpm dev -- -p 3001
```

### Erro de TypeScript após atualização

```bash
# Limpar cache do TypeScript
rm -rf .next
pnpm type-check
```

---

## ✅ Próximos Passos

Agora que seu ambiente está configurado, você pode:

1. [Criar seu primeiro componente](./2_criando-componente.md)
2. Explorar a [estrutura do projeto](../2_REFERENCE/1_arquitetura.md)
3. Entender o [design system](../2_REFERENCE/5_design-system.md)

---

**Última atualização:** 26 de Novembro de 2025
