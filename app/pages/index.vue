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
            <a :href="telHref" class="btn btn--secondary">
              <Icon name="lucide:phone" aria-hidden="true" />
              <span class="tabular">{{ business.phone.display }}</span>
            </a>
          </div>
          <ul role="list" class="hero__facts">
            <li><Icon name="lucide:check" aria-hidden="true" />Devis gratuit</li>
            <li><Icon name="lucide:check" aria-hidden="true" />Fabrication sur mesure</li>
            <li><Icon name="lucide:check" aria-hidden="true" />Garantie décennale</li>
          </ul>
        </div>

        <figure class="hero__figure paper">
          <BayDrawing />
          <figcaption class="small muted">Baie coulissante deux vantaux, vue intérieure. Cotes en millimètres.</figcaption>
        </figure>
      </div>
    </section>

    <!-- Prestations -->
    <section class="section" aria-labelledby="services-title">
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
    <section class="section section--surface" aria-labelledby="trust-title">
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
            <Icon name="lucide:check" class="commitment__icon" aria-hidden="true" />
            <div>
              <h3 class="commitment__title">{{ c.title }}</h3>
              <p class="muted">{{ c.text }}</p>
            </div>
          </li>
          <li v-for="c in business.certifications" :key="c.name" class="commitment">
            <Icon name="lucide:badge-check" class="commitment__icon" aria-hidden="true" />
            <div>
              <h3 class="commitment__title">{{ c.name }}</h3>
              <p class="muted">{{ c.detail }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Déroulement -->
    <section class="section" aria-labelledby="process-title">
      <div class="container">
        <div class="section-head">
          <h2 id="process-title">Comment se déroule votre projet</h2>
          <p class="lead">Quatre étapes, et toujours le même interlocuteur.</p>
        </div>
        <ProcessSteps />
      </div>
    </section>

    <!-- Couleurs -->
    <section class="section section--surface" aria-labelledby="colors-title">
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
/* Présentation */
.hero { padding-block: clamp(32px, 6vw, 96px) clamp(16px, 3vw, 32px); }
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
  gap: 8px 20px;
  list-style: none;
  color: var(--c-ink-2);
  font-size: var(--fs-small);
}
.hero__facts li { display: inline-flex; align-items: center; gap: 6px; }
.hero__facts svg { width: 18px; height: 18px; color: var(--c-ink); }

.hero__figure {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: clamp(16px, 3vw, 36px);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-lg);
}

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

.commitments {
  list-style: none;
  display: grid;
  align-content: start;
  background: var(--c-bg);
  border: 1px solid var(--c-line);
  border-radius: var(--radius);
}
.commitment {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 16px;
  padding: 24px;
}
.commitment + .commitment { border-top: 1px solid var(--c-line); }
.commitment__icon { width: 24px; height: 24px; color: var(--c-accent); margin-top: 2px; }
.commitment__title { font-size: var(--fs-body); margin-bottom: 4px; }

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
