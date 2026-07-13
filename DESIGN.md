---
name: Pitaya Rosa
description: Roupas e acessórios femininos, curadoria pessoal de Rachel Dias — identidade oficial de marca (brandbook do cliente), preto/dourado/cobre, minimalismo sofisticado
colors:
  preto: "#111111"
  branco: "#F8F7F4"
  dourado-champagne: "#C7A76C"
  cobre-fosco: "#B9825A"
  marrom-espresso: "#4B372D"
  bege-areia: "#DDD3C6"
typography:
  display:
    fontFamily: "Cormorant Garamond, serif"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "9px"
    fontWeight: 500
    letterSpacing: "0.3em"
rounded:
  sm: "0.03125rem"
  md: "0.0625rem"
  lg: "0.0625rem"
  xl: "0.09375rem"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.preto}"
    textColor: "{colors.dourado-champagne}"
    rounded: "{rounded.md}"
    padding: "16px 36px"
  button-primary-hover:
    backgroundColor: "#2A2A2A"
  button-outline:
    textColor: "{colors.marrom-espresso}"
    rounded: "{rounded.md}"
    padding: "14px 36px"
  button-outline-hover:
    textColor: "{colors.preto}"
  input:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.preto}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: Pitaya Rosa

## 1. Overview

**Creative North Star: identidade oficial de marca — brandbook do cliente**

Esta é a terceira direção visual do projeto, e a primeira que não nasceu de exploração interna: a cliente trouxe um brandbook formal (`PITAYA ROSA`, versão 1.0) que substitui por completo a direção anterior (âmbar/tinta/Public Sans, calibrada em Animale/Farm Rio/Reformation). Não há mais espaço de decisão de cor/tipografia/logo em aberto — este documento registra as regras derivadas do brandbook para aplicação consistente no código.

**Contexto histórico (3 direções, todas superadas por esta):**
1. Playfair Display itálico + DM Sans + paleta terrosa monocromática — descartada por ser o template de marca mais saturado de 2026, com bug de contraste WCAG AA no dourado antigo.
2. Identidade "rótulo de perfumaria" (bloco âmbar cheio + moldura de filete + fonte Italiana) — rejeitada pela cliente em avaliação direta.
3. Fotografia-primeiro com acento âmbar pontual (Public Sans única) — calibrada em referências reais de e-commerce de moda, aprovada e publicada em produção. **Superada nesta rodada** pelo brandbook oficial da marca Pitaya Rosa.

**Key Characteristics:**
- Preto (`--primary`, `--ink`) é a superfície de assinatura da marca: botões, wordmark, sidebar admin, footer — sempre pareado com dourado champagne como texto/borda (nunca branco puro nesses contextos).
- Dourado Champagne (`--foil-gold`, `--primary-foreground`) só existe como texto/borda sobre fundo preto — mesma lógica de contraste da "Regra do Foil" anterior, aplicada à nova paleta.
- Cobre Fosco (`--copper`) é acento raro e **não deve ser usado como cor de texto em fundo claro** (reprova WCAG AA, 2,97:1) — reservado a elementos decorativos de baixo risco (linhas finas, ícones grandes) ou texto sobre fundo escuro, onde tem 5,57:1.
- **Linhas retas.** O brandbook é explícito: "minimalismo sofisticado, linhas retas". Cantos praticamente retos (`--radius: 0.0625rem`) substituem o arredondamento 0.375rem da direção anterior.
- Tipografia dupla: Cormorant Garamond (serifada, display/títulos) + Montserrat (sans, corpo/UI) — a primeira vez que este projeto usa um par tipográfico, porque agora é uma regra de marca externa, não uma escolha de design interna.
- Wordmark é um retângulo com borda fina + texto letter-spaced (`PITAYA ROSA`) — recriado em CSS via `components/layout/Logo.tsx`, já que não há arquivo de logo vetorizado disponível.

## 2. Colors

