/**
 * Les réparations proposées : une entrée = une page /reparations/<slug>.
 * L'accueil, la page Réparations, le formulaire de contact et le plan du site suivent
 * automatiquement. ⚠️ Liste à faire valider : pannes et interventions réellement assurées.
 */
export type PictoName = 'window' | 'slider' | 'door' | 'shutter' | 'gate' | 'glass' | 'garage'

export interface Service {
  slug: string
  /** Nom de la menuiserie concernée, tel qu'un client le dirait. */
  title: string
  /** Recherche Google visée, reprise dans le titre de la page. */
  keyword: string
  picto: PictoName
  /** Les symptômes en une ligne : le client doit reconnaître sa panne. */
  excerpt: string
  intro: string
  /** Pannes courantes, formulées comme le client les constate. */
  problems: string[]
  /** Ce que nous faisons pour y remédier. */
  repairs: string[]
}

export const services: Service[] = [
  {
    slug: 'baies-coulissantes',
    title: 'Baies vitrées coulissantes',
    keyword: 'Réparation de baie coulissante',
    picto: 'slider',
    excerpt: 'Elle coince, déraille ou ne ferme plus.',
    intro: 'Une baie qui force ou qui sort de son rail se répare presque toujours : roulettes usées, rail encrassé ou fermeture fatiguée. Inutile de changer toute la menuiserie.',
    problems: [
      'La baie est dure à faire coulisser ou se bloque',
      'Un vantail est sorti du rail ou frotte',
      'La poignée ou la fermeture ne verrouille plus',
      'De l’air ou de l’eau passe sous la baie',
    ],
    repairs: [
      'Remplacement des roulettes et des galets',
      'Nettoyage et redressage des rails',
      'Remplacement de poignée, de fermeture ou de serrure',
      'Réglage des vantaux et remplacement des joints',
    ],
  },
  {
    slug: 'volets-roulants',
    title: 'Volets roulants',
    keyword: 'Dépannage de volet roulant',
    picto: 'shutter',
    excerpt: 'Bloqué, coincé de travers ou moteur en panne.',
    intro: 'Un volet roulant bloqué empêche d’ouvrir ou de fermer la maison. Nous trouvons la cause, moteur, lames ou sangle, et remettons le volet en service.',
    problems: [
      'Le volet ne monte ou ne descend plus',
      'Il est bloqué de travers ou à mi-hauteur',
      'Le moteur tourne mais le volet ne bouge pas',
      'La télécommande ou l’interrupteur ne répond plus',
    ],
    repairs: [
      'Diagnostic et remplacement du moteur',
      'Remplacement des lames abîmées',
      'Remplacement de sangle, de treuil ou de manivelle',
      'Réglage des fins de course et des télécommandes',
    ],
  },
  {
    slug: 'fenetres',
    title: 'Fenêtres et portes-fenêtres',
    keyword: 'Réparation de fenêtre aluminium',
    picto: 'window',
    excerpt: 'Elle ferme mal, laisse passer l’air ou la poignée a lâché.',
    intro: 'Une fenêtre qui frotte ou laisse passer l’air se règle ou se répare : paumelles, crémone, poignée ou joints. Vous retrouvez une fermeture nette et étanche.',
    problems: [
      'La fenêtre frotte ou ne ferme plus',
      'La poignée tourne dans le vide',
      'L’oscillo-battant ne bascule plus',
      'Courants d’air ou infiltrations',
    ],
    repairs: [
      'Réglage des ouvrants et des paumelles',
      'Remplacement de poignée et de crémone',
      'Réparation du mécanisme oscillo-battant',
      'Remplacement des joints d’étanchéité',
    ],
  },
  {
    slug: 'portes',
    title: 'Portes d’entrée',
    keyword: 'Dépannage de porte aluminium',
    picto: 'door',
    excerpt: 'Serrure bloquée, porte qui frotte ou ne ferme plus.',
    intro: 'Une porte d’entrée qui ferme mal, c’est une maison qui n’est plus protégée. Nous intervenons sur la serrure, le réglage et l’étanchéité.',
    problems: [
      'La serrure est bloquée ou la clé tourne mal',
      'La porte frotte ou ne se ferme plus',
      'Le ferme-porte ou la gâche est cassé',
      'Le seuil laisse passer l’eau',
    ],
    repairs: [
      'Remplacement de cylindre et de serrure multipoints',
      'Réglage des paumelles et de la porte',
      'Remplacement de ferme-porte et de gâche électrique',
      'Reprise de l’étanchéité et du seuil',
    ],
  },
  {
    slug: 'porte-garage',
    title: 'Portes de garage',
    keyword: 'Dépannage de porte de garage',
    picto: 'garage',
    excerpt: 'Bloquée, bruyante ou motorisation en panne.',
    intro: 'Sectionnelle, enroulable ou basculante : une porte de garage qui se bloque ou force se répare le plus souvent par un réglage, une pièce d’usure ou la motorisation.',
    problems: [
      'La porte ne s’ouvre plus ou s’arrête en cours de route',
      'Elle force, grince ou sort de ses rails',
      'La télécommande ou le moteur ne répond plus',
      'Un panneau ou un joint est abîmé',
    ],
    repairs: [
      'Réglage des rails, des galets et de l’équilibrage',
      'Dépannage de la motorisation et des télécommandes',
      'Remplacement de câbles, de galets ou de joints',
      'Remplacement de panneau ou de lame endommagée',
    ],
  },
  {
    slug: 'vitrage',
    title: 'Vitrage cassé ou embué',
    keyword: 'Remplacement de vitrage',
    picto: 'glass',
    excerpt: 'Vitre fêlée, cassée ou buée entre les deux verres.',
    intro: 'Un double vitrage cassé ou embué se remplace sans changer la menuiserie. Nous sécurisons l’ouverture si besoin, puis posons un vitrage neuf aux bonnes dimensions.',
    problems: [
      'Vitre fêlée ou cassée',
      'Buée entre les deux verres du double vitrage',
      'Vitrage qui laisse passer le froid ou le bruit',
    ],
    repairs: [
      'Mise en sécurité après une casse',
      'Prise de mesures et remplacement du double vitrage',
      'Vitrage feuilleté de sécurité ou isolant renforcé',
    ],
  },
  {
    slug: 'portails',
    title: 'Portails et portillons',
    keyword: 'Réparation de portail aluminium',
    picto: 'gate',
    excerpt: 'Il s’affaisse, frotte au sol ou la motorisation ne répond plus.',
    intro: 'Un portail aluminium ne rouille pas, mais ses réglages et sa motorisation s’usent. Nous le remettons d’aplomb et en état de marche.',
    problems: [
      'Le portail s’affaisse ou frotte au sol',
      'La motorisation ne répond plus',
      'Le portillon ne ferme plus',
    ],
    repairs: [
      'Réglage des gonds et des vantaux',
      'Dépannage de la motorisation et des télécommandes',
      'Remplacement de serrure et de gâche',
    ],
  },
]

export function findService(slug: string) {
  return services.find(s => s.slug === slug)
}
