"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import type { Produto } from "@/lib/types";
import { toast } from "sonner";

type Props = {
  produto: Produto;
};

export default function ProductCard({ produto }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  const temPromocao = produto.preco_promocional && produto.preco_promocional < produto.preco;

  function handleAddToCart() {
    addItem({
      id: produto.id,
      nome: produto.nome,
      preco: temPromocao ? produto.preco_promocional! : produto.preco,
      imagem: produto.imagens[0] ?? "",
      slug: produto.slug,
    });
    toast.success(`${produto.nome} adicionado ao carrinho!`);
  }

  return (
    <div className="group relative bg-white rounded-xl border border-[#F5ECD7] overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/loja/${produto.slug}`} className="block aspect-square relative bg-[#F5ECD7]">
        {produto.imagens[0] ? (
          <Image
            src={produto.imagens[0]}
            alt={produto.nome}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#F4A7B9]/40">
            <ShoppingBag size={48} />
          </div>
        )}
        {temPromocao && (
          <Badge className="absolute top-2 left-2 bg-[#F4A7B9] text-white border-0">
            Promoção
          </Badge>
        )}
        {produto.estoque === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <Badge variant="secondary">Esgotado</Badge>
          </div>
        )}
      </Link>

      <div className="p-3">
        <Link href={`/loja/${produto.slug}`}>
          <p className="text-[10px] text-[#F4A7B9] font-medium uppercase tracking-wider mb-0.5">
            {produto.categoria}
          </p>
          <h3 className="font-medium text-[#2D2D2D] text-sm leading-snug line-clamp-2 mb-2">
            {produto.nome}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            {temPromocao ? (
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-[#F4A7B9]">
                  R$ {produto.preco_promocional!.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  R$ {produto.preco.toFixed(2).replace(".", ",")}
                </span>
              </div>
            ) : (
              <span className="font-bold text-[#2D2D2D]">
                R$ {produto.preco.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={produto.estoque === 0}
            className="p-2 rounded-full bg-[#F4A7B9] text-white hover:bg-[#e8919e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingBag size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
