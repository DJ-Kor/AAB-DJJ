/* ============================================
   Firebase / Firestore integration
   ============================================
   Note: Firebase web API key is safe to commit publicly.
   Security is enforced by Firestore Security Rules, not the API key.
   See: https://firebase.google.com/docs/projects/api-keys
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAiLYk0g3PoeoMPdvwTCdzjZC9B7ZZDE0g",
  authDomain: "aab-djj.firebaseapp.com",
  projectId: "aab-djj",
  storageBucket: "aab-djj.firebasestorage.app",
  messagingSenderId: "330018244229",
  appId: "1:330018244229:web:0f334d353043a2922f0bec",
  measurementId: "G-2F13230CSR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Submit a score to Firestore.
 * @param {string} name  Player name (1-10 chars)
 * @param {number} score Integer score
 * @returns {Promise<boolean>} success
 */
export async function submitScore(name, score) {
  try {
    const clean = (name || "Anonymous").toString().slice(0, 10).trim() || "Anonymous";
    const s = Math.max(0, Math.min(999999, Math.floor(score)));
    await addDoc(collection(db, "scores"), {
      name: clean,
      score: s,
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (e) {
    console.error("submitScore error:", e);
    return false;
  }
}

/**
 * Get top N scores from Firestore, sorted by score DESC.
 * @param {number} n
 * @returns {Promise<Array<{name: string, score: number}>>}
 */
export async function getTopScores(n = 10) {
  try {
    const q = query(
      collection(db, "scores"),
      orderBy("score", "desc"),
      limit(n)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
  } catch (e) {
    console.error("getTopScores error:", e);
    return [];
  }
}
