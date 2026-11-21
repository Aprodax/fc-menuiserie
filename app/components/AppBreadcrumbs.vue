<script setup lang="ts">
/** Fil d'Ariane visible + sa version schema.org, que Google affiche dans les résultats. */
const props = defineProps<{ items: { label: string, to: string }[] }>()

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: props.items.map(i => ({ name: i.label, item: i.to })),
  }),
])
</script>

<template>
  <nav aria-label="Fil d’Ariane" class="crumbs">
    <ol role="list">
      <li v-for="(item, i) in items" :key="item.to">
        <NuxtLink v-if="i < items.length - 1" :to="item.to">{{ item.label }}</NuxtLink>
        <span v-else aria-current="page">{{ item.label }}</span>
        <Icon v-if="i < items.length - 1" name="lucide:chevron-right" aria-hidden="true" />
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.crumbs ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  font-size: var(--fs-small);
  color: var(--c-ink-2);
}
.crumbs li { display: inline-flex; align-items: center; gap: 4px; }
.crumbs a { display: inline-flex; align-items: center; min-height: 44px; padding-right: 2px; text-decoration: none; }
.crumbs a:hover { text-decoration: underline; color: var(--c-ink); }
.crumbs svg { width: 16px; height: 16px; margin-right: 4px; }
.crumbs [aria-current] { color: var(--c-ink); }

/* Sur mobile, le titre de la page suffit : le fil devient un simple lien vers la page parente. */
@media (max-width: 639px) {
  .crumbs li:last-child {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  .crumbs li:nth-last-child(2) svg { display: none; }
}
</style>
