"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

export default function CheckoutSucessoPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto px-8 py-28 text-center">
      <CheckCircle size={48} strokeWidth={1.2} className="text-emerald-600 mx-auto mb-7" />
      <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-3">Obrigada</p>
      <h1 className="font-heading text-[2rem] font-semibold text-foreground mb-4">
        Pedido confirmado!
      </h1>
      <p className="text-muted-foreground text-[14px] leading-[1.8] mb-10 max-w-sm mx-auto">
        Obrigada pela sua compra! Você receberá uma confirmação no seu e-mail em breve.
      </p>
      <Link
        href="/loja"
        className="rounded-md inline-block bg-primary hover:bg-primary-hover text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium px-9 py-3.5 transition-colors duration-300"
      >
        Continuar comprando
      </Link>
    </div>
  );
}
