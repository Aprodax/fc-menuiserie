<script setup lang="ts">
import { business, fullAddress, mailHref, telHref } from '#shared/business'

const { legal } = business

useSeoMeta({
  title: 'Mentions légales et données personnelles',
  description: `Mentions légales du site ${business.name} : éditeur, hébergeur, assurance, médiation et protection des données personnelles.`,
})

const toc = [
  { id: 'editeur', label: 'Éditeur du site' },
  { id: 'hebergeur', label: 'Hébergement' },
  { id: 'assurance', label: 'Assurance professionnelle' },
  { id: 'mediation', label: 'Médiation de la consommation' },
  { id: 'propriete', label: 'Propriété intellectuelle' },
  { id: 'donnees-personnelles', label: 'Données personnelles' },
  { id: 'cookies', label: 'Cookies' },
]
</script>

<template>
  <div>
    <PageIntro
      title="Mentions légales"
      lead="Les informations légales du site et la façon dont nous traitons vos données."
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Mentions légales', to: '/mentions-legales' }]"
    />

    <div class="container legal">
      <nav class="legal__toc" aria-labelledby="toc-title">
        <h2 id="toc-title" class="legal__toc-title">Sur cette page</h2>
        <ol role="list">
          <li v-for="item in toc" :key="item.id"><a :href="`#${item.id}`">{{ item.label }}</a></li>
        </ol>
      </nav>

      <div class="legal__content">
        <section id="editeur">
          <h2>Éditeur du site</h2>
          <dl>
            <div><dt>Raison sociale</dt><dd>{{ legal.legalName }} ({{ legal.form }} au capital de {{ legal.capital }})</dd></div>
            <div><dt>Siège social</dt><dd>{{ fullAddress }}</dd></div>
            <div><dt>SIRET</dt><dd class="tabular">{{ legal.siret }}</dd></div>
            <div><dt>Immatriculation</dt><dd>{{ legal.rcs }}</dd></div>
            <div><dt>TVA intracommunautaire</dt><dd class="tabular">{{ legal.vat }}</dd></div>
            <div><dt>Téléphone</dt><dd><a :href="telHref" class="tabular">{{ business.phone.display }}</a></dd></div>
            <div><dt>E-mail</dt><dd><a :href="mailHref">{{ business.email }}</a></dd></div>
            <div><dt>Directeur de la publication</dt><dd>{{ legal.publisher }}</dd></div>
          </dl>
        </section>

        <section id="hebergeur">
          <h2>Hébergement</h2>
          <p>
            Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis.
            Téléphone : +1 650 319 8930. Site : <a href="https://www.cloudflare.com/fr-fr/" rel="noopener">cloudflare.com</a>.
          </p>
        </section>

        <section id="assurance">
          <h2>Assurance professionnelle</h2>
          <p>
            Assureur : {{ legal.insurance.insurer }}, {{ legal.insurance.address }}.
            {{ legal.insurance.policy }}. Couverture géographique : {{ legal.insurance.coverage }}.
          </p>
        </section>

        <section id="mediation">
          <h2>Médiation de la consommation</h2>
          <p>
            En cas de litige, et après une réclamation écrite restée sans réponse satisfaisante,
            vous pouvez recourir gratuitement au médiateur de la consommation :
            {{ legal.mediator.name }}, {{ legal.mediator.address }},
            <a :href="legal.mediator.website" rel="noopener">{{ legal.mediator.website.replace(/^https?:\/\//, '') }}</a>.
          </p>
        </section>

        <section id="propriete">
          <h2>Propriété intellectuelle</h2>
          <p>
            Les textes, photographies et dessins de ce site appartiennent à {{ legal.legalName }}.
            Toute reproduction sans autorisation écrite est interdite.
            Icônes : <a href="https://lucide.dev" rel="noopener">Lucide</a> (licence ISC).
          </p>
        </section>

        <section id="donnees-personnelles">
          <h2>Données personnelles</h2>
          <p>
            Le formulaire de contact recueille votre nom, votre téléphone, votre commune,
            votre message et, si vous la donnez, votre adresse e-mail.
          </p>
          <dl>
            <div><dt>Responsable du traitement</dt><dd>{{ legal.legalName }}, {{ fullAddress }}</dd></div>
            <div><dt>Finalité</dt><dd>Répondre à votre demande d’intervention et, le cas échéant, établir un devis.</dd></div>
            <div><dt>Base légale</dt><dd>Mesures précontractuelles prises à votre demande (article 6.1.b du RGPD).</dd></div>
            <div><dt>Destinataires</dt><dd>{{ business.name }} uniquement. Vos données ne sont ni vendues ni utilisées à des fins publicitaires.</dd></div>
            <div><dt>Sous-traitants techniques</dt><dd>Cloudflare (hébergement du site) et Resend (acheminement de l’e-mail), qui peuvent traiter les données aux États-Unis dans le cadre du Data Privacy Framework UE–États-Unis.</dd></div>
            <div><dt>Durée de conservation</dt><dd>Trois ans à compter de notre dernier échange si aucun contrat n’est conclu ; durée légale de conservation des documents commerciaux sinon.</dd></div>
          </dl>
          <p>
            Vous pouvez accéder à vos données, les faire rectifier ou effacer, vous opposer à leur traitement
            ou en demander la limitation et la portabilité en écrivant à <a :href="mailHref">{{ business.email }}</a>.
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la
            <a href="https://www.cnil.fr/fr/plaintes" rel="noopener">CNIL</a>.
          </p>
        </section>

        <section id="cookies">
          <h2>Cookies</h2>
          <p>
            Ce site ne dépose aucun cookie publicitaire ni de mesure d’audience : aucun bandeau de consentement
            n’est donc nécessaire. Les polices de caractères sont hébergées sur le site lui-même, sans appel à
            des services tiers.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legal { display: grid; gap: 40px; padding-bottom: var(--section-y); }

.legal__toc {
  padding: 20px 24px;
  border-radius: var(--radius);
  background: var(--c-surface);
  align-self: start;
}
.legal__toc-title { font-size: var(--fs-small); font-weight: 600; color: var(--c-ink-2); letter-spacing: 0; margin-bottom: 8px; }
.legal__toc ol { list-style: none; display: grid; }
.legal__toc a { display: flex; align-items: center; min-height: 40px; text-decoration: none; }
.legal__toc a:hover { text-decoration: underline; }

.legal__content { display: grid; gap: 48px; max-width: 46rem; }
.legal__content section { display: grid; gap: 16px; }
.legal__content h2 { font-size: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem); }
.legal__content dl { margin: 0; display: grid; border-top: 1px solid var(--c-line); }
.legal__content dl > div {
  display: grid;
  gap: 2px 24px;
  padding-block: 12px;
  border-bottom: 1px solid var(--c-line);
}
.legal__content dt { font-weight: 600; }
.legal__content dd { margin: 0; color: var(--c-ink-2); }

@media (min-width: 768px) {
  .legal__content dl > div { grid-template-columns: 14rem 1fr; }
}
@media (min-width: 1024px) {
  .legal { grid-template-columns: 280px minmax(0, 1fr); gap: 80px; }
  .legal__toc { position: sticky; top: calc(var(--header-h) + 24px); }
}
</style>
