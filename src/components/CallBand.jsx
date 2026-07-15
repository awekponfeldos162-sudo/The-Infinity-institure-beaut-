import { Phone } from "lucide-react";

const PHONE_NUMBERS = ["01 61 05 58 87", "01 97 44 08 84"];

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M14 8.5h2.5V5.2c-.43-.06-1.9-.2-3.06-.2-3.03 0-4.94 1.85-4.94 5.25V13H5.5v3.6h3v7.4h3.6v-7.4h3.06L15.7 13h-3.6v-2.32c0-1.04.28-2.18 1.9-2.18Z" />
    </svg>
  );
}

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.36 5.07L2 22l5.2-1.36a9.87 9.87 0 0 0 4.84 1.24h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.02.26-3.43-.72-2.9-1.17-4.76-4.14-4.9-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.3.48-.14.17-.3.38-.43.5-.14.14-.29.29-.13.57.17.29.74 1.22 1.6 1.98 1.1.98 2.02 1.28 2.31 1.42.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.14.48.21.55.33.07.12.07.7-.17 1.38Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Facebook", Icon: FacebookIcon, href: "#" },
  { label: "Instagram", Icon: InstagramIcon, href: "#" },
  { label: "WhatsApp", Icon: WhatsappIcon, href: "https://wa.me/22961055887" },
];

export default function CallBand() {
  return (
    <section className="bg-gold-dark py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 text-center sm:flex-row sm:justify-between sm:text-left lg:px-10">
        <div>
          <p className="font-display text-2xl tracking-wide text-white">Prenez rendez-vous !</p>
          <div className="mt-3 flex flex-col items-center gap-1.5 sm:items-start">
            {PHONE_NUMBERS.map((num) => (
              <a key={num} href={`tel:${num.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-white/90 transition-colors duration-300 hover:text-gold-light">
                <Phone size={15} strokeWidth={1.5} className="text-gold-light" />
                {num}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-xs tracking-[0.2em] text-white/70 uppercase">Suivez-nous</p>
          <div className="flex gap-3">
            {SOCIALS.map(({ label, Icon, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-gold-light hover:text-gold-light">
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>

        <p className="font-display text-lg tracking-wide text-white/90">The Infinity Institut</p>
      </div>
    </section>
  );
}