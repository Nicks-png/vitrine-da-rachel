import Link from "next/link";
import { Phone, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F5ECD7] border-t border-[#F4A7B9]/30 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-[#2D2D2D] mb-2">Vitrine da Rachel</h3>
          <p className="text-sm text-[#2D2D2D]/70">
            Roupas e acessórios femininos com estilo e carinho.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-[#2D2D2D] mb-3">Links</h4>
          <ul className="space-y-2 text-sm text-[#2D2D2D]/70">
            <li><Link href="/loja" className="hover:text-[#F4A7B9] transition-colors">Loja</Link></li>
            <li><Link href="/loja?categoria=Roupas" className="hover:text-[#F4A7B9] transition-colors">Roupas</Link></li>
            <li><Link href="/loja?categoria=Acessórios" className="hover:text-[#F4A7B9] transition-colors">Acessórios</Link></li>
            <li><Link href="/carrinho" className="hover:text-[#F4A7B9] transition-colors">Carrinho</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-[#2D2D2D] mb-3">Contato</h4>
          <ul className="space-y-2 text-sm text-[#2D2D2D]/70">
            <li className="flex items-center gap-2">
              <ExternalLink size={15} />
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F4A7B9] transition-colors">
                @vitrinedarachel
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} />
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-[#F4A7B9] transition-colors">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#F4A7B9]/20 text-center py-4 text-xs text-[#2D2D2D]/50">
        © {new Date().getFullYear()} Vitrine da Rachel — Todos os direitos reservados
      </div>
    </footer>
  );
}
