"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import type { Produto } from "@/lib/types";

type Props = {
  eyebrow?: string;
  titulo: string;
  descricao?: string;
  produtos: Produto[];
  verTudoHref?: string;
};

export default function ProductCarousel({ eyebrow, titulo, descricao, produtos, verTudoHref }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function updateScrollState() {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produtos]);

  function scroll(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  if (produtos.length === 0) return null;

  return (
    <div>
      <div className="flex items-end justify-between mb-7">
        <div>
          {eyebrow && (
            <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-medium mb-3">{eyebrow}</p>
          )}
          <h2 className="text-[2rem] font-semibold text-foreground">{titulo}</h2>
          {descricao && (
            <p className="text-[13px] text-muted-foreground leading-relaxed mt-2 max-w-md">{descricao}</p>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {verTudoHref && (
            <Link
              href={verTudoHref}
              className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              Ver tudo
              <span className="absolute -bottom-px left-0 h-px w-full bg-border group-hover:bg-primary transition-colors duration-300" />
            </Link>
          )}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll(-1)}
              disabled={!canPrev}
              aria-label="Anterior"
              className="rounded-md w-8 h-8 border border-border hover:border-primary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canNext}
              aria-label="Próximo"
              className="rounded-md w-8 h-8 border border-border hover:border-primary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateScrollState}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-1"
      >
        {produtos.map((produto) => (
          <div key={produto.id} className="w-[46vw] sm:w-[220px] shrink-0 snap-start">
            <ProductCard produto={produto} />
          </div>
        ))}
      </div>
    </div>
  );
}
