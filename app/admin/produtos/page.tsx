import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { Plus, Pencil } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import ToggleAtivo from "@/components/admin/ToggleAtivo";
import { cn } from "@/lib/utils";
import type { Produto } from "@/lib/types";

async function getProdutos(): Promise<Produto[]> {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("produtos")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Produto[]) ?? [];
}

export default async function AdminProdutosPage() {
  const produtos = await getProdutos();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
          <p className="text-sm text-gray-500 mt-1">{produtos.length} produto(s) cadastrado(s)</p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className={cn(buttonVariants(), "bg-[#F4A7B9] hover:bg-[#e8919e] text-white border-0")}
        >
          <Plus size={16} className="mr-1" />
          Novo produto
        </Link>
      </div>

      {produtos.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p>Nenhum produto ainda.</p>
          <Link href="/admin/produtos/novo" className="text-[#F4A7B9] hover:underline mt-2 inline-block text-sm">
            Criar primeiro produto
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-gray-600 font-medium">Produto</th>
                <th className="text-left px-5 py-3 text-gray-600 font-medium">Categoria</th>
                <th className="text-left px-5 py-3 text-gray-600 font-medium">Preço</th>
                <th className="text-left px-5 py-3 text-gray-600 font-medium">Estoque</th>
                <th className="text-left px-5 py-3 text-gray-600 font-medium">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {produtos.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-900 max-w-[200px] truncate">
                    {p.nome}
                  </td>
                  <td className="px-5 py-4 text-gray-500">{p.categoria}</td>
                  <td className="px-5 py-4 text-gray-900">
                    R$ {p.preco.toFixed(2).replace(".", ",")}
                    {p.preco_promocional && (
                      <span className="ml-1 text-xs text-[#F4A7B9]">
                        → R$ {p.preco_promocional.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={p.estoque === 0 ? "text-red-500" : "text-gray-900"}>
                      {p.estoque}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <ToggleAtivo id={p.id} ativo={p.ativo} />
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/produtos/${p.id}`}
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                    >
                      <Pencil size={14} className="mr-1" />
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
