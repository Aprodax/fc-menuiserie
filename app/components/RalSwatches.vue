<script setup lang="ts">
// Teintes les plus demandées en menuiserie aluminium. Valeurs écran indicatives.
const colors = [
  { ral: '9016', name: 'Blanc signalisation', hex: '#f1f1ec' },
  { ral: '7016', name: 'Gris anthracite', hex: '#383e42' },
  { ral: '9005', name: 'Noir foncé', hex: '#0e0e10' },
  { ral: '7035', name: 'Gris clair', hex: '#cbd0cc' },
  { ral: '7022', name: 'Gris terre d’ombre', hex: '#4b4d46' },
  { ral: '1015', name: 'Ivoire clair', hex: '#e6d2b5' },
  { ral: '6005', name: 'Vert mousse', hex: '#114232' },
  { ral: '5003', name: 'Bleu saphir', hex: '#1d334a' },
]
</script>

<template>
  <ul role="list" class="swatches">
    <li v-for="c in colors" :key="c.ral" class="swatch">
      <span class="swatch__chip" :style="{ backgroundColor: c.hex }" aria-hidden="true" />
      <span class="swatch__ral tabular">RAL {{ c.ral }}</span>
      <span class="swatch__name">{{ c.name }}</span>
    </li>
  </ul>
</template>

<style scoped>
.swatches {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 16px;
}
.swatch { display: grid; gap: 2px; }
.swatch__chip {
  display: block;
  aspect-ratio: 2 / 1;
  margin-bottom: 10px;
  border-radius: var(--radius-sm);
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.1);
}
.swatch__ral { font-weight: 600; }
.swatch__name { color: var(--c-ink-2); font-size: var(--fs-small); line-height: 1.4; }

@media (min-width: 640px) {
  .swatches { grid-template-columns: repeat(4, 1fr); }
  .swatch__chip { aspect-ratio: 4 / 3; }
}
</style>
