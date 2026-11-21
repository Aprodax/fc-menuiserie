<script setup lang="ts">
// Menu mobile ouvert : le reste de la page devient inerte (ni focus, ni lecteur d'écran).
const menuOpen = useMenuOpen()
</script>

<template>
  <a href="#contenu" class="skip-link">Aller au contenu</a>
  <SiteHeader />
  <main id="contenu" tabindex="-1" :inert="menuOpen || undefined">
    <slot />
  </main>
  <SiteFooter :inert="menuOpen || undefined" />
</template>
