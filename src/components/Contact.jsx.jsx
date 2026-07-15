import { Phone, Mail, MapPin, Clock, Calendar } from "lucide-react";
import Reveal from "./Reveal.jsx";

const PHONE_NUMBERS = ["01 61 05 58 87", "01 97 44 08 84"];
const CONTACT_EMAIL = "theinfinityinstitut@gmail.com";
const ADDRESS_LINES = [
  "Cocotomey Aglouza",
  "Carrefour Von Vital Finance",
  "Première rue à droite, 3ème maison à droite",
  "Peint en violet et blanc",
];
const MAP_QUERY = "Cocotomey Aglouza, Carrefour Von Vital Finance, Cotonou, Bénin";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-light" />
            <p className="text-xs tracking-[0.3em] text-gold-dark uppercase">Contact</p>
            <span className="h-px w-10 bg-gold-light" />
          </div>
          <h2 className="font-display text-5xl leading-tight text-ink lg:text-6xl">Venez nous rencontrer</h2>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="space-y-6">
            <div className="rounded-2xl bg-sand/30 p-7">
              <p className="mb-4 text-xs tracking-[0.25em] text-gold-dark uppercase">Nous contacter</p>
              <ul className="space-y-3 text-sm text-ink">
                {PHONE_NUMBERS.map((num) => (
                  <li key={num} className="flex items-center gap-3">
                    <Phone size={16} strokeWidth={1.5} className="shrink-0 text-gold-dark" />
                    <a href={`tel:${num.replace(/\s/g, "")}`} className="hover:text-gold-dark">{num}</a>
                  </li>
                ))}
                <li className="flex items-center gap-3">
                  <Mail size={16} strokeWidth={1.5} className="shrink-0 text-gold-dark" />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold-dark">{CONTACT_EMAIL}</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-dark" />
                  <span>
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-sand/30 p-7">
              <p className="mb-4 flex items-center gap-2 text-xs tracking-[0.25em] text-gold-dark uppercase">
                <Clock size={14} strokeWidth={1.5} />
                Horaires d'ouverture
              </p>
              <div className="flex justify-between text-sm text-ink">
                <span>Lundi - Samedi</span>
                <span className="text-ink-soft">08h00 - 19h00</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-ink">
                <span>Dimanche</span>
                <span className="text-ink-soft">10h00 - 16h00</span>
              </div>
            </div>

            <a href="#rendez-vous" className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm tracking-wide text-white transition-all duration-300 hover:bg-gold-dark hover:shadow-soft-hover">
              <Calendar size={16} strokeWidth={1.5} />
              Prendre rendez-vous
            </a>
          </Reveal>

          <Reveal delay={150} className="min-h-[320px] w-full overflow-hidden rounded-2xl shadow-soft">
            <iframe
              title="Localisation THE INFINITY"
              src={MAP_EMBED_SRC}
              className="h-full w-full min-h-[320px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}