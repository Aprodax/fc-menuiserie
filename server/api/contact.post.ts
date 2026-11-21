import { z } from 'zod'
import { contactSchema, projectOptions } from '#shared/contact'

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown> | null>(event)

  // Pot de miel : champ invisible pour un humain, rempli par les robots.
  // On répond « OK » sans rien envoyer pour ne pas les renseigner.
  if (typeof body?.website === 'string' && body.website !== '') {
    return { ok: true }
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Formulaire incomplet',
      data: { fieldErrors: z.flattenError(parsed.error).fieldErrors },
    })
  }

  const data = parsed.data
  const projectLabel = projectOptions.find(o => o.value === data.project)?.label ?? data.project
  const subject = `Demande de devis · ${projectLabel} · ${data.town}`
  const text = [
    `Nom : ${data.name}`,
    `Téléphone : ${data.phone}`,
    `E-mail : ${data.email || 'non renseigné'}`,
    `Commune du chantier : ${data.town}`,
    `Projet : ${projectLabel}`,
    '',
    data.message,
  ].join('\n')

  // useRuntimeConfig(event) : indispensable sur Cloudflare pour lire les secrets du worker.
  const config = useRuntimeConfig(event)

  if (!config.resendApiKey) {
    if (import.meta.dev) {
      console.info(`[contact] Pas de clé Resend : message affiché ici au lieu d'être envoyé.\n${subject}\n${text}`)
      return { ok: true }
    }
    console.error('[contact] NUXT_RESEND_API_KEY manquante')
    throw createError({ statusCode: 503, statusMessage: 'Envoi indisponible' })
  }

  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.resendApiKey}` },
      body: {
        from: config.contactFrom,
        to: [config.contactTo],
        reply_to: data.email || undefined,
        subject,
        text,
      },
    })
  }
  catch (error) {
    console.error('[contact] Échec de l’envoi via Resend', error)
    throw createError({ statusCode: 502, statusMessage: 'Envoi impossible' })
  }

  return { ok: true }
})
