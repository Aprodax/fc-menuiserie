<script setup lang="ts">
import { business, fullAddress, mailHref, mapsHref, telHref } from '#shared/business'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div class="site-footer__brand">
        <p class="site-footer__name">{{ business.name }}</p>
        <p class="site-footer__muted">
          {{ business.activity }} à {{ business.address.city }} et dans un rayon de {{ business.serviceArea.radiusKm }} km.
        </p>
      </div>

      <div>
        <h2 class="site-footer__title">Coordonnées</h2>
        <ul role="list" class="site-footer__list">
          <li><a :href="telHref" class="tabular">{{ business.phone.display }}</a></li>
          <li><a :href="mailHref">{{ business.email }}</a></li>
          <li>
            <a :href="mapsHref" target="_blank" rel="noopener">
              {{ fullAddress }}<span class="visually-hidden"> (itinéraire, nouvel onglet)</span>
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="site-footer__title">Horaires</h2>
        <dl class="site-footer__hours">
          <div v-for="h in business.hours" :key="h.days">
            <dt>{{ h.days }}</dt>
            <dd>{{ h.time }}</dd>
          </div>
        </dl>
      </div>

    </div>

    <div class="container site-footer__bottom">
      <p>© {{ year }} {{ business.name }}</p>
      <ul role="list">
        <li><NuxtLink to="/reparations">Réparations</NuxtLink></li>
        <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        <li><NuxtLink to="/mentions-legales">Mentions légales</NuxtLink></li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  --c-focus: #ffffff;
  background: var(--c-anthracite-deep);
  color: var(--c-on-dark);
  padding-top: clamp(56px, 7vw, 88px);
}

.site-footer__grid {
  display: grid;
  gap: 40px;
  padding-bottom: 48px;
}

.site-footer__name { font-size: 1.25rem; font-weight: 600; letter-spacing: -0.01em; }
.site-footer__muted { margin-top: 8px; color: var(--c-on-dark-2); max-width: 28em; }

.site-footer__title {
  margin-bottom: 12px;
  font-size: var(--fs-small);
  font-weight: 600;
  color: var(--c-on-dark-2);
  letter-spacing: 0;
}

.site-footer__list { list-style: none; display: grid; gap: 2px; }
.site-footer__list a {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  text-decoration: none;
}
.site-footer__list a:hover { text-decoration: underline; }

.site-footer__hours { margin: 0; display: grid; gap: 12px; }
.site-footer__hours dt { font-weight: 600; }
.site-footer__hours dd { margin: 0; color: var(--c-on-dark-2); }

.site-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 24px;
  padding-block: 20px max(20px, env(safe-area-inset-bottom));
  border-top: 1px solid rgb(255 255 255 / 0.14);
  font-size: var(--fs-small);
  color: var(--c-on-dark-2);
}
.site-footer__bottom ul { display: flex; gap: 20px; list-style: none; }

/* Place réservée à la barre d'action mobile, pour qu'elle ne cache pas le bas du pied de page. */
@media (max-width: 959px) {
  .site-footer--action-bar .site-footer__bottom {
    padding-bottom: calc(var(--action-bar-h) + max(24px, env(safe-area-inset-bottom)));
  }
}
.site-footer__bottom a { display: inline-flex; align-items: center; min-height: 44px; }

@media (min-width: 640px) {
  .site-footer__grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1024px) {
  .site-footer__grid { grid-template-columns: 1.4fr 1fr 1fr; gap: 64px; }
}
</style>
