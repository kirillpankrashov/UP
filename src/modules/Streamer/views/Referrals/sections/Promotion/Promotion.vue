<template>
  <DashboardSection
    v-if="referralsStore.referral"
    id="referrals-promotion-section"
    data-test="referrals-promotion-section"
    class="relative"
  >
    <template #left>
      <div class="_text-m-bold">
        {{ t('referrals.promotion.title') }}
        <HelpIcon
          v-if="appStore.isMobile"
          class="h-4 w-4 fill-primary"
          @click="adviceRef?.toggleModal"
        />
      </div>
    </template>

    <div class="mb-6 flex items-center">
      <ElSwitch
        data-test="referrals-promotion-switch"
        v-model="referralsStore.referral.promotion"
        style="--el-switch-on-color: var(--el-color-success); --el-switch-off-color: var(--el-color-danger)"
        active-text="ON"
        inactive-text="OFF"
        inline-prompt
        :disabled="referralsStore.promotion.sending"
        @change="referralsStore.togglePromotion"
      />
      <div class="_text-m-regular ml-2">
        {{ t('referrals.promotion.switchLabel') }}
      </div>
    </div>

    <div class="w-full">
      <p class="_text-m-regular mb-2">
        {{ t('referrals.promotion.demo.title') }}
      </p>

      <ElButton
        data-test="referrals-promotion-widget-preview"
        class="w-full sm:max-w-[220px]"
        :type="referralsStore.widgetPreview.success ? 'success' : 'primary'"
        size="large"
        plain
        :loading="referralsStore.widgetPreview.sending"
        :disabled="referralsStore.widgetPreview.sending || referralsStore.widgetPreview.success"
        @click="referralsStore.sendWidgetPreview"
      >
        <span class="_text-m-bold">{{ widgetPreviewBtnText }}</span>
      </ElButton>
    </div>

    <Advice
      ref="adviceRef"
      type="primary"
      class="sm:absolute sm:left-[calc(100%+24px)] sm:top-8"
      :title="adviceText.title"
    >
      <p
        class="_text-m-regular"
        v-html="adviceText.description"
      />
    </Advice>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { Locale } from '@/core/types'
import { useCurrency, useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { Advice } from '@/components'
import { ElButton, ElSwitch } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { messages } from '@/modules/Streamer/views/Referrals/locales'
import { useReferralsStore } from '@/modules/Streamer/views/Referrals/store'

import HelpIcon from '@/assets/img/icons/help-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const appStore = useAppStore()
const streamerStore = useStreamerStore()
const referralsStore = useReferralsStore()

const adviceRef = ref<InstanceType<typeof Advice> | null>(null)

const streamerLang = computed(() => streamerStore.profile?.language)
const statistics = computed(() => referralsStore.statistics)

const adviceText = computed(() => {
	if (streamerLang.value === Locale.RU) {
		return {
			title: t('referrals.updated.promotion.advice.title'),
			description: t('referrals.updated.promotion.advice.description'),
		}
	}

	return {
		title: t('referrals.promotion.advice.title'),
		description: t('referrals.promotion.advice.description', {
			referral: formatCurrency(referralsStore.referral?.const.referral || 0, false, statistics.value.currency),
			referrer: formatCurrency(referralsStore.referral?.const.referrer || 0, false, statistics.value.currency),
		}),
	}
})

const widgetPreviewBtnText = computed(() => {
	if (referralsStore.widgetPreview.sending) {
		return null
	}
	if (referralsStore.widgetPreview.success) {
		return t('button.send.success')
	}
	return t('button.send.static')
})
</script>
