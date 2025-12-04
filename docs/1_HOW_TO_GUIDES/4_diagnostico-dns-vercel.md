# How-To: Diagnóstico e Solução de Problemas DNS na Vercel

Este guia ajuda a diagnosticar e resolver problemas quando o domínio não está acessível mesmo com o deployment funcionando na Vercel.

---

## 🔍 Sintomas Comuns

- ❌ Domínio retorna `ERR_CONNECTION_TIMED_OUT` ou `ERR_NAME_NOT_RESOLVED`
- ✅ Deployment na Vercel mostra status "Ready Latest"
- ✅ Domínio configurado corretamente na Vercel
- ❌ Site não carrega em múltiplos dispositivos/rede

---

## 🎯 Diagnóstico Passo a Passo

### 1. Verificar Status do Deployment

1. Acesse o dashboard da Vercel
2. Vá em **Deployments** → Selecione o deployment mais recente
3. Verifique:
   - ✅ Status: "Ready Latest"
   - ✅ Environment: "Production"
   - ✅ Domínios listados: `harryschlorke.com` deve aparecer

### 2. Verificar Configuração do Domínio

1. Na Vercel, vá em **Settings** → **Domains**
2. Clique no domínio `harryschlorke.com`
3. Verifique:
   - ✅ Status: "Valid Configuration"
   - ✅ Environment: "Production"
   - ✅ Nameservers: `ns1.vercel-dns.com` e `ns2.vercel-dns.com`

### 3. Verificar Registros DNS (CRÍTICO)

**⚠️ PROBLEMA MAIS COMUM:** Conflito entre registros ALIAS e A

Na página de DNS Records da Vercel, verifique:

#### ✅ Configuração CORRETA:

```
Registro 1: ALIAS (bloqueado) → cname.vercel-dns-017.com.
Registro 2: ALIAS (bloqueado) → d7ee59e1b00bb1d9.vercel-dns-017.com
Registro 3: CNAME www → cname.vercel-dns.com.
Registro 4: CAA (bloqueado) → 0 issue "letsencrypt.org"
```

#### ❌ Configuração INCORRETA (causa do problema):

```
Registro A: 216.198.79.1  ← REMOVER ESTE REGISTRO!
```

**Por que isso causa problema?**

- A Vercel gerencia automaticamente os registros ALIAS
- Ter um registro A manual junto com ALIAS causa conflito
- O DNS pode resolver para o IP do registro A, que pode estar incorreto ou desatualizado
- O registro A manual pode apontar para um IP que não está mais ativo

### 4. Verificar Propagação DNS

Use ferramentas online para verificar se o DNS propagou globalmente:

