<script setup lang="ts">
import { business, telHref } from '#shared/business'

// Depuis une page prestation, le devis arrive avec le projet déjà choisi.
const route = useRoute()
const devisTo = computed(() =>
  route.path.startsWith('/prestations/') && typeof route.params.slug === 'string'
    ? { path: '/contact', query: { projet: route.params.slug } }
    : '/contact',
)
</script>

<!--
  Barre de verre flottante en bas d'écran (mobile) : les deux actions qui comptent,
  sous le pouce. Masquée sur grand écran, où l'en-tête affiche déjà téléphone et devis.
-->
<template>
  <div class="action-bar">
    <div class="action-bar__inner glass">
      <a :href="telHref" class="btn btn--glass action-bar__call">
        <Icon name="lucide:phone" aria-hidden="true" />
        Appeler
        <span class="visually-hidden">le {{ business.phone.display }}</span>
      </a>
      <NuxtLink :to="devisTo" class="btn btn--primary">Devis gratuit</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.action-bar {
  position: fixed;
  left: max(12px, env(safe-area-inset-left));
  right: max(12px, env(safe-area-inset-right));
  bottom: max(12px, env(safe-area-inset-bottom));
  z-index: 30;
  display: flex;
  justify-content: center;
}

.action-bar__inner {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 6px;
  width: min(100%, 440px);
  padding: 6px;
  border-radius: 999px;
}
.action-bar__inner .btn { min-height: 50px; padding-inline: 16px; }
.action-bar__call { background: rgb(255 255 255 / 0.55); }

@media (min-width: 960px) {
  .action-bar { display: none; }
}
</style>
