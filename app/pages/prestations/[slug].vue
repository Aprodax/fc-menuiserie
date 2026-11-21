<script setup lang="ts">
import { business, telHref } from '#shared/business'
import { findService, services, type Service } from '#shared/services'

const route = useRoute()
const found = findService(String(route.params.slug))
if (!found) {
  throw createError({ statusCode: 404, statusMessage: 'Prestation introuvable', fatal: true })
}
const service: Service = found

const { city } = business.address
const others = services.filter(s => s.slug !== service.slug)

useSeoMeta({
  title: `${service.keyword} à ${city}`,
  description: `${service.excerpt} Fabrication sur mesure et pose par ${business.name} à ${city} et alentours. Devis gratuit.`,
})

useSchemaOrg([
  {
    '@type': 'Service',
    'name': service.title,
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
            { label: 'Prestations', to: '/prestations' },
            { label: service.title, to: `/prestations/${service.slug}` },
          ]"
        />
        <div class="detail-hero__body">
          <ServicePicto :name="service.picto" class="detail-hero__picto" />
          <h1 id="service-title">{{ service.title }}</h1>
          <p class="lead">{{ service.intro }}</p>
          <!-- Sur mobile, la barre d'action du bas suffit. -->
          <div class="detail-hero__actions">
            <NuxtLink :to="{ path: '/contact', query: { projet: service.slug } }" class="btn btn--primary">
              Demander un devis
            </NuxtLink>
            <a :href="telHref" class="link-arrow">
              <Icon name="lucide:phone" aria-hidden="true" />
              <span class="tabular">{{ business.phone.display }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--surface" aria-labelledby="types-title">
      <div class="container">
        <h2 id="types-title" class="section-title">Ce que nous posons</h2>
        <ul role="list" class="types">
          <li v-for="t in service.types" :key="t.name">
            <h3 class="type__name">{{ t.name }}</h3>
            <p class="muted">{{ t.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="section" aria-labelledby="options-title">
      <div class="container">
        <h2 id="options-title" class="section-title">Options et finitions</h2>
        <ul role="list" class="options">
          <li v-for="o in service.options" :key="o">
            <Icon name="lucide:check" aria-hidden="true" />
            <span>{{ o }}</span>
          </li>
          <li>
            <Icon name="lucide:check" aria-hidden="true" />
            <span>Toutes les teintes RAL, mates, satinées ou texturées</span>
          </li>
        </ul>
      </div>
    </section>

    <nav class="section section--surface" aria-labelledby="others-title">
      <div class="container">
        <h2 id="others-title" class="section-title others__title">Nos autres prestations</h2>
        <ul role="list" class="others">
          <li v-for="s in others" :key="s.slug">
            <NuxtLink :to="`/prestations/${s.slug}`" class="other">
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

.types { list-style: none; display: grid; gap: 24px; }
.type__name { font-size: var(--fs-body); margin-bottom: 4px; }

.options { list-style: none; display: grid; max-width: 46rem; }
.options li {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 14px;
  padding-block: 14px;
  border-bottom: 1px solid var(--c-line);
}
.options li:first-child { border-top: 1px solid var(--c-line); }
.options svg { width: 22px; height: 22px; color: var(--c-accent); margin-top: 2px; }

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
  .types { grid-template-columns: repeat(2, 1fr); gap: 32px 48px; }
  .others { grid-template-columns: repeat(2, 1fr); column-gap: 48px; }
}
@media (min-width: 960px) {
  .detail-hero__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; margin-top: 8px; }
}
@media (min-width: 1024px) {
  .types { grid-template-columns: repeat(4, 1fr); }
  .others { grid-template-columns: repeat(3, 1fr); }
}
</style>
