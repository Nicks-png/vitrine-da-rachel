import type { Produto } from "./types";

const LOW_STOCK_THRESHOLD = 6;
const SECTION_LIMIT = 8;

export type CuratedSections = {
  escolhas: Produto[];
  promocoes: Produto[];
  lancamentos: Produto[];
  ultimasUnidades: Produto[];
};

export function buildCuratedSections(produtos: Produto[]): CuratedSections {
  const disponiveis = produtos.filter((p) => p.estoque > 0);

  const promocoes = disponiveis
    .filter((p) => p.preco_promocional != null && p.preco_promocional < p.preco)
    .sort((a, b) => {
      const descontoA = (a.preco - a.preco_promocional!) / a.preco;
      const descontoB = (b.preco - b.preco_promocional!) / b.preco;
      return descontoB - descontoA;
    })
    .slice(0, SECTION_LIMIT);

  const promocaoIds = new Set(promocoes.map((p) => p.id));

  const lancamentos = disponiveis
    .filter((p) => !promocaoIds.has(p.id))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, SECTION_LIMIT);

  const ultimasUnidades = disponiveis
    .filter((p) => !promocaoIds.has(p.id) && p.estoque <= LOW_STOCK_THRESHOLD)
    .sort((a, b) => a.estoque - b.estoque)
    .slice(0, SECTION_LIMIT);

  const escolhas = disponiveis
    .filter((p) => !promocaoIds.has(p.id))
    .sort((a, b) => b.preco - a.preco)
    .slice(0, SECTION_LIMIT);

  return { escolhas, promocoes, lancamentos, ultimasUnidades };
}
