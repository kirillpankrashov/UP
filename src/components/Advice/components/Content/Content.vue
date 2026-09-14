<template>
  <div
    class="w-full rounded-lg bg-transparent text-black sm:w-[292px] sm:p-6 sm:shadow-lg"
    :class="{
      '!shadow-danger-50': type === 'danger',
      '!shadow-warning-50': type === 'warning',
    }"
  >
    <div
      v-if="!hideLabel"
      class="_text-caption-caps mb-2 text-primary"
      :class="{
        '!text-primary': type === 'primary',
        '!text-danger': type === 'danger',
        '!text-warning': type === 'warning',
        'mb-4': !title
      }"
    >
      {{ computedLabel }}
    </div>

    <div
      v-if="title"
      class="_text-l-bold mb-4"
    >
      {{ title }}
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'

const { t } = useLocale({})

const props = withDefaults(defineProps<{
  type?: 'hint' | 'primary' | 'danger' | 'warning'
  title?: string | null
  label?: string | null
  hideLabel?: boolean
}>(), {
	type: 'hint',
	title: null,
	label: null,
	hideLabel: false,
})

const computedLabel = computed(() => {
	if (props.label) return props.label

	switch(props.type) {
		case 'hint':
			return t('other.advice.hint')
		case 'danger':
		case 'warning':
			return t('other.advice.attention')
		default:
			return ''
	}
})
</script>
