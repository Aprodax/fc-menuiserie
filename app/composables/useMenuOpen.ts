/** État du menu mobile, partagé entre l'en-tête et le layout (qui rend le reste de la page inerte). */
export const useMenuOpen = () => useState('menu-open', () => false)
