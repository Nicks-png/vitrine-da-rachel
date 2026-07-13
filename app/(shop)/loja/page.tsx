import { createServerSupabaseClient } from "@/lib/supabase-server";
import { mockProdutos } from "@/lib/mock-products";
import { buildCuratedSections } from "@/lib/product-sections";
import ProductCard from "@/components/shop/ProductCard";
import ProductCarousel from "@/components/shop/ProductCarousel";
import type { Produto } from "@/lib/types";

const CATEGORIAS = ["Todos", "Roupas", "Acessórios"];

async function getProdutos(categoria?: string): Promise<Produto[]> {
  try {
    const supabase = await createServerSupabaseClient();
    let query = supabase
      .from("produtos")
      .select("*")
      .eq("ativo", true)
      .order("created_at", { ascending: false });

    if (categoria && categoria !== "Todos") {
      query = query.eq("categoria", categoria);
    }

    const { data, error } = await query;
    if (error || !data?.length) {
      const source = mockProdutos;
      return categoria && categoria !== "Todos"
        ? source.filter((p) => p.categoria === categoria)
        : source;
    }
    return data as Produto[];
  } catch {
    const source = mockProdutos;
    return categoria && categoria !== "Todos"
      ? source.filter((p) => p.categoria === categoria)
      : source;
  }
}

type Props = {
  searchParams: Promise<{ categoria?: string }>;
};

export default async function LojaPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const produtos = await getProdutos(categoria);
  const categoriaAtiva = categoria ?? "Todos";

  const secoes = categoriaAtiva === "Todos" ? buildCuratedSections(produtos) : null;

  return (
    <div className="max-w-6xl mx-auto px-8 py-16">
      {secoes && (
        <div className="space-y-20 mb-24">
          <ProductCarousel eyebrow="Seleção" titulo="Escolhas da Rachel" produtos={secoes.escolhas} />
          {secoes.promocoes.length > 0 && (
            <ProductCarousel eyebrow="Por tempo limitado" titulo="Promoções" produtos={secoes.promocoes} />
          )}
          <ProductCarousel eyebrow="Acabou de chegar" titulo="Lançamentos" produtos={secoes.lancamentos} />
          {secoes.ultimasUnidades.length > 0 && (
            <ProductCarousel eyebrow="Estoque limitado" titulo="Últimas unidades" produtos={secoes.ultimasUnidades} />
          )}
          <div className="border-t border-border" />
        </div>
      )}

      {/* Topo */}
      <div className="mb-12">
        <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-2">Pitaya Rosa</p>
        <div className="flex items-end justify-between">
          <h1 className="font-heading text-[2.2rem] font-semibold text-foreground">
            {categoriaAtiva === "Todos" ? "Todos os produtos" : categoriaAtiva}
          </h1>
          <span className="text-[12px] text-muted-foreground">{produtos.length} peças</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2.5 mb-12 flex-wrap">
        {CATEGORIAS.map((cat) => (
          <a
            key={cat}
            href={cat === "Todos" ? "/loja" : `/loja?categoria=${encodeURIComponent(cat)}`}
            className={`rounded-md text-[9.5px] tracking-[0.2em] uppercase px-6 py-2.5 border transition-colors duration-300 ${
              categoriaAtiva === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground"
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      {/* Grid */}
      {produtos.length === 0 ? (
        <div className="text-center py-28 text-muted-foreground">
          <p className="font-heading text-[1.8rem] text-foreground mb-3">Nenhuma peça encontrada</p>
          <p className="text-[13px]">Volte em breve — novas peças chegando.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {produtos.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}
