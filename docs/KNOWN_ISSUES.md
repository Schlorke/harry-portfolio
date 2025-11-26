# Known Issues (Erros Conhecidos)

Este documento rastreia bugs conhecidos, seus impactos e possíveis soluções de contorno.
Mantenha este arquivo atualizado para acelerar a depuração e o desenvolvimento.

---

## Permissions Policy Violations no Console

- **ID da Issue:** N/A (Comportamento de extensões de navegador)
- **Severidade:** Baixa
- **Status:** Solução de Contorno Disponível
- **Versões Afetadas:** Todas
- **Data do Relato:** 2024-12-19
- **Última Atualização:** 2025-11-26

### Descrição

Erros como `[Violation] Permissions policy violation: unload is not allowed` aparecem no console do navegador durante o desenvolvimento.

### Passos para Reproduzir

1. Execute `pnpm dev`
2. Abra o navegador com extensões instaladas (especialmente extensões de segurança ou bloqueadores)
3. Abra o DevTools e observe o console

### Comportamento Esperado

Nenhum erro de violations no console.

### Comportamento Atual

Múltiplos erros de "Permissions policy violation" aparecem no console.

### Solução de Contorno (Workaround)

Esses erros são causados por **extensões do navegador**, não pelo código do projeto. Para resolver:

1. Use o modo incógnito para testes (extensões desabilitadas)
2. Desabilite extensões desnecessárias durante o desenvolvimento
3. **Ignore esses erros** - eles não afetam a funcionalidade do site em produção

### Notas Adicionais

Este é um comportamento comum e não representa um bug no código do projeto.

---

## Autoplay de Vídeo em iOS Safari

- **ID da Issue:** N/A
- **Severidade:** Média
- **Status:** Solução de Contorno Implementada
- **Versões Afetadas:** Todas
- **Data do Relato:** 2024-12-19
- **Última Atualização:** 2025-11-26

### Descrição

O iOS Safari tem políticas restritivas de autoplay para vídeos, exigindo interação do usuário antes de reproduzir mídia.

### Passos para Reproduzir

1. Acesse o portfólio em um dispositivo iOS
2. Role até a seção de projetos
3. O vídeo pode não iniciar automaticamente na primeira visualização

### Comportamento Esperado

Vídeos devem reproduzir automaticamente ao entrar na viewport.

### Comportamento Atual

Na primeira visita, vídeos podem não reproduzir até que haja interação com a página.

### Solução de Contorno (Workaround)

O componente `ProjectCard.tsx` implementa um sistema de "desbloqueio" de autoplay:

```tsx
// Desbloquear autoplay em iOS
const unlockAutoplay = () => {
  video
    .play()
    .then(() => {
      video.pause()
      video.currentTime = 0
    })
    .catch(() => {})

  document.removeEventListener('touchstart', unlockAutoplay)
  document.removeEventListener('click', unlockAutoplay)
}

document.addEventListener('touchstart', unlockAutoplay)
document.addEventListener('click', unlockAutoplay)
```

Após qualquer toque/clique na página, o autoplay funciona normalmente.

### Notas Adicionais

Esta é uma limitação do iOS Safari, não do código. A solução implementada é a melhor prática recomendada pela Apple.

---

## ScrollReveal com Strict Mode

- **ID da Issue:** N/A
- **Severidade:** Baixa
- **Status:** Resolvido
- **Versões Afetadas:** 1.x
- **Data do Relato:** 2024-12-19
- **Última Atualização:** 2025-11-26

### Descrição

O React Strict Mode causa execução dupla de useEffect em desenvolvimento, o que pode causar comportamento inesperado
com ScrollReveal.

### Comportamento Esperado

Animações ScrollReveal devem executar apenas uma vez por elemento.

### Comportamento Atual

Em desenvolvimento, animações podem parecer "piscar" ou executar duas vezes.

### Solução

O hook `useScrollReveal.ts` implementa cleanup apropriado:

