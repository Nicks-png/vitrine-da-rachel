"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import CartDrawer from "@/components/shop/CartDrawer";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());

  useEffect(() => setMounted(true), []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/97 backdrop-blur-md border-b border-[#E0D3C6]">
        <div className="w-full px-10 h-[4.75rem] flex items-center">

          {/* Nav esquerda */}
          <nav className="hidden md:flex items-center gap-10 flex-1">
            {[
              { label: "Loja", href: "/loja" },
              { label: "Roupas", href: "/loja?categoria=Roupas" },
              { label: "Acessórios", href: "/loja?categoria=Acessórios" },
            ].map(({ label, href }) => (
              <Link key={href} href={href}
                className="text-[10.5px] tracking-[0.18em] uppercase font-medium text-[#7A6458] hover:text-[#1C1410] transition-colors duration-300 relative group">
                {label}
                <span className="absolute -bottom-px left-0 h-px w-0 bg-[#B8956A] group-hover:w-full transition-[width] duration-500" />
              </Link>
            ))}
          </nav>

          {/* Logo — centro */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center group">
            <span className="block text-[1.35rem] font-semibold text-[#1C1410] tracking-[-0.03em] whitespace-nowrap leading-none"
              style={{ fontFamily: "var(--font-playfair)" }}>
              Vitrine da Rachel
            </span>
            <span className="block text-[8px] tracking-[0.32em] uppercase text-[#B8956A] font-medium mt-0.5">
              curadoria pessoal
            </span>
          </Link>

          {/* Direita */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 text-[#7A6458] hover:text-[#8B2E4A] transition-colors"
              aria-label="Carrinho"
            >
              <ShoppingBag size={19} />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#8B2E4A] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-1.5 text-[#7A6458]" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#FAF8F5] border-t border-[#E0D3C6] px-8 py-7 flex flex-col gap-6">
            {[
              { label: "Loja", href: "/loja" },
              { label: "Roupas", href: "/loja?categoria=Roupas" },
              { label: "Acessórios", href: "/loja?categoria=Acessórios" },
            ].map(({ label, href }) => (
              <Link key={href} href={href}
                className="text-[10.5px] tracking-[0.18em] uppercase font-medium text-[#7A6458] hover:text-[#1C1410] transition-colors"
                onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
