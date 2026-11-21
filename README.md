# Site vitrine — dépannage de menuiseries aluminium

Nuxt 4 (Vue 3 + TypeScript), pages pré-générées en HTML pour le référencement, servies par un serveur Node sur Fly.io.

```bash
pnpm install
pnpm dev         # http://localhost:3000
pnpm test        # tests unitaires (validation du formulaire, e-mail)
pnpm typecheck
pnpm build       # génère .output/ (serveur Node autonome)
pnpm preview     # build + serveur de production en local
pnpm run deploy  # = fly deploy --remote-only
```

## À remplir avant la mise en ligne

- **`shared/business.ts`** : nom, e-mail, adresse, horaires, zone d'intervention, engagements, mentions légales (SIRET, assurance, médiateur de la consommation). Les valeurs marquées comme exemples sont fausses.
- **`shared/services.ts`** : les réparations proposées (une entrée = une page `/reparations/<slug>`), avec les pannes courantes et les interventions. À faire valider par le réparateur.
- **`draft: false`** dans `business.ts` le jour de la mise en ligne. Tant qu'il vaut `true`, le site est en `noindex` (robots.txt `Disallow: /` + balise meta) : visible avec le lien, invisible pour Google.

## Architecture

```
shared/                  données et règles communes au navigateur et au serveur
  business.ts            infos de l'entreprise (le seul fichier « contenu » à remplir)
  services.ts            réparations proposées
  contact.ts             validation du formulaire (zod) + mise en forme de l'e-mail
server/
  api/contact.post.ts    route : pot de miel, limite de débit, validation, envoi
  utils/mailer.ts        adaptateur d'envoi (Resend) : seul fichier qui connaît le fournisseur
  utils/rate-limit.ts    limiteur en mémoire (5 demandes / 10 min / IP)
app/
  pages/                 index, reparations/, reparations/[slug], contact, mentions-legales
  components/            en-tête, barre d'action mobile, formulaire, pictogrammes, dessin de baie…
  composables/           useMenuOpen (état partagé du menu mobile)
  utils/                 navigation
  plugins/               focus sur le titre après chaque navigation (lecteurs d'écran)
  assets/css/main.css    jetons de design (couleurs, typo, espacements), verre, boutons
tests/                   tests unitaires (Vitest)
Dockerfile, fly.toml     image et configuration Fly.io
```

Principes : le contenu vit dans `shared/` (données typées, pas dans les composants) ; la validation est écrite une fois et appliquée des deux côtés ; la route serveur orchestre, les détails (fournisseur d'e-mail, limite de débit) sont dans `server/utils`.

## Référencement

- HTML complet généré au build pour chaque page.
- Titre et description par page, avec la recherche visée et la ville (« Réparation de baie coulissante à Bordeaux »…).
- Données structurées : `LocalBusiness`, `Service` par réparation, fil d'Ariane.
- `sitemap.xml`, `robots.txt`, URL canoniques, Open Graph. Anciennes URL `/prestations/*` redirigées (301) vers `/reparations`.
- Fichiers pré-compressés (Brotli + gzip) : le serveur Node et le proxy Fly ne compressent pas à la volée.

À faire une fois en ligne : fiche **Google Business Profile**, **Google Search Console** avec le sitemap.

## Formulaire de contact

`POST /api/contact` : pot de miel, limite de débit par IP, validation zod (`shared/contact.ts`), puis envoi d'un e-mail texte via Resend (`reply_to` = le client s'il a laissé son e-mail).

Variables (secrets Fly) :

| Variable | Rôle |
|---|---|
| `NUXT_RESEND_API_KEY` | obligatoire pour envoyer |
| `NUXT_CONTACT_TO` | adresse qui reçoit les demandes (par défaut l'e-mail de `business.ts`) |
| `NUXT_CONTACT_FROM` | expéditeur ; par défaut `onboarding@resend.dev` |

Sans nom de domaine : créer le compte Resend **avec l'adresse qui reçoit les demandes** (l'expéditeur de test n'écrit qu'au titulaire du compte). Avec un domaine : le vérifier chez Resend et mettre `NUXT_CONTACT_FROM=Site web <formulaire@domaine.fr>`. En local sans clé, le message s'affiche dans le terminal.

## Déploiement (Fly.io)

```bash
fly secrets set NUXT_RESEND_API_KEY=re_xxx NUXT_CONTACT_TO=adresse@entreprise.fr
pnpm run deploy
```

L'image est construite chez Fly (Dockerfile multi-étapes : build Nuxt, puis image finale avec le seul `.output/`, utilisateur non root). Région Paris, une machine de 256 Mo qui se met en veille sans visiteur. Domaine personnalisé : `fly certs add www.domaine.fr`, puis les enregistrements DNS indiqués, puis la nouvelle URL dans `business.url`.

## Design

- Sobre : blanc, gris, anthracite (RAL 7016) et **une seule couleur vive, le cuivre, réservée aux actions**.
- Verre (« liquid glass ») uniquement pour la navigation : en-tête flottant, menu, barre d'action mobile. Repli opaque si le navigateur ne floute pas ou si l'utilisateur demande moins de transparence.
- Mobile d'abord : l'appel est l'action principale (barre du bas « Appeler / Nous écrire »), texte de 17 px, cibles tactiles de 44 px, menu accessible au clavier.
- Visuels dessinés comme des plans de menuiserie (baie cotée, pictogrammes), en attendant de vraies photos.
- Lighthouse mobile : performance 97–99, accessibilité 100, bonnes pratiques 100.
