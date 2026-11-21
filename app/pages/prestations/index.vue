<script setup lang="ts">
import { business } from '#shared/business'
import { services } from '#shared/services'

const { city } = business.address

useSeoMeta({
  title: `Nos prestations en menuiserie aluminium à ${city}`,
  description: `Fenêtres, baies vitrées coulissantes, portes d’entrée, volets, portails et pergolas en aluminium : fabrication sur mesure et pose à ${city} et alentours.`,
})

const benefits = [
  { title: 'Des profilés fins', text: 'Plus de vitrage et donc plus de lumière qu’avec d’autres matériaux, à dimensions égales.' },
  { title: 'Une tenue dans le temps', text: 'L’aluminium ne rouille pas, ne gonfle pas et ne se déforme pas avec les saisons.' },
  { title: 'Presque aucun entretien', text: 'Un coup d’éponge à l’eau savonneuse de temps en temps suffit. Jamais de peinture.' },
  { title: 'Toutes les couleurs', text: 'Thermolaquage dans les teintes RAL, finitions mates, satinées ou texturées.' },
  { title: 'Une bonne isolation', text: 'Les profilés à rupture de pont thermique associés au double ou triple vitrage.' },
  { title: 'Un matériau recyclable', text: 'L’aluminium se recycle indéfiniment, sans perdre ses qualités.' },
]
</script>

<template>
  <div>
    <PageIntro
      title="Nos prestations"
      :lead="`Toute la menuiserie extérieure en aluminium, fabriquée sur mesure et posée par nos soins à ${city} et dans un rayon de ${business.serviceArea.radiusKm} km.`"
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Prestations', to: '/prestations' }]"
    />

    <section class="container" aria-label="Liste des prestations">
      <ul role="list" class="service-list">
        <li v-for="s in services" :key="s.slug" class="service-row">
          <ServicePicto :name="s.picto" class="service-row__picto" />
          <div class="service-row__main">
            <h2 class="service-row__title">
              <NuxtLink :to="`/prestations/${s.slug}`" class="service-row__link">{{ s.title }}</NuxtLink>
            </h2>
            <p class="muted">{{ s.excerpt }}</p>
          </div>
          <ul role="list" class="service-row__types">
            <li v-for="t in s.types" :key="t.name">{{ t.name }}</li>
          </ul>
          <Icon name="lucide:arrow-right" class="service-row__arrow" aria-hidden="true" />
        </li>
      </ul>
    </section>

    <section class="section" aria-labelledby="alu-title">
      <div class="container">
        <div class="section-head">
          <h2 id="alu-title">Pourquoi l’aluminium ?</h2>
          <p class="lead">Un matériau léger et rigide, qui permet de grandes ouvertures et vieillit sans souci.</p>
        </div>
        <ul role="list" class="benefits">
          <li v-for="b in benefits" :key="b.title" class="benefit">
            <h3>{{ b.title }}</h3>
            <p class="muted">{{ b.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.service-list { list-style: none; border-bottom: 1px solid var(--c-line); }

.service-row {
  position: relative;
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 8px 16px;
  padding-block: 28px;
  border-top: 1px solid var(--c-line);
  transition: background-color var(--t-base) var(--ease-out);
}
.service-row__picto { width: 48px; height: 48px; }
.service-row__main { display: grid; gap: 6px; }
.service-row__title { font-size: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem); letter-spacing: -0.015em; }

/* Le lien du titre couvre toute la ligne : une seule cible, un seul arrêt au clavier. */
.service-row__link { text-decoration: none; }
.service-row__link::after { content: ''; position: absolute; inset: 0; }
.service-row__link:focus-visible { outline: none; }
.service-row__link:focus-visible::after { outline: 3px solid var(--c-focus); outline-offset: -3px; border-radius: var(--radius-sm); }
.service-row:hover .service-row__link { text-decoration: underline; text-decoration-thickness: 2px; }

.service-row__types {
  grid-column: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 0;
  list-style: none;
  color: var(--c-ink-2);
  font-size: var(--fs-small);
}
.service-row__types li:not(:last-child)::after { content: '·'; margin-inline: 8px; }

.service-row__arrow { display: none; }

.benefits {
  list-style: none;
  display: grid;
  gap: 1px;
  background: var(--c-line);
  border-block: 1px solid var(--c-line);
}
.benefit { display: grid; gap: 8px; align-content: start; padding: 24px 0; background: var(--c-bg); }

@media (min-width: 768px) {
  .service-row { grid-template-columns: 64px minmax(0, 1fr) minmax(0, 1fr) 24px; gap: 32px; align-items: center; padding-block: 36px; }
  .service-row__picto { width: 64px; height: 64px; }
  .service-row__types { grid-column: auto; }
  .service-row__arrow { display: block; width: 22px; height: 22px; color: var(--c-ink-2); transition: transform var(--t-base) var(--ease-out); }
  .service-row:hover .service-row__arrow { transform: translateX(4px); color: var(--c-ink); }

  .benefits { grid-template-columns: repeat(2, 1fr); border-inline: 1px solid var(--c-line); }
  .benefit { padding: 32px; }
}

@media (min-width: 1024px) {
  .benefits { grid-template-columns: repeat(3, 1fr); }
}
</style>
