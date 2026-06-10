import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase";
import ProductCard from "@/components/shop/ProductCard";
import type { Produto } from "@/lib/types";

async function getProdutosDestaque(): Promise<Produto[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from("produtos")
      .select("*")
      .eq("ativo", true)
      .gt("estoque", 0)
      .order("created_at", { ascending: false })
      .limit(6);
    return (data as Produto[]) ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const destaques = await getProdutosDestaque();

  return (
    <>
      {/* Hero */}
      <section className="bg-[#F5ECD7] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F4A7B9] text-sm font-medium uppercase tracking-widest mb-4">
            Bazar Online
          </p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-[#2D2D2D] mb-6 leading-tight">
            Moda com{" "}
            <span className="text-[#F4A7B9]">estilo</span>{" "}
            e personalidade
          </h1>
          <p className="text-[#2D2D2D]/70 text-lg mb-8 max-w-xl mx-auto">
            Roupas e acessórios selecionados com carinho pela Rachel Dias. Peças únicas para o seu estilo único.
          </p>
          <Link
            href="/loja"
            className="inline-block bg-[#F4A7B9] hover:bg-[#e8919e] text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
          >
            Ver coleção
          </Link>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-[#2D2D2D] text-center mb-8">
            Categorias
          </h2>
          <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
            <Link
              href="/loja?categoria=Roupas"
              className="bg-[#F5ECD7] hover:bg-[#F4A7B9]/20 rounded-2xl p-8 text-center transition-colors group"
            >
              <div className="text-4xl mb-3">👗</div>
              <p className="font-heading font-semibold text-[#2D2D2D] group-hover:text-[#F4A7B9] transition-colors">
                Roupas
              </p>
            </Link>
            <Link
              href="/loja?categoria=Acessórios"
              className="bg-[#F5ECD7] hover:bg-[#F4A7B9]/20 rounded-2xl p-8 text-center transition-colors group"
            >
              <div className="text-4xl mb-3">👜</div>
              <p className="font-heading font-semibold text-[#2D2D2D] group-hover:text-[#F4A7B9] transition-colors">
                Acessórios
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Destaques */}
      {destaques.length > 0 && (
        <section className="py-14 px-4 bg-[#F5ECD7]/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-3xl font-bold text-[#2D2D2D]">
                Em destaque
              </h2>
              <Link href="/loja" className="text-sm text-[#F4A7B9] hover:underline font-medium">
                Ver tudo →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {destaques.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-[#F4A7B9]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Encontre o look perfeito
          </h2>
          <p className="text-white/80 mb-8">
            Peças selecionadas com cuidado para cada estilo e ocasião.
          </p>
          <Link
            href="/loja"
            className="inline-block bg-white text-[#F4A7B9] font-semibold px-8 py-3.5 rounded-full hover:bg-[#F5ECD7] transition-colors"
          >
            Explorar loja
          </Link>
        </div>
      </section>
    </>
  );
}