```tsx
useEffect(() => {
  let sr: ScrollRevealInstance | null = null

  const init = async () => {
    // ... inicialização
  }

  init()

  return () => {
    sr?.destroy() // Cleanup ao desmontar
  }
}, [])
```

### Notas Adicionais

Este comportamento ocorre **apenas em desenvolvimento** devido ao Strict Mode. Em produção, funciona normalmente.

---

## Warnings do Next.js Image sobre Aspect Ratio

- **ID da Issue:** N/A
- **Severidade:** Baixa
- **Status:** Resolvido
- **Versões Afetadas:** Todas
- **Data do Relato:** 2025-11-26
- **Última Atualização:** 2025-11-26

### Descrição

O Next.js emite warnings quando o componente `Image` tem dimensões definidas mas o CSS modifica apenas uma delas
(width ou height), potencialmente causando distorção de aspect ratio.

### Mensagem de Warning

```text
Image with src "/assets/img/Home-Harry.webp" has either width or height modified,
but not the other. If you use CSS to change the size of your image, also include
the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.
```

### Solução

Adicionar `style={{ height: 'auto' }}` ou `style={{ width: 'auto' }}` no componente `Image` quando o CSS
modifica apenas uma dimensão:

```tsx
<Image
  src='/assets/img/Home-Harry.webp'
  width={304}
  height={415}
  style={{ height: 'auto' }} // Mantém aspect ratio quando CSS modifica width
  className='perfil__img'
/>
```

### Notas Adicionais

Este é um warning informativo que não afeta a funcionalidade, apenas alerta sobre possível distorção de
imagem. A correção garante que o aspect ratio seja mantido corretamente.

---

## Warnings de Preload de Recursos

- **ID da Issue:** N/A
- **Severidade:** Baixa
- **Status:** Resolvido
- **Versões Afetadas:** Todas
- **Data do Relato:** 2025-11-26
- **Última Atualização:** 2025-11-26

### Descrição

Warnings do navegador sobre recursos preloaded que não foram usados imediatamente ou sobre valores `as` não
suportados em `<link rel="preload">`.

### Tipos de Warnings

1. **`<link rel=preload> uses an unsupported 'as' value`**
   - Alguns navegadores não suportam `as='video'` para preload
   - Solução: Remover preload de vídeos (carregam sob demanda)

2. **`The resource was preloaded using link preload but not used within a few seconds`**
   - Recursos preloaded que não são usados imediatamente
   - Pode ocorrer se o preload acontece antes do componente renderizar

### Solução Implementada

- Removido preload de vídeos (carregam sob demanda no hover/scroll)
- Mantidos apenas preloads de recursos críticos (Background.png)

### Notas Adicionais

Estes warnings não afetam a funcionalidade do site. Os vídeos continuam carregando normalmente quando
necessário (on hover desktop ou on scroll mobile).

---

## Template para Novos Issues

Copie e preencha o template abaixo ao documentar um novo issue:

```markdown
## Título do Problema: [Descrição breve]

- **ID da Issue:** `[#XX]` ou N/A
- **Severidade:** `[Crítica / Alta / Média / Baixa]`
- **Status:** `[Aberto / Em Investigação / Solução de Contorno Disponível / Resolvido]`
- **Versões Afetadas:** `[Ex: 1.0.0 - 1.1.2]`
- **Data do Relato:** `YYYY-MM-DD`
- **Última Atualização:** `YYYY-MM-DD`

### Descrição

[Descrição clara e concisa do problema]

### Passos para Reproduzir

1. [Passo 1]
2. [Passo 2]
3. [...]

### Comportamento Esperado

[O que deveria acontecer]

### Comportamento Atual

[O que realmente acontece]

### Solução de Contorno (Workaround)

[Se disponível, descreva a solução temporária]

### Notas Adicionais

[Informações extras relevantes]
```

---

**Última atualização:** 26 de Novembro de 2025
