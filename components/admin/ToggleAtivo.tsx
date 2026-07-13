"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";

type Props = { id: string; ativo: boolean };

export default function ToggleAtivo({ id, ativo: initialAtivo }: Props) {
  const [ativo, setAtivo] = useState(initialAtivo);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("produtos")
      .update({ ativo: !ativo })
      .eq("id", id);
    if (error) {
      toast.error("Erro ao atualizar status");
    } else {
      setAtivo(!ativo);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
        ativo ? "bg-primary" : "bg-gray-200"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      aria-label={ativo ? "Desativar" : "Ativar"}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
          ativo ? "translate-x-4.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