- [DNS Checker](https://dnschecker.org/#A/harryschlorke.com)
- [WhatsMyDNS](https://www.whatsmydns.net/#A/harryschlorke.com)

**O que verificar:**

- ✅ A maioria dos servidores deve retornar IPs da Vercel (não IPs antigos)
- ❌ Se muitos servidores ainda retornam IP antigo, aguarde propagação (até 48h)

### 5. Testar Resolução DNS Localmente

**Windows PowerShell:**

```powershell
# Testar resolução DNS
nslookup harryschlorke.com

# Testar com DNS específico (Cloudflare)
nslookup harryschlorke.com 1.1.1.1

# Testar apenas IPv4
nslookup -type=A harryschlorke.com 1.1.1.1
```

**Interpretação:**

**✅ Correto:**

```
Nome:    harryschlorke.com
Addresses:  76.76.21.21
          76.76.21.21
```

Ou qualquer IP da Vercel (geralmente começa com `76.76.x.x` ou similar)

**❌ Problema:**

```
Nome:    harryschlorke.com
Addresses:  212.85.6.183  ← IP antigo da Hostinger
```

Ou `ERR_CONNECTION_TIMED_OUT` ao tentar acessar

---

## 🔧 Soluções

### Solução 1: Remover Registro A Conflitante (RECOMENDADO)

**Se você vê um registro A manual na lista de DNS Records:**

1. Na Vercel, vá em **Settings** → **Domains** → `harryschlorke.com`
2. Clique em **DNS Records**
3. **Localize o registro A** (geralmente mostra IP como `216.198.79.1` ou similar)
4. Clique no menu (três pontos) → **Delete** ou **Remove**
5. **Confirme a remoção**

**Importante:** A Vercel gerencia automaticamente os registros ALIAS. Você NÃO precisa de um registro A manual.

### Solução 2: Verificar Nameservers

**Se o domínio foi transferido recentemente:**

1. Verifique se os nameservers estão corretos:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

2. Se os nameservers estiverem incorretos:
   - Na Vercel, vá em **Settings** → **Domains** → `harryschlorke.com`
   - Clique em **Nameservers**
   - Verifique se estão configurados para Vercel
   - Se não, atualize no seu registrador de domínio

### Solução 3: Limpar Cache DNS Local

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
```

### Solução 4: Usar DNS Público Temporariamente

Se o cache do seu provedor ainda está antigo:

1. **Alterar DNS do Windows:**
   - `Win + R` → `ncpa.cpl` → Enter
   - Clique com botão direito na conexão → **Propriedades**
   - **Protocolo IP Versão 4 (TCP/IPv4)** → **Propriedades**
   - Marque "Usar os seguintes endereços de servidor DNS"
   - DNS preferencial: `1.1.1.1` (Cloudflare)
   - DNS alternativo: `1.0.0.1` (Cloudflare)
   - OK → Fechar

2. **Limpar cache:**

   ```powershell
   ipconfig /flushdns
   ```

3. **Testar:**
   ```powershell
   nslookup harryschlorke.com
   ```

### Solução 5: Verificar Problema IPv6

Se após configurar DNS público ainda não funciona:

1. **Testar IPv4 especificamente:**

   ```powershell
   nslookup -type=A harryschlorke.com 1.1.1.1
   ```

2. **Se IPv4 funciona mas o navegador não:**
   - O Windows pode estar usando DNS IPv6 do provedor
   - **Solução:** Desabilitar IPv6 temporariamente:
     - Propriedades da conexão → Desmarque "Protocolo IP Versão 6 (TCP/IPv6)"
     - Reinicie a conexão

3. **Ou configurar DNS IPv6 também:**
   - Propriedades da conexão → **Protocolo IP Versão 6 (TCP/IPv6)** → Propriedades
   - DNS preferencial: `2606:4700:4700::1111` (Cloudflare IPv6)
   - DNS alternativo: `2606:4700:4700::1001`

### Solução 6: Aguardar Propagação DNS

Se você acabou de:

- Transferir o domínio
- Alterar nameservers
- Remover registros conflitantes

**A propagação DNS pode levar:**

- Mínimo: 5-15 minutos
- Típico: 1-4 horas
- Máximo: 24-48 horas

**Fatores que afetam:**

- TTL (Time To Live) dos registros DNS
- Cache de DNS do provedor
- Propagação global de DNS

---

## 📋 Checklist de Diagnóstico

Use este checklist para diagnosticar o problema:

- [ ] Deployment na Vercel está "Ready Latest"
- [ ] Domínio está configurado em "Production"
- [ ] Nameservers estão corretos (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
- [ ] **Não há registro A manual** (apenas ALIAS gerenciados pela Vercel)
- [ ] SSL Certificate está válido e ativo
- [ ] Limpei cache DNS local (`ipconfig /flushdns`)
- [ ] Limpei cache do navegador (`Ctrl + Shift + R`)
- [ ] Testei com DNS público (Cloudflare `1.1.1.1`)
- [ ] Verifiquei propagação DNS com ferramentas online
- [ ] Testei em modo anônimo/privado
- [ ] Aguardei pelo menos 1 hora após alterações

---

## 🚨 Problemas Específicos

### Problema: "ERR_CONNECTION_TIMED_OUT"

**Causas possíveis:**

1. Registro A apontando para IP incorreto
2. Cache DNS ainda apontando para IP antigo
3. Firewall/proxy bloqueando conexão
4. Problema de rede local

**Soluções:**

1. Remover registro A conflitante (Solução 1)
2. Limpar cache DNS (Solução 3)
3. Usar DNS público (Solução 4)
4. Verificar firewall/antivírus

### Problema: "ERR_NAME_NOT_RESOLVED"

**Causas possíveis:**

1. Nameservers incorretos
2. DNS não propagou ainda
3. Domínio não configurado na Vercel

**Soluções:**

1. Verificar nameservers (Solução 2)
2. Aguardar propagação (Solução 6)
3. Verificar configuração na Vercel

### Problema: Site funciona em alguns lugares, mas não em outros

**Causas possíveis:**

1. Propagação DNS parcial
2. Cache DNS diferente em diferentes redes
3. Problema de IPv6 vs IPv4

**Soluções:**

1. Aguardar propagação completa (Solução 6)
2. Verificar problema IPv6 (Solução 5)
3. Usar DNS público (Solução 4)

---

## 🔗 Recursos Úteis

- [Vercel DNS Documentation](https://vercel.com/docs/concepts/projects/domains)
- [DNS Checker](https://dnschecker.org/)
- [WhatsMyDNS](https://www.whatsmydns.net/)
- [Cloudflare DNS](https://1.1.1.1/)

---

## 📝 Notas Importantes

1. **A Vercel gerencia automaticamente os registros ALIAS** - Não adicione registros A manuais
2. **Registros bloqueados (lock icon)** são gerenciados pela Vercel - não remova
3. **Registros de email (MX, TXT, CNAME para email)** podem ser mantidos se você usa Hostinger para email
4. **Propagação DNS pode levar até 48 horas** - seja paciente após mudanças
5. **Cache DNS é persistente** - sempre limpe após alterações

---

**Última atualização:** 27 de Novembro de 2025
