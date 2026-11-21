<script setup lang="ts">
import { business, telHref } from '#shared/business'
import { findService, services } from '#shared/services'

// Une URL inconnue (/reparations/n-importe-quoi) renvoie directement une 404.
definePageMeta({
  validate: route => typeof route.params.slug === 'string' && !!findService(route.params.slug),
})

const route = useRoute()
const service = findService(String(route.params.slug))! // existence garantie par validate
const { city } = business.address
const others = services.filter(s => s.slug !== service.slug)

useSeoMeta({
  title: `${service.keyword} à ${city}`,
  description: `${service.excerpt} ${business.name} répare vos menuiseries aluminium à ${city} et alentours. ${business.phone.display}.`,
})

useSchemaOrg([
  {
    '@type': 'Service',
    'name': service.keyword,
    'description': service.intro,
    'serviceType': service.keyword,
    'provider': { '@id': `${business.url}/#identity` },
    'areaServed': business.serviceArea.towns,
  },
])
</script>

<template>
  <div>
    <section class="detail-hero" aria-labelledby="service-title">
      <div class="container">
        <AppBreadcrumbs
          :items="[
            { label: 'Accueil', to: '/' },
            { label: 'Réparations', to: '/reparations' },
            { label: service.title, to: `/reparations/${service.slug}` },
          ]"
        />
        <div class="detail-hero__body">
          <ServicePicto :name="service.picto" class="detail-hero__picto" />
          <h1 id="service-title">{{ service.keyword }}</h1>
          <p class="lead">{{ service.intro }}</p>
          <!-- Sur mobile, la barre d'action du bas suffit. -->
          <div class="detail-hero__actions">
            <NuxtLink :to="{ path: '/contact', query: { projet: service.slug } }" class="btn btn--primary">
              Demander une intervention
            </NuxtLink>
            <a :href="telHref" class="link-arrow">
              <Icon name="lucide:phone" aria-hidden="true" />
              <span class="tabular">{{ business.phone.display }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--surface" aria-labelledby="problems-title">
      <div class="container columns">
        <div>
          <h2 id="problems-title" class="section-title">Pannes courantes</h2>
          <ul role="list" class="list">
            <li v-for="p in service.problems" :key="p">
              <Icon name="lucide:circle-alert" class="list__icon list__icon--problem" aria-hidden="true" />
              <span>{{ p }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h2 id="repairs-title" class="section-title">Ce que nous faisons</h2>
          <ul role="list" class="list">
            <li v-for="r in service.repairs" :key="r">
              <Icon name="lucide:check" class="list__icon" aria-hidden="true" />
              <span>{{ r }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <nav class="section" aria-labelledby="others-title">
      <div class="container">
        <h2 id="others-title" class="section-title others__title">Autres réparations</h2>
        <ul role="list" class="others">
          <li v-for="s in others" :key="s.slug">
            <NuxtLink :to="`/reparations/${s.slug}`" class="other">
              {{ s.title }}
              <Icon name="lucide:chevron-right" aria-hidden="true" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.detail-hero { padding-block: 8px clamp(48px, 7vw, 96px); }
.detail-hero__body { display: grid; gap: 20px; justify-items: start; max-width: 46rem; margin-top: clamp(16px, 3vw, 40px); }
.detail-hero__picto { width: 56px; height: 56px; }
.detail-hero__actions { display: none; }

.columns { display: grid; gap: 48px; }

.list { list-style: none; display: grid; }
.list li {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 14px;
  padding-block: 14px;
  border-bottom: 1px solid var(--c-line);
}
.list li:first-child { border-top: 1px solid var(--c-line); }
.list__icon { width: 22px; height: 22px; margin-top: 2px; color: var(--c-accent); }
.list__icon--problem { color: var(--c-ink-2); }

.others__title { font-size: var(--fs-h3); }
.others { list-style: none; display: grid; border-top: 1px solid var(--c-line); }
.others li { border-bottom: 1px solid var(--c-line); }
.other {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 56px;
  font-weight: 500;
  text-decoration: none;
}
.other svg { width: 20px; height: 20px; color: var(--c-ink-2); }
.other:hover { text-decoration: underline; text-underline-offset: 0.2em; }

@media (min-width: 768px) {
  .others { grid-template-columns: repeat(2, 1fr); column-gap: 48px; }
}
@media (min-width: 960px) {
  .detail-hero__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; margin-top: 8px; }
}
@media (min-width: 1024px) {
  .columns { grid-template-columns: 1fr 1fr; gap: 80px; }
  .others { grid-template-columns: repeat(3, 1fr); }
}
</style>
