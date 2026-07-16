import { Calendar, Sparkles, Award, Droplet, ShieldCheck, Cpu } from "lucide-react";
import heroImage from "../assets/hero-soin.avif";

const TRUST_BADGES = [
  { Icon: Award, label: "Expertise\nProfessionnelle" },
  { Icon: Droplet, label: "Produits de qualité\nsélectionnés" },
  { Icon: ShieldCheck, label: "Hygiène & Sécurité\nirréprochables" },
  { Icon: Cpu, label: "Technologies\nAvancées" },
];

export default function Hero() {
  return (
    <section id="accueil" className="bg-ivory pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="font-display text-5xl leading-[1.1] text-ink sm:text-6xl">
              Révélez votre
              <br />
              <span className="text-gold-dark">éclat naturel</span>
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
              L'expertise médicale au service de votre beauté et de votre bien-être.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#rendez-vous" className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm tracking-wide text-white transition-all duration-300 hover:bg-gold-dark hover:shadow-soft-hover">
                <Calendar size={16} strokeWidth={1.5} />
                Prendre rendez-vous
              </a>
              <a href="#soins" className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-7 py-3.5 text-sm tracking-wide text-ink transition-all duration-300 hover:border-gold hover:bg-gold/5">
                <Sparkles size={16} strokeWidth={1.5} />
                Découvrir nos soins
              </a>
            </div>
          </div>

              <div className="floaty relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-soft-hover lg:aspect-[5/6]">            
              <img src={heroImage} alt="Soin du visage réalisé à l'institut THE INFINITY" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-y-8 border-t border-gold-light/40 pt-10 sm:grid-cols-4 lg:mt-20">
          {TRUST_BADGES.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <Icon size={22} strokeWidth={1.3} className="text-gold-dark" />
              <p className="text-xs leading-snug tracking-wide text-ink-soft whitespace-pre-line">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}