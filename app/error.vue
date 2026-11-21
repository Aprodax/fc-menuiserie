<script setup lang="ts">
import type { NuxtError } from '#app'
import { business, telHref } from '#shared/business'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

// Quitter la page d'erreur impose d'effacer l'erreur ; le href reste pour la sémantique du lien.
const go = (path: string) => clearError({ redirect: path })

useSeoMeta({ title: () => (notFound.value ? 'Page introuvable' : 'Erreur'), robots: 'noindex' })
</script>

<template>
  <NuxtLayout>
    <section class="container error-page">
      <p class="error-page__code tabular">{{ error.statusCode }}</p>
      <h1>{{ notFound ? 'Cette page n’existe pas (ou plus)' : 'Une erreur est survenue' }}</h1>
      <p class="lead">
        {{ notFound
          ? 'Le lien est peut-être ancien ou mal recopié. Voici où trouver ce que vous cherchez :'
          : 'Réessayez dans un instant. Si le problème continue, appelez-nous directement.' }}
      </p>
      <div class="btn-row">
        <a href="/" class="btn btn--primary" @click.prevent="go('/')">Retour à l’accueil</a>
        <a href="/prestations" class="btn btn--secondary" @click.prevent="go('/prestations')">Nos prestations</a>
        <a :href="telHref" class="btn btn--secondary">
          <Icon name="lucide:phone" aria-hidden="true" />
          <span class="tabular">{{ business.phone.display }}</span>
        </a>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.error-page { display: grid; gap: 20px; justify-items: start; padding-block: clamp(64px, 12vw, 160px); }
.error-page__code { font-weight: 600; color: var(--c-accent); }
</style>
