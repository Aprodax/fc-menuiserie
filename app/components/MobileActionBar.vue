<script setup lang="ts">
import { business, telHref } from '#shared/business'

// Depuis une page réparation, la demande arrive avec la menuiserie déjà choisie.
const route = useRoute()
const requestTo = computed(() =>
  route.path.startsWith('/reparations/') && typeof route.params.slug === 'string'
    ? { path: '/contact', query: { projet: route.params.slug } }
    : '/contact',
)
</script>

<!--
  Barre de verre flottante en bas d'écran (mobile) : appeler (l'action principale pour
  un dépannage) et écrire, sous le pouce. Masquée sur grand écran, où l'en-tête les affiche.
-->
<template>
  <div class="action-bar">
    <div class="action-bar__inner glass">
      <a :href="telHref" class="btn btn--primary">
        <Icon name="lucide:phone" aria-hidden="true" />
        Appeler
        <span class="visually-hidden">le {{ business.phone.display }}</span>
      </a>
      <NuxtLink :to="requestTo" class="btn btn--glass action-bar__write">Nous écrire</NuxtLink>
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
  grid-template-columns: 1.25fr 1fr;
  gap: 6px;
  width: min(100%, 440px);
  padding: 6px;
  border-radius: 999px;
}
.action-bar__inner .btn { min-height: 50px; padding-inline: 16px; }
.action-bar__write { background: rgb(255 255 255 / 0.55); }

@media (min-width: 960px) {
  .action-bar { display: none; }
}
</style>
