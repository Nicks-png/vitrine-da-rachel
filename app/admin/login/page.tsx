"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
      toast.error("E-mail ou senha incorretos");
      setLoading(false);
      return;
    }
    router.push("/admin/produtos");
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="min-h-screen flex items-center justify-center bg-[#F5ECD7]/40 px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl border border-[#F5ECD7] shadow-sm p-8">
          <h1 className="font-heading text-2xl font-bold text-[#2D2D2D] mb-1 text-center">
            Vitrine da Rachel
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-8">Área administrativa</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rachel@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F4A7B9] hover:bg-[#e8919e] text-white h-11"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
