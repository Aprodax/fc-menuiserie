import { describe, expect, it } from 'vitest'
import { contactSchema, formatContactEmail, type ContactInput } from '../shared/contact'

const valid: ContactInput = {
  name: 'Jeanne Martin',
  phone: '06 12 34 56 78',
  email: '',
  town: 'Bordeaux',
  project: 'volets-roulants',
  message: 'Le volet de la cuisine est bloqué à mi-hauteur.',
}

const errorsOf = (input: ContactInput) => {
  const result = contactSchema.safeParse(input)
  return result.success ? {} : Object.fromEntries(result.error.issues.map(i => [i.path[0], i.message]))
}

describe('contactSchema', () => {
  it('accepte une demande complète, e-mail facultatif', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('normalise le téléphone et retire les espaces superflus', () => {
    const data = contactSchema.parse({ ...valid, phone: '06.12.34.56.78', name: '  Jeanne Martin ' })
    expect(data.phone).toBe('0612345678')
    expect(data.name).toBe('Jeanne Martin')
  })

  it.each(['+33 6 12 34 56 78', '0033612345678', '02 41 00 00 00'])('accepte le numéro %s', (phone) => {
    expect(errorsOf({ ...valid, phone }).phone).toBeUndefined()
  })

  it.each(['12', '06 12 34', '1234567890', 'abc'])('refuse le numéro %s avec un message utile', (phone) => {
    expect(errorsOf({ ...valid, phone }).phone).toMatch(/numéro/)
  })

  it('refuse un e-mail incomplet mais accepte un champ vide', () => {
    expect(errorsOf({ ...valid, email: 'jeanne@' }).email).toMatch(/e-mail/)
    expect(errorsOf({ ...valid, email: '' }).email).toBeUndefined()
  })

  it('refuse une menuiserie hors liste et un message trop court', () => {
    const errors = errorsOf({ ...valid, project: 'pergola', message: 'Bloqué' })
    expect(errors.project).toBeDefined()
    expect(errors.message).toMatch(/10 caractères/)
  })
})

describe('formatContactEmail', () => {
  it('met le sujet sur une seule ligne, même si la commune contient un retour à la ligne', () => {
    const mail = formatContactEmail(contactSchema.parse({ ...valid, town: 'Bordeaux\nCaudéran' }))
    expect(mail.subject).toBe('Demande d’intervention · Volets roulants · Bordeaux Caudéran')
  })

  it('présente le téléphone lisiblement et ne répond au client que s’il a laissé un e-mail', () => {
    const withoutEmail = formatContactEmail(contactSchema.parse(valid))
    expect(withoutEmail.text).toContain('Téléphone : 06 12 34 56 78')
    expect(withoutEmail.replyTo).toBeUndefined()

    const withEmail = formatContactEmail(contactSchema.parse({ ...valid, email: 'jeanne@exemple.fr' }))
    expect(withEmail.replyTo).toBe('jeanne@exemple.fr')
  })
})
