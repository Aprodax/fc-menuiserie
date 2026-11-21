<script setup lang="ts">
import { business, telHref } from '#shared/business'

const { city } = business.address

useSeoMeta({
  // Sur l'accueil, le titre complet est écrit à la main (pas de « · nom du site » ajouté).
  title: `${business.activity} à ${city} : fenêtres, baies, portes et portails · ${business.name}`,
  titleTemplate: '%s',
  description: `${business.name}, ${business.activity.toLowerCase()} à ${city}. Fenêtres, baies coulissantes, portes d’entrée, volets, portails et pergolas sur mesure, posés par nos soins. Devis gratuit.`,
})
</script>

<template>
  <div>
    <!-- Présentation -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="container hero__grid">
        <div class="hero__text">
          <p class="hero__place">
            <Icon name="lucide:map-pin" aria-hidden="true" />
            {{ business.activity }} · {{ city }} et alentours
          </p>
          <h1 id="hero-title">Vos menuiseries aluminium, du relevé de cotes à la pose.</h1>
          <p class="lead">
            Fenêtres, baies coulissantes, portes d’entrée, volets, portails et pergolas,
            fabriqués sur mesure et posés par nos soins à {{ city }} et dans un rayon
            de {{ business.serviceArea.radiusKm }} km.
          </p>
          <div class="btn-row">
            <NuxtLink to="/contact" class="btn btn--primary">Demander un devis gratuit</NuxtLink>
            <a :href="telHref" class="btn btn--glass glass">
              <Icon name="lucide:phone" aria-hidden="true" />
              <span class="tabular">{{ business.phone.display }}</span>
            </a>
          </div>
          <ul role="list" class="hero__facts">
            <li class="glass"><Icon name="lucide:check" aria-hidden="true" />Devis gratuit</li>
            <li class="glass"><Icon name="lucide:check" aria-hidden="true" />Sur mesure</li>
            <li class="glass"><Icon name="lucide:check" aria-hidden="true" />Garantie décennale</li>
          </ul>
        </div>

        <figure class="hero__figure glass">
          <BayDrawing />
          <figcaption class="small muted">Baie coulissante deux vantaux, vue intérieure. Cotes en millimètres.</figcaption>
        </figure>
      </div>
    </section>

    <!-- Prestations -->
    <section class="section section--surface" aria-labelledby="services-title">
      <div class="container">
        <div class="section-head section-head--split">
          <h2 id="services-title">Ce que nous posons</h2>
          <p class="lead">Toute la menuiserie extérieure en aluminium, pour la construction neuve comme pour la rénovation.</p>
        </div>
        <ServiceGrid />
        <NuxtLink to="/prestations" class="link-arrow services-more">
          <span>Voir toutes nos prestations</span>
          <Icon name="lucide:arrow-right" aria-hidden="true" />
        </NuxtLink>
      </div>
    </section>

    <!-- Confiance : artisan local + engagements -->
    <section class="section" aria-labelledby="trust-title">
      <div class="container trust">
        <div class="trust__local">
          <h2 id="trust-title">Un artisan près de chez vous, du premier rendez-vous au dernier réglage.</h2>
          <p class="lead">
            Un seul interlocuteur suit votre projet : il prend les cotes, établit le devis,
            commande vos menuiseries et les pose lui-même.
          </p>
          <div class="zone">
            <h3 class="zone__title">
              <Icon name="lucide:map-pin" aria-hidden="true" />
              Zone d’intervention : {{ business.serviceArea.radiusKm }} km autour de {{ city }}
            </h3>
            <p class="zone__towns">{{ business.serviceArea.towns.join(' · ') }}</p>
            <p class="small muted">Votre commune n’est pas dans la liste ? Appelez-nous, nous verrons ensemble.</p>
          </div>
        </div>

        <ul role="list" class="commitments">
          <li v-for="c in business.commitments" :key="c.title" class="commitment">
            <span class="squircle squircle--sm tint-sauge" aria-hidden="true"><Icon name="lucide:check" /></span>
            <div>
              <h3 class="commitment__title">{{ c.title }}</h3>
              <p class="muted">{{ c.text }}</p>
            </div>
          </li>
          <li v-for="c in business.certifications" :key="c.name" class="commitment">
            <span class="squircle squircle--sm tint-ciel" aria-hidden="true"><Icon name="lucide:badge-check" /></span>
            <div>
              <h3 class="commitment__title">{{ c.name }}</h3>
              <p class="muted">{{ c.detail }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Déroulement -->
    <section class="section section--surface" aria-labelledby="process-title">
      <div class="container">
        <div class="section-head">
          <h2 id="process-title">Comment se déroule votre projet</h2>
          <p class="lead">Quatre étapes, et toujours le même interlocuteur.</p>
        </div>
        <ProcessSteps />
      </div>
    </section>

    <!-- Couleurs -->
    <section class="section" aria-labelledby="colors-title">
      <div class="container colors">
        <div class="colors__text">
          <h2 id="colors-title">Toutes les teintes RAL, et deux faces différentes si vous voulez.</h2>
          <p class="lead">
            L’aluminium est thermolaqué dans la teinte de votre choix : mate, satinée ou texturée.
            Une menuiserie peut même être blanche à l’intérieur et anthracite à l’extérieur.
          </p>
          <p class="small muted">
            Couleurs affichées à titre indicatif : l’écran les déforme. Nous apportons le nuancier lors de la visite.
          </p>
        </div>
        <RalSwatches />
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
/* Présentation : un ciel de fin de journée, qui passe sous l'en-tête de verre. */
.hero {
  position: relative;
  isolation: isolate;
  margin-top: calc(-1 * var(--header-h));
  padding-block: calc(var(--header-h) + clamp(28px, 6vw, 88px)) clamp(48px, 7vw, 104px);
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(110% 70% at 100% 0%, #b9d7f0 0%, rgb(185 215 240 / 0) 62%),
    radial-gradient(80% 60% at 0% 100%, #f6dcc8 0%, rgb(246 220 200 / 0) 65%),
    radial-gradient(60% 50% at 70% 85%, #dcefe9 0%, rgb(220 239 233 / 0) 70%),
    linear-gradient(180deg, #e8f1f9 0%, #f7f3ee 100%);
}
.hero__grid { display: grid; gap: 48px; align-items: center; }
.hero__text { display: grid; gap: 24px; justify-items: start; }

.hero__place {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--c-ink-2);
  font-size: var(--fs-small);
  font-weight: 500;
}
.hero__place svg { width: 18px; height: 18px; color: var(--c-accent); }

.hero__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  font-size: var(--fs-small);
  font-weight: 500;
}
.hero__facts li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  padding: 0 14px 0 10px;
  border-radius: 999px;
}
.hero__facts svg { width: 16px; height: 16px; color: var(--t-sauge-ink); }

.hero__figure {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: clamp(16px, 3vw, 32px);
  border-radius: var(--radius-xl);
}
.hero__figure figcaption { padding-inline: 4px; }

/* Prestations */
.services-more { margin-top: 24px; }

/* Confiance */
.trust { display: grid; gap: 48px; }
.trust__local { display: grid; gap: 20px; align-content: start; }
.zone {
  display: grid;
  gap: 8px;
  margin-top: 12px;
  padding-top: 24px;
  border-top: 1px solid var(--c-line);
}
.zone__title { display: flex; align-items: flex-start; gap: 8px; font-size: var(--fs-body); }
.zone__title svg { width: 18px; height: 18px; color: var(--c-accent); flex: none; margin-top: 4px; }
.zone__towns { line-height: 1.75; }

/* Liste groupée, comme dans les réglages de l'iPhone. */
.commitments {
  list-style: none;
  display: grid;
  align-content: start;
  padding-inline: 20px;
  background: var(--c-surface);
  border-radius: var(--radius-lg);
}
.commitment {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 16px;
  padding-block: 20px;
}
.commitment + .commitment { border-top: 1px solid rgb(0 0 0 / 0.07); }
.squircle--sm { width: 32px; height: 32px; border-radius: 9px; margin-top: 2px; }
.squircle--sm svg { width: 18px; height: 18px; }
.commitment__title { font-size: var(--fs-body); margin-bottom: 2px; }

/* Couleurs */
.colors { display: grid; gap: 40px; }
.colors__text { display: grid; gap: 20px; align-content: start; }

@media (min-width: 1024px) {
  .hero__grid { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 64px; }
  .section-head--split {
    max-width: none;
    grid-template-columns: 1fr 1fr;
    align-items: end;
    gap: 64px;
  }
  .trust { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 80px; }
  .colors { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 80px; align-items: start; }
}
</style>
