import logoHorizontal from "../assets/infinity.png";

/**
 * Logo THE INFINITY — le fichier importé contient déjà le symbole infini,
 * le lotus et le mot "THE INFINITY" : on n'écrit donc plus jamais ce texte
 * séparément à côté, l'image porte toute l'identité visuelle.
 *
 * variant="light" est utilisé dans les zones plus larges (ex. footer) pour
 * afficher le logo un peu plus grand ; le fichier lui-même reste identique.
 */
export default function Logo({ variant = "full", className = "" }) {
  const heightClass = variant === "light" ? "h-10" : "h-10";

  return (
    <img
      src={logoHorizontal}
      alt="THE INFINITY — Institut de beauté & esthétique médicale"
         className={`h-13 w-auto object-contain ${className}`}
    />
  );
}