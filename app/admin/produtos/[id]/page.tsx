import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect, notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import type { Produto } from "@/lib/types";

type Props = { params: Promise<{ id: string }> };

export default async function EditarProdutoPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase.from("produtos").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Editar produto</h1>
      <ProductForm produto={data as Produto} />
    </div>
  );
}
