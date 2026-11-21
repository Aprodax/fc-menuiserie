# Site vitrine — menuiserie aluminium

Nuxt 4 (Vue 3 + TypeScript), pages pré-générées en HTML pour le référencement, hébergé sur Fly.io (Cloudflare Workers possible aussi).

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # génère .output/ (serveur Node)
pnpm preview    # build + lance le serveur de production en local
pnpm typecheck
```

## À remplir avant la mise en ligne

Tout est centralisé dans **`shared/business.ts`** : nom, téléphone, adresse, horaires, zone d'intervention, engagements, mentions légales (SIRET, assurance décennale, médiateur de la consommation…). Les valeurs actuelles sont des exemples.

Tant que `draft: true`, le site est marqué `noindex` (robots.txt `Disallow: /` + balise meta) : on peut le montrer sans que Google l'indexe. **Passer `draft: false` le jour de la mise en ligne**, sinon le site n'apparaîtra jamais dans Google.

Les textes des prestations sont dans **`shared/services.ts`** : une entrée = une page `/prestations/<slug>`. L'accueil, la liste, le formulaire et le sitemap suivent automatiquement. Fais-les relire : ce sont des textes génériques corrects, pas encore la réalité de l'entreprise.

## Structure

```
shared/            données partagées entre pages et serveur
  business.ts      infos entreprise (seul fichier à remplir)
  services.ts      prestations
  contact.ts       règles de validation du formulaire (client + serveur)
server/api/
  contact.post.ts  envoi du formulaire par e-mail (Resend)
app/
  pages/           index, prestations/, prestations/[slug], contact, mentions-legales
  components/      en-tête, pied de page, dessin de baie, pictogrammes, formulaire…
  assets/css/      jetons de design (couleurs, typo, espacements) + styles de base
nuxt.config.ts     modules, SEO, prérendu, cible de build (Node ou Cloudflare)
Dockerfile         image de production pour Fly.io
fly.toml           configuration Fly.io (région, machine, veille automatique)
wrangler.jsonc     configuration Cloudflare Workers (alternative)
```

## Référencement : ce qui est en place

- HTML complet généré au build pour chaque page (aucune page vide côté Google).
- Titre et description propres à chaque page, avec le mot-clé et la ville.
- Données structurées : `LocalBusiness` (fiche entreprise), `Service` par prestation, fil d'Ariane.
- `sitemap.xml`, `robots.txt`, URL canoniques, balises Open Graph.
- Une page par prestation, avec maillage interne entre elles.
- Lighthouse mobile : performance 97–98, accessibilité 100, bonnes pratiques 100, SEO 100.

À faire une fois en ligne : créer la **fiche Google Business Profile** (c'est elle qui fait apparaître l'entreprise sur la carte), déclarer le site dans **Google Search Console** et y soumettre `https://<domaine>/sitemap.xml`.

## Formulaire de contact

`POST /api/contact` valide les données avec les mêmes règles que le navigateur (`shared/contact.ts`), filtre les robots (champ caché) et envoie un e-mail texte via l'API [Resend](https://resend.com) (gratuit jusqu'à 3 000 e-mails/mois). La réponse se fait directement au client (`reply_to`).

- En local sans clé : le message s'affiche dans le terminal au lieu d'être envoyé.
- En production : créer un compte Resend, vérifier le domaine (enregistrements DNS), créer une clé API.

Variables : `NUXT_RESEND_API_KEY` (obligatoire), `NUXT_CONTACT_TO` (par défaut l'e-mail de `business.ts`), `NUXT_CONTACT_FROM` (adresse sur le domaine vérifié). Voir `.env.example`.

## Déploiement sur Fly.io (cible actuelle)

`fly deploy` construit le `Dockerfile` sur les serveurs de Fly : build Nuxt (pages pré-générées), puis image finale avec le seul serveur Node autonome (`.output/`). Région Paris (`cdg`), une petite machine (shared-cpu-1x, 256 Mo) qui se met en veille sans visiteur et se réveille à la première requête.

```bash
fly auth login
fly secrets set NUXT_RESEND_API_KEY=re_xxx     # active l'envoi du formulaire
pnpm run deploy                                # = fly deploy
```

Domaine personnalisé : `fly certs add www.ton-domaine.fr`, puis créer chez le registraire les enregistrements DNS indiqués par Fly. Mettre ensuite la nouvelle URL dans `business.url`.

## Alternative : Cloudflare Workers (gratuit)

Le projet sait aussi se construire pour Cloudflare (`wrangler.jsonc`) : les pages sont servies par le CDN, seul `/api/contact` exécute le worker.

```bash
npx wrangler login
npx wrangler secret put NUXT_RESEND_API_KEY
pnpm run deploy:cloudflare     # → https://site-menuiserie.<compte>.workers.dev
```

Domaine personnalisé : ajouter le domaine au compte Cloudflare, puis *Workers & Pages → site-menuiserie → Settings → Domains & Routes → Add custom domain*. Penser à mettre la vraie URL dans `business.url` (sitemap et URL canoniques en dépendent).

Déploiement automatique à chaque push : *Workers & Pages → site-menuiserie → Settings → Builds → Connect* (dépôt GitHub, commande de build `pnpm build`, commande de déploiement `npx wrangler deploy`).

## Choix de design

- Style minimaliste « suisse » : blanc, gris alu, filets de 1 px, une seule couleur d'accent. C'est le style que recommande le skill ui-ux-pro-max pour les artisans et le bâtiment.
- Couleurs tirées du métier : RAL 7016 gris anthracite (la teinte la plus posée) et un cuivre pour les cotes. Contrastes WCAG AA vérifiés, valeurs commentées dans `main.css`.
- Visuels dessinés comme des plans de menuiserie (élévation de baie avec cotes en mm, pictogrammes avec sens d'ouverture), en attendant les vraies photos de chantiers.
- Police Instrument Sans, auto-hébergée (aucun appel à Google côté visiteur).
- Mobile d'abord : texte de 17 px, cibles tactiles de 44 px minimum, téléphone toujours visible dans l'en-tête, menu plein écran accessible au clavier (Échap, focus géré, reste de la page inerte).
- Formulaire : libellés visibles, erreurs sous chaque champ et récapitulatif en haut, saisie conservée en cas d'échec, numéro de téléphone proposé en secours.

## Prochaines étapes possibles

- Réalisations (photos de chantiers) : collection de contenus + `@nuxt/image` pour optimiser les photos.
- Image Open Graph (aperçu des liens partagés sur WhatsApp et Facebook) : activer `ogImage` dans `nuxt.config.ts` une fois les photos disponibles.
- Logo définitif (remplacer `app/components/BrandMark.vue` et `public/favicon.svg`).
- Anti-spam renforcé si besoin : Cloudflare Turnstile.
