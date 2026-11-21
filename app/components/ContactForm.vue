<script setup lang="ts">
import { business, telHref } from '#shared/business'
import { contactSchema, projectOptions, type ContactField, type ContactInput } from '#shared/contact'

const fields: { key: ContactField, label: string }[] = [
  { key: 'name', label: 'Nom et prénom' },
  { key: 'phone', label: 'Téléphone' },
  { key: 'email', label: 'E-mail' },
  { key: 'town', label: 'Commune du chantier' },
  { key: 'project', label: 'Type de projet' },
  { key: 'message', label: 'Votre projet' },
]
const labelOf = (key: ContactField) => fields.find(f => f.key === key)?.label ?? key

const form = reactive<ContactInput & { website: string }>({
  name: '',
  phone: '',
  email: '',
  town: '',
  project: '',
  message: '',
  website: '', // pot de miel
})

// Lien « Demander un devis » depuis une prestation : /contact?projet=fenetres pré-sélectionne le projet.
// La page est pré-générée sans paramètre : on suit la route, qui reçoit sa query après l'hydratation.
const route = useRoute()
watch(() => route.query.projet, (projet) => {
  if (form.project === '' && typeof projet === 'string' && projectOptions.some(o => o.value === projet)) {
    form.project = projet
  }
}, { immediate: true })

const errors = reactive<Partial<Record<ContactField, string>>>({})
const status = ref<'idle' | 'sending' | 'sent' | 'failed'>('idle')
const summary = useTemplateRef<HTMLElement>('summary')
const success = useTemplateRef<HTMLElement>('success')

const errorList = computed(() =>
  (Object.entries(errors) as [ContactField, string | undefined][]).filter(([, msg]) => msg),
)

function validateField(key: ContactField) {
  const result = contactSchema.shape[key].safeParse(form[key])
  errors[key] = result.success ? undefined : result.error.issues[0]?.message
}

// Pas d'erreur avant que la personne ait saisi quelque chose et quitté le champ.
function onBlur(key: ContactField) {
  if (form[key] !== '' || errors[key]) validateField(key)
}
// Une fois une erreur affichée, elle disparaît dès que la saisie est correcte.
function onInput(key: ContactField) {
  if (errors[key]) validateField(key)
}

const describedBy = (key: ContactField, help?: string) =>
  [help, errors[key] ? `${key}-error` : undefined].filter(Boolean).join(' ') || undefined

async function submit() {
  fields.forEach(f => validateField(f.key))
  if (errorList.value.length) {
    await nextTick()
    summary.value?.focus()
    return
  }

  status.value = 'sending'
  try {
    await $fetch('/api/contact', { method: 'POST', body: form })
    status.value = 'sent'
    await nextTick()
    success.value?.focus()
  }
  catch (error: unknown) {
    const fieldErrors = (error as { data?: { data?: { fieldErrors?: Partial<Record<ContactField, string[]>> } } })
      .data?.data?.fieldErrors
    if (fieldErrors) {
      for (const [key, messages] of Object.entries(fieldErrors)) errors[key as ContactField] = messages?.[0]
      status.value = 'idle'
      await nextTick()
      summary.value?.focus()
      return
    }
    status.value = 'failed'
  }
}
</script>

