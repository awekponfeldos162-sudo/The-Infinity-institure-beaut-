import Reveal from "./Reveal.jsx";

const GALLERY_ITEMS = [
  { caption: "Accueil & réception", from: "from-[#f3e3c4]", to: "to-[#e8cd9b]", photo: null },
  { caption: "Salle de soin", from: "from-[#e9f1ee]", to: "to-[#c9dcd5]", photo: null },
  { caption: "Espace détente", from: "from-[#f3e8e0]", to: "to-[#e3c9b6]", photo: null },
  { caption: "Cabine de massage", from: "from-[#e4ece8]", to: "to-[#c1d6cb]", photo: null },
  { caption: "Espace manucure & pédicure", from: "from-[#f5e2e2]", to: "to-[#e6bcbc]", photo: null },
  { caption: "Salle de formation", from: "from-[#eee6d8]", to: "to-[#d9c39e]", photo: null },
];

export default function Gallery() {
  return (
    <section id="galerie" className="bg-sand/40 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-light" />
            <p className="text-xs tracking-[0.3em] text-gold-dark uppercase">Galerie</p>
            <span className="h-px w-10 bg-gold-light" />
          </div>
          <h2 className="font-display text-5xl leading-tight text-ink lg:text-6xl">
            Un cadre pensé pour vous
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, i) => (
            <Reveal key={item.caption} delay={i * 60}>
              <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-soft">
                {item.photo ? (
                  <img src={item.photo} alt={item.caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${item.from} ${item.to} transition-transform duration-500 group-hover:scale-105`} />
                )}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-black/0 to-black/0 p-4">
                  <p className="text-xs font-medium tracking-wide text-white">{item.caption}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}