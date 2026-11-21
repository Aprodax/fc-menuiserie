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
    <div class="container site-header__bar">
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
          <span class="header-phone__number tabular">{{ business.phone.display }}</span>
          <span class="visually-hidden header-phone__label">Appeler le {{ business.phone.display }}</span>
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

    <Transition name="menu">
      <div v-show="open" id="menu-mobile" ref="panel" class="mobile-menu">
        <nav class="container" aria-label="Menu">
          <ul role="list" class="mobile-menu__list">
            <li v-for="item in mainNav" :key="item.to">
              <NuxtLink :to="item.to" class="mobile-menu__link">
                {{ item.label }}
                <Icon name="lucide:chevron-right" aria-hidden="true" />
              </NuxtLink>
            </li>
          </ul>
          <div class="mobile-menu__contact">
            <NuxtLink to="/contact" class="btn btn--primary">Demander un devis gratuit</NuxtLink>
            <a :href="telHref" class="btn btn--secondary">
              <Icon name="lucide:phone" aria-hidden="true" />
              <span class="tabular">{{ business.phone.display }}</span>
            </a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgb(255 255 255 / 0.97);
  border-bottom: 1px solid var(--c-line);
}

.site-header__bar {
  display: flex;
  align-items: center;
  gap: 16px;
  height: var(--header-h);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  margin-right: auto;
  font-weight: 600;
  font-size: 1.0625rem;
  letter-spacing: -0.01em;
  text-decoration: none;
}

.site-nav { display: none; }
.site-nav ul { display: flex; gap: 4px; list-style: none; }
.site-nav__link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 999px;
  color: var(--c-ink-2);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--t-fast), background-color var(--t-fast);
}
.site-nav__link:hover { color: var(--c-ink); background: var(--c-surface); }
.site-nav__link.router-link-active { color: var(--c-ink); font-weight: 600; background: var(--c-surface); }

.site-header__actions { display: flex; align-items: center; gap: 8px; }

.header-phone {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
}
.header-phone svg { width: 20px; height: 20px; }
.header-phone__number { display: none; }

.header-cta { display: none; }

.menu-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-right: -8px;
  border: 0;
  border-radius: 999px;
  background: transparent;
}
.menu-button svg { width: 24px; height: 24px; }
.menu-button:hover, .header-phone:hover { background: var(--c-surface); }

.mobile-menu {
  position: fixed;
  inset: var(--header-h) 0 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: var(--c-bg);
  padding-bottom: max(24px, env(safe-area-inset-bottom));
}
.mobile-menu__list { list-style: none; padding-top: 8px; }
.mobile-menu__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  border-bottom: 1px solid var(--c-line);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  text-decoration: none;
}
.mobile-menu__link svg { width: 22px; height: 22px; color: var(--c-ink-2); }
.mobile-menu__link.router-link-exact-active { color: var(--c-accent); }
.mobile-menu__contact { display: grid; gap: 12px; margin-top: 32px; }

.menu-enter-active { transition: opacity var(--t-base) var(--ease-out), transform var(--t-base) var(--ease-out); }
.menu-leave-active { transition: opacity var(--t-fast) ease-in; }
.menu-enter-from { opacity: 0; transform: translateY(-8px); }
.menu-leave-to { opacity: 0; }

@media (min-width: 640px) {
  .header-phone { padding: 0 12px; }
  .header-phone__number { display: inline; }
  .header-phone__label { display: none; }
}

@media (min-width: 960px) {
  .brand { margin-right: 0; }
  .site-nav { display: block; margin-inline: auto; }
  .header-cta { display: inline-flex; }
  .menu-button, .mobile-menu { display: none !important; }
}
</style>
