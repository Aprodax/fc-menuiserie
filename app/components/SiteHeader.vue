<script setup lang="ts">
import { business, telHref } from '#shared/business'

const open = useMenuOpen()
const route = useRoute()
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')
const panel = useTemplateRef<HTMLElement>('panel')

function close({ restoreFocus = true } = {}) {
  if (!open.value) return
  open.value = false
  if (restoreFocus) menuButton.value?.focus()
}

watch(() => route.fullPath, () => close({ restoreFocus: false }))

watch(open, async (isOpen) => {
  document.documentElement.classList.toggle('menu-open', isOpen)
  if (isOpen) {
    await nextTick()
    panel.value?.querySelector<HTMLElement>('a')?.focus()
  }
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

// Le menu mobile n'a plus de sens au-delà du point de rupture : on le referme.
let desktop: MediaQueryList | undefined
const onBreakpoint = (e: MediaQueryListEvent) => e.matches && close({ restoreFocus: false })
onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  desktop = window.matchMedia('(min-width: 960px)')
  desktop.addEventListener('change', onBreakpoint)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  desktop?.removeEventListener('change', onBreakpoint)
  document.documentElement.classList.remove('menu-open')
})
</script>

<template>
  <header class="site-header">
    <div class="site-header__bar glass">
      <NuxtLink to="/" class="brand">
        <BrandMark />
        <span class="brand__name">{{ business.name }}</span>
      </NuxtLink>

      <nav class="site-nav" aria-label="Navigation principale">
        <ul role="list">
          <li v-for="item in mainNav" :key="item.to">
            <NuxtLink :to="item.to" class="site-nav__link">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="site-header__actions">
        <a :href="telHref" class="header-phone">
          <Icon name="lucide:phone" aria-hidden="true" />
          <span class="tabular">{{ business.phone.display }}</span>
        </a>
        <NuxtLink to="/contact" class="btn btn--primary btn--sm header-cta">Demander un devis</NuxtLink>
        <button
          ref="menuButton"
          type="button"
          class="menu-button"
          :aria-expanded="open"
          aria-controls="menu-mobile"
          @click="open = !open"
        >
          <Icon :name="open ? 'lucide:x' : 'lucide:menu'" aria-hidden="true" />
          <span class="visually-hidden">{{ open ? 'Fermer le menu' : 'Ouvrir le menu' }}</span>
        </button>
      </div>
    </div>

    <Transition name="scrim">
      <div v-show="open" class="menu-scrim" aria-hidden="true" @click="close()" />
    </Transition>
    <Transition name="sheet">
      <div v-show="open" id="menu-mobile" ref="panel" class="menu-sheet glass">
        <nav aria-label="Menu">
          <ul role="list" class="menu-sheet__list">
            <li v-for="item in mainNav" :key="item.to">
              <NuxtLink :to="item.to" class="menu-sheet__link">
                {{ item.label }}
                <Icon name="lucide:chevron-right" aria-hidden="true" />
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="menu-sheet__contact">
          <NuxtLink to="/contact" class="btn btn--primary">Demander un devis gratuit</NuxtLink>
          <a :href="telHref" class="btn btn--secondary">
            <Icon name="lucide:phone" aria-hidden="true" />
            <span class="tabular">{{ business.phone.display }}</span>
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* L'en-tête est une capsule de verre qui flotte au-dessus du contenu. */
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  padding-top: max(var(--header-gap), env(safe-area-inset-top));
  padding-inline: max(12px, env(safe-area-inset-left)) max(12px, env(safe-area-inset-right));
  pointer-events: none;
}

.site-header__bar {
  display: flex;
  align-items: center;
  gap: 12px;
  width: min(100%, calc(var(--max) + 48px));
  height: var(--header-bar);
  margin-inline: auto;
  padding: 0 6px 0 10px;
  border-radius: 999px;
  pointer-events: auto;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  margin-right: auto;
  padding-right: 6px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1.0625rem;
  letter-spacing: -0.01em;
  text-decoration: none;
}

.site-nav { display: none; }
.site-nav ul { display: flex; gap: 2px; list-style: none; }
.site-nav__link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 16px;
  border-radius: 999px;
  color: var(--c-ink-2);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--t-fast), background-color var(--t-fast);
}
.site-nav__link:hover { color: var(--c-ink); background: rgb(0 0 0 / 0.05); }
.site-nav__link.router-link-active { color: var(--c-ink); font-weight: 600; background: rgb(0 0 0 / 0.07); }

.site-header__actions { display: flex; align-items: center; gap: 6px; }

/* Sur mobile, le téléphone est dans la barre d'action du bas : pas de doublon ici. */
.header-phone { display: none; }
.header-cta { display: none; }

.menu-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 999px;
  background: rgb(0 0 0 / 0.05);
  transition: background-color var(--t-fast), transform var(--t-fast) var(--ease-out);
}
.menu-button:active { transform: scale(0.92); }
.menu-button svg { width: 22px; height: 22px; }
.menu-button:hover { background: rgb(0 0 0 / 0.09); }

/* Menu mobile : voile + panneau de verre qui se déploie depuis le bouton. */
.menu-scrim {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: rgb(20 24 28 / 0.22);
  pointer-events: auto;
}

.menu-sheet {
  position: fixed;
  top: calc(var(--header-h) + 8px);
  left: max(12px, env(safe-area-inset-left));
  right: max(12px, env(safe-area-inset-right));
  max-height: calc(100dvh - var(--header-h) - 20px);
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 8px 20px 20px;
  border-radius: var(--radius-xl);
  background: rgb(255 255 255 / 0.78);
  pointer-events: auto;
  transform-origin: top right;
}
.menu-sheet__list { list-style: none; }
.menu-sheet__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  border-bottom: 1px solid rgb(0 0 0 / 0.08);
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  text-decoration: none;
}
.menu-sheet__link svg { width: 20px; height: 20px; color: var(--c-ink-2); }
.menu-sheet__link.router-link-exact-active { color: var(--c-accent); }
.menu-sheet__contact { display: grid; gap: 10px; margin-top: 20px; }
.menu-sheet__contact .btn--secondary { background: rgb(255 255 255 / 0.6); }

.sheet-enter-active { transition: opacity var(--t-base) var(--ease-out), transform 320ms var(--ease-spring); }
.sheet-leave-active { transition: opacity var(--t-fast) ease-in, transform var(--t-fast) ease-in; }
.sheet-enter-from, .sheet-leave-to { opacity: 0; transform: scale(0.92) translateY(-8px); }
.scrim-enter-active, .scrim-leave-active { transition: opacity var(--t-base) var(--ease-out); }
.scrim-enter-from, .scrim-leave-to { opacity: 0; }

@media (min-width: 768px) {
  .site-header__bar { padding: 0 8px 0 14px; }
}

@media (min-width: 960px) {
  .brand { margin-right: 0; }
  .site-nav { display: block; margin-inline: auto; }
  .header-phone {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    padding: 0 14px;
    border-radius: 999px;
    font-weight: 600;
    text-decoration: none;
  }
  .header-phone svg { width: 18px; height: 18px; }
  .header-phone:hover { background: rgb(0 0 0 / 0.05); }
  .header-cta { display: inline-flex; }
  .menu-button, .menu-sheet, .menu-scrim { display: none !important; }
}
</style>
