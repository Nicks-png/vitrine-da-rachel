"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";

function fmt(v: number) {
  return "R$ " + v.toFixed(2).replace(".", ",");
}

type Cliente = {
  nome: string;
  email: string;
  telefone: string;
};

function Field({
  id,
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="rounded-md w-full border border-border focus:border-primary focus:outline-none bg-white px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground/60 transition-colors"
      />
    </div>
  );
}

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
      <div className="max-w-2xl mx-auto px-8 py-28 text-center">
        <ShoppingBag size={44} strokeWidth={1} className="text-border mx-auto mb-6" />
        <h1 className="font-heading text-[1.8rem] font-semibold text-foreground mb-3">
          Carrinho vazio
        </h1>
        <p className="text-muted-foreground text-[14px] mb-9">Adicione produtos antes de finalizar.</p>
        <Link
          href="/loja"
          className="rounded-md inline-block bg-primary hover:bg-primary-hover text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium px-9 py-3.5 transition-colors duration-300"
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
    <div className="max-w-4xl mx-auto px-8 py-14">
      <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-2">Finalizar</p>
      <h1 className="font-heading text-[2rem] font-semibold text-foreground mb-10">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Formulário / Pagamento */}
        <div className="lg:col-span-2">
          {etapa === "dados" ? (
            <form onSubmit={handleContinuar} className="rounded-md bg-card border border-border p-7 space-y-5">
              <h2 className="font-heading font-semibold text-[1.1rem] text-foreground pb-5 border-b border-border">
                Seus dados
              </h2>

              <Field
                id="nome"
                label="Nome completo"
                value={cliente.nome}
                onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                placeholder="Seu nome"
                required
              />

              <Field
                id="email"
                label="E-mail"
                type="email"
                value={cliente.email}
                onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                placeholder="seu@email.com"
                required
              />

              <Field
                id="telefone"
                label="Telefone / WhatsApp"
                type="tel"
                value={cliente.telefone}
                onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                placeholder="(11) 99999-9999"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-md w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 mt-2 transition-colors duration-300"
              >
                {loading ? "Processando..." : "Continuar para pagamento"}
              </button>
            </form>
          ) : (
            <div className="rounded-md bg-card border border-border p-7">
              <h2 className="font-heading font-semibold text-[1.1rem] text-foreground pb-5 mb-6 border-b border-border">
                Pagamento
              </h2>
              <p className="text-[13.5px] text-muted-foreground leading-[1.8] mb-7">
                Clique abaixo para ser redirecionado ao MercadoPago e concluir seu pagamento com segurança.
              </p>
              {initPoint && (
                <a
                  href={initPoint}
                  className="rounded-md block w-full text-center bg-[#009ee3] hover:bg-[#0087c8] text-white font-semibold text-[13px] py-4 transition-colors"
                >
                  Pagar com MercadoPago
                </a>
              )}
              <button
                onClick={() => setEtapa("dados")}
                className="mt-5 text-[11px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors w-full text-center"
              >
                ← Voltar e editar dados
              </button>
            </div>
          )}
        </div>

        {/* Resumo */}
        <div className="lg:col-span-1">
          <div className="rounded-md bg-muted p-7 sticky top-24">
            <h2 className="font-heading font-semibold text-[1.1rem] text-foreground mb-5">
              Resumo
            </h2>

            <div className="space-y-2.5 text-[13px] mb-5 pb-5 border-b border-border">
              {items.map((item) => (
                <div key={`${item.id}-${item.tamanho}`} className="flex justify-between text-muted-foreground">
                  <span className="truncate max-w-[150px]">{item.nome} ×{item.quantidade}</span>
                  <span>{fmt(item.preco * item.quantidade)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">Total</span>
              <span className="font-heading font-semibold text-xl text-foreground">
                {fmt(total())}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
