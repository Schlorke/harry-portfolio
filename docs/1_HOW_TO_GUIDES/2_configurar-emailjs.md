# How-To: Configurar EmailJS

Este guia explica como configurar o EmailJS para que o formulário de contato do portfólio envie emails reais.

---

## 📋 O que é EmailJS?

EmailJS é um serviço que permite enviar emails diretamente do frontend, sem necessidade de um servidor backend. É
ideal para formulários de contato em sites estáticos ou SPAs.

---

## 🚀 Passo 1: Criar Conta no EmailJS

1. Acesse [emailjs.com](https://www.emailjs.com/)
2. Clique em "Sign Up Free"
3. Crie sua conta (pode usar Google, GitHub, etc.)

### Plano Gratuito

O plano gratuito inclui:

- 200 emails/mês
- 2 templates
- Suporte a anexos (até 50KB)

---

## 📧 Passo 2: Configurar Serviço de Email

1. No dashboard, vá em **"Email Services"**
2. Clique em **"Add New Service"**
3. Escolha seu provedor:
   - **Gmail** (recomendado para uso pessoal)
   - **Outlook**
   - **Yahoo**
   - **Custom SMTP**

### Configurar Gmail

1. Selecione "Gmail"
2. Clique em "Connect Account"
3. Autorize o EmailJS a enviar emails pela sua conta
4. Anote o **Service ID** (ex: `service_abc123`)

> **Nota:** Para Gmail, você pode precisar habilitar "Aplicativos menos seguros" ou criar uma senha de app.

---

## 📝 Passo 3: Criar Template de Email

1. Vá em **"Email Templates"**
2. Clique em **"Create New Template"**
3. Configure o template:

### Exemplo de Template

**Subject:**

```text
Nova mensagem do portfólio: {{subject}}
```

**Content:**

```html
<h2>Nova mensagem de contato</h2>

<p><strong>Nome:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Telefone:</strong> {{phone}}</p>
<p><strong>Assunto:</strong> {{subject}}</p>

<h3>Mensagem:</h3>
<p>{{message}}</p>

<hr />
<small>Enviado via formulário do portfólio</small>
```

1. Configure as opções:
   - **To Email:** Seu email pessoal
   - **From Name:** `{{from_name}}`
   - **Reply To:** `{{from_email}}`

1. Salve e anote o **Template ID** (ex: `template_xyz789`)

---

## 🔑 Passo 4: Obter Public Key

1. Vá em **"Account"** > **"General"**
2. Copie sua **Public Key** (ex: `user_AbCdEfGhIjKlMnOp`)

---

## ⚙️ Passo 5: Configurar no Projeto

### Criar arquivo `.env.local`

```env
# .env.local (na raiz do projeto)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_AbCdEfGhIjKlMnOp
```

> **Importante:** Nunca commite o arquivo `.env.local` no Git!

### Verificar `.gitignore`

Certifique-se de que `.env.local` está no `.gitignore`:

```gitignore
# .gitignore
.env.local
.env*.local
```

---

## 📤 Passo 6: Usar no Componente

O componente `Contact.tsx` já está configurado para usar EmailJS:

```tsx
// src/components/sections/Contact.tsx
import emailjs from '@emailjs/browser'

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )

    // Sucesso!
    setStatus('success')
  } catch (error) {
    // Erro
    setStatus('error')
  }
}
```

---

## 🧪 Passo 7: Testar

1. Execute o projeto:

   ```bash
   pnpm dev
   ```

2. Acesse o formulário de contato

3. Preencha todos os campos e envie

4. Verifique:
   - Mensagem de sucesso no formulário
   - Email recebido na sua caixa de entrada

---

## 🔧 Solução de Problemas

### Erro: "Service ID is required"

**Causa:** Variáveis de ambiente não configuradas.

**Solução:**

1. Verifique se `.env.local` existe
2. Verifique se os nomes das variáveis estão corretos
3. Reinicie o servidor de desenvolvimento

### Erro: "Invalid template"

**Causa:** Template ID incorreto ou variáveis não correspondem.

**Solução:**

1. Verifique o Template ID no dashboard EmailJS
2. Confirme que os nomes das variáveis no template correspondem ao código

### Email não chega

**Causa:** Possíveis filtros de spam ou limite excedido.

**Solução:**

1. Verifique a pasta de spam
2. Verifique o limite mensal no dashboard EmailJS
3. Teste com um email diferente

### CORS Error

**Causa:** Domínio não autorizado.

**Solução:**

1. No dashboard EmailJS, vá em "Account" > "Security"
2. Adicione seu domínio à lista de domínios autorizados:
   - `localhost` (desenvolvimento)
   - `seudominio.com` (produção)

---

## 🔒 Boas Práticas de Segurança

1. **Nunca exponha a Private Key** - Use apenas a Public Key no frontend
2. **Configure domínios autorizados** - Limite quais sites podem usar seu serviço
3. **Implemente rate limiting** - Evite spam no formulário
4. **Valide inputs** - Sempre valide dados antes de enviar

---

## 📊 Monitoramento

No dashboard EmailJS, você pode:

- Ver histórico de emails enviados
- Monitorar uso mensal
- Ver erros de envio
- Configurar webhooks (plano pago)

---

## 🔗 Links Úteis

- [Documentação EmailJS](https://www.emailjs.com/docs/)
- [EmailJS + React](https://www.emailjs.com/docs/examples/reactjs/)
- [Troubleshooting](https://www.emailjs.com/docs/faq/)

---

**Última atualização:** 26 de Novembro de 2025
