import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Aïcha D.", role: "Cliente depuis 2024", quote: "Un accueil chaleureux et un vrai diagnostic avant chaque soin. Ma peau n'a jamais été aussi nette.", rating: 5 },
  { name: "Grace K.", role: "Soin du visage & massage", quote: "L'équipe prend le temps d'expliquer chaque étape. On sent l'expertise médicale derrière chaque geste.", rating: 5 },
  { name: "Nadège S.", role: "Épilation & pose vernis", quote: "Cadre impeccable, hygiène irréprochable et résultats à la hauteur. Je recommande sans hésiter.", rating: 5 },
  { name: "Fatouma B.", role: "Blanchiment dentaire", quote: "Résultat visible dès la première séance, sans douleur. Le rendez-vous WhatsApp a rendu la prise de RDV très simple.", rating: 4 },
];

function Stars({ count }) {
  return (
    <div className="flex justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} strokeWidth={0} className={i < count ? "fill-gold text-gold" : "fill-sand text-sand"} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = TESTIMONIALS[index];

  function go(direction) {
    setIndex((i) => (i + direction + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <div className="mb-5 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-gold-light" />
          <p className="text-xs tracking-[0.3em] text-gold-dark uppercase">Témoignages</p>
          <span className="h-px w-10 bg-gold-light" />
        </div>
        <h2 className="font-display text-4xl leading-tight text-ink lg:text-5xl">
          La confiance de nos clientes
        </h2>

        <div className="mt-10 flex items-center justify-center gap-3">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Voir le témoignage de ${t.name}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full border font-display text-sm transition-all duration-300 ${
                i === index ? "border-gold bg-gold text-white" : "border-gold-light/50 text-ink-soft hover:border-gold"
              }`}
            >
              {t.name.charAt(0)}
            </button>
          ))}
        </div>

        <div className="mt-10 min-h-[9rem]">
          <p className="font-display text-2xl leading-snug text-ink italic">« {current.quote} »</p>
          <div className="mt-5">
            <Stars count={current.rating} />
          </div>
          <p className="mt-4 text-sm text-ink-soft">
            <span className="text-ink">{current.name}</span> — {current.role}
          </p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label="Témoignage précédent" className="rounded-full border border-gold-light/70 p-2.5 text-ink-soft transition-colors duration-300 hover:border-gold hover:text-gold-dark">
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Témoignage suivant" className="rounded-full border border-gold-light/70 p-2.5 text-ink-soft transition-colors duration-300 hover:border-gold hover:text-gold-dark">
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}