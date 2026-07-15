/**
 * Catalogue officiel THE INFINITY.
 * Chaque catégorie peut contenir un ou plusieurs groupes (ex. Épilations
 * se divise en "Visage" et "Corps"). Les prix sont en FCFA, stockés en
 * nombre pour pouvoir être formatés et réutilisés (formulaire de RDV, etc).
 */

export const CATEGORIES = [
  {
    id: "visage",
    label: "Soin de visage",
    note: "Les consultations de peau sont offertes.",
    groups: [
      {
        items: [
          { name: "Soin de visage classique", price: 7000 },
          { name: "Soin de visage éclat", price: 10000 },
          { name: "Soin de visage anti-âge", price: 12000 },
          { name: "Soin de visage séborégulateur", price: 15000 },
          { name: "Traitement d'année", price: 20000 },
          { name: "Dermabrasion", price: 25000 },
          { name: "Dermaplaning", price: 20000 },
          { name: "Hydrofacial", price: 30000 },
          { name: "Microneedling", price: 40000 },
          { name: "Peeling", price: 60000 },
        ],
      },
    ],
  },
  {
    id: "dentaire",
    label: "Blanchiment dentaire",
    groups: [
      {
        items: [
          { name: "Blanchiment dentaire — 40 min", price: 15000 },
          { name: "Blanchiment dentaire — 20 min", price: 10000 },
        ],
      },
    ],
  },
  {
    id: "mains-pieds",
    label: "Beauté des mains et pieds",
    groups: [
      {
        items: [
          { name: "Pédicure femme", price: 7000 },
          { name: "Pédicure homme", price: 10000 },
          { name: "Manucure", price: 5000 },
        ],
      },
    ],
  },
  {
    id: "epilations",
    label: "Épilations",
    groups: [
      {
        label: "Visage",
        items: [
          { name: "Sourcils — entretien", price: 3000 },
          { name: "Sourcils — restructuration", price: 5000 },
          { name: "Lèvres", price: 4000 },
        ],
      },
      {
        label: "Corps",
        items: [
          { name: "Aisselles", price: 5000 },
          { name: "Demi-jambes / demi-bras", price: 8000 },
          { name: "Jambes / bras", price: 12000 },
          { name: "Maillot simple", price: 5000 },
          { name: "Maillot échancré", price: 8000 },
          { name: "Maillot intégral", price: 15000 },
          { name: "Maillot brésilien", price: 10000 },
          { name: "Maillot intégral + vagacial", price: 20000 },
        ],
      },
    ],
  },
  {
    id: "massage",
    label: "Massage",
    groups: [
      {
        items: [
          { name: "Massage relaxant", price: 15000 },
          { name: "Massage tonique", price: 20000 },
          { name: "Massage à la pierre chaude", price: 18000 },
          { name: "Maderothérapie", price: 30000 },
        ],
      },
    ],
  },
  {
    id: "vernis",
    label: "Pose vernis",
    groups: [
      {
        items: [
          { name: "Vernis classique — mains et pieds", price: 2000 },
          { name: "Vernis semi-permanent — mains et pieds", price: 3000 },
          { name: "Vernis gel mains — sans décor", price: 3000 },
          { name: "Vernis gel pieds — sans décor", price: 2000 },
          { name: "Vernis French — mains et pieds", price: 6000 },
        ],
      },
    ],
  },
  {
    id: "gommage",
    label: "Gommage corporel",
    groups: [
      {
        items: [
          { name: "Gommage curcuma", price: 10000 },
          { name: "Gommage à la tomate", price: 10000 },
          { name: "Gommage au nila", price: 15000 },
          { name: "Gommage au quasil", price: 15000 },
          { name: "Gommage tchadien", price: 20000 },
          { name: "Gommage blanchissant", price: 25000 },
        ],
      },
    ],
  },
  {
    id: "sauna",
    label: "Sauna",
    groups: [
      {
        items: [
          { name: "Sauna — 10 min", price: 10000 },
          { name: "Sauna — 15 min", price: 13000 },
          { name: "Sauna — 20 min", price: 15000 },
        ],
      },
    ],
  },
];

/** Formate un prix en francs CFA, ex. 12000 -> "12 000 FCFA" */
export function formatPrice(price) {
  return `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}

/** Retourne la liste plate de tous les services d'une catégorie (tous groupes confondus) */
export function flattenCategory(category) {
  return category.groups.flatMap((g) => g.items);
}
export function categoryOptions(category) {
  return category.groups.flatMap((group) =>
    group.items.map((item) => ({
      key: `${category.id}__${group.label ?? ""}__${item.name}`,
      label: group.label ? `${group.label} — ${item.name}` : item.name,
      name: item.name,
      price: item.price,
      categoryLabel: category.label,
    }))
  );
}
