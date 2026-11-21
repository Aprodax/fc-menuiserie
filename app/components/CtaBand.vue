<script setup lang="ts">
import { business, telHref } from '#shared/business'

withDefaults(defineProps<{ title?: string, text?: string, project?: string }>(), {
  title: 'Un projet de fenêtres, de baie ou de portail ?',
  text: 'Nous passons prendre les cotes et vous remettons un devis détaillé, gratuitement et sans engagement.',
})
</script>

<template>
  <section class="section section--dark cta" aria-labelledby="cta-title">
    <div class="container cta__inner">
      <div class="cta__text">
        <h2 id="cta-title">{{ title }}</h2>
        <p class="lead">{{ text }}</p>
      </div>
      <div class="btn-row cta__actions">
        <NuxtLink :to="project ? { path: '/contact', query: { projet: project } } : '/contact'" class="btn btn--light">
          Demander un devis gratuit
        </NuxtLink>
        <a :href="telHref" class="btn btn--outline-light">
          <Icon name="lucide:phone" aria-hidden="true" />
          <span class="tabular">{{ business.phone.display }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta__inner { display: grid; gap: 32px; }
.cta__text { display: grid; gap: 16px; max-width: 44rem; }

@media (min-width: 1024px) {
  .cta__inner { grid-template-columns: 1fr auto; align-items: end; gap: 64px; }
  .cta__actions { flex-direction: column; }
}
</style>
