type Props = {
  /** "light" = borda/texto preto, para fundos claros. "dark" = borda/texto dourado, para fundos escuros (footer, sidebar admin). */
  variant?: "light" | "dark";
  className?: string;
};

export default function Logo({ variant = "light", className = "" }: Props) {
  const isDark = variant === "dark";
  return (
    <span
      className={`inline-flex items-center justify-center border px-4 py-1.5 ${
        isDark ? "border-foil-gold text-foil-gold" : "border-foreground text-foreground"
      } ${className}`}
    >
      <span className="font-heading uppercase tracking-[0.28em] text-[0.95rem] md:text-[1.05rem] leading-none whitespace-nowrap">
        Pitaya Rosa
      </span>
    </span>
  );
}
