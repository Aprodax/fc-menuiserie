<script setup lang="ts">
import type { PictoName } from '#shared/services'

/**
 * Pictogrammes au trait, dessinés comme des élévations de menuiserie
 * (vue de face, ligne de sol, sens d'ouverture en pointillés).
 * Le trait garde la même épaisseur quelle que soit la taille affichée.
 */
defineProps<{ name: PictoName }>()
</script>

<template>
  <svg class="picto" viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
    <g v-if="name === 'window'">
      <rect x="12" y="8" width="40" height="46" />
      <rect x="15" y="11" width="16.5" height="40" />
      <rect x="32.5" y="11" width="16.5" height="40" />
      <path class="hint" d="M31.5 11 15 31l16.5 20M32.5 11 49 31 32.5 51" />
      <path d="M29.5 29v5M34.5 29v5" />
      <path d="M8 56h48" />
    </g>

    <g v-else-if="name === 'slider'">
      <rect x="5" y="14" width="54" height="40" />
      <rect x="31" y="17" width="25" height="37" />
      <rect class="front" x="8" y="17" width="25" height="37" />
      <path d="M14 36h11m-3-3 3 3-3 3M50 36H39m3-3-3 3 3 3" />
      <path d="M2 54h60" />
    </g>

    <g v-else-if="name === 'door'">
      <rect x="18" y="5" width="28" height="51" />
      <rect x="21" y="8" width="22" height="48" />
      <rect x="25" y="13" width="4" height="34" />
      <path d="M38 24v16" />
      <path d="M10 56h44" />
    </g>

    <g v-else-if="name === 'shutter'">
      <rect x="11" y="7" width="42" height="8" />
      <rect x="12" y="15" width="40" height="40" />
      <path d="M15 19h34M15 23h34M15 27h34M15 31h34M15 35h34" />
      <path d="M15 39h34M32 39v16" />
      <path d="M8 55h48" />
    </g>

    <g v-else-if="name === 'gate'">
      <rect x="5" y="20" width="6" height="36" />
      <rect x="53" y="20" width="6" height="36" />
      <rect x="13" y="26" width="18.5" height="27" />
      <rect x="32.5" y="26" width="18.5" height="27" />
      <path d="M13 32.5h18.5M13 39h18.5M13 45.5h18.5M32.5 32.5H51M32.5 39H51M32.5 45.5H51" />
      <path d="M2 56h60" />
    </g>

    <g v-else-if="name === 'pergola'">
      <rect x="6" y="18" width="52" height="6" />
      <rect x="10" y="24" width="3.5" height="32" />
      <rect x="50.5" y="24" width="3.5" height="32" />
      <path d="M9 18l4-6M15 18l4-6M21 18l4-6M27 18l4-6M33 18l4-6M39 18l4-6M45 18l4-6M51 18l4-6" />
      <path d="M2 56h60" />
    </g>
  </svg>
</template>

<style scoped>
.picto {
  width: 48px;
  height: 48px;
  flex: none;
  color: var(--c-anthracite);
  stroke: currentColor;
  stroke-width: var(--picto-stroke, 1.5px);
  stroke-linejoin: round;
  stroke-linecap: round;
}
.picto :deep(*) { vector-effect: non-scaling-stroke; }
.picto .hint {
  stroke: var(--c-ink-2);
  stroke-dasharray: 3 3;
  stroke-width: calc(var(--picto-stroke, 1.5px) * 0.75);
}
.picto .front { fill: var(--picto-fill, #fff); }
</style>
