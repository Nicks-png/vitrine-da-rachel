"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export default function CheckoutSucessoPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <CheckCircle size={64} className="text-emerald-500 mx-auto mb-6" />
      <h1 className="font-heading text-3xl font-bold text-[#2D2D2D] mb-3">
        Pedido confirmado!
      </h1>
      <p className="text-muted-foreground mb-8">
        Obrigada pela sua compra! Você receberá uma confirmação no seu e-mail em breve.
      </p>
      <Link
        href="/loja"
        className={cn(buttonVariants(), "bg-[#F4A7B9] hover:bg-[#e8919e] text-white border-0")}
      >
        Continuar comprando
      </Link>
    </div>
  );
}
