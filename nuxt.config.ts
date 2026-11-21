import { business } from './shared/business'

if (business.draft) {
  console.warn('\n⚠️  shared/business.ts : draft = true → le site est marqué « noindex » (invisible pour Google).\n')
}

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/seo', '@nuxt/fonts', '@nuxt/icon'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [{ name: 'theme-color', content: '#ffffff' }],
    },
  },

  /** Configuration commune à tous les modules SEO (sitemap, robots, schema.org, balises meta). */
  site: {
    url: business.url,
    name: business.name,
    description: `${business.activity} à ${business.address.city} : baies coulissantes, volets roulants, fenêtres, portes, vitrages et portails. Réparation et dépannage.`,
    defaultLocale: 'fr',
    separator: '·',
    indexable: !business.draft,
  },

  /** Fiche entreprise lue par Google (données structurées LocalBusiness). */
  schemaOrg: {
    identity: {
      '@type': ['Organization', 'LocalBusiness', 'HomeAndConstructionBusiness'],
      'name': business.name,
      'url': business.url,
      'logo': '/favicon.svg',
      'telephone': business.phone.e164,
      'email': business.email,
      'address': {
        streetAddress: business.address.street,
        postalCode: business.address.postalCode,
        addressLocality: business.address.city,
        addressRegion: business.address.region,
        addressCountry: business.address.country,
      },
      'geo': business.geo,
      'areaServed': business.serviceArea.towns,
      'openingHoursSpecification': business.openingHours,
    },
  },

  // Images Open Graph générées : à activer plus tard, avec de vraies photos.
  ogImage: { enabled: false },
  // Service worker anti-décalage de versions : inutile pour un site vitrine.
  skewProtection: { enabled: false },
  // llms.txt et copies Markdown des pages pour les IA : superflu ici, et alourdit le worker.
  aiReady: { enabled: false },

  fonts: {
    // Téléchargée au build et servie depuis le site : aucun appel à Google côté visiteur (RGPD).
    families: [{ name: 'Instrument Sans', provider: 'google', weights: ['400 700'], subsets: ['latin'], global: true }],
  },

  icon: {
    mode: 'svg',
    serverBundle: { collections: ['lucide'] },
    clientBundle: { scan: true },
  },

  /** Variables privées, surchargées par NUXT_RESEND_API_KEY, NUXT_CONTACT_TO, NUXT_CONTACT_FROM. */
  runtimeConfig: {
    resendApiKey: '',
    contactTo: business.email,
    // Expéditeur de test de Resend : il n'écrit qu'à l'adresse du compte Resend, ce qui suffit
    // tant que le compte est créé avec l'e-mail de l'entreprise. À remplacer par une adresse
    // du nom de domaine une fois celui-ci vérifié chez Resend.
    contactFrom: 'Site web <onboarding@resend.dev>',
  },

  // Anciennes adresses (avant le passage au dépannage) : on renvoie vers les réparations.
  routeRules: {
    '/prestations': { redirect: { to: '/reparations', statusCode: 301 } },
    '/prestations/**': { redirect: { to: '/reparations', statusCode: 301 } },
  },

  nitro: {
    // Serveur Node (image Docker sur Fly.io). Toutes les pages sont générées au build :
    // le serveur ne fait que les servir et exécuter /api/contact.
    preset: 'node_server',
    // Fichiers pré-compressés (Brotli + gzip) au build : le serveur Node ne compresse pas
    // à la volée et le proxy de Fly non plus.
    compressPublicAssets: { gzip: true, brotli: true },
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt'],
    },
  },
})
