"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cart-store";

type Props = { open: boolean; onClose: () => void };

function fmt(v: number) { return "R$ " + v.toFixed(2).replace(".", ","); }

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="w-full sm:max-w-sm flex flex-col bg-background border-l border-border">
        <SheetHeader className="pb-5 border-b border-border">
          <SheetTitle className="font-heading font-semibold text-lg text-foreground">
            Carrinho
            {items.length > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({items.length} {items.length === 1 ? "item" : "itens"})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag size={40} strokeWidth={1} className="text-border" />
            <p className="text-sm">Seu carrinho está vazio</p>
            <Link href="/loja" onClick={onClose}
              className="text-xs tracking-[0.15em] uppercase font-medium border border-border hover:border-primary text-muted-foreground hover:text-primary px-6 py-2.5 rounded-sm transition-colors">
              Ver produtos
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto -mx-6 px-6 space-y-5 py-5">
              {items.map((item) => (
                <div key={`${item.id}-${item.tamanho}`} className="flex gap-3">
                  <div className="relative w-16 h-20 rounded-md overflow-hidden bg-muted shrink-0">
                    {item.imagem
                      ? <Image src={item.imagem} alt={item.nome} fill className="object-cover" />
                      : <div className="w-full h-full flex items-center justify-center"><ShoppingBag size={16} className="text-border" /></div>
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate leading-snug">{item.nome}</p>
                    {item.tamanho && <p className="text-[11px] text-muted-foreground mt-0.5">Tamanho {item.tamanho}</p>}
                    <p className="text-sm font-semibold text-foreground mt-1">{fmt(item.preco * item.quantidade)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.tamanho, item.quantidade - 1)}
                        className="w-6 h-6 border border-border hover:border-primary flex items-center justify-center text-muted-foreground transition-colors rounded-sm">
                        <Minus size={11} />
                      </button>
                      <span className="text-sm w-4 text-center font-medium">{item.quantidade}</span>
                      <button onClick={() => updateQuantity(item.id, item.tamanho, item.quantidade + 1)}
                        className="w-6 h-6 border border-border hover:border-primary flex items-center justify-center text-muted-foreground transition-colors rounded-sm">
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>

                  <button onClick={() => removeItem(item.id, item.tamanho)}
                    className="text-border hover:text-primary transition-colors shrink-0 mt-0.5">
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-5 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">Total</span>
                <span className="font-heading font-semibold text-xl text-foreground">
                  {fmt(total())}
                </span>
              </div>
              <Link href="/checkout" onClick={onClose}
                className="rounded-md block w-full text-center bg-primary hover:bg-primary-hover text-primary-foreground text-xs tracking-[0.15em] uppercase font-medium py-4 transition-colors">
                Finalizar pedido
              </Link>
              <Link href="/carrinho" onClick={onClose}
                className="rounded-md block w-full text-center border border-border hover:border-primary text-muted-foreground hover:text-primary text-xs tracking-[0.15em] uppercase font-medium py-3 transition-colors">
                Ver carrinho
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
