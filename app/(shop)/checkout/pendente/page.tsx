import Link from "next/link";
import { Clock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CheckoutPendentePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <Clock size={64} className="text-yellow-400 mx-auto mb-6" />
      <h1 className="font-heading text-3xl font-bold text-[#2D2D2D] mb-3">
        Pagamento em análise
      </h1>
      <p className="text-muted-foreground mb-8">
        Seu pagamento está sendo processado. Você receberá uma confirmação por e-mail assim que for aprovado.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants(), "bg-[#F4A7B9] hover:bg-[#e8919e] text-white border-0")}
      >
        Voltar ao início
      </Link>
    </div>
  );
}
