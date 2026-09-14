<template>
  <button
    data-name="panel-logger"
    class="_text-caption"
    @click="onClick"
  >
    {{ copied ? t('panel.logger.copied') : t('panel.logger.copy') }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Panel/locales'

const { t } = useLocale<typeof messages>(messages)

const props = defineProps<{
  log: unknown[]
}>()

const {
	copy,
	copied: copiedStatus,
	isSupported,
} = useClipboard({
	copiedDuring: 2000,
})

const copied = ref(false)

const onClick = () => {
	if (!isSupported.value) {
		Logger.info('Clipboard is not supported', true)
		return
	}

	if (copiedStatus.value) return

	copy(JSON.stringify(props.log))
}
</script>
