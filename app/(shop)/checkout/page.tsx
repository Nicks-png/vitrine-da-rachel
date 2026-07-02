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
      <label htmlFor={id} className="block text-[10px] tracking-[0.2em] uppercase text-[#7A6458] font-medium">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full border border-[#E0D3C6] focus:border-[#8B2E4A] focus:outline-none bg-white px-4 py-3 text-[14px] text-[#1C1410] placeholder:text-[#B8A99B] transition-colors"
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
        <ShoppingBag size={44} strokeWidth={1} className="text-[#E0D3C6] mx-auto mb-6" />
        <h1
          className="text-[1.8rem] font-semibold text-[#1C1410] mb-3"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Carrinho vazio
        </h1>
        <p className="text-[#7A6458] text-[14px] mb-9">Adicione produtos antes de finalizar.</p>
        <Link
          href="/loja"
          className="inline-block bg-[#1C1410] hover:bg-[#8B2E4A] text-white text-[11px] tracking-[0.15em] uppercase font-medium px-9 py-3.5 transition-colors duration-300"
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
      <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8956A] font-medium mb-2">Finalizar</p>
      <h1
        className="text-[2rem] font-semibold text-[#1C1410] mb-10"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Formulário / Pagamento */}
        <div className="lg:col-span-2">
          {etapa === "dados" ? (
            <form onSubmit={handleContinuar} className="bg-white border border-[#E0D3C6] p-7 space-y-5">
              <h2
                className="font-semibold text-[1.1rem] text-[#1C1410] pb-5 border-b border-[#E0D3C6]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
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
                className="w-full bg-[#1C1410] hover:bg-[#8B2E4A] disabled:opacity-50 text-white text-[11px] tracking-[0.15em] uppercase font-medium py-4 mt-2 transition-colors duration-300"
              >
                {loading ? "Processando..." : "Continuar para pagamento"}
              </button>
            </form>
          ) : (
            <div className="bg-white border border-[#E0D3C6] p-7">
              <h2
                className="font-semibold text-[1.1rem] text-[#1C1410] pb-5 mb-6 border-b border-[#E0D3C6]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Pagamento
              </h2>
              <p className="text-[13.5px] text-[#7A6458] leading-[1.8] mb-7">
                Clique abaixo para ser redirecionado ao MercadoPago e concluir seu pagamento com segurança.
              </p>
              {initPoint && (
                <a
                  href={initPoint}
                  className="block w-full text-center bg-[#009ee3] hover:bg-[#0087c8] text-white font-semibold text-[13px] py-4 transition-colors"
                >
                  Pagar com MercadoPago
                </a>
              )}
              <button
                onClick={() => setEtapa("dados")}
                className="mt-5 text-[11px] tracking-[0.1em] uppercase text-[#7A6458] hover:text-[#1C1410] transition-colors w-full text-center"
              >
                ← Voltar e editar dados
              </button>
            </div>
          )}
        </div>

        {/* Resumo */}
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
                  <span className="truncate max-w-[150px]">{item.nome} ×{item.quantidade}</span>
                  <span>{fmt(item.preco * item.quantidade)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#7A6458]">Total</span>
              <span
                className="font-semibold text-xl text-[#1C1410]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {fmt(total())}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
