---
name: Vitrine da Rachel
description: Boutique de roupas e acessórios femininos, curadoria pessoal de Rachel Dias — fotografia em primeiro plano, acento âmbar pontual
colors:
  ambar: "#A8481C"
  ambar-hover: "#7A3512"
  tinta: "#1C1410"
  papel: "#FAF6EF"
  pergaminho: "#F0E6D6"
  card: "#FFFFFF"
  taupe: "#6B5842"
  borda: "#D8C4A8"
  foil-dourado: "#D1A63B"
typography:
  display:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "9px"
    fontWeight: 500
    letterSpacing: "0.3em"
rounded:
  sm: "0.1875rem"
  md: "0.375rem"
  lg: "0.375rem"
  xl: "0.5625rem"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.ambar}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "16px 36px"
  button-primary-hover:
    backgroundColor: "{colors.ambar-hover}"
  button-outline:
    textColor: "{colors.taupe}"
    rounded: "{rounded.md}"
    padding: "14px 36px"
  button-outline-hover:
    textColor: "{colors.ambar}"
  input:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.tinta}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: Vitrine da Rachel

## 1. Overview

**Creative North Star: fotografia de moda em primeiro plano, acento âmbar pontual**

Duas iterações anteriores foram descartadas. A primeira (Playfair Display itálico + DM Sans tracked + paleta terrosa monocromática) era a linha "editorial-typographic" — o template de marca mais saturado de 2026 segundo a própria disciplina de design deste projeto, com bug de contraste WCAG AA no dourado antigo (#B8956A). A segunda (identidade "rótulo de perfumaria": bloco âmbar cheio + moldura de filete + fonte Italiana) foi rejeitada pelo cliente em avaliação direta: não comunicava "loja de moda feminina", a caixa de texto no hero não fazia sentido, e a fonte não passava qualidade.

A direção atual foi calibrada em cima de três referências reais e consolidadas de e-commerce de moda (Animale, Farm Rio, Reformation), escolhidas explicitamente para reduzir risco em vez de arriscar um conceito abstrato de novo. Padrão comum às três: **a fotografia de moda domina o hero — nunca um bloco de cor sólida substituindo a foto** — com texto sobreposto direto na imagem (sem caixa, sem moldura), tipografia sans-serif limpa e confiante como voz única, e cor usada como acento pontual (botão, badge), não como superfície dominante.

**Key Characteristics:**
- Hero é sempre foto full-bleed com texto sobreposto (gradiente escuro para legibilidade), nunca um bloco de cor com caixa/moldura
- Família tipográfica única: Public Sans em todos os pesos (400 corpo, 600 títulos) — hierarquia por peso/tamanho, não por mistura de famílias
- Âmbar (`--primary`) é acento pontual: botão, preço em oferta, badge — nunca ocupa uma seção inteira como fundo
- Dourado (`--foil-gold`) é acento raríssimo, só como texto sobre fundo tinta (`--ink`)
- Sem eyebrow repetido em toda seção — usado com moderação, não como grade universal
- Zero sombra — profundidade vem de blocos de cor sólida e bordas de 1px

## 2. Colors

Estratégia **Restrained com um acento Committed pontual**: papel/pergaminho/tinta fazem o trabalho pesado neutro; âmbar aparece só em pontos de ação (botão, preço, badge) ou como scrim/gradiente sobre fotografia — nunca como fundo de seção inteira.

### Primary
- **Âmbar** (#A8481C): cor de ação — botões primários, preço em oferta, badges. Hover escurece para #7A3512. Nunca é o fundo de uma seção inteira.

### Secondary
- **Foil Dourado** (#D1A63B): acento raríssimo, reservado a **texto sobre fundo tinta apenas** (7.98:1 de contraste). Nunca em fundo claro ou âmbar — nesses fundos ele reprova contraste (2.25:1 em papel, 2.56:1 em âmbar).

### Neutral
- **Tinta** (#1C1410): texto principal, faixa de filosofia, footer, gradiente escuro sobre fotos (hero, categorias).
- **Papel** (#FAF6EF): fundo padrão da página.
- **Pergaminho** (#F0E6D6): fundo de seções alternadas (carrosséis), placeholder de imagem.
- **Taupe** (#6B5842): texto secundário/muted, labels de categoria — substitui o dourado nessa função (era a causa do bug de contraste original).
- **Borda** (#D8C4A8): filetes — cards, inputs, divisores.

### Named Rules
**A Regra do Foil.** Dourado como texto só existe sobre `--ink`. Em qualquer outro fundo ele reprova WCAG AA — regra arquitetural, não exceção pontual.

**A Regra do Âmbar-Nunca-Sob-Tinta.** Texto tinta direto sobre fundo âmbar mede 3,12:1 — reprova texto normal. Fundo âmbar sempre pareia com branco (`--primary-foreground`).

**A Regra da Cor Pontual.** Âmbar é botão, preço, badge — nunca um bloco de fundo cobrindo uma seção inteira. Se uma seção parece precisar de "mais cor", a resposta é uma foto melhor, não mais âmbar.

## 3. Typography

**Família única:** Public Sans (fallback system-ui) — 100–900, normal e itálico. Mesma família para display e corpo; hierarquia vem de peso e tamanho, não de mistura de famílias.

**Character:** Sans-serif geométrica limpa e confiante — a mesma lógica tipográfica de Animale, Farm Rio e Reformation: a fotografia carrega a personalidade da marca, a tipografia fica fora do caminho.

### Hierarchy
- **Display** (600, letter-spacing -0.02em, line-height 1.15): títulos de seção e hero.
- **Title** (600, ~1.1–1.4rem): subtítulos de card e componente.
- **Body** (400, 13–14.5px, line-height 1.8): parágrafos e descrições, máx ~65–75ch.
- **Label** (500, 8.5–11px, letter-spacing 0.15–0.4em, uppercase): categorias, kickers, botões.

### Named Rules
**A Regra da Família Única.** Não introduzir uma segunda família "de destaque" (serifada ou decorativa) sem um motivo forte e testado com o cliente — as duas tentativas anteriores de par tipográfico (Playfair/DM Sans, depois Italiana/Public Sans) foram rejeitadas. Público Sans sozinha, com contraste de peso, é o padrão até novo aviso.

## 4. Elevation

Sistema completamente plano — nenhuma `box-shadow`. Profundidade vem de blocos de cor sólida e bordas de 1px.

### Named Rules
**A Regra do Sem-Sombra.** Se um componente parece precisar de elevação, a resposta é borda ou bloco de cor, nunca sombra.

## 5. Components

### Hero
Sempre foto full-bleed (`object-cover`, altura fixa ~560–640px) com gradiente `from-ink/75 via-ink/35 to-transparent` da esquerda para a direita, texto sobreposto direto na imagem (sem caixa, sem moldura, sem borda). CTA primário em âmbar cheio; secundário outline translúcido sobre a foto.

### Buttons
- **Shape:** cantos discretamente arredondados (0.375rem).
- **Primary:** fundo âmbar, texto branco, hover escurece para #7A3512.
- **Outline:** transparente, borda cor de borda (ou branco translúcido sobre foto), texto taupe (ou branco sobre foto); hover troca para âmbar/branco sólido.
- **Hover / Focus:** easing `cubic-bezier(0.4, 0, 0.2, 1)`, 300ms. Foco visível usa `outline-ring outline-offset-2` — em fundo escuro (tinta/âmbar/foto), usa `focus-visible:outline-background`.

### Cards / Containers
- **Corner Style:** 0.375rem em imagens e cards.
- **Background:** branco (`--card`, produto/carrinho) ou pergaminho (`--secondary`, carrosséis).
- **Border:** 1px cor de borda em cards de formulário e itens de carrinho.

### Carrossel de Curadoria
Fileira horizontal com scroll-snap. `eyebrow` é opcional — usado com moderação, não em toda seção. Setas ficam desabilitadas (`opacity-30`, `pointer-events-none`) nas pontas da trilha via rastreamento de `scrollLeft`/`scrollWidth`.

### Category label (product card)
Cor migrada de dourado (`#B8956A`, 2,3–2,8:1, reprovava contraste) para `--muted-foreground` (taupe, 6,06–6,77:1 dependendo do fundo).

## 6. Do's and Don'ts

### Do:
- **Do** liderar com fotografia de moda real — o hero e as categorias são sempre foto full-bleed.
- **Do** manter dourado estritamente como texto-sobre-tinta.
- **Do** manter as seções de produto (carrosséis, cards) em fundo papel/pergaminho neutro, para a fotografia não competir com um fundo saturado.
- **Do** usar âmbar como acento pontual (botão, preço, badge), nunca como fundo de seção inteira.
- **Do** testar mudanças grandes de direção com o cliente antes de propagar pelo site inteiro — duas iterações anteriores foram descartadas por não alinhar antes de implementar tudo.

### Don't:
- **Don't** reintroduzir Playfair Display, DM Sans ou Italiana — todas descartadas.
- **Don't** colocar texto dentro de uma caixa/moldura decorativa como elemento central do hero — nenhuma referência real de e-commerce de moda faz isso.
- **Don't** usar um bloco de cor sólida (sem foto) como hero.
- **Don't** colocar dourado como texto fora de fundo tinta.
- **Don't** colocar texto tinta direto sobre fundo âmbar (3,12:1, reprova).
- **Don't** adicionar `box-shadow` a componentes — bloco de cor ou borda de 1px é o mecanismo de profundidade.
- **Don't** repetir o padrão eyebrow-tracked-caps em toda seção sem exceção.
