import { Droplets, Waves, Flame, Sparkles, Zap, MapPin } from "lucide-react";
import heroImage from "../assets/hero-soin.avif";
import Reveal from "./Reveal.jsx";

const FEATURED = [
  { title: "Soin visage", text: "Des soins adaptés à votre peau pour un teint éclatant.", photo: heroImage },
  { title: "Gommage corporel", text: "Une peau douce, lisse et revitalisée.", visual: { Icon: Droplets, from: "from-[#eee6d8]", to: "to-[#d9c39e]" } },
  { title: "Massage relaxant", text: "Détente absolue et élimination du stress.", visual: { Icon: Waves, from: "from-[#e4ece8]", to: "to-[#c1d6cb]" } },
  { title: "Massage amincissant", subtitle: "(Lipocavitation)", text: "Technique révolutionnaire pour mincir et raffermir la peau.", visual: { Icon: Flame, from: "from-[#f2e0d3]", to: "to-[#e0b48c]" } },
  { title: "Microneedling", text: "Traitement des taches d'hyperpigmentation et amélioration de la texture de la peau.", visual: { Icon: Sparkles, from: "from-[#f3e3c4]", to: "to-[#e8cd9b]" } },
  { title: "Épilation maillot intégral", text: "À la cire jetable pour une douceur longue durée.", visual: { Icon: Zap, from: "from-[#f0e6f0]", to: "to-[#dcc2dc]" } },
];

function ServiceHighlightCard({ item, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover">
        <div className="aspect-[4/3] w-full overflow-hidden">
          {item.photo ? (
            <img src={item.photo} alt={item.title} className="h-full w-full object-cover" />
          ) : (
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${item.visual.from} ${item.visual.to}`}>
              <item.visual.Icon size={36} strokeWidth={1} className="text-white/90" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs tracking-[0.2em] text-gold-dark uppercase">{item.title}</p>
          {item.subtitle && <p className="text-xs text-ink-soft/70">{item.subtitle}</p>}
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{item.text}</p>
          <a href="#soins" className="mt-5 inline-flex w-fit items-center rounded-full border border-gold px-5 py-2 text-xs tracking-[0.15em] text-ink uppercase transition-all duration-300 hover:bg-gold hover:text-white">
            Voir plus
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function MovedNoticeCard({ delay }) {
  return (
    <Reveal delay={delay}>
      <div className="flex h-full flex-col justify-center rounded-2xl bg-gold-dark p-7 text-white">
        <MapPin size={24} strokeWidth={1.5} className="text-gold-light" />
        <p className="mt-4 font-display text-xl">Nous avons déménagé !</p>
        <p className="mt-3 text-sm leading-relaxed text-white/85">
          Cocotomey Aglouza, Carrefour Von Vital Finance.
          <br />
          Première rue à droite, 3ème maison à droite.
          <br />
          Peint en violet et blanc.
        </p>
        <a href="#contact" className="mt-5 inline-flex w-fit items-center rounded-full border border-white/50 px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white/10">
          Voir l'itinéraire
        </a>
      </div>
    </Reveal>
  );
}

export default function FeaturedServices() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-light" />
            <p className="text-xs tracking-[0.3em] text-gold-dark uppercase">Nos prestations phares</p>
            <span className="h-px w-10 bg-gold-light" />
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((item, i) => (
            <ServiceHighlightCard key={item.title} item={item} delay={i * 70} />
          ))}
          <MovedNoticeCard delay={FEATURED.length * 70} />
        </div>
      </div>
    </section>
  );
}