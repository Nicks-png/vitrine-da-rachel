import { NextRequest, NextResponse } from "next/server";
import { preference } from "@/lib/mercadopago";
import { createServiceClient } from "@/lib/supabase-server";
import type { CartItem } from "@/lib/cart-store";

type Body = {
  cliente: { nome: string; email: string; telefone: string };
  itens: CartItem[];
};

export async function POST(req: NextRequest) {
  try {
    const { cliente, itens } = (await req.json()) as Body;

    if (!cliente || !itens || itens.length === 0) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const total = itens.reduce((sum, i) => sum + i.preco * i.quantidade, 0);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const pref = await preference.create({
      body: {
        items: itens.map((item) => ({
          id: item.id,
          title: item.nome + (item.tamanho ? ` (${item.tamanho})` : ""),
          quantity: item.quantidade,
          unit_price: item.preco,
          currency_id: "BRL",
        })),
        payer: {
          name: cliente.nome,
          email: cliente.email,
          phone: { number: cliente.telefone },
        },
        back_urls: {
          success: `${appUrl}/checkout/sucesso`,
          failure: `${appUrl}/checkout`,
          pending: `${appUrl}/checkout/pendente`,
        },
        auto_return: "approved",
        notification_url: `${appUrl}/api/pagamento/webhook`,
      },
    });

    const supabase = await createServiceClient();
    await supabase.from("pedidos").insert({
      status: "pending",
      total,
      itens: itens.map((i) => ({
        produto_id: i.id,
        nome: i.nome,
        preco: i.preco,
        tamanho: i.tamanho,
        quantidade: i.quantidade,
        imagem: i.imagem,
      })),
      cliente_nome: cliente.nome,
      cliente_email: cliente.email,
      cliente_telefone: cliente.telefone,
      pagamento_id: pref.id,
    });

    return NextResponse.json({ init_point: pref.init_point });
  } catch (err) {
    console.error("[pagamento/criar]", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
