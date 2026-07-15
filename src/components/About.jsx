import Reveal from "./Reveal.jsx";
import aboutPhoto from "../assets/a propos.png";

const PILLARS = [
  { title: "Expertise", text: "Diagnostic de peau, protocoles médicaux et gestes précis, au service de résultats mesurables." },
  { title: "Produits", text: "Une sélection de cosmétiques professionnels haut de gamme, choisis pour leur efficacité." },
  { title: "Approche", text: "Une attention personnalisée, dans un cadre pensé pour la sérénité et la confidentialité." },
];

export default function About() {
  return (
    <section id="a-propos" className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal className="order-2 aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] lg:order-1">
          <img
            src={aboutPhoto}
            alt="Intérieur de l'institut THE INFINITY"
            className="h-full w-full object-cover"
          />
        </Reveal>

        <Reveal delay={150} className="order-1 lg:order-2">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-gold-light" />
            <p className="text-xs tracking-[0.3em] text-gold-dark uppercase">À propos</p>
          </div>

          <h2 className="font-display text-4xl leading-tight text-ink lg:text-5xl">
            L'art du soin, <span className="italic text-gold-dark">à l'infini.</span>
          </h2>

          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            THE INFINITY est un institut de beauté et d'esthétique médicale où chaque geste est pensé pour révéler votre singularité. Dans un écrin feutré, nos experts vous accompagnent avec des protocoles exclusifs alliant expertise médicale et rituels d'exception.
          </p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            Soins du visage, épilations, massages, gommages, blanchiment dentaire — chaque prestation est réalisée avec des produits professionnels haut de gamme et une attention personnalisée à votre peau et à votre bien-être.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="border-t border-gold-light/60 pt-4">
                <p className="text-xs tracking-[0.25em] text-gold-dark uppercase">{p.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{p.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}