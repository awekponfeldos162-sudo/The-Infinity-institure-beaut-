import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Les identifiants proviennent des variables d'environnement Vite (fichier .env,
 * voir .env.example à la racine). Ne jamais coder les clés en dur dans le code
 * source versionné.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

/**
 * Enregistre une demande de rendez-vous dans la collection Firestore
 * "reservations", en plus de l'envoi WhatsApp. Cela permet à l'institut de
 * garder un historique consultable même si le message WhatsApp est
 * supprimé ou manqué.
 *
 * @param {{
 *   fullName: string,
 *   phone: string,
 *   categoryLabel: string,
 *   serviceName: string,
 *   servicePrice: number,
 *   preferredDate: string,
 *   note: string
 * }} booking
 */
export async function saveBooking(booking) {
  try {
    await addDoc(collection(db, "reservations"), {
      ...booking,
      createdAt: serverTimestamp(),
      status: "en_attente",
    });
    return { ok: true };
  } catch (error) {
    // On ne bloque jamais le parcours client si Firestore est indisponible :
    // la réservation WhatsApp reste le canal principal.
    console.error("Erreur d'enregistrement Firestore :", error);
    return { ok: false, error };
  }
}

/** Enregistre une inscription à la newsletter dans la collection "newsletter" */
export async function saveNewsletterSignup(email) {
  try {
    await addDoc(collection(db, "newsletter"), {
      email,
      createdAt: serverTimestamp(),
    });
    return { ok: true };
  } catch (error) {
    console.error("Erreur d'enregistrement newsletter :", error);
    return { ok: false, error };
  }
}
