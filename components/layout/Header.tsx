"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { useCartStore } from "@/lib/cart-store";
import CartDrawer from "@/components/shop/CartDrawer";

const emptySubscribe = () => () => {};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="w-full px-5 md:px-10 h-[4.5rem] md:h-[4.75rem] grid grid-cols-[auto_1fr_auto] md:flex md:items-center items-center gap-2">

          {/* Esquerda: nav no desktop, hamburguer no mobile */}
          <div className="flex items-center md:flex-1">
            <nav className="hidden md:flex items-center gap-10">
              {[
                { label: "Loja", href: "/loja" },
                { label: "Roupas", href: "/loja?categoria=Roupas" },
                { label: "Acessórios", href: "/loja?categoria=Acessórios" },
              ].map(({ label, href }) => (
                <Link key={href} href={href}
                  className="text-[10.5px] tracking-[0.18em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm">
                  {label}
                  <span className="absolute -bottom-px left-0 h-px w-0 bg-primary group-hover:w-full transition-[width] duration-500" />
                </Link>
              ))}
            </nav>
            <button className="md:hidden p-1.5 -ml-1.5 text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Logo — centro. Grid garante que nunca sobrepõe os ícones nas laterais, mesmo em telas estreitas. */}
          <Link href="/" className="justify-self-center md:absolute md:left-1/2 md:-translate-x-1/2 text-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm">
            <span className="block font-heading uppercase text-[0.95rem] md:text-[1.2rem] text-foreground tracking-[0.03em] md:tracking-[0.04em] whitespace-nowrap leading-none">
              Vitrine da Rachel
            </span>
            <span className="hidden sm:block text-[8px] tracking-[0.32em] uppercase text-muted-foreground font-medium mt-1.5">
              curadoria pessoal
            </span>
          </Link>

          {/* Direita: carrinho */}
          <div className="flex items-center justify-end md:flex-1">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              aria-label="Carrinho"
            >
              <ShoppingBag size={19} />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-5 py-7 flex flex-col gap-6">
            {[
              { label: "Loja", href: "/loja" },
              { label: "Roupas", href: "/loja?categoria=Roupas" },
              { label: "Acessórios", href: "/loja?categoria=Acessórios" },
            ].map(({ label, href }) => (
              <Link key={href} href={href}
                className="text-[10.5px] tracking-[0.18em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors"
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
