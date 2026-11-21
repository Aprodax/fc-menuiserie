<script setup lang="ts">
import { services } from '#shared/services'
</script>

<!--
  Liste simple : pictogramme, menuiserie concernée, symptômes en une ligne.
  Le client doit reconnaître sa panne d'un coup d'œil ; le détail est sur chaque page.
-->
<template>
  <ul role="list" class="service-grid">
    <li v-for="s in services" :key="s.slug">
      <NuxtLink :to="`/reparations/${s.slug}`" class="service-cell">
        <ServicePicto :name="s.picto" class="service-cell__picto" />
        <div class="service-cell__body">
          <h3 class="service-cell__title">{{ s.title }}</h3>
          <p class="service-cell__text">{{ s.excerpt }}</p>
        </div>
        <Icon name="lucide:chevron-right" class="service-cell__arrow" aria-hidden="true" />
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.service-grid { list-style: none; display: grid; border-top: 1px solid var(--c-line); }
.service-grid li { border-bottom: 1px solid var(--c-line); }

.service-cell {
  display: grid;
  grid-template-columns: 40px 1fr 20px;
  align-items: center;
  gap: 16px;
  min-height: 76px;
  padding-block: 14px;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}
.service-cell__picto { width: 40px; height: 40px; }
.service-cell__body { display: grid; gap: 2px; }
.service-cell__title { font-size: 1.125rem; line-height: 1.3; letter-spacing: -0.01em; }
.service-cell__text { color: var(--c-ink-2); font-size: var(--fs-small); line-height: 1.45; }
.service-cell__arrow { width: 20px; height: 20px; color: var(--c-ink-2); transition: transform var(--t-base) var(--ease-out); }
.service-cell:hover .service-cell__title { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 0.2em; }
.service-cell:hover .service-cell__arrow { transform: translateX(3px); color: var(--c-ink); }

@media (min-width: 768px) {
  .service-grid { grid-template-columns: repeat(2, 1fr); column-gap: 48px; }
  .service-cell { min-height: 92px; }
}
@media (min-width: 1024px) {
  .service-grid { grid-template-columns: repeat(3, 1fr); }
  .service-cell { grid-template-columns: 48px 1fr 20px; }
  .service-cell__picto { width: 48px; height: 48px; }
}
</style>
