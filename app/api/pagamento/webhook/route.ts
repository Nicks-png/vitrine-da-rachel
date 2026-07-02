import { NextRequest, NextResponse } from "next/server";
import { payment } from "@/lib/mercadopago";
import { createServiceClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (type !== "payment" || !data?.id) {
      return NextResponse.json({ ok: true });
    }

    const paymentData = await payment.get({ id: data.id });
    const status = paymentData.status;
    const prefId = (paymentData as unknown as Record<string, unknown>).preference_id as string | undefined;

    if (!prefId) return NextResponse.json({ ok: true });

    const supabase = await createServiceClient();
    await supabase
      .from("pedidos")
      .update({ status, pagamento_id: String(data.id) })
      .eq("pagamento_id", prefId);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[webhook]", err);
    return NextResponse.json({ error: "Erro" }, { status: 500 });
  }
}
