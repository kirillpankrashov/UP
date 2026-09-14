<template>
  <DashboardSection
    v-if="referralsStore.referral"
    id="referrals-invite-section"
    data-test="referrals-invite-section"
    class="relative"
  >
    <template #left>
      <div class="_text-m-bold">
        {{ t('referrals.invite.title') }}
        <HelpIcon
          v-if="appStore.isMobile"
          class="h-4 w-4 fill-primary"
          @click="adviceRef?.toggleModal"
        />
      </div>
    </template>

    <div
      class="mb-8 grid grid-cols-1"
      :class="{'grid-cols-1 sm:grid-cols-2': showAmount}"
    >
      <StatCard
        :value="(statistics.invited || 0).toString()"
        :label="invitedLabel"
      />
      <StatCard
        v-if="showAmount"
        :value="formatCurrency(statistics.amount, false, statistics.currency)"
        :label="rewardLabel"
      />
    </div>

    <div>
      <div class="_text-m-bold mb-2">
        {{ t('referrals.invite.title') }}
      </div>

      <div
        class="_text-m-regular relative inline-block h-[48px] w-full overflow-hidden truncate rounded bg-primary-50 px-4 text-center !leading-[48px] !text-gray"
        data-test="referrals-invite-link"
      >
        {{ referralLink }}
      </div>

      <div class="flex w-full gap-2">
        <CopyLink
          :as-button="true"
          :link="referralLink"
        />

        <ElButton
          data-test="referrals-invite-share-facebook"
          class="shrink-0"
          type="primary"
          size="large"
          square
          @click="share()"
        >
          <FacebookIcon class="h-5 w-5 fill-white" />
        </ElButton>

        <ElButton
          data-test="referrals-invite-share-twitter"
          class="shrink-0"
          type="primary"
          size="large"
          square
          @click="share()"
        >
          <TwitterIcon class="h-5 w-5 fill-white" />
        </ElButton>
      </div>
    </div>

    <Advice
      ref="adviceRef"
      type="primary"
      class="sm:absolute sm:left-[calc(100%+24px)] sm:top-8"
      :title="adviceTitle"
    >
      <p
        class="_text-m-regular"
        v-html="adviceDescription"
      />
    </Advice>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { Locale } from '@/core/types'
import { Logger } from '@/core/helpers'
import { useCurrency, useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { Advice, StatCard } from '@/components'
import { CopyLink } from '@/components'
import { ElButton } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { messages } from '@/modules/Streamer/views/Referrals/locales'
import { useReferralsStore } from '@/modules/Streamer/views/Referrals/store'

import FacebookIcon from '@/assets/img/icons/facebook-icon.svg'
import HelpIcon from '@/assets/img/icons/help-icon.svg'
import TwitterIcon from '@/assets/img/icons/twitter-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const appStore = useAppStore()
const streamerStore = useStreamerStore()
const referralsStore = useReferralsStore()

const adviceRef = ref<InstanceType<typeof Advice> | null>(null)

const referralLink = computed(() => referralsStore.referral?.link || '')
const streamerLang = computed(() => streamerStore.profile?.language)
const statistics = computed(() => referralsStore.statistics)

const adviceTitle = computed(() => t(streamerLang.value === Locale.RU ? 'referrals.updated.invite.advice.title' : 'referrals.invite.advice.title'))
const adviceDescription = computed(() => t(streamerLang.value === Locale.RU ? 'referrals.updated.invite.advice.description' : 'referrals.invite.advice.description'))

const invitedLabel = computed(() => t(streamerLang.value === Locale.RU ? 'referrals.updated.invite.invited' : 'referrals.invite.invited'))
const rewardLabel = computed(() => t(streamerLang.value === Locale.RU ? 'referrals.updated.invite.reward' : 'referrals.invite.reward'))

const showAmount = computed(() => {
	if (streamerLang.value === Locale.RU && statistics.value.amount === 0) {
		return false
	}
	return true
})

const share = () => {
	if (navigator?.share) {
		try {
			navigator.share({ url: referralLink.value })
		}
		catch (error) {
			Logger.error('Не удалось поделиться', false, error)
		}
	}
}

defineExpose({
	share,
})
</script>
