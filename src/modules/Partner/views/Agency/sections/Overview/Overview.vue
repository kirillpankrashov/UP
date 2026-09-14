<template>
  <div
    v-if="agencyStore.data"
    data-test="partner-agency-overview"
  >
    <DashboardSection
      :title="t('creators.invite.title')"
      :no-border="true"
    >
      <Balance />

      <div class="mb-8 mt-4">
        <TextLink @click="onCreatorsListClick">
          {{ t('creators.creatorsList') }}
        </TextLink>
      </div>

      <DashboardSubsection
        :title="t('creators.invite.link')"
      >
        <ReferralLink />
      </DashboardSubsection>
    </DashboardSection>

    <template v-if="!agencyStore.isUplifyAgency">
      <AgencySettings />
    </template>

    <StreamersList
      v-if="agencyStore.isUplifyAgency"
      ref="streamersListRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { DashboardSection, DashboardSubsection } from '@/components/layouts'
import { messages } from '@/modules/Partner/views/Agency/locales'
import {
	useAgencyReferralStore,
	useAgencyStore,
} from '@/modules/Partner/views/Agency/store'

import {
	AgencySettings,
	Balance,
	ReferralLink,
	StreamersList,
} from './sections'

const { t } = useLocale<typeof messages>(messages)

const emit = defineEmits(['open-creators'])

const agencyStore = useAgencyStore()
const referralStore = useAgencyReferralStore()

const streamersListRef = ref<InstanceType<typeof StreamersList>>()

const onCreatorsListClick = () => {
	if (agencyStore.isUplifyAgency) {
		streamersListRef.value?.toggleSidebarVisibility()
	}
	else {
		emit('open-creators')
	}
}
</script>
