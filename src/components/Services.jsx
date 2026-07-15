import { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Smile,
  Hand,
  Zap,
  Waves,
  Droplets,
  Flame,
} from "lucide-react";
import { CATEGORIES, categoryOptions, formatPrice } from "../data/services.js";
import Reveal from "./Reveal.jsx";

const CATEGORY_VISUAL = {
  visage: { Icon: Sparkles, from: "from-[#f3e3c4]", to: "to-[#e8cd9b]" },
  dentaire: { Icon: Smile, from: "from-[#e9f1ee]", to: "to-[#c9dcd5]" },
  "mains-pieds": { Icon: Hand, from: "from-[#f3e8e0]", to: "to-[#e3c9b6]" },
  epilations: { Icon: Zap, from: "from-[#f0e6f0]", to: "to-[#dcc2dc]" },
  massage: { Icon: Waves, from: "from-[#e4ece8]", to: "to-[#c1d6cb]" },
  vernis: { Icon: Droplets, from: "from-[#f5e2e2]", to: "to-[#e6bcbc]" },
  gommage: { Icon: Droplets, from: "from-[#eee6d8]", to: "to-[#d9c39e]" },
  sauna: { Icon: Flame, from: "from-[#f2e0d3]", to: "to-[#e0b48c]" },
};

function ServiceCard({ categoryId, categoryLabel, name, price, onReserve }) {
  const visual = CATEGORY_VISUAL[categoryId] ?? CATEGORY_VISUAL.visage;
  const Icon = visual.Icon;

  return (
    <div className="snap-card flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover sm:w-80">
      <div className={`relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${visual.from} ${visual.to}`}>
        <Icon size={44} strokeWidth={1} className="text-white/90" />
        <span className="absolute inset-0 bg-black/5" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-[11px] tracking-[0.2em] text-gold-dark uppercase">
            <Sparkles size={12} strokeWidth={1.5} />
            {categoryLabel}
          </p>
          <p className="font-display text-xl leading-snug text-ink">{name}</p>
        </div>

        <div className="mt-6 border-t border-sand pt-4">
          <p className="text-[10px] tracking-[0.25em] text-ink-soft uppercase">Tarif</p>
          <p className="font-display text-2xl text-gold-dark">{formatPrice(price)}</p>
          <button type="button" onClick={onReserve} className="mt-4 w-full rounded-full border border-gold px-4 py-2.5 text-xs tracking-[0.15em] text-ink uppercase transition-all duration-300 hover:bg-gold hover:text-white">
            Réserver ce soin
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Services({ onReserve }) {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const scrollerRef = useRef(null);
  const active = CATEGORIES.find((c) => c.id === activeId);
  const options = categoryOptions(active);

  function scrollByCard(direction) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 336, behavior: "smooth" });
  }

  return (
    <section id="soins" className="bg-sand/40 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold-light" />
              <p className="text-xs tracking-[0.3em] text-gold-dark uppercase">Nos soins</p>
              <span className="h-px w-10 bg-gold-light" />
            </div>
            <h2 className="font-display text-4xl leading-tight text-ink lg:text-5xl">Un catalogue d'excellence</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              Sélectionnez une catégorie pour découvrir nos prestations et leurs tarifs. Chaque soin est réalisé avec des produits professionnels haut de gamme.
            </p>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button type="button" onClick={() => scrollByCard(-1)} aria-label="Précédent" className="rounded-full border border-gold-light/70 p-2.5 text-ink-soft transition-colors duration-300 hover:border-gold hover:text-gold-dark">
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => scrollByCard(1)} aria-label="Suivant" className="rounded-full border border-gold-light/70 p-2.5 text-ink-soft transition-colors duration-300 hover:border-gold hover:text-gold-dark">
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="catalog-scroll mb-3 flex flex-wrap gap-2 pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveId(cat.id)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm tracking-wide transition-all duration-300 ${
                cat.id === activeId ? "border-gold bg-gold text-white shadow-soft" : "border-gold-light/60 bg-transparent text-ink-soft hover:border-gold"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {active.note && (
          <p className="mb-8 flex items-center gap-2 text-sm text-gold-dark italic">
            <Sparkles size={14} strokeWidth={1.5} />
            {active.note}
          </p>
        )}

        <div ref={scrollerRef} className="catalog-scroll -mx-6 flex gap-6 overflow-x-auto px-6 pb-4 lg:mx-0 lg:px-0">
          {options.map((opt, i) => (
            <Reveal key={opt.key} delay={Math.min(i, 6) * 80} className="shrink-0">
              <ServiceCard
                categoryId={active.id}
                categoryLabel={opt.categoryLabel}
                name={opt.name}
                price={opt.price}
                onReserve={() => onReserve(opt)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}