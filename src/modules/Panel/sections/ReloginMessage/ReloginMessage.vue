<template>
  <div class="bg-black/60 fixed inset-0 z-[100]">
    <Advice
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
      type="warning"
      :title="t('widget.reloginMessage.title', { platform })"
    >
      {{ t('widget.reloginMessage.description') }}
    </Advice>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { Advice } from '@/components'
import { messages } from '@/modules/Widget/locales'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()

const platform = computed(() => {
	const domain = appStore.domain?.name as string

	return domain[0].toUpperCase() + domain.slice(1)
})
</script>
