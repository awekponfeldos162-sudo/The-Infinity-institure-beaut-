import { Check, GraduationCap, MessageCircle, Sparkles, Waves, Hand, Smile } from "lucide-react";
import { FORMATIONS, PRICING, REGISTRATION_FEE, DIPLOMA_INCLUDES } from "../data/formations.js";
import { formatPrice } from "../data/services.js";
import Reveal from "./Reveal.jsx";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "229XXXXXXXX";

const VISUALS = {
  visage: { Icon: Sparkles, from: "from-[#f3e3c4]", to: "to-[#e8cd9b]" },
  "epilation-corps": { Icon: Waves, from: "from-[#e4ece8]", to: "to-[#c1d6cb]" },
  mains: { Icon: Hand, from: "from-[#f3e8e0]", to: "to-[#e3c9b6]" },
  dentaire: { Icon: Smile, from: "from-[#e9f1ee]", to: "to-[#c9dcd5]" },
};

function FormationCard({ formation, delay }) {
  const visual = VISUALS[formation.id];
  const Icon = visual.Icon;
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formation.whatsappMessage)}`;

  return (
    <Reveal delay={delay}>
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover">
        <div className={`flex aspect-[16/9] items-center justify-center bg-gradient-to-br ${visual.from} ${visual.to}`}>
          <Icon size={40} strokeWidth={1} className="text-white/90" />
        </div>

        <div className="flex flex-1 flex-col p-7">
          <p className="font-display text-xl text-ink">{formation.title}</p>
          <ul className="mt-4 space-y-2">
            {formation.modules.map((m) => (
              <li key={m} className="flex items-center gap-2 text-sm text-ink-soft">
                <Check size={14} strokeWidth={2} className="shrink-0 text-gold-dark" />
                {m}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <div className="border-t border-sand pt-4">
              <p className="text-[10px] tracking-[0.25em] text-ink-soft uppercase">À partir de</p>
              <p className="font-display text-2xl text-gold-dark">{formatPrice(formation.priceFrom)}</p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-4 py-2.5 text-xs tracking-[0.15em] text-white uppercase transition-all duration-300 hover:bg-gold-dark"
              >
                <MessageCircle size={14} strokeWidth={1.5} />
                Je suis intéressé(e)
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Formations() {
  return (
    <section id="formations" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-light" />
            <p className="text-xs tracking-[0.3em] text-gold-dark uppercase">Formations certifiantes</p>
            <span className="h-px w-10 bg-gold-light" />
          </div>
          <h2 className="font-display text-5xl leading-tight text-ink lg:text-6xl">
            Développez votre carrière dans l'esthétique médicale
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
            Des formations complètes dispensées par des professionnels, pour vous préparer aux métiers de la beauté.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FORMATIONS.map((formation, i) => (
            <FormationCard key={formation.id} formation={formation} delay={i * 80} />
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="mx-auto max-w-2xl">
            <p className="mb-6 text-center text-xs tracking-[0.25em] text-gold-dark uppercase">
              Tarifs par durée d'engagement
            </p>
            <div className="overflow-hidden rounded-2xl border border-sand">
              {PRICING.map((row, i) => (
                <div key={row.duration} className={`flex items-center justify-between px-6 py-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-sand/30"}`}>
                  <span className="text-ink">{row.duration}</span>
                  <span className="font-display text-lg text-gold-dark">{formatPrice(row.price)}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center">
              <span className="inline-block rounded-full bg-gold/10 px-5 py-2 text-xs tracking-wide text-gold-dark">
                Frais d'inscription : {formatPrice(REGISTRATION_FEE)}
              </span>
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-20" delay={100}>
          <div className="mx-auto max-w-2xl rounded-2xl bg-sand/30 p-8 text-center sm:p-10">
            <GraduationCap size={28} strokeWidth={1.3} className="mx-auto text-gold-dark" />
            <p className="mt-4 font-display text-2xl text-ink">Ce que comprend votre parcours</p>
            <ul className="mx-auto mt-6 grid max-w-md gap-3 text-left sm:grid-cols-2">
              {DIPLOMA_INCLUDES.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-ink-soft">
                  <Check size={14} strokeWidth={2} className="shrink-0 text-gold-dark" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}