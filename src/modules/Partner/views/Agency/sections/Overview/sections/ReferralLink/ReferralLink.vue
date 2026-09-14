<template>
  <div
    data-name="partner-agency-overview-referral-link"
    data-test="partner-agency-overview-referral-link"
    class="flex gap-2"
  >
    <div class="relative inline-block h-[48px] w-full overflow-hidden text-ellipsis rounded bg-primary-50 px-4 text-black after:absolute after:right-0 after:top-0 after:z-[1] after:h-full after:w-16 after:bg-gradient-to-r after:from-transparent after:to-primary-50 after:to-30%">
      <div class="_text-m-regular whitespace-nowrap !leading-[48px] text-dark-gray">
        {{ referralStore.referral.data?.link }}
      </div>
    </div>

    <ElButton
      data-test="partner-agency-overview-referral-link-copy-btn"
      size="large"
      :type="copiedStatus ? 'success' : 'primary'"
      @click="copyLink"
    >
      <span class="_text-m-bold">{{ copiedStatus ? t('button.copyLink.success') : t('button.copyLink.static') }}</span>
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useAgencyReferralStore } from '@/modules/Partner/views/Agency/store'

const { t } = useLocale<typeof messages>(messages)

const {
	copy,
	copied: copiedStatus,
	isSupported,
} = useClipboard({
	copiedDuring: 2000,
})

const referralStore = useAgencyReferralStore()

const copyLink = () => {
	if (!isSupported.value) {
		Logger.info('Clipboard is not supported', true)
		return
	}

	if (copiedStatus.value) return

	copy(referralStore.referral.data?.link as string)
}

defineExpose({
	copyLink,
})
</script>
