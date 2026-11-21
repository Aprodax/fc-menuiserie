<script setup lang="ts">
import { business, telHref } from '#shared/business'

const { city } = business.address

// Autant de colonnes que d'engagements (4 au plus), pour ne jamais laisser de colonne vide.
const pointCount = business.commitments.length + business.certifications.length
const pointCols = {
  '--cols-md': pointCount === 4 ? 2 : Math.min(pointCount, 3),
  '--cols-lg': Math.min(pointCount, 4),
}

useSeoMeta({
  // Sur l'accueil, le titre complet est écrit à la main (pas de « · nom du site » ajouté).
  title: `${business.activity} à ${city} · ${business.name}`,
  titleTemplate: '%s',
  description: `Baie qui coince, volet roulant bloqué, serrure cassée, vitre fêlée : ${business.name} répare vos menuiseries aluminium à ${city} et alentours. ${business.phone.display}.`,
})
</script>

<template>
  <div>
    <!-- Présentation : ce que fait l'entreprise, où, et comment la contacter. -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="container hero__grid">
        <div class="hero__text">
          <h1 id="hero-title">Expert en menuiserie et SAV</h1>
          <p class="lead">
            Un problème de baie qui coince, un volet roulant bloqué, une serrure cassée, une vitre fêlée ? Nous intervenons au plus vite pour résoudre votre souci.
          </p>
          <!-- Sur mobile, la barre d'action du bas remplit ce rôle : pas de doublon. -->
          <div class="hero__actions">
            <NuxtLink to="/contact" class="btn btn--primary">Demander une intervention</NuxtLink>
            <a :href="telHref" class="link-arrow">
              <Icon name="lucide:phone" aria-hidden="true" />
              <span class="tabular">{{ business.phone.display }}</span>
            </a>
          </div>
        </div>
        <ShutterDrawing class="hero__drawing" />
      </div>
    </section>

    <section class="section" aria-labelledby="services-title">
      <div class="container">
        <h2 id="services-title" class="section-title">Ce que nous réparons</h2>
        <ServiceGrid />
      </div>
    </section>

    <section class="section section--surface" aria-labelledby="why-title">
      <div class="container">
        <h2 id="why-title" class="section-title">Un réparateur, pas un vendeur</h2>
        <ul role="list" class="points" :style="pointCols">
          <li v-for="c in business.commitments" :key="c.title" class="point">
            <Icon name="lucide:check" class="point__icon" aria-hidden="true" />
            <div>
              <h3 class="point__title">{{ c.title }}</h3>
              <p class="muted">{{ c.text }}</p>
            </div>
          </li>
          <li v-for="c in business.certifications" :key="c.name" class="point">
            <Icon name="lucide:badge-check" class="point__icon" aria-hidden="true" />
            <div>
              <h3 class="point__title">{{ c.name }}</h3>
              <p class="muted">{{ c.detail }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="section" aria-labelledby="process-title">
      <div class="container">
        <h2 id="process-title" class="section-title">Comment ça se passe</h2>
        <ProcessSteps />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Présentation : un ciel léger qui passe sous l'en-tête de verre. */
.hero {
  margin-top: calc(-1 * var(--header-h));
  padding-block: calc(var(--header-h) + clamp(32px, 6vw, 88px)) clamp(0px, 2vw, 24px);
  background: linear-gradient(180deg, #dfeaf5 0%, #eef4f9 45%, var(--c-bg) 100%);
}
.hero__grid { display: grid; gap: 40px; align-items: center; }
.hero__text { display: grid; gap: 20px; justify-items: start; }
.hero__actions { display: none; }
.hero__drawing { max-width: 560px; justify-self: center; }

.points { list-style: none; display: grid; gap: 28px; }
.point { display: grid; grid-template-columns: 24px 1fr; gap: 14px; }
.point__icon { width: 24px; height: 24px; color: var(--c-accent); margin-top: 2px; }
.point__title { font-size: var(--fs-body); margin-bottom: 2px; }

@media (min-width: 768px) {
  .points { grid-template-columns: repeat(var(--cols-md, 2), 1fr); gap: 32px 48px; }
}

@media (min-width: 960px) {
  .hero__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; margin-top: 8px; }
}

@media (min-width: 1024px) {
  .hero__grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 64px; }
  .points { grid-template-columns: repeat(var(--cols-lg, 4), 1fr); }
}
</style>
