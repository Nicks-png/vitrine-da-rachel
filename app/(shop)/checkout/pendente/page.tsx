import Link from "next/link";
import { Clock } from "lucide-react";

export default function CheckoutPendentePage() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-28 text-center">
      <Clock size={48} strokeWidth={1.2} className="text-[#B8956A] mx-auto mb-7" />
      <p className="text-[9px] tracking-[0.4em] uppercase text-[#B8956A] font-medium mb-3">Em análise</p>
      <h1
        className="text-[2rem] font-semibold text-[#1C1410] mb-4"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Pagamento em análise
      </h1>
      <p className="text-[#7A6458] text-[14px] leading-[1.8] mb-10 max-w-sm mx-auto">
        Seu pagamento está sendo processado. Você receberá uma confirmação por e-mail assim que for aprovado.
      </p>
      <Link
        href="/"
        className="rounded-md inline-block bg-[#1C1410] hover:bg-[#8B2E4A] text-white text-[11px] tracking-[0.15em] uppercase font-medium px-9 py-3.5 transition-colors duration-300"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
