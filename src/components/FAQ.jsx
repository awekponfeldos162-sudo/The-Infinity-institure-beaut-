import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal.jsx";

const FAQS = [
  { q: "La consultation de peau est-elle vraiment offerte ?", a: "Oui. Chaque première visite débute par une consultation de peau gratuite, qui permet d'orienter vers le soin le plus adapté." },
  { q: "Comment se déroule la prise de rendez-vous ?", a: "Vous choisissez vos soins sur le site, renseignez vos coordonnées, puis votre demande est envoyée directement sur WhatsApp pour confirmation avec l'institut." },
  { q: "Quels moyens de paiement acceptez-vous ?", a: "Le règlement s'effectue sur place, en espèces ou par mobile money. Le paiement en ligne n'est pas requis pour réserver." },
  { q: "Puis-je annuler ou déplacer mon rendez-vous ?", a: "Oui, il suffit de nous prévenir par WhatsApp au moins 24h à l'avance pour reprogrammer votre créneau sans frais." },
  { q: "Faut-il une préparation avant certains soins (épilation, peeling) ?", a: "Quelques recommandations simples sont partagées lors de la confirmation du rendez-vous, selon le soin choisi." },
];

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-gold-light/40">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between gap-6 py-5 text-left">
        <span className="font-display text-lg text-ink">{q}</span>
        <Plus size={18} strokeWidth={1.5} className={`shrink-0 text-gold-dark transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
      </button>
      <div className={`grid overflow-hidden transition-all duration-300 ${open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <p className="overflow-hidden text-[15px] leading-relaxed text-ink-soft">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-sand/40 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-light" />
            <p className="text-xs tracking-[0.3em] text-gold-dark uppercase">Questions fréquentes</p>
            <span className="h-px w-10 bg-gold-light" />
          </div>
          <h2 className="font-display text-4xl leading-tight text-ink lg:text-5xl">
            Tout ce qu'il faut savoir
          </h2>
        </div>

      <div>
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <FaqItem
                q={item.q}
                a={item.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}