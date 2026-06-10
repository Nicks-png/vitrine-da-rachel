import { createServerSupabaseClient } from "@/lib/supabase";
import ProductCard from "@/components/shop/ProductCard";
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

    const { data } = await query;
    return (data as Produto[]) ?? [];
  } catch {
    return [];
  }
}

type Props = {
  searchParams: Promise<{ categoria?: string }>;
};

export default async function LojaPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const produtos = await getProdutos(categoria);
  const categoriaAtiva = categoria ?? "Todos";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-[#2D2D2D] mb-6">Loja</h1>

        <div className="flex gap-2 flex-wrap">
          {CATEGORIAS.map((cat) => (
            <a
              key={cat}
              href={cat === "Todos" ? "/loja" : `/loja?categoria=${encodeURIComponent(cat)}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                categoriaAtiva === cat
                  ? "bg-[#F4A7B9] text-white border-[#F4A7B9]"
                  : "bg-white text-[#2D2D2D] border-[#F5ECD7] hover:border-[#F4A7B9]"
              }`}
            >
              {cat}
            </a>
          ))}
        </div>
      </div>

      {produtos.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">Nenhum produto encontrado.</p>
          <p className="text-sm mt-2">Volte em breve para novidades!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {produtos.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}
