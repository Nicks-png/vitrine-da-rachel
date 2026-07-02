"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { createClient } from "@/lib/supabase";
import { mockProdutos } from "@/lib/mock-products";
import type { Produto } from "@/lib/types";
import { toast } from "sonner";

function fmt(v: number) {
  return "R$ " + v.toFixed(2).replace(".", ",");
}

export default function ProdutoPage() {
  const params = useParams<{ slug: string }>();
  const [produto, setProduto] = useState<Produto | null | undefined>(undefined);
  const [tamanho, setTamanho] = useState<string>("");
  const [imgIdx, setImgIdx] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("produtos")
          .select("*")
          .eq("slug", params.slug)
          .eq("ativo", true)
          .single();
        if (error || !data) {
          setProduto(mockProdutos.find((p) => p.slug === params.slug) ?? null);
          return;
        }
        setProduto(data as Produto);
      } catch {
        setProduto(mockProdutos.find((p) => p.slug === params.slug) ?? null);
      }
    }
    load();
  }, [params.slug]);

  if (produto === undefined) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-32 flex items-center justify-center">
        <div className="w-7 h-7 rounded-full border-2 border-[#8B2E4A] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (produto === null) {
    notFound();
  }

  const precoFinal =
    produto.preco_promocional && produto.preco_promocional < produto.preco
      ? produto.preco_promocional
      : produto.preco;

  const temPromocao = produto.preco_promocional && produto.preco_promocional < produto.preco;

  function handleAdd() {
    if (produto!.tamanhos.length > 0 && !tamanho) {
      toast.error("Selecione um tamanho");
      return;
    }
    addItem({
      id: produto!.id,
      nome: produto!.nome,
      preco: precoFinal,
      imagem: produto!.imagens[0] ?? "",
      slug: produto!.slug,
      tamanho: tamanho || undefined,
    });
    toast.success("Adicionado ao carrinho!");
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-14">
      <div className="text-[10px] tracking-[0.15em] uppercase text-[#7A6458] mb-10 flex items-center gap-2">
        <Link href="/loja" className="hover:text-[#1C1410] transition-colors">Loja</Link>
        <span>/</span>
        <Link href={`/loja?categoria=${encodeURIComponent(produto.categoria)}`} className="hover:text-[#1C1410] transition-colors">
          {produto.categoria}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* Galeria */}
        <div className="space-y-3">
          <div className="relative aspect-[3/4] bg-[#F2EAE0] overflow-hidden">
            {produto.imagens[imgIdx] ? (
              <Image
                src={produto.imagens[imgIdx]}
                alt={produto.nome}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag size={56} strokeWidth={1} className="text-[#E0D3C6]" />
              </div>
            )}

            {produto.imagens.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx((i) => (i - 1 + produto.imagens.length) % produto.imagens.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white p-2 transition-colors"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setImgIdx((i) => (i + 1) % produto.imagens.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white p-2 transition-colors"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>

          {produto.imagens.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {produto.imagens.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`relative shrink-0 w-16 h-20 overflow-hidden border transition-colors ${
                    i === imgIdx ? "border-[#8B2E4A]" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detalhes */}
        <div className="flex flex-col">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8956A] font-medium mb-3">
            {produto.categoria}
          </p>
          <h1
            className="text-[2.1rem] font-semibold text-[#1C1410] leading-[1.1] mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {produto.nome}
          </h1>

          <div className="flex items-baseline gap-3 mb-7">
            <span className="text-2xl font-semibold text-[#8B2E4A]">{fmt(precoFinal)}</span>
            {temPromocao && (
              <span className="text-sm text-[#7A6458]/70 line-through">{fmt(produto.preco)}</span>
            )}
          </div>

          {produto.descricao && (
            <p className="text-[#7A6458] text-[14px] leading-[1.85] mb-8 max-w-md">
              {produto.descricao}
            </p>
          )}

          {produto.tamanhos.length > 0 && (
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#1C1410] font-medium mb-3">
                Tamanho
              </p>
              <div className="flex gap-2 flex-wrap">
                {produto.tamanhos.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTamanho(t)}
                    className={`min-w-[44px] h-10 px-3 border text-[13px] font-medium transition-colors ${
                      tamanho === t
                        ? "border-[#1C1410] bg-[#1C1410] text-white"
                        : "border-[#E0D3C6] text-[#1C1410] hover:border-[#8B2E4A]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            {produto.estoque > 0 ? (
              <span className="text-[10px] tracking-[0.15em] uppercase text-emerald-700 font-medium">
                Em estoque · {produto.estoque} {produto.estoque === 1 ? "peça" : "peças"}
              </span>
            ) : (
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#7A6458] font-medium">
                Esgotado
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={produto.estoque === 0}
            className="mt-auto w-full flex items-center justify-center gap-2.5 bg-[#1C1410] hover:bg-[#8B2E4A] disabled:opacity-40 disabled:pointer-events-none text-white text-[11px] tracking-[0.15em] uppercase font-medium py-4 transition-colors duration-300"
          >
            <ShoppingBag size={15} />
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
