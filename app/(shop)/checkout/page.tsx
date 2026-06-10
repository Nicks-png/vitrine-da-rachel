"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Cliente = {
  nome: string;
  email: string;
  telefone: string;
};

export default function CheckoutPage() {
  const { items, total } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [etapa, setEtapa] = useState<"dados" | "pagamento">("dados");
  const [initPoint, setInitPoint] = useState<string | null>(null);
  const [cliente, setCliente] = useState<Cliente>({
    nome: "",
    email: "",
    telefone: "",
  });

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={56} className="text-[#F4A7B9]/30 mx-auto mb-4" />
        <h1 className="font-heading text-2xl font-bold text-[#2D2D2D] mb-2">Carrinho vazio</h1>
        <p className="text-muted-foreground mb-8">Adicione produtos antes de finalizar.</p>
        <Link
          href="/loja"
          className={cn(buttonVariants(), "bg-[#F4A7B9] hover:bg-[#e8919e] text-white border-0")}
        >
          Ir para a loja
        </Link>
      </div>
    );
  }

  async function handleContinuar(e: React.FormEvent) {
    e.preventDefault();
    if (!cliente.nome || !cliente.email || !cliente.telefone) {
      toast.error("Preencha todos os campos");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/pagamento/criar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente, itens: items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setInitPoint(data.init_point);
      setEtapa("pagamento");
    } catch {
      toast.error("Erro ao processar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl font-bold text-[#2D2D2D] mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário / Pagamento */}
        <div className="lg:col-span-2">
          {etapa === "dados" ? (
            <form onSubmit={handleContinuar} className="bg-white rounded-xl border border-[#F5ECD7] p-6 space-y-4">
              <h2 className="font-heading font-semibold text-lg text-[#2D2D2D]">Seus dados</h2>
              <Separator />

              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo</Label>
                <Input
                  id="nome"
                  value={cliente.nome}
                  onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={cliente.email}
                  onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone / WhatsApp</Label>
                <Input
                  id="telefone"
                  type="tel"
                  value={cliente.telefone}
                  onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F4A7B9] hover:bg-[#e8919e] text-white border-0 h-12 text-base mt-2"
              >
                {loading ? "Processando..." : "Continuar para pagamento"}
              </Button>
            </form>
          ) : (
            <div className="bg-white rounded-xl border border-[#F5ECD7] p-6">
              <h2 className="font-heading font-semibold text-lg text-[#2D2D2D] mb-4">Pagamento</h2>
              <Separator className="mb-6" />
              <p className="text-sm text-muted-foreground mb-6">
                Clique abaixo para ser redirecionado ao MercadoPago e concluir seu pagamento com segurança.
              </p>
              {initPoint && (
                <a
                  href={initPoint}
                  className="block w-full text-center bg-[#009ee3] hover:bg-[#0087c8] text-white font-semibold py-3.5 rounded-xl transition-colors"
                >
                  Pagar com MercadoPago
                </a>
              )}
              <button
                onClick={() => setEtapa("dados")}
                className="mt-4 text-sm text-muted-foreground hover:text-[#2D2D2D] transition-colors w-full text-center"
              >
                ← Voltar e editar dados
              </button>
            </div>
          )}
        </div>

        {/* Resumo */}
        <div className="lg:col-span-1">
          <div className="bg-[#F5ECD7]/50 rounded-xl p-6 sticky top-24">
            <h2 className="font-heading font-semibold text-lg text-[#2D2D2D] mb-4">Resumo</h2>
            <Separator className="mb-4" />

            <div className="space-y-2 text-sm mb-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.tamanho}`} className="flex justify-between text-muted-foreground">
                  <span className="truncate max-w-[150px]">{item.nome} ×{item.quantidade}</span>
                  <span>R$ {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}</span>
                </div>
              ))}
            </div>

            <Separator className="mb-4" />
            <div className="flex justify-between font-bold text-[#2D2D2D]">
              <span>Total</span>
              <span className="text-[#F4A7B9] text-lg">
                R$ {total().toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
