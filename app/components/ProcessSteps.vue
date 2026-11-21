<script setup lang="ts">
const steps = [
  { title: 'Vous nous appelez', text: 'Décrivez la panne. Une photo envoyée par SMS nous aide souvent à prévoir la bonne pièce.' },
  { title: 'Diagnostic sur place', text: 'Nous trouvons la pièce ou le réglage en cause.' },
  { title: 'Prix annoncé', text: 'Vous connaissez le coût de la réparation avant que nous commencions.' },
  { title: 'Réparation', text: 'Sur place, ou dès réception de la pièce si elle doit être commandée.' },
]
</script>

<template>
  <ol class="steps" role="list">
    <li v-for="(step, i) in steps" :key="step.title" class="step">
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
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: var(--c-surface);
  color: var(--c-ink);
  font-weight: 600;
  font-size: var(--fs-small);
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
    top: 46px;
    left: 48px;
    right: -32px;
    height: 1px;
    background: var(--c-line);
  }
  .step:last-child::before { display: none; }
  .step__num { grid-row: auto; margin-bottom: 8px; }
}
</style>
