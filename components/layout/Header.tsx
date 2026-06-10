"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import CartDrawer from "@/components/shop/CartDrawer";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#F5ECD7] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-heading text-2xl font-bold text-[#2D2D2D]">
            Vitrine da Rachel
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/loja" className="text-sm font-medium text-[#2D2D2D] hover:text-[#F4A7B9] transition-colors">
              Loja
            </Link>
            <Link href="/loja?categoria=Roupas" className="text-sm font-medium text-[#2D2D2D] hover:text-[#F4A7B9] transition-colors">
              Roupas
            </Link>
            <Link href="/loja?categoria=Acessórios" className="text-sm font-medium text-[#2D2D2D] hover:text-[#F4A7B9] transition-colors">
              Acessórios
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-[#2D2D2D] hover:text-[#F4A7B9] transition-colors"
              aria-label="Carrinho"
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#F4A7B9] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 text-[#2D2D2D]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[#F5ECD7] px-4 py-4 flex flex-col gap-4">
            <Link href="/loja" className="text-sm font-medium text-[#2D2D2D]" onClick={() => setMenuOpen(false)}>
              Loja
            </Link>
            <Link href="/loja?categoria=Roupas" className="text-sm font-medium text-[#2D2D2D]" onClick={() => setMenuOpen(false)}>
              Roupas
            </Link>
            <Link href="/loja?categoria=Acessórios" className="text-sm font-medium text-[#2D2D2D]" onClick={() => setMenuOpen(false)}>
              Acessórios
            </Link>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
