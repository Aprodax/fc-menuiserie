<script setup lang="ts">
import { business } from '#shared/business'
import { services } from '#shared/services'

const { city } = business.address

useSeoMeta({
  title: `Nos prestations en menuiserie aluminium à ${city}`,
  description: `Fenêtres, baies vitrées coulissantes, portes d’entrée, volets, portails et pergolas en aluminium : fabrication sur mesure et pose à ${city} et alentours.`,
})

const benefits = [
  { title: 'Plus de lumière', text: 'Des profilés fins : plus de vitrage qu’avec d’autres matériaux, à dimensions égales.' },
  { title: 'Durable', text: 'L’aluminium ne rouille pas, ne gonfle pas et ne se déforme pas avec les saisons.' },
  { title: 'Sans entretien', text: 'Un coup d’éponge de temps en temps suffit. Jamais de peinture à refaire.' },
  { title: 'Isolant', text: 'Profilés à rupture de pont thermique, double ou triple vitrage.' },
]
</script>

<template>
  <div>
    <PageIntro
      title="Nos prestations"
      :lead="`Toute la menuiserie extérieure en aluminium, sur mesure et posée par nos soins à ${city} et alentours.`"
      :crumbs="[{ label: 'Accueil', to: '/' }, { label: 'Prestations', to: '/prestations' }]"
    />

    <section class="container" aria-label="Liste des prestations">
      <ul role="list" class="service-list">
        <li v-for="s in services" :key="s.slug">
          <NuxtLink :to="`/prestations/${s.slug}`" class="service-row">
            <ServicePicto :name="s.picto" class="service-row__picto" />
            <div class="service-row__main">
              <h2 class="service-row__title">{{ s.title }}</h2>
              <p class="muted">{{ s.excerpt }}</p>
            </div>
            <Icon name="lucide:chevron-right" class="service-row__arrow" aria-hidden="true" />
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section class="section" aria-labelledby="colors-title">
      <div class="container colors">
        <div class="colors__text">
          <h2 id="colors-title">Toutes les couleurs</h2>
          <p class="lead">
            L’aluminium est thermolaqué dans la teinte RAL de votre choix, mate, satinée ou texturée.
            Blanc dedans et anthracite dehors, c’est possible aussi.
          </p>
          <p class="small muted">Rendu écran indicatif : nous apportons le nuancier lors de la visite.</p>
        </div>
        <RalSwatches />
      </div>
    </section>

    <section class="section section--surface" aria-labelledby="alu-title">
      <div class="container">
        <h2 id="alu-title" class="section-title">Pourquoi l’aluminium ?</h2>
        <ul role="list" class="benefits">
          <li v-for="b in benefits" :key="b.title">
            <h3 class="benefit__title">{{ b.title }}</h3>
            <p class="muted">{{ b.text }}</p>
          </li>
        </ul>
      </div>
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
.service-row__picto { width: 44px; height: 44px; align-self: start; margin-top: 2px; }
.service-row__main { display: grid; gap: 4px; }
.service-row__title { font-size: 1.25rem; letter-spacing: -0.01em; }
.service-row__arrow { width: 20px; height: 20px; color: var(--c-ink-2); transition: transform var(--t-base) var(--ease-out); }
.service-row:hover .service-row__title { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 0.2em; }
.service-row:hover .service-row__arrow { transform: translateX(3px); color: var(--c-ink); }

.colors { display: grid; gap: 32px; }
.colors__text { display: grid; gap: 16px; align-content: start; }

.benefits { list-style: none; display: grid; gap: 24px; }
.benefit__title { font-size: var(--fs-body); margin-bottom: 4px; }

@media (min-width: 768px) {
  .service-row { grid-template-columns: 56px 1fr 20px; gap: 24px; padding-block: 28px; }
  .service-row__picto { width: 56px; height: 56px; align-self: center; margin-top: 0; }
  .service-row__title { font-size: 1.5rem; }
  .benefits { grid-template-columns: repeat(2, 1fr); gap: 32px 48px; }
}

@media (min-width: 1024px) {
  .colors { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 80px; }
  .benefits { grid-template-columns: repeat(4, 1fr); }
}
</style>
