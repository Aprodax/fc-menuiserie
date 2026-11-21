/**
 * Envoi d'e-mails via l'API Resend.
 * C'est le seul fichier qui connaît le fournisseur : pour passer au SMTP de la boîte
 * de l'entreprise ou à un autre service, on ne modifie que lui.
 */
export interface Mail {
  subject: string
  text: string
  replyTo?: string
}

export interface MailerOptions {
  apiKey: string
  from: string
  to: string
}

export async function sendMail(mail: Mail, { apiKey, from, to }: MailerOptions) {
  await $fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: {
      from,
      to: [to],
      reply_to: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
    },
  })
}
