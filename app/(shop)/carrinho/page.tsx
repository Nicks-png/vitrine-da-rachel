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
        <ShoppingBag size={44} strokeWidth={1} className="text-[#E0D3C6] mx-auto mb-6" />
        <h1
          className="text-[1.8rem] font-semibold text-[#1C1410] mb-3"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Carrinho vazio
        </h1>
        <p className="text-[#7A6458] text-[14px] mb-9">Adicione produtos para continuar.</p>
        <Link
          href="/loja"
          className="inline-block bg-[#1C1410] hover:bg-[#8B2E4A] text-white text-[11px] tracking-[0.15em] uppercase font-medium px-9 py-3.5 transition-colors duration-300"
        >
          Ir para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-14">
      <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8956A] font-medium mb-2">Sacola</p>
      <h1
        className="text-[2rem] font-semibold text-[#1C1410] mb-10"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Carrinho
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-5">
          {items.map((item) => (
            <div key={`${item.id}-${item.tamanho}`} className="flex gap-4 bg-white border border-[#E0D3C6] p-4">
              <div className="relative w-20 h-24 bg-[#F2EAE0] shrink-0">
                {item.imagem ? (
                  <Image src={item.imagem} alt={item.nome} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={20} strokeWidth={1} className="text-[#E0D3C6]" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-[#1C1410] text-[14px]">{item.nome}</p>
                    {item.tamanho && (
                      <p className="text-[11px] text-[#7A6458] mt-0.5">Tamanho {item.tamanho}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.tamanho)}
                    className="text-[#E0D3C6] hover:text-[#8B2E4A] transition-colors ml-2"
                    aria-label="Remover"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.tamanho, item.quantidade - 1)}
                      className="w-7 h-7 border border-[#E0D3C6] hover:border-[#8B2E4A] flex items-center justify-center text-[#7A6458] transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-[13px] font-medium">{item.quantidade}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.tamanho, item.quantidade + 1)}
                      className="w-7 h-7 border border-[#E0D3C6] hover:border-[#8B2E4A] flex items-center justify-center text-[#7A6458] transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="font-semibold text-[#8B2E4A] text-[14px]">
                    {fmt(item.preco * item.quantidade)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#F2EAE0] p-7 sticky top-24">
            <h2
              className="font-semibold text-[1.1rem] text-[#1C1410] mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Resumo
            </h2>

            <div className="space-y-2.5 text-[13px] mb-5 pb-5 border-b border-[#E0D3C6]">
              {items.map((item) => (
                <div key={`${item.id}-${item.tamanho}`} className="flex justify-between text-[#7A6458]">
                  <span className="truncate max-w-[160px]">{item.nome} ×{item.quantidade}</span>
                  <span>{fmt(item.preco * item.quantidade)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-baseline mb-7">
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#7A6458]">Total</span>
              <span
                className="font-semibold text-xl text-[#1C1410]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {fmt(total())}
              </span>
            </div>

            <Link
              href="/checkout"
              className="block w-full text-center bg-[#1C1410] hover:bg-[#8B2E4A] text-white text-[11px] tracking-[0.15em] uppercase font-medium py-4 transition-colors duration-300"
            >
              Finalizar pedido
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