<template>
  <div v-if="status === 'sent'" ref="success" class="form-success" tabindex="-1" role="status">
    <Icon name="lucide:circle-check" class="form-success__icon" aria-hidden="true" />
    <h3>Merci, votre demande est bien envoyée.</h3>
    <p>
      Nous vous rappelons {{ business.responseDelay }} au {{ form.phone }} pour convenir d’un rendez-vous.
    </p>
  </div>

  <form v-else class="form" novalidate @submit.prevent="submit">
    <div v-if="errorList.length" ref="summary" class="form-summary" tabindex="-1">
      <h3 id="summary-title">
        <Icon name="lucide:circle-alert" aria-hidden="true" />
        {{ errorList.length === 1 ? 'Un champ est à corriger' : `${errorList.length} champs sont à corriger` }}
      </h3>
      <ul role="list">
        <li v-for="[key, message] in errorList" :key="key">
          <a :href="`#field-${key}`">{{ labelOf(key) }} : {{ message }}</a>
        </li>
      </ul>
    </div>

    <p class="small muted">Tous les champs sont obligatoires, sauf mention&nbsp;«&#8239;facultatif&#8239;».</p>

    <div class="form__row">
      <div class="field" :class="{ 'field--error': errors.name }">
        <label for="field-name">Nom et prénom</label>
        <input
          id="field-name" v-model="form.name" type="text" name="name" autocomplete="name" required
          :aria-invalid="!!errors.name" :aria-describedby="describedBy('name')"
          @blur="onBlur('name')" @input="onInput('name')"
        >
        <p v-if="errors.name" id="name-error" class="field__error">
          <Icon name="lucide:circle-alert" aria-hidden="true" />{{ errors.name }}
        </p>
      </div>

      <div class="field" :class="{ 'field--error': errors.phone }">
        <label for="field-phone">Téléphone</label>
        <input
          id="field-phone" v-model="form.phone" type="tel" name="phone" inputmode="tel" autocomplete="tel" required
          :aria-invalid="!!errors.phone" :aria-describedby="describedBy('phone')"
          @blur="onBlur('phone')" @input="onInput('phone')"
        >
        <p v-if="errors.phone" id="phone-error" class="field__error">
          <Icon name="lucide:circle-alert" aria-hidden="true" />{{ errors.phone }}
        </p>
      </div>
    </div>

    <div class="form__row">
      <div class="field" :class="{ 'field--error': errors.email }">
        <label for="field-email">E-mail <span class="field__optional">(facultatif)</span></label>
        <input
          id="field-email" v-model="form.email" type="email" name="email" inputmode="email" autocomplete="email"
          :aria-invalid="!!errors.email" :aria-describedby="describedBy('email')"
          @blur="onBlur('email')" @input="onInput('email')"
        >
        <p v-if="errors.email" id="email-error" class="field__error">
          <Icon name="lucide:circle-alert" aria-hidden="true" />{{ errors.email }}
        </p>
      </div>

      <div class="field" :class="{ 'field--error': errors.town }">
        <label for="field-town">Commune du chantier</label>
        <input
          id="field-town" v-model="form.town" type="text" name="town" autocomplete="address-level2" required
          :aria-invalid="!!errors.town" :aria-describedby="describedBy('town')"
          @blur="onBlur('town')" @input="onInput('town')"
        >
        <p v-if="errors.town" id="town-error" class="field__error">
          <Icon name="lucide:circle-alert" aria-hidden="true" />{{ errors.town }}
        </p>
      </div>
    </div>

    <div class="field" :class="{ 'field--error': errors.project }">
      <label for="field-project">Type de projet</label>
      <div class="field__select">
        <select
          id="field-project" v-model="form.project" name="project" required
          :aria-invalid="!!errors.project" :aria-describedby="describedBy('project')"
          @change="validateField('project')"
        >
          <option value="" disabled>Choisissez dans la liste</option>
          <option v-for="o in projectOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
        <Icon name="lucide:chevron-down" aria-hidden="true" />
      </div>
      <p v-if="errors.project" id="project-error" class="field__error">
        <Icon name="lucide:circle-alert" aria-hidden="true" />{{ errors.project }}
      </p>
    </div>

    <div class="field" :class="{ 'field--error': errors.message }">
      <label for="field-message">Votre projet</label>
      <p id="message-help" class="field__help">
        Nombre de menuiseries, dimensions approximatives, délai souhaité… Quelques lignes suffisent.
      </p>
      <textarea
        id="field-message" v-model="form.message" name="message" rows="6" required
        :aria-invalid="!!errors.message" :aria-describedby="describedBy('message', 'message-help')"
        @blur="onBlur('message')" @input="onInput('message')"
      />
      <p v-if="errors.message" id="message-error" class="field__error">
        <Icon name="lucide:circle-alert" aria-hidden="true" />{{ errors.message }}
      </p>
    </div>

    <!-- Pot de miel anti-robots : invisible et ignoré par les lecteurs d'écran. -->
    <div class="form__trap" aria-hidden="true">
      <label for="field-website">Ne pas remplir</label>
      <input id="field-website" v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off">
    </div>

    <div v-if="status === 'failed'" class="form-failed" role="alert">
      <p>
        <strong>Le message n’a pas pu partir.</strong>
        Vos informations sont conservées : réessayez dans un instant, ou appelez-nous au
        <a :href="telHref" class="tabular">{{ business.phone.display }}</a>.
      </p>
    </div>

    <div class="form__submit">
      <button type="submit" class="btn btn--primary" :disabled="status === 'sending'" :aria-busy="status === 'sending'">
        <Icon v-if="status === 'sending'" name="lucide:loader-circle" class="spin" aria-hidden="true" />
        {{ status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande' }}
      </button>
      <p class="small muted">
        Vos coordonnées servent uniquement à répondre à votre demande.
        <NuxtLink to="/mentions-legales#donnees-personnelles">En savoir plus</NuxtLink>
      </p>
    </div>
  </form>
</template>

<style scoped>
.form { display: grid; gap: 24px; }
.form__row { display: grid; gap: 24px; }

.field { display: grid; gap: 8px; }
.field label { font-weight: 600; }
.field__optional { font-weight: 400; color: var(--c-ink-2); }
.field__help { margin-top: -4px; font-size: var(--fs-small); color: var(--c-ink-2); }

.field input,
.field select,
.field textarea {
  width: 100%;
  min-height: 52px;
  padding: 12px 16px;
  border: 1px solid var(--c-line-strong);
  border-radius: var(--radius-sm);
  background: var(--c-bg);
  font-size: var(--fs-body);
  line-height: 1.4;
  transition: border-color var(--t-fast), box-shadow var(--t-fast);
}
.field textarea { min-height: 160px; resize: vertical; }
.field input:hover, .field select:hover, .field textarea:hover { border-color: var(--c-ink-2); }
.field input:focus-visible, .field select:focus-visible, .field textarea:focus-visible {
  outline: none;
  border-color: var(--c-ink);
  box-shadow: 0 0 0 3px rgb(56 62 66 / 0.25);
}

.field__select { position: relative; }
.field__select select { appearance: none; padding-right: 48px; cursor: pointer; }
.field__select svg {
  position: absolute;
  right: 16px;
  top: 50%;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--c-ink-2);
}

.field--error input, .field--error select, .field--error textarea { border-color: var(--c-error); border-width: 2px; }
.field__error {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: var(--c-error);
  font-size: var(--fs-small);
  font-weight: 500;
}
.field__error svg { width: 18px; height: 18px; flex: none; margin-top: 2px; }

.form-summary {
  padding: 20px 24px;
  border: 2px solid var(--c-error);
  border-radius: var(--radius);
  background: #fdf3f2;
}
.form-summary h3 { display: flex; align-items: center; gap: 8px; font-size: var(--fs-body); color: var(--c-error); }
.form-summary h3 svg { width: 20px; height: 20px; }
.form-summary ul { margin-top: 8px; list-style: none; display: grid; gap: 4px; }
.form-summary a { color: var(--c-ink); }

.form__trap { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }

.form-failed {
  padding: 16px 20px;
  border-left: 4px solid var(--c-error);
  background: #fdf3f2;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.form__submit { display: grid; gap: 16px; justify-items: start; }
.form__submit .btn:disabled { opacity: 0.6; cursor: progress; }

.spin { animation: spin 0.9s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.form-success {
  display: grid;
  gap: 12px;
  padding: 32px;
  border: 1px solid var(--c-line);
  border-radius: var(--radius);
  background: var(--c-surface);
}
.form-success__icon { width: 32px; height: 32px; color: var(--c-success); }

@media (min-width: 640px) {
  .form__row { grid-template-columns: 1fr 1fr; }
  .form__submit { grid-template-columns: auto 1fr; align-items: center; gap: 24px; }
}
@media (max-width: 479px) {
  .form__submit .btn { width: 100%; }
}
</style>
