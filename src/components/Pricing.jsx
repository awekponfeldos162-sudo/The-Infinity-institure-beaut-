import { useState } from "react";
import { CATEGORIES, categoryOptions, formatPrice } from "../data/services.js";
import Reveal from "./Reveal.jsx";

export default function Pricing() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const active = CATEGORIES.find((c) => c.id === activeId);
  const options = categoryOptions(active);

  return (
    <section id="tarifs" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-light" />
            <p className="text-xs tracking-[0.3em] text-gold-dark uppercase">Tarifs</p>
            <span className="h-px w-10 bg-gold-light" />
          </div>
          <h2 className="font-display text-5xl leading-tight text-ink lg:text-6xl">Toute la liste, en un coup d'œil</h2>
        </Reveal>

        <Reveal className="catalog-scroll mb-10 flex flex-wrap justify-center gap-2">
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
        </Reveal>

        {active.note && <p className="mb-6 text-center text-sm text-gold-dark italic">{active.note}</p>}

        <Reveal className="divide-y divide-sand rounded-2xl border border-sand">
          {options.map((opt) => (
            <div key={opt.key} className="flex items-baseline gap-4 px-6 py-4">
              <span className="text-sm text-ink">{opt.label}</span>
              <span className="flex-1 border-b border-dotted border-ink-soft/25" />
              <span className="shrink-0 font-display text-lg text-gold-dark">{formatPrice(opt.price)}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}