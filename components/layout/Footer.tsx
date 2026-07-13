import Link from "next/link";
import { Phone, ExternalLink } from "lucide-react";
import Logo from "@/components/layout/Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-background/50 mt-auto">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        <div>
          <Logo variant="dark" className="mb-3" />
          <p className="text-[8.5px] tracking-[0.32em] uppercase text-foil-gold font-medium mb-5">
            Curadoria pessoal
          </p>
          <p className="text-[13px] leading-[1.8]">
            Roupas e acessórios femininos escolhidos com critério e carinho. Cada peça, uma seleção pessoal.
          </p>
        </div>

        <div>
          <p className="text-background text-xs tracking-[0.2em] uppercase font-medium mb-5">Navegar</p>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Ver tudo", href: "/loja" },
              { label: "Roupas", href: "/loja?categoria=Roupas" },
              { label: "Acessórios", href: "/loja?categoria=Acessórios" },
              { label: "Sobre", href: "/sobre" },
            ].map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="hover:text-background transition-colors focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-background focus-visible:outline-offset-2 rounded-sm">{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-background text-xs tracking-[0.2em] uppercase font-medium mb-5">Contato</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-background transition-colors focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-background focus-visible:outline-offset-2 rounded-sm w-fit">
                <Phone size={13} /> WhatsApp
              </a>
            </li>
            <li>
              <a href="https://instagram.com/pitayarosa" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-background transition-colors focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-background focus-visible:outline-offset-2 rounded-sm w-fit">
                <ExternalLink size={13} /> @pitayarosa
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 py-6 px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-background/25">
        <span>© {new Date().getFullYear()} Pitaya Rosa</span>
        <span className="italic">
          &ldquo;Curado com amor.&rdquo;
        </span>
      </div>
    </footer>
  );
}
