import Link from "next/link";

export default function SobrePage() {
  return (
    <div>
      {/* Cabeçalho */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-16 pb-2 md:pt-24 md:pb-4">
        <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-4">Pitaya Rosa</p>
        <h1 className="font-heading text-[2.4rem] sm:text-[3rem] font-semibold text-foreground leading-[1.1]">
          Oi! Eu sou a Rachel. <span aria-hidden="true">💛</span>
        </h1>
      </section>

      {/* Texto */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 pb-16 md:pb-20">
        <div className="space-y-6 text-[14.5px] sm:text-[15px] leading-[1.85] text-foreground/85 max-w-2xl">
          <p>
            Sou profissional de RH, mãe de três filhos (quase adultos!), casada com o amor da minha
            vida, vegetariana, apaixonada por animais e estudante de Medicina Veterinária, realizando
            um sonho que sempre esteve no meu coração.
          </p>
          <p>
            Também sou apaixonada por moda, especialmente por peças que unem estilo, conforto e
            personalidade. Por isso nasceu este cantinho: um espaço com roupas novas e uma seleção
            especial de moda circular, escolhidas com muito carinho, porque acredito que uma boa peça
            pode ganhar novas histórias.
          </p>
          <p>
            Treinar virou uma paixão descoberta mais tarde, hoje faz parte da minha rotina. Amo estar
            em casa com a família, assistir a um bom filme e, apesar de ouvir praticamente de tudo,
            dificilmente resisto quando toca um Belo. <span aria-hidden="true">🎶</span>
          </p>
          <p>
            Quero que você se sinta à vontade por aqui.{" "}
            <span className="text-foreground font-medium">A melhor parte? A loja vai até você!</span>{" "}
            Assim, além de encontrar peças incríveis, você pode experimentar tudo com conforto e
            praticidade, sem precisar sair de casa.
          </p>
          <p>
            Fique à vontade para dar uma espiadinha, conhecer as novidades e fazer parte dessa
            história. Vai ser um prazer ter você por aqui!
          </p>
        </div>
      </section>

      {/* CTA de fechamento */}
      <section className="bg-ink py-16 md:py-20 px-5 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[9px] tracking-[0.4em] uppercase text-foil-gold font-medium mb-5">
            Curadoria pessoal
          </p>
          <h2 className="text-[1.5rem] sm:text-[1.9rem] font-semibold text-background mb-8">
            Vem fazer parte dessa história?
          </h2>
          <Link
            href="/loja"
            className="rounded-md inline-block border border-background/20 hover:border-foil-gold text-background/80 hover:text-foil-gold text-[9px] tracking-[0.25em] uppercase font-medium px-9 md:px-12 py-3.5 md:py-4 transition-colors duration-400 focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-background focus-visible:outline-offset-2"
          >
            Conhecer o bazar
          </Link>
        </div>
      </section>

      {/* WhatsApp discreto */}
      <div className="bg-secondary py-5 px-5 md:px-8 text-center border-t border-border">
        <p className="text-[12.5px] text-muted-foreground">
          Quer conversar comigo direto?{" "}
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:text-primary-hover transition-colors duration-300 underline-offset-3 hover:underline"
          >
            Fale comigo no WhatsApp →
          </a>
        </p>
      </div>
    </div>
  );
}
