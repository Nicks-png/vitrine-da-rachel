"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={56} className="text-[#F4A7B9]/30 mx-auto mb-4" />
        <h1 className="font-heading text-2xl font-bold text-[#2D2D2D] mb-2">Carrinho vazio</h1>
        <p className="text-muted-foreground mb-8">Adicione produtos para continuar.</p>
        <Link
          href="/loja"
          className={cn(buttonVariants(), "bg-[#F4A7B9] hover:bg-[#e8919e] text-white border-0")}
        >
          Ir para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl font-bold text-[#2D2D2D] mb-8">Carrinho</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.id}-${item.tamanho}`} className="flex gap-4 bg-white rounded-xl border border-[#F5ECD7] p-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#F5ECD7] shrink-0">
                {item.imagem ? (
                  <Image src={item.imagem} alt={item.nome} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={24} className="text-[#F4A7B9]/30" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-[#2D2D2D]">{item.nome}</p>
                    {item.tamanho && (
                      <p className="text-xs text-muted-foreground">Tamanho: {item.tamanho}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.tamanho)}
                    className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.tamanho, item.quantidade - 1)}
                      className="p-1 rounded border border-border hover:border-[#F4A7B9] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantidade}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.tamanho, item.quantidade + 1)}
                      className="p-1 rounded border border-border hover:border-[#F4A7B9] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-semibold text-[#F4A7B9]">
                    R$ {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#F5ECD7]/50 rounded-xl p-6 sticky top-24">
            <h2 className="font-heading font-semibold text-lg text-[#2D2D2D] mb-4">Resumo</h2>
            <Separator className="mb-4" />

            <div className="space-y-2 text-sm mb-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.tamanho}`} className="flex justify-between text-muted-foreground">
                  <span className="truncate max-w-[160px]">{item.nome} ×{item.quantidade}</span>
                  <span>R$ {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}</span>
                </div>
              ))}
            </div>

            <Separator className="mb-4" />
            <div className="flex justify-between font-bold text-[#2D2D2D] mb-6">
              <span>Total</span>
              <span className="text-[#F4A7B9] text-lg">
                R$ {total().toFixed(2).replace(".", ",")}
              </span>
            </div>

            <Link
              href="/checkout"
              className={cn(
                buttonVariants(),
                "w-full justify-center bg-[#F4A7B9] hover:bg-[#e8919e] text-white border-0"
              )}
            >
              Finalizar pedido
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
