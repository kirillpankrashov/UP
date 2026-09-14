<template>
  <button
    v-if="!asButton"
    class="flex cursor-pointer items-center justify-center border-none bg-transparent text-primary"
    :class="{'text-success': copiedStatus}"
    @click="onClick"
  >
    <CopyIcon
      v-if="!copiedStatus"
      class="mr-2 h-4 w-4 fill-primary"
      :class="{'!m-0': hideLabel}"
    />
    <CheckIcon
      v-else
      class="mr-2 h-4 w-4 fill-success"
      :class="{'!m-0': hideLabel}"
    />
    <template v-if="!hideLabel">
      {{ !copiedStatus ? locale.copyLink : locale.copyLinkSuccess }}
    </template>
  </button>

  <ElButton
    v-else
    class="w-full"
    size="large"
    :type="!copiedStatus ? 'primary' : 'success'"
    @click="onClick"
  >
    <span class="_text-m-bold">{{ !copiedStatus ? locale.copyLink : locale.copyLinkSuccess }}</span>
  </ElButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { messages } from '@/core/locales'
import { ElButton } from '@/components/element-plus'

import CheckIcon from '@/assets/img/icons/check.svg'
import CopyIcon from '@/assets/img/icons/copy.svg'

const { t } = useLocale<typeof messages>(messages)

const props = defineProps<{
  link: string | (() => Promise<string>)
  label?: string
	asButton?: boolean
	hideLabel?: boolean
}>()

const {
	copy,
	copied: copiedStatus,
	isSupported,
} = useClipboard({
	copiedDuring: 2000,
})

const locale = computed(() => ({
	copyLink: props.label || t('button.copyLink.static'),
	copyLinkSuccess: t('button.copyLink.success'),
}))

const onClick = async () => {
	if (!isSupported.value) {
		Logger.info('Clipboard is not supported', true)
		return
	}

	if (copiedStatus.value) return

	let linkSrc = props.link
	if (typeof props.link !== 'string') {
		linkSrc = await props.link()
	}

	copy(linkSrc as string)
}
</script>
