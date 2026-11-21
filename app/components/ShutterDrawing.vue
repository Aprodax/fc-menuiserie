<!--
  Élévation d'une fenêtre équipée d'un volet roulant à mi-course, dans l'esprit
  d'une fiche technique : les pièces qu'on dépanne le plus souvent sont annotées.
-->
<script setup lang="ts">
// Identifiants uniques : le dessin peut apparaître plusieurs fois sans collision d'id.
const uid = useId()
const titleId = `${uid}-title`
const skyId = `${uid}-sky`

const slats = Array.from({ length: 10 }, (_, i) => 124 + i * 13)
</script>

<template>
  <svg class="shutter" viewBox="0 0 640 480" role="img" :aria-labelledby="titleId">
    <title :id="titleId">Dessin d’un volet roulant à mi-hauteur, avec le coffre et le moteur, les lames, les coulisses et la lame finale</title>
    <defs>
      <!-- Le ciel qui se reflète dans le vitrage -->
      <linearGradient :id="skyId" x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0" stop-color="#9cc6e8" />
        <stop offset="0.6" stop-color="#cfe3f3" />
        <stop offset="1" stop-color="#f3ece2" />
      </linearGradient>
    </defs>

    <!-- Fenêtre derrière le volet -->
    <path class="profile" fill-rule="evenodd" d="M172 110h296v300H172zM182 120v280h276V120z" />
    <rect class="pane" :fill="`url(#${skyId})`" x="190" y="128" width="122" height="264" />
    <rect class="pane" :fill="`url(#${skyId})`" x="328" y="128" width="122" height="264" />
    <path class="profile-line" d="M320 120v280" />
    <path class="reflect" d="M250 330l44-44M268 340l30-30M388 330l44-44M406 340l30-30" />

    <!-- Tablier du volet, descendu à mi-hauteur -->
    <rect class="apron" x="172" y="110" width="296" height="140" />
    <path v-for="y in slats" :key="y" class="slat" :d="`M172 ${y}h296`" />
    <rect class="profile" x="172" y="246" width="296" height="12" rx="2" />

    <!-- Coulisses -->
    <rect class="profile" x="158" y="104" width="14" height="306" />
    <rect class="profile" x="468" y="104" width="14" height="306" />

    <!-- Coffre, avec l'axe d'enroulement et le moteur -->
    <rect class="profile" x="146" y="52" width="348" height="58" rx="4" />
    <circle class="axis" cx="320" cy="81" r="18" />
    <path class="axis" d="M220 81h200" />

    <!-- Appui de fenêtre -->
    <rect class="sill" x="138" y="410" width="364" height="12" rx="2" />

    <!-- Annotations -->
    <g class="callout">
      <circle cx="338" cy="81" r="4" />
      <path d="M338 81L520 30" />
      <text x="528" y="37">Moteur</text>

      <circle cx="440" cy="180" r="4" />
      <path d="M440 180h88" />
      <text x="536" y="187">Lames</text>

      <circle cx="475" cy="340" r="4" />
      <path d="M475 340h53" />
      <text x="536" y="347">Coulisse</text>

      <circle cx="200" cy="252" r="4" />
      <path d="M200 252L130 300" />
      <text x="122" y="320" text-anchor="end">Lame</text>
      <text x="122" y="346" text-anchor="end">finale</text>
    </g>
  </svg>
</template>

<style scoped>
.shutter { width: 100%; height: auto; }
.profile { fill: var(--c-anthracite); }
.profile-line { stroke: var(--c-anthracite); stroke-width: 10; }
.reflect { stroke: #fff; stroke-width: 4; stroke-linecap: round; opacity: 0.75; }
.apron { fill: #dfe3e6; }
.slat { stroke: #b9bfc4; stroke-width: 1.5; }
.axis { fill: none; stroke: #9aa0a5; stroke-width: 2; stroke-dasharray: 6 5; }
.sill { fill: #c9ced2; }
.callout circle { fill: var(--c-accent); }
.callout path { fill: none; stroke: var(--c-accent); stroke-width: 1.5; }
.callout text {
  fill: var(--c-accent);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.01em;
}
</style>
