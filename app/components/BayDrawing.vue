<!--
  Élévation d'une baie coulissante deux vantaux, dans l'esprit d'un plan de devis :
  profilés RAL 7016, vitrage, sens de coulissement et cotes en millimètres.
-->
<script setup lang="ts">
const hatch = Array.from({ length: 38 }, (_, i) => 20 + i * 16)
</script>

<template>
  <svg class="bay" viewBox="0 0 640 480" role="img" aria-labelledby="bay-title">
    <title id="bay-title">Dessin d’une baie coulissante aluminium à deux vantaux, 2 400 mm de large sur 2 150 mm de haut</title>
    <defs>
      <!-- Le ciel qui se reflète dans le vitrage -->
      <linearGradient id="bay-sky" x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0" stop-color="#9cc6e8" />
        <stop offset="0.55" stop-color="#cfe3f3" />
        <stop offset="1" stop-color="#f3ece2" />
      </linearGradient>
    </defs>

    <!-- Sol fini -->
    <g class="ground">
      <path v-for="x in hatch" :key="x" :d="`M${x} 424l12-12`" />
    </g>
    <path class="ground-line" d="M20 410h600" />

    <!-- Dormant -->
    <path class="profile" fill-rule="evenodd" d="M100 70h440v340H100zM112 82v322h416V82z" />

    <!-- Vantail arrière (droite) -->
    <path class="profile profile--back" fill-rule="evenodd" d="M318 86h206v316H318zM334 102v284h174V102z" />
    <rect class="pane" x="334" y="102" width="174" height="284" />
    <path class="reflect" d="M440 172l60-60M458 182l48-48" />

    <!-- Vantail avant (gauche) -->
    <path class="profile" fill-rule="evenodd" d="M116 86h214v316H116zM132 102v284h182V102z" />
    <rect class="pane" x="132" y="102" width="182" height="284" />
    <path class="reflect" d="M236 172l60-60M254 182l52-52" />
    <rect class="handle" x="319" y="220" width="6" height="52" rx="3" />

    <!-- Sens de coulissement -->
    <path class="arrow" d="M186 300h70m-10-10 10 10-10 10M456 300h-70m10-10-10 10 10 10" />

    <!-- Cotes -->
    <g class="dim">
      <path d="M100 426v38M540 426v38M100 456h440" />
      <path class="tick" d="M93 463l14-14M533 463l14-14" />
      <text x="320" y="446" text-anchor="middle">2 400</text>

      <path d="M548 70h44M548 410h44M584 70v340" />
      <path class="tick" d="M577 77l14-14M577 417l14-14" />
      <text x="572" y="240" text-anchor="middle" transform="rotate(-90 572 240)">2 150</text>
    </g>
  </svg>
</template>

<style scoped>
.bay { width: 100%; height: auto; }
.ground path { stroke: var(--c-line-strong); stroke-width: 1; opacity: 0.6; }
.ground-line { stroke: var(--c-ink); stroke-width: 1.5; }
.profile { fill: var(--c-anthracite); }
.profile--back { fill: #4b5257; }
.pane { fill: url(#bay-sky); }
.reflect { stroke: #fff; stroke-width: 4; stroke-linecap: round; opacity: 0.75; }
.handle { fill: #9aa0a5; }
.arrow { fill: none; stroke: var(--c-ink-2); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.dim path { fill: none; stroke: var(--c-accent); stroke-width: 1.25; }
.dim .tick { stroke-width: 2; }
.dim text {
  fill: var(--c-accent);
  font-size: 22px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}
</style>
