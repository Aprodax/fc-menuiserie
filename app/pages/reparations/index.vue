<script setup lang="ts">
import { business, telHref } from '#shared/business'
import { services } from '#shared/services'

const { city } = business.address

useSeoMeta({
  title: `Réparation de menuiseries aluminium à ${city}`,
  description: `Baies coulissantes, volets roulants, fenêtres, portes, vitrages et portails aluminium : dépannage et réparation à ${city} et dans un rayon de ${business.serviceArea.radiusKm} km.`,
})
</script>

<template>
  <div>
    <PageIntro
      title="Nos réparations"
      :lead="`Nous dépannons et réparons les menuiseries aluminium, à ${city} et dans un rayon de ${business.serviceArea.radiusKm} km.`"
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Réparations', to: '/reparations' }]"
    />

    <section class="container" aria-label="Liste des réparations">
      <ul role="list" class="service-list">
        <li v-for="s in services" :key="s.slug">
          <NuxtLink :to="`/reparations/${s.slug}`" class="service-row">
            <ServicePicto :name="s.picto" class="service-row__picto" />
            <div class="service-row__main">
              <h2 class="service-row__title">{{ s.title }}</h2>
              <p class="muted">{{ s.excerpt }}</p>
            </div>
            <Icon name="lucide:chevron-right" class="service-row__arrow" aria-hidden="true" />
          </NuxtLink>
        </li>
      </ul>

      <p class="other-problem">
        Votre panne n’est pas dans la liste ? Si c’est en aluminium, nous regardons :
        <a :href="telHref" class="tabular">{{ business.phone.display }}</a>.
      </p>
    </section>
  </div>
</template>

<style scoped>
.service-list { list-style: none; border-top: 1px solid var(--c-line); }
.service-list li { border-bottom: 1px solid var(--c-line); }

.service-row {
  display: grid;
  grid-template-columns: 44px 1fr 20px;
  align-items: center;
  gap: 16px;
  padding-block: 22px;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}
.service-row__picto { width: 44px; height: 44px; }
.service-row__main { display: grid; gap: 4px; }
.service-row__title { font-size: 1.25rem; letter-spacing: -0.01em; }
.service-row__arrow { width: 20px; height: 20px; color: var(--c-ink-2); transition: transform var(--t-base) var(--ease-out); }
.service-row:hover .service-row__title { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 0.2em; }
.service-row:hover .service-row__arrow { transform: translateX(3px); color: var(--c-ink); }

.other-problem { padding-block: 32px var(--section-y); color: var(--c-ink-2); }
.other-problem a { color: var(--c-ink); font-weight: 600; white-space: nowrap; }

@media (min-width: 768px) {
  .service-row { grid-template-columns: 56px 1fr 20px; gap: 24px; padding-block: 28px; }
  .service-row__picto { width: 56px; height: 56px; }
  .service-row__title { font-size: 1.5rem; }
}
</style>
