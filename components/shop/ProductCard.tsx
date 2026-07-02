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
    <Link href={`/loja/${produto.slug}`} className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
      {/* Imagem */}
      <div className="relative aspect-[3/4] bg-secondary overflow-hidden rounded-md mb-4">
        {produto.imagens[0] ? (
          <Image src={produto.imagens[0]} alt={produto.nome} fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 50vw, 25vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-border">
            <ShoppingBag size={32} />
          </div>
        )}

        {temPromocao && (
          <span className="absolute top-3 left-3 rounded-sm bg-primary text-primary-foreground text-[8px] font-medium tracking-[0.2em] uppercase px-2.5 py-1">
            Oferta
          </span>
        )}

        {produto.estoque === 0 && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="rounded-sm text-[9px] tracking-[0.2em] uppercase text-muted-foreground bg-card px-4 py-1.5 border border-border">
              Esgotado
            </span>
          </div>
        )}

        {/* Botão add ao hover — fade elegante */}
        {produto.estoque > 0 && (
          <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button onClick={handleAdd}
              className="w-full bg-foreground/90 hover:bg-primary text-background text-[9px] tracking-[0.22em] uppercase font-medium py-3.5 flex items-center justify-center gap-2 transition-colors duration-300 backdrop-blur-sm">
              <ShoppingBag size={11} />
              Adicionar ao carrinho
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <p className="text-[8.5px] tracking-[0.25em] uppercase text-muted-foreground font-medium mb-1.5">{produto.categoria}</p>
      <p className="text-[13.5px] font-medium text-foreground leading-snug line-clamp-2 mb-2">{produto.nome}</p>
      <div className="flex items-baseline gap-2">
        <span className={`text-sm font-semibold ${temPromocao ? "text-primary" : "text-foreground"}`}>
          {fmt(precoFinal)}
        </span>
        {temPromocao && (
          <span className="text-xs text-muted-foreground/70 line-through">{fmt(produto.preco)}</span>
        )}
      </div>
    </Link>
  );
}
