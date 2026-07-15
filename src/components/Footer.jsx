import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo.jsx";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "229XXXXXXXX";
const CONTACT_EMAIL = "contact@theinfinity.com";
const CONTACT_ADDRESS = "Institut The Infinity, Cotonou, Bénin";
const CONTACT_HOURS = "Lun - Sam : 9h - 19h";

const NAV_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#a-propos", label: "À propos" },
  { href: "#soins", label: "Services" },
  { href: "#rendez-vous", label: "Rendez-vous" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink pt-20 pb-8">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-14 sm:grid-cols-3">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Institut de beauté et d'esthétique médicale. Un lieu confidentiel pour révéler votre éclat.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-[0.25em] text-gold-light uppercase">Contact</p>
            <ul className="space-y-3 text-sm text-white/85">
              <li className="flex items-start gap-2">
                <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-light" />
                {CONTACT_ADDRESS}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} strokeWidth={1.5} className="shrink-0 text-gold-light" />
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  +{WHATSAPP_NUMBER.replace(/(\d{3})(\d+)/, "$1 $2")}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} strokeWidth={1.5} className="shrink-0 text-gold-light" />
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
              <li className="pt-1 text-white/70">{CONTACT_HOURS}</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-[0.25em] text-gold-light uppercase">Navigation</p>
            <ul className="space-y-3 text-sm text-white/85">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors duration-300 hover:text-gold-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <p>© {year} The Infinity. Tous droits réservés.</p>
          <p className="tracking-wide">Institut de beauté &amp; esthétique médicale</p>
        </div>
      </div>
    </footer>
  );
}