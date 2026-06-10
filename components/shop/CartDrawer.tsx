"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">Carrinho</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag size={48} className="text-[#F4A7B9]/40" />
            <p className="text-sm">Seu carrinho está vazio</p>
            <Link
              href="/loja"
              onClick={onClose}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto -mx-6 px-6 space-y-4 py-2">
              {items.map((item) => (
                <div key={`${item.id}-${item.tamanho}`} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#F5ECD7] shrink-0">
                    {item.imagem ? (
                      <Image src={item.imagem} alt={item.nome} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={20} className="text-[#F4A7B9]/40" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2D2D2D] truncate">{item.nome}</p>
                    {item.tamanho && (
                      <p className="text-xs text-muted-foreground">Tam: {item.tamanho}</p>
                    )}
                    <p className="text-sm text-[#F4A7B9] font-semibold">
                      R$ {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.tamanho, item.quantidade - 1)}
                        className="p-0.5 rounded border border-border hover:border-[#F4A7B9] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm w-5 text-center">{item.quantidade}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.tamanho, item.quantidade + 1)}
                        className="p-0.5 rounded border border-border hover:border-[#F4A7B9] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id, item.tamanho)}
                    className="text-muted-foreground hover:text-destructive transition-colors mt-0.5"
                    aria-label="Remover"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4">
              <Separator />
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span className="text-[#F4A7B9] text-lg">
                  R$ {total().toFixed(2).replace(".", ",")}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className={cn(
                  buttonVariants(),
                  "w-full justify-center bg-[#F4A7B9] hover:bg-[#e8919e] text-white border-0"
                )}
              >
                Finalizar pedido
              </Link>
              <Link
                href="/carrinho"
                onClick={onClose}
                className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")}
              >
                Ver carrinho completo
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
