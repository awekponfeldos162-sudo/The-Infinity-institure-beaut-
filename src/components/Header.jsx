import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo.jsx";

const LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#a-propos", label: "À propos" },
  { href: "#soins", label: "Nos prestations" },
  { href: "#formations", label: "Formations" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#galerie", label: "Galerie" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#accueil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const sections = LINKS.map((link) => document.querySelector(link.href)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-ivory/95 backdrop-blur-sm shadow-soft transition-all duration-500 ${
          scrolled || open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 lg:px-10">
          <a href="#accueil" aria-label="THE INFINITY — Accueil">
            <Logo />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            <nav className="flex items-center gap-8">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm tracking-wide transition-colors duration-300 ${
                    activeHref === link.href ? "text-gold-dark" : "text-ink-soft hover:text-gold"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold-dark transition-all duration-300 ${
                      activeHref === link.href ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              ))}
            </nav>

            <a
              href="#rendez-vous"
              className="rounded-full border border-gold px-6 py-2.5 text-sm tracking-wide text-ink transition-all duration-300 hover:bg-gold hover:text-white hover:shadow-soft-hover"
            >
              Prendre RDV
            </a>
          </div>

          <button type="button" onClick={() => setOpen(true)} className="text-ink lg:hidden" aria-label="Ouvrir le menu">
            <Menu size={26} strokeWidth={1.4} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-ivory transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <Logo />
          <button type="button" onClick={() => setOpen(false)} className="text-ink" aria-label="Fermer le menu">
            <X size={26} strokeWidth={1.4} />
          </button>
        </div>
        <nav className="mt-10 flex flex-col items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`font-display text-2xl transition-colors duration-300 ${
                activeHref === link.href ? "text-gold-dark" : "text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="#rendez-vous" onClick={() => setOpen(false)} className="mt-4 rounded-full border border-gold px-8 py-3 text-sm tracking-wide text-ink">
            Prendre RDV
          </a>
        </nav>
      </div>
    </>
  );
}