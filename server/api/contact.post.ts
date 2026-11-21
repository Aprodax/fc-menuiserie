import { z } from 'zod'
import { contactSchema, formatContactEmail } from '#shared/contact'

/** Reçoit une demande d'intervention, la valide et l'envoie par e-mail à l'entreprise. */
export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown> | null>(event)

  // Pot de miel : champ invisible pour un humain, rempli par les robots.
  // On répond « OK » sans rien envoyer pour ne pas les renseigner.
  if (typeof body?.website === 'string' && body.website !== '') {
    return { ok: true }
  }

  // Fly.io transmet l'adresse réelle du visiteur dans Fly-Client-IP.
  const ip = getRequestHeader(event, 'fly-client-ip') ?? getRequestIP(event, { xForwardedFor: true }) ?? 'inconnue'
  if (isRateLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Trop de demandes' })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Formulaire incomplet',
      data: { fieldErrors: z.flattenError(parsed.error).fieldErrors },
    })
  }

  const mail = formatContactEmail(parsed.data)
  // useRuntimeConfig(event) lit les variables NUXT_* au démarrage du serveur.
  const { resendApiKey, contactFrom, contactTo } = useRuntimeConfig(event)

  if (!resendApiKey) {
    if (import.meta.dev) {
      console.info(`[contact] Pas de clé Resend : message affiché ici au lieu d'être envoyé.\n${mail.subject}\n${mail.text}`)
      return { ok: true }
    }
    console.error('[contact] NUXT_RESEND_API_KEY manquante')
    throw createError({ statusCode: 503, statusMessage: 'Envoi indisponible' })
  }

  try {
    await sendMail(mail, { apiKey: resendApiKey, from: contactFrom, to: contactTo })
  }
  catch (error) {
    console.error('[contact] Échec de l’envoi', error)
    throw createError({ statusCode: 502, statusMessage: 'Envoi impossible' })
  }

  return { ok: true }
})
