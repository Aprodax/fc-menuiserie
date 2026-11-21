<script setup lang="ts">
import { services } from '#shared/services'

withDefaults(defineProps<{ headingLevel?: 'h2' | 'h3' }>(), { headingLevel: 'h3' })
</script>

<template>
  <ul role="list" class="service-grid">
    <li v-for="s in services" :key="s.slug">
      <NuxtLink :to="`/prestations/${s.slug}`" class="service-cell">
        <ServicePicto :name="s.picto" class="service-cell__picto" />
        <div class="service-cell__body">
          <component :is="headingLevel" class="service-cell__title">{{ s.title }}</component>
          <p class="service-cell__text">{{ s.excerpt }}</p>
        </div>
        <Icon name="lucide:arrow-right" class="service-cell__arrow" aria-hidden="true" />
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
/* Grille à filets : les traits de 1 px viennent du fond visible entre les cellules. */
.service-grid {
  list-style: none;
  display: grid;
  gap: 1px;
  background: var(--c-line);
  border-block: 1px solid var(--c-line);
}

.service-cell {
  --picto-fill: var(--c-bg);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  height: 100%;
  padding: 20px 4px;
  background: var(--c-bg);
  text-decoration: none;
  transition: background-color var(--t-base) var(--ease-out);
}
.service-cell:hover { --picto-fill: var(--c-surface); background: var(--c-surface); }

.service-cell__picto { width: 44px; height: 44px; }
.service-cell__body { display: grid; gap: 4px; }
.service-cell__title { font-size: var(--fs-h3); }
.service-cell__text { color: var(--c-ink-2); font-size: var(--fs-small); line-height: 1.5; }

.service-cell__arrow {
  width: 20px;
  height: 20px;
  color: var(--c-ink-2);
  transition: transform var(--t-base) var(--ease-out), color var(--t-base);
}
.service-cell:hover .service-cell__arrow { transform: translateX(4px); color: var(--c-ink); }

@media (min-width: 640px) {
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
    border-inline: 1px solid var(--c-line);
  }
  .service-cell {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    align-items: start;
    gap: 28px 16px;
    padding: 28px;
  }
  .service-cell__picto { width: 56px; height: 56px; }
  .service-cell__body { grid-column: 1 / -1; grid-row: 2; align-self: end; gap: 8px; }
  .service-cell__text { font-size: var(--fs-body); }
  .service-cell__arrow { grid-column: 2; grid-row: 1; }
}

@media (min-width: 1024px) {
  .service-grid { grid-template-columns: repeat(3, 1fr); }
  .service-cell { padding: 36px; min-height: 260px; }
}
</style>
