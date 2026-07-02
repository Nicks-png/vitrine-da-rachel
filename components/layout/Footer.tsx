import Link from "next/link";
import { Phone, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1C1410] text-white/50 mt-auto">
      <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="text-white text-[1.25rem] font-semibold mb-1.5 leading-none"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Vitrine da Rachel
          </p>
          <p className="text-[8.5px] tracking-[0.32em] uppercase text-[#B8956A] font-medium mb-5">
            Curadoria pessoal
          </p>
          <p className="text-[13px] leading-[1.8]">
            Roupas e acessórios femininos escolhidos com critério e carinho. Cada peça, uma seleção pessoal.
          </p>
        </div>

        <div>
          <p className="text-white text-xs tracking-[0.2em] uppercase font-medium mb-5">Navegar</p>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Ver tudo", href: "/loja" },
              { label: "Roupas", href: "/loja?categoria=Roupas" },
              { label: "Acessórios", href: "/loja?categoria=Acessórios" },
            ].map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="hover:text-white transition-colors">{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white text-xs tracking-[0.2em] uppercase font-medium mb-5">Contato</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={13} /> WhatsApp
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors">
                <ExternalLink size={13} /> @vitrinedarachel
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/25">
        <span>© {new Date().getFullYear()} Vitrine da Rachel</span>
        <span className="italic" style={{ fontFamily: "var(--font-playfair)" }}>
          "Curado com amor."
        </span>
      </div>
    </footer>
  );
}
