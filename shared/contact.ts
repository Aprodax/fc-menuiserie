import { z } from 'zod'
import { services } from './services'

/** Choix proposés dans le formulaire : les prestations + « Autre ». */
export const projectOptions = [
  ...services.map(s => ({ value: s.slug, label: s.title })),
  { value: 'autre', label: 'Autre projet' },
]

const projectValues = projectOptions.map(o => o.value) as [string, ...string[]]

/** Accepte « 06 12 34 56 78 », « 06.12.34.56.78 », « +33 6 12 34 56 78 »… */
export const normalizePhone = (value: string) => value.replace(/[\s.\-()]/g, '')
const phonePattern = /^(?:0[1-9]\d{8}|\+\d{8,15}|00\d{8,15})$/

/**
 * Règles de validation partagées : le formulaire les utilise pour guider
 * la saisie, et l'API les réapplique (ne jamais faire confiance au navigateur).
 */
export const contactSchema = z.object({
  name: z.string().trim()
    .min(2, 'Indiquez votre nom.')
    .max(100, 'Ce nom est trop long (100 caractères maximum).'),
  phone: z.string().trim()
    .min(1, 'Indiquez votre numéro de téléphone pour que nous puissions vous rappeler.')
    .transform(normalizePhone)
    .pipe(z.string().regex(phonePattern, 'Ce numéro ne semble pas valide : 10 chiffres, par exemple 06 12 34 56 78.')),
  email: z.string().trim()
    .max(254, 'Cette adresse est trop longue.')
    .refine(v => v === '' || z.email().safeParse(v).success, 'Adresse e-mail incomplète, par exemple nom@exemple.fr.'),
  town: z.string().trim()
    .min(2, 'Indiquez la commune du chantier.')
    .max(100, 'Ce nom de commune est trop long.'),
  project: z.enum(projectValues, 'Choisissez le type de projet dans la liste.'),
  message: z.string().trim()
    .min(10, 'Décrivez votre projet en quelques mots (10 caractères minimum).')
    .max(5000, 'Votre message est trop long (5 000 caractères maximum).'),
})

export type ContactInput = z.input<typeof contactSchema>
export type ContactField = keyof ContactInput
