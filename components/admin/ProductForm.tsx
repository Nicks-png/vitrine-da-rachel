"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Upload, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Produto } from "@/lib/types";

const TAMANHOS_PADRAO = ["PP", "P", "M", "G", "GG", "XG", "Único"];

type Props = {
  produto?: Produto;
};

type Form = {
  nome: string;
  descricao: string;
  preco: string;
  preco_promocional: string;
  categoria: string;
  tamanhos: string[];
  estoque: string;
  ativo: boolean;
};

export default function ProductForm({ produto }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagensExistentes, setImagensExistentes] = useState<string[]>(produto?.imagens ?? []);
  const [novosArquivos, setNovosArquivos] = useState<File[]>([]);
  const [form, setForm] = useState<Form>({
    nome: produto?.nome ?? "",
    descricao: produto?.descricao ?? "",
    preco: produto?.preco.toString() ?? "",
    preco_promocional: produto?.preco_promocional?.toString() ?? "",
    categoria: produto?.categoria ?? "Roupas",
    tamanhos: produto?.tamanhos ?? [],
    estoque: produto?.estoque.toString() ?? "0",
    ativo: produto?.ativo ?? true,
  });

  function toggleTamanho(t: string) {
    setForm((prev) => ({
      ...prev,
      tamanhos: prev.tamanhos.includes(t)
        ? prev.tamanhos.filter((x) => x !== t)
        : [...prev.tamanhos, t],
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const total = imagensExistentes.length + novosArquivos.length + files.length;
    if (total > 5) {
      toast.error("Máximo de 5 imagens por produto");
      return;
    }
    setNovosArquivos((prev) => [...prev, ...files]);
  }

  function removeExistente(url: string) {
    setImagensExistentes((prev) => prev.filter((u) => u !== url));
  }

  function removeNovo(i: number) {
    setNovosArquivos((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function uploadImages(produtoId: string): Promise<string[]> {
    const supabase = createClient();
    const urls: string[] = [];
    for (const file of novosArquivos) {
      const ext = file.name.split(".").pop();
      const path = `${produtoId}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from("produtos")
        .upload(path, file, { upsert: false });
      if (error) { toast.error(`Erro ao enviar ${file.name}`); continue; }
      const { data: { publicUrl } } = supabase.storage.from("produtos").getPublicUrl(path);
      urls.push(publicUrl);
    }
    return urls;
  }

  function slugify(str: string) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome || !form.preco || !form.categoria) {
      toast.error("Preencha nome, preço e categoria");
      return;
    }
    setLoading(true);
    const supabase = createClient();

    try {
      const produtoId = produto?.id ?? crypto.randomUUID();
      const novasUrls = await uploadImages(produtoId);
      const todasImagens = [...imagensExistentes, ...novasUrls];

      const payload = {
        id: produtoId,
        nome: form.nome,
        descricao: form.descricao,
        preco: parseFloat(form.preco.replace(",", ".")),
        preco_promocional: form.preco_promocional
          ? parseFloat(form.preco_promocional.replace(",", "."))
          : null,
        categoria: form.categoria,
        tamanhos: form.tamanhos,
        imagens: todasImagens,
        slug: slugify(form.nome) + "-" + produtoId.slice(0, 6),
        estoque: parseInt(form.estoque),
        ativo: form.ativo,
      };

      if (produto) {
        await supabase.from("produtos").update(payload).eq("id", produto.id);
        toast.success("Produto atualizado!");
      } else {
        await supabase.from("produtos").insert(payload);
        toast.success("Produto criado!");
      }

      router.push("/admin/produtos");
      router.refresh();
    } catch {
      toast.error("Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 space-y-2">
          <Label>Nome do produto *</Label>
          <Input
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            placeholder="Ex: Blusa Floral Rosa"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Preço (R$) *</Label>
          <Input
            value={form.preco}
            onChange={(e) => setForm({ ...form, preco: e.target.value })}
            placeholder="59,90"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Preço promocional (R$)</Label>
          <Input
            value={form.preco_promocional}
            onChange={(e) => setForm({ ...form, preco_promocional: e.target.value })}
            placeholder="Deixe vazio se não houver"
          />
        </div>

        <div className="space-y-2">
          <Label>Categoria *</Label>
          <Select
            value={form.categoria}
            onValueChange={(v) => v && setForm({ ...form, categoria: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Roupas">Roupas</SelectItem>
              <SelectItem value="Acessórios">Acessórios</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Estoque *</Label>
          <Input
            type="number"
            min="0"
            value={form.estoque}
            onChange={(e) => setForm({ ...form, estoque: e.target.value })}
          />
        </div>

        <div className="sm:col-span-2 space-y-2">
          <Label>Descrição</Label>
          <Textarea
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            placeholder="Descreva o produto..."
            rows={3}
          />
        </div>
      </div>

      {/* Tamanhos */}
      <div className="space-y-2">
        <Label>Tamanhos disponíveis</Label>
        <div className="flex gap-2 flex-wrap">
          {TAMANHOS_PADRAO.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleTamanho(t)}
              className={`px-3 h-9 rounded-lg border text-sm font-medium transition-colors ${
                form.tamanhos.includes(t)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white text-gray-700 border-gray-200 hover:border-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Imagens */}
      <div className="space-y-2">
        <Label>Fotos do produto (máx. 5)</Label>

        <div className="flex gap-2 flex-wrap">
          {imagensExistentes.map((url) => (
            <div key={url} className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 group">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeExistente(url)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          ))}

          {novosArquivos.map((file, i) => (
            <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 group">
              <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeNovo(i)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          ))}

          {imagensExistentes.length + novosArquivos.length < 5 && (
            <label className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-200 hover:border-primary cursor-pointer flex flex-col items-center justify-center gap-1 transition-colors">
              <Upload size={16} className="text-gray-400" />
              <span className="text-[10px] text-gray-400">Foto</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>

      {/* Ativo */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="ativo"
          checked={form.ativo}
          onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
          className="w-4 h-4 accent-primary"
        />
        <Label htmlFor="ativo" className="cursor-pointer">Produto visível na loja</Label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary-hover text-primary-foreground px-8"
        >
          {loading ? "Salvando..." : produto ? "Salvar alterações" : "Criar produto"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/produtos")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
