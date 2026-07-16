import { useState } from "react";
import { Quote, Star } from "lucide-react";
import Reveal from "./Reveal.jsx";

const TESTIMONIALS = [
  { name: "Aïcha D.", role: "Cliente depuis 2024", quote: "Un accueil chaleureux et un vrai diagnostic avant chaque soin. Ma peau n'a jamais été aussi nette.", rating: 5 },
  { name: "Grace K.", role: "Soin du visage & massage", quote: "L'équipe prend le temps d'expliquer chaque étape. On sent l'expertise médicale derrière chaque geste.", rating: 5 },
  { name: "Nadège S.", role: "Épilation & pose vernis", quote: "Cadre impeccable, hygiène irréprochable et résultats à la hauteur. Je recommande sans hésiter.", rating: 5 },
  { name: "Fatouma B.", role: "Blanchiment dentaire", quote: "Résultat visible dès la première séance, sans douleur. Le rendez-vous WhatsApp a rendu la prise de RDV très simple.", rating: 4 },
];

const PAGE_SIZE = 3;
const PAGE_COUNT = Math.ceil(TESTIMONIALS.length / PAGE_SIZE);

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} strokeWidth={0} className={i < count ? "fill-gold text-gold" : "fill-sand text-sand"} />
      ))}
    </div>
  );
}

function TestimonialCard({ t, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 font-display text-lg text-gold-dark">
            {t.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-ink">{t.name}</p>
            <p className="text-xs text-ink-soft">{t.role}</p>
          </div>
        </div>

        <div className="mt-4">
          <Stars count={t.rating} />
        </div>

        <Quote size={22} strokeWidth={0} className="mt-4 fill-gold-light/50" />
        <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-soft italic">« {t.quote} »</p>
      </div>
    </Reveal>
  );
}

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const current = TESTIMONIALS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section className="bg-sand/40 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-light" />
            <p className="text-xs tracking-[0.3em] text-gold-dark uppercase">Témoignages</p>
            <span className="h-px w-10 bg-gold-light" />
          </div>
          <h2 className="font-display text-5xl leading-tight text-ink lg:text-6xl">La confiance de nos clientes</h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {current.map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={i * 80} />
          ))}
        </div>

        {PAGE_COUNT > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: PAGE_COUNT }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Page de témoignages ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === page ? "w-7 bg-gold" : "w-2.5 bg-gold-light/50 hover:bg-gold-light"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}