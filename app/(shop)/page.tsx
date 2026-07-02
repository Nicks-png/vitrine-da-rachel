import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { mockProdutos } from "@/lib/mock-products";
import ProductCard from "@/components/shop/ProductCard";
import type { Produto } from "@/lib/types";

async function getDestaques(): Promise<Produto[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("produtos").select("*").eq("ativo", true).gt("estoque", 0)
      .order("created_at", { ascending: false }).limit(4);
    if (error || !data?.length) return mockProdutos.slice(0, 4);
    return data as Produto[];
  } catch {
    return mockProdutos.slice(0, 4);
  }
}

export default async function HomePage() {
  const destaques = await getDestaques();

  return (
    <>
      {/* Hero */}
      <section className="bg-[#F2EAE0]">
        <div className="max-w-6xl mx-auto px-8 py-24 md:py-36 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8956A] font-medium mb-8">
              Bazar · Curadoria Pessoal
            </p>
            <h1 className="text-5xl md:text-[3.75rem] font-semibold text-[#1C1410] leading-[1.05] mb-7"
              style={{ fontFamily: "var(--font-playfair)" }}>
              Cada peça tem<br />
              <em className="text-[#8B2E4A]">uma história</em><br />
              para contar.
            </h1>
            <p className="text-[#7A6458] text-[14px] leading-[1.8] mb-10 max-w-sm">
              Rachel Dias seleciona pessoalmente cada item do bazar — roupas e acessórios femininos
              com estilo, qualidade e preço justo. Nada aqui é por acaso.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/loja"
                className="bg-[#8B2E4A] hover:bg-[#721f3b] text-white text-[11px] font-medium px-9 py-3.5 transition-colors duration-300 tracking-[0.15em] uppercase">
                Ver a coleção
              </Link>
              <Link href="/loja?categoria=Acessórios"
                className="border border-[#C4B5A8] hover:border-[#8B2E4A] text-[#7A6458] hover:text-[#8B2E4A] text-[11px] font-medium px-9 py-3.5 transition-colors duration-300 tracking-[0.15em] uppercase">
                Acessórios
              </Link>
            </div>
          </div>

          {/* Colagem de imagens */}
          <div className="grid grid-cols-2 grid-rows-2 gap-2.5 h-[460px]">
            <div className="row-span-2 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
                alt="Moda" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80"
                alt="Bolsa" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
            </div>
            <div className="bg-[#1C1410] flex items-center justify-center p-6">
              <p className="text-[#B8956A] text-[13px] font-medium leading-[1.8] text-center italic"
                style={{ fontFamily: "var(--font-playfair)" }}>
                "Escolhido com carinho,<br />pensado para você."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apresentação da Rachel */}
      <section className="bg-white py-20 px-8 border-y border-[#E0D3C6]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-14 items-center">
          <div className="md:w-1/3 shrink-0">
            <div className="aspect-square max-w-[240px] mx-auto md:mx-0 overflow-hidden bg-[#F2EAE0]">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
                alt="Rachel" className="w-full h-full object-cover" />
            </div>
          </div>

          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8956A] font-medium mb-4">
              A curadora
            </p>
            <h2 className="text-[2rem] font-semibold text-[#1C1410] mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}>
              Olá, sou a Rachel.
            </h2>
            <p className="text-[#7A6458] text-[14px] leading-[1.85] mb-3">
              Gerente de RH no <span className="text-[#1C1410] font-medium">Hotel Pullman Ibirapuera</span>, mãe de três filhos
              e apaixonada por moda há mais anos do que consigo contar.
              Sou vegetariana, cuido do que escolho colocar no corpo — seja na alimentação, seja nas roupas.
            </p>
            <p className="text-[#7A6458] text-[14px] leading-[1.85]">
              Cada peça que entra no meu bazar passou pelo meu olhar pessoal. Não trabalho com quantidade —
              trabalho com <span className="italic">curadoria</span>. Você merece algo que seja, de fato, especial.
            </p>
            <div className="flex gap-8 mt-8 pt-8 border-t border-[#E0D3C6]">
              {[["3", "filhos"], ["10+", "anos de moda"], ["100%", "curadoria pessoal"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-[1.4rem] font-semibold text-[#8B2E4A]" style={{ fontFamily: "var(--font-playfair)" }}>{num}</p>
                  <p className="text-[11px] text-[#7A6458] leading-tight mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-20 px-8 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8956A] font-medium mb-3">Explorar</p>
            <h2 className="text-[2rem] font-semibold text-[#1C1410]" style={{ fontFamily: "var(--font-playfair)" }}>
              Categorias
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
            {[
              { label: "Roupas", sub: "Do casual ao elegante", href: "/loja?categoria=Roupas", img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80" },
              { label: "Acessórios", sub: "O detalhe que completa", href: "/loja?categoria=Acessórios", img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80" },
            ].map((cat) => (
              <Link key={cat.href} href={cat.href} className="group relative aspect-[4/5] overflow-hidden">
                <img src={cat.img} alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/75 via-[#1C1410]/5 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7">
                  <p className="text-white font-semibold text-[1.6rem] leading-none mb-1.5"
                    style={{ fontFamily: "var(--font-playfair)" }}>{cat.label}</p>
                  <p className="text-white/55 text-[10px] tracking-[0.15em] uppercase">{cat.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="py-20 px-8 bg-[#F2EAE0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8956A] font-medium mb-3">Seleção</p>
              <h2 className="text-[2rem] font-semibold text-[#1C1410]" style={{ fontFamily: "var(--font-playfair)" }}>
                Escolhas da Rachel
              </h2>
            </div>
            <Link href="/loja" className="text-[10px] tracking-[0.18em] uppercase text-[#7A6458] hover:text-[#1C1410] transition-colors duration-300 font-medium relative group">
              Ver tudo
              <span className="absolute -bottom-px left-0 h-px w-full bg-[#C4B5A8] group-hover:bg-[#B8956A] transition-colors duration-300" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {destaques.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </section>

      {/* Faixa de valores */}
      <section className="bg-[#1C1410] py-24 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8956A] font-medium mb-7">Minha filosofia</p>
          <h2 className="text-[2rem] md:text-[2.6rem] font-semibold text-white mb-6 italic"
            style={{ fontFamily: "var(--font-playfair)" }}>
            "Cuido do que escolho —<br />na vida e no bazar."
          </h2>
          <p className="text-white/45 text-[13.5px] leading-[1.85] mb-10 max-w-lg mx-auto">
            Vegetariana por convicção, gerente por dedicação, mãe por amor.
            Esse cuidado aparece em cada peça que escolho para você.
          </p>
          <Link href="/loja"
            className="inline-block border border-white/20 hover:border-[#B8956A] text-white/80 hover:text-[#B8956A] text-[9px] tracking-[0.25em] uppercase font-medium px-12 py-4 transition-colors duration-400">
            Conhecer o bazar
          </Link>
        </div>
      </section>

      {/* WhatsApp discreto */}
      <div className="bg-[#F2EAE0] py-5 px-8 text-center border-t border-[#E0D3C6]">
        <p className="text-[12.5px] text-[#7A6458]">
          Dúvidas sobre alguma peça?{" "}
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
            className="text-[#8B2E4A] font-medium hover:text-[#721f3b] transition-colors duration-300 underline-offset-3 hover:underline">
            Fale comigo no WhatsApp →
          </a>
        </p>
      </div>
    </>
  );
}
