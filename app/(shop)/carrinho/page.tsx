"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

function fmt(v: number) {
  return "R$ " + v.toFixed(2).replace(".", ",");
}

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-28 text-center">
        <ShoppingBag size={44} strokeWidth={1} className="text-border mx-auto mb-6" />
        <h1 className="font-heading text-[1.8rem] font-semibold text-foreground mb-3">
          Carrinho vazio
        </h1>
        <p className="text-muted-foreground text-[14px] mb-9">Adicione produtos para continuar.</p>
        <Link
          href="/loja"
          className="rounded-md inline-block bg-primary hover:bg-primary-hover text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium px-9 py-3.5 transition-colors duration-300"
        >
          Ir para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-14">
      <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-2">Sacola</p>
      <h1 className="font-heading text-[2rem] font-semibold text-foreground mb-10">
        Carrinho
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-5">
          {items.map((item) => (
            <div key={`${item.id}-${item.tamanho}`} className="rounded-md flex gap-4 bg-card border border-border p-4">
              <div className="relative w-20 h-24 rounded bg-muted shrink-0 overflow-hidden">
                {item.imagem ? (
                  <Image src={item.imagem} alt={item.nome} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={20} strokeWidth={1} className="text-border" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground text-[14px]">{item.nome}</p>
                    {item.tamanho && (
                      <p className="text-[11px] text-muted-foreground mt-0.5">Tamanho {item.tamanho}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.tamanho)}
                    className="text-border hover:text-primary transition-colors ml-2"
                    aria-label="Remover"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.tamanho, item.quantidade - 1)}
                      className="rounded w-7 h-7 border border-border hover:border-primary flex items-center justify-center text-muted-foreground transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-[13px] font-medium">{item.quantidade}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.tamanho, item.quantidade + 1)}
                      className="rounded w-7 h-7 border border-border hover:border-primary flex items-center justify-center text-muted-foreground transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="font-semibold text-foreground text-[14px]">
                    {fmt(item.preco * item.quantidade)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-md bg-muted p-7 sticky top-24">
            <h2 className="font-heading font-semibold text-[1.1rem] text-foreground mb-5">
              Resumo
            </h2>

            <div className="space-y-2.5 text-[13px] mb-5 pb-5 border-b border-border">
              {items.map((item) => (
                <div key={`${item.id}-${item.tamanho}`} className="flex justify-between text-muted-foreground">
                  <span className="truncate max-w-[160px]">{item.nome} ×{item.quantidade}</span>
                  <span>{fmt(item.preco * item.quantidade)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-baseline mb-7">
              <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">Total</span>
              <span className="font-heading font-semibold text-xl text-foreground">
                {fmt(total())}
              </span>
            </div>

            <Link
              href="/checkout"
              className="rounded-md block w-full text-center bg-primary hover:bg-primary-hover text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 transition-colors duration-300"
            >
              Finalizar pedido
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
