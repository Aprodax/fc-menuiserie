/**
 * Toutes les informations de l'entreprise, en un seul endroit.
 * Pages, pied de page, données structurées Google et mentions légales lisent ce fichier.
 *
 * ⚠️ Les valeurs ci-dessous sont des EXEMPLES. Remplace-les par les vraies,
 * puis passe `draft` à false : tant que `draft` vaut true, le site demande
 * à Google de ne pas l'indexer (robots.txt + balise noindex).
 */
export const business = {
  draft: true,

  name: 'Menuiserie Exemple',
  activity: 'Menuiserie aluminium',
  /**
   * Adresse publique du site, sans slash final (sitemap, URL canoniques, fiche Google).
   * À remplacer par le nom de domaine le jour où il existe.
   */
  url: 'https://fc-menuiserie.fly.dev',

  /** `display` est affiché ; `e164` sert aux liens tel: (un clic sur mobile propose l'appel). */
  phone: { display: '06 11 77 21 70', e164: '+33611772170' },
  email: 'contact@menuiserie-exemple.fr',
  /** Délai de rappel promis après une demande de devis : ne promets que ce qui est tenable. */
  responseDelay: 'sous 48 heures ouvrées',

  address: {
    street: '12 rue des Artisans',
    postalCode: '49000',
    city: 'Angers',
    region: 'Pays de la Loire',
    country: 'FR',
  },
  geo: { latitude: 47.4784, longitude: -0.5632 },

  /** Texte affiché sur le site. */
  hours: [
    { days: 'Lundi – vendredi', time: '8 h – 12 h · 13 h 30 – 18 h' },
    { days: 'Samedi', time: 'Sur rendez-vous' },
  ],
  /** Même chose au format schema.org, pour Google. */
  openingHours: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '12:00' },
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '13:30', closes: '18:00' },
  ],

  serviceArea: {
    radiusKm: 30,
    towns: [
      'Angers', 'Avrillé', 'Beaucouzé', 'Les Ponts-de-Cé', 'Saint-Barthélemy-d’Anjou',
      'Trélazé', 'Écouflant', 'Montreuil-Juigné', 'Brissac Loire Aubance', 'Chalonnes-sur-Loire',
    ],
  },

  /** Engagements affichés sur l'accueil. N'écris que ce qui est vrai et vérifiable. */
  commitments: [
    { title: 'Devis gratuit et détaillé', text: 'Après une visite sur place et un relevé de cotes précis.' },
    { title: 'Fabrication sur mesure', text: 'Chaque menuiserie est commandée à vos dimensions exactes.' },
    { title: 'Pose par nos soins', text: 'Le même artisan suit votre chantier, de la visite aux réglages.' },
    { title: 'Garantie décennale', text: 'Vos travaux de pose sont couverts pendant dix ans.' },
  ],

  /**
   * Labels et qualifications (Qualibat, RGE…). Le bloc n'apparaît que si la liste n'est pas vide.
   * Exemple : { name: 'RGE Qualibat', detail: 'Certificat n° …, valable jusqu'au …' }
   */
  certifications: [] as { name: string, detail: string }[],

  legal: {
    legalName: 'Menuiserie Exemple SARL',
    form: 'SARL',
    capital: '10 000 €',
    siret: '000 000 000 00000',
    rcs: 'RCS Angers 000 000 000',
    vat: 'FR00 000000000',
    publisher: 'Prénom Nom, gérant',
    insurance: {
      insurer: 'Nom de l’assureur',
      address: 'Adresse de l’assureur',
      policy: 'Contrat n° 000000',
      coverage: 'France métropolitaine',
    },
    /** Obligatoire pour vendre à des particuliers (art. L616-1 du Code de la consommation). */
    mediator: {
      name: 'Nom du médiateur de la consommation',
      address: 'Adresse du médiateur',
      website: 'https://www.exemple-mediateur.fr',
    },
  },
}

export type Business = typeof business

export const telHref = `tel:${business.phone.e164}`
export const mailHref = `mailto:${business.email}`

export const fullAddress = `${business.address.street}, ${business.address.postalCode} ${business.address.city}`

export const mapsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${business.name}, ${fullAddress}`)}`
