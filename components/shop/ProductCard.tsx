"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import type { Produto } from "@/lib/types";
import { toast } from "sonner";

type Props = { produto: Produto };

function fmt(v: number) {
  return "R$ " + v.toFixed(2).replace(".", ",");
}

export default function ProductCard({ produto }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const temPromocao = produto.preco_promocional && produto.preco_promocional < produto.preco;
  const precoFinal = temPromocao ? produto.preco_promocional! : produto.preco;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ id: produto.id, nome: produto.nome, preco: precoFinal, imagem: produto.imagens[0] ?? "", slug: produto.slug });
    toast.success("Adicionado ao carrinho!");
  }

  return (
    <Link href={`/loja/${produto.slug}`} className="group block">
      {/* Imagem */}
      <div className="relative aspect-[3/4] bg-[#F2EAE0] overflow-hidden mb-4">
        {produto.imagens[0] ? (
          <Image src={produto.imagens[0]} alt={produto.nome} fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 50vw, 25vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#E2D5C8]">
            <ShoppingBag size={32} />
          </div>
        )}

        {temPromocao && (
          <span className="absolute top-3 left-3 bg-[#8B2E4A] text-white text-[8px] font-medium tracking-[0.2em] uppercase px-2.5 py-1">
            Oferta
          </span>
        )}

        {produto.estoque === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#7A6458] bg-white px-4 py-1.5 border border-[#E0D3C6]">
              Esgotado
            </span>
          </div>
        )}

        {/* Botão add ao hover — fade elegante */}
        {produto.estoque > 0 && (
          <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button onClick={handleAdd}
              className="w-full bg-[#1C1410]/90 hover:bg-[#8B2E4A] text-white text-[9px] tracking-[0.22em] uppercase font-medium py-3.5 flex items-center justify-center gap-2 transition-colors duration-300 backdrop-blur-sm">
              <ShoppingBag size={11} />
              Adicionar ao carrinho
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <p className="text-[8.5px] tracking-[0.25em] uppercase text-[#B8956A] font-medium mb-1.5">{produto.categoria}</p>
      <p className="text-[13.5px] font-medium text-[#1C1410] leading-snug line-clamp-2 mb-2">{produto.nome}</p>
      <div className="flex items-baseline gap-2">
        <span className={`text-sm font-semibold ${temPromocao ? "text-[#8B2E4A]" : "text-[#1C1410]"}`}>
          {fmt(precoFinal)}
        </span>
        {temPromocao && (
          <span className="text-xs text-[#7A6458]/70 line-through">{fmt(produto.preco)}</span>
        )}
      </div>
    </Link>
  );
}
