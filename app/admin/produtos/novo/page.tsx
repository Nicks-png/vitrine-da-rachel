import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export default async function NovoProdutoPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Novo produto</h1>
      <ProductForm />
    </div>
  );
}
