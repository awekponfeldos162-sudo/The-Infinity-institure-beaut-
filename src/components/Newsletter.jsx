import { useState } from "react";
import { Mail } from "lucide-react";
import { saveNewsletterSignup } from "../firebase.js";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    const result = await saveNewsletterSignup(email.trim());
    setStatus(result.ok ? "done" : "error");
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
        <Mail size={26} strokeWidth={1.3} className="mx-auto text-gold-dark" />
        <h2 className="mt-5 font-display text-3xl text-ink lg:text-4xl">Restez informée</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          Recevez nos conseils beauté et nos offres ponctuelles, sans spam.
        </p>

        {status === "done" ? (
          <p className="mt-8 text-sm tracking-wide text-gold-dark">Merci ! Votre inscription est confirmée.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              className="w-full rounded-full border border-gold-light/60 bg-ivory px-5 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-gold"
            />
            <button type="submit" disabled={status === "sending"} className="shrink-0 rounded-full bg-ink px-7 py-3 text-sm tracking-wide text-white transition-all duration-300 hover:bg-gold disabled:opacity-60">
              {status === "sending" ? "Envoi…" : "S'inscrire"}
            </button>
          </form>
        )}
        {status === "error" && <p className="mt-4 text-xs text-rose-500">Une erreur est survenue, merci de réessayer.</p>}
      </div>
    </section>
  );
}