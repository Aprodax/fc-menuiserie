<script setup lang="ts">
defineProps<{
  title: string
  lead?: string
  crumbs?: { label: string, to: string }[]
}>()
</script>

<template>
  <header class="page-intro">
    <div class="container">
      <AppBreadcrumbs v-if="crumbs" :items="crumbs" />
      <div class="page-intro__body">
        <h1>{{ title }}</h1>
        <p v-if="lead" class="lead">{{ lead }}</p>
        <slot />
      </div>
    </div>
  </header>
</template>

<style scoped>
.page-intro { padding-block: 16px clamp(40px, 6vw, 80px); }
.page-intro__body { display: grid; gap: 20px; margin-top: clamp(16px, 3vw, 40px); max-width: 52rem; }
</style>
