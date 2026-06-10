"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function AdminLogout() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors w-full"
    >
      <LogOut size={17} />
      Sair
    </button>
  );
}
