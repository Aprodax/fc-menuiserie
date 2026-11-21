<script setup lang="ts">
import { services } from '#shared/services'

withDefaults(defineProps<{ headingLevel?: 'h2' | 'h3' }>(), { headingLevel: 'h3' })
</script>

<!--
  Mobile : liste groupée façon Réglages (pastille de couleur + titre + chevron).
  Grand écran : tuiles colorées, une teinte par prestation.
-->
<template>
  <ul role="list" class="service-grid">
    <li v-for="s in services" :key="s.slug" :class="`tint-${s.tint}`">
      <NuxtLink :to="`/prestations/${s.slug}`" class="service-cell">
        <span class="service-cell__icon" aria-hidden="true">
          <ServicePicto :name="s.picto" />
        </span>
        <div class="service-cell__body">
          <component :is="headingLevel" class="service-cell__title">{{ s.title }}</component>
          <p class="service-cell__text">{{ s.excerpt }}</p>
        </div>
        <span class="service-cell__arrow" aria-hidden="true">
          <Icon name="lucide:chevron-right" />
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
/* ---------- Mobile : liste groupée ---------- */
.service-grid {
  list-style: none;
  padding-left: 16px;
  border-radius: var(--radius-lg);
  background: var(--c-bg);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.04);
}

.service-cell {
  position: relative;
  display: grid;
  grid-template-columns: 44px 1fr 20px;
  align-items: center;
  gap: 14px;
  min-height: 76px;
  padding: 14px 14px 14px 0;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color var(--t-fast);
}
/* Séparateur décalé jusqu'au texte, comme sur iOS */
li + li .service-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 58px;
  right: 0;
  height: 1px;
  background: rgb(0 0 0 / 0.08);
}
.service-cell:active { background: rgb(0 0 0 / 0.03); }

.service-cell__icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--tint-ink);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.22), 0 1px 2px rgb(0 0 0 / 0.12);
}
.service-cell__icon :deep(.picto) {
  --picto-stroke: 1.6px;
  --picto-fill: var(--tint-ink);
  --picto-hint: rgb(255 255 255 / 0.65);
  width: 32px;
  height: 32px;
  color: #fff;
}

.service-cell__body { display: grid; gap: 2px; }
.service-cell__title { font-size: 1.0625rem; line-height: 1.3; letter-spacing: -0.01em; }
.service-cell__text { color: var(--c-ink-2); font-size: var(--fs-small); line-height: 1.45; }

.service-cell__arrow { display: grid; place-items: center; color: #a1a5a9; }
.service-cell__arrow svg { width: 20px; height: 20px; }

/* ---------- Grand écran : tuiles colorées ---------- */
@media (min-width: 640px) {
  .service-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 0;
    background: none;
    box-shadow: none;
  }

  .service-cell {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    align-items: start;
    gap: 32px 16px;
    height: 100%;
    min-height: 250px;
    padding: 28px;
    border-radius: var(--radius-xl);
    background: var(--tint);
    transition: transform 320ms var(--ease-spring), box-shadow var(--t-base) var(--ease-out);
  }
  li + li .service-cell::before { display: none; }
  .service-cell:hover {
    transform: translateY(-3px);
    box-shadow: 0 22px 40px -22px color-mix(in srgb, var(--tint-ink) 55%, transparent);
  }
  .service-cell:active { background: var(--tint); transform: scale(0.985); }

  .service-cell__icon {
    width: 64px;
    height: 64px;
    border-radius: 18px;
    background: rgb(255 255 255 / 0.72);
    box-shadow: inset 0 1px 0 #fff, 0 6px 16px -8px color-mix(in srgb, var(--tint-ink) 45%, transparent);
  }
  .service-cell__icon :deep(.picto) {
    --picto-fill: #fbfcfd;
    --picto-hint: color-mix(in srgb, var(--tint-ink) 55%, transparent);
    width: 44px;
    height: 44px;
    color: var(--tint-ink);
  }

  .service-cell__body { grid-column: 1 / -1; grid-row: 2; align-self: end; gap: 8px; }
  .service-cell__title { font-size: var(--fs-h3); }
  .service-cell__text { font-size: var(--fs-body); }

  /* Petit bouton rond translucide, posé sur la couleur */
  .service-cell__arrow {
    grid-column: 2;
    grid-row: 1;
    width: 40px;
    height: 40px;
    border-radius: 999px;
    background: rgb(255 255 255 / 0.6);
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.9), 0 0 0 0.5px rgb(0 0 0 / 0.06);
    color: var(--tint-ink);
    transition: transform var(--t-base) var(--ease-out);
  }
  .service-cell:hover .service-cell__arrow { transform: translateX(3px); }
}

@media (min-width: 1024px) {
  .service-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .service-cell { min-height: 280px; padding: 32px; }
}
</style>
