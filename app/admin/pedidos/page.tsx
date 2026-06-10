import { createServerSupabaseClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { Pedido } from "@/lib/types";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-700" },
  approved: { label: "Aprovado", color: "bg-green-100 text-green-700" },
  in_process: { label: "Em análise", color: "bg-blue-100 text-blue-700" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-700" },
};

async function getPedidos(): Promise<Pedido[]> {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("pedidos")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Pedido[]) ?? [];
}

export default async function AdminPedidosPage() {
  const pedidos = await getPedidos();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Pedidos</h1>

      {pedidos.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p>Nenhum pedido ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => {
            const statusInfo = STATUS_LABELS[pedido.status] ?? {
              label: pedido.status,
              color: "bg-gray-100 text-gray-700",
            };

            return (
              <div key={pedido.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{pedido.cliente_nome}</p>
                    <p className="text-xs text-gray-500">{pedido.cliente_email} · {pedido.cliente_telefone}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(pedido.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                    <p className="font-bold text-[#F4A7B9] text-lg mt-1">
                      R$ {pedido.total.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-1">
                  {pedido.itens.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm text-gray-600">
                      <span>
                        {item.nome}
                        {item.tamanho && <span className="text-gray-400"> · {item.tamanho}</span>}
                        {" "}×{item.quantidade}
                      </span>
                      <span>R$ {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
