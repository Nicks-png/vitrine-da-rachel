"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { createClient } from "@/lib/supabase";
import type { Produto } from "@/lib/types";
import { toast } from "sonner";

export default function ProdutoPage() {
  const params = useParams<{ slug: string }>();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [tamanho, setTamanho] = useState<string>("");
  const [imgIdx, setImgIdx] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("produtos")
        .select("*")
        .eq("slug", params.slug)
        .eq("ativo", true)
        .single();
      setProduto(data as Produto | null);
      setLoading(false);
    }
    load();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#F4A7B9] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!produto) {
    notFound();
  }

  const preco = produto.preco_promocional && produto.preco_promocional < produto.preco
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
      preco,
      imagem: produto!.imagens[0] ?? "",
      slug: produto!.slug,
      tamanho: tamanho || undefined,
    });
    toast.success("Adicionado ao carrinho!");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Galeria */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5ECD7]">
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
                <ShoppingBag size={64} className="text-[#F4A7B9]/30" />
              </div>
            )}

            {produto.imagens.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx((i) => (i - 1 + produto.imagens.length) % produto.imagens.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow hover:bg-white transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setImgIdx((i) => (i + 1) % produto.imagens.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow hover:bg-white transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {produto.imagens.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {produto.imagens.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === imgIdx ? "border-[#F4A7B9]" : "border-transparent"
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
          <p className="text-[#F4A7B9] text-xs font-medium uppercase tracking-widest mb-2">
            {produto.categoria}
          </p>
          <h1 className="font-heading text-3xl font-bold text-[#2D2D2D] mb-4">
            {produto.nome}
          </h1>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-[#F4A7B9]">
              R$ {preco.toFixed(2).replace(".", ",")}
            </span>
            {temPromocao && (
              <span className="text-lg text-muted-foreground line-through">
                R$ {produto.preco.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>

          {produto.descricao && (
            <p className="text-[#2D2D2D]/70 text-sm leading-relaxed mb-6">
              {produto.descricao}
            </p>
          )}

          {produto.tamanhos.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-[#2D2D2D] mb-2">Tamanho</p>
              <div className="flex gap-2 flex-wrap">
                {produto.tamanhos.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTamanho(t)}
                    className={`min-w-[44px] h-10 px-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                      tamanho === t
                        ? "border-[#F4A7B9] bg-[#F4A7B9] text-white"
                        : "border-[#F5ECD7] text-[#2D2D2D] hover:border-[#F4A7B9]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mt-auto">
            {produto.estoque > 0 ? (
              <Badge variant="secondary" className="text-emerald-700 bg-emerald-50">
                Em estoque ({produto.estoque})
              </Badge>
            ) : (
              <Badge variant="secondary">Esgotado</Badge>
            )}
          </div>

          <Button
            onClick={handleAdd}
            disabled={produto.estoque === 0}
            className="mt-4 bg-[#F4A7B9] hover:bg-[#e8919e] text-white h-12 text-base rounded-xl"
          >
            <ShoppingBag size={18} className="mr-2" />
            Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </div>
  );
}
