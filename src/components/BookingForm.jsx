import { useState } from "react";
import { Check, MessageCircle, X } from "lucide-react";
import { CATEGORIES, categoryOptions, formatPrice } from "../data/services.js";
import { saveBooking } from "../firebase.js";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "229XXXXXXXX";

const STEPS = [
  { n: 1, label: "Prestations" },
  { n: 2, label: "Vos infos" },
  { n: 3, label: "Confirmation" },
];

function StepIndicator({ step }) {
  return (
    <div className="mb-14 flex items-center justify-center gap-6 sm:gap-12">
      {STEPS.map((s, i) => (
        <div key={s.n} className="flex items-center gap-6 sm:gap-12">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm ${
                step > s.n
                  ? "border-gold bg-gold text-white"
                  : step === s.n
                  ? "border-gold text-gold-light"
                  : "border-white/25 text-white/60"
              }`}
            >
              {step > s.n ? <Check size={16} strokeWidth={2} /> : s.n}
            </div>
            <p className={`text-xs tracking-wide ${step >= s.n ? "text-white" : "text-white/60"}`}>
              {s.label}
            </p>
          </div>
          {i < STEPS.length - 1 && <span className="hidden h-px w-10 bg-white/15 sm:block" />}
        </div>
      ))}
    </div>
  );
}

export default function BookingForm({ cart, onAdd, onRemove }) {
  const [step, setStep] = useState(1);
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const category = CATEGORIES.find((c) => c.id === categoryId);
  const options = categoryOptions(category);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function toggleItem(opt) {
    if (cart.some((i) => i.key === opt.key)) onRemove(opt.key);
    else onAdd(opt);
  }

  function goNext() {
    setError("");
    if (step === 1 && cart.length === 0) {
      setError("Choisissez au moins une prestation avant de continuer.");
      return;
    }
    if (step === 2 && (!fullName.trim() || !phone.trim())) {
      setError("Merci de renseigner votre nom et votre téléphone.");
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  }

  function goBack() {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleConfirm() {
    setSending(true);

    const booking = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      preferredDate: preferredDate || "Non précisée",
      note: note.trim() || "—",
      items: cart.map((i) => ({ name: i.name, price: i.price, categoryLabel: i.categoryLabel })),
      total,
    };

    await saveBooking(booking);

    const lines = [
      "Nouvelle demande de rendez-vous — THE INFINITY",
      "",
      `Nom : ${booking.fullName}`,
      `Téléphone : ${booking.phone}`,
      `Date souhaitée : ${booking.preferredDate}`,
      "",
      "Prestations :",
      ...cart.map((i) => `- ${i.name} (${formatPrice(i.price)})`),
      "",
      `Total : ${formatPrice(total)}`,
      `Note : ${booking.note}`,
    ];

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

    setSending(false);
    setSent(true);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function resetAll() {
    cart.forEach((i) => onRemove(i.key));
    setFullName("");
    setPhone("");
    setPreferredDate("");
    setNote("");
    setStep(1);
    setSent(false);
  }

  return (
    <section id="rendez-vous" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="mb-4 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-light/70" />
            <p className="text-xs tracking-[0.3em] text-gold-light uppercase">Réservation</p>
            <span className="h-px w-10 bg-gold-light/70" />
          </div>
          <h2 className="font-display text-4xl leading-tight text-white lg:text-5xl">
            Prenez rendez-vous
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/78">
            En trois étapes, composez votre rendez-vous. Votre demande arrive instantanément sur notre WhatsApp.
          </p>
        </div>

        <StepIndicator step={sent ? 4 : step} />

        {sent ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl bg-white/5 px-8 py-12 text-center">
            <Check size={40} strokeWidth={1.3} className="text-gold-light" />
            <p className="font-display text-2xl text-white">Demande envoyée</p>
            <p className="text-sm leading-relaxed text-white/78">
              Votre fiche de rendez-vous a été ouverte dans WhatsApp. Il ne vous reste qu'à envoyer le message pour confirmer votre demande auprès de l'institut.
            </p>
            <button type="button" onClick={resetAll} className="mt-2 text-sm tracking-wide text-gold-light underline underline-offset-4">
              Faire une nouvelle demande
            </button>
          </div>
        ) : (
          <div className="rounded-2xl bg-white/[0.04] p-6 sm:p-10">
            {step === 1 && (
              <div>
                <div className="catalog-scroll -mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategoryId(cat.id)}
                      className={`shrink-0 rounded-full border px-4 py-2 text-sm tracking-wide transition-all duration-300 ${
                        cat.id === categoryId ? "border-gold bg-gold text-white" : "border-white/15 text-white/78 hover:border-gold-light"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {category.note && <p className="mb-5 text-xs text-gold-light italic">{category.note}</p>}

                <div className="grid gap-2 sm:grid-cols-2">
                  {options.map((opt) => {
                    const checked = cart.some((i) => i.key === opt.key);
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => toggleItem(opt)}
                        className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300 ${
                          checked ? "border-gold bg-gold/10 text-white" : "border-white/10 text-white/85 hover:border-gold-light/60"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${checked ? "border-gold bg-gold" : "border-white/30"}`}>
                            {checked && <Check size={12} strokeWidth={3} className="text-white" />}
                          </span>
                          {opt.label}
                        </span>
                        <span className="shrink-0 text-gold-light">{formatPrice(opt.price)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm text-white/85">
                  Nom complet
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Votre nom et prénom" className="mt-2 w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:border-gold" />
                </label>
                <label className="text-sm text-white/85">
                  Téléphone
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ex : 97 00 00 00" className="mt-2 w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:border-gold" />
                </label>
                <label className="text-sm text-white/85">
                  Date souhaitée
                  <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className="mt-2 w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-white [color-scheme:dark] focus:border-gold" />
                </label>
                <label className="text-sm text-white/85">
                  Note (facultatif)
                  <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Précision utile pour l'institut" className="mt-2 w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:border-gold" />
                </label>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="mb-1 font-display text-2xl text-white">Récapitulatif</p>
                <p className="mb-8 text-sm text-white/70">Vérifiez votre demande avant l'envoi via WhatsApp.</p>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="mb-3 text-xs tracking-[0.25em] text-gold-light uppercase">Client</p>
                    <ul className="space-y-2 text-sm text-white/90">
                      <li>{fullName}</li>
                      <li>{phone}</li>
                      <li>{preferredDate || "Date non précisée"}</li>
                      {note && <li className="text-white/70">{note}</li>}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 text-xs tracking-[0.25em] text-gold-light uppercase">Prestations ({cart.length})</p>
                    <ul className="space-y-2 text-sm text-white/90">
                      {cart.map((i) => (
                        <li key={i.key} className="flex justify-between gap-4">
                          <span>{i.name}</span>
                          <span className="shrink-0 text-gold-light">{formatPrice(i.price)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex justify-between border-t border-white/10 pt-3 text-sm font-medium text-white">
                      <span>Total</span>
                      <span className="text-gold-light">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && <p className="mt-6 text-sm text-rose-300">{error}</p>}

            {step < 3 && cart.length > 0 && (
              <div className="mt-8 rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <p className="text-white/85">
                    Panier : <span className="text-white">{cart.length}</span> prestation{cart.length > 1 ? "s" : ""}
                  </p>
                  <p className="font-display text-lg text-gold-light">{formatPrice(total)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cart.map((i) => (
                    <span key={i.key} className="flex items-center gap-2 rounded-full border border-white/15 py-1 pl-3 pr-1.5 text-xs text-white/90">
                      {i.name}
                      <button type="button" onClick={() => onRemove(i.key)} aria-label={`Retirer ${i.name}`} className="rounded-full p-0.5 hover:bg-white/10">
                        <X size={12} strokeWidth={2} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex items-center justify-between gap-4">
              {step > 1 ? (
                <button type="button" onClick={goBack} className="rounded-full border border-white/20 px-6 py-3 text-sm tracking-wide text-white/85 transition-colors duration-300 hover:border-white/40 hover:text-white">
                  Précédent
                </button>
              ) : (
                <span />
              )}

              {step < 3 ? (
                <button type="button" onClick={goNext} className="flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-sm tracking-wide text-white transition-all duration-300 hover:bg-gold-dark">
                  Suivant
                </button>
              ) : (
                <button type="button" onClick={handleConfirm} disabled={sending} className="flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-sm tracking-wide text-white transition-all duration-300 hover:bg-gold-dark disabled:opacity-60">
                  <MessageCircle size={16} strokeWidth={1.5} />
                  {sending ? "Envoi en cours…" : "Envoyer sur WhatsApp"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}