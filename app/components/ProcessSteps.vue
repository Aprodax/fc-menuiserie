<script setup lang="ts">
const tints = ['tint-ciel', 'tint-lagon', 'tint-ocre', 'tint-terre']
const steps = [
  { title: 'Visite et prise de cotes', text: 'Nous venons chez vous pour comprendre le projet, vous conseiller et mesurer chaque ouverture.' },
  { title: 'Devis détaillé', text: 'Un devis clair, poste par poste : modèles, vitrages, teintes et délais. Sans engagement.' },
  { title: 'Fabrication sur mesure', text: 'Vos menuiseries sont fabriquées à vos dimensions. Nous fixons ensemble la date de pose.' },
  { title: 'Pose et réglages', text: 'Pose soignée, finitions, réglages et chantier nettoyé. Nous restons joignables ensuite.' },
]
</script>

<template>
  <ol class="steps" role="list">
    <li v-for="(step, i) in steps" :key="step.title" class="step" :class="tints[i]">
      <span class="step__num tabular" aria-hidden="true">{{ i + 1 }}</span>
      <h3 class="step__title"><span class="visually-hidden">Étape {{ i + 1 }} : </span>{{ step.title }}</h3>
      <p class="step__text">{{ step.text }}</p>
    </li>
  </ol>
</template>

<style scoped>
.steps { list-style: none; display: grid; gap: 0; }

.step {
  display: grid;
  grid-template-columns: 48px 1fr;
  column-gap: 16px;
  row-gap: 6px;
  padding-block: 24px;
  border-top: 1px solid var(--c-line);
}
.step__num {
  grid-row: span 2;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--tint);
  color: var(--tint-ink);
  font-weight: 700;
  font-size: var(--fs-small);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--tint-ink) 18%, transparent);
}
.step__text { color: var(--c-ink-2); }

@media (min-width: 768px) {
  .steps { grid-template-columns: repeat(2, 1fr); column-gap: 32px; }
}

@media (min-width: 1024px) {
  .steps { grid-template-columns: repeat(4, 1fr); }
  .step {
    grid-template-columns: 1fr;
    row-gap: 12px;
    padding-top: 28px;
    border-top: 0;
    position: relative;
  }
  /* Une ligne continue relie les étapes, comme un fil de chantier. */
  .step::before {
    content: '';
    position: absolute;
    top: 48px;
    left: 52px;
    right: -32px;
    height: 1px;
    background: var(--c-line);
  }
  .step:last-child::before { display: none; }
  .step__num { grid-row: auto; margin-bottom: 8px; }
}
</style>