### Primary
- **Preto** (#111111): cor de ação — fundo de botões primários, wordmark, footer, sidebar admin. Hover escurece para #2A2A2A.

### Accent (regra do foil, atualizada)
- **Dourado Champagne** (#C7A76C): texto/borda **apenas sobre fundo preto** (8,0:1 de contraste). Em fundo claro, reprova (2,29:1) — nunca usar como texto em `--background`/`--card`/`--secondary`.
- **Cobre Fosco** (#B9825A): acento secundário. Sobre preto, 5,57:1 (aprovado). Sobre branco/bege, 2,97:1 (reprova como texto — usar só decorativo: linha, ícone, hover de borda).

### Neutral
- **Branco** (#F8F7F4): fundo padrão da página (`--background`).
- **Marrom Espresso** (#4B372D): texto secundário/muted (`--muted-foreground`), 10,07:1 sobre branco.
- **Bege Areia** (#DDD3C6): fundo de seções alternadas, bordas (`--secondary`, `--muted`, `--border`).

### Named Rules
**A Regra do Foil (v2).** Dourado champagne como texto só existe sobre preto — mesma regra arquitetural do sistema anterior, agora aplicada à cor nova. Reprova em qualquer fundo claro.

**A Regra do Cobre-Decorativo.** Cobre fosco nunca é cor de texto corrido em fundo claro. É acento de borda/ícone/hover, ou texto apenas sobre fundo escuro.

## 3. Typography

**Par tipográfico oficial de marca:** Cormorant Garamond (display/títulos, serifada elegante) + Montserrat (corpo/UI, sans neutra). Diferente do sistema anterior — que evitava deliberadamente pares tipográficos — este par vem do brandbook da cliente e não é uma decisão de design interna a ser revisitada sem o cliente.

### Hierarchy
- **Display** (Cormorant Garamond, 600, letter-spacing -0.01em): títulos de seção, hero, wordmark.
- **Body** (Montserrat, 400, 14.5px, line-height 1.8): parágrafos e descrições.
- **Label** (Montserrat, 500, 9-11px, letter-spacing 0.15–0.4em, uppercase): categorias, kickers, botões.

## 4. Elevation

Sistema plano — nenhuma `box-shadow`. Profundidade vem de blocos de cor sólida e bordas de 1px, mesma lógica do sistema anterior.

## 5. Components

### Logo / Wordmark
`components/layout/Logo.tsx` — retângulo com borda fina + "PITAYA ROSA" em Cormorant Garamond, uppercase, letter-spacing largo. Duas variantes:
- **light** (borda/texto preto): uso padrão em fundos claros — header, login admin.
- **dark** (borda/texto dourado champagne): uso em fundos pretos — footer, sidebar admin.

Recriado em CSS porque não existe arquivo de logo vetorizado da cliente — se ela fornecer um SVG/PNG oficial no futuro, substituir este componente pelo arquivo real.

### Buttons
- **Shape:** cantos quase retos (0.0625rem) — "linhas retas" do brandbook.
- **Primary:** fundo preto, texto dourado champagne, hover escurece para #2A2A2A.
- **Outline:** texto marrom espresso, hover preto.

### Cards / Containers
- **Background:** branco/card (`--card`, produto/carrinho) ou bege areia (`--secondary`, carrosséis, resumo de carrinho/checkout).
- **Border:** 1px bege areia em cards de formulário e itens de carrinho.

## 6. Do's and Don'ts

### Do:
- **Do** manter dourado champagne estritamente como texto-sobre-preto.
- **Do** usar cobre fosco só como acento decorativo (linha, ícone) fora de texto corrido em fundo claro.
- **Do** manter cantos quase retos em botões, cards e inputs — é uma regra explícita do brandbook ("linhas retas"), não um detalhe opcional.
- **Do** avisar a cliente se algum arquivo de logo vetorizado for produzido — o wordmark atual é uma recriação em CSS, não o asset oficial.

### Don't:
- **Don't** reintroduzir Public Sans, âmbar (#A8481C) ou qualquer cor/fonte do sistema anterior — a direção mudou por identidade oficial de marca, não por preferência de design.
- **Don't** usar dourado champagne ou cobre como texto em fundo claro.
- **Don't** adicionar `box-shadow`.
- **Don't** arredondar cantos além de `--radius` (0.0625rem) — contraria "linhas retas".
