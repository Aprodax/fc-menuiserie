<script setup lang="ts">
import { business, fullAddress, mailHref, mapsHref, telHref } from '#shared/business'

useSeoMeta({
  title: `Contact et devis gratuit · ${business.activity} à ${business.address.city}`,
  description: `Demandez votre devis gratuit pour vos fenêtres, baies, portes, volets ou portail en aluminium. ${business.name}, ${business.address.city} : ${business.phone.display}.`,
})
</script>

<template>
  <div>
    <PageIntro
      title="Contact et devis gratuit"
      :lead="`Décrivez votre projet en quelques lignes : nous vous rappelons ${business.responseDelay} pour fixer un rendez-vous et prendre les cotes.`"
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Contact', to: '/contact' }]"
    />

    <div class="container contact">
      <aside class="contact__quick tint-ciel" aria-labelledby="quick-title">
        <h2 id="quick-title" class="contact__label">Le plus rapide : nous appeler</h2>
        <a :href="telHref" class="contact__phone tabular">
          <Icon name="lucide:phone" aria-hidden="true" />
          {{ business.phone.display }}
        </a>
        <p class="small muted">{{ business.hours[0]?.days }}, {{ business.hours[0]?.time }}</p>
        <p class="contact__mail">
          Ou par e-mail : <a :href="mailHref">{{ business.email }}</a>
        </p>
      </aside>

      <section class="contact__form" aria-labelledby="form-title">
        <h2 id="form-title" class="contact__form-title">Votre demande de devis</h2>
        <ContactForm />
      </section>

      <aside class="contact__details" aria-label="Adresse et horaires">
        <div class="detail">
          <h2 class="contact__label">Adresse</h2>
          <p>{{ business.legal.legalName }}<br>{{ business.address.street }}<br>{{ business.address.postalCode }} {{ business.address.city }}</p>
          <a :href="mapsHref" target="_blank" rel="noopener" class="link-arrow">
            <span>Itinéraire</span>
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
            <span class="visually-hidden">vers {{ fullAddress }} (nouvel onglet)</span>
          </a>
        </div>
        <div class="detail">
          <h2 class="contact__label">Horaires</h2>
          <dl class="hours">
            <div v-for="h in business.hours" :key="h.days">
              <dt>{{ h.days }}</dt>
              <dd class="muted">{{ h.time }}</dd>
            </div>
          </dl>
        </div>
        <div class="detail">
          <h2 class="contact__label">Zone d’intervention</h2>
          <p class="muted">
            {{ business.address.city }} et {{ business.serviceArea.radiusKm }} km alentour :
            {{ business.serviceArea.towns.slice(1).join(', ') }}…
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.contact {
  display: grid;
  gap: 48px;
  grid-template-areas: 'quick' 'form' 'details';
  padding-bottom: var(--section-y);
}
.contact__quick { grid-area: quick; }
.contact__form { grid-area: form; }
.contact__details { grid-area: details; }

.contact__label { font-size: var(--fs-small); font-weight: 600; color: var(--c-ink-2); letter-spacing: 0; }

.contact__quick {
  display: grid;
  gap: 8px;
  padding: 24px;
  border-radius: var(--radius-xl);
  background: var(--tint);
}
.contact__phone {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  font-size: clamp(1.75rem, 1.5rem + 1vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  text-decoration: none;
}
.contact__phone svg { width: 28px; height: 28px; color: var(--tint-ink); }
.contact__phone:hover { text-decoration: underline; text-decoration-thickness: 2px; }
.contact__mail { margin-top: 8px; padding-top: 16px; border-top: 1px solid rgb(0 0 0 / 0.08); }
.contact__mail a { overflow-wrap: anywhere; }

.contact__form-title { font-size: var(--fs-h3); margin-bottom: 20px; }

.contact__details { display: grid; gap: 0; align-content: start; }
.detail { display: grid; gap: 8px; padding-block: 24px; border-top: 1px solid var(--c-line); }
.hours { margin: 0; display: grid; gap: 8px; }
.hours dt { font-weight: 600; }
.hours dd { margin: 0; }

@media (min-width: 1024px) {
  .contact {
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
    grid-template-areas: 'form quick' 'form details';
    grid-template-rows: auto 1fr;
    column-gap: 80px;
    row-gap: 24px;
  }
  .contact__quick { padding: 32px; }
}
</style>
