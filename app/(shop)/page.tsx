import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { mockProdutos } from "@/lib/mock-products";
import { buildCuratedSections } from "@/lib/product-sections";
import ProductCarousel from "@/components/shop/ProductCarousel";
import type { Produto } from "@/lib/types";

async function getCatalogo(): Promise<Produto[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("produtos").select("*").eq("ativo", true).gt("estoque", 0)
      .order("created_at", { ascending: false });
    if (error || !data?.length) return mockProdutos;
    return data as Produto[];
  } catch {
    return mockProdutos;
  }
}

export default async function HomePage() {
  const catalogo = await getCatalogo();
  const { escolhas, promocoes, lancamentos, ultimasUnidades } = buildCuratedSections(catalogo);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[460px] sm:h-[520px] md:h-[640px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.pexels.com/videos/7669196/pexels-photo-7669196.jpeg?w=1600"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/7669196/7669196-sd_960_506_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent sm:bg-gradient-to-r sm:from-ink/75 sm:via-ink/35 sm:to-transparent" />
        <div className="relative h-full max-w-6xl mx-auto px-5 sm:px-8 flex items-end sm:items-center pb-8 sm:pb-0">
          <div className="max-w-md">
            <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-background/85 font-medium mb-3 sm:mb-5">
              Pitaya Rosa · Curadoria Pessoal
            </p>
            <h1 className="text-[1.9rem] sm:text-4xl md:text-[3.1rem] font-semibold text-background leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6">
              Elegância sem exageros.
            </h1>
            <p className="text-background/80 text-[13px] sm:text-[14px] leading-[1.7] sm:leading-[1.8] mb-6 sm:mb-9 max-w-sm">
              Rachel Dias seleciona pessoalmente cada peça da Pitaya Rosa — roupas e acessórios femininos
              versáteis e sofisticados, para o guarda-roupa inteligente da mulher contemporânea.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/loja"
                className="rounded-md bg-primary hover:bg-primary-hover text-primary-foreground text-[11px] font-medium px-7 sm:px-9 py-3 sm:py-3.5 transition-colors duration-300 tracking-[0.15em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
                Ver a coleção
              </Link>
              <Link href="/loja?categoria=Acessórios"
                className="rounded-md border border-background/40 hover:border-background text-background/90 hover:text-background text-[11px] font-medium px-7 sm:px-9 py-3 sm:py-3.5 transition-colors duration-300 tracking-[0.15em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
                Acessórios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-16 md:py-20 px-5 md:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[2rem] font-semibold text-foreground">
              Categorias
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
            {[
              { label: "Roupas", sub: "Do casual ao elegante", href: "/loja?categoria=Roupas", img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80" },
              { label: "Acessórios", sub: "O detalhe que completa", href: "/loja?categoria=Acessórios", img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80" },
            ].map((cat) => (
              <Link key={cat.href} href={cat.href} className="group relative aspect-[4/5] overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                <img src={cat.img} alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7">
                  <p className="text-background font-semibold text-[1.6rem] leading-none mb-1.5 font-heading">{cat.label}</p>
                  <p className="text-background/55 text-[10px] tracking-[0.15em] uppercase">{cat.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Carrosséis de curadoria */}
      <div className="bg-secondary">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20 space-y-14 md:space-y-20">
          <ProductCarousel titulo="Escolhas da Rachel" descricao="A seleção pessoal da Rachel — peças que ela escolheria para si." produtos={escolhas} verTudoHref="/loja" />
          {promocoes.length > 0 && (
            <ProductCarousel titulo="Promoções" produtos={promocoes} verTudoHref="/loja" />
          )}
          <ProductCarousel titulo="Lançamentos" produtos={lancamentos} verTudoHref="/loja" />
          {ultimasUnidades.length > 0 && (
            <ProductCarousel titulo="Últimas unidades" produtos={ultimasUnidades} verTudoHref="/loja" />
          )}
        </div>
      </div>

      {/* Faixa de valores */}
      <section className="bg-ink py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[9px] tracking-[0.4em] uppercase text-foil-gold font-medium mb-5 md:mb-7">Minha filosofia</p>
          <h2 className="text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] font-semibold text-background mb-5 md:mb-6">
            &ldquo;Cuido do que escolho —<br />na vida e no bazar.&rdquo;
          </h2>
          <p className="text-background/45 text-[13.5px] leading-[1.85] mb-8 md:mb-10 max-w-lg mx-auto">
            Vegetariana por convicção, gerente por dedicação, mãe por amor.
            Esse cuidado aparece em cada peça que escolho para você.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-5 md:gap-7">
            <Link href="/loja"
              className="rounded-md inline-block border border-background/20 hover:border-foil-gold text-background/80 hover:text-foil-gold text-[9px] tracking-[0.25em] uppercase font-medium px-9 md:px-12 py-3.5 md:py-4 transition-colors duration-400 focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-background focus-visible:outline-offset-2">
              Conhecer o bazar
            </Link>
            <Link href="/sobre"
              className="text-background/50 hover:text-foil-gold text-[9px] tracking-[0.25em] uppercase font-medium transition-colors duration-400 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-background focus-visible:outline-offset-2 rounded-sm">
              Conheça minha história →
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp discreto */}
      <div className="bg-secondary py-5 px-5 md:px-8 text-center border-t border-border">
        <p className="text-[12.5px] text-muted-foreground">
          Dúvidas sobre alguma peça?{" "}
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
            className="text-primary font-medium hover:text-primary-hover transition-colors duration-300 underline-offset-3 hover:underline">
            Fale comigo no WhatsApp →
          </a>
        </p>
      </div>
    </>
  );
}
