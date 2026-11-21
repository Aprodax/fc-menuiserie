/**
 * Limiteur en mémoire, suffisant pour une seule machine (Fly.io) : il protège
 * le quota d'e-mails contre un robot qui viderait le formulaire en boucle.
 * Remis à zéro à chaque redémarrage, ce qui est acceptable ici.
 */
const hits = new Map<string, number[]>()

export function isRateLimited(key: string, { limit = 5, windowMs = 10 * 60_000 } = {}) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter(t => now - t < windowMs)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 10_000) hits.clear() // garde-fou mémoire
  return recent.length > limit
}
