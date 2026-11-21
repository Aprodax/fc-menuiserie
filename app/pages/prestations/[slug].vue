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
  <div :class="`tint-${service.tint}`">
    <section class="detail-hero" aria-labelledby="service-title">
      <div class="container">
        <AppBreadcrumbs
          :items="[
            { label: 'Accueil', to: '/' },
            { label: 'Prestations', to: '/prestations' },
            { label: service.title, to: `/prestations/${service.slug}` },
          ]"
        />
        <div class="detail-hero__grid">
          <div class="detail-hero__text">
            <h1 id="service-title">{{ service.title }}</h1>
            <p class="lead">{{ service.intro }}</p>
            <div class="btn-row">
              <NuxtLink :to="{ path: '/contact', query: { projet: service.slug } }" class="btn btn--primary">
                Demander un devis
              </NuxtLink>
              <a :href="telHref" class="btn btn--glass glass">
                <Icon name="lucide:phone" aria-hidden="true" />
                <span class="tabular">{{ business.phone.display }}</span>
              </a>
            </div>
          </div>
          <div class="detail-hero__visual glass">
            <ServicePicto :name="service.picto" class="detail-hero__picto" />
          </div>
        </div>
      </div>
    </section>

    <section class="section section--surface" aria-labelledby="types-title">
      <div class="container">
        <div class="section-head">
          <h2 id="types-title">Ce que nous posons</h2>
        </div>
        <ul role="list" class="types">
          <li v-for="t in service.types" :key="t.name" class="type">
            <h3>{{ t.name }}</h3>
            <p class="muted">{{ t.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="section" aria-labelledby="options-title">
      <div class="container options">
        <div class="options__head">
          <h2 id="options-title">Options et finitions</h2>
          <p class="lead">Chaque menuiserie est configurée avec vous lors de la visite.</p>
        </div>
        <ul role="list" class="options__list">
          <li v-for="o in service.options" :key="o">
            <Icon name="lucide:check" aria-hidden="true" />
            <span>{{ o }}</span>
          </li>
          <li>
            <Icon name="lucide:check" aria-hidden="true" />
            <span>Thermolaquage dans toutes les teintes RAL, mates, satinées ou texturées</span>
          </li>
        </ul>
      </div>
    </section>

    <nav class="section section--surface" aria-labelledby="others-title">
      <div class="container">
        <h2 id="others-title" class="others__title">Nos autres prestations</h2>
        <ul role="list" class="others">
          <li v-for="s in others" :key="s.slug">
            <NuxtLink :to="`/prestations/${s.slug}`" class="other" :class="`tint-${s.tint}`">
              <span class="other__icon" aria-hidden="true"><ServicePicto :name="s.picto" /></span>
              <span>{{ s.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <CtaBand
      :title="`Un projet : ${service.title.toLowerCase()} ?`"
      :project="service.slug"
    />
  </div>
</template>

<style scoped>
/* Haut de page lavé de la teinte de la prestation, qui passe sous l'en-tête de verre. */
.detail-hero {
  margin-top: calc(-1 * var(--header-h));
  padding-block: calc(var(--header-h) + 8px) var(--section-y);
  background:
    radial-gradient(90% 60% at 100% 0%, color-mix(in srgb, var(--tint-ink) 22%, var(--tint)) 0%, transparent 70%),
    linear-gradient(180deg, var(--tint) 0%, var(--c-bg) 100%);
}
.detail-hero__grid { display: grid; gap: 40px; margin-top: clamp(16px, 3vw, 40px); align-items: center; }
.detail-hero__text { display: grid; gap: 24px; justify-items: start; }

.detail-hero__visual {
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-xl);
}
.detail-hero__picto {
  --picto-stroke: 2px;
  --picto-fill: #f7f9fb;
  --picto-hint: color-mix(in srgb, var(--tint-ink) 55%, transparent);
  width: 56%;
  height: auto;
  color: var(--tint-ink);
}

.types {
  list-style: none;
  display: grid;
  gap: 1px;
  background: var(--c-line);
  border: 1px solid var(--c-line);
  border-radius: var(--radius);
  overflow: hidden;
}
.type { display: grid; gap: 8px; align-content: start; padding: 24px; background: var(--c-bg); }

.options { display: grid; gap: 32px; }
.options__head { display: grid; gap: 16px; align-content: start; }
.options__list { list-style: none; display: grid; }
.options__list li {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 14px;
  padding-block: 16px;
  border-top: 1px solid var(--c-line);
}
.options__list li:last-child { border-bottom: 1px solid var(--c-line); }
.options__list svg { width: 22px; height: 22px; color: var(--tint-ink); margin-top: 2px; }

.others__title { font-size: var(--fs-h3); margin-bottom: 20px; }
.others { list-style: none; display: grid; gap: 8px; }
.other {
  --picto-fill: var(--c-bg);
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 64px;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  background: var(--c-bg);
  font-weight: 600;
  text-decoration: none;
  transition: box-shadow var(--t-base) var(--ease-out);
}
.other:hover { box-shadow: inset 0 0 0 1px var(--c-line-strong); }
.other__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: var(--tint-ink);
}
.other__icon :deep(.picto) { --picto-fill: var(--tint-ink); --picto-hint: rgb(255 255 255 / 0.65); width: 30px; height: 30px; color: #fff; }

@media (min-width: 640px) {
  .types { grid-template-columns: repeat(2, 1fr); }
  .type { padding: 32px; }
  .others { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .detail-hero__grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 64px; }
  .options { grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); gap: 80px; }
  .others { grid-template-columns: repeat(5, 1fr); }
  .other { flex-direction: column; align-items: flex-start; justify-content: space-between; min-height: 140px; padding: 20px; }
  .other__icon { width: 48px; height: 48px; border-radius: 13px; }
  .other__icon :deep(.picto) { width: 36px; height: 36px; }
}
</style>
