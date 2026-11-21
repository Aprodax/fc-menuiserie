<script setup lang="ts">
// Menu mobile ouvert : le reste de la page devient inerte (ni focus, ni lecteur d'écran).
const menuOpen = useMenuOpen()
// Sur la page Contact, le formulaire est déjà là : pas de barre d'action.
const route = useRoute()
const showActionBar = computed(() => route.path !== '/contact')
</script>

<template>
  <a href="#contenu" class="skip-link">Aller au contenu</a>
  <SiteHeader />
  <main id="contenu" tabindex="-1" :inert="menuOpen || undefined">
    <slot />
  </main>
  <SiteFooter :class="{ 'site-footer--action-bar': showActionBar }" :inert="menuOpen || undefined" />
  <MobileActionBar v-if="showActionBar" v-show="!menuOpen" />
</template>
