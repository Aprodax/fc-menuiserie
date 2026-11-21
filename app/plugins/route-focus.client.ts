/**
 * Accessibilité : après une navigation interne, place le focus sur le titre
 * de la nouvelle page pour que les lecteurs d'écran l'annoncent.
 */
export default defineNuxtPlugin((nuxtApp) => {
  let firstLoad = true
  nuxtApp.hook('page:finish', () => {
    if (firstLoad) {
      firstLoad = false
      return
    }
    const target = document.querySelector<HTMLElement>('main h1') ?? document.getElementById('contenu')
    if (!target) return
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  })
})
