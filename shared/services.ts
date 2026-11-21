/**
 * Les prestations : une entrée = une page /prestations/<slug>.
 * Ajoute, retire ou réécris librement ; l'accueil, la page Prestations,
 * le formulaire de contact et le plan du site suivent automatiquement.
 */
export type PictoName = 'window' | 'slider' | 'door' | 'shutter' | 'gate' | 'pergola'

export interface Service {
  slug: string
  title: string
  /** Mot-clé principal, utilisé dans le titre de la page pour Google. */
  keyword: string
  picto: PictoName
  excerpt: string
  intro: string
  types: { name: string, text: string }[]
  options: string[]
}

export const services: Service[] = [
  {
    slug: 'fenetres',
    title: 'Fenêtres et portes-fenêtres',
    keyword: 'Fenêtres aluminium',
    picto: 'window',
    excerpt: 'À la française, oscillo-battantes ou fixes, en double ou triple vitrage.',
    intro: 'Des fenêtres aluminium à rupture de pont thermique, fabriquées à vos dimensions, en construction neuve comme en rénovation. Leurs profilés fins laissent entrer davantage de lumière, sans rien céder sur l’isolation.',
    types: [
      { name: 'Ouvrant à la française', text: 'Un ou deux vantaux : le grand classique, simple et robuste.' },
      { name: 'Oscillo-battant', text: 'S’entrouvre par le haut pour aérer en toute sécurité.' },
      { name: 'Châssis fixe et soufflet', text: 'Pour les impostes, les pièces d’eau et les grandes vitres.' },
      { name: 'Porte-fenêtre', text: 'Avec seuil plat possible pour un passage de plain-pied.' },
    ],
    options: [
      'Double ou triple vitrage, feuilleté de sécurité',
      'Pose en rénovation sur dormant existant ou en dépose totale',
      'Petits-bois, vitrage dépoli ou imprimé',
      'Bicoloration : blanc à l’intérieur, teinte au choix à l’extérieur',
      'Entrées d’air intégrées à la menuiserie',
    ],
  },
  {
    slug: 'baies-coulissantes',
    title: 'Baies vitrées coulissantes',
    keyword: 'Baies vitrées coulissantes aluminium',
    picto: 'slider',
    excerpt: 'De deux à six vantaux, à galandage ou en angle, pour ouvrir grand sur le jardin.',
    intro: 'La baie coulissante est le point fort de l’aluminium : sa rigidité autorise de grandes surfaces vitrées avec des montants très fins. Elle se manœuvre sans effort et ne prend aucune place à l’ouverture.',
    types: [
      { name: 'Coulissant 2, 3 ou 4 vantaux', text: 'Sur deux ou trois rails, selon la largeur de passage souhaitée.' },
      { name: 'À galandage', text: 'Les vantaux disparaissent dans la cloison pour libérer tout le passage.' },
      { name: 'Levant-coulissant', text: 'Pour les très grands vantaux, avec une étanchéité renforcée.' },
      { name: 'Baie d’angle', text: 'Sans poteau d’angle, pour une vue complètement dégagée.' },
    ],
    options: [
      'Seuil encastré pour un passage sans ressaut',
      'Fermeture multipoints et vitrage retardateur d’effraction',
      'Motorisation des grands vantaux',
      'Volet roulant intégré ou coffre extérieur',
    ],
  },
  {
    slug: 'portes-entree',
    title: 'Portes d’entrée',
    keyword: 'Portes d’entrée aluminium',
    picto: 'door',
    excerpt: 'Pleines ou vitrées, isolantes et sécurisées, dans le style de votre maison.',
    intro: 'Une porte d’entrée aluminium réunit isolation, sécurité et stabilité dans le temps : elle ne gonfle pas, ne se déforme pas et ne demande pratiquement aucun entretien.',
    types: [
      { name: 'Panneau monobloc', text: 'Un panneau plein sur les deux faces, sans ouvrant visible, pour un rendu net.' },
      { name: 'Porte vitrée', text: 'Vitrage feuilleté de sécurité, clair, dépoli ou décoratif.' },
      { name: 'Avec tierce ou imposte', text: 'Un vantail secondaire ou un fixe vitré pour plus de lumière.' },
      { name: 'Porte de service', text: 'Pour le garage, le cellier ou l’atelier.' },
    ],
    options: [
      'Serrure 3 ou 5 points, cylindre de sécurité',
      'Ouverture par empreinte digitale ou clavier à code',
      'Barre de tirage ou poignée au choix',
      'Seuil adapté aux personnes à mobilité réduite',
    ],
  },
  {
    slug: 'volets',
    title: 'Volets roulants et battants',
    keyword: 'Volets aluminium',
    picto: 'shutter',
    excerpt: 'Roulants, battants ou coulissants, manuels, motorisés ou solaires.',
    intro: 'Les volets aluminium protègent du soleil, du froid et des regards. Nous les posons avec des fenêtres neuves comme sur des menuiseries existantes.',
    types: [
      { name: 'Volet roulant', text: 'Coffre extérieur, intégré ou tunnel, selon la configuration de la baie.' },
      { name: 'Volet battant', text: 'Plein, persienné ou à cadre, sans peinture à refaire.' },
      { name: 'Volet coulissant', text: 'Il glisse le long de la façade, idéal pour les grandes ouvertures.' },
      { name: 'Brise-soleil orientable', text: 'Pour régler finement la lumière et la chaleur.' },
    ],
    options: [
      'Motorisation filaire, radio ou solaire, sans travaux d’électricité',
      'Commande centralisée ou depuis votre téléphone',
      'Lames isolantes et verrous anti-relevage',
    ],
  },
  {
    slug: 'portails-clotures',
    title: 'Portails et clôtures',
    keyword: 'Portails aluminium',
    picto: 'gate',
    excerpt: 'Battants ou coulissants, motorisés, assortis au portillon et à la clôture.',
    intro: 'Un portail aluminium ne rouille pas et garde son aspect pendant des années. Nous réalisons l’ensemble — portail, portillon, clôture et motorisation — dans la même teinte.',
    types: [
      { name: 'Portail battant', text: 'Deux vantaux qui s’ouvrent vers l’intérieur de la propriété.' },
      { name: 'Portail coulissant', text: 'Pour les entrées en pente ou quand la place manque.' },
      { name: 'Portillon', text: 'Assorti au portail, avec serrure et gâche électrique.' },
      { name: 'Clôture et brise-vue', text: 'Ajourés ou pleins, pour délimiter et protéger votre terrain.' },
    ],
    options: [
      'Motorisation avec télécommandes',
      'Visiophone et contrôle d’accès',
      'Boîte aux lettres intégrée au pilier ou au portillon',
    ],
  },
  {
    slug: 'pergolas',
    title: 'Pergolas bioclimatiques',
    keyword: 'Pergolas bioclimatiques',
    picto: 'pergola',
    excerpt: 'Des lames orientables pour profiter de la terrasse, au soleil comme à l’ombre.',
    intro: 'La pergola bioclimatique protège du soleil et de la pluie grâce à ses lames orientables. Adossée à la maison ou autoportée, elle prolonge la pièce de vie à l’extérieur.',
    types: [
      { name: 'Pergola adossée', text: 'Fixée à la façade, dans le prolongement du séjour.' },
      { name: 'Pergola autoportée', text: 'Sur quatre poteaux, où vous voulez dans le jardin.' },
      { name: 'Lames orientables', text: 'Elles pivotent pour ventiler, filtrer la lumière ou fermer le toit.' },
      { name: 'Fermetures latérales', text: 'Stores verticaux, panneaux vitrés ou claustras.' },
    ],
    options: [
      'Motorisation des lames et capteur de pluie',
      'Éclairage LED intégré',
      'Évacuation des eaux pluviales par les poteaux',
    ],
  },
]

export function findService(slug: string) {
  return services.find(s => s.slug === slug)
}
